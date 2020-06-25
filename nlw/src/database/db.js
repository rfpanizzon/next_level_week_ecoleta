//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose() //verbose é pra mostar mais infos...

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db") //instanciando um obj de bd, no caminho que informei pela string

module.exports = db;

//utilizar o obj de bd para as operações
//serialize roda uma sequencia de codigo
/*db.serialize(() => {    
    //com comandos SQL:
    //1 criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //2 inserir dados
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData (err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    //3 consultar os dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)

    })

    //4 deletar uma dado da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [2], function(err) {  //vai deletar da tabela places o id = 1 
        if(err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso!")
    })
}) */