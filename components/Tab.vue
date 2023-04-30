<template>
<div>
    <ul class="flex width-full gap-24 text-xl font-semibold" :style="{ justifyContent: justifyTabNavigation}">
        <li 
            v-for="tabId in tabIds"
            :key="tabId"
            :class="[
                isActive(tabId) ? 'text-sushi-500' : 'text-gray-400 hover:text-gray-500'
            ]" 
        >
            <a 
                class="tab-nav-link" 
                @click.prevent="setActive(tabId)" 
                :href="`#${tabId}`">
                <slot :name="`${tabId}-nav`"></slot>
            </a>
            <div :class="[
                'mx-2 mt-2 border rounded h-2 border-transparent', 
                isActive(tabId) ? 'bg-sushi-500' : 'bg-transparent']"
            >
            </div>
        </li>
    </ul>
    <br/>
    <div class="relative bg-white rounded-xl shadow-soft border py-8 px-16">
        <div 
            v-for="tabId in tabIds"
            :key="tabId"
            :class="{ 'hidden': !isActive(tabId) }" 
            :id="tabId">
            <slot :name="tabId"></slot>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
    tabIds: string[];
    justifyTabNavigation: 'space-between' | 'center' | 'space-around'
}>(), {
    tabIds: () => [],
    justifyTabNavigation: 'center'
});

const activeTab = ref('');
if (props.tabIds.length)
    activeTab.value = props.tabIds[0];

function setActive(tabName: string) {
    if (!isActive(tabName))
        activeTab.value = tabName;
}
function isActive(tabName: string) {
    return activeTab.value === tabName;
}

watch(props.tabIds, (newValue, oldValue) => {
    if (newValue != oldValue && newValue.length && !newValue.includes(activeTab.value))
        setActive(newValue[0]);
});
</script>