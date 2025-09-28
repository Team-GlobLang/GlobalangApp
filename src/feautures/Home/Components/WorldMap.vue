<template>
    <div class="w-full bg-white rounded-xl shadow-lg p-4 flex items-center justify-center h-[45vh] md:h-[60vh] xl:h-[70vh] transition-all">
        <div id="map" class="w-full h-full rounded-lg"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps<{ country: string }>();
const emit = defineEmits(['update:country']);

const search = ref(props.country ?? '');
const selectedCountry = ref(props.country ?? '');
let map: L.Map;
let countries: Array<{ properties: { name: string }, [key: string]: any }> = [];
let geoJsonLayer: L.GeoJSON<any> | null = null;
let highlightLayer: L.Layer | null = null;

watch(() => props.country, (val) => {
    search.value = val ?? '';
    selectedCountry.value = val ?? '';
    if (highlightLayer) {
        map.removeLayer(highlightLayer);
        highlightLayer = null;
    }
    if (countries.length && val) {
        const found = countries.find(
            c => c.properties.name.toLowerCase() === val.toLowerCase()
        );
        if (found) {
            highlightLayer = L.geoJSON(found as any, {
                style: {
                    color: '#ff6600',
                    weight: 3,
                    fillOpacity: 0.4
                }
            }).addTo(map);
            const geoLayer = L.geoJSON(found as any);
            map.fitBounds(geoLayer.getBounds());
        }
    }
});

watch(selectedCountry, (val, oldVal) => {
    if (val !== oldVal) {
        emit('update:country', val);
    }
});

async function loadGeoJson() {
    const res = await fetch('/world-countries.json');
    const data = await res.json();
    countries = data.features;
    geoJsonLayer = L.geoJSON(data, {
        style: {
            color: '#3388ff',
            weight: 1,
            fillOpacity: 0.2
        },
        onEachFeature: (feature: GeoJSON.Feature, layer: L.Layer) => {
            layer.on('click', () => {
                selectedCountry.value = feature.properties ? feature.properties.name : '';
                if (highlightLayer) {
                    map.removeLayer(highlightLayer);
                }
                highlightLayer = L.geoJSON(feature, {
                    style: {
                        color: '#ff6600',
                        weight: 3,
                        fillOpacity: 0.4
                    }
                }).addTo(map);
                if ('getBounds' in layer) {
                    map.fitBounds((layer as any).getBounds());
                }
            });
        }
    });
    geoJsonLayer.addTo(map);
}


onMounted(() => {
    const bounds = L.latLngBounds([
        [-85, -180],
        [85, 180]
    ]);
    map = L.map('map', {
        maxBounds: bounds,
        maxBoundsViscosity: 1.0
    }).setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    loadGeoJson();
});
</script>

<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>
