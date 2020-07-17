<template>
       
        <div class="section">
            <div class="title">
                <p class="subTitle"> {{ category }} </p>
            </div>
            <hr  class="separator">
            
                        
            <Task class="scroll"
                :category="category"
                :dataTask="dataTask"
                @reloadPageMoveTo="reloadPage"
                @reloadPageDelete="reloadPage"
                @reloadPageEditTask="reloadPage"
            ></Task>

            <button type="button" class="btn btn-warning" id="button-addon2" @click="showAddTask">+</button>
            <div v-if="addTask">
                <label class="badge badge-danger text-wrap error" id="error" v-if="showErrorAdd" > {{ errMsgAdd }} </label>
                <form v-on:submit.prevent="processAddTask" class="input-group mb-3 mt-3" >
                    <input v-model="title" type="text" class="form-control" placeholder="new task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                    <input v-model="categoryAdd" type="hidden" class="form-control" placeholder="add task.." aria-label="Recipient's username" aria-describedby="button-addon2">
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

        }
    },
    props:["category", "allData"],
    components: {
        Task
    },
    created(){
        
        // this.$emit("reloadPage")
        console.log(this.category,"category anak")
        console.log(this.allData,"allDataallDataallData")
        this.categoryName = this.category
        this.dataTask = this.allData
    },
    methods:{
        reloadPage(){
            console.log("emit categorys")
            this.$emit("reloadPages")
        },
        // fetchTask(){
        //     axios({
        //         method: "get",
        //         url: 'https://pure-shelf-85168.herokuapp.com/tasks',
        //         headers: {
        //              access_token : localStorage.access_token
        //         }
        //     })
        //     .then( result => {
        //         this.allData = result.data
        //     })
        //     .catch ( err => {
        //         console.log(err)
        //     })
        // },
        processAddTask(){
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
            // if(this.addTask){
                this.errMsg = null
                this.succMsg = null
                this.addTask = !this.addTask
            // } else{
                // this.addTask = false
            // }
        },
        
    }
}
</script>

<style>

</style>