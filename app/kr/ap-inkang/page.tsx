import InkangLanding, { inkangMetadata } from "@/components/seo/InkangLanding";
import { AP_INKANG } from "@/lib/data/inkangConfigs";

export const metadata = inkangMetadata(AP_INKANG);

export default function Page() {
  return <InkangLanding cfg={AP_INKANG} />;
}
