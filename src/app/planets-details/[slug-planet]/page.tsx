import PlanetDetailPage from "@/components/planet-details/PlanetDialogPrime";

interface Props{
 params: Promise<{ ["slug-planet"]: string }>;
}
export default async function PlanetsDetails({ params }: Props) {
       const slug = (await params)["slug-planet"];
   
    

    return <PlanetDetailPage slug={slug} />
}