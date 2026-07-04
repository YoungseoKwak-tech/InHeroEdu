import InkangLanding, { inkangMetadata } from "@/components/seo/InkangLanding";
import { IB_INKANG } from "@/lib/data/inkangConfigs";

export const metadata = inkangMetadata(IB_INKANG);

export default function Page() {
  return <InkangLanding cfg={IB_INKANG} />;
}
