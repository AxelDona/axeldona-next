import {fetchAPI} from "@/app/_api/fetch-api";
import Link from "next/link";


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
    <main>
      <Link href='/projects'>Projects</Link>
    </main>
  )
}
