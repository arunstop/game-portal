<template>
    <v-form @submit.prevent="loginFormHandler" ref="loginForm">
      <p class="display-1">
        Login to proceed!
    </p>
      <v-text-field
        label="Email"
        type="email"
        outlined
        prepend-inner-icon="mdi-email"
        required
      />
      <v-text-field
        label="Password"
        type="password"
        outlined
        prepend-inner-icon="mdi-lock"
        required
      />
      <v-btn block color="primary" type="submit" large> Login </v-btn>
    </v-form>
</template>

<script>
export default {
  methods:{
    loginFormHandler(){
      this.$router.push('/about')
    }
  }
  
};
</script>

<style>
</style>