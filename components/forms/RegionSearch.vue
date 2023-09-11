<template>
  <div v-clickaway="hideList" class="relative">
    <SearchInput
      v-model="search"
      :aria-expanded="isShowing"
      placeholder="Search region/state"
      @keydown.down="onKeyDown"
      @keydown.up="onKeyUp"
      @keydown.enter="onKeyEnter"
      @onFocus="showList"
      @onClick="showList"
      @onCloseClick="onCloseClick"
    >
      <template #icon>
        <PinIcon class="h-6 w-6 absolute inset-0 m-4" />
      </template>
    </SearchInput>

    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isShowing"
        class="absolute z-10 mt-1 w-full rounded-md shadow-lg"
        :class="{
          'bg-white': filteredOptions.length > 0,
          'bg-gray-100': !filteredOptions.length,
        }"
      >
        <div v-if="isLoading" class="text-gray-500 text-center p-4 shadow-lg">
          Loading
        </div>
        <div
          v-else-if="filteredOptions.length === 0"
          class="text-gray-500 text-center p-4 shadow-lg"
        >
          No region/state found
        </div>
        <ListPicker
          v-else
          ref="listPicker"
          v-slot="{ item }"
          :items="filteredOptions"
          @selectItem="onSelectLocation"
        >
          <div>
            {{ item.toponymName
            }}{{ item.fcode === "ADM2" ? `, ${item.adminName1}` : "" }}
          </div>
        </ListPicker>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Geonames from "geonames.js";
import Fuse from "fuse.js";
import PinIcon from "./location/PinIcon.vue";
import SearchInput from "@/components/forms/input/SearchInput.vue";
import ListPicker from "@/components/forms/ListPicker.vue";

// custom type for responses from geonames API
type Place = {
  toponymName: string;
  fcode: string;
  adminName1: string;
};

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue", "select"]);
const listPicker = ref();
const onKeyDown = (event: Event) => {
  listPicker.value.incrementFocus(event);
};
const onKeyUp = (event: Event) => {
  listPicker.value.decrementFocus(event);
};
const onKeyEnter = () => listPicker.value.selectCurrentItem();

const search = ref("");
const isShowing = ref(false);
const isLoading = ref(false);

const { country } = useCountry();

const options = ref<Place[]>([]);
const geonames = Geonames({
  username: "myusername",
  encoding: "JSON",
});

const searchRegion = async () => {
  isLoading.value = true;
  const data = (await geonames.search({
    country: country.value,
    featureClass: "A",
    featureCode: ["ADM1", "ADM2"],
    maxRows: 1000,
  })) as { geonames: Place[] };
  options.value = data.geonames.sort((a, b) =>
    a.toponymName.localeCompare(b.toponymName),
  );
  isLoading.value = false;
};

const filteredOptions = computed(() => {
  const fuse = new Fuse(options.value, {
    includeScore: true,
    keys: ["toponymName"],
  });

  if (!search.value.trim()) {
    return options.value;
  }
  const result = fuse.search(search.value);
  return result.filter((x) => x.score && x.score < 0.3).map((x) => x.item);
});

watch(
  country,
  () => {
    searchRegion();
  },
  { immediate: true },
);

function showList() {
  isShowing.value = true;
}
function hideList() {
  isShowing.value = false;
}
async function onSelectLocation(item: Place) {
  emit("update:modelValue", "");
  await nextTick();
  search.value = item.toponymName;
  emit("update:modelValue", item.toponymName);
  emit("select", {
    type: item.fcode === "ADM2" ? "subregion" : "region",
    value: item.toponymName,
  });

  isShowing.value = false;
}
function onCloseClick() {
  search.value = "";
  emit("update:modelValue", "");
  emit("select", null);
}
</script>
