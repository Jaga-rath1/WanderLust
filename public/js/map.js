const mapElement = document.getElementById("map");

const coordinates = JSON.parse(
    mapElement.dataset.coordinates
);

const apiKey = mapElement.dataset.apiKey;

const lat = coordinates[1];
const lon = coordinates[0];

const map = L.map("map").setView([lat, lon], 9);

L.tileLayer(
    `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${apiKey}`,
    {
        attribution: "&copy; OpenStreetMap contributors &copy; Geoapify",
    }
).addTo(map);

L.marker([lat, lon])
.addTo(map)
.bindPopup("<b>Exact Location</b>")
.openPopup();