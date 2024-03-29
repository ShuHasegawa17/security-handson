// ランダム文字列の生成
import crypto from 'crypto'
import express from 'express'
import helmet from 'helmet'

import { router as api } from './routes/api'
import { router as csrf } from './routes/csrf'
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(helmet.frameguard({ action: 'sameorigin' }))

// ルートアクセスで、publi内cの静的ファイルが表示される
app.use(express.static('public'))
app.use(express.json()) // ルート設定前にこれがないとbodyが空になる
app.use('/api', api)
app.use('/csrf', csrf)

app.get('/', (req, res, next) => {
  res.end('TOP PAGE')
})

app.get('/csp', (req, res) => {
  //ランダム文字列の生成（base64でエンコード）
  const nonceValue = crypto.randomBytes(16).toString('base64')
  // CSPの有効化
  res.header(
    'Content-Security-Policy',
    `script-src 'nonce-${nonceValue}' 'strict-dynamic';` +
      "object-src 'none';" +
      "base-uri 'none';" +
      "require-trusted-types-for 'script';"
  )
  res.render('csp', { nonce: nonceValue })
})

//フォームの内容を解析してreq.bodyへ格納
app.use(express.urlencoded({ extended: true }))

app.post('/signup', (req, res) => {
  console.log(req.body)
  res.send('アカウント登録しました。')
})

app.listen(port, () => {
  console.log(`server is runnning on http://localhost:${port}`)
})
