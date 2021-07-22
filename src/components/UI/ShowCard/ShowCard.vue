<template>
  <div class="box" v-if="active.gender !== '0'">
    <show-box v-if="!actor" :active="active"></show-box>
    <person-box v-else :personInfo="active"></person-box>
  </div>
</template>

<script>
import PersonBox from "./PersonBox.vue";
import ShowBox from "./ShowBox.vue";

export default {
  components: {
    PersonBox,
    ShowBox,
  },
  props: ["active", "actor"],
};
</script>
<style scoped>
.box {
  margin: 1rem auto;
  width: 95%;
  border-radius: 10px;
  background-color: black;
  box-shadow: 4px 10px 15px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}
</style>