<template>
  <v-form ref="registerForm">
    <p class="display-1">Join us!</p>
    <v-text-field
      outlined
      required
      label="Email"
      type="email"
      prepend-inner-icon="mdi-email"
    />
    <v-row class="ma-0">
      <v-col class="px-0 py-0 pe-sm-4" cols="12" sm="6">
        <v-text-field label="First Name" type="text" outlined required />
      </v-col>
      <v-col class="px-0 py-0 ps-sm-4" cols="12" sm="6">
        <v-text-field label="Last Name" type="text" outlined required />
      </v-col>
    </v-row>
    <v-text-field
      outlined
      required
      label="Password"
      type="password"
      prepend-inner-icon="mdi-lock"
    />
    <v-text-field
      outlined
      required
      label="Confirm Password"
      type="password"
      prepend-inner-icon="mdi-key"
    />
    <v-text-field
      outlined
      required
      label="Phone (e.g. 082210381920)"
      type="text"
      prepend-inner-icon="mdi-phone"
    />
    <v-autocomplete label="Country" outlined :items="countryList" item-text="name" item-value="code" prepend-inner-icon="mdi-flag"/>
    <v-btn block color="primary" type="submit" large @click="submitForm">
      Register
    </v-btn>
    <v-btn class="mt-6" block color="error" large @click="clearForm">
      Clear
    </v-btn>
  </v-form>
</template>

<script>
// import countryList from "../../assets/countryList.json"

export default {
  data: () => ({
      countryList : require("../../assets/countryList.json")
  }),
  methods: {
    submitForm() {
      this.$refs.registerForm.submit();
    },
    clearForm() {
      this.$refs.registerForm.reset();
    },
  },
};
</script>

<style>
</style>