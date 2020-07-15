const bcrypt = require('bcrypt');
const saltRounds = 10;

function encrypt(myPlaintextPassword){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    return hash
}

function checkPass( password, hash){
    return bcrypt.compareSync(password, hash);
}


module.exports = { encrypt, checkPass }
