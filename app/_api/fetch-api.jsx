import qs from 'query-string';
import {getStrapiURL} from "@/app/_api/api-helpers";

export async function fetchAPI(
    path,
    options = {},
    urlParamsObject = {}
) {
    try {
        // Merge default and user options
        const mergedOptions = {
            next: { revalidate: 60 },
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        };

        // Build request URL
        const queryString = qs.stringify(urlParamsObject);
        const requestUrl = `${getStrapiURL(
            `/api${path}${queryString ? `?${queryString}` : ""}`
        )}`;

        // Trigger API call
        const response = await fetch(requestUrl, mergedOptions)
            .then(response => response.json())
        return await response.data;

    } catch (error) {
        console.error(error);
        throw new Error(`Please check if your server is running and you set all the required tokens.`);
    }
}
