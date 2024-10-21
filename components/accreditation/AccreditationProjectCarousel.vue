<template>
  <swiper-container
    ref="carouselRef"
    :init="false"
    class="w-full pb-16 lg:pb-0 lg:px-20"
  >
    <swiper-slide
      v-for="project in filterProjects"
      :key="project.project_link"
    >
      <AccreditationProjectCard
        :title="project.title"
        :location="project.location"
        :image="project.image"
        :link="project.project_link"
        class="m-auto"
      />
    </swiper-slide>
  </swiper-container>
</template>

<script lang="ts" setup>
import type { AccreditationpageDocumentDataProjectsItem } from 'prismicio-types'
import { defaultProject } from './default-project'
import { useSwiper } from '@/composables/useSwiper'

type Project = Pick<AccreditationpageDocumentDataProjectsItem, 'title' | 'location' | 'image' | 'project_link'>
type ProjectWithLink = Project & { project_link: string }

interface Props {
  projects: Project[]
}

const props = withDefaults(defineProps<Props>(), {
  projects: () => ([defaultProject, { ...defaultProject, title: 'Project Default B' }]),
})

const carouselRef = useSwiper()

const filterProjects = computed(() => props.projects.filter(p => typeof p.project_link === 'string') as ProjectWithLink[])
</script>
