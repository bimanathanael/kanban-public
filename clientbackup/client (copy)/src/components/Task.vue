<template>
    <div scroll>
        
        <div class="card mine" style="width: 100%;" v-for="data in filteredData" v-bind:key="data.id">
            <div class="row">
                <div class="col-2 perCard">
                    +
                </div>
                <div class="col-10 card-body">
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
                            <button class="dropdown-item bg-danger" href="#" v-on:click.prevent="processDelete(data.id)">Delete this</button>
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
    data() {
        return {
            result:[],
            dataCategory :  "",
            UserId : 0,
            category: ""
        }
    },
    props: ["categoryName","dataTask"],
    created(){
        this.category = this.categoryName
        this.UserId = localStorage.id
    },
    computed : {
        filteredData : function () {
            var vm = this
            console.log(this.dataTask)
            const data = this.dataTask.filter(function (item) {
                return item.category == vm.categoryName
            });
            console.log(data)
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
                this.fetchTask()
            })
            .catch( err => {
                console.log( err )
            })
        }
    }
}
</script>

<style>

</style>