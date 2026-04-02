import Link from "next/link";
import { ArrowLeft, Home, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary, Locale } from "@/lib/dictionary";

export default async function ComingSoonPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(lang);

  const t = (path: string) =>
    path.split(".").reduce((obj: any, key) => obj?.[key], dict) || path;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-mint/5 blur-[120px] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-xl w-full text-center space-y-12">
        <div className="relative">
          <div className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] font-black leading-none text-foreground/[0.06] select-none tracking-tighter text-center">
            COMING SOON
          </div>
          <div className="absolute inset-0 flex items-center justify-center animate-bounce-soft">
            <Rocket className="w-24 h-24 text-primary stroke-[1.5]" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-foreground">
            {lang === "th" ? "เปิดตัวเร็วๆ นี้!" : "Coming Soon!"}
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
            {lang === "th"
              ? "เปิดตัวก่อนเทศกาล 1 สัปดาห์"
              : "Launching 1 week before the festival"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="default"
            size="lg"
            className="rounded-2xl px-10 h-16 text-lg font-bold gap-3 shadow-glow hover:shadow-glow-lg transition-all"
            asChild
          >
            <Link href={`/${lang}`}>
              <Home className="w-6 h-6" />
              {t("notFound.backHome")}
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-2xl px-10 h-16 text-lg font-bold gap-3 hover:bg-muted/50 transition-all border-border/50 bg-background"
            asChild
          >
            {/* Note: In a server component, we can't use onClick={() => history.back()}, so we use Link to go home or to a specific previous page */}
            <Link href={`/${lang}`}>
              <ArrowLeft className="w-6 h-6" />
              {t("notFound.goBack")}
            </Link>
          </Button>
        </div>

        <div className="pt-12">
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-border/30" />
            <div className="text-sm font-black text-muted-foreground/50 uppercase tracking-[0.3em]">
              KUMOPACK
            </div>
            <div className="h-px w-12 bg-border/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
