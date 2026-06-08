interface ICounterWithElement {
  count: number;
  element: Element | undefined;
}
interface IHTMLElementUsrWithBot {
  usr: ICounterWithElement;
  bot: ICounterWithElement;
}
interface ISingleDoublePosition {
  single: number[];
  double: Set<number>;
}
interface IUpdateValues {
  blink(haveToBlink: boolean): void;
  usr2Changes(haveToUpdate: boolean): void;
  gameType(type: TTypeOfGame): void;
  gamePlayer(action: "usr2" | "bot"): void;
}

type TTypeOfGame = "easy" | "medium" | "hard";
type TTypeOfPlayer = "usr" | "bot" | "usr2";

export {
  ICounterWithElement,
  IHTMLElementUsrWithBot,
  ISingleDoublePosition,
  IUpdateValues,
  TTypeOfGame,
  TTypeOfPlayer,
};
