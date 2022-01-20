<template>
  <div class="row my-3">
    <Project v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { projectsService } from "../services/ProjectsService";
import { AppState } from "../AppState";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getProjects();
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.log(error);
      }
    });
    return {
      // NOTE bringing in data from appstate into the PARENT so we can pass that data directly to the child (component)
      // NOTE any variable used in the template above MUST be returned here
      projects: computed(() => AppState.projects),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
