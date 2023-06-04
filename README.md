# notification-server

## これは何?

各種サービスによる通知サーバーを実現するGoogle Apps Script (GAS) です。
現状Line Notifyのみ。

## インストール

### リポジトリ取得

```
git clone https://github.com/akaoto/notification-server.git
cd notification-server
```

### GASプロジェクト準備

Google DriveでGASプロジェクトを新規作成します。

スクリプトプロパティを設定します。

| スクリプトプロパティ            | 説明                                                             | 値           |
|---------------------------------|------------------------------------------------------------------|--------------|
| `NOTIFICATION_SERVER_API_TOKEN` | 通知サーバーAPI認証用                                            | 任意の文字列 |
| `LINE_NOTIFY_ACCESS_TOKEN`      | [Line Notify](https://notify-bot.line.me/ja/) のアクセストークン | ←            |


また、 `.clasp.json` の `scriptId` を新規作成したGASのスクリプトIDで書き換えます。

### デプロイ

```
clasp push
clasp deploy
```

GASプロジェクトで任意の関数を実行し、OAuth認証を行います。

## 使用方法 (curlでの例)

まずアクセストークンを発行します。

```
curl -L https://script.google.com/macros/s/[デプロイID]/exec \
     -d '{"api_token": "[NOTIFICATION_SERVER_API_TOKENの値]"}'
```

```json
{
    "code": 200
    "access_token": "ya29.xxxxxxxxxxxxxxxx"
}
```

アクセストークンで通知APIを実行します。

```
curl -L https://script.google.com/macros/s/[デプロイID]/exec/line/notify \
     -H 'Authorization: Bearer ya29.xxxxxxxxxxxxxxxx'
     -d '{"message": "hoge"}'
```

## example

### インストール


```bash
sudo apt install -y jq
sudo bash -c 'echo export PATH=\$PATH:/home/pi/notification-server >> /etc/profile'
sudo bash -c 'echo export NOTIFICATION_SERVER_URL=https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec >> /etc/profile'
sudo bash -c 'echo export NOTIFICATION_SERVER_API_TOKEN=[API_TOKEN] >> /etc/profile'
```

### 実行

`bash
line_notify.sh "test message"
`
