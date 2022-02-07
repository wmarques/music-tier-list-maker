<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import SearchBar from "./components/SearchBar.vue";
import {authenticate} from "./api/SpotifyApi";
import {ref, watch} from "vue";
import {AlbumSearch} from "./models/AlbumSearch";
import TierList from "./components/TierList.vue";

authenticate();

const currentAlbum = ref<AlbumSearch>()

</script>


<template>
  <h1 class="text-3xl text-center">FAIS TA TIER LIST</h1>
  <SearchBar @albumSelected="e => currentAlbum = e"/>
  <TierList v-if="currentAlbum" :album="currentAlbum"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
