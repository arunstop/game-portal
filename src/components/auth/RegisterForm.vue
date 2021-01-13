<template>
  <v-form ref="register-form" @submit.prevent="submitRegister">
    <p class="display-1">Join us!</p>
    <v-text-field
      outlined
      required
      label="Email"
      v-model="email.value"
      :rules="email.rules"
      type="email"
      prepend-inner-icon="mdi-email"
    />
    <v-row class="ma-0">
      <v-col class="px-0 py-0 pe-sm-2" cols="12" sm="6">
        <v-text-field
          label="First Name"
          v-model="firstName.value"
          :rules="firstName.rules"
          type="text"
          outlined
          required
        />
      </v-col>
      <v-col class="px-0 py-0 ps-sm-2" cols="12" sm="6">
        <v-text-field
          label="Last Name"
          v-model="lastName.value"
          :rules="lastName.rules"
          type="text"
          outlined
          required
        />
      </v-col>
    </v-row>
    <v-text-field
      outlined
      required
      label="Password"
      v-model="password.value"
      :rules="password.rules"
      type="password"
      prepend-inner-icon="mdi-lock"
    />
    <v-text-field
      outlined
      required
      label="Confirm Password"
      v-model="confirmPassword1.value"
      :rules="confirmPassword1.rules"
      type="password"
      prepend-inner-icon="mdi-key"
    />
    <v-text-field
      outlined
      required
      label="Phone (e.g. 082210381920)"
      v-model="phone.value"
      :rules="phone.rules"
      type="number"
      prepend-inner-icon="mdi-phone"
    />
    <v-autocomplete
      label="Country"
      v-model="country.value"
      :rules="country.rules"
      outlined
      :items="countryList"
      item-text="name"
      item-value="code"
      prepend-inner-icon="mdi-flag"
    />
    <v-btn block color="primary" large type="submit"> Register </v-btn>
    <v-btn class="mt-6" block color="error" large @click="resetForm">
      Clear
    </v-btn>
  </v-form>
</template>

<script>
// import countryList from "../../assets/countryList.json"

export default {
  data: () => ({
    email: {
      value: "",
      rules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email is not valid",
      ],
    },
    firstName: { value: "", rules: [(v) => !!v || "First Name is required"] },
    lastName: { value: "", rules: [(v) => !!v || "Last Name is required"] },
    password: {
      value: "",
      rules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length) >= 8 || "Password requires at least 8 characters",
      ],
    },
    confirmPassword: {
      value: "",
      rules: [
        (v) => !!v || "Confirm Password is required",
        (v) =>
          (v && v.length) >= 8 || "Password requires at least 8 characters",
      ],
    },
    phone: { value: "", rules: [(v) => !!v || "Phone is required"] },
    country: { value: "", rules: [(v) => !!v || "Country is required"] },
    countryList: require("../../assets/countryList.json"),
  }),
  methods: {
    submitRegister() {
      let registerForm = this.$refs["register-form"];
      if (registerForm.validate()) {
        this.$store.dispatch("auth/signIn", {
          email: this.email.value,
          password: this.password.value,
          lastSession: Date.now(),
        });
        this.$router.push("/");
      }
    },
    resetForm() {
      this.$refs["register-form"].reset();
    },
  },
  computed: {
    confirmPassword1: {
      get() {
        return {
          value: "",
          rules: [
            (v) => !!v || "Confirm Password is required",
            (v) =>
              (v && v.length) >= 8 || "Password requires at least 8 characters",
            (v) =>
              v === this.password.value ||
              "Confirmation password doesn't match",
          ],
        };
      },
    },
  },
};
</script>

<style>
</style>