<template>
  <body>
    <the-header></the-header>
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
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
};
</script>

<style>
:root {
  --main-color: rgb(245, 199, 14);
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
  background-color: var(--main-color);
  color: white;
}
.container {
  width: 90%;
  height: 88vh;
  background-color: var(--main-color);
  margin: 0 auto;
  border: 1px solid black;
}
</style>
