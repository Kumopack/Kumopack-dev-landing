"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, FileText, Lock, RefreshCcw, Handshake, Info, MapPin, Search } from "lucide-react";
import { Dictionary } from "@/lib/dictionary";

// Original English mock
const enPolicies = [
    {
        icon: Shield,
        title: "Security Policy",
        content: "We prioritize the security of your transactions and data. Our platform uses industry-standard encryption and secure payment gateways to ensure your business information remains protected."
    },
    {
        icon: FileText,
        title: "Terms of Service",
        content: "By using Kumopack, you agree to our terms of service regarding sourcing, ordering, and communication with manufacturers. We act as a facilitator and platform provider."
    },
    {
        icon: Lock,
        title: "Privacy Policy",
        content: "Your privacy is paramount. We only collect necessary information to facilitate your orders and improve our service. We never sell your data to third parties."
    },
    {
        icon: RefreshCcw,
        title: "Refund & Return Policy",
        content: "As custom packaging is manufactured to order, returns are generally only accepted for manufacturing defects. We facilitate quality disputes between buyers and factories."
    }
];

const thTerms = [
    {
        title: "1. ไซส์กล่องบรรจุภัณฑ์",
        items: [
            "การผลิตไซซ์กล่องกระดาษ ผู้ผลิต (supplier) ผลิตตามข้อมูลโดยอ้างอิงไซซ์ในใบเสนอราคาเป็นหลัก ผู้ผลิต (supplier) ต้องระบุไซซ์ว่าเป็นขนาดภายใน (inner), ภายนอก (outer), และขนาดทับรอย (score line) ให้ชัดเจน หากไม่ได้ระบุให้อิงความสำคัญของไซซ์ตัวอย่างที่ทาง ผู้ผลิต (supplier) ส่งให้ ผู้ซื้อ (buyer) และผู้ซื้อคอนเฟิมส์เป็นหลัก",
            "การคอนเฟิมการผลิต ผู้ผลิต (supplier) ต้องส่งตัวอย่างกล่องตามไซซ์ที่ระบุในใบเสนอราคาเพื่อให้ลูกค้าตรวจสอบความถูกต้องของไซซ์จนกว่าลูกค้าคอนเฟิมถึงสามารถผลิตได้ หากเกิดผลิตก่อนทาง ผู้ซื้อ (buyer) คอนเฟิมถือว่าผู้ผลิต (supplier) ตัดสินใจโดยพละกาล หากเกิดข้อพิพากษ์ถือว่าทางผู้ผลิต (supplier) ต้องรับผิดชอบด้วยการผลิตใหม่ทั้งหมด หรือคืนค่ามัดจำเต็มจำนวนหากไม่สามารถตกลงกับ ผู้ซื้อ (buyer) ได้",
            "ไซซ์กล่องกระดาษอ้างอิงจากเส้น score line หรือจากตัวอย่างที่ลูกค้า confirm แล้ว โดยค่าความคลาดเคลื่อนหรือ error +- ได้ไม่เกิน 2mm ต่อด้าน หากผู้ผลิต (supplier) ผลิตสินค้าโดยมีค่า error +- ไม่เกินตามหลักเกณฑ์นี้ ผู้ซื้อ (buyer) ไม่มีสิทธิ์ขอยกเลิกหรือคืนสินค้า",
            "ผู้ซื้อ (buyer) มีหน้าที่เช็คความถูกต้องของไซซ์กล่องตัวอย่าง"
        ]
    },
    {
        title: "2. สเปคกระดาษและแกรมกระดาษ",
        items: [
            "สเปคสีกระดาษอ้างอิงข้อมูลตามใบแจ้งหนี้เป็นหลัก โดยที่สเปคสีกระดาษทางผู้ผลิต (supplier) มีหน้าที่ส่งตัวอย่างเฉดสีให้ลูกค้า confirm ก่อนผลิตทุกครั้ง",
            "แกรมกระดาษอ้างอิงตามใบแจ้งหนี้เป็นหลัก ผู้ผลิต (supplier) มีหน้าที่ส่งตัวอย่างกล่องกระดาษตามสเปคจริง หรือแผ่นกระดาษตามสเปคจริงให้กับทางผู้ซื้อ (buyer) ก่อน confirm การผลิตทุกครั้งที่มีการสั่งผลิตไซซ์ใหม่",
            "แกรมกระดาษอ้างอิงตามค่ามาตรฐานเป็นหลัก หากแกรมกระดาษไม่ตรงสเปคในใบแจ้งหนี้ที่มีการ confirm แล้วถือว่าผู้ผลิต (supplier) จะเป็นผู้รับผิดชอบต่อความเสียหายในล็อตนั้นๆ",
            "แกรมกระดาษปะลอนด้านใน ผู้ผลิต (supplier) มีหน้าที่แจ้งลูกค้าให้ทราบถึงแกรมกระดาษที่ใช้ในการผลิตทุกครั้ง และ ผู้ซื้อ (buyer) มีสิทธิ์ปฏิเสธหากผู้ผลิต (supplier) ส่งมอบสินค้าไม่ตรงสเปคที่แจ้งไว้"
        ]
    },
    {
        title: "3. การผลิตและงานพิมพ์",
        items: [
            "การผลิตกระดาษ ผู้ผลิต (supplier) ผลิตกล่องกระดาษและส่งมอบให้ลูกค้าโดยลักษณะความแข็งแรง สเปคสี และแกรมกระดาษอ้างอิงตามใบแจ้งหนี้เป็นหลัก โดยที่ลอนกระดาษจะไม่ถูกกดทับจนมีลักษณะลอนล้มและมีผลต่อความแข็งแรง",
            "งานพิมพ์สีทาง ผู้ผลิต (supplier) และ ผู้ซื้อ (buyer) มีการตกลงกันตามรหัส Pantone C (กรณีงานพิมพ์ระบบ flexography) หรือ CMYK (กรณีพิมพ์ระบบ digital print) ก่อนการผลิต โดยผู้ผลิต (supplier) มีหน้าที่และความรับผิดชอบในการส่งใบแสดงเฉดสี pantone C ลงบนเนื้อกระดาษตามสเปคนั้นๆในใบแจ้งหนี้ และมีค่ากำหนด lower upper ที่ชัดเจนกรณีลูกค้าร้องขอ",
            "แกรมกระดาษอ้างอิงตามใบแจ้งหนี้ล่าสุดที่ลูกค้าเป็นผู้คอนเฟิร์มการผลิต ทั้งนี้น้ำหนักโดยรวมของแกรมกระดาษตามใบแจ้งหนี้ + - ทุกชั้น (layers) จะไม่เกิน 3%"
        ]
    },
    {
        title: "4. จำนวนในการผลิต",
        items: [
            "จำนวนในการผลิต +,- ไม่เกิน 3% ของยอดการสั่งซื้อ ทั้งนี้หากสินค้าที่ผลิตขาด ทาง ผู้ผลิต (supplier) สามารถแจ้งกับทาง ผู้ซื้อ (buyer) ให้จบดีลงานนั้นๆได้หากผู้ซื้อ (buyer) ยินยอม",
            "กรณีสินค้าผลิตขาดจำนวนเกิน 3% แล้วผู้ซื้อ (buyer) ไม่ยินยอม ทาง ผู้ผลิต (supplier) มีความรับผิดชอบต้องผลิตให้ครบตามจำนวนตามข้อตกลงที่ได้แจ้งไว้กับทางผู้ซื้อ (buyer)",
            "กรณีสินค้าผลิตขาดจำนวนไม่เกิน 3% ผู้ผลิต (supplier) สามารถแจ้งทางผู้ซื้อ (buyer) ขอปิดดิลตามใบสั่งซื้อได้แม้ผู้ซื้อ (buyer) ไม่ยินยอม เนื่องจากทาง ผู้ซื้อ (buyer) ยอมรับเงื่อนไขและกฏเกณฑ์ในการผลิตสินค้าภายใต้เว็บ Kumopack แล้ว"
        ]
    },
    {
        title: "5. การจัดส่ง",
        items: [
            "เมื่อทางผู้ผลิต (supplier) ผลิตสินค้าเสร็จแล้ว มีความรับผลิตชอบต้องเร่งนำส่งสินค้าให้ทางลูกค้าภายใต้กรอบเวลาที่ผู้ผลิต (supplier) และผู้ซื้อ (buyer) ยอมรับร่วมกัน โดยมีความล่าช้าต้องไม่มากกว่า 5 วันทำการตามเวลาที่กำหนด หากเลยกำหนดดังกล่าวทางระบบจะเป็นผู้ปรับผู้ผลิต (supplier) วันละ 2% จากยอดขาย หรือทางผู้ซื้อ (buyer) มีสิทธิในการขอเปลี่ยนเจ้าผู้ผลิต หรือแจ้งยกเลิก",
            "หลังจากผลิตสินค้าเสร็จพร้อมจัดส่ง ทางผู้ผลิต (supplier) มีหน้าที่ความรับผิดชอบในการประสานงานกับทางผู้ซื้อ (buyer) เพื่อทำการจัดส่ง ทั้งนี้หากผู้ซื้อ (buyer) ไม่สามารถติดต่อได้ หรือทำการเลื่อนดิวการจัดส่ง จะไม่ถือว่าทางผู้ผลิต (supplier) ผลิตเลยเวลาที่กำหนด",
            "การจัดส่งทางผู้ผลิต (supplier) มีหน้าที่จัดส่งสินค้าถึงสถานที่ๆได้ตกลงไว้กับทาง ผู้ซื้อ (buyer) หรือตามโลเคชั่นที่ผู้ซื้อ (buyer) ลงไว้ในระบบ ซึ่งผู้ผลิต (supplier) มีหน้าที่ลงสินค้าให้กับทาง ผู้ซื้อ (buyer) ทั้งจำนวน แต่ไม่รวมถึงการขึ้นชั้น การยกสินค้าขึ้นลิฟท์ หรือการยกสินค้าไปในสถานที่ห่างไกลรถส่งสินค้าเกินกว่า 50 เมตร หากสถานที่จัดส่งปลายทางมีลักษณะดังกล่าว ทางผู้ผลิต (supplier) มีสิทธิ์แจ้งเรียกค่าใช้จ่ายเพิ่มเติมกับทางผู้ซื้อ (buyer) ได้"
        ]
    },
    {
        title: "6. การชำระค่าสินค้า",
        items: [
            "เมื่อผู้ซื้อ (buyer) ได้รับใบเสนอราคาจากผู้ผลิต (supplier) และตกลงที่จะทำการซื้อขายกันแล้ว ทางผู้ผลิต (supplier) มีหน้าที่ออกเอกสารใบแจ้งหนี้ (invoice) ให้กับผู้ซื้อ (buyer) ภายในระบบ",
            "หลังจากผู้ซื้อ (buyer) ทำการชำระค่าสินค้าในระบบแล้ว ค่าสินค้าดังกล่าวจะถือเป็นค่ามัดจำการผลิตสินค้าล่วงหน้า โดยทาง Kumopack จะเป็นผู้ดูแลเงินจำนวนนี้จนกว่าทางผู้ซื้อ (buyer) และ ผู้ผลิต (supplier) ทำการส่งมอบสินค้าและยอมรับสินค้าแล้ว ถือเป็นการปิดดิลการสั่งซื้อนี้ ทางระบบบัญชี kumopack จะทำการโอนยอดส่วนต่างให้กับทางผู้ผลิต (supplier)",
            "หลังจากผู้ผลิต (supplier) ได้รับข้อมูลการเปิดงานการสั่งซื้อจากในระบบแล้ว ผู้ผลิต (supplier) มีหน้าที่ทำตัวอย่างส่งมอบให้กับทางผู้ซื้อ (buyer) เพื่อทำการยืนยันการผลิต หลังจากทางผู้ซื้อ (buyer) กดยืนยันตัวอย่างแล้ว ทางระบบจะถือว่าผู้ซื้อ (buyer) ยอมรับเงื่อนไขตามใบแจ้งหนี้ของทางผู้ผลิต (supplier) ทางระบบ kumopack จะมีหน้าที่โอนยอดชำระค่ามัดจำ 50% แรกให้กับทางผู้ผลิต (supplier) เพื่อทำการสั่งผลิตสินค้า และระบบจะเริ่มนับการผลิตและถือว่าวันที่ผู้ซื้อ (buyer) ยืนยันตัวอย่างแล้ว นับเป็นวันที่ 1 ตามเงื่อนไขระยะเวลาที่โรงงานกำหนด",
            "หลังจากผู้ผลิต (supplier) ทำการส่งมอบผลิตภัณฑ์ให้กับทางผู้ซื้อ (buyer) เสร็จสิ้นทางผู้ซื้อ (buyer) มีหน้าที่ตรวจสอบความถูกต้องก่อนรับสินค้า และผู้ซื้อ (buyer) มีหน้าที่กดยืนยันการรับสินค้าภายในระบบ kumopack เพื่อถือเป็นการปิดดิล และเลข tacking การสั่งผลิตสินค้านี้ถือเป็นสิ้นสุด กรณีทางผู้ซื้อ (buyer) รับสินค้าแล้วและไม่กดยอมรับสินค้าภายใน 7 วัน และไม่ได้มีการแจ้งเคลมสินค้า ระบบจะถือว่าลูกค้าได้รับสินค้าเป็นที่เรียบร้อย และระบบจะทำการปิดดิล เลข tacking การสั่งผลิตสินค้านี้ถือเป็นสิ้นสุด"
        ]
    }
];

