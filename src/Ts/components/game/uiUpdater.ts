import type {
  TTypeOfPlayer,
  ICounterWithElement,
  TTypeOfGame,
} from "../type/type";
import {
  buttons,
  checkBox,
  gameArea,
  gameTypeIndicator,
  starterBox,
} from "../dom/selectedDoms";
import resetAll from "./reset";
import {
  usrBotCount,
  uniqueVal,
  possibility,
  gameType,
  update,
} from "../data/data&UpdateData";

import bot from "../../../audio/bot.mp3";
import win from "../../../audio/win.mp3";
import user from "../../../audio/user.mp3";
import playSound from "./playSound";

function updateUI(type: TTypeOfPlayer, positionParameter: number): void {
  const target: HTMLButtonElement = buttons[positionParameter - 1];
  uniqueVal.add(positionParameter);

  if (target instanceof HTMLButtonElement) target.disabled = true;
  if (!(target?.children[0] instanceof HTMLElement) && target != null) {
    const typeOfPlayer: string = type === "usr" ? user : bot;
    const span: HTMLElement = document.createElement("span");
    const symbol: "X" | "O" = type === "usr" ? "X" : "O";
    target.dataset.type = symbol;
    span.textContent = symbol;
    span.classList.add("animation");
    span.classList.add(type === "usr" ? "usr1Box" : "botBox");
    target.append(span);

    const array: number[] | undefined = possibility.find(
      (value: number[]): boolean => {
        return value.every((value: number): boolean => {
          const target: HTMLButtonElement = buttons[value - 1];
          const position: number = Number(target.dataset.position);
          const isSameSymbol: boolean = target.dataset.type === symbol;
          return value === position && target.disabled && isSameSymbol;
        });
      },
    );

    setTimeout(() => {
      function assignTo(type: TTypeOfPlayer): void {
        if (type !== "usr2") {
          const obj: ICounterWithElement = usrBotCount[type];
          if (obj.element != null) {
            obj.element.textContent = String(++obj.count);
          }
        }
      }
      span.style.transform = "scale(1)";
      if (array?.length === 3) {
        array.forEach((value: number): void => {
          buttons[value - 1]?.children[0]?.classList?.add("blink");
        });
        type === "bot" || type == "usr2" ? assignTo("bot") : assignTo("usr");
        playSound(win);
        resetAll();
      } else if (uniqueVal.size === buttons.length) {
        playSound(typeOfPlayer);
        resetAll();
      } else playSound(typeOfPlayer);
    }, 100);
    if (array?.length === 3 || uniqueVal.size === buttons.length)
      update.blink(true);
  }
}

function boxStarter({ target }: Event): void {
  if (target instanceof HTMLButtonElement) {
    const action: string | undefined = target.dataset.action;
    if (action != undefined && (action == "usr2" || action == "bot")) {
      update.gamePlayer(action);
      if (action === "bot") {
        checkBox.forEach((value: HTMLInputElement): void => {
          const type = value.dataset.type as TTypeOfGame | undefined;
          const isChecked: boolean = value.checked;
          if (type != null && isChecked) {
            update.gameType(type);
          }
        });
      }
      const element = usrBotCount?.bot?.element?.previousElementSibling;

      if (element != null)
        element.textContent = action === "usr2" ? "Friend" : action;
    }
    starterBox?.removeEventListener("click", boxStarter);
    starterBox?.classList.toggle("hide");
    gameArea?.classList.toggle("hide");
    if (gameTypeIndicator != null && action === "bot") {
      gameTypeIndicator.textContent = gameType;
    } else if (gameTypeIndicator != null) {
      gameTypeIndicator.textContent = "And";
    }
  }
}

export { updateUI, boxStarter };
