module.exports = app => {
    const document = require("../controllers/document.controller")
    var router = require("express").Router();
    
    router.post("/", document.create);
    router.get("/index/:id", document.index);
    router.put("/:id", document.update);
    router.get("/:id", document.info);

    app.use("/api/document", router);
}