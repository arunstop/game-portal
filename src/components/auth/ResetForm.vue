<template>
  <v-form ref="reset-form">
    <p class="display-1">Reset Password</p>
    <p class="text-justify">
      After filling this form you will be sent a reset password request email by
      our system. Also note this:
    </p>
    <p class="font-weight-bold">
      If you recieved any password request emails but you feel you didn't
      request them, please
      <b class="error--text">DO NOT RESPOND.</b>
    </p>
    <v-text-field
      v-model="email.value"
      :rules="email.rules"
      class="mt-6"
      label="Email"
      type="email"
      outlined
      prepend-inner-icon="mdi-email"
      required
    />
    <v-btn block color="warning" large @click="resetPassword">
      Reset Password
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    email: {
      value: "",
      rules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email is not valid",
      ],
    },
  }),
  methods: {
    resetPassword() {
      this.$refs["reset-form"].validate();
    },
  },
};
</script>

<style>
</style>