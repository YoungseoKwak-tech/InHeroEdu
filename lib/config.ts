export const PRELAUNCH_MODE = process.env.NEXT_PUBLIC_PRELAUNCH_MODE === "true";

/**
 * Free-for-all mode: every signed-in student gets full course + textbook
 * access without paying. Defaults ON; set NEXT_PUBLIC_FREE_FOR_ALL="false"
 * to restore the paid Elite gating (no code change needed).
 */
export const FREE_FOR_ALL = process.env.NEXT_PUBLIC_FREE_FOR_ALL !== "false";
