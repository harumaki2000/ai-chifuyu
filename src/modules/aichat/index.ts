import { bindThis } from '@/decorators.js';
import Module from '@/module.js';
import serifs from '@/serifs.js';
import Message from '@/message.js';
import config from '@/config.js';
import Friend from '@/friend.js';
import urlToBase64 from '@/utils/url2base64.js';
import got from 'got';
import loki from 'lokijs';

type AiChat = {
	question: string;
	prompt: string;
	api: string;
	key: string;
	history?: { role: string; content: string }[];
	friendName?: string;
};
type base64File = {
	type: string;
	base64: string;
	url?: string;
};
type GeminiParts = {
	inlineData?: {
		mimeType: string;
		data: string;
	};
	fileData?: {
		mimeType: string;
		fileUri: string;
	};
	text?: string;
}[];
type GeminiSystemInstruction = {
	role: string;
	parts: [{ text: string }];
};
type GeminiContents = {
	role: string;
	parts: GeminiParts;
};

type AiChatHist = {
	postId: string;
	createdAt: number;
	type: string;
	api?: string;
	history?: {
		role: string;
		content: string;
	}[];
};

const TYPE_GEMINI = 'gemini';
const GEMINI_20_FLASH_API =
	'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

const RANDOMTALK_DEFAULT_PROBABILITY = 0.02; // デフォルトのrandomTalk確率
const TIMEOUT_TIME = 1000 * 60 * 60 * 0.5; // aichatの返信を監視する時間
const RANDOMTALK_DEFAULT_INTERVAL = 1000 * 60 * 60 * 12; // デフォルトのrandomTalk間隔

export default class extends Module {
	public readonly name = 'aichat';
	private aichatHist: loki.Collection<AiChatHist>;
	private randomTalkProbability: number = RANDOMTALK_DEFAULT_PROBABILITY;
	private randomTalkIntervalMinutes: number = RANDOMTALK_DEFAULT_INTERVAL;

	@bindThis
	public install() {
		this.aichatHist = this.ai.getCollection('aichatHist', {
			indices: ['postId'],
		});

		if (
			config.aichatRandomTalkProbability != undefined &&
			!Number.isNaN(Number.parseFloat(config.aichatRandomTalkProbability))
		) {
			this.randomTalkProbability = Number.parseFloat(
				config.aichatRandomTalkProbability
			);
		}
		if (
			config.aichatRandomTalkIntervalMinutes != undefined &&
			!Number.isNaN(Number.parseInt(config.aichatRandomTalkIntervalMinutes))
		) {
			this.randomTalkIntervalMinutes =
				1000 * 60 * Number.parseInt(config.aichatRandomTalkIntervalMinutes);
		}
		this.log('aichatRandomTalkEnabled:' + config.aichatRandomTalkEnabled);
		this.log('randomTalkProbability:' + this.randomTalkProbability);
		this.log(
			'randomTalkIntervalMinutes:' +
				this.randomTalkIntervalMinutes / (60 * 1000)
		);

		if (config.aichatRandomTalkEnabled) {
			setInterval(this.aichatRandomTalk, this.randomTalkIntervalMinutes);
		}

		return {
			mentionHook: this.mentionHook,
			contextHook: this.contextHook,
			timeoutCallback: this.timeoutCallback,
		};
	}

