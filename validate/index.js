let validateEmail = (email) => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!email.match(regexEmail);
}

let validatePassword = (password) => {
    let regexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return !!password.match(regexPassword);
}

module.exports = {
    validateEmail,
    validatePassword
}

