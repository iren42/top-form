// Regular expression for email validation as per HTML specification
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const NAME_REGEX = /^(?!-)[a-zA-Z -]*[a-zA-Z]$/;

const email = document.querySelector("#email");
const emailError = document.querySelector("#email + .errorMsg");
const firstname = document.querySelector("#firstname");
const firstnameError = document.querySelector("#firstname + .errorMsg");
const lastname = document.querySelector("#lastname");
const lastnameError = document.querySelector("#lastname + .errorMsg");
const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector("#postal-code + .errorMsg");
const form = document.querySelector("#sign-up");

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

email.addEventListener("input", () => { emailValidator.test(); });
postalCode.addEventListener("input", () => { postalCodeValidator.test(); });
firstname.addEventListener("input", () => { firstnameValidator.test(); });
lastname.addEventListener("input", () => { lastnameValidator.test(); });

form.addEventListener("submit", event => {
	event.preventDefault();
	console.log("submit!");
});
