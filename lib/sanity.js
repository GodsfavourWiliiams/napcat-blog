import { createCurrentUserHook, createClient } from "next-sanity";

import createImageUrlBuilder from "@sanity/image-url";

export const clientConfig = {
    projectId: 'p6p2y58u',
    dataset: 'production',
}

export const config = {
    projectId: clientConfig.projectId,
    dataset: clientConfig.dataset,
    apiVersion: '2022-10-21',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: true,
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);