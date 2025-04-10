const email = document.querySelector("#email");
const emailError = document.querySelector("#email + .errorMsg");
// Regular expression for email validation as per HTML specification
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if (!email || !emailError)
	throw new Error("No email input");
email.addEventListener("input", (event) => {
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
