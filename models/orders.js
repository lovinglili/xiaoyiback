const mongoose =require('../util/mongoose');
const Moment = require('moment')


var OrdersModel=mongoose.model('orders',new mongoose.Schema({
    solderNickName:String, // 卖家的nickName
    desc:String,
    pics:Array,
    price:String,
    title:String,
    categoryTitle:String,categoryId:String,
    nickName:String,
    addressId:String,
    status:Number,// 该商品的状态
    goodId:String // '所要购买的商品的id',
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

// 取消订单
const deleteOrder=(query)=>{
    return OrdersModel.deleteOne({_id: query.orderId}).then(()=>{
        return {success:true};
    }).catch(()=>{
        return false;
    })
}

// 改变商品订单的状态

const changeOrderStatus=async (query)=>{
    const {id,status}=query;
    return OrdersModel.find({_id: id}).then((results)=>{
    delete results.status;
    const params={
        ...results,
        status
    }
        return OrdersModel.updateOne({_id: id},params).then((result)=>{
            return {success:true};
        }).catch(()=>{
            return false;
        })
    }).catch(()=>{
        return false;
    })
 }

module.exports ={
    getOrderList,
    addOrder,
    deleteOrder,
    changeOrderStatus
}