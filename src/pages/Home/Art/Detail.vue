<script setup>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import ApiServices from '../../../services/ApiService';
</script>
<script>
export default {
    data() {
        return {
            details: {
            },
            pagination: {
                currentPage: 1,
                totalPage: 5,
                maxVisiblePages: 3,
            },
            dropdown: [10, 20, 30, 50],
            currentItemDropDown: 10,
            isLoading: false
        }
    },
    mounted(){
        this.getDetailAssistant()
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
        changeDropDownItem(num) {
            this.currentItemDropDown = num;
        },
        async getDetailAssistant(){
            this.isLoading = true
            await ApiServices.getDetailAssistant(this.$route.params.id, (success)=>{
                console.log(success)
                this.details = success
            }, (error)=>{
                this.isLoading = false
                swal({
                    title: 'Data detail tidak berhasil di ambil',
                    icon: 'warning'
                })
            })

            await ApiServices.getAllBank((success)=>{
                const findIndex = success.findIndex(bank => {
                    return bank.bank_id === this.details.m_assistant_accbank.bank_id
                })
                this.details.bank = success[findIndex];
            }, (onError)=>{

                this.isLoading = false
                swal({
                    title: 'Data detail tidak berhasil di ambil',
                    icon: 'warning'
                })
            })
            
            this.isLoading = false

        }
    }
}
</script>
<template>
    <div class="flex">
        <div class='basis-[30%] pt-8 pb-8 mb-6 bg-white rounded-md shadow-md'>
            <!-- Image Profile-->
            <figure>
                <div class="mx-auto w-28 h-28 rounded-lg overflow-hidden">
                    <img src="@/assets/dummy_art.jpg">
                </div>
                <figcaption class="text-center text-xl mt-2 text-slate-700 tracking-wide">{{ details.assistant_nickname }}</figcaption>
            </figure>

            <!-- Details Profile -->
            <div class="w-full h-[1px] mt-2 bg-gray-200"></div>
            <div class="mt-2 ml-3">
                <p class="text-gray-500 tracking-widest mb-2">DETAILS</p>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Full Name:</p>
                    <p class="font-lights ">{{ details.assistant_fullname }}</p>
                </div>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Nick Name:</p>
                    <p class="font-lights ">{{ details.assistant_nickname }}</p>
                </div>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Username:</p>
                    <p class="font-lights ">{{ details.assistant_username }}</p>
                </div>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Email Address:</p>
                    <p class="font-lights ">{{ details?.email_user?.email }}</p>
                </div>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Phone Number:</p>
                    <p class="font-lights ">{{ details.assistant_telp }}</p>
                </div>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Gender:</p>
                    <p class="font-lights ">{{ details.assistant_gender?.gender_value }}</p>
                </div>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Address:</p>
                    <p class="font-lights ">{{ details.address }}</p>
                </div>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Salary:</p>
                    <p class="font-lights ">{{ details.assistant_salary }}</p>
                </div>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900 self-center">Skill:</p>
                    <p class="font-lights bg-green-400 px-3 py-1 rounded-full text-white mr-2"
                        v-for="skill in details.assistant_skills?.split(',')">
                        {{
                            skill }}</p>
                </div>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Experience:</p>
                    <p class="font-lights ">{{ details.assistant_experience }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Account Number:</p>
                    <p class="font-lights ">{{ details.bank?.bank_name }} | {{ details.m_assistant_accbank?.accbank_value }} | {{ details.m_assistant_accbank?.accbank_name }}</p>
                </div>
            </div>
        </div>
        <!-- table Pagination -->
        <div class="basis-[68%] mx-auto mb-6 h-min bg-white rounded-md shadow-md">
            <!-- drop down -->
            <div class="flex w-full justify-between mt-8 px-5">
                <button @click="checkFocus" id="dropdown"
                    class="group flex relative border border-black w-14 rounded-md items-center justify-evenly" value="OFF">
                    <p>{{ currentItemDropDown }}</p>
                    <img class="transition-all group-focus:rotate-180" src="@/assets/arrow_down.svg" alt="">
                    <div
                        class="hidden group-focus:block absolute bottom-[-130px] bg-white drop-shadow-md rounded-md w-full p-2">
                        <ul>
                            <li v-for="(item, index) in dropdown" :key="index" class="hover:bg-[#f1f4fa] rounded-md mb-1"
                                @click="changeDropDownItem(item)"
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
            <!-- table -->
            <table class="w-full">
                <thead class="text-left border-b-[1px] border-[#edebf0]">
                    <th class="pl-4 py-4">Tenant Name</th>
                    <th>Length Of Lease</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    <tr class="border-b-[1px] border-[#edebf0]">
                        <td class="pl-4 py-6 flex items-center">
                            <!-- customer image -->
                            <div class="h-12 w-12 mr-2 overflow-hidden rounded-full">
                                <img src="@/assets/dummy_art.jpg" alt="profile">
                            </div>
                            <p>Anna Angi</p>
                        </td>
                        <td>
                            <p>2 months</p>
                        </td>
                        <td>
                            <p class="inline px-3 py-2 rounded-full bg-blue-300 text-white">On Progress</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination -->
            <div class="flex justify-between w-[98%] mx-auto py-4 items-center">
                <p>Showing 1 to 20 of enteries</p>
                <Pagination :currentPage="pagination.currentPage" :totalPages="pagination.totalPage"
                    :maxVisiblePages="pagination.maxVisiblePages" @change-page="changePage" />
            </div>
            <Loading v-model:active="isLoading" color="#2563EB"/>
        </div>
    </div>
</template>
