export const PRELAUNCH_MODE = process.env.NEXT_PUBLIC_PRELAUNCH_MODE === "true";

/**
 * Free-for-all mode: every signed-in student gets full course + textbook
 * access without paying. Defaults OFF (paid Free/$49/$199 plans live);
 * set NEXT_PUBLIC_FREE_FOR_ALL="true" to open everything for free
 * (no code change needed).
 */
export const FREE_FOR_ALL = process.env.NEXT_PUBLIC_FREE_FOR_ALL === "true";
