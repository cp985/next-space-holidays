import PlanetsDialog from  "@/components/planet-details/PlanetsDialog"


interface Props {
  params: Promise<{ ["slug-planet"]: string }>;
}
export default async function PlanetsDetails({ params }: Props) {

  const slug = (await params)["slug-planet"];
  return (
<PlanetsDialog key={slug} slug={slug} />
  );
}
