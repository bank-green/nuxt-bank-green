<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28 ml-28 mt-16">
        <ul>
          <li
            v-for="bank in banks"
            :key="bank.tag"
          >
            <a :href="`/banks/${bank.tag}`">{{ bank.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from 'nuxt/app'
import { getAllBanksList } from '../utils/banks.js'

const { data: banks } = useAsyncData('banks', getAllBanksList)
</script>
