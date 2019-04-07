
var express = require('express');
var fileUpload = require('../middlewares/fileUpload')
var position_controller = require('../controllers/position')

var router = express.Router();

router.get('/goodsList',position_controller.list);  // 前端分页
router.post('/publish',position_controller.save);  // 发布
router.post('/saveImg',function(req,res){fileUpload}); // 存储图片
router.post('/update',function(req,res){position_controller.update});// 编辑商品，改变商品的状态其实也是编辑
router.post('/delete',function(req,res){position_controller.remove}); // 删除，zh
router.get('/detail',function(req,res){position_controller.getone});  // 获取某一个的详情
router.get('/changeStatus',function(req,res){position_controller.changeStatus}); // 改变商品状态,1:卖出，2:下架,0:正常

router.post('/assign',function(req,res){position_controller.assign}); // 登录
router.post('/add',function(req,res){position_controller.add}); // 注册
router.post('/quit',function(req,res){position_controller.quit}); // 退出

router.get('/orderList',function(req,res){position_controller.getOrderList}); // 获取订单列表 ,根据nickName返回
router.post('/addOrder',function(req,res){position_controller.addOrder}); // 提交订单

router.post('/address',function(req,res){position_controller.addAddress});  // 新增收获地址
router.get('/addressList',function(req,res){position_controller.getAddressList});  //获取地址列表,根据nickName返回


module.exports=router;