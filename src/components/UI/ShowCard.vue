<template>
  <div v-if="active.gender !== '0'">
    <div class="box">
      <div
        v-if="!actor && active.backdrop_path"
        class="img"
        :style="{ backgroundImage: 'url(' + imgLink + ')' }"
      ></div>
      <div v-if="!actor && !active.backdrop_path" class="img placeholder"></div>
      <div class="posterAndTextBox" v-if="!actor">
        <img
          :src="posterImg"
          alt="posterImg"
          :class="{ posterPlaceholder: !active.poster_path }"
        />
        <div class="text">
          <h3>{{ active.title || active.name }}</h3>
          <p>{{ overviewShort || "There is no overview for this show..." }}</p>

          <button @click="updateDetailShowComponent">More Details...</button>
        </div>
      </div>
      <div v-else class="posterAndTextBox posterAndTextBox--actor">
        <img
          v-if="active.profile_path"
          class="actorImg"
          :src="actorPicture"
          :alt="active.name + ' picture'"
        />

        <img
          v-else
          class="actorImg"
          src="../../assets/img/actorPlaceHolderImg.png"
          :alt="active.name + ' picture'"
        />
        <div class="text">
          <h3>{{ active.name }}</h3>
          <h4>Known from:</h4>
          <ul>
            <li v-for="show in active.known_for" :key="show.id">
              {{ show.original_title || show.name }}
            </li>
          </ul>
          <p>Rate actor:</p>
          <rate-form type="actor" :Id="active.id"></rate-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["active", "actor"],

  computed: {
    posterImg() {
      if (!this.active.poster_path) {
        return require("../../assets/img/posterPlaceholder.png");
      } else {
        return "https://image.tmdb.org/t/p/w500" + this.active.poster_path;
      }
    },
    imgLink() {
      if (!this.active.poster_path) {
        return require("../../assets/img/movieImgPlaceholder.png");
      } else {
        return "https://image.tmdb.org/t/p/w500" + this.active.backdrop_path;
      }
    },
    placeholder() {
      return require("../../assets/img/actorPlaceHolderImg.png");
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

    updateDetailShowComponent() {
      this.$store.dispatch("ShowDetails/updateShowInformations", null);
      const payload = {
        movie: !!this.active["release_date"],
        id: this.active.id,
      };
      this.$store.dispatch("ShowDetails/updateShowInformations", payload);
      const routeParam = payload.movie === true ? "movie" : "show";
      this.$router.push(`/${routeParam}/${payload.id}`);
    },
  },
};
</script>
<style scoped>
.box {
  margin: 1rem auto;
  width: 100%;
  height: 30rem;
  background-color: black;
  box-shadow: 4px 10px 15px rgba(0, 0, 0, 0.8);
}
.posterAndTextBox {
  position: relative;
  top: -2.5rem;
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