<template>
    <div class="containerIndex">
        <div class="d-flex justify-content-center">
            <div class="d-flex align-items-center flex-column">
                <h1 class="titleIndex">
                    Register
                </h1>
                <label class="badge badge-danger text-wrap error" id="error" v-if="showError" > {{ errMsg }} </label>
                <label class="badge badge-primary text-wrap error" id="success" v-if="showSucc" > {{ succMsg }} </label>
                <form @submit.prevent="processRegister">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" >Email</span>
                        </div>
                        <input v-model="registerEmail" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="type Email here...">
                    </div>
                    <div class="input-group mb-4 mt-">
                        <div class="input-group-prepend">
                            <span class="input-group-text" >Password</span>
                        </div>
                        <input v-model="registerPassword" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="type Password here...">
                    </div>
                    <div class="input-group mb-4 mt-">
                        <div class="input-group-prepend">
                            <span class="input-group-text" >Password Confirmation</span>
                        </div>
                        <input v-model="confirmPass" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="type again Password here...">
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
    data() {
        return {
            showError : false,
            showSucc : false,
            errMsg : null,
            registerEmail: null,
            registerPassword: null,
            confirmPass: null,
            showsuccess: null,
            succMsg: null
        }
    },
    methods : {
        toLogin(){
            this.$emit("emitToLogin")
        },
        processRegister(){
            if(this.registerPassword != this.confirmPass){
                this.showError = true
                this.errMsg = "password not match"
                return console.log("password not match")
            }
            axios({
                method: "post",
                url: 'http://localhost:3333/register',
                data: {
                    email :  this.registerEmail,
                    password: this.registerPassword,
                }
            })
            .then ( result => {
                console.log("sukses register", result)
                this.showSucc = true
                this.showError = false
                this.errMsg = null
                
                this.succMsg = "Sucess register, please login"

                this.registerEmail = null
                this.registerPassword = null
                this.confirmPass = null
            })
            .catch ( err => {
                console.log(err)
                console.log(err.response.data.message,"err")
                this.showError = true
                this.errMsg = err.response.data.message
            })
        }
    }
}
</script>

<style>

</style>