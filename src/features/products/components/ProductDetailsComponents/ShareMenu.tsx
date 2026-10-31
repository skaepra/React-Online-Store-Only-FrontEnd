import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  IoShareSocialOutline, 
  IoCopyOutline, 
  IoCheckmarkOutline,
  IoMailOutline 
} from "react-icons/io5";
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaTwitter, 
  FaTelegramPlane,
  FaPinterestP 
} from "react-icons/fa";
import { Product } from "../../types/product";

interface ShareMenuProps {
  product: Product;
  selectedImage: string;
}

export default function ShareMenu({ product, selectedImage }: ShareMenuProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentUrl = encodeURIComponent(window.location.href);
  const productTitle = encodeURIComponent(product.Name);
  const productImage = encodeURIComponent(selectedImage || product.Images?.[0] || "");

  // روابط المشاركة المباشرة
  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${productTitle}%20-%20${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${productTitle}&url=${currentUrl}`,

    pinterest: `https://pinterest.com/pin/create/button/?url=${currentUrl}&media=${productImage}&description=${productTitle}`,
    email: `mailto:?subject=${productTitle}&body=Check out this product: ${currentUrl}`,
  };

  // نسخ الرابط للحافظة
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="grid h-10 w-10 place-items-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:text-[#0053e2] dark:bg-zinc-800 dark:text-gray-200"
        aria-label="Share product"
      >
        <IoShareSocialOutline className="text-lg" />
      </button>

      {/* القائمة المنبثقة للمشاركة */}
      {showShareMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          className="absolute right-0 top-11 z-30 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
        >
        
          <div className="space-y-1">
            {/* واتساب */}
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-200 dark:hover:bg-zinc-700"
            >
              <FaWhatsapp className="text-base text-emerald-500" />
              <span>WhatsApp</span>
            </a>

            {/* فيسبوك */}
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-zinc-700"
            >
              <FaFacebookF className="text-base text-blue-600" />
              <span>Facebook</span>
            </a>

            {/* تويتر / إكس */}
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-gray-200 dark:hover:bg-zinc-700"
            >
              <FaTwitter className="text-base text-sky-400" />
              <span>Twitter / X</span>
            </a>

           
            {/* بينترست */}
            <a
              href={shareLinks.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-gray-200 dark:hover:bg-zinc-700"
            >
              <FaPinterestP className="text-base text-rose-600" />
              <span>Pinterest</span>
            </a>

            {/* البريد الإلكتروني */}
            <a
              href={shareLinks.email}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-amber-50 hover:text-amber-600 dark:text-gray-200 dark:hover:bg-zinc-700"
            >
              <IoMailOutline className="text-base text-amber-500" />
              <span>Email</span>
            </a>

            {/* زر نسخ الرابط */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-gray-200 dark:hover:bg-zinc-700 border-t border-slate-100 dark:border-zinc-700 mt-1 pt-2"
            >
              {copied ? (
                <>
                  <IoCheckmarkOutline className="text-base text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <IoCopyOutline className="text-base text-slate-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}