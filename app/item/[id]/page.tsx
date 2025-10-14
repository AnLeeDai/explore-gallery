import ItemDetailContainer from "@/modules/item-detail/item-detail-container";

interface ItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const userId = parseInt(id);

  return <ItemDetailContainer userId={userId} />;
}