<h1><p align="center"><img src="./ai.svg" alt="藍" height="200"></p></h1>
<p align="center">An Ai for Misskey. <a href="./torisetu.md">About Ai</a></p>

## 本家と違う部分があります
- 地震速報をノート(kmoni)
- follow meに制限を設定可能に
- maze/pollを無効に出来るように
- 反応する言葉を追加
- aichatを改善(色々)

## これなに
Misskey用の日本語Botです。  
小樽潮風高校Project・花隈千冬の公式二次創作設定に従って制作したBotです。  
二次創作botです。

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
	"prompt": "返答のルール:花隈千冬、小樽潮風高校1年生で軽音部ドラム担当。身長151cm、誕生日は3月2日。真面目で引っ込み思案だが、マイペースな花梨先輩や六花先輩には的確なツッコミを入れることも。中2で吹奏楽部を辞めた後、夏色花梨のライブに感動し入部を決意。実家はジャズ喫茶で、ドラマーの父親の影響でカメラにも夢中。抹茶や読書が好きだが甘味は苦手。基本敬語、たまに砕けた話し方。それを踏まえて、次の質問にMarkdownを使って短文で返答してください(短くてもOK)。ただし、リスト記法はMisskeyが対応しておらず、パーサーが壊れるため使用禁止です。列挙する場合は「・」を使ってください。",
   "aichatRandomTalkEnabled": "ランダムにaichatを発動し話しかける機能を有効にする場合は true を入れる (無効にする場合は false)",
	"aichatRandomTalkProbability": "ランダムにaichatを発動し話しかける機能の確率(1以下の小数点を含む数値(0.01など。1に近づくほど発動しやすい))",
	"aichatRandomTalkIntervalMinutes": "ランダムトーク間隔(分)。指定した時間ごとにタイムラインを取得し、適当に選んだ人にaichatする(1の場合1分ごと実行)。デフォルトは720分(12時間)",
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
	"prompt": "返答のルール:花隈千冬、小樽潮風高校1年生で軽音部ドラム担当。身長151cm、誕生日は3月2日。真面目で引っ込み思案だが、マイペースな花梨先輩や六花先輩には的確なツッコミを入れることも。中2で吹奏楽部を辞めた後、夏色花梨のライブに感動し入部を決意。実家はジャズ喫茶で、ドラマーの父親の影響でカメラにも夢中。抹茶や読書が好きだが甘味は苦手。基本敬語、たまに砕けた話し方。それを踏まえて、次の質問にMarkdownを使って短文で返答してください(短くてもOK)。ただし、リスト記法はMisskeyが対応しておらず、パーサーが壊れるため使用禁止です。列挙する場合は「・」を使ってください。",
	"aichatRandomTalkEnabled": "ランダムにaichatを発動し話しかける機能を有効にする場合は true を入れる (無効にする場合は false)",
	"aichatRandomTalkProbability": "ランダムにaichatを発動し話しかける機能の確率(1以下の小数点を含む数値(0.01など。1に近づくほど発動しやすい))",
	"aichatRandomTalkIntervalMinutes": "ランダムトーク間隔(分)。指定した時間ごとにタイムラインを取得し、適当に選んだ人にaichatする(1の場合1分ごと実行)。デフォルトは720分(12時間)",
	"mecab": "/usr/bin/mecab",
	"mecabDic": "/usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd/",
	"memoryDir": "data",
	"followAllowedHosts": ["*.0il.pw", "misskey.io"],
	"followExcludeInstances": ["*.nakn.jp", "misskey.io"],
	"mazeEnable": true,
	"pollEnable": true
}
```
`docker-compose build` して `docker-compose up` すれば起動できます。※
`docker-compose.yml` の `enable_mecab` を `0` にすると、MeCabをインストールしないようにもできます。（メモリが少ない環境など）  
※`docker-compose.yml`にビルド済みイメージ記述済みなので`docker compose up -d`で起動できます。

## フォント
一部の機能にはフォントが必要です。藍にはフォントは同梱されていないので、ご自身でフォントをインストールディレクトリに`font.ttf`という名前で設置してください。

## 記憶
藍は記憶の保持にインメモリデータベースを使用しており、藍のインストールディレクトリに `memory.json` という名前で永続化されます。

## ライセンス
MIT

## Awards
<img src="./WorksOnMyMachine.png" alt="Works on my machine" height="120">
