<template>
  <div v-if="active.gender !== 0">
    <div class="box">
      <div
        v-if="!actor && active.backdrop_path"
        class="img"
        :style="{
          backgroundImage: 'url(' + imgLink + ')',
        }"
      ></div>
      <div v-if="!actor && !active.backdrop_path" class="img placeholder"></div>
      <div class="posterAndTextBox" v-if="!actor">
        <img :src="posterImg" alt="posterImg" />
        <div class="text">
          <h3>{{ active.title || active.name }}</h3>
          <p>{{ overviewShort }}</p>
          <button @click.prevent="updateDetailShowComponent">
            More Details...
          </button>
        </div>
      </div>
      <div class="posterAndTextBox posterAndTextBox--actor" v-else>
        <img
          v-if="active.profile_path"
          class="actorImg"
          :src="actorPicture"
          :alt="active.name + ' picture'"
        />

        <!-- bind src to a computed that return local src  does not provide img ??? -->
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import dsad from '../../assets/img/actorPlaceHolderImg.png'
//src\assets\img\actressPlaceholderImg.jpgsrc\assets\img\actorPlaceHolderImg.png
export default {
  props: ["active", "actor"],

  computed: {
    posterImg() {
      return "https://image.tmdb.org/t/p/w500" + this.active.poster_path;
    },
    imgLink() {
      if (!this.active.backdrop_path) {
        return "../../assets/img/movieImgPlaceholder.png";
      }
      return "https://image.tmdb.org/t/p/w500" + this.active.backdrop_path;
    },
    placeholder() {
      return "../../assets/img/actorPlaceHolderImg.png";
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
        this.active.overview.split(" ").splice(0, 30).join(" ") + "..." ||
        this.overview
      );
    },

    updateDetailShowComponent() {
      const payload = {
        movie: !!this.active["release_date"],
        id: this.active.id,
      };
      this.$store.dispatch("ShowDetails/updateShowInformations", payload);
      this.$router.push("/show");
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
  top: -1.5rem;
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
  transform: translate(0rem, -3.5rem);
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

.placeholder {
  background-image: url(/img/movieImgPlaceholder.9b3f9c24.png);
  background-size: contain;
  background-repeat: no-repeat;
}

p {
  margin: 0.5rem;
}
</style>