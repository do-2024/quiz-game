function loadLeaderboard() {
    const scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardEl = document.getElementById('leaderboard').querySelector('tbody');

    // Sort scores in descending order
    scores.sort((a, b) => b.score - a.score);

    scores.forEach(({ username, score }) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${username}</td><td>${score}</td>`;
        leaderboardEl.appendChild(row);
    });

    // Display the current user's username
    const currentUsername = localStorage.getItem('username');
    document.getElementById('welcome-username').textContent = currentUsername || 'Guest';
}

// Load leaderboard on page load
window.onload = loadLeaderboard;
