// generate-pdf.cjs
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Crear documento PDF con márgenes profesionales
const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream('Carta-Cafeteria.pdf'));

// ======== Encabezado (estilo APA básico) ========
doc.fontSize(18).text('Carta de Productos - Proyecto React', { align: 'center', underline: true });
doc.moveDown(0.5);
doc.fontSize(14).text('Autor: Salvatore De Rosa Vega', { align: 'center' });
doc.fontSize(12).text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'center' });
doc.moveDown(2);

// ======== Introducción ========
doc.fontSize(16).text('1. Introducción', { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).text(
  'El siguiente trabajo consiste en la creación de una carta de menú +, con la biblioteca/librería de React,'+
  'junto con la herramienta para generar contenido fronted Vite. ' +
  'El diseño se organiza mediante componentes que reciben datos mediante props, siguiendo buenas prácticas de desarrollo. ' +
  'El documento describe cada componente, su código y su funcionalidad.'
);
doc.moveDown(1.5);

// ======== Función auxiliar para agregar componente ========
function addComponent(title, filePath, explanation) {
  doc.fontSize(16).text(title, { underline: true });
  doc.moveDown(0.5);

  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    doc.font('Courier').fontSize(10).text(code, { lineGap: 2 });
  } catch (err) {
    doc.font('Courier').fontSize(10).text('// ERROR: No se pudo leer el archivo', { lineGap: 2 });
  }

  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(12).text(explanation);
  doc.moveDown(1.5);
}

// ======== Definir rutas base ========
const baseSrc = path.join(
  'C:', 'Users', 'adria', 'Desktop', 'Carpetas', 
  'Clase', 'Programación Multimedia y Dispositivos Móviles', 
  'Trabajo Tema 2', 'Carta-cafeteria', 'my-app', 'src', 'App'
);

const containerPath = path.join(baseSrc, 'Conteiner');
const categoryPath = path.join(containerPath, 'Category');
const productPath = path.join(categoryPath, 'Product');

// ======== Agregar componentes ========
addComponent(
  '2. Componente App.jsx',
  path.join(baseSrc, 'App.jsx'),
  'Componente principal que contiene la estructura global y renderiza los demás componentes.'+
  'Se crea un JSON en el componente padre App donde estarán los datos de la carta sin repetición'+
  'A Conteiner se le insterta como propiedad "categorias"'
);

addComponent(
  '3. Componente Conteiner.jsx',
  path.join(containerPath, 'Conteiner.jsx'),
  'Organiza las categorías y productos dentro de la carta, actuando como contenedor principal.'+
  'Al objeto Category se le inserta las propiedades category, imagen y product.'+
  'Se realiza una función flecha para mapear Category con sus respetivas propiedades'+
  'Como parametro se le inserta categorias'
);

addComponent(
  '4. Componente Header.jsx',
  path.join(containerPath, 'Header', 'Header.jsx'),
  'Muestra la cabecera de la carta, con información principal.'
);

addComponent(
  '5. Componente Footer.jsx',
  path.join(containerPath, 'Footer', 'Footer.jsx'),
  'Muestra el pie de página de la carta.'
);

addComponent(
  '6. Componente Spacer.jsx',
  path.join(containerPath, 'Spacer', 'Spacer.jsx'),
  'Se utiliza para separar visualmente secciones de la carta.'
);

addComponent(
  '7. Componente Category.jsx',
  path.join(categoryPath, 'Category.jsx'),
  'Representa cada categoría de productos dentro de la carta mostrando categoria, imagen y Product.'+
  'Como parametro se inserta category, imagen y product'+
  'Se realiza una función flecha para mapear Product con sus respetivas propiedades'
);

addComponent(
  '8. Componente Product.jsx',
  path.join(productPath, 'Product.jsx'),
  'Representa cada producto dentro de su categoría, mostrando nombre y precio.'+
  'Como parametro se inserta name y price'
);

// ======== Repositorio GitHub ========
doc.fontSize(16).text('9. Repositorio GitHub', { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).fillColor('blue').text(
  'https://github.com/S4lv4-code/Carta-cafeteria',
  { link: 'https://github.com/S4lv4-code/Carta-cafeteria', underline: true }
);

doc.end();

console.log('✅ PDF generado: Carta-Cafeteria.pdf');
