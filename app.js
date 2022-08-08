const p1 = {
  score: 0,
  button: document.querySelector("#p1Button"),
  display: document.querySelector("#p1Display"),
};
// gán cho p1 ban đầu =0 để khi ấn reset nó về p1
const p2 = {
  score: 0,
  button: document.querySelector("#p2Button"),
  display: document.querySelector("#p2Display"),
};

const resetButton = document.querySelector("#reset");
const winningScoreSelect = document.querySelector("#playto");
let winningScore = 3;
// track xem điểm winning đến bnh thì disable ko cho + thêm nữa
let isGameOver = false;
// mặc định ban đầu sẽ để là false để 2 bên chơi tiếp

function updateScores(player, opponent) {
  if (!isGameOver) {
    player.score += 1;
    // nếu chưa gameover thì cộng thêm điểm cho đến khi
    if (player.score === winningScore) {
      isGameOver = true;
      //  gameover thì ko + thêm điểm đc nữa, disable

      player.display.classList.add("has-text-success");
      //   has-text-success là chức năng trong bulma framework
      opponent.display.classList.add("has-text-danger");
      player.button.disabled = true;
      //   disable button trong bulma
      opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
  }
}

p1.button.addEventListener("click", function () {
  updateScores(p1, p2);
});
p2.button.addEventListener("click", function () {
  updateScores(p2, p1);
});

winningScoreSelect.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});
// khi thay đổi điểm số từ 3->11. thì sẽ update lại winningScore
// vì là kiểu strings nên phải đổi thành số nguyên parseInt
// sẽ callback reset ở dưới thực hiện reset

resetButton.addEventListener("click", reset);

function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = 0;
    p.display.classList.remove("has-text-success", "has-text-danger");
    p.button.disabled = false;
  }
}
