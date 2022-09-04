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
     const data = fs.readFileSync("user.json");
     const myObject = JSON.parse(data);
     const newUser = req.body;

     // validating req.body data
     const { id, gender, name, contact, address, photoURL } = req.body;
     if (!id) {
          res.status(400).json({
               success: false,
               message: "id is not found",
          });
     }
     else if (!gender) {
          res.status(400).json({
               success: false,
               message: "gender is not found",
          });
     }
     else if (!name) {
          res.status(400).json({
               success: false,
               message: "name is not found",
          });
     }
     else if (!contact) {
          res.status(400).json({
               success: false,
               message: "contact is not found",
          });
     }
     else if (!address) {
          res.status(400).json({
               success: false,
               message: "address is not found",
          });
     }
     else if (!photoURL) {
          res.status(400).json({
               success: false,
               message: "photoURL is not found",
          });
     }
     else {
          myObject.push(newUser);
          const newData2 = JSON.stringify(myObject);
          fs.writeFile("user.json", newData2, (err) => {
               if (err) {
                    console.log(err.message);
                    return;
               }

               res.status(200).json({
                    success: true,
                    message: "Successfully added data to json file!",
               });
               // res.send("Successfully added data to json file!");
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