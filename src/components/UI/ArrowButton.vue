<template>
  <div class="arrow">
    <div class="arrow-top"></div>
    <div class="arrow-bottom"></div>
  </div>
</template>
<script>
export default {};
</script>
<style  scoped>
.arrow {
  cursor: pointer;
  height: 5rem;
  width: 3rem;
  left: 50%;
}
.arrow-top {
  width: 0.5rem;
  height: 50%;
  background-color: rgba(139, 139, 139, 0.8);
  transform: rotate(45deg);
  border-radius: 3px 3px 0 0;
}
.arrow-bottom {
  width: 0.5rem;
  height: 50%;
  background-color: rgba(139, 139, 139, 0.8);
  transform: translate(0, -1rem) rotate(-45deg);
  border-radius: 0 0 3px 3px;
}
</style>