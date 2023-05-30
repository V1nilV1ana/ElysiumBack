const db = require('../models');
const Posts = db.Posts;
const Users = db.Users
const CreatorsPosts = db.CreatorsPosts
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Titulo não pode estar vazio!"
    });
    return;
  }
  if (!req.body.desc) {
    res.status(400).send({
      message: "Descrição não pode estar vazio!"
    });
    return;
  }
  if (!req.body.content) {
    res.status(400).send({
      message: "Coteudo não pode estar vazio!"
    });
    return;
  }
  if (!req.body.UserId) {
    res.status(400).send({
      message: "Id do usuario não pode estar vazio!"
    });
    return;
  }

  const post = {
    title: req.body.title,
    desc: req.body.desc,
    content: req.body.content,
    UserId: req.body.UserId
  }

  Posts.create(post)
    .then(post => {
      return post.addUsers(req.body.UserId, {
        through: {
          UserId: req.body.UserId
        }
      });
    })
    .then(() => {
      res.send({ message: "Post criado com sucesso!" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro enquantos os posts eram recuperados"
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Posts.findAll({
    where: condition,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Users,
        attributes: ['username', 'id'],
        through: {
          attributes: []
        }
      }
    ]
  })
    .then(data => {
      const posts = data.map(post => {
        const usernames = post.Users.map(user => user.username);
        const UserId = post.Users.map(user => user.id);

        return {
          id: post.id,
          title: post.title,
          desc: post.desc,
          content: post.content,
          likes: post.likes,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          UserId,
          usernames
        };
      });

      res.send(posts);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Erro enquanto os posts eram recuperados"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Posts.findByPk(id, {
    include: [
      {
        model: Users,
        attributes: ['username', 'id'],
        through: {
          attributes:[]
        }
      }
    ]
  })
    
    .then(data => {
      if (data) {
        const usernames = data.Users.map(user => user.username);
        const UserId = data.Users.map(user => user.id);
        res.json({
          UserId,
          usernames,
          content: data.content,
          createdAt: data.createdAt,
          desc: data.desc,
          id: data.id,
          likes: data.likes,
          title: data.title,
          updatedAt: data.updatedAt
        });
      } else {
        res.status(404).send({
          message: "Não foi possivel achar o post de id=" + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro recuperando o post de id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

   if (req.body.title && req.body.title.trim() === "") {
    res.status(400).send({
      message: "O campo 'title' não pode estar vazio."
    });
    return;
  }

  if (req.body.desc && req.body.desc.trim() === "") {
    res.status(400).send({
      message: "O campo 'desc' não pode estar vazio."
    });
    return;
  }

  if (req.body.content && req.body.content.trim() === "") {
    res.status(400).send({
      message: "O campo 'content' não pode estar vazio."
    });
    return;
  }

  const updateFields = {};

  if (req.body.title) {
    updateFields.title = req.body.title;
  }

  if (req.body.desc) {
    updateFields.desc = req.body.desc;
  }

  if (req.body.content) {
    updateFields.content = req.body.content;
  }
  if (req.body.likes) {
    updateFields.likes = req.body.likes;
  }
  Posts.update(updateFields, {
    where: { id: id }
    
  })
    .then(num => {
       console.log(updateFields, id, num)
      if (num == 1) {
        res.send({
          message: "Post foi modificado com sucesso."
        });
      } else {
        res.send({
          message: "Não foi possivel encontrar o post " + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel o update do post com id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Posts.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post deletado com sucesso!"
        });
      } else {
        res.send({
          message: "Não foi possivel deletar o post com  id=" + id + "Talvez ele não exista mais"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel deletar o post com  id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Posts.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: nums + "Todos os posts foram apagados com sucesso" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Tivemos um erro enquanto apagavamos os posts."
      });
    });
};
