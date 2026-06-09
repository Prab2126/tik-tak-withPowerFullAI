import botThinker from "./components/ai/botThinker";
import {
  gamePlayer,
  gameType,
  isBlinked,
  update,
  usr2Changes,
  usrBotCount,
} from "./components/data/data&UpdateData";
import {
  container,
  gameArea,
  homeNavigation,
  starterBox,
} from "./components/dom/selectedDoms";
import resetAll from "./components/game/reset";
import { boxStarter, updateUI } from "./components/game/uiUpdater";
import type {
  ICounterWithElement,
  IHTMLElementUsrWithBot,
} from "./components/type/type";

homeNavigation?.addEventListener("click", ({ currentTarget }): void => {
  if (currentTarget instanceof HTMLButtonElement) {
    gameArea?.classList.toggle("hide");
    starterBox?.classList.toggle("hide");
    starterBox?.addEventListener("click", boxStarter);
    for (const key in usrBotCount) {
      const obj: ICounterWithElement =
        usrBotCount[key as keyof IHTMLElementUsrWithBot];
      obj.count = 0;
      if (obj.element != null) obj.element.textContent = "0";
    }
    resetAll(0);
  }
});

container?.addEventListener("click", ({ target }): void => {
  if (target instanceof HTMLButtonElement) {
    const position: number | undefined = Number(target.dataset.position);
    if (gamePlayer === "usr2") {
      updateUI(usr2Changes ? "usr2" : "usr", position);
      update.usr2Changes(!usr2Changes);
    } else updateUI("usr", position);

    if (isBlinked === false && gamePlayer == "bot") {
      botThinker(400, gameType);
    }
  }
});

starterBox?.addEventListener("click", boxStarter);
