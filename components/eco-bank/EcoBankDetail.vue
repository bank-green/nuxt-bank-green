<template>
    <div class="contain space-y-8 md:space-y-16">
        <Tab :tabIds="['key-facts', 'products', 'fees']" class="w-full lg:w-3/4 xl:w-2/3 mx-auto">
            <template v-slot:key-facts-nav>Key Facts</template>
            <template v-slot:products-nav>Products</template>
            <template v-slot:fees-nav>Fees</template>
            <template v-slot:key-facts>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:-mr-16">
                    <p><strong>Type:</strong>
                        {{ institutionType || 'Bank' }}
                    </p>
                    <p><strong>Mobile Banking:</strong>
                        {{ getBankFeature('Mobile banking') }}
                    </p>
                    <p><strong>Environmental Policy:</strong>
                        {{ getBankFeature('Environmental Policy') }}
                    </p>
                    <p>
                        <strong>Founded: </strong>
                        <span v-if="prismicPageData?.founded" :field="prismicPageData.founded">{{ prismicPageData.founded
                        }}</span>
                    </p>
                    <p>
                        <strong>Serving: </strong>
                        <PrismicText v-if="prismicPageData?.serving" :field="prismicPageData.serving" wrapper="span"
                            fallback="" />
                    </p>
                    <p><strong>Local Branches: </strong>
                        {{ getBankFeature('Local Branches') }}
                    </p>
                </div>
            </template>
            <template v-slot:products>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:-mr-24">
                    <p><strong>Current Accounts:</strong>
                        {{ getBankFeature('checking') }}
                    </p>
                    <p><strong>Savings Accounts:</strong>
                        {{ getBankFeature('saving') }}
                    </p>
                    <p><strong>Credit Cards:</strong>
                        {{ getBankFeature('Credit cards') }}
                    </p>
                    <p><strong>Mortgages or Loans:</strong>
                        {{ getBankFeature('Mortgages or Loans') }}
                    </p>
                    <p><strong>Business Lending:</strong>
                        {{ getBankFeature('Small business lending') }}
                    </p>
                    <p><strong>ISAs:</strong>
                        {{ getBankFeature('ISAs') }}
                    </p>
                </div>
            </template>
            <template v-slot:fees>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:-mr-16">
                    <p><strong>Overdraft Fee:</strong>
                        {{ getInvertedBankFeature('No overdraft fee', 'Yes') }}
                    </p>
                    <p><strong>Account Maintenaince Fee:</strong>
                        {{ getInvertedBankFeature('No account maintenance fee', 'Yes') }}
                    </p>
                    <p><strong>Free ATM Network:</strong>
                        {{ getBankFeature('Free ATM network') }}
                    </p>
                </div>
            </template>
        </Tab>
        <Tab v-if="tabIds.length > 0" :tabIds="tabIds" justifyTabNavigation="space-around">
            <template v-slot:impact-nav>Impact</template>
            <template v-slot:security-nav>Security</template>
            <template v-slot:services-nav>Service</template>
            <template v-slot:convenience-nav>Convenience</template>
            <template v-slot:impact>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <PrismicRichText class="pt-8 text-md md:text-lg tracking-wide space-y-6"
                        :field="prismicPageData?.impact" />
                    <div class=" order-first lg:order-last flex items-center justify-center">
                        <PrismicImage class="w-full md:w-3/4 mx-auto object-contain object-top"
                            v-if="prismicDefaultPageData && prismicDefaultPageData['impact-image']" alt="impact-image"
                            :field="prismicDefaultPageData['impact-image']" />
                    </div>
                </div>
            </template>
            <template v-slot:security>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <PrismicRichText class="pt-8 text-md md:text-lg tracking-wide space-y-6"
                        :field="prismicPageData?.security" />
                    <div class=" order-first lg:order-last flex items-center justify-center">
                        <PrismicImage class="w-full md:w-3/4 mx-auto object-contain object-top"
                            v-if="prismicDefaultPageData && prismicDefaultPageData['security-image']" alt="security-image"
                            :field="prismicDefaultPageData['security-image']" />
                    </div>
                </div>
            </template>
            <template v-slot:services>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <PrismicRichText class="pt-8 text-md md:text-lg tracking-wide space-y-6"
                        :field="prismicPageData?.services" />
                    <div class=" order-first lg:order-last flex items-center justify-center">
                        <PrismicImage class="w-full md:w-3/4 mx-auto object-contain object-top"
                            v-if="prismicDefaultPageData && prismicDefaultPageData['service-image']" alt="service-image"
                            :field="prismicDefaultPageData['service-image']" />
                    </div>
                </div>
            </template>
            <template v-slot:convenience>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <PrismicRichText class="pt-8 text-md md:text-lg tracking-wide space-y-6"
                        :field="prismicPageData?.convenience" />
                    <div class=" order-first lg:order-last flex items-center justify-center">
                        <PrismicImage class="w-full md:w-3/4 mx-auto object-contain object-top"
                            v-if="prismicDefaultPageData && prismicDefaultPageData['convenience-image']"
                            alt="convenience-image" :field="prismicDefaultPageData['convenience-image']" />
                    </div>
                </div>
            </template>
        </Tab>
        <div v-else :class="[
            'w-full block relative bg-white rounded-xl shadow-soft border py-12 px-8 md:px-16',
            'contain sm:text-center'
        ]">
            <div class="mb-8">
                <h2 class="font-semibold text-2xl text-gray-800 mb-8 sm:text-4xl sm:mb-4">
                    {{ `From the website of ${name}` }}
                </h2>
                <p class="whitespace-pre-line text-gray-500 sm:text-xl">
                    {{ fromTheWebsite }}
                </p>
            </div>
        </div>

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
    institutionType: string | undefined,
    fromTheWebsite: string,
    name: string,
    website: string,
    rating: string,
    bankFeatures: BankFeature[],
    tag: string,
    prismicPageData: Record<string, any> | null,
    prismicDefaultPageData: Record<string, any> | null,
}>();

const tabIds = computed(() =>
    ['impact', 'security', 'services', 'convenience'].filter(tabId =>
        props?.prismicPageData && props.prismicPageData[tabId] && props.prismicPageData[tabId].length > 0
    )
)

function getBankFeature(featureName: string, defaultValue: string = "No") {
    const feature = props.bankFeatures.find((feature) =>
        feature.feature.name === featureName
    );
    if (feature)
        return feature.details || feature.offered;
    return defaultValue;
}

function getInvertedBankFeature(featureName: string, defaultValue: string = "No") {
    const feature = props.bankFeatures.find((feature) =>
        feature.feature.name === featureName
    );
    if (feature)
        return feature.details || (feature.offered === 'Yes' ? 'No' : 'Yes');
    return defaultValue;
}
</script>
