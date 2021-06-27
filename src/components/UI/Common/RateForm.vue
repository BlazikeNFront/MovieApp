<template>
  <form ref="form">
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="star"
      @click="handleRate(1)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="star"
      @click="handleRate(2)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="star"
      @click="handleRate(3)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="star"
      @click="handleRate(4)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="star"
      @click="handleRate(5)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="star"
      @click="handleRate(6)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="star"
      @click="handleRate(7)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="star"
      @click="handleRate(8)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="star"
      @click="handleRate(9)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="star"
      @click="handleRate(10)"
    />
  </form>
  <p v-if="!userID">
    U need to be logged in to rate shows. Click
    <router-link to="/login">here to sign in</router-link>
  </p>
</template>
<script>
import { fbURL } from "../../../../privates.js";
export default {
  props: ["Id", "type"],

  mounted() {
    this.form = Array.from(this.$refs.form.children);
    this.checkIfWasRated();
  },

  data() {
    return {
      formRate: null,
      form: null,
      userID: this.$store.getters["UserAuth/userId"],
    };
  },

  methods: {
    rateForm(val) {
      this.form.forEach((element) => element.classList.remove("checked"));
      for (let i = 0; i < val; i++) {
        this.form[i].classList.add("checked");
      }
    },

    async checkIfWasRated() {
      try {
        if (!this.userID) {
          return;
        }

        const response = await fetch(
          `${fbURL}/Users/${this.userID}/ratedShows/${this.type}/${this.Id}.json`
        );

        const data = await response.json();

        if (data) {
          this.rateForm(data);
        }
        if (!response.ok) {
          const error = new Error("No r");
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async handleRate(val) {
      if (!this.userID) {
        return;
      }
      this.rateForm(val);

      this.form.forEach((element) => element.classList.remove("checked"));
      for (let i = 0; i < val; i++) {
        this.form[i].classList.add("checked");
      }

      const response = await fetch(
        `${fbURL}/Users/${this.userID}/ratedShows/${this.type}/${this.Id}.json`,
        {
          method: "PUT",
          body: val,
        }
      );

      if (!response.ok) {
        console.log("ERROR RESPONSE IN HandleRate METHOD(RATEFORM COMPONENT)");
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 0 auto;
  width: 20rem;
  border-radius: 10px;
  background-color: black;
  display: flex;
  justify-content: center;
}
.star {
  margin: 0.5rem 0rem;
  font-size: 1.6rem;
  color: grey;
  transition: all 0.2s ease;
}
.checked {
  color: yellow;
}
p {
  font-size: 1.3rem;
  text-align: center;
}
a {
  font-size: 1.5rem;
  color: var(--main-color);
}
@media (min-width: 500px) {
  form {
    width: 15rem;
  }
  .star {
    font-size: 1.2rem;
  }
}
</style>

