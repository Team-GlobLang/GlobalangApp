<template>
    <div class="w-full bg-white rounded-xl shadow-lg p-4 transition-all md:max-w-md md:mx-auto xl:max-w-lg">
        <FwbInput v-model="countryModel" list="countries" type="text" label="Search by country"
            placeholder="E.g.: Costa Rica">
            <template #suffix>
                <span class="pi pi-home"></span>
            </template>
        </FwbInput>

        <datalist id="countries">
            <option v-for="countryItem in filteredCountries" :key="countryItem.code" :value="countryItem.name">
                {{ countryItem.name }}
            </option>
        </datalist>
    </div>
</template>

<script setup lang="ts">
import { countries } from '@core/CountriesArray';
import { FwbInput } from 'flowbite-vue';
import { computed } from 'vue';

const props = defineProps<{ country: string }>();
const emit = defineEmits<{ (e: 'update:country', value: string): void }>();

const countryModel = computed({
    get: () => props.country,
    set: (val: string) => emit('update:country', val),
});

const MAX_INITIAL = 10;

const filteredCountries = computed(() => {
    if (!countryModel.value) {
        return countries.slice(0, MAX_INITIAL);
    }
    return countries.filter(c =>
        c.name.toLowerCase().includes(countryModel.value.toLowerCase())
    );
});
</script>
