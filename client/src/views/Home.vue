<template>
    <div class="containerHome">
        
        <div class="d-flex justify-content-between">
        
            <Category  class="sectionBacklog" 
                v-if="shown && dataComplete.length > 0"
                :datas="dataBacklog" 
                @reloadPages="fetchTask"
                @reloadPagesDelete="fetchTask"
                @reloadPageAdd="fetchTask"
                @reloadPageEditTask="fetchTask"
                category="Backlog"
                
            ></Category>
            <Category class="sectionProduct" 
                v-if="shown && dataComplete.length > 0"
                :datas="dataProduct" 
                @reloadPages="fetchTask"
                @reloadPagesDelete="fetchTask"
                @reloadPageAdd="fetchTask"
                @reloadPageEditTask="fetchTask"
                category="Product" 
                
            ></Category>
            <Category class="sectionDev"  
                v-if="shown && dataComplete.length > 0"
                :datas="dataDevelopment" 
                @reloadPages="fetchTask"
                @reloadPagesDelete="fetchTask"
                @reloadPageAdd="fetchTask"
                @reloadPageEditTask="fetchTask"
                category="Development" 
                
            ></Category>
            <Category  class="sectionDone"   
                v-if="shown && dataComplete.length > 0"
                :datas="dataComplete" 
                @reloadPages="fetchTask"
                @reloadPagesDelete="fetchTask"
                @reloadPageAdd="fetchTask"
                @reloadPageEditTask="fetchTask"
                category="Done"
                
            ></Category>
            
        </div>
            
        <hr  class="separator">
    </div>
</template>

<script>
import Category from '../components/Category'
import axios from 'axios'

export default {
    data(){
        return {
            shown: true,
            dataBacklog: [],
            dataProduct: [],
            dataDevelopment: [],
            dataComplete: []
        }
    },
    created(){
        let access_token = localStorage.access_token
        // this.dataBacklog = []
        // this.dataProduct = []
        // this.dataDevelopment = []
        // this.dataComplete = []
        this.fetchTask()

    },
    components: {
        Category
    },
    methods:{
        fetchTask(){
            this.shown = !this.shown
            console.log(this.shown, "this.shown")
            return axios({
                method: "get",
                url: 'https://pure-shelf-85168.herokuapp.com/tasks',
                headers: {
                        access_token : localStorage.access_token
                }
            })
            .then( result => {
                this.dataBacklog = [],
                this.dataProduct = [],
                this.dataDevelopment = [],
                this.dataComplete = []
                console.log(result.data,"result")

                result.data.forEach(task => {
                    if (task.category == 'Backlog') {
                        this.dataBacklog.push(task)
                    } else if (task.category == 'Product') {
                        this.dataProduct.push(task)
                    } else if (task.category == 'Development') {
                        this.dataDevelopment.push(task)
                    } else if (task.category == 'Done') {
                        this.dataComplete.push(task)
                    }
                })

               
                this.shown = !this.shown
                console.log(this.shown, "this.shown")
                console.log(result.data,"result.data")
                // this.allData = result.data
                // console.log(this.allData,"di home axios")
            })
            .catch ( err => {
                console.log(err)
            })
        } ,
    },
    watch: {
    // whenever question changes, this function will run
    dataBacklog: function (newdataBacklog, olddataBacklog) {
      this.shown = !this.shown
      this.shown = !this.shown
    }
  },
    
}
</script>

<style>

</style>