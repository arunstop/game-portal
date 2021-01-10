<template>
  <v-form @submit.prevent="loginFormHandler" ref="loginForm">
    <p class="display-1">Login to proceed!</p>
    <v-text-field
      label="Email"
      type="email"
      v-model="email"
      outlined
      prepend-inner-icon="mdi-email"
      required
    />
    <v-text-field
      label="Password"
      type="password"
      v-model="password"
      outlined
      prepend-inner-icon="mdi-lock"
      required
    />
    <v-btn block color="primary" type="submit" large> Login </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginFormHandler() {
      this.$store.dispatch("auth/signIn", {
        email: this.email,
        password: this.password,
        lastSession: Date.now(),
      });
      this.$router.push("/about");
    },
  },
};
</script>

<style>
</style>