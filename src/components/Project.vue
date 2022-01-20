<template>
  <div class="col-md-4">
    <div class="border rounded shadow m-2">
      <img
        :src="project.coverImg"
        :data-bs-target="'#project-' + project.id"
        data-bs-toggle="modal"
        class="rounded selectable project-image"
        alt=""
      />
    </div>
  </div>

  <!-- Projekt Details modal -->
  <Modal :id="'project-' + project.id">
    <template #modal-title>
      <h4>{{ project.title }}</h4>
    </template>
    <template #modal-body>
      <!-- NOTE cover image row -->
      <div class="row cover-image"></div>
      <div class="row justify-content-center">
        <h4 class="text-center my-2">Art Pieces</h4>
        <ProjectImg v-for="p in project.projectImgs" :key="p.id" :image="p" />
      </div>
      <div class="row my-3">
        <div class="col-12">
          <div
            class="d-flex align-items-center selectable"
            @click="goToProfile()"
          >
            <img
              :src="project.creator.picture"
              class="creator-image rounded-circle"
              alt=""
            />
            <!-- NOTE two ways of null checking - with v-if and inline elvis operator -->
            <div v-if="project.creator">
              <h4 class="ms-4">{{ project.creator?.name }}</h4>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  // NOTE make sure that if you are using props in the return, you pass the props INTO the setup method
  setup(props) {
    // NOTE useRouter gains us access to the local Vue router, useRoute gains us access to the URL.
    const router = useRouter();
    return {
      async goToProfile() {
        Modal.getOrCreateInstance(
          document.getElementById("project-" + props.project.id)
        ).toggle();
        router.push({
          name: "Profile",
          params: { id: props.project.creatorId },
        });
      },
      router,
      coverImg: computed(() => `url(${props.project.coverImg})`),
    };
  },
};
</script>


<style lang="scss" scoped>
.project-image {
  background-size: cover;
  object-fit: contain;
  height: 100%;
  width: 100%;
}

.cover-image {
  // NOTE the variable used here needs to already be formatted for css before you try to use it here
  background-image: v-bind(coverImg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 50vh;
}

.creator-image {
  height: 3rem;
  width: 3rem;
}
</style>
