<template>
    <transition-group enter-active-class="transform-gpu ease-out duration-300 transition"
        enter-from-class="-translate-y-2 opacity-0" enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transform-gpu transition ease-in duration-190" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <li class="list-none" v-for="i in list.length" :key="i">
            <EcoBankCard :item="list[i - 1]" :isNoCredit="isNoCredit" />
        </li>
    </transition-group>
</template>

<script setup>
const props = defineProps({
    list: Array,
    isNoCredit: Boolean,
})
</script>
