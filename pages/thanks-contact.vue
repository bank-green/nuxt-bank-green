<template>
    <div class="page">
        <div class="bg-white">
            <div class="page-fade-in pt-28">
                <ThanksSection title="Thank you for your message"
                    description="We'll get back to you as soon as we can." />
            </div>
        </div>
    </div>
</template>

<script setup>
import ThanksSection from '@/components/contact/ThanksSection'
useHeadHelper("Thank you")
</script>
