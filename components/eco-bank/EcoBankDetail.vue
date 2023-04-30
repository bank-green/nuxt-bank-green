<template>
    <div class="contain space-y-24">
        <Tab :tab-ids="[ 'key-facts', 'products', 'fees' ]">
            <template v-slot:key-facts-nav>Key Facts</template>
            <template v-slot:products-nav>Products</template>
            <template v-slot:fees-nav>Fees</template>
            <template v-slot:key-facts>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p><strong>Type:</strong> Bank</p>
                    <p><strong>Mobile Banking:</strong> {{ getBankFeature('Mobile banking') }}</p>
                    <p><strong>Environmental Policy:</strong> {{ getBankFeature('Environmental Policy') }}</p>
                    <p><strong>Founded:</strong> {{ getBankFeature('Founded', 'NIL') }}</p>
                    <p><strong>Serving:</strong> {{ getBankFeature('Serving', 'NIL') }}</p>
                    <p><strong>Local Branches:</strong> {{ getBankFeature('Local Branches') }}</p>
                </div>
            </template>
            <template v-slot:products>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p><strong>Current Accounts:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Savings Accounts:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Credit Cards:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Mortgages of Loans:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Business Lending:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>ISAs:</strong> {{ getBankFeature('Current Accounts') }}</p>
                </div>
            </template>
            <template v-slot:fees>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p><strong>Overdraft Fee:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Account Maintenaince Fees:</strong> {{ getBankFeature('Current Accounts') }}</p>
                    <p><strong>Free ATM Network:</strong> {{ getBankFeature('Current Accounts') }}</p>
                </div>
            </template>
        </Tab>

        <Tab :tab-ids="['impact', 'security', 'service', 'convenience']" justify-tab-navigation="space-around">
            <template v-slot:impact-nav>Impact</template>
            <template v-slot:security-nav>Security</template>
            <template v-slot:service-nav>Service</template>
            <template v-slot:convenience-nav>Convenience</template>
            <template v-slot:impact></template>
            <template v-slot:security></template>
            <template v-slot:service></template>
            <template v-slot:convenience></template>
        </Tab>
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

function getBankFeature(featureName : string, defaultValue : string = "No") {
    props.bankFeatures.forEach(function(feature) {
        if (feature.feature.name === featureName)
            return feature.offered;
    });
    return defaultValue;
}
</script>