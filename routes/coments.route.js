module.exports = app => {
    const coments = require("../controllers/coments.controller");

    var router = require("express").Router();

    router.post("/", coments.create);
    
    router.get("/:PostId", coments.findAll);

    router.put("/:id", coments.update);

    router.delete("/:id", coments.delete);

    app.use('/api/coments', router);
}

