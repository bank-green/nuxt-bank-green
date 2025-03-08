import { callBackend } from '~/utils/banks'

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
  const json = await callBackend(query)

  // Extract and return the name and tag from the response
  return json.data.brands.edges.map(o => '/banks/' + o.node.tag)
}
