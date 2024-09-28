const express=require('express')
const isAuthenticated=require('../../../../auth/isAuthenticated')
const {createProduct,buyproduct} = require('../controller/productCon')
const router=express.Router()


router.post('/create',isAuthenticated,createProduct)
router.post('/buyproduct',isAuthenticated,buyproduct)


module.exports=router


