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

      <div class="personBox__rateForm">
        <rate-form type="person" :Id="personInfo.id"></rate-form>
      </div>
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
  height: 100%;
  border-radius: 20px;
  background-color: #292e2b;
  display: flex;
  align-items: center;
}
.actorImg {
  width: 10rem;
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
  overflow: hidden;
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
  text-align: center;
}

h3 {
  color: white;

  font-weight: 500;
  text-align: center;
}

h4 {
  margin-top: 1rem;
}

p {
  display: block;
  margin: 0.5rem;
  max-height: 6rem;
  font-size: 1.5rem;
  text-align: center;
  overflow: hidden;
}
.personBox__rateForm {
  transform: scale(0.8);
}
@media (min-width: 375px) {
  .actorImg {
    width: 14rem;
  }
}
@media (min-width: 425px) {
  .actorImg {
    width: 16rem;
  }
  .personBox__rateForm {
    transform: scale(0.9);
  }
}
</style>
