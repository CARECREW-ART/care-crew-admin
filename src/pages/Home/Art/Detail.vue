<script setup>
import $ from 'jquery';
import Pagination from '../../../components/Pagination.vue';
</script>
<script>
export default {
    data() {
        return {
            details: {
                fullName: 'Dini Sukarni',
                nickName: 'Dini',
                userName: 'Dini123',
                emailAddress: 'Dini123@gmail.com',
                phoneNumber: '08123421245631',
                gender: 'Wanita',
                address: 'Blok K No. 40',
                salary: '2.000.000',
                skill: [
                    'Memasak', 'Mencuci'
                ],
                experience: 'Pernah Bekerja Di Jonggol',
                accountNumber: 'Bank Jago | Dini Sukarni | 102948253'
            },
            pagination: {
                currentPage: 1,
                totalPage: 5,
                maxVisiblePages: 3,
            },
            dropdown: [10, 20, 30, 50],
            currentItemDropDown: 10,
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
    }
}
</script>
<template>
    <div class="flex">
        <div class='basis-[30%] pt-8 pb-14 mb-6 bg-white rounded-md shadow-md'>
            <!-- Image Profile-->
            <figure>
                <div class="mx-auto w-28 h-28 rounded-lg overflow-hidden">
                    <img class="w-full" src="../../../assets/dummy_art.jpg">
                </div>
                <figcaption class="text-center text-xl text-slate-700 tracking-wide">Dini Sukarni</figcaption>
            </figure>

            <!-- Details Profile -->
            <div class="w-full h-[1px] bg-gray-200"></div>
            <div class="mt-2 ml-3">
                <p class="text-gray-500 tracking-widest">DETAILS</p>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Full Name:</p>
                    <p class="font-lights ">{{ details.fullName }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Nick Name:</p>
                    <p class="font-lights ">{{ details.nickName }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Username:</p>
                    <p class="font-lights ">{{ details.userName }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Email Address:</p>
                    <p class="font-lights ">{{ details.emailAddress }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Phone Number:</p>
                    <p class="font-lights ">{{ details.phoneNumber }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Gender:</p>
                    <p class="font-lights ">{{ details.gender }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Address:</p>
                    <p class="font-lights ">{{ details.address }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Salary:</p>
                    <p class="font-lights ">{{ details.salary }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Skill:</p>
                    <p class="font-lights bg-green-400 px-3 py-1 rounded-full text-white mr-2"
                        v-for="skill in details.skill">
                        {{
                            skill }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Experience:</p>
                    <p class="font-lights ">{{ details.experience }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Phone Number:</p>
                    <p class="font-lights ">{{ details.phoneNumber }}</p>
                </div>
                <div class="flex">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Account Number:</p>
                    <p class="font-lights ">{{ details.accountNumber }}</p>
                </div>
            </div>
        </div>
        <!-- table Pagination -->
        <div class="basis-[68%] mx-auto h-min bg-white rounded-md shadow-md">
            <!-- drop down -->
            <div class="flex w-full justify-between mt-8 px-5">
                <button @click="checkFocus" id="dropdown"
                    class="group flex relative border border-black w-14 rounded-md items-center justify-evenly" value="OFF">
                    <p>{{ currentItemDropDown }}</p>
                    <img class="transition-all group-focus:rotate-180" src="../../../assets/arrow_down.svg" alt="">
                    <div
                        class="hidden group-focus:block absolute bottom-[-130px] bg-white drop-shadow-md rounded-md w-full p-2">
                        <ul>
                            <li v-for="item in dropdown" key="" class="hover:bg-[#f1f4fa] rounded-md mb-1"
                                :class="{ '!text-blue-800 !bg-[#dbecfa] ': currentItemDropDown == item }">{{ item
                                }}</li>
                        </ul>
                    </div>
                </button>
                <div class="flex p-2 bg-[#d5def3] rounded-md">
                    <input type="text" class="outline-none bg-transparent" placeholder="Search...">
                    <img class="cursor-pointer" src="../../../assets/search.svg" />
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
                        <td class="pl-4 py-6"></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination -->
            <div class="flex justify-between w-[98%] mx-auto py-4 items-center">
                <p>Showing 1 to 20 of enteries</p>
                <Pagination :currentPage="pagination.currentPage" :totalPages="pagination.totalPage"
                    :maxVisiblePages="pagination.maxVisiblePages" @change-page="changePage" />
            </div>
        </div>
    </div>
</template>
