const isValidEmail = (email) => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(emailFormat);
}

const isValidPhoneNumber = (phone) => {
    const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phone.match(phoneFormat);
}

export const DataValidator = {
    isValidPhoneNumber,
    isValidEmail
}