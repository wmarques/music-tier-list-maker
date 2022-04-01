<script setup lang="ts">
import {ref, watch} from 'vue'
import debounce from 'lodash/debounce';
import {fetchAlbums} from "../api/SpotifyApi";
import type {AlbumSearch} from "../models/AlbumSearch";

const results = ref<AlbumSearch[]>([]);
const debouncedFunc = debounce(fetchAlbumsFromApi, 1000);
const selectedAlbum = ref<AlbumSearch>();

const emit = defineEmits<{ (e: 'albumSelected', value: AlbumSearch): void }>()

const onSearch = async (search: string, loading: (isLoading: boolean) => void) => {
  if (search.length) {
    loading(true);
    await debouncedFunc(search, loading);
  }
}

watch(selectedAlbum, () => {
  if (selectedAlbum.value) {
    emit('albumSelected', selectedAlbum.value)
  }
})


async function fetchAlbumsFromApi(search: string, loading: (isLoading: boolean) => void) {
  results.value = await fetchAlbums(search);
  loading(false);
}

</script>

<template>
  <v-select :options="results" @search="onSearch" label="name" :filterable="false" v-model="selectedAlbum">
    <template v-slot:option="option: AlbumSearch">
      <div class="flex items-center">
        <img :src="option.coverUrl" loading="lazy"/>
        {{ option.artist }} - {{ option.name }}

      </div>
    </template>

  </v-select>
</template>

<style scoped>

</style>
