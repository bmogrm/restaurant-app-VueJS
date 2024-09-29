<script setup>
import { useAuthStore } from "@/stores/authStore";
export deafult {
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError() {
      return this.authStore.errorMessage;
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
    login() {
      this.authStore.login({email. this.email, password: this.password});
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
};
</script>

<template>
  <header>
    <nav>
      <div v-if="'isAuthenticated && user'">
        Добро пожаловать, {{ user.name }}
        <button @click="logout">Выйти</button>
      </div>
      <div v-else>
        <form @submit.prevent="login">
          <div>
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" required />
          </div>
          <div>
            <label for="password">Пароль:</label>
            <input type="password" v-model="password" id="password" required />
          </div>
          <button type="submit">Войти</button>
          <p v-if="authError" class="error">{{ authError }}</p>
        </form>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.error {
  color: red;
}
</style>
