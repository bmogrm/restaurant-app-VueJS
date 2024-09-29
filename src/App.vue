<script setup>
import { useAuthStore } from "@/stores/authStore";
import { ref, computed, onMounted } from "vue";

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

// Вычисляемые свойства
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
const authError = computed(() => authStore.errorMessage);

// Методы
const logout = () => {
  authStore.logout();
};

const login = () => {
  authStore.login({ email: email.value, password: password.value });
};

// Монтирование
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    authStore.isAuthenticated = true;
    authStore.getUser();
  }
});
</script>

<template>
  <header>
    <nav>
      <div v-if="isAuthenticated && user">
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
