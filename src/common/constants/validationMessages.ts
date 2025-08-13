export const validationMessages = {
    requiredValidation : {
        emailRequired : "Email is required",
        credentialRequired : "Email, Username or Mobile Number is required",
        passwordRequired : "Password is required",
        confirmPasswordRequired : "Confirm Password is required",
        fullNameRequired : "Full Name is required",
        usernameRequired : "Username is required",
        contactNumberRequired : "Contact Number is required",
        dayRequired : "Day is required",
        monthRequired : "Month is required",
        yearRequired : "Year is required",
        dobRequired : "Date of Birth is required",
        genderRequired : "Gender is required",
        captionRequired : "Caption is required",
        highlightTitleRequired : "Highlight title is required",
        collectionTitleRequired : "Collection titlte is required",
    },
    regexValidation : {
        passwordRegexValidation : "Password must be 8-15 characters, include uppercase, lowercase, number, and special character",
        usernameValidation : "Username must be atleast 3 characters",
        contactRegexValidation : "Contact number must be 10 digits and should start from 7 - 10",
        bioRegexValidation : "Bio must be less than 300 characters"
    },
    invalidValidation : {
        emailInvalid : "Invalid Email",
        invalidDay : "Invalid Day",
        invalidMonth : "Invalid Month",
        invalidYear : "Invalid Year",
        yearAtleast18 : "Atleast 18 years old",
        passwordMatching : "Passwords should match",
        dobNotInFuture : "Date of birth cannot be in future",
        genderInvalid : "Select a valid Gender",
        url : "Please enter a valid url"
    },
    alreadyExists : {
        emailExists : "Email Already exists",
        contactExists : "Contact Number already exists",
        usernameExists : "User name already exists"
    }
}