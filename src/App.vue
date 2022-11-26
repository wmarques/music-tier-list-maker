<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import SearchBar from "./components/SearchBar.vue";
import {getToken, login} from "./SpotifyApi";
import {ref} from "vue";
import type {AlbumSearch} from "./models/AlbumSearch";
import TierList from "./components/TierList.vue";


let params = new URLSearchParams(window.location.search);
let code = params.get('code');


if (code) {
  params.delete('code');
  getToken(code).then(c => console.log(c));
}

const currentAlbum = ref<AlbumSearch>();

function doLogin() {
  login();
}

</script>


<template>
  <h1 class="text-3xl bg-black text-white px-4 py-2">Tier List Album</h1>
  <button @click="doLogin">Login</button>
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
