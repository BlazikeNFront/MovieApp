<template>
  <section>
    <h3>Login</h3>
    <form @submit.prevent="submitForm()">
      <div class="formControl">
        <label for="email">E-mail</label>
        <input class="email" type="email" name="email" v-model="email" />
      </div>
      <div class="formControl">
        <label for="password">Password</label>
        <input
          class="password"
          type="password"
          name="password"
          autocomplete="on"
          v-model="password"
        />
      </div>
      <button class="button button--login">Login</button>
      <spinner class="spinner" v-if="isLoading"></spinner>
      <p v-if="!!error" class="errorMsg">{{ error }}</p>
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
        await this.$store.dispatch("UserAuth/signIn", {
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
  margin: 10rem auto;
  padding: 3rem 0rem;
  width: 90%;
  border-radius: 20px;
  background-color: #292e2b;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signUpText {
  margin-top: 11rem;
  width: 30rem;
  font-size: 2rem;
}

a {
  text-decoration: none;
}
h3 {
  font-size: 3rem;
}
.formControl {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h4 {
  margin-top: 2rem;
  width: 16rem;
  text-align: center;
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

.button--login {
  padding: 1rem 5rem;
  border-radius: 20px;
  background-color: var(--main-color);
  font-size: 2rem;
}
.spinner {
  position: absolute;
  margin-left: 7rem;
  transform: scale(0.7);
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
.errorMsg {
  color: red;
}
a {
  margin: 1rem auto;
  padding: 0.5rem 0;
  width: 25rem;
  border-radius: 20px;
  background-color: var(--main-color);
  display: block;
  color: black;
}
</style>