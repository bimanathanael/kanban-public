<template>
    <div class="containerHome">
        
        <div class="d-flex justify-content-between">
        
            <Category  class="sectionBacklog" 
                    category="Backlog"
             :allData="allData" 
             @reloadPages="fetchData"
             @reloadPageAdd="fetchData"
             v-if="allData.length > 0"
             
            
            ></Category>
            <Category class="sectionProduct" 
                category="Product" 
              :allData="allData" 
              @reloadPages="fetchData"
              @reloadPageAdd="fetchData"
              v-if="allData.length > 0"
              
            
            ></Category>
            <Category class="sectionDev"  
                category="Development" 
            :allData="allData" 
            @reloadPage="fetchData"
            @reloadPageAdd="fetchData"
            v-if="allData.length > 0"
            
            
            ></Category>
            <Category  class="sectionDone"   
                category="Done"
            :allData="allData" 
            @reloadPage="fetchData"
            @reloadPageAdd="fetchData"
            v-if="allData.length > 0"
            
            
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
            allData : []
        }
    },
    created(){
        // this.fetchTask();
        // const vm = this
        console.log(this.allData,"di home")
        this.fetchData()

    },
    components: {
        Category
    },
    methods:{
        fetchTask(){
            axios({
                method: "get",
                url: 'https://pure-shelf-85168.herokuapp.com/tasks',
                headers: {
                        access_token : localStorage.access_token
                }
            })
            .then( result => {
                console.log(result.data,"result.data")
                this.allData = result.data
                console.log(this.allData,"di home axios")
            })
            .catch ( err => {
                console.log(err)
            })
        } ,
        fetchData(){
            console.log("masuk balik ke home")

            this.fetchTask()
        }  
    },
    
}
</script>

<style>

</style>