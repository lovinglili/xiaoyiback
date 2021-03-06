const mongoose = require('../util/mongoose')
const fs = require('fs-extra') 
const PATH=require('path')
const Moment = require('moment')
var Position =mongoose.model('positions',new mongoose.Schema({
    categoryTitle: String,
    categoryId: String,
    id: String,
    name: String,
    cityName: String,
    provinceName: String,
    cityId: String,
    provinceId: String,
    desc: String,
    originPrice: String,
    price: String,
    title: String,
    nickName: String,
    pics:Array, // 商品的图片
    status:Number, // 商品的状态
}))


const listall=(a)=>{
    let _a=a ?a :{};
    return Position.find(_a).sort({'createTime':-1}).then((result)=>{
        return result;
    }).catch((err)=>{
        return false;
    })
}


const list=async ({pageNo=1,pageSize=5,search=""})=>{
    let re = new RegExp(search, 'i');
    let _query = search ?  { companyName: re } : {}
    var allItems=await listall(_query);

    return Position.find(_query).sort({'createTime':-1}).skip((pageNo-1)*pageSize)
    .limit(~~pageSize)
    .then((result)=>{
        return{
            items:result,
            pageInfo:{
                pageNo,//当前页
                pageSize,//每页有多少条数据
                search:search,
                totalItems:allItems.length,//总数据的条数
                totalPage:Math.ceil(allItems.length/pageSize)//总页数
            }
        }
    }).catch((err)=>{
        return false;
    })
}


const save=(body)=>{
    let _timestamp=Date.now();
    let moment=Moment(_timestamp)
    return new Position({
        ...body,
        status:0,
        createTime:_timestamp,
        formatTime:moment.format("YYYY-MM-DD, hh:mm")
    }).save().then(()=>{
        return {success:true};
    }).catch((err)=>{
        return false;
    })
}


const remove=async (id)=>{
    var _row=await getone(id);
      
   return Position.deleteOne({_id: id.goodId}).then((result)=>{
       result._id=id.goodId;
       //  TODO:删除 传的是商品的id
       if(_row[0]&&(_row[0].companyLogo!="/uploads/logos/bg.jpg")){
           fs.removeSync(PATH.resolve(__dirname, '../public'+_row[0].companyLogo))
       }
       return result;
   }).catch(()=>{
       return false;
   })
}

const getone=(id)=>{
    return Position.find({_id: id.goodId}).then((result)=>{
        return result;
    }).catch(()=>{
        return false;
    })
 }

 const changeStatus=async (query)=>{
    const {id,status}=query;
    return Position.find({_id: id}).then((results)=>{
    delete results.status;
    const params={
        ...results,
        status
    }
        return Position.updateOne({_id: id},params).then((result)=>{
            return {success:true};
        }).catch(()=>{
            return false;
        })
    }).catch(()=>{
        return false;
    })
 }

 const update=async (params)=>{
     const {_id}=params;
    return Position.find({_id: _id}).then(()=>{
        let _timestamp=Date.now();
         let moment=Moment(_timestamp);
         params.createTime=_timestamp,
         params.formatTime=moment.format("YYYY-MM-DD, hh:mm")
            return Position.updateOne({_id: _id},params).then((result)=>{
                return {success:true};
            }).catch(()=>{
                return false;
            })
        }).catch(()=>{
            return false;
        })
 }
module.exports = {
    save,
    remove,
    getone,
    update,
    list,
    listall,
    changeStatus
}
