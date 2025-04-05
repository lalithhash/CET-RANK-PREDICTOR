import { atom } from "recoil";

export const collegelist = atom({
  key: "collegelist", // Unique ID (string) for this atom
  default: [], // Default value
});

export const formDataAtom = atom({
  key: "formDataAtom", // Unique ID (with respect to other atoms/selectors)
  default: {
    kcetRank: "",
    clusterPreferences: [],
    placePreferences: [],
    category: null,
  },
});

export const sidebar = atom({
  key:"sidebar",
  default:false
});
