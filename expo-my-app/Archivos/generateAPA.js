import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

// -------------------------------
// 1. Cargar el texto completo que pegaste
// -------------------------------
// Intentamos leer `CODIGO_APP.txt` desde varias ubicaciones posibles.  
// Esto cubre los casos donde el archivo está en la raíz del proyecto o dentro
// de la carpeta `Archivos/` junto al script.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const candidatePaths = [
  path.join(__dirname, '..', 'CODIGO_APP.txt'), // ../CODIGO_APP.txt (desde Archivos/)
  path.join(__dirname, 'CODIGO_APP.txt'),      // ./CODIGO_APP.txt (en Archivos/)
  path.join(__dirname, '..', 'Archivos', 'CODIGO_APP.txt'), // ../Archivos/CODIGO_APP.txt
];

let fullText = null;
let usedPath = null;
for (const p of candidatePaths) {
  try {
    if (fs.existsSync(p)) {
      fullText = fs.readFileSync(p, 'utf8');
      usedPath = p;
      break;
    }
  } catch (e) {
    // ignorar y probar siguiente
  }
}

if (!fullText) {
  throw new Error(
    `No se encontró 'CODIGO_APP.txt'. Rutas intentadas:\n${candidatePaths.join('\n')}`
  );
}

console.log(`Usando CODIGO_APP.txt desde: ${usedPath}`);

// -------------------------------
// 2. Extraer SOLO lo importante (con comprobaciones para evitar fallos silenciosos)
// -------------------------------

// Si el usuario ya tiene un `debug_output.html` con sus cambios, úsalo tal cual
// para generar el PDF y evita sobrescribirlo.
const userDebugPath = path.join(__dirname, 'debug_output.html');
if (fs.existsSync(userDebugPath)) {
  console.log('He detectado un archivo debug_output.html modificado por el usuario. Usaré ese HTML para generar el PDF.');
  const htmlFromDebug = fs.readFileSync(userDebugPath, 'utf8');

  // Reemplazar imágenes locales por data URIs para que Puppeteer pueda embebidas correctamente
  let processedHtml = htmlFromDebug.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, (match, src) => {
    // no tocar si ya es data: o http(s)
    if (/^data:|^https?:\/\//i.test(src)) return match;

    // Resolver ruta local: si empieza con /, quitar slash inicial y unir con project root
    const projectRoot = path.join(__dirname, '..');
    let candidate;
    if (path.isAbsolute(src) || src.startsWith('/')) {
      // normalizar rutas que empiezan con /expo-my-app/... o /<project>/...
      let rel = src.replace(/^\//, '');
      // si el rel comienza con el nombre del proyecto (por ejemplo 'expo-my-app/'), quitarlo
      const projectRootName = path.basename(projectRoot);
      if (rel.startsWith(projectRootName + '/')) {
        rel = rel.slice(projectRootName.length + 1);
      }
      candidate = path.join(projectRoot, rel);
    } else {
      // ruta relativa respecto a la carpeta Archivos/
      candidate = path.join(__dirname, src);
    }

    if (!fs.existsSync(candidate)) {
      console.warn(`Imagen no encontrada en ruta: ${candidate} — dejando src original: ${src}`);
      return match;
    }

    try {
      const buffer = fs.readFileSync(candidate);
      const ext = path.extname(candidate).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : (ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : (ext === '.gif' ? 'image/gif' : 'application/octet-stream'));
      const data = `data:${mime};base64,${buffer.toString('base64')}`;
      // reemplazar el src dentro del tag
      console.log(`Embebiendo imagen local: ${candidate}`);
      return match.replace(src, data);
    } catch (e) {
      console.warn('Error leyendo imagen local:', e.message);
      return match;
    }
  });

  // Inyectar estilos para aumentar el tamaño del texto corporal y mejorar la apariencia
  const styleOverride = `
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; font-size: 16px; line-height: 1.45; color: #222; }
    p, li, span, div { font-size: 16px; }
    pre, code { font-family: 'Courier New', Courier, monospace; font-size: 13px; }
    img { display: block; max-width: 80%; height: auto; margin: 18px auto; box-shadow: 0 6px 18px rgba(0,0,0,0.12); border-radius: 8px; }
    /* Mantener tamaños de cabeceras tal cual (no aumentarlas) */
    h1, h2, h3, h4, h5 { /* no cambiar */ }
    @media print { img { max-width: 80%; } }
  </style>
  `;

  // Insertar en el <head> si existe, sino al inicio del body
  if (/\<head[^>]*\>/i.test(processedHtml)) {
    processedHtml = processedHtml.replace(/\<head([^>]*)\>/i, (m) => m + styleOverride);
  } else if (/\<html[^>]*\>/i.test(processedHtml)) {
    processedHtml = processedHtml.replace(/\<html([^>]*)\>/i, (m) => m + '<head>' + styleOverride + '</head>');
  } else {
    processedHtml = styleOverride + processedHtml;
  }

  await (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(processedHtml, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: "Informe_APA_Carta_Cafeteria.pdf",
      format: "A4",
      printBackground: true,
      margin: { top: "1cm", bottom: "1cm", left: "1.5cm", right: "1.5cm" }
    });
    await browser.close();
    console.log('PDF generado correctamente a partir de debug_output.html.');
  })();

  // Salimos aquí para no regenerar la plantilla a partir de CODIGO_APP.txt
  process.exit(0);
}

