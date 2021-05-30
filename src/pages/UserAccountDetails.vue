<template>
  <section>
    <div class="loader" v-if="!email">
      <h3>Loading data...</h3>
      <spinner></spinner>
    </div>
    <div class="data" v-else>
      <div class="infoBox">
        <p class="InfoBox_typeOfInfo">Your Email:</p>
        <p class="infoBox__infoValue">{{ email }}</p>
      </div>
      <div class="infoBox">
        <p class="InfoBox_typeOfInfo">Your userName:</p>
        <p v-if="userName" class="infoBox__infoValue">{{ userName }}</p>
        <form v-else @submit.prevent="handleSetUserRequest">
          <label for="userName">Set Username</label>
          <input
            id="userName"
            type="text"
            v-model.trim="userNameInput.value"
            @blur="update('userNameInput')"
            :class="{ invalid: !userNameInput.isValid }"
          />
          <p v-if="!userNameInput.isValid">
            User Name input cannot be empty and cant contain special symbols
            like - ?';_
          </p>

          <button>Click to set your nickname</button>
        </form>
      </div>
      <h3>
        Movies rated:
        <span v-if="moviesRated">{{ Object.keys(moviesRated).length }}</span>
      </h3>
      <movie-box-small :moviesRated="moviesRated"></movie-box-small>
      <h3>
        Tv shows rated
        <span v-if="tvShows">{{ Object.keys(tvShows).length || "0" }}</span>
      </h3>
      <tvshow-box-small :tvShows="tvShows"></tvshow-box-small>

      <h3>
        Actors rated
        <span v-if="actors">{{ Object.keys(actors).length || "0" }}</span>
      </h3>
      <person-box-small :actors="actors"></person-box-small>
    </div>
  </section>
</template>
<script>
import MovieBoxSmall from "../components/UI/UserAccount/MovieBoxSmall.vue";
import TvshowBoxSmall from "../components/UI/UserAccount/TvshowBoxSmall.vue";
import PersonBoxSmall from "../components/UI/UserAccount/PersonBoxSmall.vue";

export default {
  components: {
    MovieBoxSmall,
    TvshowBoxSmall,
    PersonBoxSmall,
  },

  mounted() {
    this.moviesRatedData();
    this.tvShowRatedData();
    this.actorsRatedData();
  },

  data() {
    return {
      moviesRated: null,
      tvShows: null,
      actors: null,

      userNameInput: { value: "", isValid: true },
      userID: this.$store.getters["UserAuth/userId"],
    };
  },
  computed: {
    email() {
      return this.$store.getters["UserAuth/userEmail"];
    },
    userName() {
      return this.$store.getters["UserAuth/userName"];
    },
  },

  methods: {
    validateUserName(userName) {
      const regEx = /^[a-zA-Z0-9]*$/;
      return regEx.test(String(userName));
    },
    update(type) {
      this[type].isValid = true;
    },
    validateForm() {
      if (
        !this.validateUserName(this.userNameInput.value) ||
        this.userNameInput.value === ""
      ) {
        this.userNameInput.value = "";
        this.userNameInput.isValid = false;
        return false;
      }
    },

    async handleSetUserRequest() {
      if (!this.validateForm() === false) {
        return;
      }

      try {
        this.$store.dispatch("UserAuth/setUserName", {
          userID: this.userID,
          userName: this.userNameInput.value,
        });
      } catch (err) {
        console.log(err);
      }
    },

    async moviesRatedData() {
      try {
        const response = await fetch(
          `https://movieapp-9f058-default-rtdb.firebaseio.com/Users/${this.userID}/ratedShows/movie.json`
        );
        const data = await response.json();
        if (data === null) {
          this.moviesRated = [];
        } else {
          this.moviesRated = data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async tvShowRatedData() {
      try {
        const response = await fetch(
          `https://movieapp-9f058-default-rtdb.firebaseio.com/Users/${this.userID}/ratedShows/tv.json`
        );
        const data = await response.json();
        if (data === null) {
          this.tvShows = [];
        } else {
          this.tvShows = data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async actorsRatedData() {
      try {
        const response = await fetch(
          `https://movieapp-9f058-default-rtdb.firebaseio.com/Users/${this.userID}/ratedShows/person.json`
        );
        const data = await response.json();

        if (data === null) {
          this.actors = [];
        } else {
          this.actors = data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style  scoped>
button {
  padding: 2rem;
}
.data {
  overflow: hidden;
}
.loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
}

h3 {
  text-align: center;
}

.loader h3 {
  font-size: 3rem;
  color: #292e2b;
}
.dataLoadingBox {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form {
  margin: 0 auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
}
input {
  padding: 0.5rem 0rem;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 2rem;
  text-align: center;
}
form p {
  font-size: 1rem;
}
form button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: black;
  border-radius: 15px;
  font-family: inherit;
  border: none;
  font-size: 1rem;
  color: White;
}

.ratedShows {
  width: 100%;
  padding: 3rem 0.5rem;
  display: flex;
  scroll-behavior: smooth;
  overflow-x: SCROLL;
  text-align: center;
  transition: all 1s;
}

.infoBox {
  margin: 3rem 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.InfoBox_typeOfInfo {
  width: 35%;
  text-align: right;
}

.infoBox__infoValue {
  display: block;
  width: 60%;
}

.invalid {
  border-color: red;
}
</style>