import type { Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import products from './products.json' with { type: 'json' };

function respond(res: ServerResponse, status: number, data: unknown) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

// A small local HTTP API, shared by Vite dev and preview. No external services.
export function shopApi(): Plugin {
  const middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const path = req.url?.split('?')[0];
    if (path === '/api/products' && req.method === 'GET') {
      respond(res, 200, products);
      return;
    }
    if (path === '/api/orders' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const order = JSON.parse(body);
          if (!order.customer?.name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.customer.email)
            || order.customer.address?.trim().length < 10 || !Array.isArray(order.items)
            || order.items.length === 0 || order.items.some((item: { id: string; quantity: number }) => {
              const product = products.find((p) => p.id === item.id);
              return !product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > product.stock;
            })) {
            respond(res, 400, { message: 'Проверьте данные заказа' });
            return;
          }
          respond(res, 201, { id: `DS-${Date.now().toString().slice(-6)}` });
        } catch {
          respond(res, 400, { message: 'Некорректный запрос' });
        }
      });
      return;
    }
    next();
  };
  return {
    name: 'deskshop-local-api',
    configureServer(server) { server.middlewares.use(middleware); },
    configurePreviewServer(server) { server.middlewares.use(middleware); },
  };
}
