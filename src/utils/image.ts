import ImageUrlBuilder  from "@sanity/image-url";
import type { Image } from "@sanity/types";
import { sanityClient } from "sanity:client";

const builder = ImageUrlBuilder(sanityClient)

export function urlFor(source: Image) {
    return builder.image(source)
}