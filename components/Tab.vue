<template>
  <div>
    <ul
      class="Tab__Nav hidden md:flex width-full gap-24 text-xl font-semibold"
      :style="{ justifyContent: justifyTabNavigation }"
    >
      <li
        v-for="tabId in tabIds"
        :key="tabId"
        :class="[
          'Tab_NavItem flex flex-col items-center',
          isActive(tabId)
            ? 'Tab_NavItem--active text-sushi-500'
            : 'text-gray-400 hover:text-gray-500',
        ]"
      >
        <a
          class="tab-nav-link"
          :href="`#${tabId}`"
          @click.prevent="setActive(tabId)"
        >
          <!-- Tab Title (desktop) -->
          <slot :name="`${tabId}-nav`" />
        </a>
        <div
          :class="[
            'Tab_NavItemUnderline mx-2 mt-2 border rounded h-2 border-transparent',
            isActive(tabId) ? 'bg-sushi-500' : 'bg-transparent',
          ]"
        />
      </li>
    </ul>
    <br>
    <div class="space-y-8 md:space-y-0">
      <div
        v-for="tabId in tabIds"
        :key="tabId"
        class="flex flex-col items-center gap-4 md:gap-0"
      >
        <div class="flex flex-col items-center md:hidden">
          <h3 class="text-2xl font-semibold text-sushi-500">
            <!-- Tab Title (mobile) -->
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
            'w-full block relative bg-white rounded-xl shadow-soft border py-8 px-8 md:px-16',
            !isActive(tabId) && 'md:hidden',
          ]"
        >
          <!-- Tab Content -->
          <slot :name="tabId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  width: calc(100% - 1rem);
}
</style>
