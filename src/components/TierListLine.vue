<script setup lang="ts">

import {Track} from "../models/Track";
import {Ref} from "vue";
import TrackPreview from './TrackPreview.vue';

const props = defineProps<{ list: Ref<Track[]>, dragGroup: string, letter: string }>();
console.log(props.list);
const classByLetter = {
  S: 'bg-purple-700',
  A: 'bg-green-500',
  B: 'bg-yellow-400',
  C: 'bg-orange-400',
  D: 'bg-red-700',
}
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
  <div class="flex border-b border-white bg-zinc-500" >
    <div class="p-10 w-28 text-xl flex items-center justify-center font-bold" :class="[classByLetter[props.letter]]">
      {{ props.letter }}
    </div>
    <draggable
        class="flex flex-wrap w-full"
        :group="props.dragGroup"
        :list="props.list"
        item-key="id">
      <template #item="{element}">
        <TrackPreview :track="element"></TrackPreview>
      </template>
    </draggable>
  </div>
</template>
