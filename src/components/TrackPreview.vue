<script setup lang="ts">
import {Track} from "../models/Track";

const props = defineProps<{ track: Track; }>();

</script>

<template>
  <div
      class="w-36 h-36 relative bg-zinc-700 text-center flex items-center justify-center text-white cursor-pointer border border-zinc-600 p-2 text-xl">
    {{ props.track.name }}
  </div>
</template>
