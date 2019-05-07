const mongoose =require('../util/mongoose');
const Moment = require('moment')


var DealsModel=mongoose.model('deals',new mongoose.Schema({
    orderId:String,
    price:String,
    buyName:String,
    solderName:String,
    status:Number, // 交易的状态  0 初始值 1 交易成功
}));



// 增加交易
const addDeal=(body)=>{
    let _timestamp=Date.now();
    let moment=Moment(_timestamp);
    return new DealsModel({
        ...body,
        createTime:_timestamp,
        formatTime:moment.format("YYYY-MM-DD, hh:mm")

    }).save().then(()=>{
        return {success:true};
    }).catch(()=>{
        return false;
    })
}

const changeDealStatus=async (query)=>{
    const {id,status}=query;
    return DealsModel.find({orderId: id}).then((results)=>{
    delete results.status;
    const params={
        ...results,
        status
    }
        return DealsModel.updateOne({orderId: id},params).then((result)=>{
            return {success:true};
        }).catch(()=>{
            return false;
        })
    }).catch(()=>{
        return false;
    })
 }


module.exports={
    addDeal ,
    changeDealStatus
}
