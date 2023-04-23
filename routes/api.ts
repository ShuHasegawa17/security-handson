import express from 'express'
export const router = express.Router()
router.get('/', (req, res) => {
  // headerの設定
  res.setHeader('X-timestamp', Date.now())

  // response(header)
  const lang = req.header('x-lang')
  const message = lang === 'en' ? 'message desu' : 'メッセージです'
  // responseの送信
  const param = req.query.message
  if (!param) {
    res.status(400)
  }
  res.send({ message })
})

router.post('/', (req, res) => {
  // requestの表示
  console.log('res', req.body)
  res.end()
})
