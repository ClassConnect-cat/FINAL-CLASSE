<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const isAuthenticated = computed(() => store.state.isAuthenticated);
const router = useRouter();

const logout = () => {
  // Llama a la acción o mutación de logout en tu store
  // store.dispatch('logout'); // O store.commit('logout');
  store.commit('logout')
  // Redirige a la página de inicio u otra página después de cerrar sesión
  router.push('/');
};

const uid = ref('');
const getData = token => JSON.parse(atob(token.split(/\./)[1]));
const token = localStorage.getItem('token');

if(token) {
  const data = getData(token);
  if(data.id)
    uid.value = data.id;
}
</script>

<template>
  <header>
    <h1 class="titolHeader">Class Connect</h1>
    <div class="header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="!isAuthenticated" to="/login" id="login">Login</RouterLink>
        <RouterLink v-if="!isAuthenticated" to="/register" id="register">Register</RouterLink>
        <RouterLink v-if="isAuthenticated" :to="'/profile/'+ uid" id="profile" >Perfil</RouterLink>
        <button v-if="isAuthenticated" @click="logout" class="logout">Logout</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>



  /*fetch(`http://hanna.gg:3000/normal`){
    username.value = userInfo.name;
    userEmail.value = userInfo.email;
    description.value = userInfo.description ?? '';
  }*/
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 500px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    justify-content: space-between;
    margin-bottom: 5%;
  }
  
  .logo {
    margin: 0 2rem 0 0;
  }

  header .header {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

  .titolHeader{
    color: rgb(0, 179, 255);;
  }

  .logout{
    border-radius: 20px;
    background: #ff0000;
    color: var(--white-100, #FFF);
    font-size: 15px;
    padding: 2%;
    border: none;
    cursor: pointer;
  }

}
</style>
