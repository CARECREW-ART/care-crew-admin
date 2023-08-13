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
        formatToRupiah(value){
            let formatter = Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                currencyDisplay: 'symbol',
                minimumFractionDigits: 0
            })
            return formatter.format(value)
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

            if(this.details?.m_assistant_address?.province_id ?? null != null){
                await ApiServices.getProvince((success)=>{
                    const findIndex = success.findIndex( province => {
                        return this.details.m_assistant_address.province_id == province.province_id
                    } )
                    this.details.province =  success[findIndex]
                }, (error)=>{
                    swal({
                    title: error,
                    icon: 'warning'
                })
                    this.isLoading = false
                })
            }

            if(this.details?.m_assistant_address?.city_id ?? null != null) {
                await ApiServices.getCity(this.details.m_assistant_address.province_id, (success)=>{
                    const findIndex = success[0].m_city.findIndex( city => {
                        return this.details.m_assistant_address.city_id == city.city_id
                    } )
                    this.details.city =  success[0].m_city[findIndex]
                }, (error)=>{
                    swal({
                    title: error,
                    icon: 'warning'
                })
                    this.isLoading = false
                })
            }

            if(this.details?.m_assistant_address?.district_id ?? null != null){
                await ApiServices.getDistrict(this.details.m_assistant_address.city_id, (success)=>{
                    const findIndex = success[0].m_district.findIndex( district =>{
                        return this.details.m_assistant_address.district_id == district.district_id
                    } )
                    this.details.district = success[0].m_district[findIndex]
                }, (error)=>{
                    console.log(error)
                    swal({
                    title: error,
                    icon: 'warning'
                    })
                    this.isLoading = false
                })
            }

            if(this.details?.m_assistant_address?.village_id ?? null != null){
                await ApiServices.getVillage(this.details.m_assistant_address.district_id, (success)=>{
                    const findIndex = success[0].m_village.findIndex( village =>{
                        return this.details.m_assistant_address.village_id == village.village_id
                    } )
                    this.details.village = success[0].m_village[findIndex]
                }, (error)=>{
                    swal({
                    title: error,
                    icon: 'warning'
                    })
                    this.isLoading = false
                })
            }

            if(this.details?.m_assistant_address?.postalzip_id ?? null != null){
                await ApiServices.getPostalZip(this.details.m_assistant_address.village_id, (success)=>{
                    const findIndex = success[0].m_postalzip.findIndex( postal => {
                        return this.details.m_assistant_address.postalzip_id == postal.postalzip_id
                    } )
                    this.details.postal = success[0].m_postalzip[findIndex] 
                }, (error)=>{
                    swal({
                    title: error,
                    icon: 'warning'
                    })
                    this.isLoading = false
                })
            }
            
            this.isLoading = false

        }
    }
}
</script>
<template>
    <div class="flex">
        <div class='basis-[100%] pt-8 pb-8 mb-6 bg-white rounded-md shadow-md'>
            <!-- Image Profile-->
            <figure>
                <div class="mx-auto w-96 h-96 rounded-lg overflow-hidden">
                    <img :src="details.m_assistant_picture?.picture_path ?? ''">
                </div>
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
                    <p class="font-lights truncate">{{ details?.email_user?.email }}</p>
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
                    <p class="font-lights ">{{ details.province?.province_name }} {{ details.city?.city_name ?? null != null ? '| ' + details.city?.city_name : '' }} {{ details.district?.district_name ?? null != null ?  '| ' + details.district?.district_name : ''}} {{ details.village?.village_name ?? null != null ? '| ' + details.village?.village_name : '' }} {{ details.postal?.postalzip_value ?? null != null ? '| ' + details.postal?.postalzip_value : '' }}</p>
                </div>
                <div class="flex mb-1">
                    <p class="font-semibold flex-[0_0_auto] mr-1 text-slate-900">Salary:</p>
                    <p class="font-lights ">{{ formatToRupiah( details.assistant_salary) }}</p>
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
            <Loading v-model:active="isLoading" color="#2563EB"/>
        </div>
    </div>
</template>
