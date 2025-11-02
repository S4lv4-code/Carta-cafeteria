// generate-pdf.cjs
// Autor: Salvatore De Rosa Vega
// Descripción: Script Node.js que genera un documento técnico en formato PDF explicando el funcionamiento completo del proyecto “Carta-Cafetería” desarrollado con React y Vite.

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// ======== CREACIÓN DEL DOCUMENTO PDF ========
const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream('Carta-Cafeteria.pdf'));

// ======== ENCABEZADO APA ========
doc.fontSize(18).text('Carta de Productos - Proyecto React', { align: 'center', underline: true });
doc.moveDown(0.5);
doc.fontSize(14).text('Autor: Salvatore De Rosa Vega', { align: 'center' });
doc.fontSize(12).text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'center' });
doc.moveDown(2);

// ======== INTRODUCCIÓN ========
doc.fontSize(16).text('1. Introducción', { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).text(
  'El presente documento tiene como objetivo describir el funcionamiento interno del proyecto "Carta-Cafetería", ' +
  'desarrollado en React con Vite. Se implementa una arquitectura basada en componentes, que manejan datos ' +
  'a través de props y estados locales, siguiendo principios de modularidad y reutilización. ' +
  'Además, se utiliza Node.js junto con la librería PDFKit para generar automáticamente este archivo de documentación técnica.'
);
doc.moveDown(1.5);

// ======== EXPLICACIÓN GENERAL DEL SCRIPT ========
doc.fontSize(16).text('2. Estructura del Script generate-pdf.cjs', { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).text(
  'El archivo generate-pdf.cjs crea un PDF estructurado con márgenes profesionales y formato de texto uniforme. ' +
  'Se importan los módulos fs, path y pdfkit. Se crea un flujo de salida hacia un archivo físico llamado Carta-Cafeteria.pdf. ' +
  'Cada sección documenta un componente de React y muestra su código fuente directamente dentro del documento.'
);
doc.moveDown(1.5);

// ======== FUNCIÓN AUXILIAR addComponent ========
doc.fontSize(16).text('3. Función addComponent()', { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).text(
  'La función addComponent(title, filePath, explanation) automatiza la inserción de secciones correspondientes a cada componente. ' +
  'Lee el código fuente desde el sistema de archivos, lo inserta con formato monoespaciado (Courier) y añade una descripción técnica. ' +
  'En caso de error (archivo inexistente o inaccesible), muestra un comentario de error dentro del PDF.'
);
doc.moveDown(1.5);

// ======== DEFINICIÓN DE RUTAS ========
doc.fontSize(16).text('4. Definición de rutas base', { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).text(
  'Las rutas se construyen mediante path.join para garantizar compatibilidad en distintos sistemas operativos. ' +
  'Se define una ruta base dentro de la carpeta src/App y se crean subrutas hacia Conteiner, Category y Product, ' +
  'donde residen los archivos JSX que conforman la carta digital.'
);
doc.moveDown(1.5);

// ======== FUNCIÓN addComponent ========
function addComponent(title, filePath, explanation) {
  doc.fontSize(16).text(title, { underline: true });
  doc.moveDown(0.5);

  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    doc.font('Courier').fontSize(10).text(code, { lineGap: 2 });
  } catch {
    doc.font('Courier').fontSize(10).text('// ERROR: No se pudo leer el archivo o no existe.', { lineGap: 2 });
  }

  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(12).text(explanation);
  doc.moveDown(1.5);
}

// ======== RUTAS ========
const baseSrc = path.join(
  'C:', 'Users', 'adria', 'Desktop', 'Carpetas',
  'Clase', 'Programación Multimedia y Dispositivos Móviles',
  'Trabajo Tema 2', 'Carta-cafeteria', 'my-app', 'src', 'App'
);

const containerPath = path.join(baseSrc, 'Conteiner');
const categoryPath = path.join(containerPath, 'Category');
const productPath = path.join(categoryPath, 'Product');

// ======== COMPONENTES ========
addComponent(
  '5. Componente App.jsx',
  path.join(baseSrc, 'App.jsx'),
  'Componente principal que controla la estructura global de la aplicación. ' +
  'Define el estado "categorias" con useState, donde se almacena el menú de la cafetería. ' +
  'Implementa funciones CRUD (crear, editar, eliminar) tanto para categorías como para productos, ' +
  'y las pasa como props al componente Conteiner.'
);

addComponent(
  '6. Componente Conteiner.jsx',
  path.join(containerPath, 'Conteiner.jsx'),
  'Componente contenedor que recibe "categorias" y las funciones CRUD desde App.jsx. ' +
  'Gestiona la adición de nuevas categorías mediante un formulario controlado, ' +
  'y mapea cada categoría al componente Category. Contiene Header, Spacer y Footer como elementos de presentación.'
);

addComponent(
  '7. Componente Header.jsx',
  path.join(containerPath, 'Header', 'Header.jsx'),
  'Encabezado principal de la carta. Muestra el nombre del café y su año de fundación. ' +
  'No contiene lógica, solo estructura visual.'
);

addComponent(
  '8. Componente Footer.jsx',
  path.join(containerPath, 'Footer', 'Footer.jsx'),
  'Pie de página del documento. Contiene un enlace de contacto y dirección. ' +
  'Se utiliza como componente estático.'
);

addComponent(
  '9. Componente Spacer.jsx',
  path.join(containerPath, 'Spacer', 'Spacer.jsx'),
  'Elemento separador visual entre secciones. Devuelve una simple línea horizontal <hr />.'
);

addComponent(
  '10. Componente Category.jsx',
  path.join(categoryPath, 'Category.jsx'),
  'Componente encargado de mostrar cada categoría de productos. ' +
  'Permite editar o eliminar categorías y agregar nuevos productos dentro de ellas. ' +
  'Muestra la imagen asociada a la categoría y lista los productos mediante el componente Product. ' +
  'Utiliza estados locales para gestionar la edición y creación de productos.'
);

addComponent(
  '11. Componente Product.jsx',
  path.join(productPath, 'Product.jsx'),
  'Representa cada producto dentro de una categoría. ' +
  'Permite editar nombre y precio en línea o eliminar el producto tras confirmación. ' +
  'Utiliza estados internos para alternar entre modo lectura y edición.'
);

// ======== REPOSITORIO GITHUB ========
doc.fontSize(16).text('12. Repositorio GitHub', { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).fillColor('blue').text(
  'https://github.com/S4lv4-code/Carta-cafeteria',
  { link: 'https://github.com/S4lv4-code/Carta-cafeteria', underline: true }
);
doc.moveDown(1.5);

// ======== CONCLUSIÓN ========
doc.fontSize(16).text('13. Conclusión técnica', { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).fillColor('black').text(
  'El sistema combina React para la creación de componentes dinámicos y PDFKit para la generación automática ' +
  'de documentación. Este enfoque refuerza las buenas prácticas de modularidad, reutilización y documentación ' +
  'automatizada, permitiendo mantener sincronizado el código fuente con su descripción técnica.'
);

// ======== CIERRE ========
doc.end();
console.log('✅ PDF generado correctamente: Carta-Cafeteria.pdf');
