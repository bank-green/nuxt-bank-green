<template>
    <div v-if="hasBanks && loaded && !disabled" v-clickaway="hideList">
        <div class="relative">
            <SearchInput ref="input" :aria-expanded="isShowing" v-model="search" :placeholder="'Search bank...'"
                @keydown.down="(event: PointerEvent) => ($refs['listPicker'] as typeof ListPicker).incrementFocus(event)
                    "
                @keydown.up="(event: PointerEvent) => ($refs['listPicker'] as typeof ListPicker).decrementFocus(event)"
                @keydown.enter="(_event: PointerEvent) => ($refs['listPicker'] as typeof ListPicker).selectCurrentItem()
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
                    <ListPicker ref="listPicker" v-else :items="filteredBanks" v-slot="{ item }" @selectItem="onSelectBank">
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
<script setup lang="ts">
import { findBanks } from './banks'
import BankIcon from './BankIcon.vue'
import BankSearchItem from './BankSearchItem.vue'
import LoadingJumper from '../../LoadingJumper.vue'
import SearchInput from '../input/SearchInput.vue'
import ListPicker from '../ListPicker.vue'

const props = defineProps<{
    disabled: Boolean,
    country: String,
    modelValue: Object | null,
}>();

const emit = defineEmits(['update:modelValue', 'searchInputChange']);

const pageStart = new Date();
const banks = ref([]);
const loaded = ref(false);
const search = ref('');
const isShowing = ref(false);
const selectedItem = ref(null);
const input = ref<HTMLInputElement | null>(null);

const hasBanks = computed(() => banks.value.length > 0);
const filteredBanks = computed(() =>
    findBanks(banks.value, search.value)
);

onMounted(() => {
    loadBanks();
});

watch(() => props.country, async function () {
    await loadBanks();
    await nextTick();
    if ((input.value) && (+new Date() - +pageStart > 15000)) {
        input.value.focus();
    }
});

watch(() => search, function (newValue) {
    if (props.modelValue && newValue != selectedItem.value) {
        emit('update:modelValue', null);
    }
    emit('searchInputChange', newValue);
})

async function loadBanks() {
    if (props.disabled)
        return;
    loaded.value = false;
    search.value = '';
    banks.value = await getBanksList({ country: props.country })
    loaded.value = true;
}

function showList() {
    isShowing.value = true;
}

function hideList() {
    isShowing.value = false;
}

async function onSelectBank(item) {
    emit('update:modelValue', null);
    await nextTick();
    search.value = item.name;
    selectedItem.value = item.name;
    emit('update:modelValue', item);
    isShowing.value = false;
}

function onCloseClick() {
    search.value = '';
    emit('update:modelValue', null);
}

</script>
