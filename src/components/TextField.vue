<template>
    <div class="relative">
        <input class="peer w-full outline-none border border-black p-[6px] rounded-md  focus:border-blue-600 focus:border-2"
            :type="type" v-model="text" placeholder=" "
            :class="{ 'border-blue-600 border-2': !!text, '!border-red-600 !border-2': !!error }" />
        <label
            class="absolute left-2 top-[6px] transition-all pointer-events-none peer-focus:top-[-12px] peer-focus:bg-white peer-focus:text-xs peer-focus:text-blue-600 px-1"
            :class="{ '!top-[-12px] bg-white text-xs text-blue-600': !!text, '!top-[-12px] !bg-white !text-xs !text-red-600': !!error }">{{
                titleField }}</label>
        <p class="hidden text-xs text-red-600" :class="{ '!block': !!error }">{{ error }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            error: ''
        }
    },
    props: {
        titleField: String,
        type: String
    }
}
</script>