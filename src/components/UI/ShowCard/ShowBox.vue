<template>
  <article class="showBox">
    <img
      class="showImg"
      v-if="active.poster_path"
      :src="imgSrc"
      alt="posterImg"
    />
    <img v-else class="showImg" alt="posterImg" :src="posterSrc" />
    <div class="posterAndTextBox">
      <img
        v-if="active.backdrop_path"
        class="showPoster"
        :src="posterSrc"
        :alt="active.title + 'poster'"
      />
      <img
        v-else
        class="showPoster"
        :alt="active.title + 'poster placeholder'"
        :src="posterSrc"
      />
      <div class="text">
        <h3 :class="{ h3SmallerFont: isTitleLong }">
          {{ active.title || active.name }}
        </h3>
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
      if (!this.active.backdrop_path) {
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
    isTitleLong() {
      const titleOfTheShow = this.active.title || this.active.name;
      if (titleOfTheShow.length > 20) {
        return true;
      } else {
        return false;
      }
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
.showBox {
  width: 100%;
  background-color: black;
  border-radius: 10px;
  box-shadow: 4px 10px 15px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.showImg {
  width: 100%;
  height: 20rem;
}
.posterAndTextBox {
  margin: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
}
.showPoster {
  position: relative;
  top: -6rem;
  left: 1rem;
  width: 10rem;
}
.text {
  margin: 0 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
h3 {
  text-align: center;
}
.h3SmallerFont {
  font-size: 2rem;
}
p {
  margin: 0.5rem 0;
  text-align: justify;
}

button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: var(--main-color);
}
@media (min-width: 375px) {
  .showPoster {
    top: -4rem;
  }
}
</style>

