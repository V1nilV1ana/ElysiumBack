const db = require('../models');
const Coments = db.Coments;
const Op = db.Sequelize.Op;
const Posts = db.Posts
const Users = db.Users
const { sequelize } = require('sequelize');


exports.create = async (req, res) => {
  if (!req.body.coment) {
    res.status(400).send({
      message: "O campo de comentario não pode estar vazio!"
    });
    return;
  }

  if (!req.body.UserId) {
    res.status(400).send({
      message: "O campo UserId não pode estar vazio!"
    });
    return;
  }

  if (!req.body.PostId) {
    res.status(400).send({
      message: "O campo PostId não pode estar vazio!"
    });
    return;
  }

  const coments = {
    coment: req.body.coment,
  };

  try {
    const createdComent = await Coments.create(coments);
    await createdComent.addUsers(req.body.UserId);
    await createdComent.addPosts(req.body.PostId);
    res.send({ message: "Comentario criado com sucesso!" });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Erro enquanto os comentarios eram recuperados"
    });
  }
};

//muda isso para achar todos os comentarios que tem o mesmo id do post
exports.findAll = (req, res) => {
  const PostId = req.params.PostId;
  Coments.findAll({
    include:
      [{
        model: Posts,
        where: { id: PostId },
        attributes: ['id'],
        through: { attributes: [] }
      
      },
        {
          model: Users,
          attributes: ['username', 'id'],
          through: { attributes: [] },
          
        }
      ]
  }
  )
    .then(data => {
      //res.json(data.map(comment => comment.Users.map(user => user.username)))
      res.json(data.map(comment => {
      const commentData = comment.toJSON();
      commentData.post = commentData.Posts; // Assuming each comment has a single associated post
      commentData.user = commentData.Users[0]; // Assuming each comment has a single associated user
      return commentData;
}));
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro enquantos os comentarios eram recuperados"
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

   if (req.body.coment && req.body.coment.trim() === "") {
    res.status(400).send({
      message: "O campo 'coment' não pode estar vazio."
    });
    return;
  }

  const updateFields = {};
  
  if (req.body.coment) {
    updateFields.coment = req.body.coment;
  }


  Coments.update(updateFields, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comentario foi modificado com sucesso."
        });
      } else {
        res.send({
          message: "Não foi possivel encontrar o Comentario de id: " + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel o update do Comentario com id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Coments.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comentario deletado com sucesso!"
        });
      } else {
        res.send({
          message: "Não foi possivel deletar o Comentario com  id=" + id + "Talvez ele não exista mais"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel deletar o Comentario com  id=" + id
      });
    });
};