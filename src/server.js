const express = require("express")
const server = express()

const db = require("./database/db");

//configurar pasta puclica
server.use(express.static("public"))


//habiliar metodo POST do req body
server.use(express.urlencoded({ extended: true }));


//utlizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação
//pagina incial
//req requisição e resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})


server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})


server.post("/savepoint", (req, res) => {
    const query =
        ` insert into places(
        image,
        name,
        address,
        address2,
        state,
        city,
        items
        ) values(?,?,?,?,?,?,?);`

    const values = [
        //corpo do nosso formulario
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];
    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Cadastro!")
        }
        console.log("Cadastrado com Sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)
})


//buscar consultas do banco de dados
server.get("/search", (req, res) => {
    const search = req.query.search
    if (search == "") {
        return res.render("search-result.html", { total: 0 })
    }

    db.all(`select * from places where city like'%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        //mostrar a pagina html com os  dados do banco de dados
        return res.render("search-result.html", { places: rows, total })
    })
})

//ligar o servidor
server.listen(3000)