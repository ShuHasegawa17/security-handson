import express from 'express'

import { router as api } from './routes/api'
const app = express()
const port = 3000

// ルートアクセスで、publi内cの静的ファイルが表示される
app.use(express.static('public'))

app.use(express.json()) // ルート設定前にこれがないとbodyが空になる
app.use('/api', api)

app.get('/', (req, res, next) => {
  res.end('TOP PAGE')
})

app.listen(port, () => {
  console.log(`server is runnning on http://localhost:${port}`)
})
