<template>
  <sec></sec>
  <!-- <div v-else>
      <detail-view-movie
        v-if="movie"
        :showInformations="showInformations"
      ></detail-view-movie>
      <detail-view-show
        v-else
        :showInformations="showInformations"
      ></detail-view-show>
    </div> -->
</template>
<script>
/* import DetailViewShow from "../components/UI/DetailViewShow.vue";
import DetailViewMovie from "../components/UI/DetaliViewMovie.vue"; */

export default {
  components: {
    /* DetailViewMovie,
    DetailViewShow, */
  },
  /*  data() {
    return {
      showInformations: null,
      movie: null,
    };
  }, */
  /*  computed: {
    showInfo() {
      return this.$store.getters["ShowDetails/showInformations"];
    },
  }, */
  /*  watch: {
    showInfo(newVal) {
      this.showInformations = newVal;
      this.movie = !!newVal.release_date;
    },
  }, */
};
</script>
<style  scoped>
section {
  margin-top: 4rem;
}
.boxcontainer {
  display: flex;
  flex-direction: column;
  background-color: #292e2b;
  padding: 3rem 0;
  text-align: center;
}
img {
  width: 100%;
}
.showData {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.lastEpisode {
  display: flex;
  align-items: center;
}
.lastEpisode__data {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}
.poster {
  width: 90%;
  margin: 0 auto;
}
.seasonsInfo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.overView {
  margin: 2rem 1rem;
}
.rate {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.additionalInfo {
  margin: 1rem;
  text-align: center;
}
h3 {
  color: black;
}
.form {
  margin: 0 auto;
}
</style>