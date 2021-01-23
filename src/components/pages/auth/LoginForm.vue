<template>
  <v-form ref="login-form" @submit.prevent="submitLogin">
    <p class="display-1">Login to proceed!</p>
    <v-text-field
      label="Email"
      type="email"
      v-model="email.value"
      :rules="email.rules"
      outlined
      prepend-inner-icon="mdi-email"
      required
    />
    <v-text-field
      label="Password"
      type="password"
      v-model="password.value"
      :rules="password.rules"
      outlined
      prepend-inner-icon="mdi-lock"
      required
    />
    <v-btn block color="primary" large type="submit"> Login </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      email: {
        value: "",
        rules: [
          (v) => !!v || "Email is required",
          (v) => /.+@.+\..+/.test(v) || "Email is not valid",
        ],
      },
      password: {
        value: "",
        rules: [
          (v) => !!v || "Password is required",
          (v) => (v && v.length) >= 8 || "Password is too short (min 8 characters)",
        ],
      },
    };
  },
  methods: {
    submitLogin() {
      let loginForm = this.$refs["login-form"];
      if (loginForm.validate() === true) {
        this.$store.dispatch("auth/signIn", {
          email: this.email.value,
          password: this.password.value,
          lastSession: Date.now(),
        });
        this.$router.push("/");
      }

      // this.$store.dispatch("ui/showSnackbar", {
      //   message: `Login success! Hello ${this.email}`,
      //   type: `success`,
      // });
    },
  },
};
</script>

<style>
</style>