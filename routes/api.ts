import express from 'express'
export const router = express.Router()

// アクセスを許可するオリジン
const allowList = ['http://localhost:3000', 'http://site.example:3000']
// use()リクエスト送信時に必ず実行
router.use((req, res, next) => {
  // リクエスト元のオリジンが許可リストに含まれている場合、オリジンを許可
  if (req.headers.origin && allowList.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
  }
  // プリフライトリクエストの送信時にX-Tokenを許可する
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', 'X-Token')
  }
  // これがないと処理がここで終わる。（router.getやpostなどの関数に行かない）
  next()
})

router.get('/', (req, res) => {
  // headerの設定
  res.setHeader('X-timestamp', Date.now())

  // response(header)
  const lang = req.header('x-lang')
  const message = lang === 'en' ? 'message desu' : 'メッセージです'
  // responseの送信
  const param = req.query.message
  if (!param) {
    //res.status(400)
  }
  res.send({ message })
})

router.post('/', (req, res) => {
  // requestの表示
  console.log('res', req.body)
  res.end()
})
