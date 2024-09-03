import { useStore } from "@/store/store";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Toast, toast } from "react-hot-toast";
import { SafeUser } from "../../typings";

interface IUseFavorite {
  listingID: string;
  currentUser?: SafeUser | null;
}

export const useFavorite = ({ currentUser, listingID }: IUseFavorite) => {
  const router = useRouter();
  const openSignInSheet = useStore((state) => state.setSignInSheetOpen);

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingID);
  }, [currentUser, listingID]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return openSignInSheet();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingID}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingID}`);
        }

        await request();
        router.refresh();
        toast.success(`Success`);
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingID, openSignInSheet, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};
