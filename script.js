{
	// Regular expression for email validation as per HTML specification
	const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const NAME_REGEX = /^(?!-)[a-zA-Z -]*[a-zA-Z]$/;
	const PHONE_REGEX = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	const NOTHING_REGEX = /^$/;

	// Valid Password: at least 8 characters, at least one letter and one number
	const PASSWORD_REGEX = /\d+/;
	const PASSWORD_REGEX1 = /[a-zA-Z]+/;
	const PASSWORD_REGEX2 = /[\S]{8,}/;

	// Update error message and visibility
	function handleError(inputID, regex) {
		const field = document.querySelector(`#${inputID}`);
		const error = document.querySelector(`#${inputID} + .errorMsg`);
		let isValid = false;

		if (!field || !error)
			throw new Error("No input field and/or error message");
		error.className = "errorMsg show";
		if (field.validity.valueMissing)
			error.textContent = "No value typed";
		else if (!regex.test(field.value) && !NOTHING_REGEX.test(field.value))
			error.textContent = `Pattern does not match a/an ${inputID}`;
		else if (field.validity.typeMismatch) {
			error.textContent = "This is not the right type";
		} else {
			error.textContent = "";
			error.className = "errorMsg";
			isValid = true;
		}
		return (isValid);
	}

	function handlePostalCodeError() {
		const postalCodeField = document.querySelector(`#postal-code`);
		const error = document.querySelector(`#postal-code + .errorMsg`);
		let isValid = false;
		// For each country, defines the pattern that the postal code has to follow
		const constraints = {
			none: [NOTHING_REGEX, "",],
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
			other: [NOTHING_REGEX, "",],
		};

		// Read the country id
		const country = document.getElementById("country").value;

		// Build the constraint checker
		const constraint = new RegExp(constraints[country][0], "");

		// Check it!
		if (constraint.test(postalCodeField.value)) {
			error.className = "errorMsg";
			error.textContent = "";
			isValid = true;
		} else {
			error.className = "errorMsg show";
			error.textContent = constraints[country][1];
		}
		return (isValid);
	}

	function handlePasswordError() {
		const passwordField = document.querySelector("#password");
		const error = document.querySelector("#password + .errorMsg");
		let isValid = false;

		if (!passwordField || !error)
			throw new Error("Missing input");
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
			isValid = true;
		}
		return (isValid);
	}

	function handleConfirmPasswordError() {
		const field = document.querySelector("#confirm-password");
		const error = document.querySelector("#confirm-password + .errorMsg");
		const password = document.querySelector("#password");
		let isValid = false;

		if (!password || !field || !error)
			throw new Error("Missing input");
		error.className = "errorMsg show";
		if (field.validity.valueMissing)
			error.textContent = "No value typed";
		else if (password.value !== field.value)
			error.textContent = "Does not match password";
		else {
			error.textContent = "";
			error.className = "errorMsg";
			isValid = true;
		}
		return (isValid);
	}

	try {
		const email = document.querySelector("#email");
		email.addEventListener("input", () => { handleError("email", EMAIL_REGEX); });

		const phone = document.querySelector("#phone-number");
		phone.addEventListener("input", () => { handleError("phone-number", PHONE_REGEX); });

		const firstname = document.querySelector("#firstname");
		firstname.addEventListener("input", () => { handleError("firstname", NAME_REGEX); });

		const lastname = document.querySelector("#lastname");
		lastname.addEventListener("input", () => { handleError("lastname", NAME_REGEX); });

		const password = document.querySelector("#password");
		password.addEventListener("input", () => { handlePasswordError(); });

		const confirmPassword = document.querySelector("#confirm-password");
		confirmPassword.addEventListener("input", () => { handleConfirmPasswordError(); });

		const postalCode = document.querySelector("#postal-code");
		postalCode.addEventListener("input", () => { handlePostalCodeError(); });
		const country = document.querySelector("#country");
		country.addEventListener("change", () => { handlePostalCodeError(); });

		const form = document.querySelector("#sign-up");
		form.addEventListener("submit", event => {
			event.preventDefault();
			if (!handleError("email", EMAIL_REGEX)
				|| !handleError("phone-number", PHONE_REGEX)
				|| !handleError("firstname", NAME_REGEX)
				|| !handleError("lastname", NAME_REGEX)
				|| !handlePasswordError()
				|| !handleConfirmPasswordError()
				|| !handlePostalCodeError())
				console.log("retry");
			else
				console.log("submit!");
		});
	}
	catch (e) {
		console.error(e);
	}
}
