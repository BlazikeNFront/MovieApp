<template>
  <article class="posterAndTextBox posterAndTextBox--actor">
    <img
      v-if="personInfo.profile_path"
      class="actorImg"
      :src="actorPicture"
      :alt="personInfo.name + ' picture'"
    />

    <img
      v-else
      class="actorImg"
      src="../../../../public/assets/img/actorPlaceHolderImg.png"
      :alt="personInfo.name + ' picture'"
    />
    <div class="text">
      <h3>{{ personInfo.name }}</h3>
      <h4>Known from:</h4>
      <ul>
        <li v-for="show in personInfo.known_for" :key="show.id">
          {{ show.original_title || show.name }}
        </li>
      </ul>
      <p>Rate actor:</p>
      <rate-form type="person" :Id="personInfo.id"></rate-form>
    </div>
  </article>
</template>

<script >
export default {
  props: {
    personInfo: {
      type: Object,
      required: true,
    },
  },

  computed: {
    actorPicture() {
      return "https://image.tmdb.org/t/p/w500" + this.personInfo.profile_path;
    },
    placeholder() {
      return require("../../../../public/assets/img/actorPlaceHolderImg.png");
    },
  },
};
</script>
<style scoped>
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
  text-align: center;
}
</style>
