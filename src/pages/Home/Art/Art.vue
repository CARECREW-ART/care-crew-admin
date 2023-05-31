<script setup>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';
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
            artData: [
                {
                    name: 'Dino',
                    email: 'DinoSukinem@gmail.com',
                    salary: '2.000.000',
                    phone: '08812321234',
                    status: 'active'
                }
            ]
        }
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
        changePage(page) {
            this.pagination.currentPage = page;
        },
        changeDropDownItem(num) {
            this.currentItemDropDown = num;
        },
        detailPage() {
            this.$router.push({ name: 'detail-art' });
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
                <input type="text" class="outline-none bg-transparent" placeholder="Search...">
                <img class="cursor-pointer" src="@/assets/search.svg" />
            </div>
        </div>
        <div class="w-full h-[1px] bg-[#edebf0]  mt-4"></div>
        <div>
            <table class="w-full">
                <thead class="text-left border-b-[1px] border-[#edebf0] ">
                    <th class="pl-4 py-4 w-[16%]">
                        Nama
                    </th>
                    <th class="w-[20%]">Email</th>
                    <th class="w-[16%]">Salary</th>
                    <th class="w-[20%]">Phone Number</th>
                    <th class="w-[16%]">Status</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr v-for="item, index in artData" :key="index" class="border-b-[1px] border-[#edebf0]">
                        <td class="pl-4 py-4">{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.salary }}</td>
                        <td>{{ item.phone }}</td>
                        <td>
                            <p class="bg-green-100 inline-block py-[2px] px-2 rounded-md text-green-500 ">{{
                                item.status }}
                            </p>
                        </td>
                        <td>
                            <button @click="detailPage"
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
    </div>
</template>