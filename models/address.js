const mongoose =require('../util/mongoose');
const Moment = require('moment')


var AddressModel=mongoose.model('address',new mongoose.Schema({
    privanceId:Number, 
    privanceName:String,
    nickName:String,
    cityName:String, 
    cityId:Number,
    more:String
}));

// 增加订单
const addAddress=(body)=>{
    let _timestamp=Date.now();
    let moment=Moment(_timestamp)
    return new AddressModel({
        ...body,
        createTime:_timestamp,
        formatTime:moment.format("YYYY-MM-DD, hh:mm")

    }).save().then(()=>{
        
        return {data:true};
    }).catch((err)=>{
        return false;
    })
}

// 查询地址列表
const getAddressList=(query)=>{
        let _query=query ?query :{};
        return AddressModel.find(_query).sort({'createTime':-1}).then((result)=>{
            return result;
        }).catch((err)=>{
            return false;
        })
    
}

module.exports ={
    getAddressList,
    addAddress
}