<template>
  <body>
    <the-header></the-header>
    <div class="container"></div>
  </body>
</template>

<script>
//import UserAuth from './components/userAuth.vue';
//import SignupFrom from './components/SignUpFrom.vue';
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: {
    // UserAuth,
    // SignupFrom,
    TheHeader,
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style>
:root {
  --main-color: rgb(255, 209, 26);
}

*,
*::before,
*:after {
  margin: 0;
  padding: 0;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
  font-family: "Montserrat", sans-serif;
}
.container {
  width: 90%;
  height: 100vh;
  overflow: hidden;
  background-color: var(--main-color);
  margin: 0 auto;
}
</style>
