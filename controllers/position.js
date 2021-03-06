
const { errorData } = require('../util')
var position_model = require('../models/data')
var users_model = require('../models/users');
var orders_model = require('../models/orders');
var address_model = require('../models/address');
var deals_model = require('../models/deals')



const list = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await position_model.listall(req.query);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

const save = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let imgsArray = [];
    let imgUrl = '';
    const { pics = [] } = req.body;
    pics.forEach(item => {
        imgUrl = '/uploads/logos/' + item.name;
        imgsArray.push(imgUrl);

    });
    if (req.body.pics) { delete req.body.pics; }

    const realData = { ...req.body, pics: imgsArray }
    let _data = await position_model.save(realData);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })


}

const remove = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');

    let _data = await position_model.remove(req.body);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })

}
const getone = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await position_model.getone(req.query);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })

}

// 改变商品的状态
const changeStatus = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await position_model.changeStatus(req.query);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}


const update = async (req, res) => {

    res.set('content-type', 'application/json; charset=utf8');
    let imgsArray = [];
    let imgUrl = '';
    const { pics } = req.body;
    const picsName = pics.substring(12);
    imgUrl = '/uploads/logos/' + picsName;
    imgsArray.push(imgUrl);
    if (req.body.pics) { delete req.body.pics; }

    const realData = { ...req.body, pics: imgsArray }
    let _data = await position_model.update(realData);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })

}

// 登录注册模块
const assign = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await users_model.assign(req.body);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

// 改变买家的余额并返回
const changeBuyMoney = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await users_model.changeBuyMoney(req.body);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

// 充值
const addMoney = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await users_model.addMoney(req.body);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

const changeSolderMoney = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await users_model.changeSolderMoney(req.body);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

// 注册
const add = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await users_model.add(req.body);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

const quit = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await users_model.quit(req.body);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

const addDeal = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await deals_model.addDeal(req.body);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

const changeDealStatus = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await deals_model.changeDealStatus(req.query);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

// 订单模块

// 增加订单
const addOrder = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await orders_model.addOrder(req.body);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

// 查询订单列表
const getOrderList = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await orders_model.getOrderList(req.query);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

// 取消订单
const deleteOrder = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await orders_model.deleteOrder(req.query);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

// 改变订单的状态
const changeOrderStatus = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await orders_model.changeOrderStatus(req.query);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}



// 收货模块

// 增加地址
const addAddress = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await address_model.addAddress(req.body);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

// 查询地址列表
const getAddressList = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await address_model.getAddressList(req.query);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

// 删除收获地址
const deleteAddress = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8');
    let _data = await address_model.deleteAddress(req.query);
    let _err = errorData(_data, res, 'position');
    if (_err) res.render('position', {
        code: 200,
        data: JSON.stringify(_data)
    })
}

module.exports = {
    save,
    remove,
    getone,
    update,
    list,
    add,
    quit,
    changeBuyMoney,
    changeSolderMoney,
    addMoney,
    assign,
    addDeal,
    changeDealStatus,
    getOrderList,
    addOrder,
    getAddressList,
    addAddress,
    changeStatus,
    deleteOrder,
    changeOrderStatus,
    deleteAddress
}