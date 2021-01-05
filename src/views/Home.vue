<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <v-row class="justify-space-around ma-0 pa-0">
      <item-card/>
      <item-card/>
      <item-card/>
      <item-card/>
      <item-card/>
      <item-card/>
      <item-card/>
      <item-card/>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ItemCard from '../components/ItemCard.vue';

export default {
  name: "Home",
  components: {
    HelloWorld,
    ItemCard,
  },
};
</script>
