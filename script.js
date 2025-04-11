const email = document.querySelector("#email");
const emailError = document.querySelector("#email + .errorMsg");

// Regular expression for email validation as per HTML specification
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

if (!email || !emailError)
	throw new Error("No email input");
email.addEventListener("input", () => {
	if (email.validity.valueMissing)
		emailError.textContent = "No value typed";
	else if (!EMAIL_REGEX.test(email.value))
		emailError.textContent = "Pattern does not match an email address";
	else if (email.validity.typeMismatch) {
		emailError.textContent = "Should look like 'an@example.com'";
	} else {
		emailError.textContent = "";
	}
});

const firstname = document.querySelector("#firstname");
const firstnameError = document.querySelector("#firstname + .errorMsg");
const lastname = document.querySelector("#lastname");
const lastnameError = document.querySelector("#lastname + .errorMsg");

const NAME_REGEX = /^(?!-)[a-zA-Z -]*[a-zA-Z]$/;

if (!firstname || !firstnameError)
	throw new Error("No firstname input");
if (!lastname || !lastnameError)
	throw new Error("No lastname input");

firstname.addEventListener("input",
	() => { handleInput(firstname, firstnameError, updateNameError); });

lastname.addEventListener("input",
	() => { handleInput(lastname, lastnameError, updateNameError); });

function setClass(input, isValid) {
	input.className = isValid ? "valid" : "invalid";
};

// Update error message and visibility
function updateNameError(error, isValidInput) {
	if (isValidInput) {
		error.textContent = "";
		error.className = "errorMsg";
	} else {
		error.textContent = "This is not a valid name";
		error.className = "errorMsg show";
	}
};

// Handle input event to update email validity
function handleInput(input, error, fn) {
	const isValid = isValidInput(input);
	setClass(input, isValid);
	fn(error, isValid);
};

function isValidInput(name) {
	if (!name.validity.valueMissing) {
		return (true);
	}
	if (!NAME_REGEX.test(name.value)) {
		return (false);
	}
	if (name.validity.typeMismatch) {
		return (false);
	}
	return (true);
}

const form = document.querySelector("#sign-up");
form.addEventListener("submit", event => {
	event.preventDefault();
	console.log("submit!");
});
