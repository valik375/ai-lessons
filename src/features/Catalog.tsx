import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api';
import type { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { SearchField } from '../components/SearchField';
import { Button } from '../components/Button';

export function Catalog({ onAdd }: { onAdd: (product: Product) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');
  const [sort, setSort] = useState('default');
  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    getProducts(controller.signal).then((data) => {
      if (!controller.signal.aborted) { setProducts(data); setStatus('ready'); }
    }).catch(() => { if (!controller.signal.aborted) setStatus('error'); });
    return () => controller.abort();
  }, [attempt]);
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase())
    && (category === 'Все' || product.category === category));
  if (sort !== 'default') filtered.sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price);
  return <section className="catalog" aria-labelledby="catalog-title">
    <div className="section-heading"><div><span className="eyebrow">СОБЕРИТЕ СВОЙ НАБОР</span><h2 id="catalog-title">На вашем столе</h2></div>
      <span className="muted">{status === 'ready' ? `${filtered.length} товаров` : 'Каталог'}</span></div>
    <SearchField value={search} onChange={setSearch} />
    <div className="filters">
      <div className="tabs" aria-label="Категория">
        {['Все', 'Аксессуары', 'Канцелярия', 'Техника'].map((name) => <button key={name} type="button"
          aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}
      </div>
      <select aria-label="Сортировка" value={sort} onChange={(event) => setSort(event.target.value)}>
        <option value="default">По умолчанию</option><option value="asc">Сначала дешевле</option><option value="desc">Сначала дороже</option>
      </select>
    </div>
    {status === 'loading' && <p className="empty" role="status">Загружаем товары…</p>}
    {status === 'error' && <div className="empty"><p role="alert">Не удалось загрузить товары</p>
      <Button onClick={() => setAttempt(attempt + 1)}>Попробовать снова</Button></div>}
    {status === 'ready' && (filtered.length ? <div className="products">{filtered.map((product) =>
      <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>
      : <p className="empty" role="status">Товары не найдены. Попробуйте другой запрос.</p>)}
  </section>;
}
