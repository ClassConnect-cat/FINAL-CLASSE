<script setup>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';

const classes = ref([]);

onBeforeMount(async () => {

  try {
    // const response = await axios.get('http://localhost:3000/restaurantes');
    const response = await axios(
      {
        method: 'get',
        url: 'http://localhost:3000/languages',
        withCredentials: false,
      }
    )
    classes.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error al obtener la lista de restaurantes', error);
  }


})
</script>

<template>
  <main>
      <h1 class="homeTitle">Enciende tu éxito con nuestros profesores particulares</h1>
      <p class="homeText">Desbloquea tu potencial académico con la guía experta de nuestros profesores particulares. ¡Transforma tus metas en logros con el apoyo personalizado que necesitas!</p>
      <ul v-if="classes" class="classList">
        <li class="class" v-for="classe in classes" :key="classe._id">
          <router-link :to="{ name: 'class', params: {id: classe._id}}" class="classe">{{ classe.idioma }}</router-link>
        </li>
      </ul>
  </main>
</template>
<style>
  .class{
    color: black;
    list-style: none;
    display: flex;
    border-radius: 20px;
    background: #FFF;
    box-shadow: 5px 4px 30px 0px rgba(0, 0, 0, 0.10);
  }
  .classe{
    padding: 50px;
    border-radius: 20px;
  }
  .classList{
    display: flex;
    gap: 20px;
  }
  .homeTitle{
    font-size: 28px;
    color: #333;
    text-align: center;
    margin-bottom: 50px;
  }
  .homeText{
    font-size: 18px;
    color: #333;
    text-align: center;
    margin-bottom: 100px;
  }
</style>