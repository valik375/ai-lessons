import type { Product } from '../types';
import { formatPrice } from '../lib/money';
import { Button } from './Button';

export function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  return <article className="product-card" aria-label={product.name}>
    <div className={`product-art ${product.color}`} aria-hidden="true">
      <div className={`object object--${product.art}`}><i /><b /><em /></div>
      <span className="art-number">DS / {product.id.slice(0, 3).toUpperCase()}</span>
    </div>
    <div className="product-info">
      <span className="eyebrow">{product.category}</span>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-bottom">
        <strong>{formatPrice(product.price)}</strong>
        <Button variant="secondary" disabled={product.stock === 0} onClick={() => onAdd(product)}>
          {product.stock === 0 ? 'No on stock' : 'Add to cart'}
        </Button>
      </div>
    </div>
  </article>;
}
