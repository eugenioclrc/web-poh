// import { initClient /*, operationStore, query*/  } from "@urql/svelte";
import * as e from "@urql/svelte";

let client;

export default function getClient() {
  if(!client) {
    client = e.createClient({
      url: "https://api.studio.thegraph.com/query/2463/proof-of-hacker/v0.0.8",
    });
    // e.setContextClient(client);
  }
  return client;
}