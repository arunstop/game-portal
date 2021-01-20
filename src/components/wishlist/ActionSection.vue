<template>
  <v-row class="ma-4 mt-6">
    <v-btn class="text-decoration-none ms-auto" outlined @click="clearWishList" color="error">
      Clear Wish List
    </v-btn>
  </v-row>
</template>

<script>
export default {
  methods: {
    clearWishList() {
      this.$store.dispatch("ui/showDialog", {
        title: "Empty Wish List",
        message:
          "Are you sure you want to clear your wish list? Once this action is executed, it cannot be undone.",
        okAction: () => {
          this.$store.dispatch("auth/wishList/empty");
        },
      });
    },
  },
};
</script>

<style>
</style>