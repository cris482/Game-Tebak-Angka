let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let playerName = "";
let leaderboard = [];
let startTime = 0;

const startBtn = document.getElementById('startBtn');
const guessInput = document.getElementById('guess');
const submitBtn = document.getElementById('submit');
const result = document.getElementById('result');
const gameArea = document.getElementById('gameArea');
const resetLeaderboardBtn = document.getElementById('resetLeaderboard');
const leaderboardList = document.getElementById('leaderboard');
const nextPlayerBtn = document.getElementById('nextPlayer');

// Mulai game
startBtn.addEventListener('click', function () {
    const name = document.getElementById('playerName').value.trim();
    if (name === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }
    playerName = name;
    attempts = 0;
    randomNumber = Math.floor(Math.random() * 100) + 1;
    result.textContent = '';
    guessInput.value = '';
    startTime = Date.now(); // mulai waktu

    document.getElementById('playerName').style.display = 'none';
    startBtn.style.display = 'none';
    gameArea.style.display = 'block';
    nextPlayerBtn.style.display = 'none';
    guessInput.focus();
});

// Submit tebakan
submitBtn.addEventListener('click', submitGuess);
guessInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        submitGuess();
    }
});

function submitGuess() {
    const guess = Number(guessInput.value);
    if (!guess || guess < 1 || guess > 100) {
        result.textContent = "Masukkan angka antara 1 sampai 100!";
        return;
    }
    attempts++;

    if (guess === randomNumber) {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000); // hitung waktu

        result.textContent = `🎉 Benar! ${playerName} menebak dalam ${attempts} percobaan.`;
        result.classList.add('correct');

        leaderboard.push({
            name: playerName,
            score: attempts,
            number: randomNumber,
            time: timeTaken
        });

        leaderboard.sort((a, b) => a.score - b.score || a.time - b.time); // urutkan
        updateLeaderboard();

        setTimeout(() => result.classList.remove('correct'), 1000);

        gameArea.style.display = 'none';
        nextPlayerBtn.style.display = 'inline-block';
    } else if (guess < randomNumber) {
        result.textContent = "Terlalu rendah! ⬇️";
    } else {
        result.textContent = "Terlalu tinggi! ⬆️";
    }
}

// Update leaderboard
function updateLeaderboard() {
    leaderboardList.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${entry.name} - ${entry.score} percobaan - angka: ${entry.number} - waktu: ${entry.time} detik`;
        if (index === 0) li.classList.add('first');
        if (index === leaderboard.length - 1 && leaderboard.length > 1) li.classList.add('last');
        leaderboardList.appendChild(li);
    });
}

// Pemain berikutnya
nextPlayerBtn.addEventListener('click', function () {
    document.getElementById('playerName').value = '';
    document.getElementById('playerName').style.display = 'inline-block';
    startBtn.style.display = 'inline-block';
    nextPlayerBtn.style.display = 'none';
    result.textContent = '';
    guessInput.value = '';
});

// Reset leaderboard
resetLeaderboardBtn.addEventListener('click', function () {
    if (confirm("Yakin ingin menghapus seluruh skor leaderboard?")) {
        leaderboard = [];
        updateLeaderboard();
    }
});
