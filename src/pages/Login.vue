
<script setup>
import TextField from '../components/TextField.vue';
import ApiServices from '../services/ApiService';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import swal from 'sweetalert';
</script>
<script>

export default {
    data(){
        return {
            isLoading : false,
            email: '',
            password: '',
            emailError:'',
            passwordError: '',
            remember: false
        }
    },
    mounted(){
        let remember = localStorage.getItem('remember')
        if(remember != null){
            this.email = remember
            this.remember = true
        }
    },
    methods: {
        async login(email, password)  {
            this.isLoading = true;
            await ApiServices.login(email, password, (success)=>{
                let { access_token } = success
                localStorage.setItem('token', access_token)
                this.remember ? localStorage.setItem('remember', email) : null
                this.$router.push({ name: 'dashboard' })

            }, (error)=>{
                console.log(error);
                swal({
                    title: 'The email or password you entered is incorrect',
                    icon: 'warning'
                })
            })
            this.isLoading = false;
        },
        emailValidator(email){
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!regex.test(email)){
                this.emailError = 'invalid e-mail'
                return
            }
            this.emailError = ''
        },
        passwordValidator(password){
            const regex = /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
            if(password == ''){
                this.passwordError = 'This is mandatory'
                return
            }

            if(password.length < 8){
                this.passwordError = 'Password must be more than 8 characters';
                return
            }

            if(!regex.test(password)){
                this.passwordError = 'The password must contain uppercase, lowercase and contain numbers'
                return
            }
            this.passwordError = '';
            
        }
    },
}
</script>

<template>
    <div class="w-screen h-screen flex">
        <div class="hidden md:basis-[65%] md:flex justify-center items-center ">
            <div class="w-[80%] h-[95%] bg-[#F8F7FA] rounded-xl">
                <img class="w-[80%] h-[80%] box-border m-auto" src="../assets/login.svg">
            </div>
        </div>
        <div class="basis-full justify-center md:justify-normal md:basis-[35%] flex items-center">
            <div class="w-[90%] h-2/4 flex flex-col justify-around ">
                <h5 class="text-xl  font-bold text-slate-600">Welcome to Admin Care Crew 👋🏻</h5>
                <p class="">Please Sign-in into your account and start admin dashboard</p>
                <!-- Email -->
                <TextField titleField="Email Address" v-model:error="emailError" v-model:text="email" @validator="emailValidator" type="email" class="mb-3"/>
                <!-- password -->
                <TextField titleField="Password" v-model:error="passwordError" v-model:text="password" type="password" @validator="passwordValidator" />
                <div class="flex items-center">
                    <input v-model="remember" type="checkbox" name="" id="">
                    <p class="ml-1">Remember me</p>
                </div>
                <button @click="login(email, password)"
                    class="w-full bg-blue-600 rounded-md py-2 text-white font-bold tracking-widest">Login</button>
                <Loading v-model:active="isLoading" color="#2563EB"/>
                </div>
        </div>
    </div>
</template>