function safeExtract(text, regex, name) {
  const m = text.match(regex);
  if (!m || typeof m[1] === 'undefined') {
    throw new Error(`No se pudo extraer sección ${name}. Comprueba que 'CODIGO_APP.txt' contiene la cabecera y los separadores esperados.`);
  }
  return m[1].trim();
}

// Escapa caracteres especiales para insertar código dentro de HTML <pre>
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Extrae la sección de código situada entre las dos líneas separadoras
function extractSectionByHeader(text, headerLine) {
  const headerIndex = text.indexOf(headerLine);
  if (headerIndex === -1) {
    throw new Error(`Cabecera no encontrada: ${headerLine}`);
  }

  const firstSep = text.indexOf('================================================================================', headerIndex);
  if (firstSep === -1) {
    throw new Error(`Separador no encontrado después de la cabecera: ${headerLine}`);
  }

  const secondSep = text.indexOf('================================================================================', firstSep + 1);
  if (secondSep === -1) {
    throw new Error(`Segundo separador no encontrado para la cabecera: ${headerLine}`);
  }

  const contentStart = firstSep + '================================================================================'.length;
  const content = text.slice(contentStart, secondSep).trim();
  return content;
}

// Extraer secciones buscando las cabeceras exactas (tal como aparecen en CODIGO_APP.txt)
const EXTRACT_APP = extractSectionByHeader(fullText, '4. app/App/App.jsx');
const EXTRACT_CONTEINER = extractSectionByHeader(fullText, '5. app/App/Conteiner/Conteiner.jsx');
const EXTRACT_CATEGORY = extractSectionByHeader(fullText, '9. app/App/Conteiner/Category/Category.jsx');
const EXTRACT_PRODUCT = extractSectionByHeader(fullText, '13. app/App/Conteiner/Category/Product/Product.jsx');

const EXTRACT_BUTTONS_FULL = extractSectionByHeader(fullText, '2. app/App/components/Button.jsx');
const EXTRACT_BUTTONS = EXTRACT_BUTTONS_FULL.split("\n").slice(0, 40).join("\n"); // Los primeros 40 líneas (suficiente)

// -------------------------------
// 3. Construir el HTML final (sustituir los placeholders en la plantilla)
// -------------------------------
let template = fs.readFileSync("./template.html","utf8");
template = template.replace("${EXTRACT_APP}", escapeHtml(EXTRACT_APP));
template = template.replace("${EXTRACT_CONTEINER}", escapeHtml(EXTRACT_CONTEINER));
template = template.replace("${EXTRACT_CATEGORY}", escapeHtml(EXTRACT_CATEGORY));
template = template.replace("${EXTRACT_PRODUCT}", escapeHtml(EXTRACT_PRODUCT));
template = template.replace("${EXTRACT_BUTTONS}", escapeHtml(EXTRACT_BUTTONS));
// opcional: guardar html construido para depuración
try {
  const debugPath = path.join(__dirname, 'debug_output.html');
  const forceOverwrite = process.env.DEBUG_OVERWRITE === '1';
  if (fs.existsSync(debugPath) && !forceOverwrite) {
    const altPath = path.join(__dirname, `debug_output_generated_${Date.now()}.html`);
    fs.writeFileSync(altPath, template, 'utf8');
    console.log(`${altPath} escrito (no sobreescribí debug_output.html existente).`);
    console.log("Si quieres sobrescribir tu debug_output.html, ejecuta con la variable de entorno DEBUG_OVERWRITE=1");
  } else {
    fs.writeFileSync(debugPath, template, 'utf8');
    console.log('debug_output.html escrito en la carpeta Archivos/');
  }
} catch (e) {
  // no bloquear si falla el guardado de depuración
  console.warn('No pude escribir archivo de depuración:', e.message);
}
// Inyectar estilos globales también en la plantilla generada para que el PDF use tamaños mayores
const styleOverrideTemplate = `
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; font-size: 16px; line-height: 1.45; color: #222; }
  p, li, span, div { font-size: 16px; }
  pre, code { font-family: 'Courier New', Courier, monospace; font-size: 13px; }
  img { display: block; max-width: 80%; height: auto; margin: 18px auto; box-shadow: 0 6px 18px rgba(0,0,0,0.12); border-radius: 8px; }
</style>
`;

if (/\<head[^>]*\>/i.test(template)) {
  template = template.replace(/\<head([^>]*)\>/i, (m) => m + styleOverrideTemplate);
} else if (/\<html[^>]*\>/i.test(template)) {
  template = template.replace(/\<html([^>]*)\>/i, (m) => m + '<head>' + styleOverrideTemplate + '</head>');
} else {
  template = styleOverrideTemplate + template;
}

const html = template;

// -------------------------------
// 4. Generar PDF
// -------------------------------
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  await page.pdf({
    path: "Informe_APA_Carta_Cafeteria.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "1cm", bottom: "1cm", left: "1.5cm", right: "1.5cm" }
  });

  await browser.close();

  console.log("PDF generado correctamente.");
})();
