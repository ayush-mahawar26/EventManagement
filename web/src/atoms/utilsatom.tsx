import { atom } from "recoil";

export const loadingAtom = atom({
  key: "loadingAtom",
  default: false,
});

export const messageAtom = atom({
  key: "messageAtom",
  default: "",
});

export const openSnackbarAtom = atom({
  key: "openAtom",
  default: false,
});

export const roleAtom = atom({
  key: "roleAtom",
  default: "User",
});
