<template>
    <div class="containerHome">
        
            <Category 
            
            ></Category>
            
            
            <hr  class="separator">
    </div>
</template>

<script>
import Category from '../components/Category'
import axios from 'axios'
export default {
    data(){
        return {
            Backlog: "Backlog",
            Product: "Product",
            Development: "Development",
            Done: "Done",
        }
    },
    components: {
        Category
    },
    methods: {
        processAddTaskDone(){
           axios({
                method : "post",
                url: "http://localhost:3333/tasks",
                headers:{
                    access_token : localStorage.access_token
                },
                data : {
                    title : $('#titleAddTaskDone').val(),                        
                    category : $('#categoryAddTaskDone').val(),                            
                }
            })
            .then ( data => {
                console.log("berhasil menambahkan data", data)
            })
            .catch( err => {
                console.log( err )
            }) 
        },
        processAddTaskBacklog: function(event){
            axios({
                method : "post",
                url: "http://localhost:3333/tasks",
                headers:{
                    access_token : localStorage.access_token
                },
                data : {
                    title : $('#titleAddTaskBacklog').val(),                        
                    category : $('#categoryAddTaskBacklog').val(),                            
                }
            })
            .then ( data => {
                console.log("berhasil menambahkan data", data)
                this.fetchTask()
            })
            .catch( err => {
                console.log( err )
            })
        },
        processAddTaskProduct: function(event){
            axios({
                method : "post",
                url: "http://localhost:3333/tasks",
                headers:{
                    access_token : localStorage.access_token
                },
                data : {
                    title : $('#titleAddTaskProduct').val(),                        
                    category : $('#categoryAddTaskProduct').val(),                            
                }
            })
            .then ( data => {
                console.log("berhasil menambahkan data", data)
                this.fetchTask()
            })
            .catch( err => {
                console.log( err )
            })
        },
        processAddTaskDev: function(event){
            axios({
                method : "post",
                url: "http://localhost:3333/tasks",
                headers:{
                    access_token : localStorage.access_token
                },
                data : {
                    title : $('#titleAddTaskDev').val(),                        
                    category : $('#categoryAddTaskDev').val(),                            
                }
            })
            .then ( data => {
                console.log("berhasil menambahkan data", data)
                this.fetchTask()
            })
            .catch( err => {
                console.log( err )
            })
        },
    },
}
</script>

<style>

</style>