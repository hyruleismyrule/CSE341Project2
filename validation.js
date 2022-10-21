const { check } = require('express-validator');
 
// exports.signupValidation = [
//     check('name', 'Name is requied').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
//     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
// ]
 
// exports.loginValidation = [
//      check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
//      check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
 
// ]

exports.characterValidation = [
    check('name', 'Name is requied').not().isEmpty().trim().escape(),
    check('rarity', 'Rarity should the number of stars, ex. 5').not().isEmpty().isNumeric().trim().escape(),
    check('weapon', 'Weapon is requied').not().isEmpty().trim().escape(),
    check('vision', 'Vision is requied').not().isEmpty().trim().escape(),
    check('birthday', 'Birthday is requied').not().isEmpty().trim().escape(),
    // constellations
    check('constellations', 'Constellations is requied').not().isEmpty().trim().escape(),
    check('modelType', 'Model Type is requied').not().isEmpty().trim().escape(),
    check('specialDish', 'Special Dish is requied').not().isEmpty().trim().escape(),
    check('Region', 'Region is requied').not().isEmpty().trim().escape(),
    check('talents', 'Talents is requied').not().isEmpty().trim().escape(),
]


exports.weaponValidation = [
    check('name', 'Name is requied').not().isEmpty().trim().escape(),
    check('rarity', 'Rarity should the number of stars, ex. 5').not().isEmpty().isNumeric().trim().escape(),
    check('type', 'Type is requied').not().isEmpty().trim().escape(),
    // ATK
    check('ATK', 'ATK is requied').not().isEmpty().trim().escape(),
    // 2ndStat
    check('2ndStat', 'ATK is requied').not().isEmpty().trim().escape(),
    check('passiveAbility', 'Passive abiliey is requied').not().isEmpty().trim().escape()
]


// Could be helpful later
// const { param } = require('express-validator');

// app.post(
//   '/object/:id',
//   param('id').customSanitizer(value => {
//     return ObjectId(value);
//   }),
//   (req, res) => {
//     // Handle the request
//   },
// );