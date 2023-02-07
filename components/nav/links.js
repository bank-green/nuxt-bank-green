import locales from '~~/lang/en.json' assert {type: 'json'};

const get = k => locales[k]


export default function getLinks({ isHeader = false }) {
    const links = [
        {
            href: '/pledge',
            title: 'Pledge',
        },
        {
            href: '/sustainable-eco-banks',
            title: 'Sustainable banks',
        },
        { href: '/blog', title: 'Blog' },
        {
            href: '/faq',
            title: 'Frequently asked questions',
            short_title: 'FAQ',
        },
        { href: '/contact', title: 'Contact us' },
        { href: '/impact', title: 'Impact' }
    ]

    if (!isHeader) {
        links.push({
            href: '/certification',
            title: 'Fossil Free Certification',
        })
        links.push({
            href: '/press',
            title: "Press",
        })

        links.push({
            href: '/partners',
            title: "Our Partners",
            short_title: "Partners",
        })

        links.push({
            href: '/team',
            title: "Who we are",
            short_title: "Team",
        })
        return [
            {
                href: '/take-action',
                title: "Take action",
                short_title: 'Act',
            },
            ...links,
        ]
    }

    return links
}
