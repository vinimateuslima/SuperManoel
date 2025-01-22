const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const cloud = document.querySelector(".cloud");

const gameOver = document.querySelector(".game-over");

const restartButton = document.querySelector(".restart");

const audio = new Audio("../audio/Canetaazul.mp3");
const ai = new Audio("../audio/ai.mp3");
const jumpSound = new Audio("../audio/jump.mp3");

audio.volume = 0.2;
ai.volume = 0.5;
jumpSound.volume = 0.1;

audio.play();

const jump = () => {
  mario.classList.add("jump");

  if (gameOver.style.visibility == "hidden") {
    jumpSound.play();
  }

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const start = () => {

  gameOver.style.visibility = "hidden";

  pipe.style.animation = "pipe-animations 1.5s infinite linear";
  pipe.style.left = "";

  mario.style.bottom = "";

  mario.src = "../img/manoel.gif";
  // Substitua pelo caminho correto da imagem do Mario padrão
  cloud.style.left = "";
  cloud.style.animation = "cloud 20s infinite linear";

  const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");
    const cloudPosition = +window
      .getComputedStyle(cloud)
      .left.replace("px", "");

    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;

      mario.src = "../img/game-over.png";
      ai.play();
      cloud.style.animation = "cloud 20s infinite linear";
      cloud.style.left = `${cloudPosition}px`;

      gameOver.style.visibility = "visible";

      clearInterval(loop);
    }
  }, 10);
};

start();

document.addEventListener("keydown", jump);

restartButton.addEventListener("click", () => {
  location.reload();
});
