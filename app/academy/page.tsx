// /academy — canonical Classroom Universe route.
// Re-exports /courses/page so both URLs render the same content during
// the IA transition. Existing /courses links stay alive.

import CoursesPage, { metadata } from "@/app/courses/page";

export { metadata };
export const dynamic = "force-dynamic";

export default CoursesPage;
