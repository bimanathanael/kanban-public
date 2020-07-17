
let app = new Vue({
    el : '#app',
    data : {
        hello : "hello world",
        show : false,
        isLogin : false,
        loginPage : true,
        registerPage : false,
        dataTask: [],
        UserId: 0,
    },
    created() {
        if(localStorage.access_token){
            this.fetchTask()
            this.isLogin = true
            this.UserId = localStorage.id
        } else {
            this.isLogin = false        
        }
    } ,
    methods: {
        toRegister : function (event) {
            this.loginPage = false
            this.registerPage = true
        },
        toLogin : function (event) {
            this.loginPage = true
            this.registerPage = false
        },
        processLogin : function(event){
            
            axios({
                method: "post",
                url: 'http://localhost:3333/login',
                data: {
                    email :  $('#loginEmail').val(),
                    password: $('#loginPassword').val(),
                }
            })
            .then ( result => {
                console.log("sukses login", result)
                localStorage.access_token = result.data.access_token
                localStorage.id = result.data.id
                this.isLogin = true
                this.UserId = result.data.id
                this.fetchTask()
            })
            .catch ( err => {
                console.log(err)
            })
        },
        processRegister : function(event){
            if($('#registerPassword').val() != $('#registerPasswordConfirmation').val()){
                return console.log("password not match")
            }
            axios({
                method: "post",
                url: 'http://localhost:3333/register',
                data: {
                    email :  $('#registerEmail').val(),
                    password: $('#registerPassword').val(),
                }
            })
            .then ( result => {
                console.log("sukses register", result)
            })
            .catch ( err => {
                console.log(err)
            })
        },
        processLogout: function(event){
            localStorage.clear()
            this.isLogin = false
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
        moveTo: function(id,title,target,event){
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
        processAddTaskDone: function(event){
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
                this.fetchTask()
            })
            .catch( err => {
                console.log( err )
            })
        },
        processDelete : function (id, event){
            console.log("this masuk")
            axios({
                method: "delete",
                url: `http://localhost:3333/tasks/${id}`,
                headers: {
                    access_token : localStorage.access_token
                }
            })
            .then( result => {
                console.log("deleted",result.data)
                this.fetchTask()

            })
            .catch ( err => {
                console.log(err)
            })
        },
        fetchTask(){
            axios({
                method: "get",
                url: 'http://localhost:3333/tasks',
                headers: {
                    access_token : localStorage.access_token
                }
            })
            .then( result => {
                this.dataTask = result.data 
                console.log(result.data)
                this.UserId

            })
            .catch ( err => {
                console.log(err)
            })
        }
    }
})

