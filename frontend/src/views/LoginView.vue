<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <label for="username">Email:</label>
            <input placeholder="Email" type="text" id="username" v-model="username" required><br><br>
            <label for="password">Contraseña:</label>
            <input type="password" placeholder="Password" id="password" v-model="password" required><br><br>
            <button type="submit">Iniciar Sesión</button>
        </form>
        <p v-if="loginError" style="color: red;">{{ loginError }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const username = ref('');
const password = ref('');
const loginError = ref('');

const router = useRouter();

const store = useStore();

const login = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": username.value,
    "password": password.value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    const getData = token => JSON.parse(atob(token.split(/\./)[1]));

    fetch("http://localhost:3000/user/login", requestOptions)
    .then(response => response.json())
    .then(result => {
        localStorage.setItem("token", result.token)
        const data = getData(result.token);
        store.commit("login");
        router.push('/profile/' + data.id);
    })
    .catch(error => console.log('error', error),
        loginError.value = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.');        
};
</script>
<style>
@media (min-width: 500px) {
    .login {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
    }

    .login h1 {
        font-size: 24px;
        color: #333;
        text-align: center;
        margin-bottom: 20px;
    }

    .login form {
        display: flex;
        flex-direction: column;
    }

    .login label {
        font-size: 16px;
        color: #333;
        margin: 5%;
        margin-left: 0;
    }

    .login input {
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .login button {
        padding: 10px 20px;
        background-color: #007bff; /* Blau com a color d'inici de sessió */
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 5%;
        margin-left: 0;
        margin-right: 0;
    }

    .login button:hover {
        background-color: #0056b3; /* Color més fosc quan es passa el ratolí */
    }

    .login p {
        color: red;
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
    }
}
</style>
