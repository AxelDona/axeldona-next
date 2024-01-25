import {fetchAPI} from "@/db/fetch-api";
import "./home.scss"
import {ProjectButton} from "@/components/buttons/ProjectButton";


export default function Home() {

  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const options = {headers: {Authorization: `bearer ${token}`}};
  const path = `/categories`;
  const urlParamsObject = {};

  const fetchData = async () => {
    try {
      const data = await fetchAPI(path, options, urlParamsObject);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();

  return (
    <main className="home">
      <ProjectButton text="Projets" url="/projects"/>
    </main>
  )
}
