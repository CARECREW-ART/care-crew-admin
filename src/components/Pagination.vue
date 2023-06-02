<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        maxVisiblePages: {
            type: Number,
            default: 5
        }
    },
    computed: {
        pages() {
            const { currentPage, totalPages, maxVisiblePages } = this;
            let startPage, endPage;

            if (totalPages <= maxVisiblePages) {
                startPage = 2;
                endPage = totalPages;
            } else {
                const maxBeforeCurrent = Math.floor(maxVisiblePages / 2);
                const maxAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

                if (currentPage <= maxBeforeCurrent) {
                    startPage = 2;
                    endPage = maxVisiblePages;
                } else if (currentPage + maxAfterCurrent >= totalPages) {
                    startPage = totalPages - maxVisiblePages + 1;
                    endPage = totalPages - 1;
                } else {
                    startPage = currentPage - maxBeforeCurrent + 1;
                    endPage = currentPage + maxAfterCurrent;

                }
            }

            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            return pages;
        },
        showDotsAfter() {
            const { currentPage, totalPages, maxVisiblePages } = this;
            return (currentPage + Math.floor(maxVisiblePages / 2) + 1 < totalPages) && totalPages != maxVisiblePages && totalPages > maxVisiblePages + 1;
        },
        showDotsBefore() {
            const { currentPage, totalPages, maxVisiblePages } = this;
            return currentPage + Math.floor(maxVisiblePages / 2) + 1 >= totalPages && totalPages != maxVisiblePages && totalPages > maxVisiblePages + 1;
        }
    },
    methods: {
        changePage(page) {
            console.log(page);
            this.$emit('change-page', page);
        },
        previousPage() {
            let { currentPage } = this;
            if (currentPage == 1) return;
            currentPage -= 1;
            this.$emit('change-page', currentPage);
        },
        nexPage() {
            let { currentPage, totalPages } = this;
            if (currentPage == totalPages) return;
            currentPage += 1;
            this.$emit('change-page', currentPage);
        }
    }
}
</script>

<template>
    <ul class="flex">
        <li class="w-8 h-8 rounded-md flex justify-center items-center mr-1 text-lg select-none"
            :class="{ 'bg-[#EEEEEF] hover:bg-[#E9E9EA] cursor-pointer': currentPage != 1 }" @click.prevent="previousPage">
            <p>&lt;</p>
        </li>
        <li class="w-8 h-8 bg-[#EEEEEF] hover:bg-[#E9E9EA] cursor-pointer rounded-md flex justify-center items-center mr-1 text-sm select-none"
            :class="{ 'bg-blue-100 hover:bg-blue-50': currentPage == 1 }" @click.prevent="changePage(1)">
            <a href="#">1</a>
        </li>
        <li v-if="showDotsBefore" class="select-none"><span>...</span></li>
        <li class="w-8 h-8 bg-[#EEEEEF] hover:bg-[#E9E9EA] cursor-pointer rounded-md flex justify-center items-center mr-1 text-sm select-none"
            :class="{ 'bg-blue-100 hover:bg-blue-50': currentPage == page }" v-for="(page, index) in pages" :key="index"
            @click.prevent="changePage(page)">
            <a href="#">{{ page }}</a>
        </li>
        <li v-if="showDotsAfter && totalPages" class="select-none"><span>...</span></li>
        <li class="w-8 h-8 bg-[#EEEEEF] hover:bg-[#E9E9EA] cursor-pointer rounded-md flex justify-center items-center mr-1 text-sm select-none"
            :class="{ 'bg-blue-100 hover:bg-blue-50': currentPage == totalPages }" v-if="totalPages > maxVisiblePages"
            @click.prevent="changePage(totalPages)">
            <a href="#">{{ totalPages }}</a>
        </li>
        <li class="w-8 h-8 rounded-md flex justify-center items-center text-lg  select-none"
            :class="{ 'bg-[#EEEEEF] hover:bg-[#E9E9EA] cursor-pointer': currentPage != totalPages }"
            @click.prevent="nexPage">
            <p>&gt;</p>
        </li>
    </ul>
</template>