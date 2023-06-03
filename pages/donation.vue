<template>
    <div class="page">
        <div class="page-fade-in overflow-hidden max-w-screen">
            <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28">
                <div class="contain grid grid-cols-2 justify-center items-center pb-4 lg:pb-0 mb-4">
                    <template v-if="donation">
                        <div>
                            <PrismicImage
                                class="w-full h-full object-contain object-top"
                                v-if="donation.data['photo']"
                                alt="donation-image"
                                :field="donation.data['photo']"
                            />
                            <PrismicText 
                                :field="donation.data['title']" 
                                wrapper="h1" 
                                class="font-semibold text-xl md:text-3xl tracking-wider" 
                            />
                            <PrismicRichText 
                                :field="donation.data['description']" 
                                class="prose sm:prose-lg xl:prose-xl prose-blurb" 
                            />
                        </div>
                        <form class="bg-leaf-700 flex flex-col" @submit.prevent.stop="submit">
                            <PrismicText 
                                :field="donation.data['donation-title']" 
                                wrapper="h1" 
                                class="font-semibold text-xl md:text-3xl tracking-wider text-white" 
                            />
                            <PrismicRichText 
                                :field="donation.data['donation-description']" 
                                class="prose sm:prose-lg xl:prose-xl prose-blurb text-white" 
                            />
                            <div class="grid grid-cols-2">
                                <div v-for="(option) in donationOptions"
                                    :key="option.value"
                                    class="inline-block"
                                >
                                    <input v-model="selectedOption" 
                                        type="radio" 
                                        :id="option.value.toString()" 
                                        :value="option.value" 
                                        class="hidden" 
                                    />
                                    <label 
                                        class="w-full md:w-auto mt-6 flex justify-center"
                                        :class="selectedOption !== option.value ?
                                            'button-green-2' :
                                            'block font-medium bg-white focus:outline-none border border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-leaf-500 text-leaf-500 p-4 text-center w-full rounded-2xl shadow-green capitalize'
                                        "
                                        :for="option.value.toString()"
                                    >
                                        {{ option.label }}
                                    </label>
                                </div>
                            </div>
                            <button type="submit" 
                                class="button-green w-full md:w-auto mt-6 flex justify-center" 
                            >
                                <PrismicText 
                                    wrapper="span"
                                    :field="donation.data['donation-button']"
                                />
                            </button>
                        </form>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
//TODO: move to utils once Django backend is done
interface DonationOption {
    label: string;
    value: number | string;
}

const donationOptions : DonationOption[] = [
    { label: "One-time Donation", value: 'one-time' },
    { label: "Recurring Donation", value: 'recurring' },
    { label: "$25", value: 25 },
    { label: "$50", value: 50 },
    { label: "$100", value: 100 },
    { label: "$200", value: 200 },
    { label: "$500", value: 500 },
    { label: "$1000", value: 1000 },

]

const selectedOption = ref<number | string | null>(null);

const { client } = usePrismic()
const { data: donation } = await useAsyncData('donation', () => client.getSingle('donationpage'));

const submit = () => {
    console.log(selectedOption.value);
}
</script>