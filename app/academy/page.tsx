// /academy — canonical Classroom Universe route.
// Re-exports /courses/page so both URLs render the same content during
// the IA transition. Existing /courses links stay alive.

export { default, metadata, dynamic } from "@/app/courses/page";
