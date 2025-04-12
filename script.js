// Regular expression for email validation as per HTML specification
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const NAME_REGEX = /^(?!-)[a-zA-Z -]*[a-zA-Z]$/;
const PHONE_REGEX = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

// Valid Password: at least 8 characters, at least one letter and one number
const PASSWORD_REGEX = /\d+/;
const PASSWORD_REGEX1 = /[a-zA-Z]+/;
const PASSWORD_REGEX2 = /[\S]{8,}/;

const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector("#confirm-password + .errorMsg");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#password + .errorMsg");
const phone = document.querySelector("#phone-number");
const phoneError = document.querySelector("#phone-number + .errorMsg");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email + .errorMsg");
const firstname = document.querySelector("#firstname");
const firstnameError = document.querySelector("#firstname + .errorMsg");
const lastname = document.querySelector("#lastname");
const lastnameError = document.querySelector("#lastname + .errorMsg");
const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector("#postal-code + .errorMsg");
const form = document.querySelector("#sign-up");

if (!password || !passwordError)
	throw new Error("No password input");
if (!confirmPassword || !confirmPasswordError)
	throw new Error("No confirm password input");
if (!phone || !phoneError)
	throw new Error("No phone number input");
if (!postalCode || !postalCodeError)
	throw new Error("No postal-code input");
if (!email || !emailError)
	throw new Error("No email input");
if (!firstname || !firstnameError)
	throw new Error("No firstname input");
if (!lastname || !lastnameError)
	throw new Error("No lastname input");
if (!form)
	throw new Error("No form");

function InputValidator(input, error, callbackFn) {
	this.input = input;
	this.error = error;
	this.callbackFn = callbackFn;
}

InputValidator.prototype.test = function() {
	this.callbackFn(this.input, this.error);
}

const emailValidator = new InputValidator(email, emailError, updateEmailError);
const passwordValidator = new InputValidator(password, passwordError, updatePasswordError);
const confirmPasswordValidator = new InputValidator(confirmPassword, confirmPasswordError, updateConfirmPasswordError);
const phoneValidator = new InputValidator(phone, phoneError, updatePhoneError);
const postalCodeValidator = new InputValidator(postalCode, postalCodeError, updatePostalCodeError);
const firstnameValidator = new InputValidator(firstname, firstnameError, updateNameError);
const lastnameValidator = new InputValidator(lastname, lastnameError, updateNameError);

// Update error message and visibility
function updateEmailError(email, error) {
	error.className = "errorMsg show";
	if (email.validity.valueMissing)
		error.textContent = "No value typed";
	else if (!EMAIL_REGEX.test(email.value))
		error.textContent = "Pattern does not match an email address";
	else if (email.validity.typeMismatch) {
		error.textContent = "Should look like 'an@example.com'";
	} else {
		error.textContent = "";
		error.className = "errorMsg";
	}
}

function updateNameError(name, error) {
	error.className = "errorMsg show";
	if (!NAME_REGEX.test(name.value)) {
		error.textContent = "This is not a valid name";
	}
	else if (name.validity.typeMismatch) {
		error.textContent = "This is not the right type";
	} else {
		error.textContent = "";
		error.className = "errorMsg";
	}
}

function updatePostalCodeError(postalCodeField, error) {
	// For each country, defines the pattern that the postal code has to follow
	const constraints = {
		ch: [
			"^(CH-)?\\d{4}$",
			"Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
		],
		fr: [
			"^(F-)?\\d{5}$",
			"French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
		],
		de: [
			"^(D-)?\\d{5}$",
			"German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
		],
		nl: [
			"^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
			"Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
		],
		ot: ["", "",],
	};

	// Read the country id
	const country = document.getElementById("country").value;

	// Build the constraint checker
	const constraint = new RegExp(constraints[country][0], "");

	// Check it!
	if (constraint.test(postalCodeField.value)) {
		error.className = "errorMsg";
		error.textContent = "";
	} else {
		error.className = "errorMsg show";
		error.textContent = constraints[country][1];
	}
}

function updatePhoneError(phoneField, error)
{
	error.className = "errorMsg show";
	if (phoneField.validity.valueMissing)
		error.textContent = "No value typed";
	else if (!PHONE_REGEX.test(phoneField.value))
		error.textContent = "Pattern does not match a phone number";
	else if (phoneField.validity.typeMismatch) {
		error.textContent = "Not a tel type";
	} else {
		error.textContent = "";
		error.className = "errorMsg";
	}
}

function updatePasswordError(passwordField, error) {
	error.className = "errorMsg show";
	if (passwordField.validity.valueMissing)
		error.textContent = "No value typed";
	else if (!PASSWORD_REGEX.test(passwordField.value))
		error.textContent = "Password should have at least one number";
	else if (!PASSWORD_REGEX1.test(passwordField.value))
		error.textContent = "Password should have at least one letter";
	else if (!PASSWORD_REGEX2.test(passwordField.value))
		error.textContent = "Password should have at least 8 characters";
	else if (passwordField.validity.typeMismatch) {
		error.textContent = "Not a password type";
	} else {
		error.textContent = "";
		error.className = "errorMsg";
	}
}

function updateConfirmPasswordError(field, error) {
	const password = document.querySelector("#password");
	if (!password)
		throw new Error("No password input");
	error.className = "errorMsg show";
	if (field.validity.valueMissing)
		error.textContent = "No value typed";
	else if (password.value !== field.value)
		error.textContent = "Does not match password";
	else {
		error.textContent = "";
		error.className = "errorMsg";
	}
}

email.addEventListener("input", () => { emailValidator.test(); });
password.addEventListener("input", () => { passwordValidator.test(); });
confirmPassword.addEventListener("input", () => { confirmPasswordValidator.test(); });
phone.addEventListener("input", () => { phoneValidator.test(); });
postalCode.addEventListener("input", () => { postalCodeValidator.test(); });
firstname.addEventListener("input", () => { firstnameValidator.test(); });
lastname.addEventListener("input", () => { lastnameValidator.test(); });

form.addEventListener("submit", event => {
	event.preventDefault();
	console.log("submit!");
});
