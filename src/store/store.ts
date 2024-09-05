import { create } from "zustand";

type Store = {
  signInSheetOpen: boolean;
  signUpSheetOpen: boolean;
  rentModalSheetOpen: boolean;
  filterSheetOpen: boolean;
  setSignInSheetOpen: () => void;
  setSignUpSheetOpen: () => void;
  setRentModalSheetOpen: () => void;
  setFilterSheetOpen: () => void;
};

export const useStore = create<Store>()((set) => ({
  signInSheetOpen: false,
  signUpSheetOpen: false,
  rentModalSheetOpen: false,
  filterSheetOpen: false,
  setSignInSheetOpen: () =>
    set((state) => ({
      signInSheetOpen: !state.signInSheetOpen,
    })),
  setSignUpSheetOpen: () =>
    set((state) => ({
      signUpSheetOpen: !state.signUpSheetOpen,
    })),
  setRentModalSheetOpen: () =>
    set((state) => ({
      rentModalSheetOpen: !state.rentModalSheetOpen,
    })),
  setFilterSheetOpen: () =>
    set((state) => ({
      filterSheetOpen: !state.filterSheetOpen,
    })),
}));
