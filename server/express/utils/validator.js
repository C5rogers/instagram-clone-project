// email regex: "/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm"
// phone regex: "/^(^\+251|^251|^0)?(9|7)\d{8}$/"
// name regex: "/^([^\x00-\x7F]|[\a-zA-Z_\ \.\+\-]){2,20}$/"
// password regex: "/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/"
// gender regex: "/^(?:m|M||f|F)$/gm"



const emailregex = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
const phoneregex = /^(^\+251|^251|^0)?(9|7)\d{8}$/
const nameregex = /^([^\x00-\x7F]|[\a-zA-Z_\ \.\+\-]){2,20}$/
const passswrodregex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/
const genderregex = /^(?:m|M||f|F)$/gm


const isValidEmail = (email) => {
    if (!email) {
        return 1
    } else if (!emailregex.test(email)) {
        return 2
    }
    return 0
}

const isValidName = (name) => {
    if (!name) {
        return 1
    } else if (!nameregex.test(name)) {
        return 2
    }
    return 0
}

const isValidPhonenumber = (phone) => {
    if (!phone) {
        return 1
    } else if (!phoneregex.test(phone)) {
        return 2
    }
    return 0
}

const isValidPassword = (password) => {
    if (!password) {
        return 1
    } else if (!passswrodregex.test(password)) {
        return 2
    }
    return 0
}

const isValidGender = (gender) => {
    if (!gender) {
        return 1
    } else if (!genderregex.test(gender)) {
        return 2
    }
    return 0
}

module.exports = {
    isValidEmail,
    isValidName,
    isValidPassword,
    isValidGender,
    isValidPhonenumber
}