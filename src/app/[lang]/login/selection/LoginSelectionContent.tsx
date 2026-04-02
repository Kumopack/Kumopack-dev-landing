"use client";

import { useLocalizedRouter as useRouter } from "@/hooks/useLocalizedRouter";
import { useSearchParams } from "@/hooks/useLocalizedRouter";
import Link from "@/components/common/LocalizedLink";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import {
  API_BASE_URL,
  BUYER_PORTAL_URL,
  SUPPLIER_PORTAL_URL,
} from "@/lib/api-config";
import { getAssetPath } from "@/lib/utils";

export default function LoginSelectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const [role, setRole] = useState<"buyer" | "supplier" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRoleSelect = (selectedRole: "buyer" | "supplier") => {
    setRole(selectedRole);
    setErrorMsg("");
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "login_role_select",
        role: selectedRole,
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "login_submit",
        role: role,
      });
    }

    try {
      const loginUrl = `${API_BASE_URL}/${role}/auth/login`;
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const tokenKey = `kumopack-${role}-access-token`;

      const domain = window.location.hostname.includes("kumopack.com")
        ? ".kumopack.com"
        : undefined;

      Cookies.set(tokenKey, data.accessToken || data.token, {
        expires: 1,
        domain,
        path: "/",
      });

      if (data.refreshToken) {
        Cookies.set(`kumopack-${role}-refresh-token`, data.refreshToken, {
          expires: 7,
          domain,
          path: "/",
        });
      }

      const portalUrl =
        role === "buyer" ? BUYER_PORTAL_URL : SUPPLIER_PORTAL_URL;

      window.location.href = portalUrl;
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMsg(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goHome = () => router.push("/");

  return (
    <>
      <button
        onClick={() => (role ? setRole(null) : goHome())}
        className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-20"
        aria-label="Back"
      >
        <ArrowLeft size={18} className="text-gray-600" />
      </button>

      <div className="flex flex-col items-center mb-8">
        <div className="mb-4">
          <Image
            src={getAssetPath("/logo/logo-icon.png")}
            alt="Kumopack"
            width={60}
            height={60}
            className="h-14 w-auto object-contain"
          />
        </div>

        <AnimatePresence mode="wait">
          {!role ? (
            <motion.div
              key="title-select"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-2xl font-bold text-purple-900 mb-1">
                {t("login.signInAs")}
              </h1>
              <div className="w-12 h-0.5 bg-purple-500/50 rounded-full" />
            </motion.div>
          ) : (
            <motion.div
              key="title-login"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="text-2xl font-bold text-purple-900 mb-1">
                {role === "buyer"
                  ? t("login.titleBuyer")
                  : t("login.titleSupplier")}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {t("login.subtitleLogin")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {!role ? (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-4 h-full"
            >
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => handleRoleSelect("buyer")}
                className="bg-white rounded-3xl p-6 shadow-sm border border-transparent hover:border-purple-300 transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors p-2">
                  <Image
                    src={getAssetPath("/icon/buyer.svg")}
                    alt="Buyer"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {t("login.buyer")}
                </h3>
                <p className="text-[10px] text-gray-400 leading-tight">
                  {t("login.buyerDesc")}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => handleRoleSelect("supplier")}
                className="bg-white rounded-3xl p-6 shadow-sm border border-transparent hover:border-orange-300 transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors p-2">
                  <Image
                    src={getAssetPath("/icon/supplier.svg")}
                    alt="Supplier"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {t("login.supplier")}
                </h3>
                <p className="text-[10px] text-gray-400 leading-tight">
                  {t("login.supplierDesc")}
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="login-form-fields"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 ml-1 flex items-center gap-1">
                    {t("login.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-300 py-2 px-1 focus:border-purple-500 focus:outline-none text-gray-800 placeholder:text-gray-300 transition-colors"
                    placeholder="example@domain.com"
                  />
                </div>

                <div className="space-y-1 relative">
                  <label className="text-xs font-semibold text-gray-700 ml-1 flex items-center gap-1">
                    {t("login.password")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-300 py-2 px-1 focus:border-purple-500 focus:outline-none text-gray-800 placeholder:text-gray-300 transition-colors pr-10"
                      placeholder="••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <div className="text-red-500 text-xs font-medium bg-red-50 p-2 rounded-lg border border-red-100">
                    {errorMsg}
                  </div>
                )}

                <div className="text-right">
                  <button
                    type="button"
                    className="text-purple-600 text-xs font-bold hover:underline"
                  >
                    {t("login.forgotPasswordTitle")}
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 transition-all active:scale-[0.98] flex items-center justify-center border-none"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    t("login.signIn")
                  )}
                </Button>

                <div className="flex flex-col space-y-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const googleUrl = `${API_BASE_URL}/${role}/auth/google`;
                      window.location.href = googleUrl;
                    }}
                    className="w-full h-12 bg-white/80 border border-gray-100 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-gray-700 hover:bg-white transition-colors shadow-sm"
                  >
                    <Image
                      src={getAssetPath("/icon/google-icon.png")}
                      alt="Google"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    {t("login.continueWithGoogle")}
                  </button>

                  <div className="text-center">
                    <p className="text-xs text-black">
                      {t("login.noAccount")}{" "}
                      <Link
                        href={
                          role === "buyer"
                            ? "https://buyer.kumopack.com/auth/registration"
                            : "https://supplier.kumopack.com/auth/registration"
                        }
                        className="text-purple-600 font-bold hover:underline"
                      >
                        {t("login.signUp")}
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!role && (
        <div className="mt-auto pt-8 text-center text-[10px] text-black">
          {t("login.newToKumopack")}{" "}
          <Link
            href="/register"
            className="text-purple-600 font-bold hover:underline"
          >
            {t("login.signUp")}
          </Link>
        </div>
      )}
    </>
  );
}
