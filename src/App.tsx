import { useEffect, useReducer, useState } from 'react';
import { Catalog } from './features/Catalog';
import { Cart } from './features/Cart';
import { CART_KEY, cartReducer, loadCart } from './lib/cart';

export default function App() {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); setStorageError(false); }
    catch { setStorageError(true); }
  }, [items]);
  return <>
    <header className="header"><a className="brand" href="/" aria-label="Deskshop — главная"><span>ds.</span>deskshop</a>
      <span className="header-caption">Вещи для хорошего рабочего дня</span><span className="lab-badge"><i /> TESTING LAB</span></header>
    <main>
      <section className="hero"><div><div className="eyebrow">МАЛЕНЬКИЕ ВЕЩИ. БОЛЬШИЕ ИДЕИ.</div>
        <h1>Место, где<br />хочется <em>создавать.</em></h1><p>Соберите свой рабочий уголок.<br />Всё нужное — и ничего лишнего.</p></div>
        <div className="hero-art" aria-hidden="true"><div className="hero-circle" /><div className="hero-book"><span>MAKE<br />ROOM<br /><b>FOR IDEAS.</b></span></div>
          <div className="hero-pencil" /><div className="hero-cup" /><span className="hero-sticker">GOOD<br />WORK<br />STARTS HERE ↗</span></div>
      </section>
      {storageError && <p role="alert">Не удалось сохранить корзину. После перезагрузки изменения могут пропасть.</p>}
      <div className="shop-layout"><Catalog onAdd={(product) => dispatch({ type: 'add', product })} /><Cart items={items} dispatch={dispatch} /></div>
    </main>
    <footer><a className="brand" href="/">deskshop<span className="footer-dot">.</span></a><span>Учебный магазин · Сделано для практики тестирования</span><span>React + TypeScript / 2026</span></footer>
  </>;
}
