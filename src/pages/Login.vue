
<script setup>
import TextField from '../components/TextField.vue';
</script>
<script>

export default {
    methods: {
        login() {
            this.$router.push({ name: 'home' });
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
                <TextField titleField="Email Address" type="email" />
                <!-- password -->
                <TextField titleField="Password" type="password" />
                <div class="flex items-center">
                    <input type="checkbox" name="" id="">
                    <p class="ml-1">Remember me</p>
                </div>
                <button @click="login"
                    class="w-full bg-blue-600 rounded-md py-2 text-white font-bold tracking-widest">Login</button>
            </div>
        </div>
    </div>
</template>
