import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { GoogleTagManager } from "@next/third-parties/google";
import RegisterContent from "./RegisterContent";

export default function RegisterPage() {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 relative"
      style={{
        backgroundImage: "url('/asset/hero-bg-premium.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <GoogleTagManager gtmId="GTM-T8J43WBR" />

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-[540px] relative bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 px-6 py-8 md:px-10 md:py-10 flex flex-col my-10">
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="animate-spin text-primary" size={48} />
            </div>
          }
        >
          <RegisterContent />
        </Suspense>
      </div>
    </main>
  );
}
