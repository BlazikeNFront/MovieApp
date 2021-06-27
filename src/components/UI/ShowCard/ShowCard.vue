<template>
  <div class="box" v-if="active.gender !== '0'">
    <show-box v-if="!actor" :active="active"></show-box>
    <person-box v-else :personInfo="active"></person-box>
  </div>
</template>

<script>
import PersonBox from "./PersonBox.vue";
import ShowBox from "./ShowBox.vue";

export default {
  components: {
    PersonBox,
    ShowBox,
  },
  props: ["active", "actor"],

  computed: {
    posterSrc() {
      if (!this.active.poster_path) {
        return require("../../../../public/assets/img/posterPlaceholder.png");
      } else {
        return "https://image.tmdb.org/t/p/w500" + this.active.poster_path;
      }
    },
    imgSrc() {
      if (!this.active.poster_path) {
        return require("../../../../public/assets/img/movieImgPlaceholder.png");
      } else {
        return "https://image.tmdb.org/t/p/w500" + this.active.backdrop_path;
      }
    },
    placeholder() {
      return require("../../../../public/assets/img/actorPlaceHolderImg.png");
    },
    actorPicture() {
      return "https://image.tmdb.org/t/p/w500" + this.active.profile_path;
    },
    overviewShort() {
      return this.cutOverview();
    },
  },

  methods: {
    cutOverview() {
      if (!this.active.overview) {
        return;
      }
      return (
        this.active.overview.split(" ").splice(0, 25).join(" ") + "..." ||
        this.overview
      );
    },
    checkTypeOfShow(obj) {
      if (obj["release_date"]) {
        return "movie";
      } else {
        return "tv";
      }
    },
    updateDetailShowComponent() {
      this.$store.dispatch("ShowDetails/updateShowInformations", null);
      const payload = {
        typeOfShow: this.checkTypeOfShow(this.active),
        id: this.active.id,
      };

      this.$store.dispatch("ShowDetails/updateShowInformations", payload);
      const routeParam = payload.typeOfShow;
      this.$router.push(`/${routeParam}/${payload.id}`);
    },
  },
};
</script>
<style scoped>
.box {
  margin: 1rem auto;
  width: 95%;
  border-radius: 10px;
  background-color: black;
  box-shadow: 4px 10px 15px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}
</style>