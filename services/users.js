const db = require("./db")

async function create(user){
    const result = await db.query(
        `insert into users (email, password) values(?,?)`,
         [user.email, user.password]
    )

    let message="Hiba a felhasználó létrehozásánál!"
    if (result.affectedRows) {
        message="A felhasználó létrehozva!"
    }
    return {message}

}

async function getMail(email){
    const query = `select * from users where email=?`
    const params = [email]
    try{
        const [row] = await db.query(query, params)
        if (!row) throw new Error("A felhasználó nem található!")
        return row
    }
    catch(error){
        throw new Error("Az adatbázis nem elérhető!")
    }
}

module.exports={
    create,
    getMail
}