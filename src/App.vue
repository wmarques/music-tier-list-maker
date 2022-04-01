<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import SearchBar from "./components/SearchBar.vue";
import {authenticate} from "./api/SpotifyApi";
import {ref} from "vue";
import {AlbumSearch} from "./models/AlbumSearch";
import TierList from "./components/TierList.vue";

authenticate();

const currentAlbum = ref<AlbumSearch>()

</script>


<template>
  <h1 class="text-3xl bg-black text-white px-4 py-2">Tier List Album</h1>
  <div class="container mx-auto mt-4">
    <SearchBar @albumSelected="e => currentAlbum = e" class="w-96 my-4"/>
    <TierList v-if="currentAlbum" :album="currentAlbum"/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
