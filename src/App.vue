<template>
  <body>
    <div class="phoneOverlayForDesktop">
      <div class="app">
        <error-dialog v-if="showErrorDialog"></error-dialog>
        <the-header></the-header>
        <main class="main" @click="closeSearchOptionInHeader">
          <router-view v-slot="slotProps"
            ><transition name="fade" mode="out-in">
              <component :is="slotProps.Component"></component>
            </transition>
          </router-view>
        </main>
      </div>
    </div>
  </body>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import ErrorDialog from "./components/UI/Common/ErrorDialog.vue";
export default {
  components: {
    TheHeader,
    ErrorDialog,
  },
  computed: {
    showErrorDialog() {
      return this.$store.getters["ErrorModal/getShowErrorModal"];
    },
  },
  methods: {
    closeSearchOptionInHeader() {
      this.$store.dispatch("HeaderLayout/closeHeaderSearch");
    },
  },
  mounted() {
    this.$store.dispatch("UserAuth/checkForAuthCookies");
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
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  font-family: "Montserrat", sans-serif;
  color: white;
}
h1 {
  font-size: 5rem;
}
h2 {
  font-size: 4rem;
  font-weight: 400;
}
h3 {
  font-size: 3rem;
}
h4 {
  font-size: 2rem;
  font-weight: 400;
}
button {
  border: none;
  background: none;
  font-family: inherit;
  cursor: pointer;
}

.app {
  position: relative;
  top: 0;
  left: 0;
}

.main {
  margin: 0 auto;
  padding-top: 7rem; /* AVOID STACKING WITH HEADER */
  width: 100%;
  min-height: 100vh;
  background-color: var(--main-color);
  overflow: hidden;
}

@media (min-width: 500px) {
  .phoneOverlayForDesktop {
    position: relative;
    margin: 0 auto;
    margin-top: 5rem;
    width: 90rem;
    height: 75rem;
    background-image: url("../public/assets/img/phoneOverlay.png");
    background-size: contain;
    background-repeat: no-repeat;
  }

  .app {
    position: absolute;
    top: 4rem;
    left: 11rem;
    width: 35rem;
    height: 65.5rem;
    border-radius: 25px;
    overflow-y: scroll;
  }

  .main {
    padding-top: 7rem;
    min-height: 100%;
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