const thAdvantages = [
    {
        title: "Nearest Location",
        desc: "icon ที่แสดงให้เห็นว่าโรงงานผู้ผลิต (supplier) อยู่ในรัศมีภายในไม่เกิน 20 กิโลเมตร",
        method: "ผู้ผลิต (supplier) เพิ่มลิ้ง location หลักในระบบตามที่อยู่สำนักงานใหญ่ ระบบจะลิ้งหมุดตามที่อยู่ที่ผู้ผลิต (supplier) ปักไว้นำมาอ้างอิงกับหมุดที่อยู่ที่ผู้ซื้อ (buyer) แจ้งในระบบ"
    },
    {
        title: "Flexo Printing",
        desc: "icon ที่แสดงให้เห็นว่าโรงงานผู้ผลิต (supplier) มีระบบงานพิมพ์ flexo printing",
        method: "ผู้ผลิต (supplier) แจ้งในระบบหลังบ้านเปิดโหมดประเภทลักษณะงานพิมพ์ (หากสามารถพิมพ์ได้) หากทางผู้ผลิต (supplier) ติ๊กในระบบหลังบ้านเปิดงานพิมพ์ Flexo printing ระบบจะทำการโชว์ icon ขึ้นมาในระบบ"
    },
    {
        title: "Digital UV Inkjet",
        desc: "icon ที่แสดงให้เห็นว่าโรงงานผู้ผลิต (supplier) มีระบบงานพิมพ์ digital printing และ, หรือมีระบบงานพิมพ์ UV printing",
        method: "ผู้ผลิต (supplier) แจ้งในระบบหลังบ้านเปิดโหมดประเภทลักษณะงานพิมพ์ (หากสามารถพิมพ์ได้) หากทางผู้ผลิต (supplier) ติ๊กในระบบหลังบ้านเปิดงานพิมพ์ Digital + UV printing ระบบจะทำการโชว์ icon ขึ้นมาในระบบ"
    },
    {
        title: "Popular Factory",
        desc: "icon ที่แสดงให้เห็นว่าโรงงานผู้ผลิต (supplier) เป็นที่นิยมของผู้ซื้อ (buyer) และมีอัตรากการปิดดิลสูง",
        method: "ผู้ผลิต (supplier) เป็นโรงงานที่ผู้ซื้อ (buyer) ให้คะแนนเฉลี่ยมากกว่า 4 ดาวขึ้นไปและมีการสั่งผลิตมากกว่า 20 คำสั่งซื้อในรอบ 1 ปี"
    },
    {
        title: "Diversity",
        desc: "icon ที่แสดงให้เห็นว่าโรงงานผู้ผลิต (supplier) สามารถผลิตสินค้าได้อย่างหลากหลายในหมวดหมู่นั้นๆ",
        method: "ผู้ผลิต (supplier) กดเลือกประเภทสินค้าบรรจุภัณฑ์ที่สามารถผลิตได้มากกว่า 6 ประเภท และสามารถพิมพ์ได้มากกว่า 2 สี"
    },
    {
        title: "Fast Production",
        desc: "icon ที่แสดงให้เห็นว่าโรงงานผู้ผลิต (supplier) สามารถผลิตงานได้อย่างรวดเร็วภายในไม่เกิน 5-7 วันทำการ",
        method: "ผู้ผลิต (supplier) การันตี lead-time การจัดส่งที่ไม่เกิน 5-7 วันทำการ"
    },
    {
        title: "On demand",
        desc: "icon ที่แสดงให้เห็นว่าโรงงานผู้ผลิต (supplier) ไม่กำหนดขั้นต่ำในการผลิตสินค้า",
        method: "ผู้ผลิต (supplier) กดเลือกขั้นต่ำในการผลิตที่ ‘สามารถผลิตตามจำนวนขั้นต่ำที่ลูกค้าต้องการ หรือน้อยกว่า 100 ใบได้"
    },
    {
        title: "Sale Support",
        desc: "icon ที่แสดงให้เห็นว่าโรงงานผู้ผลิต (supplier) มีเซลล์ประจำและสามารถติดต่อประสานงานกับทางผู้ซื้อ (buyer) ได้อย่างรวดเร็ว",
        method: "ผู้ผลิต (supplier) กดเลือกว่ามี sales support ในระบบ"
    },
    {
        title: "Guarantee by Kumopack",
        desc: "icon ที่แสดงให้เห็นว่าโรงงานผู้ผลิต (supplier) ได้รับการตรวจสอบโดยทีมงานของ Kumopack แล้วทั้งในเรื่องของคุณภาพในการผลิต, ประเภทเครื่องจักรที่ใช้ผลิต, ความปลอดภัยพื้นฐานสำหรับพนักงานผลิต และผู้ใช้งาน",
        method: "ผู้ผลิต (supplier) ได้รับการการันตีจากทางทีมงาน Kumopack โดยทางทีมงาน Kumopack จะทำการ audit โรงงานผู้ผลิต ทั้งกระบวนการ, วัสดุดิบ, ประเภทงานพิมพ์, การจัดการภายใน, ความปลอดภัยพนักงาน หลังจากผ่านการประเมินเเล้วทางทีมงานจะอนุมัติ icon guarantee ให้กับทางผู้ผลิต (supplier) อีกทีภายในไม่เกิน 7 วันทำการ"
    }
];

