import InkangLanding, { inkangMetadata } from "@/components/seo/InkangLanding";
import { SAT_INKANG } from "@/lib/data/inkangConfigs";

export const metadata = inkangMetadata(SAT_INKANG);

export default function Page() {
  return <InkangLanding cfg={SAT_INKANG} />;
}
