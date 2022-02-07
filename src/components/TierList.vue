<script setup lang="ts">
import {ref, watch} from 'vue'
import {fetchAlbumTracks} from "../api/SpotifyApi";
import type {AlbumSearch} from "../models/AlbumSearch";
import type {Track} from "../models/Track";

const tracks = ref<Track[]>([]);
const sList = ref<Track[]>([]);
const props = defineProps<{ album: AlbumSearch }>()


watch(() => props.album, async () => {
  console.log(props.album);
  tracks.value = await fetchAlbumTracks(props.album.id)
})


</script>

<script lang="ts">
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  }
}
</script>

<template>
  <div class="bg-zinc-700	text-white">
    <div class="flex border-b border-white">
      <div class="bg-purple-700 p-10 w-28 text-center text-xl">S</div>
      <draggable
          class="flex flex-wrap w-full"
          group="toto"
          v-model="sList"
          item-key="id">
        <template #item="{element}">
          <div class="border w-40 h-40">{{ element.trackNumber }}. {{ element.name }}</div>
        </template>
      </draggable>
    </div>
    <div class="flex border-white border-b">
      <div class="bg-green-500 p-10 w-28 text-center text-xl">A</div>
    </div>
    <div class="flex border-white border-b">
      <div class="bg-yellow-400 p-10 w-28 text-center text-xl">B</div>
    </div>
    <div class="flex border-white border-b">
      <div class="bg-orange-400 p-10 w-28 text-center text-xl">C</div>
    </div>
    <div class="flex">
      <div class="bg-red-700 p-10 w-28 text-center text-xl">D</div>
    </div>
  </div>
  <draggable
      class="flex flex-wrap	mt-4"
      group="toto"
      v-model="tracks"
      item-key="id">
    <template #item="{element}">
      <div class="border w-40 h-40">{{ element.trackNumber }}. {{ element.name }}</div>
    </template>
  </draggable>
</template>

<style scoped>
</style>
