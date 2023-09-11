export const useHeadHelper = (title, description) => {
  if (title) {
    useHead({
      title,
      meta: [
        {
          property: 'og:title',
          content: title
        },
        {
          name: 'apple-mobile-web-app-title',
          content: title
        },
        {
          name: 'twitter:title',
          content: title
        }
      ]
    })
  }

  if (description) {
    useHead({
      meta: [
        {
          name: 'twitter:description',
          content: description
        },
        { property: 'og:description', content: description },
        {
          name: 'description',
          content: description
        }
      ]
    })
  }
}

export const useHeadRating = (rating) => {
  const imageUrl = `https://bank.green/anim/gauge/${rating}.gif`
  const videoUrl = `https://bank.green/anim/gauge/${rating}.mp4`
  const width = '680'
  const height = '689'
  useHead({
    meta: [
      {
        property: 'og:image',
        content: imageUrl
      },
      {
        property: 'og:image:width',
        content: width
      },
      {
        property: 'og:image:height',
        content: height
      },
      {
        property: 'twitter:image',
        content: imageUrl
      },
      {
        property: 'og:video',
        content: videoUrl
      },
      {
        property: 'og:video:url',
        content: videoUrl
      },
      {
        property: 'og:video:secure_url',
        content: videoUrl
      },
      {
        property: 'og:video:type',
        content: 'video/mp4'
      },
      {
        name: 'twitter:player',
        content: videoUrl
      },
      {
        property: 'og:video:width',
        content: width
      },
      {
        property: 'og:video:height',
        content: height
      },
      {
        name: 'twitter:player:width',
        content: width
      },
      {
        name: 'twitter:player:height',
        content: height
      }
    ]
  })
}

export const usePrismicSEO = (data) => {
  if (!data) { return }
  useHeadHelper(data.seo_title, data.seo_description)
}
