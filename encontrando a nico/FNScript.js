document.addEventListener("DOMContentLoaded", function () {
    const nico = document.querySelector(".nico");
    const nicoImage = nico.querySelector('img');
    const nicoIdle = document.querySelector(".nicoIdle");
    const p = document.querySelector("p")
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const startButton = document.getElementById("start-button");
    const gameContainer = document.querySelector(".game-container");
    const nicos = [
        { index: 0, url: "./Recursos/Image/Character/Niki-idle.png"},
        { index: 1, url: "./Recursos/Image/Character/Niki-idle2.png"},
        { index: 2, url: "./Recursos/Image/Character/Niki-idle3.png"}

    ]

    const urls = [
        { index: 0, url: "url('./Recursos/Image/Background/back1.png')"}, 
        { index: 1, url: "url('./Recursos/Image/Background/back2.png')"}, 
        { index: 2, url: "url('./Recursos/Image/Background/back3.png')"},
        { index: 3, url: "url('./Recursos/Image/Background/back4.png')"}, 
        { index: 4, url: "url('./Recursos/Image/Background/back5.png')"}, 
        { index: 5, url: "url('./Recursos/Image/Background/back6.jpg')"},
        { index: 6, url: "url('./Recursos/Image/Background/back7.jpg')"}, 
        { index: 7, url: "url('./Recursos/Image/Background/back8.jpg')"}, 
        { index: 8, url: "url('./Recursos/Image/Background/back9.png')"},
        { index: 9, url: "url('./Recursos/Image/Background/back10.png')"}, 
        { index: 10, url: "url('./Recursos/Image/Background/back11.png')"}, 
        { index: 11, url: "url('./Recursos/Image/Background/back12.png')"}
    ]

    let unusedBacks = [];
    let unusedNicos = [];

    function randomBackground() {
        if (unusedBacks.length === 0) {
            unusedBacks = urls.map(item => item.index);
        }
    
        const randomIndexPosition = Math.floor(Math.random() * unusedBacks.length);
        const chosenIndex = unusedBacks[randomIndexPosition];
    
        unusedBacks.splice(randomIndexPosition, 1);
    
        return chosenIndex;
    }

    function randomNicos(imageArray, unusedNicos) {
        if (unusedNicos.length === 0) {
            unusedNicos = imageArray.map(item => item.index);
        }
    
        const randomIndexPosition = Math.floor(Math.random() * unusedNicos.length);
        const chosenIndex = unusedNicos[randomIndexPosition];
    
        unusedNicos.splice(randomIndexPosition, 1);
    
        return chosenIndex;
    }
    
    let score = 0;
    let timer;
    let currentAudio = null;

    startButton.addEventListener("click", startGame);

    function playMusic(music) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        
        currentAudio = new Audio(music);
        currentAudio.loop = true;
        currentAudio.play();

    }

    function stopMusic() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    }

    function playSound(sound) {
        let audio = new Audio(sound);
        audio.play();
    }

    function startGame() {
        score = 0;
        scoreElement.textContent = score;
        startButton.disabled = true;
        nicoIdle.style.display= "none"
        p.style.display= "none"
        nico.style.display= "block"
        startTimer();
        playMusic("./Recursos/Sound/music.mp3");
        unusedBacks = [];
        unusedNicos = [];
        let randomIndex = randomBackground();
        let url = urls[randomIndex].url;
        gameContainer.style.backgroundImage = `${url}`;
        
    }

    function startTimer() {
        let timeLeft = 20;
        timerElement.textContent = timeLeft;

        timer = setInterval(function () {
            timeLeft--;
            timerElement.textContent = timeLeft;

            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);
    }

    function moveNico() {
        const maxX = gameContainer.clientWidth - nico.clientWidth;
        const maxY = gameContainer.clientHeight - nico.clientHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        nico.style.left = randomX + "px";
        nico.style.top = randomY + "px";
    }

    nico.addEventListener ("click", function () {
        score++;
        scoreElement.textContent = score;
        playSound("./Recursos/Sound/shot.mpeg")
        moveNico()

        let randomIndexForNico = randomNicos(nicos, unusedNicos);
        nico.src = nicos[randomIndexForNico].url.replace("url('", "").replace("')", "");

        let randomIndex = randomBackground();
        let url = urls[randomIndex].url;
        gameContainer.style.backgroundImage = `${url}`;
    })

    function endGame() {
        clearInterval(timer);
        startButton.disabled = false;
        
        const confirmReload = confirm("Juego terminado. Tu puntaje es: " + score + "\n¿Quieres jugar otra ronda?");
        
        if (confirmReload) {
            stopMusic("./Recursos/Sound/music.mp3")
            startGame();
        } else {
            window.location.href = '../index.html';
        }
    }

});