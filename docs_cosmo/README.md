Connect to the Studio

```bash
wgc auth login
```

wgc fs products-feature \
 --namespace staging \
 --routing-url https://staging.products-feature.wundergraph.com \
 --subgraph products

wgc feature-subgraph create my-feature-subgraph \
 --subgraph my-subgraph \
 --namespace prod \
 --routing-url http://localhost:4000

# Team A

wgc subgraph create locations --label team=A --routing-url http://localhost:4001
wgc subgraph publish locations --schema ./subgraph-locations/locations.graphql

# Team B

wgc subgraph create reviews --label team=B --routing-url http://localhost:4002
wgc subgraph publish reviews --schema ./subgraph-reviews/reviews.graphql

### To update subgraph

wgc subgraph update locations -r http://localhost:4001

### To run Router locally in Docker

```bash
docker run \
  --name cosmo-router \
  --rm \
  -p 3002:3002 \
  --add-host=host.docker.internal:host-gateway \
  --pull always \
  -e DEV_MODE=true \
  -e LISTEN_ADDR=0.0.0.0:3002 \
  -e GRAPH_API_TOKEN=<graph-api-token> \
  ghcr.io/wundergraph/cosmo/router:latest
```

 docker run \
  --name cosmo-router \
  --rm \
  -p 3002:3002 \
  --add-host=host.docker.internal:host-gateway \
  --pull always \
  -e DEV_MODE=true \
  -e LISTEN_ADDR=0.0.0.0:3002 \
  -v ./config.yaml:/config.yaml \
  -e GRAPH_API_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhMzA3ZGMyYS01YWY2LTQwN2MtYmRhMC04ZDJiNDQ5NDE5Y2UiLCJmZWRlcmF0ZWRfZ3JhcGhfaWQiOiI4NmIzMmQ2MS1jOGE1LTRhOGItOWFlNy01MDExZDczNTUyNDMiLCJhdWQiOiJjb3NtbzpncmFwaC1rZXkiLCJvcmdhbml6YXRpb25faWQiOiI5OWExNzAxMi1lZTI4LTRhMGQtOTkwNC00NGE3ZWE3MTkyYTEiLCJpYXQiOjE3MjI2MTg5NjN9.k_RXZnZdUcKY_BtR8bqw7k7L0BxfKgXLDgnqU929UJM \
  ghcr.io/wundergraph/cosmo/router:latest

Delete the subgraph named "products":

```bash
npx wgc subgraph delete products
```

Force delete the subgraph named "users" without confirmation:

```bash
npx wgc subgraph delete users -f
```

1. Create a feature subgraph using the below command.

```bash
npx wgc feature-subgraph create <feature-subgraph-name> --namespace default -r <routing-url> --subgraph <base-subgraph-name>
```

```bash
npx wgc feature-subgraph create feature-reviews --namespace default -r http://localhost:4002 --subgraph locations
```

2. Update your feature subgraphs of this feature flag.

```bash
npx wgc feature-flag update <feature-flag-name> --namespace default --feature-subgraphs <featureSubgraphs...>
```

npx wgc subgraph publish <feature-subgraph-name> --namespace default --schema <schema-path>

npx wgc subgraph publish feature-reviews --namespace default --schema ./subgraph-reviews/reviews.graphql

wgc feature-subgraph create my-feature-subgraph\
 --subgraph reviews \
 --namespace production \
 --routing-url http://localhost:4002

    Below is the command to create a federated graph. We need to specify the labels that it needs to consider and the routing URL. The routing URL is the endpoint of the router that we will deploy in the next step.

Copy
wgc federated-graph create production --label-matcher team=A,team=B --routing-url https://graph.domain.com/graphql
Our federated Graph is now composed. Let's deploy a Router to wire it all together.

wgc federated-graph update production --label-matcher team=A,team=B --routing-url https://cosmo.wundergraph.com/81f50a9e/default/graph/production
✔ Federated Graph was updated successfully.

wgc subgraph check <subgraph_name> --namespace <namespace> --schema ./subgraph.graphql

wgc subgraph check reviews --namespace production --schema ./subgraph-reviews/reviews.graphql
