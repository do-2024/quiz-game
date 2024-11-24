const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

function register() {
    // Get data from user
    const username = document.querySelector("#UsernameInput").value;
    const password = document.querySelector("#PasswordInput").value;
    const email = document.querySelector("#EmailInput").value;
    const phone = document.querySelector("#PhoneInput").value;
    const address = document.querySelector("#AddressInput").value;

    const feedback = document.querySelector("#Feedback");
    feedback.innerHTML = "";

    // Validate data
    // Check for empty fields including address
    if (username === "") {
        feedback.innerHTML = "Username is empty";
        return;
    }

    if (address === "") {
        feedback.innerHTML = "Address is empty";
        return;
    }

    // Check if user exists in localStorage
    if (localStorage[username] !== undefined) {
        feedback.innerHTML = "User already exists!";
        return;
    }

    // Apply RegEx
    if (!strongRegex.test(password)) {
        feedback.innerHTML = "Password too weak!";
        return;
    }

    if (phone.length !== 11) {
        feedback.innerHTML = "Number not valid!";
        return;
    }

    if (!email.includes('@') || !email.includes('.com')) {
        feedback.innerHTML = "Invalid email!";
        return;
    }

    // Store data
    const user = {
        username: username,
        password: password,
        email: email,
        phone: phone,
        address: address,
        topScore: 0
    }

    localStorage[username] = JSON.stringify(user);
    feedback.innerHTML = "Registration successful!";
}
