<script setup>
  import { ref, onBeforeMount } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const id = ref(route.params.id)
  watch(
    () => route.params.id,
    newId => id.value = newId
  )

  const clase = ref('');
  const profes = ref('');

  onBeforeMount(async () => {

  try {
    // const response = await axios.get('http://localhost:3000/restaurantes');
    const response = await axios(
      {
        method: 'get',
        url: `http://localhost:3000/languages/${id.value}`,
        withCredentials: false,
      }
    )
    clase.value = response.data.idioma;

    const response2 = await axios(
      {
        method: 'get',
        url: `http://localhost:3000/user/all`,
        withCredentials: false,
      }
    )
    profes.value = response2.data;
  } catch (error) {
    console.error('Error al obtener la lista de restaurantes', error);
  }
  console.log(profes);

})
</script>

<template>
  <main>
    <h1>{{ clase }}</h1>
      <ul v-if="profes">
        <li class="listUsers" v-for="profe in profes" :key="profe._id">
          <router-link class="users" :to="{ name: 'profile', params: {id: profe._id}}">{{ profe.name + "\t" + profe.email}}</router-link>
        </li>
      </ul>
  </main>
</template>

<script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { watch } from 'vue';
</script>

<style>
  .listUsers {
    list-style: none;
    gap: 100px;
    display: grid;
  }
  .users {
    text-decoration: none;
    color: black;
  }
  .users:hover {
    background-color: lightblue;
  }
</style>
