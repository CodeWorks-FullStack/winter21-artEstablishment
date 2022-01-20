<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid bg-dark">
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by Harrington the 5th
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
