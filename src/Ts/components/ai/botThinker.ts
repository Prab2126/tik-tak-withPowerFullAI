import { uniqueVal } from "../data/data&UpdateData";
import { randomPositionTaker, renderOnThink } from "../game/positionsTaker";
import { buttons } from "../dom/selectedDoms";
import type { TTypeOfGame } from "../type/type";
import { updateUI } from "../game/uiUpdater";

function botThinker(delay: number = 0, gameType: TTypeOfGame = "medium"): void {
  if (gameType === "easy") randomPositionTaker(delay);
  else if (gameType === "medium") {
    uniqueVal.size === 1 ? randomPositionTaker(delay) : renderOnThink(delay);
  } else if (gameType === "hard") {
    if (uniqueVal.size === 1) {
      const position: number = [...buttons].reduce(
        (acc: number, value: HTMLButtonElement) =>
          value.disabled ? Number(value.dataset.position) : acc,
        -1,
      );
      const oddPositions: number[] = [];
      for (let i = 1; i <= buttons.length; i++) {
        if (i % 2 !== 0 && i != 5) oddPositions.push(i);
      }
      const isCenter: boolean = position === 5;
      if (isCenter) {
        const index: number = Math.floor(Math.random() * oddPositions.length);
        const position: number = oddPositions[index];
        setTimeout(updateUI, delay, "bot", position);
      } else if (oddPositions.includes(position))
        setTimeout(updateUI, delay, "bot", 5);
      else randomPositionTaker(delay);
    } else renderOnThink(delay);
  }
}

export default botThinker;
