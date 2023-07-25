
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const env = require('./env.js');
const {Pool} =require('pg');

const pool = new Pool({user:'postgres',
host:'localhost',
database:'bbData',
password:'1234'})
const urlLink='http://localhost:4200';
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect, 
  logging: false,
  define: {
    timestamps: false, 
},
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  dialectOptions: {
    options: { 
      "ssl":true,
      "useUTC": false, 
      "requestTimeout": 300000 
    }
  },
  timezone: '+05:30'
});
exports.login = async (req, res) => {
    let result;
    let transaction;
    try {
        var userName = req.body.email;
        var password = req.body.password;
        console.log(userName,password);
       pool.query("SELECT * FROM user_credential where user_name= '" +userName+ "' and password='" +password +"'",(err,respones)=>{
            if(err){
                return err;
            }
            console.log(res)
            result={
                status:200,
                data:respones.rows[0]
            }
            res.set('Access-Control-Allow-Origin', urlLink);
        res.json(result);

        })
        // if (userName == null || password == null) {
        //     result = {
        //         status: '201',
        //         reason: 'Invalid username/password',
        //         accessToken: null
        //     }

        // } else {
        //     transaction = await sequelize.transaction();
        //     // let userRes = await userAccess.findAll({
        //     //     where: {
        //     //         userMailId: { [Op.iLike]: `%${userName}` },
        //     //         // userMailId: userName,
        //     //         userPassword: password,
        //     //         recordStatus: CommonConstants.recordStatus_Active
        //     //     }, transaction
        //     // });
        //      let queryrol = "SELECT * FROM user_credential where user_name=" +userName+ "ORDER BY user_name ASC"

        //             let userRes = await sequelize.query(queryrol, {
        //                 // model: facilitiesMaster,
        //                 // mapToModel: true, transaction
        //             });
        //             console.log(userRes)
        //     if (userRes.length <= 0) {
        //         result = {
        //             status: '202',
        //             reason: 'Incorrect username or password',
        //             accessToken: null
        //         }
        //     } else{
        //         result={
        //             reason:'success',
        //             status:200
        //         }
        //     } 
            
        //     await transaction.commit();
        // }
    }
    catch (err) {
        console.log(err);
        result = {
            status: 401,
            reason: "Error getting login information : " + err,
            accessToken: null
        };
        try { if (transaction) await transaction.rollback(); } catch (e) { }
            res.set('Access-Control-Allow-Origin', urlLink);

        res.json(result);
    }
};

exports.addNewUser = async (req, res) => {
    let result;
    let transaction;
    try {
        var email = req.body.email;
        var password = req.body.password;
        var userName = req.body.userName;
        var userType =  'customer'
        console.log(userName,password);
        pool.query("select * from user_credential where user_name = '" + email +"'",(err,response)=>{
            if(err){
                console.log(err);
                return result={
                status:201,
                reason:'error :' +err
            }
            }else{
                if(response.rows.length>0){
                   result={
                status:201,
                reason:'Duplicate username'
                
            }
            res.set('Access-Control-Allow-Origin', urlLink);
                    res.json(result);
               
                }else{
                     console.log("INSERT INTO user_credential VALUES (" + "'" + email + "'" + "," + "'" + password +  "'" + "," + "'" + userName +  "'" + ")")
                     pool.query("INSERT INTO user_credential VALUES (" + "'" + email + "'" + "," + "'" + password +  "'" + "," + "'" + userName +  "'"  + "," + "'" + userType +  "'"  + ")",(err,respones)=>{
                        if(err){
                            return err;
                        }
                         console.log(res)
                        result={
                            status:200,
                            reason:'success'
                        }
                        res.set('Access-Control-Allow-Origin', urlLink);
                    res.json(result);

        })
                }
            }
        }  )
       
        
    }
    catch (err) {
        console.log(err);
        result = {
            status: 401,
            reason: "Error getting login information : " + err,
            accessToken: null
        };
        try { if (transaction) await transaction.rollback(); } catch (e) { }
            res.set('Access-Control-Allow-Origin', urlLink);

        res.json(result);
    }
};

exports.uploadProducts = async (req, res) => {
    let result;
    let transaction;
    try {
        var name = req.body.name;
        var description = req.body.description;
        var mrp = req.body.mrp;
        var discount = req.body.discount;
        var isDeal = req.body.isDeal;
        var isFreeDelivery = req.body.isFreeDelivery;
        var isEmi = req.body.isEmi;
        var imageUrl = req.body.imageUrl;
        var previousList
        var newId
        if(!isDeal){
            isDeal=false
        }
        if(!isFreeDelivery){
            isFreeDelivery=false
        }
        if(!isEmi){
            isEmi=false
        }
        pool.query("select * from upload_products",(err,respones1)=>{
            if(err){
                return err;
            }else{
                previousList=respones1.rows
            }
            if(previousList.length>0){
               newId = (parseInt(previousList[previousList.length-1].unique_id)) + 1
            }else{
                newId=1
            }
                              pool.query("INSERT INTO upload_products VALUES (" + "'" + name + "'" + "," + "'" + description +
                         "'" + "," + "'" + mrp +  "'"  + "," + "'" + discount +  "'"  + ",'" + isDeal + "'"+ ",'" + isFreeDelivery + "'"+
                         ",'" + isEmi + "'"+ ",'" + imageUrl + "'"+  ",'" + newId + "'"+ ")",(err,respones)=>{
                        if(err){
                            return err;
                        }
                         console.log(res)
                        result={
                            status:200,
                            reason:'success'
                        }
                        res.set('Access-Control-Allow-Origin', urlLink);
                    res.json(result);

        })
        })

        
      
       
        
    }
    catch (err) {
        console.log(err);
        result = {
            status: 401,
            reason: "Error getting login information : " + err,
            accessToken: null
        };
        try { if (transaction) await transaction.rollback(); } catch (e) { }
            res.set('Access-Control-Allow-Origin', urlLink);

        res.json(result);
    }
};
exports.getProductList = async (req, res) => {
    let result;
    let transaction;
    try {
      
        pool.query("select * from UPLOAD_PRODUCTS",(err,response)=>{
            if(err){
                console.log(err);
                return result={
                status:201,
                reason:'error :' +err
            }
            }else{
                if(response.rows.length>0){
                   result={
                status:200,
                reason:'success',
                data:response.rows
                
            }
            res.set('Access-Control-Allow-Origin', urlLink);
                    res.json(result);
               
                }
            }
        }  )
       
        
    }
    catch (err) {
        console.log(err);
        result = {
            status: 401,
            reason: "Error getting login information : " + err,
            accessToken: null
        };
        try { if (transaction) await transaction.rollback(); } catch (e) { }
            res.set('Access-Control-Allow-Origin', urlLink);

        res.json(result);
    }
};