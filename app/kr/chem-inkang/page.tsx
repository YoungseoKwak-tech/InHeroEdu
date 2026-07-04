import InkangLanding, { inkangMetadata } from "@/components/seo/InkangLanding";
import { CHEM_INKANG } from "@/lib/data/inkangConfigs";

export const metadata = inkangMetadata(CHEM_INKANG);

export default function Page() {
  return <InkangLanding cfg={CHEM_INKANG} />;
}
