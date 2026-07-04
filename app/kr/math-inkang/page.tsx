import InkangLanding, { inkangMetadata } from "@/components/seo/InkangLanding";
import { MATH_INKANG } from "@/lib/data/inkangConfigs";

export const metadata = inkangMetadata(MATH_INKANG);

export default function Page() {
  return <InkangLanding cfg={MATH_INKANG} />;
}
