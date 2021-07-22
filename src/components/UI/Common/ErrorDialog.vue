<template>
  <div>
    <div class="backDrop" @click="closeModal"></div>
    <dialog>
      <h3>Error occured :(</h3>
      <p>{{ message }}</p>
      <button @click="closeModal">OK</button>
    </dialog>
  </div>
</template>
<script>
export default {
  computed: {
    message() {
      return this.$store.getters["ErrorModal/getErrorMessage"];
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch("ErrorModal/toggleErrorModal");
    },
  },
};
</script>
<style scoped>
.backDrop {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2000;
}
dialog {
  position: fixed;
  margin: 10rem auto;
  padding: 3rem 0rem;
  width: 90%;
  min-height: 50%;
  border-radius: 20px;
  background-color: var(--main-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  z-index: 2500;
}
button {
  padding: 1rem 5rem;
  border-radius: 20px;
  background-color: #292e2b;
  font-size: 2rem;
  color: white;
}
p {
  margin: 1.5rem;
  text-align: justify;
  font-size: 1.7rem;
}
@media (min-width: 500px) {
  .backDrop {
    position: fixed;
    width: 39rem;
    height: 69rem;

    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2000;
  }
  dialog {
    width: 35em;
    height: 58rem;
  }
}
</style>

