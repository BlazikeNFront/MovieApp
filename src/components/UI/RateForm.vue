<template>
  <form ref="form">
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="expli"
      @click="handleRate(1)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="expli"
      @click="handleRate(2)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="expli"
      @click="handleRate(3)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="expli"
      @click="handleRate(4)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="expli"
      @click="handleRate(5)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="expli"
      @click="handleRate(6)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="expli"
      @click="handleRate(7)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="expli"
      @click="handleRate(8)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="expli"
      @click="handleRate(9)"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="expli"
      @click="handleRate(10)"
    />
  </form>
</template>
<script>
export default {
  props: ["Id", "isM"],
  mounted() {
    this.form = Array.from(this.$refs.form.children);
    console.log(this.Id, this.isM);
  },
  data() {
    return {
      formRate: null,
      form: null,
      isMovie: this.isM,
      showId: this.Id,
    };
  },
  methods: {
    async handleRate(val) {
      this.form.forEach((element) => element.classList.remove("checked"));
      for (let i = 0; i < val; i++) {
        this.form[i].classList.add("checked");
      }
      console.log(this.showId);
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  width: 18rem;
  background-color: black;
  justify-content: center;
}
.expli {
  margin: 0.2rem;
  font-size: 1.4rem;
  color: grey;
  transition: all 0.2s ease;
  margin: 0.5rem 0rem;
}
.checked {
  color: yellow;
}

/* .expli:hover ~ .expli,
.expli:hover ~ .expli ~ .expli {
  color: #fd4;
} */
</style>

