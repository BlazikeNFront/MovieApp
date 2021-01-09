<template>
  <section>
    <div class="sliderButtonsContainer">
      <arrow-button class="button" @click="slideLeft"></arrow-button>
      <arrow-button class="button right" @click="slideRight"></arrow-button>
    </div>
    <h3>{{ title }}</h3>

    <ul>
      <li>
        <transition mode="out-in">
          <show-card
            v-if="loadedData"
            :active="activeSlide"
            :actor="false"
          ></show-card>
        </transition>
      </li>
    </ul>
  </section>
</template>



<script>
// props which points out which data we provide
import ShowCard from "../ShowCard.vue";
import ArrowButton from "../Common/ArrowButton.vue";
export default {
  props: ["slides", "title"],
  components: {
    ShowCard,
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
    this.startSlideShow();
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
      }, 10000);
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
h3 {
  margin-top: 1rem;
  font-size: 2rem;
  color: black;
  text-align: center;
}
ul {
  list-style-type: none;
}
button {
  width: 100%;
  height: 100%;
}
.right {
  transform: translate(0, -0.9rem) rotate(180deg);
}

.sliderButtonsContainer {
  position: relative;
  top: 20rem;
  width: 96%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}
.v-enter-from {
  opacity: 0;
  transform: translate(10rem);
}

.v-enter-active {
  transition: all 1s ease-out;
}

.v-enter-to {
  opacity: 1;
  transform: translate(0rem);
}
.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 1s ease-out;
}
.v-leave-to {
  opacity: 0;
  transform: translate(-10rem);
}
</style>