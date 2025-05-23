<template>
  <div>
    <!-- desktop version -->
    <ul
      class="Tab__Nav hidden md:flex gap-10 text-xl justify-center"
      :style="{ justifyContent: justifyTabNavigation }"
    >
      <li
        v-for="tabId in tabIds"
        :key="tabId"
        :class="[
          'Tab_NavItem flex flex-col items-center',
          isActive(tabId)
            ? 'Tab_NavItem--active text-sushi-500 sm:text-gray-900 font-semibold'
            : 'text-[#525252] hover:text-gray-800',
        ]"
      >
        <a
          class="tab-nav-link"
          :href="`#${tabId}`"
          @click.prevent="setActive(tabId)"
        >
          <slot :name="`${tabId}-nav`" />
        </a>
        <div
          :class="[
            'Tab_NavItemUnderline mx-2 mt-2 border sm:rounded-none rounded sm:h-[2px] h-2 border-transparent',
            isActive(tabId) ? 'bg-sushi-500' : 'bg-transparent',
          ]"
        />
      </li>
    </ul>
    <br>

    <!-- mobile version -->
    <div class="space-y-8 md:space-y-0">
      <div
        v-for="tabId in tabIds"
        :key="tabId"
        class="flex flex-col items-center gap-4 md:gap-0"
      >
        <div class="flex flex-col items-center md:hidden">
          <h3 class="text-2xl font-semibold text-sushi-500">
            <slot :name="`${tabId}-nav`" />
          </h3>
          <div
            class="mx-2 mt-2 border rounded h-2 border-transparent bg-sushi-500"
            style="width: calc(100% - 1rem)"
          />
        </div>
        <div
          :id="tabId"
          :class="[
            'w-full block relative bg-white rounded-xl sm:py-12 py-10 px-6',
            !isActive(tabId) && 'md:hidden',
          ]"
        >
          <!-- Tab Content -->
          <div class="max-w-[808px] mx-auto grid gap-6 ">
            <slot :name="tabId" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:activeTab'])

const props = withDefaults(
  defineProps<{
    tabIds: string[]
    justifyTabNavigation?: 'space-between' | 'center' | 'space-around'
  }>(),
  {
    tabIds: () => [],
    justifyTabNavigation: 'center',
  },
)

const activeTab = ref('')
if (props.tabIds.length) { activeTab.value = props.tabIds[0] }

function setActive(tabName: string) {
  if (!isActive(tabName)) { activeTab.value = tabName }
  emits('update:activeTab', tabName)
}
function isActive(tabName: string) {
  return activeTab.value === tabName
}

watch(
  () => props.tabIds,
  (newValue, oldValue) => {
    if (
      newValue !== oldValue
      && newValue.length
      && !newValue.includes(activeTab.value)
    ) { setActive(newValue[0]) }
  },
)
</script>

<style scoped>
.Tab_NavItem .Tab_NavItemUnderline {
  width: 0;
  transition: 0.3s all ease;
}

.Tab_NavItem.Tab_NavItem--active .Tab_NavItemUnderline {
  width: calc(100% + 2rem);
}
</style>
