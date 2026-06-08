const container: HTMLDivElement | null = document.querySelector("#container");
const buttons = document.getElementsByClassName(
  "box",
) as HTMLCollectionOf<HTMLButtonElement>;
const usr1Element: Element | undefined =
  document.querySelector("#usr")?.children[1];
const starterBox: HTMLDivElement | null = document.querySelector("#starting");
const checkBox: NodeListOf<HTMLInputElement> =
  document.querySelectorAll("#typeOfGame input");

const initialHiddenBox: NodeListOf<HTMLDivElement> =
  document.querySelectorAll(".hide");
const gameTypeIndicator: Element | undefined =
  document.querySelector("#gameType")?.children[0];

export {
  container,
  buttons,
  starterBox,
  checkBox,
  usr1Element,
  initialHiddenBox,
  gameTypeIndicator,
};
