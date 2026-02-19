import { getAllMaterialIds } from "@/lib/static-params";
import MaterialDetailClient from "./MaterialDetailClient";

export async function generateStaticParams() {
  return await getAllMaterialIds();
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <MaterialDetailClient id={params.id} />;
}
