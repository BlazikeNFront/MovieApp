<template>
  <section>
    <h3>Login</h3>
    <form @submit.prevent="submitForm()">
      <label for="email">E-mail</label>
      <input class="email" type="email" name="email" v-model="email" />
      <label for="password">Password</label>
      <input
        class="password"
        type="password"
        name="password"
        autocomplete="on"
        v-model="password"
      />
      <button class="button login">Login</button>
      <spinner class="spinner" v-if="isLoading"></spinner>
      <p v-if="!!error">{{ error }}</p>
    </form>

    <h4 class="signUpText">
      Dont have an account??
      <router-link to="/signUp"> Click to Sign UP !</router-link>
    </h4>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      error: null,
    };
  },

  methods: {
    async submitForm() {
      this.error = null;
      this.isLoading = true;
      try {
        await this.$store.dispatch("signIn", {
          email: this.email,
          password: this.password,
          returnSecureToken: true,
        });
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        let errorText = err.message.replace("Error:", "");
        const typeOfError = err.message.replace("Error:", "").indexOf(":");

        if (typeOfError > -1) {
          errorText = errorText.split(":")[1] || "Failed to sign In";
        } else {
          errorText = errorText.replace(/_/g, " ") || "Failed to sign In";
        }
        this.error = errorText;
        this.password = "";
      }

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
section {
  margin: 13rem 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signUpText {
  width: 30rem;
  font-size: 2rem;
  margin-top: 11rem;
}

a {
  text-decoration: none;
}
h3 {
  font-size: 3rem;
}

h4 {
  margin-top: 2rem;
  text-align: center;
  line-height: 2rem;
  width: 16rem;
  line-height: 3rem;
}

form {
  margin-top: 2rem;
  text-align: center;
}
label {
  font-size: 1.5rem;
}
input {
  margin-top: 0.7rem;
  margin-bottom: 2rem;
  height: 3rem;
  border: 2px solid black;
  border-radius: 10px;
  text-align: center;
  font-size: 1.5rem;
  font-family: inherit;
}

button {
  font-family: inherit;
  border-radius: 20px;
  background-color: none;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
  width: 20rem;
  font-size: 2rem;
  padding: 0.7rem 2rem;
}
.email {
  width: 24rem;
}
.password {
  font-weight: bolder;
}

p {
  margin-top: 1rem;
}

.spinner {
  position: absolute;
  margin-left: 7rem;

  transform: scale(0.7);
}
</style>