<template>
    <li>
        <div class="sm:flex">
            <div class="w-32 h-32 shadow-lg rounded-full overflow-hidden bg-gray-900">
                <LazyImage :src="img" srcset="1x,2x,3x" :useImageTag="true" :width="128" :height="128"
                    imgClass="object-center object-cover" />
            </div>
            <div class="flex-1 mt-4 sm:mt-0 sm:ml-8">
                <div class="text-lg leading-6 font-medium space-y-1 mb-4">
                    <h3>{{ name }}</h3>
                </div>
                <div class="text-lg">
                    <p class="text-gray-500">{{ description }}</p>
                </div>
            </div>
        </div>
    </li>
</template>

<script setup>

const props = defineProps({
    name: String,
    img: String,
    description: String,
})

</script>
