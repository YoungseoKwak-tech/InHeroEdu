import InkangLanding, { inkangMetadata } from "@/components/seo/InkangLanding";
import { PHYSICS_INKANG } from "@/lib/data/inkangConfigs";

export const metadata = inkangMetadata(PHYSICS_INKANG);

export default function Page() {
  return <InkangLanding cfg={PHYSICS_INKANG} />;
}
