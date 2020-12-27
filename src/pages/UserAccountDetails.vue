<template>
  <section>
    <div class="loader" v-if="!email">
      <h3>Loading data...</h3>
      <spinner></spinner>
    </div>
    <div class="data" v-else>
      <div class="infoBox">
        <p class="InfoBox_typeOfInfo">Your Email:</p>
        <p>{{ email }}</p>
      </div>
      <div class="infoBox">
        <p class="InfoBox_typeOfInfo">Your userName:</p>
        <p v-if="userName">{{ userName }}</p>
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
      <div class="ratedMovies">
        <p>Movies rated</p>
        <div class="dataLoadingBox" v-if="!moviesRated">
          <h3>Loading data...</h3>
          <spinner></spinner>
        </div>
      </div>
      <div class="ratedShows">
        <p>Tv shows rated</p>
        <div class="dataLoadingBox" v-if="!tvShows">
          <h3>Loading data...</h3>
          <spinner></spinner>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      moviesRated: null,
      tvShows: null,
      userNameInput: { value: "", isValid: true },
    };
  },
  computed: {
    email() {
      return this.$store.getters["userEmail"];
    },
    userName() {
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
          userID: this.$store.getters["userId"],
          userName: this.userNameInput.value,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style  scoped>
.loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
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

.infoBox {
  margin: 3rem 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.InfoBox_typeOfInfo {
  width: 40%;
  text-align: right;
}

.invalid {
  border-color: red;
}
</style>