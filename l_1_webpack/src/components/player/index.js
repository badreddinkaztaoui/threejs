class Player {
  constructor(username = "Guest", score = 0, avatar = "") {
    this.username = username;
    this.score = score;
    this.avatar = avatar;
    // Bind functions to Player class
    this.increment = this.increment.bind(this);
    this.printPlayerData = this.printPlayerData.bind(this);
    this.create = this.create.bind(this);
  }

  create() {
    const wrapper = document.createElement("div");
    const username = document.createElement("h2");
    username.textContent = this.username;
    const score = document.createElement("p");
    score.textContent = this.score;
    const avatar = document.createElement("img");
    avatar.alt = `${this.username}-avatar`;
    avatar.src = this.avatar;
    avatar.width = 100;

    wrapper.appendChild(avatar);
    wrapper.appendChild(username);
    wrapper.appendChild(score);

    const body = document.querySelector("body");
    body.appendChild(wrapper);
  }

  increment() {
    this.score++;
  }

  printPlayerData() {
    console.log(`Username: ${this.username}, Score: ${this.score}`);
  }
}

export default Player;
