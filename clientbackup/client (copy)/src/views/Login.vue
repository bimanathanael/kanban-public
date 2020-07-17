<template>
    <div class="containerIndex">
        <div class="d-flex justify-content-center">
            <div class="d-flex align-items-center flex-column">
                <h1 class="titleIndex">
                    Login
                </h1>
                <form @submit.prevent="processLogin">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" >Email</span>
                        </div>
                        <input id="loginEmail" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="type Email here...">
                    </div>
                    <div class="input-group mb-4 mt-">
                        <div class="input-group-prepend">
                            <span class="input-group-text" >Password</span>
                        </div>
                        <input id="loginPassword" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="type Password here...">
                    </div>
                    <div>
                        <button type="submit" class="btn btn-light" style="margin-left:20%">Login</button>
                        <button type="button" class="btn btn-brown ml-2" @click="toRegister"> to Register >></button>
                    </div>
                </form>
            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    methods: {
        toRegister(){
            this.$emit("emitToRegister")
        },
        processLogin(){
             axios({
                method: "post",
                url: 'http://localhost:3333/login',
                data: {
                    email :  $('#loginEmail').val(),
                    password: $('#loginPassword').val(),
                }
            })
            .then ( result => {
                console.log("sukses login", result)
                // localStorage.access_token = result.data.access_token
                // localStorage.id = result.data.id
                this.isLogin = true
                this.UserId = result.data.id
                this.$emit("emitProcessLogin",result.data.access_token, result.data.id)
            })
            .catch ( err => {
                console.log(err)
            })
        },
        
    }
}
</script>

<style>

</style>