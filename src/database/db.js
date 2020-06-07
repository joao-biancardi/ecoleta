//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()


//criar objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")
module.exports = db

//utilizar o objeto de banco de dados, para nossas operações
// db.serialize(() => {
//     //criar uma tabela com comandos sql
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id  INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //Inserir dados na tabela
//     const query = `
//     INSERT INTO place (
//             image,
//             name,
//             address,
//             address2,
//             state,  
//             city,
//             items
//         ) VALUES ( ?, ?, ?, ?, ?, ?, ? );
//     `
//     const values = [
//         "url da imagem",
//         "Colectoria",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData (err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Cadrastado com sucesso")
//         console.log(this)
//     }    

//     // db.run(query, values, afterInsertData)


//     //Consultar os dados da tabela
//     db.all(`SELECT * FROM places`, function(err, rows) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Aqui estão seus registros:")
//         console.log(rows)
//     })

//     //Deletar um dado da tabela
//     // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Registro deletado com sucesso")
//     // })
// })