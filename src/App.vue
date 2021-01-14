<template>
  <body>
    <div class="phoneContainer">
      <div class="phoneImg"></div>
      <div class="overlayForDesktop">
        <the-header></the-header>
        <main @click="closeSearchOptionInHeader">
          <div class="mainContainer">
            <router-view v-slot="slotProps"
              ><transition name="fade" mode="out-in">
                <component :is="slotProps.Component"></component>
              </transition>
            </router-view>
          </div>
        </main>
      </div>
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
  methods: {
    closeSearchOptionInHeader() {
      this.$store.dispatch("HeaderLayout/closeHeaderSearch");
    },
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
.phoneImg {
  display: none;
}

.overlayForDesktop {
  margin: 0 auto;
  max-width: 503px;
  background-color: var(--main-color);
}
.phoneContainer {
  display: initial;
}

.mainContainer {
  width: 95%;
  max-width: 513px;

  height: 840px;
  background-color: var(--main-color);
  margin: 0 auto;
  border: 1px solid black;
  overflow: hidden;
}

@media (min-width: 600px) {
  .phoneContainer {
    display: block;
    position: relative;
    width: 100rem;
    transform: scale(0.8);
    margin: 0 auto;
  }

  .phoneImg {
    display: block;
    position: absolute;
    z-index: -1;
    top: -9rem;
    width: 83rem;
    height: 108rem;
    left: -3rem;
    background-image: url(/img/phoneOverlay.6cbf4aaa.png);
    background-repeat: no-repeat;
    background-size: cover;
    transform: translate(14%);
    background-color: var(--main-color);
  }
  .overlayForDesktop {
    border-radius: 15px;
  }
  .mainContainer {
    overflow-y: scroll;
  }
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
