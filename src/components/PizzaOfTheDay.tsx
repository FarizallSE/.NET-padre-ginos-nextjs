import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import DismissibleBanner from "@/components/DismissibleBanner";
import { getPizzas } from "@/lib/data";
import { formatPrice, lowestPrice } from "@/lib/format";
import type { Pizza } from "@/lib/types";

const MS_PER_DAY = 86_400_000;

// Secara default ini adalah Server Component: tanpa "use client". Semua kode
// di bawah ini berjalan di server, sehingga data dan markup dari banner akan 
// dikirim langsung sebagai bagian dari static shell (HTML awal).
export default async function PizzaOfTheDay() {
  const pizza = await getPizzaOfTheDay();

  return (
    <DismissibleBanner>
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <Image
          src={pizza.image}
          alt={pizza.name}
          width={160}
          height={160}
          className="h-28 w-28 shrink-0 rounded-xl object-cover ring-2 ring-white/25"
        />
        <div className="pr-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Pizza of the Day
          </p>
          <h2 className="mt-1 text-2xl font-black leading-tight">{pizza.name}</h2>
          <p className="mt-1 line-clamp-2 text-sm text-white/80">
            {pizza.description}
          </p>
          <p className="mt-2 text-sm font-semibold">
            <span className="rounded-full bg-white/20 px-2 py-0.5">
              {pizza.category}
            </span>{" "}
            mulai {formatPrice(lowestPrice(pizza))}
          </p>
        </div>
      </div>
    </DismissibleBanner>
  );
}
// `Date.now()` di dalam scope yang di-cache memang sengaja diizinkan:
// sistem pelindung (guard) sync-IO pada proses prerender biasanya akan
// menolaknya jika berada di Server Component biasa (menghasilkan error E1432), 
// tetapi di sini fungsinya dieksekusi sekali dan hasilnya disimpan. Inilah yang 
// membuat banner tersebut bisa masuk ke dalam static shell (HTML awal), 
// namun tetap bisa menampilkan pizza yang berbeda setiap harinya.
async function getPizzaOfTheDay(): Promise<Pizza> {
  "use cache";
  cacheLife("hours");
  cacheTag("pizza-of-the-day");

  const pizzas = await getPizzas();
  const dayIndex = Math.floor(Date.now() / MS_PER_DAY) % pizzas.length;
  return pizzas[dayIndex];
}