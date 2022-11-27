<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {fetchAlbumTracks} from "../api/SpotifyApi";
import type {AlbumSearch} from "@/models/AlbumSearch";
import type {Track} from "@/models/Track";
import TierListLine from "./TierListLine.vue";
import TrackPreview from "./TrackPreview.vue";

const tracks = ref<Track[]>([]);
const sList = ref<Track[]>([]);
const aList = ref<Track[]>([]);
const bList = ref<Track[]>([]);
const cList = ref<Track[]>([]);
const dList = ref<Track[]>([]);


const props = defineProps<{ album: AlbumSearch }>()

onMounted(async () => {
  tracks.value = await fetchAlbumTracks(props.album.id)
})

watch(() => props.album, async () => {
  sList.value = [];
  aList.value = [];
  bList.value = [];
  cList.value = [];
  dList.value = [];
  tracks.value = await fetchAlbumTracks(props.album.id)
})

const group = 'drag-group';


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
  <div class="text-white">
    <TierListLine :drag-group=group letter="S" :list="sList"/>
    <TierListLine :drag-group=group letter="A" :list="aList"/>
    <TierListLine :drag-group=group letter="B" :list="bList"/>
    <TierListLine :drag-group=group letter="C" :list="cList"/>
    <TierListLine :drag-group=group letter="D" :list="dList"/>
  </div>
  <draggable
      class="flex flex-wrap	mt-4 cursor-pointer"
      :group=group
      v-model="tracks"
      item-key="id">
    <template #item="{element}">
      <TrackPreview :track="element"/>
    </template>
  </draggable>
</template>

<style scoped>
</style>
