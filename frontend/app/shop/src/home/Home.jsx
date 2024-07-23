/* eslint-disable react-hooks/exhaustive-deps */
import LastItemListContainer from "../product/LastItemListContainer";

export default function Home() {
  return (
    <section>
      <section className="w-full bg-gray-500 min-h-[200px]">
        <h1>Carrousel Producto promo</h1>
      </section>
      <section>
        <header className="w-full p-4 text-center font-extrabold text-3xl tracking-wide">
          <h1>¡Enterate de las últimas novedades!</h1>
        </header>
        <LastItemListContainer />
      </section>
    </section>
  );
}
