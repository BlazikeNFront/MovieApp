<template>
  <article>
    <div
      v-if="active.backdrop_path"
      class="img"
      :style="{ backgroundImage: 'url(' + imgSrc + ')' }"
    ></div>
    <div v-if="!active.backdrop_path" class="img placeholder"></div>
    <div class="posterAndTextBox">
      <img
        :src="posterSrc"
        alt="posterImg"
        :class="{ posterPlaceholder: !active.poster_path }"
      />
      <div class="text">
        <h3>{{ active.title || active.name }}</h3>
        <p>{{ overviewShort || "There is no overview for this show..." }}</p>

        <button @click="updateDetailShowComponent">More Details...</button>
      </div>
    </div>
  </article>
</template>

<script >
export default {
  props: ["active"],
  computed: {
    posterSrc() {
      if (!this.active.poster_path) {
        return require("../../../public/assets/img/posterPlaceholder.png");
      } else {
        return "https://image.tmdb.org/t/p/w500" + this.active.poster_path;
      }
    },
    imgSrc() {
      if (!this.active.poster_path) {
        return require("../../../public/assets/img/movieImgPlaceholder.png");
      } else {
        return "https://image.tmdb.org/t/p/w500" + this.active.backdrop_path;
      }
    },
    placeholder() {
      return require("../../../public/assets/img/actorPlaceHolderImg.png");
    },
    actorPicture() {
      return "https://image.tmdb.org/t/p/w500" + this.active.profile_path;
    },
    overviewShort() {
      return this.cutOverview();
    },
  },

  methods: {
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
      console.log(payload);
      this.$store.dispatch("ShowDetails/updateShowInformations", payload);
      const routeParam = payload.typeOfShow;
      this.$router.push(`/${routeParam}/${payload.id}`);
    },
  },
};
</script>
<style>
</style>

