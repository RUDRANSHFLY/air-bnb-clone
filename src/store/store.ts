import { create } from "zustand";

type Store = {
  signInSheetOpen: boolean;
  signUpSheetOpen: boolean;
  setSignInSheetOpen: () => void;
  setSignUpSheetOpen: () => void;
};

export const useStore = create<Store>()((set) => ({
  signInSheetOpen: false,
  signUpSheetOpen: false,
  setSignInSheetOpen: () =>
    set((state) => ({
      signInSheetOpen: !state.signInSheetOpen,
    })),
  setSignUpSheetOpen: () =>
    set((state) => ({
      signUpSheetOpen: !state.signUpSheetOpen,
    })),
}));
