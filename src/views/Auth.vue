<template>
  <div class="d-flex pa-4">
    <v-card
      class="my-auto mx-auto flex-fill rounded-lg"
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
          <!-- login form -->
          <login-form v-if="form === 'login'" />
          <!-- register form -->
          <register-form v-if="form === 'register'" />
          <!-- reset password form -->
          <reset-form v-if="form === 'reset'" />
        </v-expand-transition>
        <v-col>
          <!-- 'OR' divider -->
          <v-btn
            class="my-4 font-weight-bold text-h5"
            text
            block
            large
            disabled
          >
            <v-divider/>
            <span class="mx-2">OR</span>
            <v-divider/>
          </v-btn>
          <!-- login form button -->
          <v-btn
            class="font-weight-bold text-none text-body-1"
            text
            large
            link
            v-if="form != 'login'"
            @click="showForm('login')"
          >
            <v-icon class="me-2">mdi-login</v-icon>
            Already have an account ? Login here
          </v-btn>
          <!-- <v-divider class="my-4" v-if="form != 'login'" /> -->
          <!-- register form button -->
          <v-btn
            class="font-weight-bold text-none text-body-1"
            text
            large
            link
            v-if="form != 'register'"
            @click="showForm('register')"
          >
            <v-icon class="me-2">mdi-account-plus</v-icon>
            Do not have account ? Register here
          </v-btn>
          <!-- <v-divider class="my-4" v-if="form === 'login'" /> -->
          <!-- reset password form button -->
          <v-btn
            class="font-weight-bold text-none text-body-1"
            text
            large
            link
            v-if="form != 'reset'"
            @click="showForm('reset')"
          >
            <v-icon class="me-2">mdi-lock-reset</v-icon>
            Forgot your password? Reset password here
          </v-btn>
        </v-col>
      </v-col>
    </v-card>
  </div>
</template>

<script>
// import LoginForm from "../components/pages/auth/LoginForm.vue";
// import RegisterForm from "../components/pages/auth/RegisterForm.vue";
// import ResetForm from "../components/pages/auth/ResetForm.vue";

export default {
  components: {
    LoginForm: () =>
      import(
        /*webpackChunkName: "LoginForm" */ "../components/pages/auth/LoginForm.vue"
      ),
    RegisterForm: () =>
      import(
        /*webpackChunkName: "RegisterForm" */ "../components/pages/auth/RegisterForm.vue"
      ),
    ResetForm: () =>
      import(
        /*webpackChunkName: "ResetForm" */ "../components/pages/auth/ResetForm.vue"
      ),
  },

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