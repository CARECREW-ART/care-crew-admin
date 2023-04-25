<script>
export default {
    data() {
        return {
            activeItem: 'home',
        }
    },
    methods: {
        changeItemNav(item) {
            this.activeItem = item;
        }
    }

}
</script>

<template>
    <div class="w-screen h-screen flex">
        <div class="group w-[5%] hover:w-[19%] flex flex-col items-center mt-3 transition-all">
            <p class="w-4/5">Care Crew</p>
            <div class="flex w-4/5 h-11 justify-center group-hover:justify-normal group-hover:pl-2 items-center rounded-md hover:bg-[#eeeeee65] hover:cursor-pointer"
                :class="{ '!bg-gradient-to-l from-sky-300 to-blue-600': activeItem == 'home' }"
                @click="changeItemNav('home')">
                <template v-if="activeItem == 'home'">
                    <img src="../assets/home-white.svg">
                </template>
                <template v-else>
                    <img src="../assets/home.svg">
                </template>
                <p class="hidden group-hover:block ml-3 text-lg text-slate-600"
                    :class="{ 'text-white': activeItem == 'home' }">Dashboard</p>
            </div>
            <div class="flex w-4/5 h-11 justify-center group-hover:justify-normal group-hover:pl-2 items-center mt-1 rounded-md hover:bg-[#eeeeee65] hover:cursor-pointer"
                :class="{ '!bg-gradient-to-l from-sky-300 to-blue-600': activeItem == 'art' }"
                @click="changeItemNav('art')">
                <template v-if="activeItem == 'art'">
                    <img src="../assets/user-white.svg">
                </template>
                <template v-else>
                    <img src="../assets/user.svg">
                </template>
                <p class="hidden group-hover:block ml-3 text-lg text-slate-600"
                    :class="{ 'text-white': activeItem == 'art' }">Art Data</p>
            </div>
            <div class="flex w-4/5 h-11 justify-center group-hover:justify-normal group-hover:pl-2 items-center mt-1 rounded-md hover:bg-[#eeeeee65] hover:cursor-pointer"
                :class="{ '!bg-gradient-to-l from-sky-300 to-blue-600': activeItem == 'user' }"
                @click="changeItemNav('user')">
                <template v-if="activeItem == 'user'">
                    <img src="../assets/user-white.svg">
                </template>
                <template v-else>
                    <img src="../assets/user.svg">
                </template>
                <p class="hidden group-hover:block ml-3 text-lg text-slate-600"
                    :class="{ 'text-white': activeItem == 'user' }">User Data</p>
            </div>
            <div class="flex w-4/5 h-11 justify-center group-hover:justify-normal group-hover:pl-2 items-center mt-1 rounded-md hover:bg-[#eeeeee65] hover:cursor-pointer"
                :class="{ '!bg-gradient-to-l from-sky-300 to-blue-600': activeItem == 'rental' }"
                @click="changeItemNav('rental')">
                <template v-if="activeItem == 'rental'">
                    <img src="../assets/rental-white.svg">
                </template>
                <template v-else>
                    <img src="../assets/rental.svg">
                </template>
                <p class="hidden group-hover:block ml-3 text-lg text-slate-600"
                    :class="{ 'text-white': activeItem == 'rental' }">Rental Data</p>
            </div>
        </div>
        <div class="w-[95%] bg-[#F8F7FA]">
            <div class="w-4 h-4 bg-black"></div>
        </div>
    </div>
</template>