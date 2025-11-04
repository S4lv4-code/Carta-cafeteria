// generate-pdf.cjs
// Autor: Salvatore De Rosa Vega
// Descripción: Genera un documento PDF técnico del proyecto “Carta-Cafetería” desarrollado con React y Vite.

const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// ==== CONFIGURACIÓN BASE ====
const OUTPUT_FILE = "Carta-Cafeteria.pdf";
const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream(OUTPUT_FILE));

// ==== ENCABEZADO ====
doc
  .fontSize(18)
  .text("Carta de Productos - Proyecto React", { align: "center", underline: true });
doc.moveDown(0.5);
doc.fontSize(14).text("Autor: Salvatore De Rosa Vega", { align: "center" });
doc.fontSize(12).text(`Fecha: ${new Date().toLocaleDateString()}`, { align: "center" });
doc.moveDown(2);

// ==== SECCIÓN UTILIDAD ====
function section(title, text) {
  doc.fontSize(16).fillColor("black").text(title, { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor("black").text(text);
  doc.moveDown(1.5);
}

// ==== SECCIONES GENERALES ====
section(
  "1. Introducción",
  `Este documento describe el funcionamiento del proyecto "Carta-Cafetería",
desarrollado en React con Vite. Implementa componentes modulares, estados locales
y comunicación mediante props. Utiliza Node.js con PDFKit para generar documentación técnica automática.`
);

section(
  "2. Estructura del Script",
  `El script generate-pdf.cjs produce un PDF técnico uniforme. Importa fs, path y pdfkit,
crea un flujo de escritura hacia un archivo físico y documenta los componentes React,
incrustando el código fuente y su explicación.`
);

section(
  "3. Función addComponent()",
  `Automatiza la inserción de secciones. Lee un archivo fuente, lo inserta con fuente Courier
y agrega una descripción técnica. Si el archivo no existe, incluye una nota de error.`
);

section(
  "4. Rutas base",
  `Se definen rutas mediante path.join, apuntando a la estructura del proyecto en src/App.
Desde ahí se derivan subrutas a Conteiner, Category y Product.`
);

// ==== FUNCIÓN addComponent ====
function addComponent(title, filePath, explanation) {
  doc.fontSize(16).fillColor("black").text(title, { underline: true });
  doc.moveDown(0.5);

  try {
    const code = fs.readFileSync(filePath, "utf-8");
    doc.font("Courier").fontSize(10).text(code, { lineGap: 2 });
  } catch {
    doc
      .font("Courier")
      .fontSize(10)
      .fillColor("red")
      .text("// ERROR: No se pudo leer el archivo o no existe.", { lineGap: 2 });
  }

  doc.moveDown(0.5);
  doc.font("Helvetica").fontSize(12).fillColor("black").text(explanation);
  doc.moveDown(1.5);
}

// ==== RUTAS ====
const baseSrc = path.join(
  "C:", "Users", "adria", "Desktop", "Carpetas",
  "Clase", "Programación Multimedia y Dispositivos Móviles",
  "Trabajo Tema 2", "Carta-cafeteria", "my-app", "src", "App"
);

const containerPath = path.join(baseSrc, "Conteiner");
const categoryPath = path.join(containerPath, "Category");
const productPath = path.join(categoryPath, "Product");

// ==== COMPONENTES ====
addComponent(
  "5. Componente App.jsx",
  path.join(baseSrc, "App.jsx"),
  `Componente raíz. Gestiona el estado global "categorias" mediante useState,
implementa las funciones CRUD con la API REST remota y pasa los métodos como props a Conteiner.`
);

addComponent(
  "6. Componente Conteiner.jsx",
  path.join(containerPath, "Conteiner.jsx"),
  `Contenedor principal. Recibe categorías y métodos CRUD desde App.jsx.
Incluye el formulario para añadir categorías y renderiza Category.jsx por cada una.`
);

addComponent(
  "7. Componente Header.jsx",
  path.join(containerPath, "Header", "Header.jsx"),
  `Encabezado estático que muestra el nombre del establecimiento. Sin lógica funcional.`
);

addComponent(
  "8. Componente Footer.jsx",
  path.join(containerPath, "Footer", "Footer.jsx"),
  `Pie de página estático con contacto o información adicional.`
);

addComponent(
  "9. Componente Spacer.jsx",
  path.join(containerPath, "Spacer", "Spacer.jsx"),
  `Elemento de separación visual representado mediante <hr />.`
);

addComponent(
  "10. Componente Category.jsx",
  path.join(categoryPath, "Category.jsx"),
  `Representa una categoría de productos. Permite editar o eliminar la categoría
y añadir productos nuevos. Contiene CategoryHeader, AddProductForm y ProductList.`
);

// ==== NUEVOS COMPONENTES ====

addComponent(
  "11. Componente CategoryHeader.jsx",
  path.join(categoryPath, "CategoryHeader.jsx"),
  `Encargado de mostrar el encabezado de una categoría.
Permite editar el nombre de la categoría o eliminarla. Implementa confirmación
si la categoría contiene productos antes de su eliminación.`
);

addComponent(
  "12. Componente AddProductForm.jsx",
  path.join(categoryPath, "AddProductForm.jsx"),
  `Formulario controlado para agregar nuevos productos.
Gestiona los estados "name" y "price" y llama a la función onAddProducto
pasando los datos al componente padre Category.`
);

addComponent(
  "13. Componente ProductList.jsx",
  path.join(categoryPath, "ProductList.jsx"),
  `Renderiza una lista de productos dentro de cada categoría.
Mapea cada elemento del array productos hacia el componente Product,
pasando las funciones CRUD correspondientes como props.`
);

addComponent(
  "14. Componente Product.jsx",
  path.join(productPath, "Product.jsx"),
  `Representa un producto individual. Permite editar o eliminar el producto,
usando estados internos para alternar entre modo edición y visualización.`
);

// ==== REPOSITORIO ====
doc.fontSize(16).text("15. Repositorio GitHub", { underline: true });
doc.moveDown(0.5);
doc
  .fontSize(12)
  .fillColor("blue")
  .text("https://github.com/S4lv4-code/Carta-cafeteria", {
    link: "https://github.com/S4lv4-code/Carta-cafeteria",
    underline: true,
  });
doc.moveDown(1.5);

// ==== CONCLUSIÓN ====
section(
  "16. Conclusión técnica",
  `El proyecto combina React para la interfaz interactiva con PDFKit para la documentación automatizada.
La modularidad y el uso de API REST aseguran un mantenimiento limpio y escalabilidad del sistema.`
);

// ==== FINAL ====
doc.end();
console.log(`✅ PDF generado correctamente: ${OUTPUT_FILE}`);
