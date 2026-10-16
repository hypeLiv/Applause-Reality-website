import { award } from "./documents/award";
import { partner } from "./documents/partner";
import { post } from "./documents/post";
import { project } from "./documents/project";
import { siteSettings } from "./documents/site-settings";
import { film } from "./objects/film";
import { tourVideo } from "./objects/tour-video";

/** Document types locked to one instance; see structure/index.ts. */
export const SINGLETONS = ["siteSettings"];

export const schemaTypes = [siteSettings, project, post, partner, award, film, tourVideo];
