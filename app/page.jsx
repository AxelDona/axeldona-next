import {fetchAPI} from "@/db/fetch-api";
import "./home.scss"
import {MainProjectButton} from "@/components/buttons/MainProjectButton";
import Image from "next/image";


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
    <>
      <main className="home">
        <Image src='/assets/icons/axelalexdona-logo-darkGrey.svg' alt="" width={175} height={175} className="home__mainLogo"/>
        <MainProjectButton text="Projets" url="/projects" targetBlank={false}/>
      </main>
    </>
  )
}
