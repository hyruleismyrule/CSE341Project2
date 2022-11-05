// ***************
// Controllers - controllers/user.js
// ***************

// Imports
const mongodb = require('../connections/index');
// const ObjectId = require('mongodb').ObjectId;

// Main
// GET / Read

// Get User by ID
const getUserCharacters = async (req, res) => {
    try {
    //   const characterId = new ObjectId(req.params.id);
      if (!authZeroUserJson.sub) {
        res.status(400).send({ message: 'No 0auth id supplied.' });
        return;
      }
    // const exitingUser = await mongodb.getDb().db('genshinImpact').collection('users').find({ identifier: authZeroUserJson.sub });
    // const characterArray = exitingUser.ownedCharacters;
    //   await mongodb.getDb().db('genshinImpact').collection('characters').find({ _id: characterId }).toArray()
    // await mongodb.getDb().db('genshinImpact').collection('characters').find().toArray()
    await mongodb.getDb().db('genshinImpact').collection('users').find({ identifier: authZeroUserJson.sub })
        .then((result) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while retrieving the user characters.'
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  };

// Exports
module.exports = { getUserCharacters };




// const userController = {
//     index: (req, res) => {
//         res.json(req.user);
//     }
// };

// module.exports = userController;