	@bindThis
	private async genTextByGemini(aiChat: AiChat, files: base64File[]) {
		this.log('Generate Text By Gemini...');
		let parts: GeminiParts = [];
		const now = new Date().toLocaleString('ja-JP', {
			timeZone: 'Asia/Tokyo',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
		let systemInstructionText =
			aiChat.prompt +
			'。また、現在日時は' +
			now +
			'であり、これは回答の参考にし、時刻を聞かれるまで時刻情報は提供しないこと(なお、他の日時は無効とすること)。';
		if (aiChat.friendName != undefined) {
			systemInstructionText +=
				'なお、会話相手の名前は' + aiChat.friendName + 'とする。';
		}
		const systemInstruction: GeminiSystemInstruction = {
			role: 'system',
			parts: [{ text: systemInstructionText }],
		};

		parts = [{ text: aiChat.question }];
		if (files.length >= 1) {
			for (const file of files) {
				parts.push({
					inlineData: {
						mimeType: file.type,
						data: file.base64,
					},
				});
			}
		}

		let contents: GeminiContents[] = [];
		if (aiChat.history != null) {
			aiChat.history.forEach((entry) => {
				contents.push({
					role: entry.role,
					parts: [{ text: entry.content }],
				});
			});
		}
		contents.push({ role: 'user', parts: parts });

		let options = {
			url: aiChat.api,
			searchParams: {
				key: aiChat.key,
			},
			json: {
				contents: contents,
				systemInstruction: systemInstruction,
			},
		};
		this.log(JSON.stringify(options));
		let res_data: any = null;
		try {
			res_data = await got
				.post(options, { parseJson: (res: string) => JSON.parse(res) })
				.json();
			this.log(JSON.stringify(res_data));
			if (res_data.hasOwnProperty('candidates')) {
				if (res_data.candidates.length > 0) {
					if (res_data.candidates[0].hasOwnProperty('content')) {
						if (res_data.candidates[0].content.hasOwnProperty('parts')) {
							if (res_data.candidates[0].content.parts.length > 0) {
								if (
									res_data.candidates[0].content.parts[0].hasOwnProperty('text')
								) {
									const responseText =
										res_data.candidates[0].content.parts[0].text;
									return responseText;
								}
							}
						}
					}
				}
			}
		} catch (err: unknown) {
			this.log('Error By Call Gemini');
			if (err instanceof Error) {
				this.log(`${err.name}\n${err.message}\n${err.stack}`);
			}
		}
		return null;
	}

	@bindThis
	private async note2base64File(notesId: string) {
		const noteData = await this.ai.api('notes/show', { noteId: notesId });
		let files: base64File[] = [];
		if (noteData !== null && noteData.hasOwnProperty('files')) {
			for (let i = 0; i < noteData.files.length; i++) {
				let fileType: string | undefined;
				let fileUrl: string | undefined;
				if (noteData.files[i].hasOwnProperty('type')) {
					fileType = noteData.files[i].type;
				}
				if (
					noteData.files[i].hasOwnProperty('thumbnailUrl') &&
					noteData.files[i].thumbnailUrl
				) {
					fileUrl = noteData.files[i].thumbnailUrl;
				} else if (
					noteData.files[i].hasOwnProperty('url') &&
					noteData.files[i].url
				) {
					fileUrl = noteData.files[i].url;
				}
				if (fileType !== undefined && fileUrl !== undefined) {
					try {
						this.log('fileUrl:' + fileUrl);
						const file = await urlToBase64(fileUrl);
						const base64file: base64File = { type: fileType, base64: file };
						files.push(base64file);
					} catch (err: unknown) {
						if (err instanceof Error) {
							this.log(`${err.name}\n${err.message}\n${err.stack}`);
						}
					}
				}
			}
		}
		return files;
	}

	@bindThis
	private async mentionHook(msg: Message) {
		if (!msg.includes([this.name])) {
			return false;
		} else {
			this.log('AiChat requested');

			const relation = await this.ai?.api('users/relation', {
				userId: msg.userId,
			});
			// this.log('Relation data:' + JSON.stringify(relation));

			if (relation[0]?.isFollowing !== true) {
				this.log('The user is not following me:' + msg.userId);
				msg.reply('あなたはaichatを実行する権限がありません。');
				return false;
			}
		}

		const conversationData = await this.ai.api('notes/conversation', {
			noteId: msg.id,
		});

		let exist: AiChatHist | null = null;
		if (conversationData != undefined) {
			for (const message of conversationData) {
				exist = this.aichatHist.findOne({ postId: message.id });
				if (exist != null) return false;
			}
		}

		let type = TYPE_GEMINI;
		const current: AiChatHist = {
			postId: msg.id,
			createdAt: Date.now(),
			type: type,
		};
		if (msg.quoteId) {
			const quotedNote = await this.ai.api('notes/show', {
				noteId: msg.quoteId,
			});
			current.history = [
				{
					role: 'user',
					content:
						'ユーザーが与えた前情報である、引用された文章: ' + quotedNote.text,
				},
			];
		}

		const result = await this.handleAiChat(current, msg);

		if (result) {
			return { reaction: 'like' };
		}
		return false;
	}

	@bindThis
	private async contextHook(key: any, msg: Message) {
		this.log('contextHook...');
		if (msg.text == null) return false;

		const conversationData = await this.ai.api('notes/conversation', {
			noteId: msg.id,
		});

		if (conversationData == null || conversationData.length == 0) {
			this.log('conversationData is nothing.');
			return false;
		}

		let exist: AiChatHist | null = null;
		for (const message of conversationData) {
			exist = this.aichatHist.findOne({ postId: message.id });
			if (exist != null) break;
		}
		if (exist == null) {
			this.log('conversationData is not found.');
			return false;
		}

		this.unsubscribeReply(key);
		this.aichatHist.remove(exist);

		const result = await this.handleAiChat(exist, msg);

		if (result) {
			return { reaction: 'like' };
		}
		return false;
	}

	@bindThis
	private async aichatRandomTalk() {
		this.log('AiChat(randomtalk) started');
		const tl = await this.ai.api('notes/timeline', { limit: 30 });
		const interestedNotes = tl.filter(
			(note) =>
				note.userId !== this.ai.account.id &&
				note.text != null &&
				note.replyId == null &&
				note.renoteId == null &&
				note.cw == null &&
				(note.visibility === 'public' || note.visibility === 'home') &&
				note.files.length == 0 &&
				!note.user.isBot
		);

		if (interestedNotes == undefined || interestedNotes.length == 0)
			return false;

		if (Math.random() >= this.randomTalkProbability) return false;

		const choseNote =
			interestedNotes[Math.floor(Math.random() * interestedNotes.length)];

		const conversationData = await this.ai.api('notes/conversation', {
			noteId: choseNote.id,
		});

		let exist: AiChatHist | null = null;
		if (conversationData != undefined) {
			for (const message of conversationData) {
				exist = this.aichatHist.findOne({ postId: message.id });
				if (exist != null) return false;
			}
		}

		// const friend: Friend | null = this.ai.lookupFriend(choseNote.userId);
		// if (friend == null || friend.love < 7 || choseNote.user.isBot) return false;
		if (choseNote.user.isBot) return false;

		const relation = await this.ai.api('users/relation', {
			userId: choseNote.userId,
		});

		if (relation[0]?.isFollowing === true) {
			const current: AiChatHist = {
				postId: choseNote.id,
				createdAt: Date.now(),
				type: TYPE_GEMINI,
			};

			let targetedMessage = choseNote;
			if (choseNote.extractedText == undefined) {
				const data = await this.ai.api('notes/show', { noteId: choseNote.id });
				targetedMessage = new Message(this.ai, data);
			}

			const result = await this.handleAiChat(current, targetedMessage);

			if (result) {
				return { reaction: 'like' };
			}
		}

		return false;
	}

	@bindThis
	private async handleAiChat(exist: AiChatHist, msg: Message) {
		let text: string, aiChat: AiChat;
		let prompt: string = '';
		if (config.prompt) {
			prompt = config.prompt;
		}

		const reName = RegExp(this.name, 'i');
		const extractedText = msg.extractedText;
		if (extractedText == undefined || extractedText.length == 0) return false;

		const question = extractedText.replace(reName, '').trim();

		const friend: Friend | null = this.ai.lookupFriend(msg.userId);
		let friendName: string | undefined;
		if (friend != null && friend.name != null) {
			friendName = friend.name;
		} else if (msg.user.name) {
			friendName = msg.user.name;
		} else {
			friendName = msg.user.username;
		}

		// Ensure Gemini API key is set
		if (!config.geminiApiKey) {
			msg.reply(serifs.aichat.nothing(exist.type));
			return false;
		}

		aiChat = {
			question: question,
			prompt: prompt,
			api: GEMINI_20_FLASH_API,
			key: config.geminiApiKey,
			history: exist.history,
			friendName: friendName,
		};

		const base64Files: base64File[] = await this.note2base64File(msg.id);
		text = await this.genTextByGemini(aiChat, base64Files);

		if (text == null) {
			this.log(
				'The result is invalid. It seems that tokens and other items need to be reviewed.'
			);
			msg.reply(serifs.aichat.error(exist.type));
			return false;
		}

		msg.reply(serifs.aichat.post(text)).then((reply) => {
			if (!exist.history) {
				exist.history = [];
			}
			exist.history.push({ role: 'user', content: question });
			exist.history.push({ role: 'model', content: text });
			if (exist.history.length > 10) {
				exist.history.shift();
			}
			this.aichatHist.insertOne({
				postId: reply.id,
				createdAt: Date.now(),
				type: exist.type,
				api: aiChat.api,
				history: exist.history,
				friendName: friendName,
			});

			this.subscribeReply(reply.id, reply.id);
			this.setTimeoutWithPersistence(TIMEOUT_TIME, { id: reply.id });
		});
		return true;
	}

	@bindThis
	private async timeoutCallback({ id }) {
		this.log('timeoutCallback...');
		const exist = this.aichatHist.findOne({ postId: id });
		this.unsubscribeReply(id);
		if (exist != null) {
			this.aichatHist.remove(exist);
		}
	}
}
