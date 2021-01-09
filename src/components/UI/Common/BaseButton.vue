<template>
  <button :class="CSS">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    CSS: {
      required: false,
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.userAuth {
  font-size: 2rem;
  padding: 0.7rem 2rem;
}

.userSignUpForm {
  width: 20rem;
  font-size: 2rem;
  padding: 0.7rem 2rem;
}
</style>
