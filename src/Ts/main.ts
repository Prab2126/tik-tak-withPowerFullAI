import botThinker from "./components/ai/botThinker";
import {
  gamePlayer,
  gameType,
  isBlinked,
  update,
  usr2Changes,
} from "./components/data/data&UpdateData";
import { container, starterBox } from "./components/dom/selectedDoms";
import { boxStarter, updateUI } from "./components/game/uiUpdater";

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
