const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const router = express.Router()

router.post('/', async (req, res, next) => {
   const { email, nick, password } = req.body
   try {
      const exUser = await User.findOne({ where: { email } })
      if (exUser) {
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 사용자 입니다',
         })
      }

      const hash = await bcrypt.hash(password, 12)

      const newUser = await User.create({
         email,
         nick,
         password: hash,
      })

      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다',
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nuck,
         },
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '회원가입중 오류',
         error,
      })
   }
})

module.exports = router
