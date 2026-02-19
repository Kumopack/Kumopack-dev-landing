import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Kumopack",
  description: "Sign in to Kumopack - The Absolute Packaging Solutions",
  alternates: {
    canonical: "https://kumopack.com/login/selection",
    languages: {
      en: "https://kumopack.com/en/",
      th: "https://kumopack.com/th/",
      "x-default": "https://kumopack.com/en/",
    },
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
