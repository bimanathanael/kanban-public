<template>
  <div class="containerIndex">
    <div class="d-flex justify-content-center">
      <div class="d-flex align-items-center flex-column">
        <h1 class="titleIndex">Login</h1>
        <label class="badge badge-danger text-wrap error" id="error" v-if="showError">{{ errMsg }}</label>
        <form @submit.prevent="processLogin">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Email</span>
            </div>
            <input
              v-model="loginEmail"
              type="text"
              class="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="type Email here..."
            />
          </div>
          <div class="input-group mb-4 mt-">
            <div class="input-group-prepend">
              <span class="input-group-text">Password</span>
            </div>
            <input
              v-model="loginPassword"
              type="text"
              class="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="type Password here..."
            />
          </div>
          <div>
            <button type="submit" class="btn btn-light" style="margin-left:20%">Login</button>
            <button class="g-signin2 ml-2" v-on:click.prevent="onSignIn"> Google </button>
            <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
            <button type="button" class="btn btn-brown ml-2" @click="toRegister">to Register >></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import GAuth from 'vue-google-oauth2'
// const gauthOption = {
//   clientId: '271576244942-ci84ng84o8djrj807glsvv9747kusa4f.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }
// Vue.use(GAuth, gauthOption)

export default {
  data() {
    return {
      showError: false,
      errMsg: null,
      loginEmail: null,
      loginPassword: null
    };
  },
  methods: {
    toRegister() {
      this.$emit("emitToRegister");
    },
    processLogin() {
      console.log("masuk");
      axios({
        method: "post",
        url: "http://localhost:3333/login",
        data: {
          email: this.loginEmail,
          password: this.loginPassword
        }
      })
        .then(result => {
          console.log("sukses login", result);
          this.isLogin = true;
          this.UserId = result.data.id;
          this.$emit(
            "emitProcessLogin",
            result.data.access_token,
            result.data.id
          );
        })
        .catch(err => {
          console.log(err.response.data.message, "err");
          this.showError = true;
          this.errMsg = err.response.data.message;
        });
    },
    onSignIn(googleUser) {
      // googleUser.getId() : Get the user's unique ID string.
      // googleUser.getBasicProfile() : Get the user's basic profile information.
      // googleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
      // this.isSignIn = this.$gAuth.isAuthorized
      this.$gAuth.signIn()
      .then( result => {
        console.log(result,"datadatadatadata")
         axios({
            method: "post",
            url: "http://localhost:3333/googleSignin",
            data: {
              id_token: result.getAuthResponse().id_token
            }
          })
            .then(result => {
              console.log("sukses login", result);
              this.isLogin = true;
              this.UserId = result.data.id;
              this.$emit(
                "emitProcessLoginGoogle",
                result.data.access_token,
                result.data.id
              );
            })
            .catch(err => {
              console.log(err.response.data.message, "err");
              this.showError = true;
              this.errMsg = err.response.data.message;
            });
        })
      .catch( err => {
        console.log(err)
      })
    }
  }
};
</script>

<style>
</style>