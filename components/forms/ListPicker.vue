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
            :ref="`item_${index}`"
            role="option"
            tabindex="0"
            class="text-gray-900 cursor-default relative py-3 pl-4 pr-9 mx-2 rounded-md"
            :class="focusedItemIndex === index ? 'bg-sushi-100' : ''"
            @click="onSelectItem(index)"
            @keydown.down="event => incrementFocus(event)"
            @keydown.up="event => decrementFocus(event)"
            @keydown.enter="() => onSelectItem(index)"
        >
            <slot v-bind:item="item" />
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        items: Array,
    },
    data() {
        return {
            focusedItemIndex: -1,
        }
    },
    emits: ['selectItem'],
    methods: {
        focusItem(indexToFocus, eventToPrevent) {
            if (this.focusedItemIndex === indexToFocus) return

            eventToPrevent?.preventDefault()
            const itemToFocus = this.$refs[`item_${indexToFocus}`]

            if (!itemToFocus) return

            this.focusedItemIndex = indexToFocus

            itemToFocus.scrollIntoView(false)
        },
        incrementFocus(eventToPrevent) {
            this.focusItem(this.focusedItemIndex + 1, eventToPrevent)
        },
        decrementFocus(eventToPrevent) {
            this.focusItem(this.focusedItemIndex - 1, eventToPrevent)
        },
        selectCurrentItem() {
            this.onSelectItem(this.focusedItemIndex)
        },
        async onSelectItem(index) {
            const item = this.items[index]
            if (item) {
                this.$emit('selectItem', item)
            }
        },
    },
}
</script>
