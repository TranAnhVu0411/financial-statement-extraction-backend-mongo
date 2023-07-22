module.exports = app => {
    const file = require('../controllers/file.controller')
    const upload = require("../config/file.config")
    var router = require("express").Router();
    
    // router.post("/login", auth.login);
    router.get("/background-images", file.indexBackgroundImages);
    router.get("/page-info", file.pageInfo);
    router.post("/", upload.single('file'), file.fileSave);
    router.delete("/", file.dirDelete);

    app.use("/api/file", router);
}