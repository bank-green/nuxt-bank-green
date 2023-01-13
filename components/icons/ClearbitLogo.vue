<template>
    <LazyImage :width="size" :height="size" srcset="" :imgClass="imgClass" :src="src" />
</template>

<script>
import LazyImage from '@/components/LazyImage.vue'
export default {
    components: { LazyImage },
    name: 'ClearbitLogo',
    props: {
        url: String,
        imgClass: String,
        size: {
            type: Number,
            default: 60,
        },
    },
    computed: {
        src() {
            if (this.urlDomain) {
                switch (this.urlDomain) {
                    case 'monzo.com':
                        return '/img/logos/monzo.png'
                    case 'www.jpmorganchase.com':
                        return '/img/logos/chase.png'
                    case 'www.db.com':
                        return '/img/logos/db.png'
                    case 'www.helios.do':
                        return '/img/logos/helios.png'
                    case 'www.flowe.com':
                        return '/img/logos/flowe.png'
                    case 'www.bigpathcapital.com':
                        return '/img/logos/bigpath.png'
                    case 'www.amalgamatedbank.com':
                        return '/img/logos/amalgamated.png'
                    case 'green-got.com':
                        return '/img/logos/green_got.png'
                }

                return `https://logo.clearbit.com/${this.urlDomain}?size=${this
                    .size * 2}`
            }
            return ''
        },
        urlDomain() {
            let url = this.url
            if (url) {
                if (url.indexOf('http') === -1) url = `https://${url}`
                if (url.indexOf('.') > -1) {
                    return new URL(url).hostname
                }
            }
            return ''
        },
    },
}
</script>