export default function PolicyClient({ lang, dict }: { lang: string; dict: Dictionary }) {
    const [activeTab, setActiveTab] = useState<"terms" | "advantages">("terms");

    if (lang === "th") {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Navbar lang={lang} dict={dict} />
                <section className="pt-32 pb-24 px-4 md:px-8">
                    <div className="container mx-auto max-w-4xl">
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">เงื่อนไขข้อตกลง การใช้บริการของแพลตฟอร์ม</h1>
                            <p className="text-muted-foreground text-sm font-medium border-b border-border/50 pb-6">Current as of 20 Jan 2022</p>
                        </div>
                        
                        {/* Tabs Navigation */}
                        <div className="flex gap-6 mb-10 overflow-x-auto custom-scrollbar">
                            <button 
                                onClick={() => setActiveTab("terms")}
                                className={`pb-3 border-b-2 font-bold text-lg whitespace-nowrap transition-colors ${
                                    activeTab === "terms" 
                                    ? "border-primary text-primary" 
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                }`}
                            >
                                เงื่อนไขข้อตกลงร่วมกัน
                            </button>
                            <button 
                                onClick={() => setActiveTab("advantages")}
                                className={`pb-3 border-b-2 font-bold text-lg whitespace-nowrap transition-colors ${
                                    activeTab === "advantages" 
                                    ? "border-primary text-primary" 
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                }`}
                            >
                                Factory Advantages
                            </button>
                        </div>

                        {activeTab === "terms" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-primary/5 rounded-2xl p-6 mb-12 flex items-start gap-4">
                                    <Handshake className="w-8 h-8 text-primary shrink-0 mt-1" />
                                    <p className="text-lg leading-relaxed text-foreground/80 font-medium">
                                        ผู้ซื้อ (buyer) และผู้ผลิต (supplier) ยอมรับข้อตกลงว่าจ้างการผลิต ตามเงื่อนไขที่ทาง Kumopack ได้ระบุไว้ตามหลักเกณฑ์สากล ซึ่งผู้ซื้อ (buyer) และผู้ผลิต (supplier) ต่างยอมรับข้อตกลงร่วมกันดังนี้
                                    </p>
                                </div>

                        <div className="space-y-12">
                            {thTerms.map((term, idx) => (
                                <div key={idx} className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
                                    <h2 className="text-2xl font-bold mb-6 text-primary">{term.title}</h2>
                                    <ul className="space-y-4">
                                        {term.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className="flex gap-4 items-start">
                                                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                                                    {itemIdx + 1}
                                                </span>
                                                <span className="text-foreground/80 leading-relaxed pt-1">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                            </div>
                        )}

                        {activeTab === "advantages" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-6">
                                    {thAdvantages.map((adv, idx) => (
                                        <div key={idx} className="bg-card border border-border/50 rounded-2xl p-6 hover:shadow-soft transition-all">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 shadow-sm">
                                                    <Info className="w-6 h-6 text-orange-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold mb-2 text-slate-800">{adv.title}</h3>
                                                    <p className="text-muted-foreground leading-relaxed">{adv.desc}</p>
                                                </div>
                                            </div>
                                            <div className="bg-muted/30 rounded-xl p-4 mt-2 border border-border/30">
                                                <p className="text-sm text-foreground/70 leading-relaxed font-medium">
                                                    <span className="text-primary font-bold">วิธีการมี Icon: </span> 
                                                    {adv.method}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                <Footer dict={dict} />
            </main>
        );
    }

    // English Fallback
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar lang={lang} dict={dict} />
            <section className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-12">Policies & Terms</h1>

                    <div className="space-y-16">
                        {enPolicies.map((policy, idx) => (
                            <div key={idx} className="flex gap-8">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <policy.icon className="w-7 h-7 text-primary" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold">{policy.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed text-lg">
                                        {policy.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer dict={dict} />
        </main>
    );
}
