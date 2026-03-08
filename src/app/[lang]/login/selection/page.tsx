import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { GoogleTagManager } from "@next/third-parties/google";
import LoginSelectionContent from "./LoginSelectionContent";
import { getAssetPath } from "@/lib/utils";

export default function LoginSelectionPage() {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 relative"
      style={{
        backgroundImage: `url('${getAssetPath("/asset/Flux_Dev_A_3Drendered_minimalist_rectangular_product_box_float_4.jpeg")}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <GoogleTagManager gtmId="GTM-T8J43WBR" />

      <div className="w-full max-w-[480px] min-h-[640px] relative bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 px-8 py-10 flex flex-col">
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="animate-spin text-purple-600" size={48} />
            </div>
          }
        >
          <LoginSelectionContent />
        </Suspense>
      </div>
    </main>
  );
}
