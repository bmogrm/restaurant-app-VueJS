<script>
//import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import PrimeButton from 'primevue/button'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'

export default {
  components: {
    PrimeButton,
    Menubar,
    InputText
  },
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/'
        },
        {
          label: 'Категории',
          icon: 'pi pi-fw pi-folder',
          route: '/categories'
        },
        {
          label: 'Блюда',
          icon: 'pi pi-fw pi-box',
          route: '/dishes'
        },
        {
          label: 'Ингредиенты',
          icon: 'pi pi-fw pi-box',
          route: '/ingredients'
        },
        {
          label: 'Рецепты',
          icon: 'pi pi-fw pi-box',
          route: '/recipes'
        }
      ]
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    user() {
      return this.authStore.user
    },
    authError() {
      return this.authStore.errorMessage
    }
  },
  methods: {
    logout() {
      this.authStore.logout()
    },
    login() {
      this.authStore.login({
        email: this.email,
        password: this.password
      })
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.authStore.isAuthenticated = true
      this.authStore.getUser()
    }
  }
}
</script>
<template class="main">
  <Menubar :model="items" class="custom-menubar">
    <!-- Логотип -->
    <template #start>
      <div class="logo-container">
        <img src="@/assets/logo.svg" alt="LOGO" class="logo" />
      </div>
    </template>

    <!-- Навигационные ссылки -->
    <template #item="{ item }">
      <router-link v-if="item.route" :to="item.route" class="nav-item">
        <span :class="item.icon"></span>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </template>

    <!-- Конец панели (авторизация или профиль) -->
    <template #end>
      <div class="auth-container">
        <div v-if="isAuthenticated && user" class="user-info">
          <span class="pi pi-fw pi-user user-icon"></span>
          <span class="user-name">{{ user.name }}</span>
          <PrimeButton @click="logout" class="logout-button">Выйти</PrimeButton>
        </div>
        <div v-else class="login-form">
          <form @submit.prevent="login" class="login-form-container">
            <InputText
              v-model="email"
              type="email"
              placeholder="Логин"
              class="login-input"
              :class="{ 'p-invalid': authError }"
            />
            <InputText
              v-model="password"
              type="password"
              placeholder="Пароль"
              class="login-input"
              :class="{ 'p-invalid': authError }"
            />
            <PrimeButton type="submit" class="login-button">Войти</PrimeButton>
          </form>
          <small v-if="authError" class="error-message">{{ authError }}</small>
        </div>
      </div>
    </template>
  </Menubar>
  <div v-if="isAuthenticated && user">
    <router-view />
  </div>
  <div v-else>Для просмотра содержимого авторизируйтесь</div>
</template>

<style scoped>
/* Основной стиль Menubar */
.custom-menubar {
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 10px 16px;
  color: #ecf0f1;
}

/* Логотип */
.logo-container {
  display: flex;
  align-items: center;
}
.logo {
  width: 40px;
  height: auto;
}

/* Навигация */
.nav-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ecf0f1;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}
.nav-item:hover {
  background-color: #34495e;
}
.nav-label {
  margin-left: 8px;
}

/* Авторизация / Профиль */
.auth-container {
  display: flex;
  align-items: center;
  gap: 16px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}
.user-icon {
  font-size: 1.5rem;
  color: #ecf0f1;
}
.user-name {
  font-weight: bold;
}
.logout-button {
  background-color: #e74c3c;
  border: none;
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.logout-button:hover {
  background-color: #c0392b;
}

/* Форма входа */
.login-form-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
.login-input {
  border-radius: 4px;
  padding: 6px 12px;
  border: 1px solid #bdc3c7;
}
.login-button {
  background-color: #2980b9;
  border: none;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.login-button:hover {
  background-color: #1f618d;
}

/* Ошибки */
.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
}
</style>
