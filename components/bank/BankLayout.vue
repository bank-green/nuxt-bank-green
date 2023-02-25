<template>
    <div class="page">
        <!-- SECTION ONE -->
        <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28 md:mb-16">
            <div class="relative page-fade-in contain max-w-5xl grid grid-cols-2 gap-8 md:gap-10 z-10">
                <slot name="section1"></slot>
            </div>
            <Swoosh />
        </div>

        <!-- SECTION TWO -->
        <slot name="section2"></slot>

        <!-- SECTION THREE -->
        <slot name="section3"></slot>

        <!-- CALL TO ACTION -->
        <slot name="call-to-action"></slot>
    </div>
</template>