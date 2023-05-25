const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

//rodar angular no port http://localhost:4200 "https://7w8omu-4200.csb.app" { credentials: true, origin: ["http://localhost:4200"]}
app.use(cors({ credentials: true, origin: ["http://localhost:4200"]}))

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//vai guarda a informação da sessão em cookies do lado do cliente sem necessidade de bd
app.use(
  cookieSession({
    name: "vini-session",
    secret: "zombieelbaramalhotopdemais", // env
    httpOnly: true
  })
);

//db
const db = require("./models");
//force: true vai dropa a tabela {force: true}
db.sequelize.sync()

// rota pra ver se ta rodando
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo a nossa api" });
});

// rotas
require('./routes/coments.route')(app);
require('./routes/post.route')(app);
require('./routes/user.route')(app);
require('./routes/auth.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:" + PORT);
});

//https://elysiuap-apitest2.onrender.com
