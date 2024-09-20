"use server";
import { getAllDraftOrders, getDraftOrderById } from "../../lib/shopify";
export default async function Home() {
  const draftOrders = (await getAllDraftOrders()) || [];

  const draftOrderById =
    (await getDraftOrderById("gid://shopify/DraftOrder/975582887993")) || [];

  return (
    <div>
      <h1>Draft Orders</h1>
      {JSON.stringify(draftOrders)}
      <br />
      <br />
      <br />
      <h1>Draft Order by ID</h1>
      {JSON.stringify(draftOrderById)}
    </div>
  );
}
