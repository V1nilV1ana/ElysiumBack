module.exports = app => {
  const post = require("../controllers/post.controller");

  var router = require("express").Router();

  // cria um novo post
  router.post("/", post.create);

  //Recupera todos os posts
  router.get("/", post.findAll);
    
  //Recupera um post usando um id
  router.get("/:id", post.findOne);

  // Update um post usando id
  router.put("/:id", post.update);

  // Deleta um post usando id
  router.delete("/:id", post.delete);

  // Deleta tudo
  //router.delete("/", post.deleteAll);

  app.use('/api/post', router);
};