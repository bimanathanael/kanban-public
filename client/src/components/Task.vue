<template>
    <div scroll>
        
        <div class="card mine"  >
            <div class="row">
                <div class="col-2 perCard">
                    +
                </div>
                <div class="col-10 card-body">
                    <h6 class="card-title" >{{ data.title }}</h6>
                    <p class="card-title" > created : {{ createdAt  }}</p>
                    <p class="card-title" >by : {{ data.User.email }}</p>
                    <div class="btn-group mt-4" v-if="data.UserId==UserId">
                        <button type="button" class="btn btn-action">Action</button>
                        <button type="button" class="btn btn-action dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                            <button class="dropdown-item" href="#" v-on:click.prevent="moveTo(data.id,data.title,'Backlog')">to Backlog</button>
                            <button class="dropdown-item" href="#" v-on:click.prevent="moveTo(data.id,data.title,'Product')">to Product</button>
                            <button class="dropdown-item" href="#" v-on:click.prevent="moveTo(data.id,data.title,'Development')">to Development</button>
                            <button class="dropdown-item" href="#" v-on:click.prevent="moveTo(data.id,data.title,'Done')">to Done</button>
                            <button class="dropdown-item bg-warning" href="#" v-on:click.prevent="showEditPage(data.id)">Edit this</button>
                            <button class="dropdown-item bg-danger" href="#" data-toggle="modal" data-target="#deleteConfirmation" data-dismiss="modal" v-on:click.prevent="showDeleteModal(data.id)">Delete this</button>
                        </div>
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
            createdAt : null
        }
    },
    props: ["category","dataTask","data"],
    created(){
        this.createdAt = this.getDate(this.data.createdAt)
        this.UserId = localStorage.id
    },
    methods : {
        moveTo(id,title,target,event) {
            axios({
                method : "put",
                url: `https://pure-shelf-85168.herokuapp.com/tasks/${id}`,
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
                url: `https://pure-shelf-85168.herokuapp.com/tasks/${this.deletedId}`,
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
                            url: `https://pure-shelf-85168.herokuapp.com/tasks/${this.deletedId}`,
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
            console.log("masuk emit child")
            this.$emit("emitShowEdit", id)
        },
        getDate : (date) => {
            var today = new Date(date);
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            return today
        }
    }
}
</script>

<style>

</style>