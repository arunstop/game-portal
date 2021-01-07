<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <hot-list />
  </div>
</template>

<script>
import HotList from "../components/home/HotList.vue";
export default {
  components: { HotList },
  name: "Home",
};
</script>

<style scoped>
.scrolls {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 10px 10px transparent;
  border: solid 3px transparent; */
  background-color: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px 10px #1976d2;
  border: solid 3px transparent;
  border-radius: 12px;
}
</style>
