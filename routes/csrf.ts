import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import crypto from 'crypto'

export const router = express.Router()
router.use(
  session({
    secret: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 1000 * 5,
    },
  })
)
router.use(express.urlencoded({ extended: true }))
router.use(cookieParser())
// セションデータを保持
let sessionData: any = {}

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username !== 'user1' || password !== 'password') {
    res.status(403)
    res.send('ログイン失敗')
    return
  }
  // セッションにユーザ名を格納
  sessionData = req.session
  sessionData.username = username
  // 2重送信クッキーのトークン
  const token = crypto.randomUUID()
  res.cookie('csrf_token', token, {
    secure: true,
  })
  // csrf検証用ページへリダイレクト
  res.redirect('/csrf_test.html')
})

router.post('/remit', (req, res) => {
  const reqUserName = (req.session as any).username
  if (!reqUserName || reqUserName !== sessionData.username) {
    res.status(403)
    res.send('ログインしていません!!。')
    return
  }
  if (req.cookies['csrf_token'] !== req.body['csrf_token']) {
    res.status(400)
    res.send('不正なリクエストです')
    return
  }
  const { to, amount } = req.body
  res.send(`「${to}」へ${amount}円送金しました`)
})
