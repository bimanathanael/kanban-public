<template>
    <div class="d-flex justify-content-between">
       
        <div class="section sectionBacklog">
            <div class="title">
                <p class="subTitle"> Backlog </p>
            </div>
            <hr  class="separator">
            
                        
            <Task class="scroll"
                categoryName="Backlog"
                :dataTask="allData"
            ></Task>

            <form v-on:submit.prevent="processAddTaskBacklog" class="input-group mb-3">
                <input id="titleAddTaskBacklog" type="text" class="form-control" placeholder="add task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                <input id="categoryAddTaskBacklog" value="Backlog" type="hidden" class="form-control" placeholder="add task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">

                <button type="submit" class="btn btn-warning" id="button-addon2">+ add task</button>
                </div>
            </form>
        </div>
        <div class="section sectionBacklog">
            <div class="title">
                <p class="subTitle"> Product </p>
            </div>
            <hr  class="separator">
            
                        
            <Task class="scroll"
                categoryName="Product"
                :dataTask="allData"
            ></Task>

            <form v-on:submit.prevent="processAddTaskBacklog" class="input-group mb-3">
                <input id="titleAddTaskBacklog" type="text" class="form-control" placeholder="add task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                <input id="categoryAddTaskBacklog" value="Backlog" type="hidden" class="form-control" placeholder="add task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">

                <button type="submit" class="btn btn-warning" id="button-addon2">+ add task</button>
                </div>
            </form>
        </div>
        <div class="section sectionBacklog">
            <div class="title">
                <p class="subTitle"> Development </p>
            </div>
            <hr  class="separator">
            
                        
            <Task class="scroll"
                categoryName="Development"
                :dataTask="allData"
            ></Task>

            <form v-on:submit.prevent="processAddTaskBacklog" class="input-group mb-3">
                <input id="titleAddTaskBacklog" type="text" class="form-control" placeholder="add task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                <input id="categoryAddTaskBacklog" value="Backlog" type="hidden" class="form-control" placeholder="add task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">

                <button type="submit" class="btn btn-warning" id="button-addon2">+ add task</button>
                </div>
            </form>
        </div>
        <div class="section sectionBacklog">
            <div class="title">
                <p class="subTitle"> Done </p>
            </div>
            <hr  class="separator">
            
                        
            <Task class="scroll"
                categoryName="Done"
                :dataTask="allData"
            ></Task>

            <form v-on:submit.prevent="processAddTaskBacklog" class="input-group mb-3">
                <input id="titleAddTaskBacklog" type="text" class="form-control" placeholder="add task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                <input id="categoryAddTaskBacklog" value="Backlog" type="hidden" class="form-control" placeholder="add task.." aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">

                <button type="submit" class="btn btn-warning" id="button-addon2">+ add task</button>
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
            allData: [],
            Backlog: "Backlog",
            Product: "Product",
            Backlog: "Backlog",
            Done: "Done",
        }
    },
    components: {
        Task
    },
    created(){
        this.fetchTask()
    },
    methods:{
        fetchTask(){
            axios({
                method: "get",
                url: 'http://localhost:3333/tasks',
                headers: {
                     access_token : localStorage.access_token
                }
            })
            .then( result => {
                this.allData = result.data


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