const mongoose = require('../util/mongoose');
const Moment = require('moment')


var AddressModel = mongoose.model('address', new mongoose.Schema({
    nickName: String,
    cityName: String,
    cityId: Number,
    more: String,
    provinceId: Number,
    provinceName: String,
    receiveName:String,
    phoneNumber:String
}));

// 增加地址
const addAddress = (body) => {
    let _timestamp = Date.now();
    let moment = Moment(_timestamp);
    return new AddressModel({
        ...body,
        createTime: _timestamp,
        formatTime: moment.format("YYYY-MM-DD, hh:mm")

    }).save().then((result) => {
        return { success: true, currentAddress: result };
    }).catch((err) => {
        return false;
    })
}

// 查询地址列表
const getAddressList = (query) => {
    let _query = query ? query : {};
    return AddressModel.find(_query).sort({ 'createTime': -1 }).then((result) => {
        return result;
    }).catch((err) => {
        return false;
    })

}

// 删除收获地址
const deleteAddress=(query)=>{
    return AddressModel.deleteOne({_id: query.addressId}).then(()=>{
        return {success:true};
    }).catch(()=>{
        return false;
    })
}

module.exports = {
    getAddressList,
    addAddress,
    deleteAddress
}