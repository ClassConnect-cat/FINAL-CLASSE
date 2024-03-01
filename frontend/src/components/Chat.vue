
<script setup>

import { ref, watch } from 'vue'
import { useWebSocket } from '@vueuse/core'

const message = ref('') // Definir la variable mensaje usando ref()

const { send, status, data } = useWebSocket('ws://localhost:3001', {
    autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
        alert('Failed to connect WebSocket after 3 retries')
    },
    },
})

watch(
    data,
    (newData) => {
        if (newData) {
            showMessage(JSON.parse(newData).message)
        }
    },
    { immediate: true }
)

const enviarMensaje = (e) => {
    e.preventDefault()
    if (status.value === 'OPEN') {//Listo para recibir mensajes
        if (message.value) {
            console.log("front mgs", message.value);
            send(JSON.stringify({ message: message.value }));
        }
        message.value = '';
    } else {
        console.error('No se pudo enviar el mensaje. WebSocket no está conectado.')
    }
}
const showMessage = (msg) => {
    // Aquí puedes implementar la lógica para mostrar el mensaje en la interfaz de usuario
    // Por ejemplo, podrías agregar el mensaje al DOM
    const chatBox = document.getElementById('chat-box')
    const newMessage = document.createElement('p')
    newMessage.textContent = msg
    chatBox.appendChild(newMessage)
}


</script>

<template>
  <div class="chat-container">
    <div class="chat-header">Chat</div>
    <div id="chat-box" class="chat-messages"></div>
    <form @submit="enviarMensaje" class="chat-input">
      <input type="text" v-model="message" placeholder="Escribe un mensaje...">
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>


<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #242424;
}

.chat-container {
    width: 400px;
    height: 500px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.chat-header {
    background-color: rgb(0, 179, 255);
    color: white;
    padding: 15px;
    font-weight: bold;
    text-align: center;
}

.chat-messages {
    flex: 1;
    overflow-y: scroll;
    padding: 10px;
    background-color: #f9f9f9;
    color:black;
}

.chat-messages p {
    margin: 8px 0;
}

.chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #ccc;
}

.chat-input input[type="text"] {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.chat-input button {
    padding: 8px 15px;
    background-color: rgb(0, 179, 255);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.chat-input button:hover {
    background-color: #00b721;
}




</style>
