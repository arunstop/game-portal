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
      v-model="confirmPassword.value"
      :rules="confirmPassword.rules"
      type="password"
      prepend-inner-icon="mdi-key"
    />

    <v-autocomplete
      v-model="dialCode.value"
      :rules="dialCode.rules"
      :items="countryList"
      item-text="name"
      item-value="unique_code"
      label="Country/Dial code"
      prepend-inner-icon="mdi-flag"
      outlined
      single-line
      auto-select-first
    >
      <template v-slot:selection="data">
        <v-img
          class="mx-0 me-2 rounded-sm"
          max-height="min-content"
          max-width="min-content"
          :src="countryFlagUrl(data.item.code)"
        />
        <strong class="me-1">{{
          data.item.name + " (" + data.item.dial_code + ")"
        }}</strong>
      </template>
      <template v-slot:item="data">
        <v-img
          class="mx-0 me-2 rounded-sm"
          max-height="min-content"
          max-width="min-content"
          :src="countryFlagUrl(data.item.code)"
        />
        <v-list-item-content>
          <v-list-item-title>
            <b>{{ data.item.name }}</b>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ data.item.code + " (" + data.item.dial_code + ")" }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>

    <v-text-field
      outlined
      required
      label="Phone Number"
      :prefix="(dialCode.value || '').slice(2) /*slicing the country code out*/"
      placeholder="81234567890"
      v-model="phone.value"
      :rules="phone.rules"
      type="number"
      prepend-inner-icon="mdi-phone"
    />

    <v-btn class="rounded-pill" block color="primary" large type="submit"> Register </v-btn>
    <v-btn class="rounded-pill mt-4" block color="error" large @click="resetForm">
      Clear
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
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
    dialCode: {
      value: "",
      rules: [(v) => !!v || "Country/Dial code is required"],
    },
    phone: {
      value: "",
      rules: [
        (v) => !!v || "Phone is required",
        (v) => v > 0 || "Incorrect format",
        (v) => (v && v.length) >= 10 || "Phone requires at least 10 characters",
      ],
    },
    // countryList: require('../../assets/country_dial_info.json'),
    countryList: [],
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
        this.$router.push(this.$store.state.lastVisitedPage);
      }
    },
    resetForm() {
      this.$refs["register-form"].reset();
    },
    countryFlagUrl(code) {
      return this.$api.call.extra.getCountryFlag(code);
    },
  },
  computed: {
    ...mapGetters(["countryFlag"]),
    confirmPassword: {
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
    // dialCode: {
    //   get() {
    //     return { value: "", rules: [(v) => !!v || "Code is required"] };
    //   },
    //   set(val){
    //     console.log(val+"ASDASDASASASD")
    //   }
    // },
    // phone: {
    //   get() {
    //     return { value: "", rules: [(v) => !!v || "Phone is required"] };
    //   },
    // },
  },
  mounted() {
    this.$api.call.github.getCountryList((response) => {
      this.countryList = response.data;
      this.countryList.filter(
        //anoher filter
        (v) => {
          v.unique_code = v.code + v.dial_code;
          if (v.code === "PS") {
            return (v.name = "State of Palestine");
          }
        }
      );
    });
  },
};
</script>

<style>
</style>