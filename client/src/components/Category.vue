<template>
    <div class="section">
        <div class="title">
            <p class="subTitle"> {{ category }} </p>
        </div>
        <hr  class="separator">

        <div id="editTask" v-if="editTask" tabindex="-1" aria-labelledby="formAdd" aria-hidden="true">
            <div>
                <div >
                    <div >
                    <h3 class="font-weight-bold" id="formEdit">Edit Task</h3>
                    </div>
                    <div>
                        <label class="badge badge-danger text-wrap error" id="error" v-if="showError" > {{ errMsg }} </label>
                        <label class="badge badge-primary text-wrap error" id="success" v-if="showSucc" > {{ succMsg }} </label>
                        <form v-on:submit.prevent="processEditTask()">
                            <div class="col-md-auto">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Title</span>
                                    </div>
                                    <input v-model="taskTitle" type="text" class="form-control">
                                </div>
                                <div class="row justify-content-md-center mb-3">
                                    <button type="submit" class="btn btn-info">Edit</button>
                                    <button class="btn btn-danger ml-3">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
                    
        <Task class="scroll"
            v-for="data in dataTask" v-bind:key="data.id"
            @reloadPageMoveTo="reloadPage"
            @reloadPageDelete="reloadPageDelete"
            @reloadPageEditTask="reloadPage"
            @emitShowEdit="showEditPage"
            :data="data"
        ></Task>

        <button type="button" class="btn btn-warning" id="button-addon2" @click="showAddTask">+</button>
        <div v-if="addTask">
            <label class="badge badge-danger text-wrap error" id="error" v-if="showErrorAdd" > {{ errMsgAdd }} </label>
            <form v-on:submit.prevent="processAddTask" class="input-group mb-3 mt-3" >
                <input v-model="title" type="text" class="form-control" placeholder="new task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                <input v-model="categoryName" type="hidden" class="form-control" placeholder="add task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">

                <button type="submit" class="btn btn-warning" id="button-addon2">+ new task</button>
                </div>
            </form>
        </div>
        
    </div>
    
</template>

<script>

import axios from 'axios'
import Task from './Task'

export default {
    data(){
        return {
            dataTask: [],
            categoryName : "",
            addTask: false,
            taskId: null,
            showError : false,
            showSucc : false,
            errMsg : null,
            succMsg: null,
            showErrorAdd: false,
            errMsgAdd: null,
            title: null,
            categoryAdd: null,
            taskTitle: null,
            taskCategory: null,

            showError : false,
            showSucc : false,
            editTask: false,

        }
    },
    props:["datas","category"],
    components: {
        Task
    },
    created(){
        // console.log(this.category,"category anak")
        this.dataTask = []
        this.dataTask = this.datas
        console.log(this.dataTask,"data tiap category")
        this.categoryName = this.category
    },
    methods:{
        reloadPage(){
            console.log("emit categorys")
            this.$emit("reloadPages")
        },
        reloadPageDelete (){
            console.log("emit categorys")
            this.$emit("reloadPagesDelete")
        },
        showEditPage(id){
            console.log("masukshow edit page",id)
            this.errMsg = null
            this.succMsg = null
            this.showSucc = false
            this.taskTitle = null
            this.taskCategory = null
            this.taskId = null
            axios({
                method : "get",
                url: `https://pure-shelf-85168.herokuapp.com/tasks/${id}`,
                headers:{
                    access_token : localStorage.access_token
                }
            })
            .then ( result => {
                this.editTask = true
                this.taskTitle = result.data.title
                this.taskCategory = result.data.category
                this.taskId = result.data.id
                console.log("berhasil memunculkan edit data ", result.data)
                
            })
            .catch( err => {
                console.log( err )
                
            })
        },
        processEditTask(){
            if( this.taskTitle == ""){
                // return console.log("password not match")
                this.showError = true
                this.showSucc = false
                this.errMsg = "Please fill the title"
                return console.log("Please fill the title")
            }
            const id = $('#taskId').val()
            axios({
                method : "put",
                url: `https://pure-shelf-85168.herokuapp.com/tasks/${this.taskId}`,
                headers:{
                    access_token : localStorage.access_token
                },
                data : {
                    title : this.taskTitle ,                 
                    category : this.taskCategory ,                           
                }
            })
            .then ( data => {
                console.log("berhasil megnubah data ", data)
                this.showError = false
                this.editTask = false
                this.errMsg = null
                this.showSucc = true
                this.succMsg = "Sucess edit data"
                this.registerEmail = null
                this.taskTitle = null
                this.taskCategory = null
                this.$emit("reloadPageEditTask")

            })
            .catch( err => {
                console.log( err.response )

            })
        },

        processAddTask(){
            console.log(this.title,"this.title")
            console.log(this.categoryName,"this.categoryName")
            axios({
                method : "post",
                url: "https://pure-shelf-85168.herokuapp.com/tasks",
                headers:{
                    access_token : localStorage.access_token
                },
                data : {
                    title : this.title,
                    category : this.categoryName,
                }
            })
            .then ( data => {
                console.log("berhasil menambahkan data", data)
                this.title = null
                this.categoryAdd = null                        
                this.addTask = !this.addTask
                this.$emit("reloadPageAdd")
                this.showErrorAdd = false
                this.errMsgAdd = null
            })
            .catch( err => {
                console.log( err )
                this.showErrorAdd = true
                this.errMsgAdd = "please fill the title"
            })
        },
        showAddTask(){
            this.errMsg = null
            this.succMsg = null
            this.addTask = !this.addTask
        },
    }
}
</script>

<style>

</style>