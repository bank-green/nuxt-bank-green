export default function getLinks({ isHeader = false }) {
  const links = [
    {
      href: '/sustainable-eco-banks',
      title: 'Sustainable banks',
      headerOrder: 1,
      footerOrder: 1.2,

    },
    { href: '/blog',
      title: 'Blog',
      headerOrder: 2,
      footerOrder: 2.1,
    },

    {
      href: '/faq',
      title: 'Frequently asked questions',
      short_title: 'FAQ',
      headerOrder: 3,
      footerOrder: 3.3,
    },
    {
      href: '/team',
      title: 'Who we are',
      short_title: 'Team',
      footerOrder: 3.1,
    },
    { href: '/contact',
      title: 'Contact us',
      headerOrder: 4,
      footerOrder: 3.2,
    },
    { href: '/take-action',
      title: 'Take Action',
      headerOrder: 5,
      footerOrder: 1.3,
    },
    {
      href: '/impact',
      title: 'Switch Survey',
      headerOrder: 6,
    },
    {
      href: '/donate',
      title: 'Donate',
      isButton: true,
      footerOrder: 1.4,
    },
    {
      href: '/certification',
      title: 'Fossil Free Certification',
      footerOrder: 1.5,
    },
    {
      href: '/partners',
      title: 'Our Partners',
      short_title: 'Partners',
      footerOrder: 2.2,
    },
    {
      href: '/press',
      title: 'Press',
      footerOrder: 2.3,
    },
    {
      href: '/volunteers',
      title: 'Volunteering',
      short_title: 'Volunteering',
      footerOrder: 2.4,
    },
    {
      href: '/green-policy-evaluator',
      title: 'Green Policy Evaluator',
      short_title: 'GPE',
    },

  ]

  if (isHeader) return links.filter(({ headerOrder }) => headerOrder).toSorted((a, b) => a.headerOrder - b.headerOrder)
  return links.filter(({ footerOrder }) => footerOrder).toSorted((a, b) => a.footerOrder - b.footerOrder)
}
