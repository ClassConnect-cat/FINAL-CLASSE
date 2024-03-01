<template>
    <div class="register">
        <h1>Register</h1>
        <form @submit.prevent="register">
            <label for="username">Usuario:</label>
            <input id="username" type="text" placeholder="Username" v-model="username" required><br><br>
            <label for="email">Correo electrónico:</label>
            <input id="email" type="email" placeholder="Email" v-model="email" required><br><br>
            <div>
                <label for="btn1">Eres profesor? Sí</label>
                <input for="profe" id="btn1" type="checkbox" value='true' v-model="profe">
            </div>
            <label for="password">Contraseña:</label>
            <input type="password" v-model="password" placeholder="Password" required><br><br>
            <button type="submit">Registrar</button>
        </form>
        <p v-if="registerError" style="color: red;">{{ registerError }}</p>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const username = ref('');
const email = ref('');
const profe = ref('');
const password = ref('');
const registerError = ref('');

console.log(profe.checked);

const router = useRouter();
const store = useStore();

const register = async () => {
    let itsProfe = false;
    console.log(profe.value);
    if(profe.value === 'true') itsProfe = true;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify({
        "name": username.value,
        "email": email.value,
        "profe": itsProfe,
        "password": password.value,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/user/register", requestOptions)
        .then(response => {
            if(!response.ok) throw new Error();
            else return response.json()
        })
        .then(result => {console.log(result)
            localStorage.setItem("token", result.token)
            router.push('/login');
        })
        .catch(error => console.log('error', error),
            registerError.value = "Este email ya ha sido registrado. Por favor, canvie el email o haga login"
        );
};

</script>


<style>
    .register {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
    }

    .register h1 {
        font-size: 24px;
        color: #333;
        text-align: center;
        margin-bottom: 20px;
    }

    .register form {
        display: flex;
        flex-direction: column;
    }

    .register label {
        font-size: 16px;
        color: #333;
        margin: 5%;
        margin-left: 0;
    }

    .register input {
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .register button {
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

    .register button:hover {
        background-color: #0056b3; /* Color més fosc quan es passa el ratolí */
    }

    .register p {
        color: red;
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
    }
</style>
