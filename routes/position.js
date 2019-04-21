
var express = require('express');
var fileUpload = require('../middlewares/fileUpload')
var position_controller = require('../controllers/position')

var router = express.Router();

router.get('/goodsList',position_controller.list);  // 前端分页
router.post('/publish',position_controller.save);  // 发布
router.post('/saveImg',fileUpload); // 存储图片
router.post('/update',position_controller.update);// 编辑商品，改变商品的状态其实也是编辑
router.post('/delete',position_controller.remove); // 删除，zh
router.get('/detail',position_controller.getone);  // 获取某一个的详情
router.get('/changeStatus',position_controller.changeStatus); // 改变商品状态,1:卖出，2:下架,0:正常

router.post('/assign',position_controller.assign); // 登录
router.post('/add',position_controller.add); // 注册
router.post('/quit',position_controller.quit); // 退出

router.post('/addDeal',position_controller.addDeal); // 添加交易表
router.get('/changeDealStatus',position_controller.changeDealStatus);


router.get('/orderList',position_controller.getOrderList); // 获取订单列表 ,根据nickName返回
router.post('/addOrder',position_controller.addOrder); // 提交订单
router.get('/deleteOrder',position_controller.deleteOrder) // 删除订单
router.get('/changeOrderStatus',position_controller.changeOrderStatus) // 改变商品订单的状态, 1 卖出。


router.post('/address',position_controller.addAddress);  // 新增收获地址
router.get('/addressList',position_controller.getAddressList);  //获取地址列表,根据nickName返回
router.get('/deleteAddress',position_controller.deleteAddress)


module.exports=router;