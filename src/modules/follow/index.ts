import { bindThis } from '@/decorators.js';
import Module from '@/module.js';
import Message from '@/message.js';
import config from '@/config.js';

export default class extends Module {
	public readonly name = 'follow';

	@bindThis
	public install() {
		return {
			mentionHook: this.mentionHook,
		};
	}

	@bindThis
	private async mentionHook(msg: Message) {
		console.log('User host:', msg.user.host);
		console.log('User following status:', msg.user.isFollowing);
		const allowedHosts = config.followAllowedHosts || [];
		const followExcludeInstances = config.followExcludeInstances || [];

		if (
			msg.text &&
			(msg.text.includes('フォロー') ||
				msg.text.includes('フォロバ') ||
				msg.text.includes('follow me'))
		) {
			if (
				!msg.user.isFollowing &&
				(msg.user.host == null ||
					msg.user.host === '' ||
					this.shouldFollowUser(
						msg.user.host,
						allowedHosts,
						followExcludeInstances
					))
			) {
				try {
					await this.ai.api('following/create', {
						userId: msg.userId,
					});
					return {
						reaction: msg.friend.love >= 0 ? 'like' : null,
					};
				} catch (error) {
					console.error('Failed to follow user:', error);
				}
			} else if (!msg.user.isFollowing) {
				await msg.reply('どなたさまですか？');
				return {
					reaction: msg.friend.love >= 0 ? 'hmm' : null,
				};
			}
		} else {
			return false;
		}
	}

	/**
	 * リモートユーザーをフォローすべきかどうかを判定する
	 * @param host ユーザーのホスト
	 * @param allowedHosts 許可されたホストのリスト
	 * @param excludedHosts 除外されたホストのリスト
	 * @returns フォローすべき場合はtrue、そうでない場合はfalse
	 */
	private shouldFollowUser(
		host: string,
		allowedHosts: string[],
		excludedHosts: string[]
	): boolean {
		// followAllowedHostsが存在する場合、followExcludeInstancesを無視する
		if (allowedHosts.length > 0) {
			return this.isHostAllowed(host, allowedHosts);
		}
		// followAllowedHostsが存在しない場合、followExcludeInstancesを適用する
		return !this.isHostExcluded(host, excludedHosts);
	}

	/**
	 * ホストが許可されたホストリストに含まれるかどうかを判定する
	 * @param host ユーザーのホスト
	 * @param allowedHosts 許可されたホストのリスト
	 * @returns 許可された場合はtrue、そうでない場合はfalse
	 */
	private isHostAllowed(host: string, allowedHosts: string[]): boolean {
		for (const allowedHost of allowedHosts) {
			if (allowedHost.startsWith('*')) {
				const domain = allowedHost.slice(1);
				if (host.endsWith(domain)) {
					return true;
				}
			} else if (host === allowedHost) {
				return true;
			}
		}
		return false;
	}

	/**
	 * ホストが除外されたホストリストに含まれるかどうかを判定する
	 * @param host ユーザーのホスト
	 * @param excludedHosts 除外されたホストのリスト
	 * @returns 除外された場合はtrue、そうでない場合はfalse
	 */
	private isHostExcluded(host: string, excludedHosts: string[]): boolean {
		for (const excludedHost of excludedHosts) {
			if (excludedHost.startsWith('*')) {
				const domain = excludedHost.slice(1);
				if (host.endsWith(domain)) {
					return true;
				}
			} else if (host === excludedHost) {
				return true;
			}
		}
		return false;
	}
}
