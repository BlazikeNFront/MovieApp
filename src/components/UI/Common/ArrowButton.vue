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
  left: 50%;
  width: 3rem;
  height: 5rem;
  cursor: pointer;
}

.arrowPart {
  width: 0.4rem;
  height: 50%;
  background-color: rgba(139, 139, 139, 0.8);
}
.arrow-top {
  border-radius: 3px 3px 0 0;
  transform: rotate(45deg);
}
.arrow-bottom {
  border-radius: 0 0 3px 3px;
  transform: translate(0, -1rem) rotate(-45deg);
}
</style>