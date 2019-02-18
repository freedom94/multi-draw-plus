/**
 * Created by Eamonn on 2015/10/16.
 */
var fileService = require('./fileService.js');
var moment = require('moment');

exports.saveFile = function(req,res){
    //data.lastModify = moment().format('YYYY-MM-DD HH:mm:ss');
    var user = req.session.userData;
    var data = req.body; //这里拿到的就是前台传过来的对象，无需转换

    if(!data.id){    //1：新建canvas（save）
        fileService.saveFile(data,user,function (data) {
            res.send(data);
        });
    } else {    //2: 更新canvas非objs的属性 ({id,value})
        var id = data.id;
        delete data.id;
        fileService.updateFile(id,data,function (data) {
            res.send(data);
        });
    }
};

exports.renameFile = function(req,res){
    fileService.updateFile(req.query.id,{fileName : req.query.fileName},function (data) {
        res.send(data);
    });
};

exports.loadAllFiles = function (req,res) {
    var user = req.session.userData;
    var isRecycled = req.query.isRecycled;
    var query = {};
    if(isRecycled === 'true')
        query.isRecycled = true;
    else
        query.isRecycled = false;
    if(user){
        fileService.loadAllFiles(query, user, function (data) {
            res.send(data);
        })
    }
};

exports.loadAllParticipantsFiles = function (req,res) {
    var user = req.session.userData;
    var isRecycled = req.query.isRecycled;
    var query = {};
    if(isRecycled === 'true')
        query.isRecycled = true;
    else
        query.isRecycled = false;
    if(user){
        fileService.loadAllParticipantsFiles(query, user, function (data) {
            res.send(data);
        })
    }
};

exports.recycleFiles = function (req,res) {
    var user = req.session.userData;
    var idArray = req.query.id;
    if(user){
        fileService.recycleOrRestoreFiles(idArray,true,function (data) {
            res.send(data);
        })
    }

};

exports.restoreFiles = function (req,res) {
    var user = req.session.userData;
    var idArray = req.query.id;
    if(user){
        fileService.recycleOrRestoreFiles(idArray,false, function (data) {
            res.send(data);
        })
    }
};

exports.deleteFiles = function (req,res) {
    var user = req.session.userData;
    var idArray = req.query.id;
    if(user){
        fileService.deleteFiles(idArray,function (data) {
            res.send(data);
        })
    }
};

exports.loadFile = function (req,res) {
    var id = req.query.id;
    var userInfo = req.session.userData;
    fileService.loadFile(id, userInfo, function (data) {
        res.send(data);
    });
};