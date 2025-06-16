<script setup lang="ts">
const { client } = usePrismic();
const { data: donation } = await useAsyncData('donation', () =>
  client.getSingle('donationpage')
);
usePrismicSEO(donation.value?.data);

useHead({
  script: [
    {
      src: 'https://cdn.raisely.com/v3/public/embed.js',
      defer: true,
      async: true,
    },
  ],
});
</script>

<template>
  <div class="page">
    <div class="page-fade-in overflow-hidden max-w-screen">
      <div
        class="bg-gradient-to-b from-sushi-50 to-pistachio-green pb-28 pt-36"
      >
        <div
          class="contain grid grid-cols-1 md:grid-cols-2 justify-center items-center pb-4 lg:pb-0 mb-4 gap-16"
        >
          <div class="space-y-8">
            <PrismicImage
              v-if="donation?.data.photo"
              class="w-full h-full object-contain object-top"
              alt="donation-image"
              :field="donation?.data.photo"
            />
            <PrismicText
              :field="donation?.data.title"
              wrapper="h2"
              class="font-semibold text-xl md:text-3xl tracking-wider"
              fallback="Help us build a greener future!"
            />
            <PrismicRichText
              v-if="donation?.data.description"
              :field="donation?.data.description"
              class="prose sm:prose-lg xl:prose-xl prose-blurb"
            />
            <div v-else class="prose sm:prose-lg xl:prose-xl prose-blurb">
              <p>
                By supporting Bank.Green’s mission, you'll empower individuals
                and businesses to make responsible financial decisions,
                channeling their deposits towards green financial institutions.
                Bank.Green is a project of a registered charity and all U.S.
                donations are tax-deductible.
              </p>
              <p>
                Your donation will help us raise awareness, provide resources,
                and foster a global community dedicated to protecting our
                planet.
              </p>
              <p>
                <em>
                  Bank.Green is a project of a registered charity and all U.S.
                  donations are tax-deductible.
                </em>
              </p>
            </div>
          </div>
          <div
            class="relative w-full flex items-center justify-center bg-leaf-700 rounded-2xl px-6 lg:px-10 py-8 text-gray-50 text-center"
          >
            <div class="absolute -top-4 md:-top-8 -right-4 md:-right-8">
              <img
                class="h-12 md:h-20 w-auto"
                src="/img/logos/bankgreen-logo.png"
                alt="Bank Green"
              />
            </div>
            <div class="flex flex-col rounded-xl">
              <PrismicText
                :field="donation?.data.donation_title"
                wrapper="h1"
                class="font-semibold text-xl md:text-3xl tracking-wider text-white"
                fallback="Donate to Bank.Green"
              />
              <PrismicRichText
                :field="donation?.data.donation_description"
                class="prose sm:prose-lg xl:prose-xl prose-blurb text-white mt-4 text-justify"
                fallback="...and make a big difference in the world. Your donation will give us greater
                capacity to green the banking sector and protect our collective future."
              />
              <div class="mt-8">
                <div
                  class="raisely-donate"
                  data-campaign-path="bankgreen-donate"
                  data-profile=""
                  data-width="100%"
                  data-height="800"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
