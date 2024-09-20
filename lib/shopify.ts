"use server";

const domain = process.env.SHOPIFY_ADMIN_DOMAIN;

async function ShopifyData(query: any) {
  const URL = `https://${domain}/admin/api/2024-07/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error("DraftOrders not fetched");
  }
}

export async function getAllDraftOrders() {
  const query = `
    {
        draftOrders(first: 10) {
            edges {
                node {
                    id,
                    paymentTerms {
                    id
                    dueInDays
                        draftOrder{
                            id
                        }
                    }
                }
            }
        }
    }
  `;

  const response = await ShopifyData(query);

  const draftOrders = response.data.draftOrders.edges;

  return draftOrders;
}

export async function getDraftOrderById(id: string) {
  const query = `
   {
        draftOrder(id: "${id}") {
            name
            paymentTerms{
            id
            dueInDays
            draftOrder{
                    id
                }
            }
        }
    }
  `;

  const response = await ShopifyData(query);
  const draftOrder = response.data.draftOrder;

  return draftOrder;
}
