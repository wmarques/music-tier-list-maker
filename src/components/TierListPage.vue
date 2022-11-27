<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import TierList from "./TierList.vue";
import {ref} from "vue";
import type {AlbumSearch} from "@/models/AlbumSearch";
const currentAlbum = ref<AlbumSearch>();

</script>

<template>
  <div class="container mx-auto mt-4">
    <SearchBar @albumSelected="e => currentAlbum = e" class="w-96 my-4"/>
    <TierList v-if="currentAlbum" :album="currentAlbum"/>
  </div>
</template>
