<script setup lang="ts">

import {login} from "../api/SpotifyApi";
import {useRouter} from "vue-router";
const router = useRouter()

function doLogin() {
  login();
}
</script>

<template>
  <button @click="doLogin">Login</button>

</template>

