// Regular expression for email validation as per HTML specification
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const NAME_REGEX = /^(?!-)[a-zA-Z -]*[a-zA-Z]$/;

const email = document.querySelector("#email");
const emailError = document.querySelector("#email + .errorMsg");
const firstname = document.querySelector("#firstname");
const firstnameError = document.querySelector("#firstname + .errorMsg");
const lastname = document.querySelector("#lastname");
const lastnameError = document.querySelector("#lastname + .errorMsg");
const form = document.querySelector("#sign-up");

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

email.addEventListener("input", () => { emailValidator.test(); });
firstname.addEventListener("input", () => { firstnameValidator.test(); });
lastname.addEventListener("input", () => { lastnameValidator.test(); });

form.addEventListener("submit", event => {
	event.preventDefault();
	console.log("submit!");
});
