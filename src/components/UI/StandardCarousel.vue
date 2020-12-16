<template>
  <section>
    <h3>{{ title }}</h3>
    <ul>
      <li>
        <transition mode="out-in">
          <show-card v-if="loadedData" :active="activeSlide"></show-card>
        </transition>
      </li>
    </ul>
  </section>
</template>



<script>
// props which points out which data we provide
import ShowCard from "./ShowCard.vue";
export default {
  props: ["slides", "title"],
  components: {
    ShowCard,
  },
  created() {
    const elements = [];
    for (const element of this.activeList) {
      elements.push(element);
    }
    this.activeSlide = elements[0];
    this.loadedData = true;
    this.activeList = elements;
    this.changeActiveSlide();
  },

  data() {
    return {
      numberOfActive: 1,
      activeSlide: null,
      activeList: this.slides,
      loadedData: false,
    };
  },
  methods: {
    changeActiveSlide() {
      setInterval(() => {
        this.loadedData = false;
        const lengthOfArray = this.activeList.length;
        this.numberOfActive =
          ((this.numberOfActive + lengthOfArray) % lengthOfArray) + 1;
        this.activeSlide = this.activeList[this.numberOfActive - 1];
        setTimeout(() => {
          this.loadedData = true;
        }, 1000);
      }, 10000);
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