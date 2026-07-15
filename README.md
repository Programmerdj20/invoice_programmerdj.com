# invoice_programmerdj.com — Andres Coock

Página de checkout/factura para el producto "Soporte Técnico WordPress" (suscripción mensual vía Hotmart). Construida con **Astro 5** + **Tailwind CSS v4**.

## Rutas

- **`/`** — la página de checkout: resumen del pedido (sin precio fijo, porque el producto se vende en cualquier país y Hotmart ajusta moneda/precio automáticamente) + el formulario de pago real de Hotmart embebido en un `<iframe>` propio, enmarcado con nuestro diseño en vez del modal de marca de Hotmart.
- **`/producto`** — la landing de marketing completa (hero, problemas, qué incluye, cómo funciona, precio de referencia, FAQ). Sus botones "Contratar" llevan a `/` para pagar.
- **`/gracias`** — página post-compra: confirma el pago y pide el comprobante por WhatsApp. Se configura como redirección en el panel de Hotmart (ver abajo). Si se carga dentro del iframe de `/`, un script la "escapa" automáticamente para ocupar toda la pestaña (`window.top`).

## Configurar la redirección post-compra en Hotmart

Para que, al terminar de pagar dentro del iframe de `/`, el comprador llegue a `/gracias` y te escriba por WhatsApp:

1. Entra a [app.hotmart.com](https://app.hotmart.com) → **Productos** → selecciona el producto → **Herramientas** → **Configuraciones de pago** → pestaña **Posventa**.
2. En **¿Dónde será?** selecciona **Externa**.
3. En la URL para **Compra aprobada**, pega: `https://invoice.programmerdj.com/gracias` — **con `/gracias` al final**. Si solo pones el dominio (`https://invoice.programmerdj.com/`), el comprador vuelve a caer en la página de checkout en vez de ver la pantalla de "envía tu comprobante".
4. Guarda los cambios.

Esto es una configuración del panel de Hotmart, no algo que viva en este código — si cambias el dominio de producción, hay que actualizar esta URL ahí también.

## Cómo correrlo

Requiere Node.js 18.20+ / 20.3+ / 22+ y `pnpm` (nunca `npm` en este proyecto).

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

Antes de publicar:

```bash
pnpm astro check   # valida tipos/props
pnpm build         # build de producción en dist/
pnpm preview        # sirve el build de producción localmente
```

## Verificar el checkout embebido

El `<iframe>` de `/` carga `https://pay.hotmart.com/R106662873M` directamente (sin `checkoutMode`). Esto funciona porque esa URL no envía cabeceras `X-Frame-Options` ni `Content-Security-Policy: frame-ancestors` que lo bloqueen — verificado con `curl -I`. Lo que **no** se puede verificar sin abrirlo en un navegador real es si Hotmart bloquea el framing por JavaScript. Al correr `pnpm dev`:

1. Abre `/` y confirma que el formulario de pago carga dentro de la tarjeta (no en blanco, no rebota a otra pestaña sola).
2. Revisa la consola del navegador — si ves un error tipo "Refused to display... in a frame", el iframe está siendo bloqueado y hay que usar otro mecanismo (el widget oficial de Hotmart, más limitado visualmente, o una redirección simple).
3. Si el iframe falla, el link "Ábrelo en una pestaña nueva" debajo sigue funcionando como respaldo — el checkout nunca queda inaccesible.

## Editar el producto

Todo el copy, precio y links de Hotmart viven en un único archivo: `src/data/products.ts`.

- `checkoutEmbedUrl` — URL usada en el `<iframe>` de `/` (sin `checkoutMode`).
- `hotmartUrl` — URL con `?checkoutMode=2`, usada solo como referencia/JSON-LD.
- `includes` — lista que se muestra en el resumen del pedido de `/`.
- `price` — se conserva para el JSON-LD y el precio de referencia mostrado en `/producto`; **no se muestra** en `/` (checkout) a propósito.
- `seller.whatsappPhone` — número en formato internacional sin `+` (ej. `573014034646`), usado por `buildWhatsappUrl()` para armar tanto el link de contacto general (Footer) como el mensaje de "te comparto el comprobante" en `/gracias`.

## Antes de desplegar a producción

- ~~Reemplazar el dominio placeholder en `astro.config.mjs`~~ — hecho, `site` ya apunta a `https://invoice.programmerdj.com`.
- Configurar la redirección post-compra en el panel de Hotmart apuntando a `/gracias` (ver sección arriba, ojo con no dejarla en la home) — sin esto, `/gracias` existe pero nadie llega a ella automáticamente.

## Añadir más productos (hasta 4)

Cuando haya más de un producto: agregar el registro en `products.ts`, duplicar el patrón `/producto` + checkout (`/`) por producto (por slug), y convertir `/producto` en un catálogo que enlace a cada ficha. Los componentes ya reciben el producto completo por props, así que es principalmente un cambio de datos y rutas, no una reescritura.
