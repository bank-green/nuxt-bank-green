import gqlClient from '../gqlServerClient'

type QueryReturn = {
  brands: {
    edges: {
      node: { tag: string }
    }[]
  }
}

export default async () => {
  const query = `
      query BrandsQuery {
        brands {
          edges {
            node {
              tag
            }
          }
        }
      }`

  // Execute the GraphQL query
  const json = (await gqlClient.request(query).catch(console.error) || []) as QueryReturn

  // Extract and return the name and tag from the response

  return json?.brands?.edges?.map(o => '/banks/' + o.node.tag)
}
