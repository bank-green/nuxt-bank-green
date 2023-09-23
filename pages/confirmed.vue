<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <ThanksSection
          :title="'Thanks for joining the Money Movement and our emailing list!'"
          :description="`You'll be hearing from us soon!`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
useHeadHelper('Thank you')
</script>
