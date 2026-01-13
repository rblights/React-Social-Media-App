import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";


// console.log('Sanity Project ID:', process.env.REACT_APP_SANITY_PROJECT_ID); 
// console.log('Sanity Project Token:', process.env.REACT_APP_SANITY_PROJECT_TOKEN); 

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2026-01-13',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_PROJECT_TOKEN
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)