const {v4} = require('uuid');
const fs = require('fs');
const {join} = require('path');
const FILE_PATH = join(__dirname, 'users.json');

// function findUsers(){
//     try{
//         return require('./users.json');
//     } catch(e){
//         return [];
//     }
// }

function findUsers() {
    if(!fs.existsSync(FILE_PATH)) return [];

    let users = fs.readFileSync(FILE_PATH);
    return JSON.parse(users);
}

function insertUser(user){
    let users = findUsers();
    user.id = v4();
    users.push(user);
    fs.writeFileSync(FILE_PATH, JSON.stringify(users));
}

function findUser(id) {
    let users = findUsers();
    let user = users.find((user) => user.id === id);
    
    if(!user) return [];
    
    return user;
}

function deleteUser(id){
    let users = findUsers();
    users.forEach((user, index, array) => {
        if(user.id === id){
            let deleted_user = user;
            array.splice(index, 1);
            fs.writeFileSync(FILE_PATH, JSON.stringify(users));
        }
    })
}

// function updateUser(id, updated_user) {
//     let users = findUsers();
//     users.forEach((user, index, array) => {
//         if(user.id === id){
//             user.id = id;
//             array[index] = updated_user;
//             fs.writeFileSync(FILE_PATH, JSON.stringify(users));
//         }
//     })
// }

function updateUser(id, user) {
    let users = findUsers();
    let index = users.findIndex(user => user.id === id);

    if(index === -1) return {}

    for(let key in user){
        users[index][key] = user[key];
    }
    fs.writeFileSync(FILE_PATH, JSON.stringify(users));

    return users[index];
}

module.exports = {
    findUsers,
    insertUser,
    findUser,
    deleteUser,
    updateUser
}