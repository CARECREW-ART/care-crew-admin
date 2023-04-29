<script>
export default {
    data() {
        return {
            activeItem: 'dashboard',
        }
    },
    methods: {
        changeItemNav(item) {
            console.log(item);
            this.activeItem = item;
            this.$router.push({ name: item });
        }
    }

}
</script>

<template>
    <div class="w-screen h-screen flex overflow-auto">
        <div class="group w-[6%] hover:w-[19%] flex flex-col items-center pt-3 transition-all sticky top-0">
            <p class="w-4/5">Care Crew</p>
            <div class="flex w-4/5 h-11 justify-center group-hover:justify-normal group-hover:pl-2 items-center rounded-md hover:bg-[#eeeeee65] hover:cursor-pointer"
                :class="{ '!bg-gradient-to-l from-sky-300 to-blue-600': activeItem == 'dashboard' }"
                @click="changeItemNav('dashboard')">
                <template v-if="activeItem == 'dashboard'">
                    <img src="../../assets/home-white.svg">
                </template>
                <template v-else>
                    <img src="../../assets/home.svg">
                </template>
                <p class="hidden group-hover:block ml-3 text-lg text-slate-600"
                    :class="{ 'text-white': activeItem == 'dashboard' }">Dashboard</p>
            </div>
            <div class="flex w-4/5 h-11 justify-center group-hover:justify-normal group-hover:pl-2 items-center mt-1 rounded-md hover:bg-[#eeeeee65] hover:cursor-pointer"
                :class="{ '!bg-gradient-to-l from-sky-300 to-blue-600': activeItem == 'art' }"
                @click="changeItemNav('art')">
                <template v-if="activeItem == 'art'">
                    <img src="../../assets/user-white.svg">
                </template>
                <template v-else>
                    <img src="../../assets/user.svg">
                </template>
                <p class="hidden group-hover:block ml-3 text-lg text-slate-600"
                    :class="{ 'text-white': activeItem == 'art' }">Art Data</p>
            </div>
            <div class="flex w-4/5 h-11 justify-center group-hover:justify-normal group-hover:pl-2 items-center mt-1 rounded-md hover:bg-[#eeeeee65] hover:cursor-pointer"
                :class="{ '!bg-gradient-to-l from-sky-300 to-blue-600': activeItem == 'customer' }"
                @click="changeItemNav('customer')">
                <template v-if="activeItem == 'customer'">
                    <img src="../../assets/user-white.svg">
                </template>
                <template v-else>
                    <img src="../../assets/user.svg">
                </template>
                <p class="hidden group-hover:block ml-3 text-lg text-slate-600"
                    :class="{ 'text-white': activeItem == 'customer' }">Customer</p>
            </div>
            <div class="flex w-4/5 h-11 justify-center group-hover:justify-normal group-hover:pl-2 items-center mt-1 rounded-md hover:bg-[#eeeeee65] hover:cursor-pointer"
                :class="{ '!bg-gradient-to-l from-sky-300 to-blue-600': activeItem == 'order' }"
                @click="changeItemNav('order')">
                <template v-if="activeItem == 'order'">
                    <img src="../../assets/rental-white.svg">
                </template>
                <template v-else>
                    <img src="../../assets/rental.svg">
                </template>
                <p class="hidden group-hover:block ml-3 text-lg text-slate-600"
                    :class="{ 'text-white': activeItem == 'order' }">Order Data</p>
            </div>
        </div>

        <div class="w-full bg-[#F8F7FA] overflow-y-auto">
            <div class="flex justify-end items-center w-[98%] my-7 h-16 mx-auto bg-white rounded-md drop-shadow-sm">
                <div>

                </div>
            </div>
            <div class="w-[98%] mx-auto">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>