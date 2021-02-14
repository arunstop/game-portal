<template>
  <v-col class="ma-0 pa-0">
    <v-btn
      class="mt-4"
      color="primary"
      :outlined="!toggleAdvSearch"
      @click.stop="toggleAdvSearch = true"
    >
      <v-icon class="me-2">mdi-database-search</v-icon>
      Advanced Search
    </v-btn>
    <home-adv-seach-dialog v-model="toggleAdvSearch" />
  </v-col>
</template>

<script>
import HomeAdvSeachDialog from './HomeAdvSeachDialog.vue';
export default {
  components: {
    HomeAdvSeachDialog,
    // HomeAdvSeachDialog: () =>
    //   import(
    //     /* webpackChunkName : "HomeAdvSeachDialog" */ "@/components/pages/home/HomeAdvSeachDialog.vue"
    //   ),
  },
  data() {
    return {
      toggleAdvSearch: false,
    };
  },
  methods: {},
  created() {},
};
</script>

<style>
.c-lh-30 {
  line-height: 30px;
}
</style>