import { createContext } from "react";

export const ToggleContext = createContext({
  checkboxCheck: false,
  setCheckboxCheck: (checkboxCheck: boolean) => {},
});
