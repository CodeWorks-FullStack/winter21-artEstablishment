<template>
  <!-- NOTE set cover image on this row -->
  <div class="row cover-image"></div>
  <div class="row my-4">
    <div v-if="profile.id == account.id">
      <CreateProject />
    </div>
  </div>
  <div class="row mt-4">
    <Project v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>


<script>
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
import { projectsService } from "../services/ProjectsService";
import { AppState } from "../AppState";
export default {
  setup() {
    // NOTE we need this so we can snag the profile id out of the URL
    const route = useRoute();
    watchEffect(async () => {
      if (route.name == "Profile") {
        await profilesService.getProfile(route.params.id);
        await projectsService.getProjects("?creatorId=" + route.params.id);
      }
    });
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      profile: computed(() => AppState.profile),
      coverImg: computed(() => `url(${AppState.profile.coverImg})`),
    };
  },
};
</script>


<style lang="scss" scoped>
.cover-image {
  // NOTE fill in v-bind
  background-image: v-bind(coverImg);
  background-position: center;
  background-size: cover;
  height: 40vh;
}

.creator-image {
  height: 10rem;
  width: 10rem;
}
</style>
