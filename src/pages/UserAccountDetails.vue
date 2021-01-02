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
      <div class="ratedShows movies">
        <div class="dataLoadingBox" v-if="!moviesRated">
          <h3>Loading data...</h3>
          <spinner></spinner>
        </div>
        <show-rated-box
          v-else
          v-for="(movie, key) of moviesRated"
          :id="key"
          :rate="moviesRated[key]"
          :key="movie"
          :isMovie="true"
        ></show-rated-box>
      </div>
      <h3>
        Tv shows rated
        <span v-if="tvShows">{{ Object.keys(tvShows).length || "0" }}</span>
      </h3>
      <div class="ratedShows tvShows">
        <div class="dataLoadingBox" v-if="!tvShows">
          <h3>Loading data...</h3>
          <spinner></spinner>
        </div>
        <show-rated-box
          v-else
          v-for="(show, key) of tvShows"
          :id="key"
          :rate="tvShows[key]"
          :key="show"
          :isMovie="false"
        ></show-rated-box>
      </div>
    </div>
  </section>
</template>
<script>
import ShowRatedBox from "../components/UI/ShowRatedBox.vue";

export default {
  components: {
    ShowRatedBox,
  },
  mounted() {
    this.moviesRatedData();
    this.tvShowRatedData();
  },

  data() {
    return {
      moviesRated: null,
      tvShows: null,
      userNameInput: { value: "", isValid: true },
      userID: this.$store.getters["userId"],
    };
  },
  computed: {
    email() {
      return this.$store.getters["userEmail"];
    },
    userName() {
      console.log(this.$store.getters["userName"]);
      return this.$store.getters["userName"];
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
        this.$store.dispatch("setUserName", {
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
          `https://movieapp-9f058-default-rtdb.firebaseio.com/${this.userID}/ratedShows/Movie.json`
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
          `https://movieapp-9f058-default-rtdb.firebaseio.com/${this.userID}/ratedShows/TvShow.json`
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
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  font-size: 2rem;
}
input {
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem 0rem;
  font-size: 2rem;
  text-align: center;
}
form p {
  font-size: 1rem;
}
form button {
  margin-top: 2rem;
  font-family: inherit;
  background: none;
  border: none;
  font-size: 1rem;
  color: White;
  padding: 1rem 2rem;
  background-color: black;
  border-radius: 15px;
}

.ratedShows {
  text-align: center;
  transition: all 1s;
  padding: 4rem 1rem;
  scroll-behavior: smooth;
  display: flex;
  width: 100%;
  overflow-x: SCROLL;
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