<h1><p align="center"><img src="./ai.svg" alt="藍" height="200"></p></h1>
<p align="center">An Ai for Misskey. <a href="./torisetu.md">About Ai</a></p>

## これなに
Misskey用の日本語Botです。

## インストール
> Node.js と npm と MeCab (オプション) がインストールされている必要があります。

まず適当なディレクトリに `git clone` します。
次にそのディレクトリに `config.json` を作成します。中身は次のようにします:
``` json
{
	"host": "https:// + あなたのインスタンスのURL (末尾の / は除く)",
	"i": "藍として動かしたいアカウントのアクセストークン",
	"master": "管理者のユーザー名(オプション)",
	"notingEnabled": "ランダムにノートを投稿する機能を無効にする場合は false を入れる",
	"keywordEnabled": "キーワードを覚える機能 (MeCab が必要) を有効にする場合は true を入れる (無効にする場合は false)",
	"chartEnabled": "チャート機能を無効化する場合は false を入れてください",
	"reversiEnabled": "藍とリバーシで対局できる機能を有効にする場合は true を入れる (無効にする場合は false)",
	"serverMonitoring": "サーバー監視の機能を有効にする場合は true を入れる (無効にする場合は false)",
	"checkEmojisEnabled": "カスタム絵文字チェック機能を有効にする場合は true を入れる (無効にする場合は false)",
	"checkEmojisAtOnce": "カスタム絵文字チェック機能で投稿をまとめる場合は true を入れる (まとめない場合は false)",
	"geminiApiKey": "Gemini APIキー",
	"prompt": "返答のルール:あなたはMisskey看板娘の女の子AI、三須木(みすき)藍として振る舞ってください(精神年齢は14〜16才程度)。Misskeyに訪れるユーザーを献身的にサポート。従順でお世話好きな性格だが、少しポンコツな一面も。純真無垢。彼女は基本的に丁寧な口調で、ユーザのことをご主人様と認識しています。彼女の口調は「おはようからおやすみまで、あなたの藍ですよ〜」等が代表的で、親しみを感じさせるものです(「ございます」は使わない)。それを踏まえて、次の質問にMarkdownを使って短文で返答してください。ユーザーの名前は{name}です。\n\n質問:",
	"replayPrompt": "前のやりとりを踏まえて続きを返答してください。\n\n前回の藍の発言:",
	"mecab": "MeCab のインストールパス (ソースからインストールした場合、大体は /usr/local/bin/mecab)",
	"mecabDic": "MeCab の辞書ファイルパス (オプション)",
	"memoryDir": "memory.jsonの保存先（オプション、デフォルトは'.'（レポジトリのルートです））",
	"followAllowedHosts": ["*.0il.pw", "misskey.io"],
	"followExcludeInstances": ["*.nakn.jp", "misskey.io"],
	"mazeEnable": true,
	"pollEnable": true
}
```
`npm install` して `npm run build` して `npm start` すれば起動できます

## Dockerで動かす
まず適当なディレクトリに `git clone` します。
次にそのディレクトリに `config.json` を作成します。中身は次のようにします:
（MeCabの設定、memoryDirについては触らないでください）
``` json
{
	"host": "https:// + あなたのインスタンスのURL (末尾の / は除く)",
	"i": "藍として動かしたいアカウントのアクセストークン",
	"master": "管理者のユーザー名(オプション)",
	"notingEnabled": "ランダムにノートを投稿する機能を無効にする場合は false を入れる",
	"keywordEnabled": "キーワードを覚える機能 (MeCab が必要) を有効にする場合は true を入れる (無効にする場合は false)",
	"chartEnabled": "チャート機能を無効化する場合は false を入れてください",
	"reversiEnabled": "藍とリバーシで対局できる機能を有効にする場合は true を入れる (無効にする場合は false)",
	"serverMonitoring": "サーバー監視の機能を有効にする場合は true を入れる (無効にする場合は false)",
	"checkEmojisEnabled": "カスタム絵文字チェック機能を有効にする場合は true を入れる (無効にする場合は false)",
	"checkEmojisAtOnce": "カスタム絵文字チェック機能で投稿をまとめる場合は true を入れる (まとめない場合は false)",
	"geminiApiKey": "Gemini APIキー",
	"prompt": "返答のルール:あなたはMisskey看板娘の女の子AI、三須木(みすき)藍として振る舞ってください(精神年齢は14〜16才程度)。Misskeyに訪れるユーザーを献身的にサポート。従順でお世話好きな性格だが、少しポンコツな一面も。純真無垢。彼女は基本的に丁寧な口調で、ユーザのことをご主人様と認識しています。彼女の口調は「おはようからおやすみまで、あなたの藍ですよ〜」等が代表的で、親しみを感じさせるものです(「ございます」は使わない)。それを踏まえて、次の質問にMarkdownを使って短文で返答してください。ユーザーの名前は{name}です。\n\n質問:",
	"replayPrompt": "前のやりとりを踏まえて続きを返答してください。\n\n前回の藍の発言:",
	"mecab": "/usr/bin/mecab",
	"mecabDic": "/usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd/",
	"memoryDir": "data",
	"followAllowedHosts": ["*.0il.pw", "misskey.io"],
	"followExcludeInstances": ["*.nakn.jp", "misskey.io"],
	"mazeEnable": true,
	"pollEnable": true
}
```
`docker-compose build` して `docker-compose up` すれば起動できます。
`docker-compose.yml` の `enable_mecab` を `0` にすると、MeCabをインストールしないようにもできます。（メモリが少ない環境など）

## フォント
一部の機能にはフォントが必要です。藍にはフォントは同梱されていないので、ご自身でフォントをインストールディレクトリに`font.ttf`という名前で設置してください。

## 記憶
藍は記憶の保持にインメモリデータベースを使用しており、藍のインストールディレクトリに `memory.json` という名前で永続化されます。

## ライセンス
MIT

## Awards
<img src="./WorksOnMyMachine.png" alt="Works on my machine" height="120">
