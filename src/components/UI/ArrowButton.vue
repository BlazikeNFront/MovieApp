<template>
  <div class="arrow">
    <div class="arrowPart arrow-top"></div>
    <div class="arrowPart arrow-bottom"></div>
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

.arrowPart {
  width: 0.4rem;
  height: 50%;
  background-color: rgba(139, 139, 139, 0.8);
}
.arrow-top {
  transform: rotate(45deg);
  border-radius: 3px 3px 0 0;
}
.arrow-bottom {
  transform: translate(0, -1rem) rotate(-45deg);
  border-radius: 0 0 3px 3px;
}
</style>