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
        <transition name="carousel" mode="out-in" @after-leave="transitionEnd">
          <carousel-slide
            v-if="readyToTransition"
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
      readyToTransition: false,
      activeList: this.slides,
      isClickable: false,
      interval: null,
    };
  },

  mounted() {
    this.createSlidesData();
    this.startSlideShow();
  },

  methods: {
    createSlidesData() {
      const elements = [];
      for (const element of this.activeList) {
        elements.push(element);
      }
      this.activeSlide = elements[0];
      this.readyToTransition = true;
      this.isClickable = true;
      this.lengthOfArray = this.activeList.length;
      this.activeList = elements;
    },

    startSlideShow() {
      this.interval = setInterval(() => {
        this.numberOfActive =
          (this.numberOfActive + this.lengthOfArray + 1) % this.lengthOfArray;

        this.activeSlide = this.activeList[this.numberOfActive];
      }, 50000);
    },
    transitionEnd() {
      this.readyToTransition = true;
    },
    slideLeft() {
      if (!this.isClickable || !this.readyToTransition) {
        return;
      }
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.isClickable = false;
      this.readyToTransition = false;
      this.numberOfActive =
        (this.numberOfActive + this.lengthOfArray - 1) % this.lengthOfArray;

      this.activeSlide = this.activeList[this.numberOfActive];

      setTimeout(() => {
        this.isClickable = true;
      }, 2000);
    },
    slideRight() {
      if (!this.isClickable || !this.readyToTransition) {
        return;
      }

      if (this.interval) {
        clearInterval(this.interval);
      }
      this.isClickable = false;
      this.readyToTransition = false;
      this.numberOfActive =
        (this.numberOfActive + this.lengthOfArray + 1) % this.lengthOfArray;

      this.activeSlide = this.activeList[this.numberOfActive];

      setTimeout(() => {
        this.isClickable = true;
      }, 1000);
    },
  },
};
</script>


<style scoped>
section {
  margin: 2rem 0.3rem;
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
.carousel-enter-from {
  transform: translate(10rem);
  opacity: 0;
}

.carousel-enter-active {
  transition: all 0.5s ease-out;
}

.carousel-enter-to {
  transform: translate(0rem);
  opacity: 1;
}
.carousel-leave-from {
  opacity: 1;
}
.carousel-leave-active {
  transition: all 0.5s ease-in;
}
.carousel-leave-to {
  transform: translate(-10rem);
  opacity: 0;
}
</style>