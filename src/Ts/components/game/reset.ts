import { buttons } from "../dom/selectedDoms";
import { uniqueVal, update } from "../data/data&UpdateData";
import type { IUpdateValues } from "../type/type";

function resetAll(delay: number = 1000): void {
  const { blink, usr2Changes }: IUpdateValues = update;
  [...buttons].forEach((value: HTMLButtonElement): void => {
    value.disabled = true;
    setTimeout(() => {
      value.disabled = false;
      value.children?.[0]?.remove();
      uniqueVal.clear();
      blink(false);
      usr2Changes(false);
      delete value.dataset.type;
    }, delay);
  });
}

export default resetAll;
