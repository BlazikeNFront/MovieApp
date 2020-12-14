<template>
  <section>
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
import ShowCard from "./ShowCard.vue";
export default {
  components: {
    ShowCard,
  },
  data() {
    return {
      numberOfActive: 1,
      activeSlide: null,
      activeList: this.getPopular(),
      loadedData: false,
    };
  },
  methods: {
    async fetchData(url) {
      try {
        const data = await fetch(url);
        if (!data.ok) {
          const error = "There was an error in response";
          throw new Error(error);
        }
        return await data.json();
      } catch (e) {
        console.log(e);
      }
    },

    getPopular() {
      this.fetchData(
        "https://api.themoviedb.org/3/trending/all/day?api_key=b9e62fadaa93179070f235a9087033e2"
      ).then((data) => {
        const arrayOfTrendings = data.results;
        const elements = [];
        for (const element of arrayOfTrendings) {
          elements.push(element);
        }
        this.activeSlide = elements[0];
        this.loadedData = true;
        this.activeList = elements;
        this.changeActiveSlide();
      });
    },

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
      }, 20000);
    },
  },
};
</script>


<style scoped>
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