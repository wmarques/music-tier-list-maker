<script setup lang="ts">
import {getToken, refreshToken} from "../api/SpotifyApi";
import {useRouter} from "vue-router";
import {onMounted} from "vue";

const router = useRouter();


onMounted(async () => {
  let params = new URLSearchParams(window.location.search);
  let code = params.get('code');

  if (code) {
    await getToken(code);
    router.push('tierlist');
  } else {
    try {
      await refreshToken();
      router.push('tierlist')
    } catch (e) {
      router.push('login')
    }
  }
});


</script>

<template>
  Loading...
</template>

