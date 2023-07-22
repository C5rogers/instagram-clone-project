const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

const compareHashedPassword = async(password, hashedPassword) => {
    return await bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashPassword,
    compareHashedPassword
}