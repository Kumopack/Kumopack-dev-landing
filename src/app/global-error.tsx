"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="th">
      <body className="antialiased">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="text-8xl font-black text-gray-200 select-none">
              500
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-black text-gray-900">
                เกิดข้อผิดพลาด
              </h1>
              <p className="text-gray-500 text-lg">
                ขออภัย เกิดข้อผิดพลาดร้ายแรง กรุณาลองอีกครั้ง
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => reset()}
                className="px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-colors"
              >
                ลองอีกครั้ง
              </button>
              <a
                href="/th"
                className="px-8 py-4 border border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-colors"
              >
                กลับหน้าหลัก
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
