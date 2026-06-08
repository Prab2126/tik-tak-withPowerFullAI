import { possibility } from "../data/data&UpdateData";
import { buttons } from "../dom/selectedDoms";
import type { ISingleDoublePosition } from "../type/type";
import { updateUI } from "../game/uiUpdater";

function randomPositionTaker(delay: number) {
  const position: number = Math.floor(Math.random() * possibility.length + 1);
  const isDisabled = buttons[position - 1]?.disabled;
  if (isDisabled) {
    randomPositionTaker(delay);
  } else {
    setTimeout(updateUI, delay, "bot", position);
  }
}

function getFreeAndAcquiredSpace(paraType: "X" | "O"): number[][] {
  const positionOfBoth: number[] = [];
  for (const element of [...buttons]) {
    if (element instanceof HTMLButtonElement) {
      const dataset: DOMStringMap = element.dataset;
      const type: string | undefined = dataset.type;
      if (type != null && type === (paraType === "O" ? "X" : "O")) {
        const position: number = Number(dataset.position);
        positionOfBoth.push(position);
      }
    }
  }

  const positions: number[][] = possibility.filter(
    (value: number[]): boolean =>
      value.some((value: number): boolean => positionOfBoth.includes(value)) ==
      false,
  );
  return positions;
}

function botWin(): number | undefined {
  const positions: number[][] = getFreeAndAcquiredSpace("O");

  const canWinPositions: number[][] = positions.filter(
    (value: number[]): boolean => {
      let count: number = 0;
      for (const num of value) {
        const element: HTMLButtonElement = buttons[num - 1];
        if (element.disabled) count++;
      }
      return count === 2;
    },
  );
  const winingPositions: number[] = canWinPositions.reduce(
    (acc: number[], current: number[]): number[] => {
      const targetArea: number | undefined = current.find(
        (num: number): boolean => {
          const target: HTMLButtonElement = buttons[num - 1];
          return target.disabled === false;
        },
      );

      if (targetArea != null) return [...acc, targetArea];
      return acc;
    },
    [],
  );

  const index: number = Math.floor(Math.random() * winingPositions.length);
  return winingPositions[index] ?? winingPositions[0];
}

function stopUsr(): number {
  const positions: number[][] = getFreeAndAcquiredSpace("X");
  const canUsePositions: number[][] = [];
  for (const value of positions) {
    let count: number = 0;
    const usablePosition: number[] = value.filter((num: number): boolean => {
      const target: HTMLButtonElement = buttons[num - 1];
      if (target.disabled) count++;
      return target.disabled === false;
    });
    if (count != 0) canUsePositions.push(usablePosition);
  }

  const { single, double }: ISingleDoublePosition = canUsePositions.reduce(
    (acc: ISingleDoublePosition, curr: number[]): ISingleDoublePosition => {
      if (curr.length === 1)
        return { ...acc, single: [...acc.single, ...curr] };
      return { ...acc, double: new Set([...acc.double, ...curr]) };
    },
    { single: [], double: new Set() },
  );

  const singleOrMultiple: number[] = single.length ? single : [...double];
  const index: number = Math.floor(Math.random() * singleOrMultiple.length);
  const value: number = singleOrMultiple[index] ?? singleOrMultiple[0];
  return value;
}
function renderOnThink(delay: number) {
  const winningBotPosition: number | undefined = botWin();
  if (winningBotPosition != null) {
    setTimeout(updateUI, delay, "bot", winningBotPosition);
  } else {
    const stopUsrToWin: number = stopUsr();
    if (stopUsrToWin != null) setTimeout(updateUI, delay, "bot", stopUsrToWin);
  }
}
export { randomPositionTaker, renderOnThink, botWin, stopUsr };
