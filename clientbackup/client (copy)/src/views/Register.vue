<template>
    <div class="containerIndex">
        <div class="d-flex justify-content-center">
            <div class="d-flex align-items-center flex-column">
                <h1 class="titleIndex">
                    Register
                </h1>
                <form @submit.prevent="processRegister">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" >Email</span>
                        </div>
                        <input id="registerEmail" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="type Email here...">
                    </div>
                    <div class="input-group mb-4 mt-">
                        <div class="input-group-prepend">
                            <span class="input-group-text" >Password</span>
                        </div>
                        <input id="registerPassword" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="type Password here...">
                    </div>
                    <div class="input-group mb-4 mt-">
                        <div class="input-group-prepend">
                            <span class="input-group-text" >Password Confirmation</span>
                        </div>
                        <input id="registerPasswordConfirmation" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="type again Password here...">
                    </div>
                    <div>
                        <button type="submit" class="btn btn-light" style="margin-left:20%">Register</button>
                        <button type="button" class="btn btn-brown ml-2" @click="toLogin"> to Login >></button>
                    </div>
                </form>
            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    methods : {
        toLogin(){
            this.$emit("emitToLogin")
        },
        processRegister(){
            if($('#registerPassword').val() != $('#registerPasswordConfirmation').val()){
                return console.log("password not match")
            }
            axios({
                method: "post",
                url: 'http://localhost:3333/register',
                data: {
                    email :  $('#registerEmail').val(),
                    password: $('#registerPassword').val(),
                }
            })
            .then ( result => {
                console.log("sukses register", result)
            })
            .catch ( err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>