
interface Props {
 params: { slug: string };

}
export default async function PlanetsDetails({ params }: Props) {
    const slug = params.slug;
    return <div>PlanetsDetails {slug}</div>;
}