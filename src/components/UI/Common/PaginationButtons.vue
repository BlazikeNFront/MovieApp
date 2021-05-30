<template>
  <div class="paginationButtons__wrapper">
    <ol class="paginationButtons" v-if="numberOfPages">
      <li
        class="page"
        v-for="page in pageNumbers"
        :key="page"
        :class="[currentPage === page ? 'active' : '']"
        @click="$emit('pageChange', page)"
      >
        {{ page }}
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  props: ["numberOfPages", "currentPage"],
  emits: ["pageChange"],
  computed: {
    pageNumbers() {
      const arrayOfPageNumbers = Array.from(Array(this.numberOfPages).keys());
      if (arrayOfPageNumbers.length < 20) {
        return arrayOfPageNumbers;
      } else if (this.currentPage <= 2) {
        return arrayOfPageNumbers.slice(1, 21);
      } else {
        const pageNumberToRender = arrayOfPageNumbers.slice(
          this.currentPage - 2,
          this.currentPage + 20
        );
        return pageNumberToRender;
      }
    },
  },
};
</script>
<style scoped>
.paginationButtons__wrapper {
  margin: 0 auto;
  width: 90%;
}
.paginationButtons {
  display: flex;
  flex-wrap: wrap;
}
.page {
  margin: 0.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--main-color);
  cursor: pointer;
  letter-spacing: 1px;
}
.active {
  color: red;
  box-shadow: 0 0 0 4px;
}
</style>