<template>
    <div class="contain">
        <ul class="flex width-full justify-center gap-24 text-xl font-semibold">
            <li :class="isActive('key-facts') ? 'text-sushi-500' : 'text-gray-400 hover:text-gray-500'" >
                <a class="tab-nav-link" @click.prevent="setActive('key-facts')" href="#key-facts">Key Facts</a>
            </li>
            <li :class="isActive('products') ? 'text-sushi-500' : 'text-gray-400 hover:text-gray-500'" >
                <a class="tab-nav-link" @click.prevent="setActive('products')" :class="{ active: isActive('products') }" href="#products">Products</a>
            </li>
            <li :class="isActive('fees') ? 'text-sushi-500' : 'text-gray-400 hover:text-gray-500'" >
                <a class="tab-nav-link" @click.prevent="setActive('fees')" :class="{ active: isActive('fees') }" href="#fees">Fees</a>
            </li>
        </ul>
        <br/>

        <div class="relative bg-white rounded-xl shadow-soft border py-8 px-16">
            <div :class="{ 'hidden': !isActive('key-facts') }" id="key-facts">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p><strong>Type:</strong> Bank</p>
                    <p><strong>Mobile Banking:</strong> {{ getBankFeature('Mobile banking') }}</p>
                    <p><strong>Environmental Policy:</strong> {{ getBankFeature('Environmental Policy') }}</p>
                    <p><strong>Founded:</strong> {{ getBankFeature('Founded', 'NIL') }}</p>
                    <p><strong>Serving:</strong> {{ getBankFeature('Serving', 'NIL') }}</p>
                    <p><strong>Local Branches:</strong> {{ getBankFeature('Local Branches') }}</p>
                </div>
            </div>
            <div :class="{ 'hidden': !isActive('products') }" id="products">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p><strong>Current Accounts:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Savings Accounts:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Credit Cards:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Mortgages of Loans:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Business Lending:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>ISAs:</strong> {{ getBankFeature('Current Accounts') }}</p>
                </div>
            </div>
            <div :class="{ 'hidden': !isActive('fees') }" id="fees">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p><strong>Overdraft Fee:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Account Maintenaince Fees:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Free ATM Network:</strong> {{ getBankFeature('Current Accounts') }}</p>
                </div>
            </div>
        </div>
        <!-- <br />
        <div>{{ bankFeatures }}</div> -->
    </div>
</template>

<script setup lang="ts">
interface BankFeature {
    offered: string;
    feature: {
        name: string;
    },
    details: string | null;
}

const props = defineProps<{
    fromTheWebsite: string,
    name: string,
    website: string,
    rating: string,
    bankFeatures: BankFeature[],
    tag: string
}>();

const activeTab = ref('key-facts');
function setActive(tabName: string) {
    if (!isActive(tabName))
        activeTab.value = tabName;
}
function isActive(tabName: string) {
    return activeTab.value === tabName;
}

function getBankFeature(featureName : string, defaultValue : string = "No") {
    props.bankFeatures.forEach(function(feature) {
        if (feature.feature.name === featureName)
            return feature.offered;
    });
    return defaultValue;
}
</script>