export default function getLinks ({ isHeader = false }) {
  const links = [
    {
      href: '/pledge',
      title: 'Pledge'
    },
    {
      href: '/sustainable-eco-banks',
      title: 'Sustainable banks'
    },
    { href: '/blog', title: 'Blog' },
    {
      href: '/faq',
      title: 'Frequently asked questions',
      short_title: 'FAQ'
    },
    { href: '/contact', title: 'Contact us' },
    { href: '/take-action', title: 'Take Action' }
  ]

  if (isHeader) {
    links.push({
      href: '/impact',
      title: 'Switch Survey'
    })
  } else {
    links.push({
      href: '/certification',
      title: 'Fossil Free Certification'
    })
    links.push({
      href: '/press',
      title: 'Press'
    })

    links.push({
      href: '/partners',
      title: 'Our Partners',
      short_title: 'Partners'
    })

    links.push({
      href: '/volunteers',
      title: 'Volunteering',
      short_title: 'Volunteering'
    })

    links.push({
      href: '/green-policy-evaluator',
      title: 'Green Policy Evaluator',
      short_title: 'GPE'
    })

    links.push({
      href: '/team',
      title: 'Who we are',
      short_title: 'Team'
    })

    links.push({
      href: '/donate',
      title: 'Donate',
      isButton: true
    })
  }

  return links
}
