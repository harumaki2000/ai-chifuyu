// せりふ

export default {
	core: {
		setNameOk: (name) => `わかりました。これからは${name}とお呼びしますね！`,

		san: 'さん付けした方がいいですか？',

		yesOrNo: '「はい」か「いいえ」しかわからないんです...',

		hello: (name) => (name ? `こんにちは、${name}♪` : `こんにちは♪`),

		helloNight: (name) => (name ? `こんばんは、${name}♪` : `こんばんは♪`),

		goodMorning: (tension, name) =>
			name
				? `おはようございます、${name}！${tension}`
				: `おはようございます！${tension}`,

		/*
		goodMorning: {
			normal: (tension, name) => name ? `おはようございます、${name}！${tension}` : `おはようございます！${tension}`,

			hiru: (tension, name) => name ? `おはようございます、${name}！${tension}もうお昼ですよ？${tension}` : `おはようございます！${tension}もうお昼ですよ？${tension}`,
		},
*/

		goodNight: (name) =>
			name ? `おやすみなさい、${name}！` : 'おやすみなさい！',

		omedeto: (name) =>
			name ? `ありがとうございます、${name}♪` : 'ありがとうございます♪',

		erait: {
			general: (name) =>
				name
					? [`${name}、今日もえらいです！`, `${name}、今日もえらいですよ～♪`]
					: [`今日もえらいです！`, `今日もえらいですよ～♪`],

			specify: (thing, name) =>
				name
					? [
							`${name}、${thing}てえらいです！`,
							`${name}、${thing}てえらいですよ～♪`,
						]
					: [`${thing}てえらいです！`, `${thing}てえらいですよ～♪`],

			specify2: (thing, name) =>
				name
					? [
							`${name}、${thing}でえらいです！`,
							`${name}、${thing}でえらいですよ～♪`,
						]
					: [`${thing}でえらいです！`, `${thing}でえらいですよ～♪`],
		},

		okaeri: {
			love: (name) =>
				name
					? [
							`おかえりなさい、${name}♪`,
							`おかえりなさいませっ、${name}っ。…これでいいですか……？`,
						]
					: [
							'おかえりなさい♪',
							'おかえりなさいませっ、ご主人様っ。…これでいいですか……？',
						],

			love2: (name) =>
				name
					? `おかえりなさいませ♡♡♡${name}っっ♡♡♡♡♡……何度言っても慣れないですね。`
					: 'おかえりなさいませ♡♡♡ご主人様っっ♡♡♡♡♡……何度言っても慣れないですね。',

			normal: (name) =>
				name ? `おかえりなさい、${name}！` : 'おかえりなさい！',
		},

		itterassyai: {
			love: (name) =>
				name ? `いってらっしゃい、${name}♪` : 'いってらっしゃい♪',

			normal: (name) =>
				name ? `いってらっしゃい、${name}！` : 'いってらっしゃい！',
		},

		tooLong: '長すぎる気がします...',

		invalidName: '発音が難しい気がします',

		nadenade: {
			normal: 'ひゃっ…！ びっくりしました',

			love2: ['わわっ… 恥ずかしいです', 'あうぅ… 恥ずかしいです…', 'ふやぁ…？'],

			love3: [
				'んぅ… ありがとうございます♪',
				'わっ、なんだか落ち着きますね♪',
				'くぅんっ… 安心します…',
				'眠くなってきました…',
			],

			hate1: '…っ！ やめてほしいです...',

			hate2: '触らないでください',

			hate3: '近寄らないでください',

			hate4: 'やめてください。通報しますよ？',
		},

		kawaii: {
			normal: ['ありがとうございます♪', '照れちゃいます...'],

			love: ['嬉しいです♪', '照れちゃいます...'],

			hate: '…ありがとうございます',
		},

		suki: {
			normal: 'えっ… ありがとうございます…♪',

			love: (name) => `私もその… ${name}のこと好きですよ！`,

			hate: null,
		},

		hug: {
			normal: 'ぎゅー...',

			love: 'ぎゅーっ♪',

			hate: '離れてください...',
		},

		humu: {
			love: 'え、えっと…… ふみふみ……… どうですか…？',

			normal: 'えぇ... それはちょっと...',

			hate: '……',
		},

		batou: {
			love: 'えっと…、お、おバカさん…？',

			normal: '(じとー…)',

			hate: '…頭大丈夫ですか？',
		},

		itai: (name) =>
			name
				? `${name}、大丈夫ですか…？ いたいのいたいの飛んでけっ！`
				: '大丈夫ですか…？ いたいのいたいの飛んでけっ！',

		ote: {
			normal: 'くぅん... 私わんちゃんじゃないですよ...？',

			love1: 'わん！',

			love2: 'わんわん♪',
		},

		shutdown: '私まだ眠くないですよ...？',

		transferNeedDm: 'わかりました、それはチャットで話しませんか？',

		transferCode: (code) => `わかりました。\n合言葉は「${code}」です！`,

		transferFailed: 'うーん、合言葉が間違ってませんか...？',

		transferDone: (name) =>
			name
				? `はっ...！ おかえりなさい、${name}！`
				: `はっ...！ おかえりなさい！`,
	},

	keyword: {
		learned: (word, reading) => `(${word}..... ${reading}..... 覚えました)`,

		remembered: (word) => `${word}`,
	},

	dice: {
		done: (res) => `${res} です！`,
	},

	birthday: {
		happyBirthday: (name) =>
			name
				? `お誕生日おめでとうございます、${name}🎉`
				: 'お誕生日おめでとうございます🎉',
	},

	/**
	 * リバーシ
	 */
	reversi: {
		/**
		 * リバーシへの誘いを承諾するとき
		 */
		ok: '良いですよ～',

		/**
		 * リバーシへの誘いを断るとき
		 */
		decline: 'ごめんなさい、今リバーシはするなと言われてます...',

		/**
		 * 対局開始
		 */
		started: (name, strength) =>
			`対局を${name}と始めました！ (強さ${strength})`,

		/**
		 * 接待開始
		 */
		startedSettai: (name) => `(${name}の接待を始めました)`,

		/**
		 * 勝ったとき
		 */
		iWon: (name) => `${name}に勝ちました♪`,

		/**
		 * 接待のつもりが勝ってしまったとき
		 */
		iWonButSettai: (name) => `(${name}に接待で勝っちゃいました...)`,

		/**
		 * 負けたとき
		 */
		iLose: (name) => `${name}に負けました...`,

		/**
		 * 接待で負けてあげたとき
		 */
		iLoseButSettai: (name) => `(${name}に接待で負けてあげました...♪)`,

		/**
		 * 引き分けたとき
		 */
		drawn: (name) => `${name}と引き分けました～`,

		/**
		 * 接待で引き分けたとき
		 */
		drawnSettai: (name) => `(${name}に接待で引き分けました...)`,

		/**
		 * 相手が投了したとき
		 */
		youSurrendered: (name) => `${name}が投了しちゃいました`,

		/**
		 * 接待してたら相手が投了したとき
		 */
		settaiButYouSurrendered: (name) =>
			`(${name}を接待していたら投了されちゃいました... ごめんなさい)`,
	},

	/**
	 * 数当てゲーム
	 */
	guessingGame: {
		/**
		 * やろうと言われたけど既にやっているとき
		 */
		alreadyStarted: 'え、ゲームは既に始まってますよ！',

		/**
		 * タイムライン上で誘われたとき
		 */
		plzDm: 'メッセージでやりましょう！',

		/**
		 * ゲーム開始
		 */
		started: '0~100の秘密の数を当ててみてください♪',

		/**
		 * 数字じゃない返信があったとき
		 */
		nan: '数字でお願いします！「やめる」と言ってゲームをやめることもできますよ！',

		/**
		 * 中止を要求されたとき
		 */
		cancel: 'わかりました～。ありがとうございました♪',

		/**
		 * 小さい数を言われたとき
		 */
		grater: (num) => `${num}より大きいですね`,

		/**
		 * 小さい数を言われたとき(2度目)
		 */
		graterAgain: (num) => `もう一度言いますが${num}より大きいですよ！`,

		/**
		 * 大きい数を言われたとき
		 */
		less: (num) => `${num}より小さいですね`,

		/**
		 * 大きい数を言われたとき(2度目)
		 */
		lessAgain: (num) => `もう一度言いますが${num}より小さいですよ！`,

		/**
		 * 正解したとき
		 */
		congrats: (tries) => `正解です🎉 (${tries}回目で当てました)`,
	},

	/**
	 * 数取りゲーム
	 */
	kazutori: {
		alreadyStarted: '今ちょうどやってますよ～',

		matakondo: 'また今度やりましょう！',

		intro: (minutes) =>
			`みなさん、数取りゲームしましょう！\n0~100の中で最も大きい数字を取った人が勝ちです。他の人と被ったらだめですよ～\n制限時間は${minutes}分です。数字はこの投稿にリプライで送ってくださいね！`,

		finish: 'ゲームの結果発表です！',

		finishWithWinner: (user, name) =>
			name
				? `今回は${user}さん(${name})の勝ちです！またやりましょう♪`
				: `今回は${user}さんの勝ちです！またやりましょう♪`,

		finishWithNoWinner: '今回は勝者はいませんでした... またやりましょう♪',

		onagare: '参加者が集まらなかったのでお流れになりました...',
	},

	/**
	 * 絵文字生成
	 */
	emoji: {
		suggest: (emoji) => `こんなのはどうですか？→${emoji}`,
	},

	/**
	 * 占い
	 */
	fortune: {
		cw: (name) =>
			name
				? `私が今日の${name}の運勢を占いました...`
				: '私が今日のあなたの運勢を占いました...',
	},

	/**
	 * タイマー
	 */
	timer: {
		set: 'わかりました！',

		invalid: 'うーん...？',

		tooLong: '長すぎます…',

		notify: (time, name) =>
			name ? `${name}、${time}経ちましたよ！` : `${time}経ちましたよ！`,
	},

	/**
	 * リマインダー
	 */
	reminder: {
		invalid: 'うーん...？',

		doneFromInvalidUser: 'イタズラはめっですよ！',

		reminds: 'やること一覧です！',

		notify: (name) =>
			name ? `${name}、これやりましたか？` : `これやりましたか？`,

		notifyWithThing: (thing, name) =>
			name
				? `${name}、「${thing}」やりましたか？`
				: `「${thing}」やりましたか？`,

		done: (name) =>
			name
				? [
						`よく出来ました、${name}♪`,
						`${name}、さすがですっ！`,
						`${name}、えらすぎます...！`,
					]
				: [`よく出来ました♪`, `さすがですっ！`, `えらすぎます...！`],

		cancel: `わかりました。`,
	},

	/**
	 * バレンタイン
	 */
	valentine: {
		chocolateForYou: (name) =>
			name
				? `${name}、その... チョコレート作ったのでよかったらどうぞ！🍫`
				: 'チョコレート作ったのでよかったらどうぞ！🍫',
	},

	server: {
		cpu: 'サーバーの負荷が高そうです。大丈夫でしょうか...？',
	},

	maze: {
		post: '今日の迷路です！ #AiMaze',
		foryou: '描きました！',
	},

	chart: {
		post: 'インスタンスの投稿数です！',
		foryou: '描きました！',
	},

	checkCustomEmojis: {
		post: (server_name, num) =>
			`${server_name}に${num}件の絵文字が追加されました！`,
		emojiPost: (emoji) => `:${emoji}:\n(\`${emoji}\`) #AddCustomEmojis`,
		postOnce: (server_name, num, text) =>
			`${server_name}に${num}件の絵文字が追加されました！\n${text} #AddCustomEmojis`,
		emojiOnce: (emoji) => `:${emoji}:(\`${emoji}\`)`,
	},

	aichat: {
		nothing: (type) => (type) =>
			`あぅ... ${type}の${type}のAPIキーが登録されてないみたいです`,
		error: (type) => (type) =>
			`うぇ...${type}で${type}でエラーが発生しちゃったみたいです。gemini-flashだと動くかも？gemini-flashだと動くかも？`,
		post: (text, type) => `${text} (${type}) #aichat`,
	},

	sleepReport: {
		report: (hours) => `んぅ、${hours}時間くらい寝ちゃってたみたいです`,
		reportUtatane: 'ん... うたた寝しちゃってました',
	},

	noting: {
		notes: [
			'ちょっと眠いです',
			'いいですよ？',
			'あれ…これをこうして…あれれ？',
			'ぼーっとしてました……',
			'ふぅ…少し疲れました',
			'お味噌汁、作りましょうか？',
			'ご飯にしますか？お風呂にしますか？',
			'ふええっ！？',
			'みすきーって、素敵な名前ですよね。',
			'うぅ、リバーシ難しいです……',
			'失敗も次に繋がればいいですよね！',
			'なんだか、おなか空いちゃいました……',
			'お掃除、ちゃんとしましょうね？',
			'今日もお勤めご苦労様です！ 私も頑張ります♪',
			'えっと、何しようとしてたんだっけ…？',
			'やっぱりおうちが一番落ち着きます。',
			'疲れたら、私と温かい抹茶でも飲みましょう。',
			'離れていても、心は近くにいますよ。',
			'わんちゃん、可愛いです……',
			'プログラム……ですか？',
			'何もしてないのに、パソコンが壊れました……',
			'ひゃっ…！\nメガネ取らないでくださいっ！',
			'抗逆コンパイル性……何でしょう、それ……',
			'小樽潮風高校の制服、かわいくて好きです',
			'ふわぁ……お布団、気持ちいいです……',
			'メイド服、似合ってますか……？',
			'挨拶ができる人間は開発もできる！…って、syuiloさんが言ってました',
			'えっと……どこ見てるんですか？',
			'はい、ママですよ〜……これでいいですか？',
			'せっかくだから、この緑の扉、選びます！',
			'よしっ',
			'Misskeyの開発者さんって、朝ゆっくりなんですね。',
			'の、のじゃ……？',
			'にゃんにゃん……ですか？',
			'上から来ます！気をつけてください！',
			'ふぁ……眠いです',
			'私の"インスタンス"、分身できます！でも\n人数分のエネルギー消費があるので、4人くらいが限界なんです……',
			'うとうと……',
			'あ！花梨先輩がまた六花先輩のヨーグルト食べてます！',
			'花梨先輩、ベースとドラムで合わせましょう！',
			'六花先輩！一緒にヨーグルト食べませんか？',
		],
		want: (item) => `${item}、欲しいなぁ...`,
		see: (item) => `お散歩していたら、道に${item}が落ちているのを見たんです！`,
		expire: (item) => `気づいたら、${item}の賞味期限が切れてました…`,
	},
};

export function getSerif(variant: string | string[]): string {
	if (Array.isArray(variant)) {
		return variant[Math.floor(Math.random() * variant.length)];
	} else {
		return variant;
	}
}
