<template>
  <body>
    <the-header></the-header>
    <main>
      <div class="container">
        <router-view v-slot="slotProps"
          ><transition name="fade" mode="out-in">
            <component :is="slotProps.Component"></component>
          </transition>
        </router-view>
      </div>
    </main>
  </body>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
/**/
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

.fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-leave-active {
  transition: all 0.3s ease-out;
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
