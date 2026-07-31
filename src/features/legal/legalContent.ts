export interface LegalSection {
  heading: string
  body: string
}

export interface LegalPageContent {
  title: string
  intro: string
  sections: LegalSection[]
  images?: string[]

}

export const legalContentBySlug: Record<string, LegalPageContent> = {
  envios: {
    title: 'Políticas de envío',
    intro: 'Todo lo que debes saber sobre cómo despachamos tus pedidos en Dalú.',
    sections: [
      {
        heading: 'Cobertura',
        body: 'Realizamos envíos a todo Colombia. (tRANSPORTADORA DE PREFERENCIA). Contamos con servicio de envío dentro de la ciudad (BUGA) .',
      },
      {
        heading: 'Tiempos de entrega',
        body: 'Dentro de la ciudad: Entregas en el mismo día o máximo 24 horas hábiles (dependiendo del horario de compra). Ciudades principales: 2 a 4 días hábiles. Otras ciudades o zonas rurales: 4 a 8 días hábiles',
      },
      {
        heading: 'Costo de envío',
        body: 'Dentro de la ciudad: Tarifa según el sector. Fuera de la ciudad: Se calcula según la ciudad de destino y peso del pedido.',
      },
      {
        heading: 'Seguimiento',
        body: 'Se enviará número de guía o confirmación por mensaje para rastreo del paquete.',
      },
        {
          heading: 'Retrasos',
          body: 'Dalú no se hace responsable por retrasos atribuibles a la transportadora o mensajería local.',
        },
    ],
  },
  cambios: {
    title: 'Cambios y devoluciones',
    intro: 'Queremos que ames tu pijama Dalú. Si algo no es como esperabas, aquí te explicamos cómo proceder.',
    sections: [
      {
        heading: 'Plazo',
        body: 'Se aceptan cambios dentro de los 3 días calendario posteriores a la compra.(APLICA SOLO EN TALLAJE)',
      },
      {
        heading: 'Condiciones',
        body: 'El producto debe estar sin uso, EN PERFECTO ESTADO, con etiquetas y en su empaque, EN CASO TAL DE NO CUMPLIR NO SE REALIZARA EL CAMBIO.',
      },
      {
        heading: 'Cómo solicitarlo',
        body: 'Escríbenos por WhatsApp indicando tu número de pedido y el motivo del cambio o devolución. Te guiaremos en todo el proceso.',
      },
      {
        heading: 'Reembolsos',
        body: 'No se realizan devoluciones de dinero, El cliente podrá cambiar el producto por otro de igual valor o por diferentes productos que, en conjunto, sumen el valor del producto original. Si el nuevo producto tiene un valor mayor, el cliente deberá asumir la diferencia.',
      },
    ],
  },
  terminos: {
    title: 'Términos y condiciones',
    intro: 'Al comprar en Dalú, aceptas los siguientes términos y condiciones de uso.',
    sections: [
      {
        heading: 'Uso del sitio',
        body: 'Este sitio web es propiedad de Dalú. La información aquí publicada es referencial y puede actualizarse sin previo aviso.',
      },
      {
        heading: 'Disponibilidad de productos',
        body: 'Los productos están sujetos a disponibilidad de inventario. Nos reservamos el derecho de limitar la cantidad de unidades por compra.',
      },
      {
        heading: 'Precios',
        body: 'Todos los precios publicados están expresados en pesos colombianos (COP) e incluyen los impuestos aplicables, salvo que se indique lo contrario.',
      },
      {
        heading: 'Propiedad intelectual',
        body: 'Todo el contenido de este sitio (imágenes, textos, diseños) es propiedad de Dalú y no puede reproducirse sin autorización.',
      },
    ],
  },
tallas: {
  title: 'Guía de tallas',
  intro: 'Encuentra tu talla ideal para que tu pijama Dalú te quede perfecta.',
  sections: [],
  images: ['/images/tallas/Guia-tallas-1.png', '/images/tallas/Guia-tallas-2.png'],
},
  pagos: {
    title: 'Métodos de pago',
    intro: 'Estas son las formas en las que puedes pagar tu pedido en Dalú.',
    sections: [
      {
        heading: 'Transferencia bancaria',
        body: 'Realiza tu pago por transferencia a nuestra cuenta y envíanos el comprobante por WhatsApp.',
      },
      {
        heading: 'Nequi y Daviplata',
        body: 'Aceptamos pagos a través de Nequi y Daviplata para mayor comodidad y rapidez.',
      },
      {
        heading: 'Tarjetas de crédito y débito',
        body: 'Próximamente podrás pagar directamente en línea con tarjeta. Por ahora, coordinamos el pago por WhatsApp.',
      },
    ],
  },
  faq: {
    title: 'Preguntas frecuentes',
    intro: 'Resolvemos las dudas más comunes de nuestras clientas.',
    sections: [
      {
        heading: '¿Cuánto tarda el envío?',
        body: 'Los envíos a todo Colombia tardan entre 3 y 5 días hábiles después de confirmado el pago.',
      },
      {
        heading: '¿Puedo cambiar o devolver un producto?',
        body: 'Sí, aceptamos cambios y devoluciones dentro de los primeros 4 días de compra, siempre que el producto esté sin uso y con sus etiquetas originales.',
      },
      {
        heading: '¿Qué métodos de pago aceptan?',
        body: 'Aceptamos transferencia bancaria, Nequi, Daviplata y próximamente tarjetas de crédito o débito.',
      },
      {
        heading: '¿Cómo sé qué talla elegir?',
        body: 'Revisa nuestra guía de tallas o escríbenos por WhatsApp y te ayudamos a elegir.',
      },
    ],
  },
}