<template>
  <div>
    <ol class="paginationButtons">
      <li class="page" v-for="page in numberOfPagess" :key="page">
        {{ page }}
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  props: {
    numberOfPagess: {
      required: true,
      type: Number,
    },
  },
};
</script>
<style scoped>
.page {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: black;
  color: var(--main-color);
}
</style>