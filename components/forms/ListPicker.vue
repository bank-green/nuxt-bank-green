<template>
  <ul
    ref="list"
    role="listbox"
    aria-labelledby="listbox-label"
    aria-activedescendant="nz"
    class="max-h-60 rounded-md py-1 text-base overflow-auto sm:text-sm"
  >
    <li
      v-for="(item, index) in items"
      :key="index"
      :ref="(el) => (itemArrRef[index] = el)"
      role="option"
      tabindex="0"
      class="text-gray-900 cursor-default relative py-3 pl-4 pr-9 mx-2 rounded-md"
      :class="focusedItemIndex === index ? 'bg-sushi-100' : ''"
      @click="onSelectItem(index)"
      @keydown.down="(event) => incrementFocus(event)"
      @keydown.up="(event) => decrementFocus(event)"
      @keydown.enter="() => onSelectItem(index)"
    >
      <slot :item="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: any[];
}>();

const emit = defineEmits(["selectItem"]);

const itemArrRef = ref<InstanceType<typeof HTMLLIElement>[]>([]);
const focusedItemIndex = ref(-1);

function focusItem(indexToFocus: number, eventToPrevent: Event) {
  if (focusedItemIndex.value === indexToFocus) return;

  eventToPrevent?.preventDefault();
  const itemToFocus = itemArrRef.value[indexToFocus];

  if (!itemToFocus) return;

  focusedItemIndex.value = indexToFocus;

  itemToFocus.scrollIntoView(false);
}
function incrementFocus(eventToPrevent: Event) {
  focusItem(focusedItemIndex.value + 1, eventToPrevent);
}
function decrementFocus(eventToPrevent: Event) {
  focusItem(focusedItemIndex.value - 1, eventToPrevent);
}
function selectCurrentItem() {
  onSelectItem(focusedItemIndex.value);
}
async function onSelectItem(index: number) {
  const item = props.items[index];
  if (item) {
    emit("selectItem", item);
  }
}
</script>
