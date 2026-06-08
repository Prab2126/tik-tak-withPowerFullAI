import type {
  TTypeOfGame,
  IHTMLElementUsrWithBot,
  IUpdateValues,
} from "../type/type";
import { usr1Element } from "../dom/selectedDoms";
const possibility: number[][] = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
];

const uniqueVal: Set<number> = new Set();
let isBlinked: boolean = false;
let gamePlayer: "usr2" | "bot" | null = null;
let gameType: TTypeOfGame = "medium";
let usr2Changes: boolean = false;
const usrBotCount: IHTMLElementUsrWithBot = {
  usr: {
    count: 0,
    element: usr1Element,
  },
  bot: { count: 0, element: document.querySelector("#bot")?.children[1] },
};

const update: IUpdateValues = {
  blink(haveToBlink: boolean): void {
    isBlinked = haveToBlink;
  },
  usr2Changes(haveToUpdate: boolean): void {
    usr2Changes = haveToUpdate;
  },
  gameType(type: TTypeOfGame): void {
    gameType = type;
  },
  gamePlayer(action: "usr2" | "bot"): void {
    gamePlayer = action;
  },
};

export {
  possibility,
  isBlinked,
  gamePlayer,
  update,
  gameType,
  usr2Changes,
  uniqueVal,
  usrBotCount,
};
