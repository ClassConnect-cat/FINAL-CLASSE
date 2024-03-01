<template>
  <div class="about">
    <div class="datos">
      <h1 class="titulo">Perfil</h1>
      <img class="profile" src="./img/perfil-de-usuario.jpg" alt="Foto de perfil">
      <p>Username: {{ username }}</p>
      <p>Gmail: {{ userEmail }}</p>
      <button @click="claseOnline" class="onlineClass">Ir a Clase</button>
    </div>
    <div class="apps">
      <Chat></Chat>
      <Calendar></Calendar>
    </div>
    <div class="descripcion">
    <h2>Descripción:</h2>
    <!-- <p class="texto" id="texto" :contenteditable="visual" @click="actualizarTexto">{{ description }}</p> -->
    <p class="texto" id="texto" :contenteditable="visual">{{ description }}</p>
    <button @click="actualizarTexto" class="saveChanges">Guardar Cambios</button>
  </div>

  </div>
</template>


<script setup>
import Chat from '../components/Chat.vue'
import Calendar from '../components/Calendar.vue'
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const userEmail = ref('');
const description = ref('');
const cookie = sessionStorage.getItem('loged');
const visual = ref('false');

if(cookie){
  visual.value = 'true';
}

console.log(visual);

async function claseOnline() {
  try {
    const response = await axios(
      {
        method: 'get',
        url: `http://localhost:3000/user/email/${userEmail.value}`,
        withCredentials: false,
      }
    )
    console.log(response);
    if(response.data.profe === 'false'){
      window.location.href = "https://class-connect.whereby.com/class-connectbaeb8fc1-f7c4-475a-95cb-387bb2b5cd98";
    }else{
      window.location.href = "https://class-connect.whereby.com/class-connectbaeb8fc1-f7c4-475a-95cb-387bb2b5cd98?roomKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5nSWQiOiI4MzIyMDQ0NCIsInJvb21SZWZlcmVuY2UiOnsicm9vbU5hbWUiOiIvY2xhc3MtY29ubmVjdGJhZWI4ZmMxLWY3YzQtNDc1YS05NWNiLTM4N2JiMmI1Y2Q5OCIsIm9yZ2FuaXphdGlvbklkIjoiMjE0MTIxIn0sImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuc3J2LndoZXJlYnkuY29tIiwiaWF0IjoxNzA4OTUxNDg0LCJyb29tS2V5VHlwZSI6Im1lZXRpbmdIb3N0In0.RljB0Pu_FaTKlgyDazLcplfTU_BTEDMPl-sloFgiqQ0";
    }
  } catch (error) {
    console.error(error);
  }
}

function actualizarTexto() {
  const texto = document.getElementById("texto").textContent;
  fetch(`http://localhost:3000/user/id/${id}`, {
    method: 'PUT',
    body: new URLSearchParams({ description: texto }).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem("token")
    }
  }).then(d => {
    console.log(d.ok)
    if(d.ok) return d.text();
    throw new Error();
  }).catch(e => {
    alert('Error al actualitzar el text');
  })
}
const getData = token => JSON.parse(atob(token.split(/\./)[1]));
const id = getData(localStorage.getItem("token")).id;
fetch(`http://localhost:3000/user/id/${id}`).then(d => d.json()).then(userInfo => {
  username.value = userInfo.name;
  userEmail.value = userInfo.email;
  description.value = userInfo.description ?? '';
})
</script>


<style scoped>
.titulo{
  color: #000;
  font-size: 30px;
  margin-bottom: 5%;
}

.content {
  text-align: left; /* Alinear el contenido a la izquierda */
}

.profile {
  border-radius: 50%; /* Hacer la imagen redonda */
  width: 150px; /* Establecer el tamaño deseado */
  height: 150px; /* Establecer el tamaño deseado */
  margin-bottom: 5%;
}

.texto{
  border-radius: 5px;
  border: 2px solid #858585;
  background: #FFF;
  height: 70px;
  flex-shrink: 0;
  width: 100%;
  height: 20vh; /* Ajusta l'alçada segons la meitat de l'alçada de la finestra visual */
  resize: none; /* Evita que es redimensioni manualment */

}

.descripcion{
  margin-top: 5%;
  display: grid;
  gap: 25px;
}

.boton{
  border-radius: 20px;
  background: #00A3FF;
  color: var(--white-100, #FFF);
  font-size: 15px;
  padding: 1%;
  border: none;
  cursor: pointer;
}

.apps{
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
}

.datos{
  text-align: center;
}

.onlineClass{
  border-radius: 20px;
  background: #00A3FF;
  color: var(--white-100, #FFF);
  font-size: 15px;
  padding: 1%;
  border: none;
  cursor: pointer;
  margin-top: 2%;
}

.saveChanges{
  border-radius: 20px;
  background: #00A3FF;
  color: var(--white-100, #FFF);
  font-size: 15px;
  padding: 1%;
  border: none;
  cursor: pointer;
  margin-top: 2%;
  font: 25px;
}
</style>
