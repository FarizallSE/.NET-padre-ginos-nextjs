"use client";
import { use, useState} from "react";

export default function FavoriteButton({
  pizzaId,
  pizzaName,
  // isFavorite,
  onToggle,
  favoriteIdsPromise,
}: {
  pizzaId: string;
  pizzaName: string;
  // isFavorite: boolean;
  onToggle: () => void;
  favoriteIdsPromise: Promise<string[]>;
}) {
  const favoriteIds = use(favoriteIdsPromise);
  const [isFavorite, setIsFavorite] = useState(favoriteIds.includes(pizzaId));
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? "Hapus" : "Tambah"} ${pizzaName} ${isFavorite ? "dari" : "ke"} favorit`}
      className="shrink-0 text-2xl leading-none text-brand"
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
