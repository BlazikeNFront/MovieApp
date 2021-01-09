<template>
  <body>
    <div class="overlayForDesktop">
      <the-header></the-header>
      <main>
        <div class="mainContainer">
          <router-view v-slot="slotProps"
            ><transition name="fade" mode="out-in">
              <component :is="slotProps.Component"></component>
            </transition>
          </router-view>
        </div>
      </main>
    </div>
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
  --border-radius-lg: 20px;
  --border-radius-md: 10px;
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

  color: white;
}

.overlayForDesktop {
  margin: 0 auto;
  max-width: 500px;
  background-color: var(--main-color);
}

.mainContainer {
  width: 95%;
  max-width: 500px;
  min-height: 100vh;
  background-color: var(--main-color);
  margin: 0 auto;
  border: 1px solid black;
  overflow: hidden;
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
