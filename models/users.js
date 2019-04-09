const mongoose =require('../util/mongoose');
const Moment = require('moment')


var UserModel=mongoose.model('users',new mongoose.Schema({
    password:String,
    nickName:String,
    status:Number
}));

const assign=async (body)=>{
    // 先查询数据库中是否有该nickname，若无不让登录;
    const {nickName,password}=body;
    let results= await getUser(nickName);
    if(results.length!==0){
        const {password:mima,nickName:name}=results[0];
        if(password===mima ){
            let _timestamp=Date.now();
            let moment=Moment(_timestamp);
            results[0].createTime=_timestamp,
            results[0].formatTime=moment.format("YYYY-MM-DD, hh:mm");
            results[0].status=1;
        
            return UserModel.updateOne({nickName: nickName},{...results}).then(()=>{
                return {isAssign:true,success:true};
            }).catch(()=>{
                return false;
            })
        }else{
            return {isAssign:false,message:'密码输入错误！'};
        }
    }else{
        return{isAssign:false,message:'该用户不存在，请先注册！'}
    }
}

const add=async (body)=>{
    let _timestamp=Date.now();
    let moment=Moment(_timestamp);
    // 先查询数据库中是否有该nickname,若有不让注册;
    const {nickName}=body;
    return UserModel.find({nickName}).then((result)=>{
        if(result.length!==0){
            return {isAssign:false,message:"用户已存在",success:false}
        }else{
            return new UserModel({
                ...body,
                status:1, // 1代表登录，0代表未登录
                createTime:_timestamp,
                formatTime:moment.format("YYYY-MM-DD, hh:mm")
        
            }).save().then(()=>{
                return {isAssign:true,success:true};
            }).catch((err)=>{
                return false;
            })
        }
    }).catch((err)=>{
        return false;
    })

}


const getUser=(nickName)=>{
    return UserModel.find({nickName}).then((result)=>{
        return result;
    }).catch(()=>{
        return false;
    })
 }
const quit= async (body)=>{
    const {nickName}=body;
   var results= await getUser(nickName)
    let _timestamp=Date.now();
    let moment=Moment(_timestamp);
    results[0].createTime=_timestamp,
    results[0].formatTime=moment.format("YYYY-MM-DD, hh:mm");
    results[0].status=0;
    return UserModel.updateOne({nickName: nickName},{...results}).then((result)=>{
        return {isAssign:false,success:true};
    }).catch(()=>{
        return false;
    })
}

module.exports ={
    quit,
    add,
    assign
}