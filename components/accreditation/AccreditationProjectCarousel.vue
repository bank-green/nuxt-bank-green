<template>
  <ul class="grid lg:flex place-content-center gap-8 pb-32 lg:pb-0">
    <li v-for="project in filterProjects" :key="project.project_link">
      <a v-if="project.project_link" style="grid-area: 1/1" :href="project.project_link">
        <AccreditationProjectCard :title="project.title" :location="project.location" :image="project.image" />
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
// TODO: add functionality
import { defaultProject } from './default-project'
import { AccreditationpageDocumentDataProjectsItem } from 'prismicio-types'

type Project = Pick<AccreditationpageDocumentDataProjectsItem, 'title' | 'location' | 'image' | 'project_link'>;
type ProjectWithLink = Project & { project_link: string };

interface Props {
  projects: Project[]
}

const props = withDefaults(defineProps<Props>(), {
  projects: () => ([defaultProject, { ...defaultProject, title: 'Project Default B' }])
})

const filterProjects = computed(() => props.projects.filter(p => typeof p.project_link === 'string') as ProjectWithLink[])
</script>
