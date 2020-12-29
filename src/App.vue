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
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: {
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
  max-width: 500px;
  height: 88vh;
  background-color: var(--main-color);
  margin: 0 auto;
  border: 1px solid black;
}
</style>
