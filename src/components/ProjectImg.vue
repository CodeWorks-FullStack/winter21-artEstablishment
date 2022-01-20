<template>
  <div class="col-md-4">
    <img :src="image" class="project-image img-fluid rounded" alt="" />
  </div>
</template>


<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
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
</style>
