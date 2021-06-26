<template>
  <section class="posterAndTextBox">
    <img
      v-if="personInfo.profile_path"
      class="actorImg"
      :src="actorPicture"
      :alt="personInfo.name + ' picture'"
    />
    <img
      v-else
      class="posterPlaceholder"
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
  </section>
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
.posterAndTextBox {
  position: relative;
  margin: 1rem 0.5rem;
  padding: 1rem;
  height: 25rem;
  border-radius: 20px;
  background-color: #292e2b;
  display: flex;
  align-items: center;
}
.actorImg {
  width: 16rem;
  border-radius: 8px;
  align-items: center;
  transform: none;
}
.posterPlaceholder {
  width: 25rem;
  height: 20rem;
  border-radius: 8px;
}
.text {
  width: 100%;
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

h3 {
  color: white;
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
}

h4 {
  margin-top: 1rem;
}

p {
  display: block;
  overflow: hidden;
  margin: 0.5rem;
  max-height: 6rem;
  text-align: center;
}
</style>
