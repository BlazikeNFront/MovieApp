<template>
  <div class="box">
    <div class="img" :style="{ backgroundImage: 'url(' + imgLink + ')' }"></div>
    <div class="posterAndTextBox">
      <img :src="posterImg" />
      <div class="text">
        <h3>{{ active.title || active.name }}</h3>
        <p>{{ overviewShort }}</p>
        <button>More details...</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["active"],

  data() {
    return {
      posterLink: "https://image.tmdb.org/t/p/w500" + this.active.poster_path,
    };
  },
  computed: {
    posterImg() {
      return "https://image.tmdb.org/t/p/w500" + this.active.poster_path;
    },
    imgLink() {
      return "https://image.tmdb.org/t/p/w500" + this.active.backdrop_path;
    },
    overviewShort() {
      return this.cutOverview();
    },
  },
  methods: {
    cutOverview() {
      return (
        this.active.overview.split("").splice(0, 150).join("") + "..." ||
        this.overview
      );
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
img {
  width: 10rem;
  transform: translate(0rem, -3.5rem);
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
p {
  margin: 0.5rem;
}
</style>