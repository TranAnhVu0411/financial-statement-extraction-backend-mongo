const db = require("../models");
const Document = db.documents;
const Account = db.accounts;
const path = require("path");

exports.create = async (req, res) => {
    try{
        let account = await Account.findById(req.body.userid);
        const documentParams = {
            userid: account,
            documentname: path.parse(req.body.documentname)['name'],
            pagenum: req.body.pagenum,
        };
        let newDocument = Document(documentParams);
        const document = await newDocument.save();
        res.status(200).json(document);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while create document",
        });
    }
};

exports.update = async (req, res) => {
    try{
        const document = await Document.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(document);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while create document",
        });
    }
};

exports.index = async (req, res) => {
    try{
        let account = await Account.findById(req.params.id);
        const documents = await Document.find({ userid: account});
        res.status(200).json(documents);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while create document",
        });
    }
};

exports.info = async (req, res) => {
    try{
        const document = await Document.findById(req.params.id);
        res.status(200).json(document);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while create document",
        });
    }
};