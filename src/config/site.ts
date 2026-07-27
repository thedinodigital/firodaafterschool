/**
 * Site-wide feature flags.
 *
 * SCHOOL_SITE_ENABLED
 * -------------------
 * Set to `false` to hide the whole Holy Cross school website (Our School,
 * Parents, News, Activities, Archive, Contact, Policies and the school staff
 * portal) and run the site as Firoda After School only.
 *
 * Nothing is deleted — all pages, routes and data stay in the codebase. Any
 * school URL simply redirects to /after-school while the flag is off, and the
 * header/footer only show After School links.
 *
 * To bring the school site back online later: change this to `true`.
 */
export const SCHOOL_SITE_ENABLED = false;

/** Where visitors land while the school site is switched off. */
export const AFTER_SCHOOL_HOME = "/after-school";

/** Home destination for the logo / "/" route, depending on the flag. */
export const HOME_PATH = SCHOOL_SITE_ENABLED ? "/" : AFTER_SCHOOL_HOME;
