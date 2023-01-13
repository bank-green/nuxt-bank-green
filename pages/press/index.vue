<template>
    <div class="page">
        <div class="bg-sushi-50">
            <div class="page-fade-in contain pt-28 pb-16">
                <h1 class="text-2xl font-semibold whitespace-pre-line mb-4">
                    Press
                </h1>
                <p class="text-gray-600 mb-12">
                    For press or media enquiries, please write to
                    <a href="mailto:media@bank.green">media@bank.green</a>
                </p>
                <div class="-mx-4 mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
                    <BlogCard v-for="post in posts ?? []" :key="post.uid" :to="`/press/${post.uid}`"
                        :date="post.data.releasedate" :description="asText(post.data.description)"
                        :title="post.data.title" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BlogCard from '@/components/blog/BlogCard.vue'
useHeadHelper('Press')

const { client, asText } = usePrismic()
const { data: posts } = await useAsyncData('pressposts', () => client.getAllByType('presspost'))

</script>
