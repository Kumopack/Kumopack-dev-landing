"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import Link from "@/components/common/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { API_BASE_URL } from "@/lib/api-config";
import { industrialData } from "./data/industrialData";

export default function RegisterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, language } = useLanguage();

  const [role, setRole] = useState<"buyer" | "supplier" | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const codeParam = searchParams.get("code");
  const refParam = searchParams.get("ref");
  const hasReferralFromUrl = !!(codeParam || refParam);

  // Common Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState(refParam || codeParam || "");
  const [industrialType, setIndustrialType] = useState("");

  // Buyer Fields
  const [fullnameTh, setFullnameTh] = useState("");
  const [businessType, setBusinessType] = useState("บุคคลธรรมดา");
  const [companyTitle, setCompanyTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [identificationCard, setIdentificationCard] = useState("");

  // Supplier Fields
  const [companyName, setCompanyName] = useState("");
  const [contactPersonFullname, setContactPersonFullname] = useState("");
  const [contactPersonPosition, setContactPersonPosition] = useState("");
  const [supplierType, setSupplierType] = useState("ผู้ผลิต (Manufacturer)");

  const handleRoleSelect = (selectedRole: "buyer" | "supplier") => {
    setRole(selectedRole);
    setErrorMsg("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const endpoint = `${API_BASE_URL}/auth-${role}/register`;
      let payload: any = {
        email,
        password,
        referralCode,
      };

      if (role === "buyer") {
        payload = {
          ...payload,
          fullnameTh,
          businessType,
          companyTitle: businessType === "นิติบุคคล" ? companyTitle : "",
          phone: businessType === "นิติบุคคล" ? phone : "",
          identificationCard:
            businessType === "นิติบุคคล" ? identificationCard : "",
          industrialType: businessType === "นิติบุคคล" ? industrialType : "",
        };
      } else {
        payload = {
          ...payload,
          companyName,
          contactPersonFullname,
          contactPersonPosition,
          supplierType,
          industrialType,
        };
      }

      console.log(`Sending to ${endpoint}:`, payload);

      // Simulated API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMsg(
        t("common.success") || "Registration successful! Please login.",
      );
      setTimeout(() => {
        router.push(`/${language}/login`);
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (role) {
      setRole(null);
      setErrorMsg("");
    } else {
      router.push(`/${language}`);
    }
  };

  return (
    <>
      <button
        onClick={goBack}
        className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-20"
        aria-label="Back"
      >
        <ArrowLeft size={18} className="text-gray-600" />
      </button>

      <div className="flex flex-col items-center mb-6">
        <div className="mb-4">
          <Image
            src="/logo/logo-icon.png"
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
                {t("login.signUp") || "Create an Account"}
              </h1>
              <div className="w-12 h-0.5 bg-purple-500/50 rounded-full" />
            </motion.div>
          ) : (
            <motion.div
              key="title-register"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="text-2xl font-bold text-purple-900 mb-1 capitalize">
                {role === "buyer"
                  ? t("login.buyer") || "Buyer"
                  : t("login.supplier") || "Supplier"}{" "}
                Registration
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {t("login.subtitleLogin") ||
                  "Start your journey with us today."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 w-full max-w-sm mx-auto">
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
                    src="/icon/buyer.svg"
                    alt="Buyer"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {t("login.buyer") || "Buyer"}
                </h3>
                <p className="text-[10px] text-gray-400 leading-tight">
                  {t("login.buyerDesc") || "Looking for packaging solutions"}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => handleRoleSelect("supplier")}
                className="bg-white rounded-3xl p-6 shadow-sm border border-transparent hover:border-orange-300 transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors p-2">
                  <Image
                    src="/icon/supplier.svg"
                    alt="Supplier"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {t("login.supplier") || "Supplier"}
                </h3>
                <p className="text-[10px] text-gray-400 leading-tight">
                  {t("login.supplierDesc") || "Provide packaging materials"}
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="register-form-fields"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {successMsg ? (
                <div className="text-green-600 font-medium bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                  {successMsg}
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4 pb-4">
                  {errorMsg && (
                    <div className="text-red-500 text-xs font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                      {errorMsg}
                    </div>
                  )}

                  {role === "buyer" && (
                    <>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-gray-700 ml-1">
                          Name (Thai) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          required
                          value={fullnameTh}
                          onChange={(e) => setFullnameTh(e.target.value)}
                          className="w-full bg-white/50 border-gray-200 focus:border-purple-500 rounded-xl"
                          placeholder="ชื่อ-นามสกุล"
                        />
                      </div>

                      <div className="space-y-2 pt-1 pb-2">
                        <Label className="text-xs font-semibold text-gray-700 ml-1">
                          Business Type <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                          value={businessType}
                          onValueChange={setBusinessType}
                          className="flex gap-4 px-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="บุคคลธรรมดา" id="personal" />
                            <Label
                              htmlFor="personal"
                              className="cursor-pointer text-xs"
                            >
                              บุคคลธรรมดา
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="นิติบุคคล" id="juristic" />
                            <Label
                              htmlFor="juristic"
                              className="cursor-pointer text-xs"
                            >
                              นิติบุคคล
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <AnimatePresence>
                        {businessType === "นิติบุคคล" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden pt-2"
                          >
                            <div className="space-y-1">
                              <Label className="text-xs font-semibold text-gray-700 ml-1">
                                Company Name{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                required={businessType === "นิติบุคคล"}
                                value={companyTitle}
                                onChange={(e) =>
                                  setCompanyTitle(e.target.value)
                                }
                                className="w-full bg-white/50 border-gray-200 focus:border-purple-500 rounded-xl text-sm"
                                placeholder="ชื่อบริษัท"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs font-semibold text-gray-700 ml-1">
                                Tax ID <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                required={businessType === "นิติบุคคล"}
                                value={identificationCard}
                                onChange={(e) =>
                                  setIdentificationCard(e.target.value)
                                }
                                className="w-full bg-white/50 border-gray-200 focus:border-purple-500 rounded-xl text-sm"
                                placeholder="เลขประจำตัวผู้เสียภาษี 13 หลัก"
                                maxLength={13}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs font-semibold text-gray-700 ml-1">
                                Phone Number{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                required={businessType === "นิติบุคคล"}
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-white/50 border-gray-200 focus:border-purple-500 rounded-xl text-sm"
                                placeholder="เบอร์โทรศัพท์ติดต่อ"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs font-semibold text-gray-700 ml-1">
                                Industry Type{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <select
                                required={businessType === "นิติบุคคล"}
                                value={industrialType}
                                onChange={(e) =>
                                  setIndustrialType(e.target.value)
                                }
                                className="flex h-10 w-full rounded-xl border border-gray-200 bg-white/50 px-3 py-2 text-sm text-gray-800 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="" disabled>
                                  เลือกประเภทอุตสาหกรรม (Select Industry)
                                </option>
                                {industrialData.map((item) => (
                                  <option key={item.code} value={item.nameTh}>
                                    {language === "th"
                                      ? item.nameTh
                                      : item.nameEn}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}

                  {role === "supplier" && (
                    <>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-gray-700 ml-1">
                          Company Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full bg-white/50 border-gray-200 focus:border-purple-500 rounded-xl"
                          placeholder="ชื่อบริษัท"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs font-semibold text-gray-700 ml-1">
                            Contact Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            required
                            value={contactPersonFullname}
                            onChange={(e) =>
                              setContactPersonFullname(e.target.value)
                            }
                            className="bg-white/50 border-gray-200 focus:border-purple-500 rounded-xl text-sm"
                            placeholder="ชื่อผู้ติดต่อ"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs font-semibold text-gray-700 ml-1">
                            Position <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            required
                            value={contactPersonPosition}
                            onChange={(e) =>
                              setContactPersonPosition(e.target.value)
                            }
                            className="bg-white/50 border-gray-200 focus:border-purple-500 rounded-xl text-sm"
                            placeholder="ตำแหน่ง"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-gray-700 ml-1">
                          Supplier Type <span className="text-red-500">*</span>
                        </Label>
                        <select
                          required
                          value={supplierType}
                          onChange={(e) => setSupplierType(e.target.value)}
                          className="flex h-10 w-full rounded-xl border border-gray-200 bg-white/50 px-3 py-2 text-sm text-gray-800 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="ผู้ผลิต (Manufacturer)">
                            ผู้ผลิต (Manufacturer)
                          </option>
                          <option value="ตัวแทนจำหน่าย (Distributor)">
                            ตัวแทนจำหน่าย (Distributor)
                          </option>
                          <option value="อื่นๆ (Other)">อื่นๆ (Other)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-gray-700 ml-1">
                          Industry Type <span className="text-red-500">*</span>
                        </Label>
                        <select
                          required
                          value={industrialType}
                          onChange={(e) => setIndustrialType(e.target.value)}
                          className="flex h-10 w-full rounded-xl border border-gray-200 bg-white/50 px-3 py-2 text-sm text-gray-800 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="" disabled>
                            เลือกประเภทอุตสาหกรรม (Select Industry)
                          </option>
                          {industrialData.map((item) => (
                            <option key={item.code} value={item.nameTh}>
                              {language === "th" ? item.nameTh : item.nameEn}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-700 ml-1">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/50 border-gray-200 focus:border-purple-500 rounded-xl"
                      placeholder="example@domain.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-700 ml-1">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/50 border-gray-200 focus:border-purple-500 rounded-xl pr-10"
                        placeholder="••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-gray-700 ml-1">
                      Referral Code
                    </Label>
                    <Input
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      disabled={hasReferralFromUrl}
                      className="w-full bg-white/50 border-gray-200 focus:border-purple-500 rounded-xl disabled:opacity-60"
                      placeholder="รหัสผู้แนะนำ (ถ้ามี)"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 transition-all active:scale-[0.98] flex items-center justify-center border-none"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      t("common.getStarted") || "Create Account"
                    )}
                  </Button>

                  <div className="text-center pt-2">
                    <p className="text-xs text-gray-600">
                      {t("login.noAccount")?.replace("Sign up", "") ||
                        "Already have an account?"}{" "}
                      <Link
                        href="/login"
                        className="text-purple-600 font-bold hover:underline"
                      >
                        {t("login.signIn") || "Login"}
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
