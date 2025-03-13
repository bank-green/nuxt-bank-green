import { GraphQLClient } from 'graphql-request'

export default new GraphQLClient(useRuntimeConfig().public.DATA_URL || 'https://data.bank.green/graphql')
