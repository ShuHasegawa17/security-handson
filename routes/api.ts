import express from 'express'
export const router = express.Router()
router.get('/', (_, res) => {
    // responseの送信
    res.send({ message: 'hello' })
})

router.post('/', (req, res) => {
    // requestの表示
    console.log('res', req.body)
    res.end()
})
