<template>
  <form @submit.prevent="createProject()">
    <div
      class="
        row
        bg-dark
        justify-content-center
        align-items-center
        elevation-3
        my-3
      "
    >
      <div class="col-md-4 mb-2">
        <input
          type="text"
          class="form-control"
          placeholder="Title..."
          v-model="editable.title"
          required
        />
      </div>
      <div class="col-md-8 mb-2">
        <input
          type="text"
          class="form-control"
          placeholder="Cover Image..."
          v-model="editable.coverImg"
          required
        />
      </div>
      <div class="col-12 mb-2">
        <textarea
          type="text"
          class="form-control"
          placeholder="Project Images..."
          v-model="editable.projectImgs"
          aria-describedby="helpId"
          required
        />
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button class="btn btn-success">Create</button>
      </div>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { projectsService } from "../services/ProjectsService";
export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      async createProject() {
        try {
          const formattedImgUrls = editable.value.projectImgs
            .split(", ")
            .map((url) => url.trim());
          editable.value.projectImgs = formattedImgUrls;
          await projectsService.createProject(editable.value);
          editable.value = {};
          Pop.toast("Created Project! Much success and rejoicing");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
