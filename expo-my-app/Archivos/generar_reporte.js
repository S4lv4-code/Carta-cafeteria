// generePDFNode.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

async function generePDFNode() {
  const doc = new PDFDocument({ margin: 72, size: 'A4' }); // 1 inch ≈ 72pt

  const filePath = './Carta_Cafeteria_Node.pdf';
  doc.pipe(fs.createWriteStream(filePath));

  // Portada
  doc.font('Times-Roman').fontSize(24).text('CARTA CAFETERÍA', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text('DOCUMENTACIÓN TÉCNICA', { align: 'center' });
  doc.moveDown(2);
  doc.fontSize(12)
     .text('Autor: Salvatore De Rosa Vega', { align: 'center' })
     .text('Curso: 2-DAMN-B', { align: 'center' })
     .text('Asignatura: Programación Multimedia y Dispositivos Móviles', { align: 'center' })
     .text('Centro: IES El Rincón', { align: 'center' })
     .text('Repositorio GitHub: https://github.com/S4lv4-code/Carta-cafeteria', { align: 'center', link: 'https://github.com/S4lv4-code/Carta-cafeteria' })
     .text('19/11/2025', { align: 'center' });

  doc.addPage();

  // Sección de Arquitectura
  doc.fontSize(16).text('1. Arquitectura general', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text('Jerarquía index.tsx → App.jsx → Conteiner.jsx → Category.jsx → Product.jsx. Nuevos elementos: ImageSelector, MapPicker, FooterMap.');
  doc.moveDown();

  // Sección ImageSelector
  doc.fontSize(16).text('2. Código de ImageSelector.jsx', { underline: true });
  doc.moveDown();
  doc.font('Courier').fontSize(10).text(`import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageSelector({ onSelect }) {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      onSelect(result.uri);
    }
  };
  return (
    <View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Seleccionar Imagen" onPress={pickImage} />
    </View>
  );
}`);

  doc.addPage();

  // Sección MapPicker
  doc.font('Times-Roman').fontSize(16).text('3. Código de MapPicker.jsx', { underline: true });
  doc.moveDown();
  doc.font('Courier').fontSize(10).text(`import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapPicker({ onSelect }) {
  const [marker, setMarker] = useState(null);
  const handlePress = (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarker(coords);
    onSelect(coords);
  };
  return (
    <View style={{ height: 300 }}>
      <MapView style={{ flex: 1 }} onPress={handlePress}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
      {marker && <Text>Coordenadas: {marker.latitude}, {marker.longitude}</Text>}
    </View>
  );
}`);

  doc.addPage();

  // Sección FooterMap
  doc.font('Times-Roman').fontSize(16).text('4. Código de FooterMap.jsx', { underline: true });
  doc.moveDown();
  doc.font('Courier').fontSize(10).text(`import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function FooterMap() {
  const handlePress = () => {
    Linking.openURL('https://www.google.com/maps');
  };
  return (
    <View style={{ marginTop: 20 }}>
      <MapView style={{ height: 200 }} initialRegion={{
        latitude: 40.4168,
        longitude: -3.7038,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}>
        <Marker coordinate={{ latitude: 40.4168, longitude: -3.7038 }} title="Cafetería" />
      </MapView>
      <TouchableOpacity onPress={handlePress}>
        <Text style={{ color: 'blue', textAlign: 'center', marginTop: 5 }}>
          Abrir en Google Maps
        </Text>
      </TouchableOpacity>
    </View>
  );
}`);

  doc.end();

  console.log('PDF generado en:', filePath);
  return filePath;
}

// Para ejecutar desde Node.js
generePDFNode();
