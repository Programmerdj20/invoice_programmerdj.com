export interface StatusMetric {
  label: string;
  value: string;
  status: "ok" | "warn" | "error";
}

export interface CopySection {
  title: string;
  description: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  title: string;
  tagline: string;
  metaDescription: string;

  price: number;
  currency: "COP";
  billingPeriod: "mensual";
  hotmartUrl: string;
  /** URL de pago simple de Hotmart (sin checkoutMode), pensada para cargar dentro de un <iframe> propio. */
  checkoutEmbedUrl: string;
  /** Oferta de Hotmart por plan, elegida con ?plan=<id>. Si el id no existe se usa checkoutEmbedUrl. */
  planEmbedUrls: Record<string, string>;

  heroBadge: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubcopy: string;

  statusMonitor: {
    siteLabel: string;
    metrics: StatusMetric[];
  };

  problems: CopySection[];
  features: CopySection[];
  includes: string[];
  howItWorks: HowItWorksStep[];
  faqs: Faq[];

  seller: {
    name: string;
    role: string;
    /** Formato internacional, solo dígitos (sin "+" ni espacios), ej. "573001234567". */
    whatsappPhone: string;
    contactUrl: string;
    contactLabel: string;
  };
}

export function buildWhatsappUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const products: Product[] = [
  {
    slug: "soporte-wordpress",
    title: "Soporte Xuper para tu app siempre Online: Estabilidad y Seguridad",
    tagline: "Mantenimiento y seguridad para WordPress",
    metaDescription:
      "Soporte técnico mensual para tu sitio en WordPress: actualizaciones, backups diarios, monitoreo de seguridad 24/7 y respuesta rápida ante caídas. Desde $34.132 COP/mes.",

    price: 34132,
    currency: "COP",
    billingPeriod: "mensual",
    hotmartUrl: "https://pay.hotmart.com/R106662873M?checkoutMode=2",
    checkoutEmbedUrl: "https://pay.hotmart.com/R106662873M",
    planEmbedUrls: {
      "1-mes": "https://pay.hotmart.com/R106662873M",
      "3-meses": "https://pay.hotmart.com/R106662873M?off=97omi388",
      "6-meses": "https://pay.hotmart.com/R106662873M?off=6c5cr2hg",
      "12-meses": "https://pay.hotmart.com/R106662873M?off=nszpwqgz",
      "black-friday-12-meses": "https://pay.hotmart.com/R106662873M?off=j772xo48",
    },

    heroBadge: "Monitoreo activo 24/7",
    heroHeadline: "Tu WordPress, cuidado como si fuera nuestro.",
    heroHighlight: "cuidado como si fuera nuestro",
    heroSubcopy:
      "Actualizaciones, backups y seguridad gestionados por un desarrollador fullstack, no por un ticket que nadie responde. Tú sigues vendiendo, publicando o atendiendo clientes — de que el sitio siga en pie, nos encargamos nosotros.",

    statusMonitor: {
      siteLabel: "tusitio.com",
      metrics: [
        { label: "Uptime (30 días)", value: "99.98%", status: "ok" },
        { label: "Certificado SSL", value: "Válido", status: "ok" },
        { label: "Último backup", value: "Hace 6 horas", status: "ok" },
        { label: "Escaneo de malware", value: "Sin amenazas", status: "ok" },
        { label: "Tiempo de respuesta", value: "184 ms", status: "ok" },
        { label: "Núcleo y plugins", value: "Actualizados", status: "ok" },
      ],
    },

    problems: [
      {
        title: "El sitio se cae y te enteras por un cliente",
        description:
          "Sin monitoreo activo, una caída puede durar horas antes de que alguien la note — normalmente cuando ya perdiste ventas o visitas.",
      },
      {
        title: "Un plugin desactualizado abre la puerta",
        description:
          "La mayoría de los sitios de WordPress hackeados no caen por un ataque sofisticado, sino por un plugin o el núcleo sin actualizar durante meses.",
      },
      {
        title: "No hay backup el día que algo se rompe",
        description:
          "Una actualización mal hecha, un hosting que falla o un error humano, y sin respaldo reciente el sitio se pierde o toca reconstruirlo desde cero.",
      },
      {
        title: "Cada arreglo depende de encontrar a alguien",
        description:
          "Sin un soporte fijo, cada problema significa buscar de nuevo a un freelancer, explicar todo otra vez y esperar sin saber cuánto va a tardar.",
      },
    ],

    features: [
      {
        title: "Actualizaciones controladas",
        description:
          "Núcleo de WordPress, tema y plugins actualizados de forma programada, probando antes de aplicar en producción para no romper nada.",
      },
      {
        title: "Backups diarios automáticos",
        description:
          "Respaldo completo del sitio y la base de datos todos los días, almacenado fuera del hosting, listo para restaurar en minutos si hace falta.",
      },
      {
        title: "Monitoreo de uptime 24/7",
        description:
          "Verificación continua de que tu sitio está en línea, con alerta inmediata apenas se detecta una caída — no cuando un visitante la reporta.",
      },
      {
        title: "Escaneo y limpieza de seguridad",
        description:
          "Revisión periódica en busca de malware, accesos sospechosos o archivos inyectados, con limpieza incluida si algo se detecta.",
      },
      {
        title: "Optimización de rendimiento",
        description:
          "Ajustes de caché, imágenes y consultas a la base de datos para que el sitio cargue rápido, sin depender de plugins genéricos mal configurados.",
      },
      {
        title: "Soporte técnico directo",
        description:
          "Un canal directo con quien realmente administra tu sitio, con tiempo de respuesta acordado — no un formulario que nadie contesta.",
      },
    ],

    includes: [
      "Actualizaciones de núcleo, tema y plugins",
      "Backup diario con retención de 30 días",
      "Monitoreo de uptime y SSL 24/7",
      "Escaneo de seguridad y malware semanal",
      "Optimización de velocidad y caché",
      "Soporte técnico por WhatsApp o correo",
    ],

    howItWorks: [
      {
        step: 1,
        title: "Confirmas tu suscripción",
        description:
          "Completas el pago mensual de forma segura a través de Hotmart, con tarjeta o PayPal.",
      },
      {
        step: 2,
        title: "Te contactamos en menos de 24 horas",
        description:
          "Te escribimos para pedir el acceso a tu sitio (WordPress y hosting) y coordinar el primer contacto directo.",
      },
      {
        step: 3,
        title: "Hacemos una auditoría inicial",
        description:
          "Revisamos versión de WordPress, plugins, backups existentes y vulnerabilidades antes de tocar nada, para partir de un diagnóstico real.",
      },
      {
        step: 4,
        title: "Empieza el mantenimiento continuo",
        description:
          "A partir de ahí, tu sitio queda bajo monitoreo, backup y actualización constante — con reportes y soporte directo cada mes.",
      },
    ],

    faqs: [
      {
        question: "¿Necesito darles acceso a mi hosting?",
        answer:
          "Sí, se requiere acceso a WordPress (usuario administrador) y al panel de hosting o servidor para poder ejecutar backups, actualizaciones y revisiones de seguridad directamente, sin depender de intermediarios.",
      },
      {
        question: "¿Qué pasa si mi sitio ya está hackeado o caído ahora mismo?",
        answer:
          "Puedes suscribirte igual: la auditoría inicial detecta el problema y la limpieza de seguridad está incluida dentro del servicio. Si es una emergencia urgente, indícalo al primer contacto para priorizarla.",
      },
      {
        question: "¿Puedo cancelar cuando quiera?",
        answer:
          "Sí, es una suscripción mensual sin permanencia mínima. La puedes cancelar directamente desde tu cuenta de Hotmart cuando lo necesites.",
      },
      {
        question: "¿Sirve para cualquier tipo de sitio en WordPress?",
        answer:
          "Sí — blogs, sitios corporativos, landing pages o tiendas con WooCommerce. Si tu sitio corre sobre WordPress, el mantenimiento aplica igual.",
      },
    ],

    seller: {
      name: "Andres Coock",
      role: "Fullstack Developer",
      whatsappPhone: "573014034646",
      contactUrl: buildWhatsappUrl(
        "573014034646",
        "Hola, quiero información sobre el soporte técnico de WordPress."
      ),
      contactLabel: "Escribir por WhatsApp",
    },
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

export const featuredProduct = products[0];
