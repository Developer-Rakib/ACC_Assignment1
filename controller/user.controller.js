const fs = require("fs");
const data = "../user.json"
const users = [
     { id: 1, name: "rakib" },
     { id: 2, name: "rahat" },
     { id: 3, name: "ajij" },
]
async function getAllUsers(req, res) {
     fs.readFile("user.json", (err, data) => {
          const userData = JSON.parse(data);
          const limit = req.query.limit
          const sliceUser = userData.slice(0, limit)
          res.send(sliceUser)
     })

}
async function getRandomUser(req, res) {
     fs.readFile("user.json", (err, data) => {
          const userData = JSON.parse(data);
          const id = Math.floor(Math.random() * userData.length) + 1;
          const user = userData.find(user => user.id == id)
          res.send(user)
     })

}

async function postUser(req, res) {
     const data = fs.readFileSync("data.json");
     const myObject = JSON.parse(data);
     const newUser = req.body;
     // validating req.body data

     const validation = myObject.find(
          (user) =>
               user.id === newUser.id ||
               user.name === newUser.name ||
               user.contact === newUser.contact ||
               user.address === newUser.address ||
               user.photoUrl === newUser.photoUrl ||
               Object.keys(user) === Object.keys(newUser)
     );

     // const exisitingKeys = Object.keys(myObject);
     // console.log(exisitingKeys);

     // console.log(validation);
     if (validation) {
          res.send("Data exists in json file");
     } else {
          myObject.push(newUser);
          const newData2 = JSON.stringify(myObject);

          fs.writeFile("user.json", newData2, (err) => {
               if (err) {
                    console.log(err.message);
                    return;
               }

               res.send("Successfully added data to json file!");
          });
     }
}


async function updateUser(req, res) {
     const { name, gender, address, contact, photoURL, _id } = req.body;
}
async function bulkUpdate(req, res) {
     const limit = req.query.limit
     const sliceUser = users.slice(0, limit)
     res.send(sliceUser)
}

async function deleteUser(req, res) {
     const limit = req.query.limit
     const sliceUser = users.slice(0, limit)
     res.send(sliceUser)
}

module.exports = { getAllUsers, getRandomUser, postUser, updateUser, bulkUpdate, deleteUser }