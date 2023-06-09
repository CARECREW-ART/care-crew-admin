<script setup>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';
import ApiServices from '../../../services/ApiService';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import swal from 'sweetalert';
</script>

<script>
export default {
    data() {
        return {
            dropdown: [10, 20, 30, 50],
            currentItemDropDown: 10,
            pagination: {
                currentPage: 1,
                totalPage: 5,
                maxVisiblePages: 3,
            },
            customerData: [],
            search: '',
            isLoading: false
        }
    },
    mounted(){
        this.getCustomer()
    },
    methods: {
        checkFocus() {
            if ($('#dropdown').val() == 'ON') {
                $('#dropdown').blur();
                $('#dropdown').val('OFF');
            } else {
                $('#dropdown').val('ON');
            }
        },
        async getCustomer(page){
            this.isLoading = true
            await ApiServices.getCustomer(this.currentItemDropDown, this.search, page != null ? page : 1, 
            (success)=>{
                this.isLoading = false
                this.pagination.totalPage = Math.ceil(success.total / success.per_page)
                this.customerData = success.data
            }, (error)=>{
                this.isLoading = false
                swal({
                    title: 'Data tidak berhasil di ambil',
                    icon: 'warning'
                })
            })
        },
        changePage(page) {
            this.pagination.currentPage = page;
            this.getCustomer(page)
        },
        changeDropDownItem(num) {
            this.currentItemDropDown = num;
        },
        detailPage(id) {
            this.$router.push({ name: 'detail-customer', params:{ id : id} });
        }
    }
}
</script>


<template>
    <div class="flex flex-col w-full bg-white rounded-md drop-shadow-sm">
        <div class="flex w-full justify-between mt-8 px-5">
            <button @click="checkFocus" id="dropdown"
                class="group flex relative border border-black w-14 rounded-md items-center justify-evenly" value="OFF">
                <p>{{ currentItemDropDown }}</p>
                <img class="transition-all group-focus:rotate-180" src="@/assets/arrow_down.svg" alt="">
                <div
                    class="hidden group-focus:block absolute bottom-[-130px] bg-white drop-shadow-md rounded-md w-full p-2">
                    <ul>
                        <li v-for="(item, index) in dropdown" :key="index" @click="changeDropDownItem(item)"
                            class="hover:bg-[#f1f4fa] rounded-md mb-1"
                            :class="{ '!text-blue-800 !bg-[#dbecfa] ': currentItemDropDown == item }">{{ item
                            }}</li>
                    </ul>
                </div>
            </button>
            <div class="flex p-2 bg-[#d5def3] rounded-md">
                <input v-model="search" type="text" class="outline-none bg-transparent" placeholder="Search..." @keydown.enter="getCustomer()">
                <img class="cursor-pointer" src="@/assets/search.svg" @click="getCustomer()" />
            </div>
        </div>
        <div class="w-full h-[1px] bg-[#edebf0]  mt-4"></div>
        <div>
            <table class="w-full">
                <thead class="text-left border-b-[1px] border-[#edebf0] ">
                    <th class="pl-4 py-4 w-[16%]">
                        Full Name
                    </th>
                    <th class="w-[20%]">Email</th>
                    <th class="w-[16%]">Nickname</th>
                    <th class="w-[20%]">Phone Number</th>
                    <th class="w-[16%]">Username</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr v-for="item, index in customerData" :key="index" class="border-b-[1px] border-[#edebf0]">
                        <td class="pl-4 py-4">{{ item.customer_fullname }}</td>
                        <td>{{ item.email_user?.email }}</td>
                        <td>{{ item.customer_nickname }}</td>
                        <td>{{ item.customer_telp }}</td>
                        <td>{{ item.customer_username }}</td>
                        <td>
                            <button @click="detailPage(item.user_id)"
                                class="bg-blue-500 hover:bg-blue-400 rounded-md text-white px-3 py-1">Detail</button>
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>
        <div class="flex justify-between w-[98%] mx-auto py-4 items-center">
            <p>Showing 1 to 20 of enteries</p>
            <Pagination :currentPage="pagination.currentPage" :totalPages="pagination.totalPage"
                :maxVisiblePages="pagination.maxVisiblePages" @change-page="changePage" />
        </div>
        <Loading v-model:active="isLoading" color="#2563EB"/>
    </div>
</template>