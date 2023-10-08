<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-3xl xl:max-w-4xl py-24 sm:py-32">
        <article class="prose sm:prose-lg xl:prose-xl mx-auto">
          <SliceZone
            :slices="team?.data.slices ?? []"
            :components="sliceComps"
          />
        </article>
      </div>
    </div>
    <div class="contain py-16">
      <ul
        class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
      >
        <TeamMember
          name="Albert R Carter"
          description="Albert is an environmental activist, and data engineer living in Nijmegen, the Netherlands. He is always looking for high-leverage ways to create change, and as a result, enjoys working on environmental projects in science, finance and communication. Outside of activism, he enjoys bike touring and hiking."
          img="/img/team/albert.jpg"
        />
        <TeamMember
          name="Alice Hu"
          description="When Alice finished school in 2019, she had the strongly felt but vaguely conceived plan to somehow do some good in the world. As she reckoned with her own eco-grief, she found her place in climate campaigning, working to create a livable world for all from New York City."
          img="/img/team/alice.jpg"
        />
        <TeamMember
          name="Ilias Ism"
          href="https://il.ly"
          description="Being a tech founder in several successful startups, Ilias felt he could use his experience and passion in the fight against climate change and life on our planet. He enjoys hosting on couchsurfing, meeting people and travel."
          img="/img/team/illy.jpg"
        />
        <TeamMember
          name="Martha Murphy"
          description="Martha is a freelance copywriter for several successful brands who was looking for ways to do good outside of her regular job. She chases surf and snow around Europe with her fiancé and their adventure-loving pup."
          img="/img/team/martha.jpg"
        />
        <TeamMember
          name="Neil Simpson"
          description="Neil used to write for London restaurant guides and tourism magazines, until he realised that he only wanted to write about protecting the environment. Neil is currently travelling around Australia, volunteering on farms, and writing as he goes."
          img="/img/team/neil.jpg"
        />
        <TeamMember
          name="Zak Gottlieb"
          description="Zak joined the climate movement in 2019 after feeling the world was sleep-walking towards catastrophe and wanting to use his knowledge of digital marketing to do something about it. He leads a nomadic life, mostly around Europe."
          img="/img/team/zak.jpg"
        />
        <TeamMember
          name="Luke Gelmi"
          description="Luke is an ex-oil-and-gas Chemical Engineer who - after hearing the bleak image that climate scientists are painting of our future - has made the switch to fighting for a planet we can all live on for the next hundred generations."
          img="/img/team/gelmi.png"
        />
        <TeamMember
          name="Christian Harries"
          description="Christian is a software engineer who is new to the tech industry. He is passionate about using his skills to help fight climate change and is currently working on a project to help people reduce their carbon footprint."
          img="/img/team/og/christian.jpg"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
useHead({ title: 'Team' })

const sliceComps = ref(defineSliceZoneComponents(components))
const { client } = usePrismic()
const { data: team } = await useAsyncData('team', () =>
  client.getSingle('teampage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  })
)
</script>
