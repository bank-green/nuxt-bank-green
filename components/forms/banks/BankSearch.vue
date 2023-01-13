<template>
    <div v-if="hasBanks && loaded && !disabled" v-clickaway="hideList">
        <div class="relative">
            <SearchInput ref="input" :aria-expanded="isShowing" v-model="search" :placeholder="'Search bank...'"
                @keydown.down="
                    event => $refs['listPicker'].incrementFocus(event)
                " @keydown.up="event => $refs['listPicker'].decrementFocus(event)" @keydown.enter="
    event => $refs['listPicker'].selectCurrentItem()
" @onFocus="showList" @onClick="showList" @onCloseClick="onCloseClick">
                <template v-slot:icon>
                    <BankIcon class="h-6 w-6 absolute inset-0 m-4" />
                </template>
            </SearchInput>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <div v-if="isShowing" class="absolute z-10 mt-1 w-full rounded-md shadow-lg" :class="{
                    'bg-white': filteredBanks.length > 0,
                    'bg-gray-100': !filteredBanks.length,
                }">
                    <slot v-if="filteredBanks.length === 0" name="not-listed">
                        <NuxtLink to="/not-listed">
                            <div class="text-gray-500 text-center p-4 shadow-lg underline">
                                My bank isn't listed
                            </div>
                        </NuxtLink>
                    </slot>
                    <ListPicker ref="listPicker" v-else :items="filteredBanks" v-slot="{ item }"
                        @selectItem="onSelectBank">
                        <BankSearchItem :id="item.tag" :name="item.name" :website="item.website"
                            :isSelected="item === modelValue" />
                    </ListPicker>
                </div>
            </transition>
        </div>
    </div>
    <div v-else class="relative flex items-center">
        <div
            class="relative w-full border border-gray-50 text-gray-400 bg-gray-50 rounded-xl shadow-sm pl-12 pr-10 py-4 text-left cursor-default sm:text-sm truncate select-none">
            <span v-if="disabled">
                Set a country first
            </span>
            <span v-else-if="!loaded">
                Loading banks...
            </span>
            <span v-else-if="!hasBanks">
                No banks available in this country.
            </span>
        </div>

        <LoadingJumper v-if="!loaded && !disabled" class="h-5 w-5 absolute inset-0 m-4 text-sushi-500" />
        <BankIcon v-else class="h-6 w-6 absolute inset-0 m-4" />
    </div>
</template>

<script>
import BankSearchItem from './BankSearchItem.vue'
import BankIcon from './BankIcon.vue'
import { findBanks } from './banks'
import LoadingJumper from '../../LoadingJumper.vue'
import SearchInput from '@/components/forms/input/SearchInput'
import ListPicker from '@/components/forms/ListPicker'

let pageStart = new Date()
export default {
    props: {
        disabled: Boolean,
        country: String,
        modelValue: Object,
    },
    components: {
        BankIcon,
        BankSearchItem,
        LoadingJumper,
        SearchInput,
        ListPicker,
    },
    data() {
        return {
            banks: [],
            loaded: false,
            search: '',
            isShowing: false,
            highlightBank: '',
            selectedItem: null
        }
    },
    computed: {
        hasBanks() {
            return this.banks.length > 0
        },
        filteredBanks() {
            return findBanks(this.banks, this.search)
        },
    },

    watch: {
        async country() {
            await this.loadBanks()
            await this.$nextTick()
            if (this.$refs.input && new Date() - pageStart > 15000) {
                this.$refs.input.focus()
            }
        },
        search() {
            if (this.modelValue && this.search !== this.selectedItem) {
                this.$emit('update:modelValue', null)
            }
            this.$emit('searchInputChange', this.search)
        },
    },
    created() {
        this.loadBanks()
    },
    methods: {
        async loadBanks() {
            if (this.disabled) {
                return
            }
            this.loaded = false
            this.search = ''
            this.banks = await getBanksList({ country: this.country })
            this.loaded = true
        },
        onKeyDown() {
            if (this.search.length > 0 && this.loaded) {
                this.showList()
            }
        },
        showList() {
            this.isShowing = true
        },
        hideList() {
            this.isShowing = false
        },
        async onSelectBank(item) {
            this.$emit('update:modelValue', null)
            await this.$nextTick()
            this.search = item.name
            this.selectedItem = item.name
            this.$emit('update:modelValue', item)
            this.isShowing = false
        },
        onCloseClick() {
            this.search = ''
            this.$emit('update:modelValue', null)
        },
    },
}
</script>
