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
article {
  height: 100%;
}

.posterAndTextBox {
  position: relative;
  height: 40%;

  margin-left: 1rem;
  display: flex;
  align-items: center;
}
.posterAndTextBox--actor {
  position: initial;
  justify-content: space-around;
  height: 95%;
}

img {
  width: 10rem;
  transform: translate(0rem, -2.5rem);
}
.actorImg {
  position: initial;
  align-items: center;
  transform: none;
  width: 17rem;
  border-radius: 8px;
}

.text {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

button {
  background: none;
  border: none;
  color: white;
  font-family: inherit;
}
ul {
  list-style-type: none;
}
li {
  margin: 1rem 0.5rem;
}

.img {
  width: 100%;
  height: 60%;
  background-size: cover;
}
h3 {
  color: white;
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
}

h4 {
  margin-top: 1rem;
}
.posterPlaceholder {
  transform: translate(0rem, 0.5rem);
}
.placeholder {
  background-image: url(/img/movieImgPlaceholder.9b3f9c24.png);
  background-size: contain;
  background-repeat: no-repeat;
}

p {
  display: block;
  overflow: hidden;
  margin: 0.5rem;
  max-height: 6rem;
}
</style>

