const express = require('express')
const path = require('path')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const { sequelize } = require('./models')
const app = express()

app.set('port', process.env.PORT || 8002)

sequelize
   .sync({ force: false }) // 기존 테이블을 초기화 할지 여부-> 초기화 X
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(`데이터 베이스 연결 실패: ${err}`)
   })

app.use(
   cors({
      origin: 'http://localhost:3000', // 특정 주소만 request 허용
      credentials: true, // 쿠키, 세션 등 인증 정보 허용
   })
)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.options('*', cors())
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기중')
})
