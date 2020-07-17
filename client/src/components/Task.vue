<template>
    <div scroll>
        
        <div class="card mine"  v-for="data in filteredData" v-bind:key="data.id">
            <div class="row">
                <div class="col-2 perCard">
                    +
                </div>
                <div class="col-10 card-body" v-if="!editTask">
                    <h6 class="card-title" >{{ data.title }}</h6>
                    <div class="btn-group" v-if="data.UserId==UserId">
                        <button type="button" class="btn btn-action">Action</button>
                        <button type="button" class="btn btn-action dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                            <button class="dropdown-item" href="#" v-on:click.prevent="moveTo(data.id,data.title,'Backlog')">to Backlog</button>
                            <button class="dropdown-item" href="#" v-on:click.prevent="moveTo(data.id,data.title,'Product')">to Product</button>
                            <button class="dropdown-item" href="#" v-on:click.prevent="moveTo(data.id,data.title,'Development')">to Development</button>
                            <button class="dropdown-item" href="#" v-on:click.prevent="moveTo(data.id,data.title,'Done')">to Done</button>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item bg-warning" href="#" v-on:click.prevent="showEditPage(data.id)">Edit this</button>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item bg-danger" href="#" data-toggle="modal" data-target="#deleteConfirmation" data-dismiss="modal" v-on:click="showDeleteModal(data.id)">Delete this</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div> 

        <div class="modal fade" id="editTask" tabindex="-1" role="dialog" aria-labelledby="formAdd" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h3 class="modal-title font-weight-bold" id="formEdit">Edit Task</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
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
                                        <button data-dismiss="modal" class="btn btn-danger ml-3">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data : function() {
        return {
            result:[],
            dataCategory :  "",
            UserId : 0,
            categoryName: "",
            showError : false,
            showSucc : false,
            alertEditTask: false,
            editTask: false,
            deletedId: null,
            taskTitle: null,
            taskCategory: null,
            taskId: null,
        }
    },
    props: ["category","dataTask"],
    created(){
        // this.$emit("")
        this.result = this.dataTask
        console.log(this.result,"di task")
        this.categoryName = this.category
        this.UserId = localStorage.id
        // var vm = this
    },
    computed : {
        filteredData : function () {
            var vm = this

            const data = this.result.filter(function (item) {
                // return item.category == vm.category
                return item.category == vm.categoryName
            });
            return data
        },
        
    },
    methods : {
        moveTo(id,title,target,event) {
            axios({
                method : "put",
                url: `http://localhost:3333/tasks/${id}`,
                headers:{
                    access_token : localStorage.access_token
                },
                data : {
                    title : title,                        
                    category : target,                            
                }
            })
            .then ( data => {
                console.log("berhasil move task", data)
                console.log("emit task")
                this.$emit("reloadPageMoveTo")
            })
            .catch( err => {
                console.log( err )
            })
        },
        processDelete : function ( event){
            console.log("this.deletedId",this.deletedId)
            axios({
                method: "delete",
                url: `http://localhost:3333/tasks/${this.deletedId}`,
                headers: {
                    access_token : localStorage.access_token
                }
            })
            .then( result => {
                console.log("deleted",result.data)
                this.$emit("reloadPageDelete")

            })
            .catch ( err => {
                console.log(err)
            })
        },
        // showEditForm(id){
        //     console.log(id)
        //     this.$emit("showEditPage", id)
        //     // this.editTask = true
        // },
        showDeleteModal(id){
            this.deletedId = id
            console.log(this.deletedId)

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        return axios({
                            method: "delete",
                            url: `http://localhost:3333/tasks/${this.deletedId}`,
                            headers: {
                                access_token : localStorage.access_token
                            }
                        })
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                })
                .then( data  => {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                })  
                .catch( err => {
                    console.log(err)
                })   
        },
        showEditPage(id){
            console.log("masukshow edit page",id)
            this.errMsg = null
            this.succMsg = null
            this.showSucc = false
            axios({
                method : "get",
                url: `http://localhost:3333/tasks/${id}`,
                headers:{
                    access_token : localStorage.access_token
                }
            })
            .then ( result => {
                $('#editTask').modal('show');
                console.log("berhasil memunculkan edit data ", result.data)
                this.taskTitle = result.data.title
                this.taskCategory = result.data.category
                this.taskId = result.data.id
                // var vm = this
                
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
                url: `http://localhost:3333/tasks/${this.taskId}`,
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
                // this.fetchTask()
                this.showError = false
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
        }
    }
}
</script>

<style>

</style>