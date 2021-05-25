<template>
  <section>
    <h2>{{ title }}</h2>
    <div class="sliderButtonsContainer">
      <arrow-button class="button" @click="slideLeft"></arrow-button>
      <arrow-button
        class="button button--right"
        @click="slideRight"
      ></arrow-button>
    </div>
    <ul>
      <li>
        <transition mode="out-in">
          <carousel-slide
            v-if="loadedData"
            :active="activeSlide"
            :actor="false"
          ></carousel-slide>
        </transition>
      </li>
    </ul>
  </section>
</template>



<script>
import CarouselSlide from "./CarouselSlide.vue";
import ArrowButton from "../Common/ArrowButton.vue";
export default {
  props: ["slides", "title"],
  components: {
    CarouselSlide,
    ArrowButton,
  },
  data() {
    return {
      numberOfActive: 0,
      activeSlide: null,
      activeList: this.slides,
      loadedData: false,
      isClickable: true,
      interval: null,
    };
  },

  mounted() {
    this.createSlidesData();
    /*  this.startSlideShow(); */
  },

  methods: {
    createSlidesData() {
      const elements = [];
      for (const element of this.activeList) {
        elements.push(element);
      }
      this.activeSlide = elements[0];
      this.loadedData = true;
      this.lengthOfArray = this.activeList.length;
      this.activeList = elements;
    },

    startSlideShow() {
      this.interval = setInterval(() => {
        this.loadedData = false;

        this.numberOfActive =
          (this.numberOfActive + this.lengthOfArray + 1) % this.lengthOfArray;

        this.activeSlide = this.activeList[this.numberOfActive];
        setTimeout(() => {
          this.loadedData = true;
        }, 1000);
      }, 50000);
    },

    slideLeft() {
      if (!this.isClickable) {
        return;
      }

      if (this.interval) {
        clearInterval(this.interval);
      }
      this.isClickable = false;
      this.loadedData = false;

      this.numberOfActive =
        (this.numberOfActive + this.lengthOfArray - 1) % this.lengthOfArray;

      this.activeSlide = this.activeList[this.numberOfActive];

      setTimeout(() => {
        this.loadedData = true;
        this.isClickable = true;
      }, 1000);
    },
    slideRight() {
      if (!this.isClickable) {
        return;
      }

      if (this.interval) {
        clearInterval(this.interval);
      }
      this.isClickable = false;
      this.loadedData = false;

      this.numberOfActive =
        (this.numberOfActive + this.lengthOfArray + 1) % this.lengthOfArray;

      this.activeSlide = this.activeList[this.numberOfActive];

      setTimeout(() => {
        this.loadedData = true;
        this.isClickable = true;
      }, 1000);
    },
  },
};
</script>


<style scoped>
section {
  margin: 2rem 0;
  padding: 2rem 0;
  border-radius: 20px;
  background-color: #292e2b;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h2 {
  color: var(--main-color);
  text-align: center;
}
ul {
  list-style-type: none;
}
button {
  width: 100%;
  height: 100%;
}
.button--right {
  transform: translate(0, -0.9rem) rotate(180deg);
}

.sliderButtonsContainer {
  position: relative;
  top: 20rem;
  margin: 0 auto;
  width: 96%;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}
.v-enter-from {
  transform: translate(10rem);
  opacity: 0;
}

.v-enter-active {
  transition: all 1s ease-out;
}

.v-enter-to {
  transform: translate(0rem);
  opacity: 1;
}
.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 1s ease-out;
}
.v-leave-to {
  transform: translate(-10rem);
  opacity: 0;
}
</style>