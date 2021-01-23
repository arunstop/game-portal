<template>
  <div class="d-flex pa-4">
    <v-card
      class="my-auto mx-auto flex-fill"
      outlined
      max-width="480"
      elevation="12"
    >
      <v-col class="px-6 py-4">
        <v-img
          class="mx-auto my-6"
          :src="require('@/assets/logo.svg')"
          max-width="60"
        />
        <v-expand-transition>
          <login-form v-if="form === 'login'" />
          <register-form v-if="form === 'register'" />
          <reset-form v-if="form === 'reset'" />
        </v-expand-transition>
        <v-col class="mt-4">
          <v-btn
            class="font-weight-bold"
            text
            block
            large
            v-if="form != 'login'"
            @click="showForm('login')"
          >
            login here
          </v-btn>
          <v-divider class="my-2" v-if="form != 'login'" />
          <v-btn
            class="font-weight-bold"
            text
            block
            large
            v-if="form != 'register'"
            @click="showForm('register')"
          >
            Register here
          </v-btn>
          <v-divider class="my-2" v-if="form === 'login'" />
          <v-btn
            class="font-weight-bold"
            text
            block
            large
            v-if="form != 'reset'"
            @click="showForm('reset')"
          >
            Reset password
          </v-btn>
        </v-col>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import LoginForm from "../components/pages/auth/LoginForm.vue";
import RegisterForm from "../components/pages/auth/RegisterForm.vue";
import ResetForm from "../components/pages/auth/ResetForm.vue";

export default {
  components: { LoginForm, RegisterForm, ResetForm },

  name: "Auth",
  data: () => ({
    form: "login",
  }),
  methods: {
    showForm(formName) {
      return (this.form = formName);
    },
  },
};
</script>

<style>
</style>