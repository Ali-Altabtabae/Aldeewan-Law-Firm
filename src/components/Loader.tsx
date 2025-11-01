import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Logo */}
      <motion.img
        src="/approved-logo.png"
        alt="Aldeewan Law Firm Logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-56 h-56 mb-6 object-contain drop-shadow-[var(--shadow-gold)]"
      />

      {/* English Firm Name */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-serif tracking-wide text-center"
      >
        Aldeewan Law Firm
      </motion.h1>

      {/* Arabic Firm Name */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-2 text-2xl font-serif tracking-wide text-center rtl"
        dir="rtl"
      >
        مكتب الديوان للمحاماة
      </motion.h2>

      {/* Elegant Gold Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "6rem" }}
        transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
        className="mt-4 h-[2px] rounded bg-[hsl(var(--gold))] shadow-[var(--shadow-gold)]"
      />

      {/* Loading text (English + Arabic) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 text-sm text-[hsl(var(--muted-foreground))] text-center"
      >
        Loading... <span dir="rtl">جارٍ التحميل...</span>
      </motion.p>
    </div>
  );
}
