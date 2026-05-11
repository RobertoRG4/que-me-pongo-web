const fs = require('fs');
const path = require('path');

const ALL_STATES_COORDS = {
    "Aguascalientes": { lat: 21.8853, lng: -102.2916 },
    "Baja California": { lat: 30.8406, lng: -115.2838 },
    "Baja California Sur": { lat: 26.0444, lng: -111.6661 },
    "Campeche": { lat: 19.8301, lng: -90.5349 },
    "Chiapas": { lat: 16.7569, lng: -93.1292 },
    "Chihuahua": { lat: 28.6330, lng: -106.0691 },
    "CDMX": { lat: 19.4326, lng: -99.1332 },
    "Coahuila": { lat: 27.0587, lng: -101.7068 },
    "Colima": { lat: 19.2452, lng: -103.7241 },
    "Durango": { lat: 24.0277, lng: -104.6532 },
    "Guanajuato": { lat: 21.0190, lng: -101.2574 },
    "Guerrero": { lat: 17.5516, lng: -99.5010 },
    "Hidalgo": { lat: 20.0911, lng: -98.7624 },
    "Jalisco": { lat: 20.6597, lng: -103.3496 },
    "México": { lat: 19.2826, lng: -99.6557 },
    "Michoacán": { lat: 19.5665, lng: -101.7068 },
    "Morelos": { lat: 18.9261, lng: -99.2308 },
    "Nayarit": { lat: 21.5040, lng: -104.8947 },
    "Nuevo León": { lat: 25.6866, lng: -100.3161 },
    "Oaxaca": { lat: 17.0732, lng: -96.7266 },
    "Puebla": { lat: 19.0414, lng: -98.2063 },
    "Querétaro": { lat: 20.5888, lng: -100.3899 },
    "Quintana Roo": { lat: 19.5820, lng: -87.7320 },
    "San Luis Potosí": { lat: 22.1565, lng: -100.9855 },
    "Sinaloa": { lat: 25.1721, lng: -107.4795 },
    "Sonora": { lat: 29.0730, lng: -110.9559 },
    "Tabasco": { lat: 17.9895, lng: -92.9281 },
    "Tamaulipas": { lat: 24.2669, lng: -98.8363 },
    "Tlaxcala": { lat: 19.3139, lng: -98.2404 },
    "Veracruz": { lat: 19.1738, lng: -96.1342 },
    "Yucatán": { lat: 20.9674, lng: -89.5926 },
    "Zacatecas": { lat: 22.7709, lng: -102.5832 },
};

let result = "const statesWeatherData: { [key: string]: WeatherData } = {\n";
for (const [state, coords] of Object.entries(ALL_STATES_COORDS)) {
    const temp = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
    let condition = temp > 30 ? "Soleado" : temp > 22 ? "Parcialmente nublado" : "Fresco";
    let icon = temp > 30 ? "☀️" : temp > 22 ? "⛅" : "🌤️";
    
    result += `  "${state}": {
    city: "Capital de ${state}",
    state: "${state}",
    temperature: ${temp},
    condition: "${condition}",
    humidity: ${Math.floor(Math.random() * 50) + 30},
    windSpeed: ${Math.floor(Math.random() * 15) + 5},
    uvIndex: ${Math.floor(Math.random() * 8) + 3},
    recommendation: "",
    icon: "${icon}",
    lat: ${coords.lat},
    lng: ${coords.lng},
    outfitImages: [],
  },\n`;
}
result += "};";

const targetPath = path.join(__dirname, '../app/(modules)/dashboard/page.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

const startRegex = /const statesWeatherData: \{ \[key: string\]: WeatherData \} = \{/;
const endRegex = /\/\/ ─── Mapa de estilos personalizado/;

const startIndex = content.search(startRegex);
const match = content.match(endRegex);
const endIndex = match ? match.index : -1;

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);
    const newContent = before + result + '\n\n' + after;
    fs.writeFileSync(targetPath, newContent, 'utf8');
    console.log('Successfully updated statesWeatherData');
} else {
    console.log('Could not find replace bounds');
}
