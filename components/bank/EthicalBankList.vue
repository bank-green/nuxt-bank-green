<template>
    <transition-group
        enter-active-class="transform-gpu ease-out duration-300 transition"
        enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transform-gpu transition ease-in duration-190"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <EthicalBankListItem
            v-for="i in cardsCount"
            :key="i"
            :item="list[i - 1]"
            :loaded="loaded"
        />
    </transition-group>
</template>

<script>
import EthicalBankListItem from './EthicalBankListItem.vue'

export default {
    props: {
        list: Array,
        loaded: Boolean,
    },
    components: {
        EthicalBankListItem,
    },
    computed: {
        cardsCount() {
            if (this.loaded) return this.list.length
            return 3
        },
    },
}
</script>
