<template>
    <div >
        <header class="m-4 d-flex align-items-center flex-column">
            <h1 id="header">
                Welcome to Kanban Board Apps
            </h1>
            <button v-if="isLogin" type="button" class="btn btn-brown" @click="processLogout"> Logout</button>
        </header>
        <hr class="separator">
        <div class="d-flex justify-content-center">
            <Login 
                v-if="loginPage && !registerPage && !isLogin"
                @emitToRegister="toRegister()"
                @emitProcessLogin="processLogin"
            > </Login>

            <Register  
                v-if="!loginPage && registerPage && !isLogin" 
                @emitToLogin="toLogin()"
            > </Register>
        </div>
        <Home v-if="isLogin == true"> </Home>
    </div>
</template>

<script>
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';

export default {
    name: "App",
    data() {
        return {
            loginPage: true,
            registerPage: false,
            isLogin: false,
            isRegister: false,
            message: 'Hello world',
            UserId : 0,
        };
    },
    components: {
        Home,
        Register,
        Login
    },
    methods : {
        toLogin(){
            this.loginPage = true
            this.registerPage = false
        },
        toRegister(){
            this.loginPage = false
            this.registerPage = true
        },
        processLogin(access_token, id){
            console.log("masuk")
            localStorage.access_token = access_token
            localStorage.id = id
            this.UserId = id
            this.isLogin = true
        },
        processLogout(){
            localStorage.clear()
            this.isLogin = false
        }
    },
    created(){
        if(localStorage.access_token){
            this.isLogin = true
        } else{
            this.isLogin = false
        }
    }
};
</script>

<style scoped>
</style>