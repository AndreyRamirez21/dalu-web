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
    intro:
      'Queremos que tu pedido llegue a ti de forma segura y en el menor tiempo posible. Aquí encontrarás toda la información sobre nuestros envíos.',
    sections: [
      {
        heading: 'Cobertura',
        body:
          'Realizamos envíos a toda Colombia por la transportadora de preferencia disponible para el pedido. También contamos con servicio de entrega dentro de la ciudad de Buga.',
      },
      {
        heading: 'Costo de envío',
        body:
          'El costo del envío se calcula y confirma por WhatsApp. Dentro de Buga depende del sector de destino; fuera de Buga se calcula de acuerdo con la ciudad de destino y el peso del pedido.',
      },
      {
        heading: 'Tiempo de entrega',
        body:
          'Dentro de Buga: las entregas se realizan el mismo día o máximo en 24 horas hábiles, dependiendo del horario en que se confirme la compra. Ciudades principales: entrega estimada de 2 a 4 días hábiles. Otras ciudades o zonas rurales: entrega estimada de 4 a 8 días hábiles.',
      },
      {
        heading: 'Seguimiento',
        body:
          'Una vez realizado el despacho, se enviará el número de guía o la confirmación correspondiente por WhatsApp para que puedas realizar el seguimiento de tu pedido.',
      },
      {
        heading: 'Datos de envío',
        body:
          'Los datos de envío se proporcionan durante la conversación de WhatsApp. Antes del despacho, el cliente deberá verificar y confirmar que los datos proporcionados sean correctos, incluyendo nombre, teléfono, dirección, ciudad y demás información necesaria para la entrega.',
      },
      {
        heading: 'Retrasos',
        body:
          'Dalú no se hace responsable por retrasos atribuibles a la empresa transportadora o a la mensajería local. Tampoco será responsable por inconvenientes derivados de datos de envío incorrectos proporcionados por el cliente.',
      },
    ],
  },

  cambios: {
    title: 'Cambios y devoluciones',
    intro:
      'Queremos que ames tu prenda Dalú. Si necesitas realizar un cambio, aquí encontrarás las condiciones y el proceso para solicitarlo.',
    sections: [
      {
        heading: 'Plazo para cambios',
        body:
          'Se aceptan cambios dentro de los 3 días calendario posteriores a la compra. Los cambios aplican únicamente por tallaje y no aplican para prendas íntimas.',
      },
      {
        heading: 'Condiciones del producto',
        body:
          'Para solicitar un cambio, la prenda debe estar sin uso, sin lavar, en perfecto estado, con sus etiquetas y en su empaque original.',
      },
      {
        heading: 'Condiciones para realizar el cambio',
        body:
          'Si la prenda no cumple con las condiciones anteriores, no será posible realizar el cambio.',
      },
      {
        heading: 'Devoluciones',
        body:
          'No realizamos devoluciones de dinero. El cliente podrá cambiar el producto por otro de igual valor o por uno de mayor valor.',
      },
      {
        heading: 'Diferencia de valor',
        body:
          'Si el nuevo producto tiene un valor superior al producto original, el cliente deberá asumir la diferencia correspondiente.',
      },
    ],
  },

    terminos: {
      title: 'Términos y condiciones',
      intro:
        'Al utilizar la página web de Dalú y realizar una compra a través de nuestros canales, el cliente acepta los siguientes términos y condiciones.',
      sections: [
        {
          heading: 'Aceptación de los términos',
          body:
            'El uso de este sitio web y la realización de pedidos implica la aceptación total de estos términos y condiciones. Si no estás de acuerdo con ellos, te pedimos abstenerte de realizar pedidos a través de nuestros canales.',
        },
        {
          heading: 'Naturaleza del servicio',
          body:
            'La página web de Dalú funciona como catálogo de productos. La compra no se procesa ni se paga dentro del sitio web: una vez seleccionados los productos en el carrito, el pedido se confirma, coordina y paga directamente por WhatsApp. El detalle completo del proceso está disponible en nuestra página de Proceso de compra.',
        },
        {
          heading: 'Disponibilidad de productos',
          body:
            'Los productos están sujetos a disponibilidad de inventario. Agregar un producto al carrito o a favoritos no constituye una reserva ni garantiza su disponibilidad futura; la disponibilidad final se confirma por WhatsApp.',
        },
        {
          heading: 'Precios',
          body:
            'Los precios publicados en la página están expresados en pesos colombianos (COP) y no incluyen el valor del envío, el cual se calcula y confirma por WhatsApp. Los precios pueden cambiar en cualquier momento, sin afectar las compras que ya hayan sido confirmadas.',
        },
        {
          heading: 'Errores en precios o información',
          body:
            'En caso de que se presente un error en el precio publicado o en la información de un producto, Dalú informará al cliente sobre el valor o la información correcta antes de continuar con el pedido. Si el cliente decide continuar con la compra, deberá asumir el valor corregido, ya sea que este sea mayor o menor al valor publicado inicialmente.',
        },
        {
          heading: 'Cuándo se considera realizada una compra',
          body:
            'La compra se considera realizada una vez que Dalú confirma el pedido por WhatsApp y se recibe el pago o abono correspondiente, según la modalidad de compra acordada.',
        },
        {
          heading: 'Reservas, cambios, envíos y datos personales',
          body:
            'Las condiciones específicas sobre apartar un pedido y plazos de pago, cambios y devoluciones, políticas de envío, y tratamiento de datos personales están detalladas en sus respectivas páginas dentro de la sección Legal e Información de este sitio, y forman parte integral de estos términos y condiciones.',
        },
        {
          heading: 'Propiedad intelectual',
          body:
            'El nombre, logotipo, fotografías, diseños y demás contenido publicado por Dalú están protegidos por las normas de propiedad intelectual aplicables. Más detalles en nuestra página de Propiedad intelectual.',
        },
        {
          heading: 'Limitación de responsabilidad',
          body:
            'Dalú no se hace responsable por retrasos atribuibles a la transportadora, por inconvenientes derivados de datos de envío incorrectos proporcionados por el cliente, ni por el uso indebido de la información publicada en el sitio.',
        },
        {
          heading: 'Ley aplicable',
          body:
            'Estos términos y condiciones se rigen por las leyes de la República de Colombia. Cualquier controversia derivada de su interpretación o aplicación se resolverá conforme a la normativa colombiana vigente.',
        },
      ],
    },

  tallas: {
    title: 'Guía de tallas',
    intro:
      'Encuentra tu talla ideal para que tu prenda Dalú te quede cómoda y perfecta.',
    sections: [],
    images: [
      '/images/tallas/GuiaTallas1.png',
      '/images/tallas/GuiaTallas2.png',
    ],
  },

  pagos: {
    title: 'Métodos de pago',
    intro:
      'Estas son las formas en las que puedes pagar tu pedido en Dalú.',
    sections: [
      {
        heading: 'Transferencia bancaria',
        body:
          'Puedes realizar tu pago mediante transferencia bancaria y enviar el comprobante por WhatsApp para confirmar tu pedido.',
      },
      {
        heading: 'Nequi y Daviplata',
        body:
          'Aceptamos pagos mediante Nequi y Daviplata para facilitar el proceso de compra.',
      },
      {
        heading: 'Pago de pedidos apartados',
        body:
          'Para apartar una prenda se requiere un abono equivalente al 50% del valor total del pedido. El saldo restante deberá completarse dentro del plazo establecido de 3 semanas.',
      },
    ],
  },

  faq: {
    title: 'Preguntas frecuentes',
    intro:
      'Resolvemos las dudas más comunes sobre tus compras en Dalú.',
    sections: [
      {
        heading: '¿Cuánto tarda el envío?',
        body:
          'Dentro de Buga, las entregas se realizan el mismo día o máximo en 24 horas hábiles. En ciudades principales tardan de 2 a 4 días hábiles y, en otras ciudades o zonas rurales, de 4 a 8 días hábiles.',
      },
      {
        heading: '¿Puedo cambiar una prenda?',
        body:
          'Sí. Los cambios se aceptan dentro de los 3 días calendario posteriores a la compra y aplican únicamente por tallaje. No aplican para prendas íntimas.',
      },
      {
        heading: '¿Qué condiciones debe cumplir la prenda?',
        body:
          'La prenda debe estar sin uso, sin lavar, en perfecto estado, con sus etiquetas y en su empaque original.',
      },
      {
        heading: '¿Realizan devoluciones de dinero?',
        body:
          'No realizamos devoluciones de dinero. El cliente podrá solicitar un cambio por otro producto de igual valor o asumir la diferencia si el nuevo producto tiene un valor superior.',
      },
      {
        heading: '¿Puedo apartar una prenda?',
        body:
          'Sí. Puedes apartar una prenda realizando un abono del 50% de su valor total. El saldo restante deberá completarse dentro de un plazo máximo de 3 semanas.',
      },
      {
        heading: '¿Qué pasa si no completo el pago del apartado?',
        body:
          'Si no se completa el pago dentro de las 3 semanas, la prenda volverá a estar disponible y el abono realizado no será reembolsado.',
      },
      {
        heading: '¿Qué métodos de pago aceptan?',
        body:
          'Aceptamos transferencia bancaria, Nequi y Daviplata. Para consultar otros medios de pago, puedes escribirnos por WhatsApp.',
      },
      {
        heading: '¿Cómo sé qué talla elegir?',
        body:
          'Puedes consultar nuestra guía de tallas. Si tienes dudas, también puedes escribirnos por WhatsApp y te ayudaremos a elegir.',
      },
    ],
  },

    datos: {
      title: 'Protección de datos personales',
      intro:
        'En Dalú respetamos la privacidad de nuestros clientes y protegemos la información personal que nos proporcionan.',
      sections: [
        {
          heading: 'Información que recopilamos',
          body:
            'La página web de Dalú no cuenta con formularios que recopilen datos personales de los visitantes. La información personal necesaria para gestionar un pedido —como nombre, número de teléfono, dirección de entrega, ciudad y datos para coordinar el pago— es proporcionada voluntariamente por el cliente directamente en la conversación de WhatsApp al finalizar su pedido.',
        },
        {
          heading: 'Para qué utilizamos la información',
          body:
            'La información compartida por WhatsApp se utiliza únicamente para gestionar la compra, coordinar el pedido, realizar la entrega, comunicarnos con el cliente sobre su pedido y brindar servicio de atención al cliente.',
        },
        {
          heading: 'Tratamiento de los datos',
          body:
            'Dalú tratará los datos personales compartidos por el cliente de acuerdo con la normativa colombiana aplicable sobre protección de datos personales y únicamente para las finalidades informadas y autorizadas.',
        },
        {
          heading: 'Derechos del titular',
          body:
            'El titular de los datos puede conocer, actualizar y rectificar su información; solicitar información sobre el uso que se ha dado a sus datos; solicitar prueba de la autorización cuando corresponda; y, en los casos previstos por la ley, solicitar la supresión de sus datos o revocar la autorización otorgada.',
        },
        {
          heading: 'Consultas y reclamos',
          body:
            'Para realizar consultas, solicitar actualización o corrección de datos, presentar reclamos relacionados con el tratamiento de información personal o ejercer los derechos correspondientes, el titular podrá comunicarse con Dalú a través de nuestros canales de atención, incluyendo WhatsApp.',
        },
        {
          heading: 'Autoridad de protección de datos',
          body:
            'El titular también podrá presentar las quejas que correspondan ante la Superintendencia de Industria y Comercio, de acuerdo con la legislación colombiana aplicable.',
        },
      ],
    },

  propiedad: {
    title: 'Propiedad intelectual',
    intro:
      'Todo el contenido publicado por Dalú forma parte de la identidad de nuestra marca y se encuentra protegido por las normas aplicables sobre propiedad intelectual.',
    sections: [
      {
        heading: 'Logo y elementos de marca',
        body:
          'El nombre, logotipo, elementos gráficos, identidad visual y demás elementos distintivos de Dalú no podrán utilizarse, copiarse o modificarse sin autorización previa.',
      },
      {
        heading: 'Fotografías',
        body:
          'Las fotografías utilizadas en la página web, redes sociales y demás canales oficiales de Dalú son utilizadas con autorización o bajo los derechos correspondientes. No está permitida su reproducción o utilización comercial sin autorización.',
      },
      {
        heading: 'Diseños',
        body:
          'Los diseños, composiciones gráficas y demás elementos creativos desarrollados para Dalú pertenecen a sus respectivos titulares y están protegidos por las normas aplicables.',
      },
      {
        heading: 'Textos',
        body:
          'Los textos, descripciones, contenidos y materiales escritos publicados en los canales oficiales de Dalú no podrán reproducirse total o parcialmente con fines comerciales sin autorización.',
      },
      {
        heading: 'Contenido de redes sociales y página web',
        body:
          'El contenido publicado en la página web y redes sociales oficiales de Dalú no podrá copiarse, modificarse, distribuirse o utilizarse comercialmente sin autorización previa.',
      },
    ],
  },

  garantia: {
    title: 'Garantía',
    intro:
      'Antes del despacho, puedes solicitar material visual del producto para verificar su estado y características.',
    sections: [
      {
        heading: 'Verificación antes del envío',
        body:
          'El cliente deberá solicitar antes del despacho fotografías o videos de las prendas y productos incluidos en su pedido, con el fin de verificar visualmente su estado y características. Dalú no se hace responsable después de recibir el pedido.',
      },

    ],
  },

  'proceso-compra': {
    title: 'Proceso de compra',
    intro:
      'Comprar en Dalú es fácil. Selecciona tus productos, arma tu pedido en el carrito y continúa por WhatsApp para confirmar el envío y el pago.',
    sections: [
      {
        heading: 'Cómo seleccionar productos',
        body:
          'Explora nuestras categorías y selecciona el producto que deseas. En la página de cada producto podrás consultar su información, disponibilidad, tallas, colores y precio. Elige la talla y la cantidad, y agrégalo al carrito con el botón "Comprar".',
      },
      {
        heading: 'Carrito y favoritos',
        body:
          'Desde el carrito podrás revisar los productos agregados, sus cantidades y el subtotal de tu pedido. El valor del envío se calcula y confirma por WhatsApp. También puedes utilizar la sección de favoritos para guardar productos que quieras consultar o comprar posteriormente. Agregar un producto a favoritos o al carrito no garantiza su reserva ni disponibilidad futura.',
      },
      {
        heading: 'Continúa por WhatsApp',
        body:
          'La compra no se procesa dentro de la página web. Al presionar "Continuar por WhatsApp" en el carrito, se abrirá una conversación con el resumen de tu pedido para que podamos atenderte y coordinar los detalles restantes.',
      },
      {
        heading: 'Datos de envío',
        body:
          'Durante la conversación por WhatsApp deberás proporcionarnos los datos necesarios para realizar la entrega, incluyendo nombre, número de contacto, dirección y ciudad. Es tu responsabilidad verificar que esta información sea correcta antes del despacho.',
      },
      {
        heading: 'Confirmación del pedido',
        body:
          'Por WhatsApp verificaremos la disponibilidad de los productos y confirmaremos contigo el pedido, el valor final del envío y el método de pago.',
      },
      {
        heading: 'Cuándo se considera realizada una compra',
        body:
          'La compra se considera realizada cuando Dalú confirma el pedido por WhatsApp y recibe el pago o abono correspondiente, según la modalidad acordada.',
      },
      {
        heading: 'Errores en precios o información',
        body:
          'En caso de que se presente un error en el precio publicado o en la información de un producto, Dalú te informará el valor o la información correcta antes de continuar con el pedido. Si decides continuar con la compra, deberás asumir el valor corregido, ya sea mayor o menor al publicado inicialmente.',
      },
      {
        heading: 'Aparta tu pedido',
        body:
          'Puedes reservar una prenda realizando un abono equivalente al 50% del valor total del pedido. El pedido será entregado una vez se complete el 100% del pago.',
      },
      {
        heading: 'Plazo de pago',
        body:
          'Tienes hasta 3 semanas para completar el valor restante de tu pedido.',
      },
      {
        heading: 'Si no completas el pago',
        body:
          'Si después de las 3 semanas no se realiza el pago total, la prenda volverá a estar disponible para la venta y el abono realizado no será reembolsado debido al tiempo durante el cual la prenda permaneció reservada.',
      },
      {
        heading: 'Promociones y descuentos',
        body:
          'Las promociones y descuentos no son acumulables con otras ofertas, salvo que Dalú indique expresamente lo contrario.',
      },
    ],
  },

  modificacion: {
    title: 'Modificación de los términos',
    intro:
      'Dalú podrá actualizar estos términos y condiciones cuando sea necesario.',
    sections: [
      {
        heading: 'Actualización',
        body:
          'Dalú podrá modificar o actualizar estos términos y condiciones cuando sea necesario para reflejar cambios en nuestros procesos, productos, servicios o en la normativa aplicable.',
      },
      {
        heading: 'Revisión antes de comprar',
        body:
          'El cliente deberá revisar los términos y condiciones vigentes al momento de realizar cada compra.',
      },
      {
        heading: 'Consulta por WhatsApp',
        body:
          'Si deseas consultar los términos y condiciones vigentes, también puedes solicitarlos directamente a Dalú a través de WhatsApp.',
      },
    ],
  },
}