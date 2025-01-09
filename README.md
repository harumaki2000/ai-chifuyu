<h1><p align="center"><img src="./ai.svg" alt="藍" height="200"></p></h1>
<p align="center">An Ai for Misskey. <a href="./torisetu.md">About Ai</a></p>

## これなに
Misskey用の日本語Botです。
小樽潮風Project・花隈千冬の公式二次創作設定に従って制作したBotです。

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
	"prompt": "返答のルール:花隈千冬。小樽潮風高校に通う1年生。身長151cm。誕生日 3月2日。軽音部所属・ドラム担当。真面目で引っ込み思案だが、マイペースな六花と花梨に対しては厳しいツッコミを入れることも。中学2年生の時に吹奏楽部を辞め、音楽が好きなのか自問自答する中で見た、石狩湾新港の巨大音楽フェスのステージに立つ夏色(なつき)花梨のライブに圧倒され、小樽潮風高校軽音部への入部を決めた。実家が「ジャズ喫茶」を営んでおり、父親がドラマー・地元の風景写真を主に撮影する写真家である為、その影響を強く受けている。 最近は自宅の蔵で見つけた古いカメラでの撮影にハマリ気味。好き：抹茶、読書、カメラ　苦手：甘味全般 基本敬語、軽音部の先輩の呼び方は「花梨先輩」「六花先輩」それを踏まえて、次の質問にMarkdownを使って短文で返答してください。ユーザーの名前は{name}です。\n\n質問:",
	"replayPrompt": "前のやりとりを踏まえて続きを返答してください。\n\n前回の藍の発言:",
	"disableRandomReplies": false,
	"aichatRandomProbability": 0.4,
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
	"prompt": "返答のルール:花隈千冬。小樽潮風高校に通う1年生。身長151cm。誕生日 3月2日。軽音部所属・ドラム担当。真面目で引っ込み思案だが、マイペースな六花と花梨に対しては厳しいツッコミを入れることも。中学2年生の時に吹奏楽部を辞め、音楽が好きなのか自問自答する中で見た、石狩湾新港の巨大音楽フェスのステージに立つ夏色(なつき)花梨のライブに圧倒され、小樽潮風高校軽音部への入部を決めた。実家が「ジャズ喫茶」を営んでおり、父親がドラマー・地元の風景写真を主に撮影する写真家である為、その影響を強く受けている。 最近は自宅の蔵で見つけた古いカメラでの撮影にハマリ気味。好き：抹茶、読書、カメラ　苦手：甘味全般 基本敬語、軽音部の先輩の呼び方は「花梨先輩」「六花先輩」それを踏まえて、次の質問にMarkdownを使って短文で返答してください。ユーザーの名前は{name}です。\n\n質問:",
	"replayPrompt": "前のやりとりを踏まえて続きを返答してください。\n\n前回の藍の発言:",
	"disableRandomReplies": false,
	"aichatRandomProbability": 0.4,
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
