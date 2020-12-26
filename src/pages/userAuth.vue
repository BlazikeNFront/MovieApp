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
      <button>Login</button>
      <spinner class="spinner" v-if="isLoading"></spinner>
      <p v-if="!!error">{{ error }}</p>
    </form>
    <h4>You dont have account? Click below and Sing Up !</h4>
    <base-button CSS="userAuth" class="signup">Sign up</base-button>
    <h4 class="signUpText">
      Dont have an account?? <router-link to="/signUp">Sign UP !</router-link>
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
        let errorText = err.message.replace("Error:", "");
        const typeOfError = err.message.replace("Error:", "").indexOf(":");

        if (typeOfError > -1) {
          errorText = errorText.split(":")[1] || "Failed to sign In";
        } else {
          errorText = errorText.replace(/_/g, " ") || "Failed to sign In";
        }
        this.error = errorText;
      }

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
section {
  margin: 20rem 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signUpText {
  width: 30rem;
  font-size: 2rem;
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

.email {
  width: 24rem;
}
.password {
  font-weight: bolder;
}

.signup {
  margin-top: 1rem;
  width: 10rem;
  font-size: 1.5rem;
}
p {
  margin-top: 1rem;
}

.spinner {
  transform: scale(0.7);
}
</style>