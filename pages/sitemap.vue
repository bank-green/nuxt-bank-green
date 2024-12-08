<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28 ml-28 mt-8">
        <div>
          <ul>
            <li
              v-for="bank in banks"
              :key="bank.tag"
            >
              <a
                :href="`/banks/${bank.tag}`"
                target="_blank"
              >{{ bank.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getAllBanksList } from '../utils/banks.js'

interface Bank {
  name: string
  tag: string
  website: string
}

const banks = ref<Bank[]>([])
const loaded = ref<boolean>(false)

onMounted(async () => {
  banks.value = await getAllBanksList()
})
</script>
