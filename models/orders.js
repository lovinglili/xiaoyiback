const mongoose =require('../util/mongoose');
const Moment = require('moment')


var OrdersModel=mongoose.model('orders',new mongoose.Schema({
    addressId:String, // 地址
    nickName:String,
    goodId:String, // 商品Id
}));

// 增加订单
const addOrder=(body)=>{
    let _timestamp=Date.now();
    let moment=Moment(_timestamp);
    return new OrdersModel({
        ...body,
        createTime:_timestamp,
        formatTime:moment.format("YYYY-MM-DD, hh:mm")

    }).save().then(()=>{
        return {success:true};
    }).catch(()=>{
        return false;
    })
}

// 查询订单列表
const getOrderList=(query)=>{
        let _query=query ?query :{};
        return OrdersModel.find(_query).sort({'createTime':-1}).then((result)=>{
            return result;
        }).catch((err)=>{
            return false;
        })
    
}

module.exports ={
    getOrderList,
    addOrder
}