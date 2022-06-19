import Avatar1 from "./assets/images/avatar1.webp";
import Avatar2 from "./assets/images/avatar2.png";
import Player from "./components/player";
// Styles
import "./global.css";

const bkdev = new Player("Bkdev1337", 0, Avatar1);
const fantom = new Player("Fantom", 100, Avatar2);

bkdev.create();
fantom.create();
