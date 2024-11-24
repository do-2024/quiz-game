function login() {
    // Get data from user
    const username = document.querySelector("#UsernameInput").value;
    const password = document.querySelector("#PasswordInput").value;
    const feedback = document.querySelector("#Feedback");
    feedback.innerHTML = "";

    // Does user exist?
    if (localStorage[username] !== undefined) {
        const user = JSON.parse(localStorage[username]);
        if (user.password === password) {
            sessionStorage.loggedInUser = username;
            localStorage.setItem('username', username); // Store the username for leaderboard
            feedback.innerHTML = `Login successful`;
            window.location.href = 'quizgamepage.html'; // Redirect to the quiz page
        } else {
            feedback.innerHTML = `Password incorrect`;
        }
    } else {
        feedback.innerHTML = `Username not found`;
    }
}
