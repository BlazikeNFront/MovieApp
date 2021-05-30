<template>
  <section>
    <base-card>
      <h2>Sign Up</h2>
      <form @submit.prevent="submitForm()">
        <div class="formElement">
          <label for="email">E-mail</label>
          <input
            type="email"
            name="email"
            v-model.trim="email.value"
            @blur="update('email')"
            :class="{ invalid: !email.isValid }"
            autocomplete="username"
          />
          <p v-if="!email.isValid">Invalid email</p>
        </div>

        <div class="formElement">
          <label for="password"> Password</label>
          <input
            name="password"
            type="password"
            v-model.trim="passwords.value1"
            autocomplete="“new-password”"
            @blur="update('passwords')"
            :class="{ invalid: !passwords.isValid }"
          />
          <label for="passwordConfirmation"> Confirm password</label>
          <input
            name="passwordConfirmation"
            type="password"
            autocomplete="new-password"
            v-model.trim="passwords.value2"
            @blur="update('passwords')"
            :class="{ invalid: !passwords.isValid }"
          />
          <p v-if="!passwords.isValid">
            Password do not match ! Please try again
          </p>
        </div>
        <p v-if="!!errorText" class="errorText">{{ errorText }}</p>
        <div class="buttonSpinnerContainer">
          <button>SIGN UP</button>
          <spinner class="spinner" v-if="isLoading"></spinner>
        </div>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      errorText: null,
      email: {
        value: "",
        isValid: true,
      },

      passwords: {
        value1: "",
        value2: "",
        isValid: true,
      },
    };
  },

  methods: {
    update(type) {
      this[type].isValid = true;
    },

    validateForm() {
      if (
        this.passwords.value1 !== this.passwords.value2 ||
        this.passwords.value1 === "" ||
        this.passwords.value2 === ""
      ) {
        this.password = "";
        this.passwordConfirmation = "";
        this.passwords.isValid = false;
        return false;
      }
      if (!this.validateMail(this.email.value) || this.email.value === "") {
        this.email.value = "";
        this.email.isValid = false;
        return false;
      }
    },
    validateMail(email) {
      const regEx = /\S+@\S+\.\S+/;
      return regEx.test(String(email).toLowerCase());
    },

    async submitForm() {
      this.errorText = null;
      this.isLoading = true;
      if (this.validateForm() === false) {
        this.isLoading = false;
        return;
      }

      try {
        await this.$store.dispatch("UserAuth/signUp", {
          email: this.email.value,
          password: this.passwords.value1,
        });
        this.$router.push("/");
      } catch (err) {
        this.errorText = err.message.split(":")[1].replace(/_/g, " ");
      }
      this.isLoading = false;
    },
  },
};
</script>
<style scoped>
section {
  margin: 5rem auto;
  width: 90%;
  background-color: #292e2b;
  border-radius: 20px;
}

h2 {
  font-size: 3rem;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  font-size: 1.5rem;
}

.formElement {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin-top: 0.7rem;
  margin-bottom: 2rem;
  padding: 0.3rem 0;
  height: 3rem;
  border: 2px solid black;
  border-radius: 10px;
  text-align: center;
  font-size: 1.5rem;
  font-family: inherit;
}
p {
  font-size: 1rem;
  text-align: center;
}
.invalid {
  border-color: red;
}

.buttonSpinnerContainer {
  float: left;
}
.spinner {
  transform: scale(0.7);
  text-align: center;
}
.errorText {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: red;
}
</style>
