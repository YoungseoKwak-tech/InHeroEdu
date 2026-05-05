import { createClient } from "@supabase/supabase-js";
import lessonData from "../lib/data/ap-lesson-breakdown.json" with { type: "json" };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function seedLessons() {
  const rows = [];

  for (const course of lessonData.courses) {
    console.log(`Preparing ${course.courseName}...`);

    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        rows.push({
          id: `${course.courseId}-u${unit.unitNumber}-l${lesson.lessonNumber}`,
          course_id: course.courseId,
          unit_number: unit.unitNumber,
          unit_title: unit.unitTitle,
          lesson_number: lesson.lessonNumber,
          title: lesson.lessonTitle,
          topics: lesson.topics,
          exam_tip: lesson.examTip,
        });
      }
    }
  }

  const batchSize = 100;
  let inserted = 0;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from("lessons").upsert(batch, { onConflict: "id" });

    if (error) {
      console.error("Seed failed on batch", { start: i, error });
      throw error;
    }

    inserted += batch.length;
    console.log(`Seeded ${inserted}/${rows.length}`);
  }

  console.log(`Seeding complete! ${inserted} lessons upserted.`);
}

seedLessons().catch((error) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});
