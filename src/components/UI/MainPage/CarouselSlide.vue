<template>
  <div class="sliderBox">
    <img
      class="showImg"
      v-if="active.poster_path"
      :src="imgSrc"
      :alt="active.title + 'screenshot'"
      :title="active.title"
    />
    <img v-else class="showImg" alt="showImg placeholder" :src="posterSrc" />

    <div class="posterAndTextBox">
      <img
        v-if="active.backdrop_path"
        class="showPoster"
        :src="posterSrc"
        :alt="active.title + 'poster'"
        :title="active.title"
      />
      <img
        v-else
        class="showPoster"
        :src="posterSrc"
        :alt="active.title + 'poster placeholder'"
        :title="active.title"
      />
      <article class="text">
        <h3>{{ active.title || active.name }}</h3>
        <p>{{ overviewShort || "There is no overview for this show..." }}</p>
        <button @click="updateDetailShowComponent">More Details...</button>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
.sliderBox {
  margin: 0 auto;
  width: 100%;
  background-color: black;
  border-radius: 10px;
  box-shadow: 4px 10px 15px rgba(0, 0, 0, 0.8);
}
.showImg {
  width: 100%;
  height: 27rem;
  object-fit: cover;
}
.posterAndTextBox {
  width: 100%;
  height: 18rem;
  display: flex;
  align-items: center;
}
.showPoster {
  position: relative;
  top: -3rem;
  left: 1rem;
  width: 10rem;
}
.text {
  margin-left: 2rem;
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
h3 {
  text-align: center;
}
p {
  font-size: 1.2rem;
  text-align: justify;
}
button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: var(--main-color);
}
</style>