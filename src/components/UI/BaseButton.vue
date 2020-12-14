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
.common {
  font-family: inherit;
  border-radius: 20px;
  background-color: none;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
}
.userAuth {
  font-size: 2rem;
  padding: 0.7rem 2rem;
}

.userSignUpForm {
  width: 20rem;
  font-size: 2rem;
  padding: 0.7rem 2rem;
}

.headerSignIn {
  background-color: #292e2b;
  color: white;
  box-shadow: none;
  font-size: 1.5rem;
}

.searchBarConfirm {
  padding: 0.6rem;
  color: white;
  background: black;
}
</style>
