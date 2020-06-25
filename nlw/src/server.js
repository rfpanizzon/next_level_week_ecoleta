const express = require("express")
const server = express() //isso se torna um obj de servidor

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public")) //isto deixa a pasta public com o css visivel para o serv

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true //desabilita o nunjucks a salvar na cache, pq pode dar alguns bugs as vezes
})

//configurar caminhos da aplicação
//página inicial
//req: requisisão
//res: resposta
server.get("/", (req, res) => {
    return res.render("index.html", {tittle: "Um titulo"}) //exemplo do uso do nonjucks aqui
})

server.get("/create-point", (req, res) => {

    //req.query: query strings das urls (o link da pagina)
    //console.log(req.query)

    return res.render("create-point.html", {saved: true})
})

server.post("/savepoint", (req, res) => {

    //req.body: o corpo do nosso formulário
    //inserir dados no bd
    const query = 
    `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.adrress,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData (err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        
        return res.render("create-point.html")
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {
    
    const search = req.query.search

    if(search == "") {
        //pesuisa vazia
        return res.render("search-results.html", { total: 0 })
    }



    //pegar os dados do bd
    db.all(`SELECT * FROM places WHERE city LIKE = '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        //cosole.log pra ver se ta pegando
        //console.log("Aqui estão seus registros: ")
        //console.log(rows)
        
        const total = rows.length

        //mostrar a pag html com os dados do bd
        return res.render("search-results.html", { places: rows, total })
    })

})


//ligar o serv
server.listen(3000)