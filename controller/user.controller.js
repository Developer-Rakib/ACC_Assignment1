const fs = require("fs");

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

// post user
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

// update User
async function updateUser(req, res) {
     const data = fs.readFileSync("user.json");
     const myObject = JSON.parse(data);

     // validating req.body data
     const { id, gender, name, contact, address, photoURL } = req.body;
     if (!id) {
          res.status(400).json({
               success: false,
               message: "id is not found",
          });
     }
     else {
          const exisUser = myObject.find(user => user.id == id)
          const restUser = myObject.filter(user => user.id !== id)
          if (exisUser) {
               const newUser = {
                    id: id,
                    gender: gender || exisUser.gender,
                    name: name || exisUser.name,
                    contact: contact || exisUser.contact,
                    address: address || exisUser.address,
                    photoURL: photoURL || exisUser.photoURL,
               }
               restUser.push(newUser);
               const newData2 = JSON.stringify(restUser);
               fs.writeFile("user.json", newData2, (err) => {
                    if (err) {
                         res.status(400).json({
                              success: false,
                              message: err.message,
                         });
                    }
                    res.status(200).json({
                         success: true,
                         message: "Successfully updated data in json file!",
                         
                    });
               });
          }
          else {
               res.status(400).json({
                    success: false,
                    message: "user not found",
               });
          }
     }


}
async function bulkUpdate(req, res) {
     const limit = req.query.limit
     const sliceUser = users.slice(0, limit)
     res.send(sliceUser)
}

// deleteUser
async function deleteUser(req, res) {
     const data = fs.readFileSync("user.json");
     const myObject = JSON.parse(data);

     // validating req.body data
     const { id } = req.body;
     if (!id) {
          res.status(400).json({
               success: false,
               message: "id is not found",
          });
     }
     else {
          const exisUser = myObject.find(user => user.id == id)
          const restUser = myObject.filter(user => user.id !== id)
          if (exisUser) {
               const newData2 = JSON.stringify(restUser);
               fs.writeFile("user.json", newData2, (err) => {
                    if (err) {
                         res.status(400).json({
                              success: false,
                              message: err.message,
                         });
                    }
                    res.status(200).json({
                         success: true,
                         message: "Successfully deleted data from json file!",
                         
                    });
               });
          }
          else {
               res.status(400).json({
                    success: false,
                    message: "user not found",
               });
          }
     }

}

module.exports = { getAllUsers, getRandomUser, postUser, updateUser, bulkUpdate, deleteUser }