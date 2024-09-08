<script lang="ts" setup>
// TODO: add functionality
import { defaultProject } from './default-project'
import { AccreditationpageDocumentDataProjectsItem } from 'prismicio-types'

interface Props {
    projects: Pick<AccreditationpageDocumentDataProjectsItem, 'title' | 'location' | 'image' | 'project_link'>[]
}

withDefaults(defineProps<Props>(), {
  projects: () => ([defaultProject, { ...defaultProject, title: 'Project Default B' }])
})
</script>

<template>
  <div class="grid lg:flex place-content-center gap-8 pb-32 lg:pb-0">
    <template v-for="project in projects">
      <a
        v-if="project.project_link"
        :key="project.project_link"
        style="grid-area: 1/1"
        :href="project.project_link"
      >
        <AccreditationProjectCard
          :title="project.title"
          :location="project.location"
          :image="project.image"
        />
      </a>
    </template>
  </div>
</template>
