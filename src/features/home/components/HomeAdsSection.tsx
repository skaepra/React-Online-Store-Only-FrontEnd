import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowForward, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { BannerAd } from "../../../data/mockAds";
import { getHomeBanners, getMainBanner } from "../services/bannerServices";


export default function HomeAdsSection () {
  const [mainBanner, setMainBanner] = useState<BannerAd | null>(null);
  const [homeBanners, setHomeBanners] = useState<BannerAd[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    async function fetchAds() {
      try {
        const mainData = await getMainBanner();
        const homeData = await getHomeBanners();
        setMainBanner(mainData);
        setHomeBanners(homeData);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    }
    fetchAds();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // أصغر من sm: إعلان واحد
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2); // شاشات sm: إعلانين
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3); // شاشات md: 3 إعلانات
      } else {
        setItemsPerPage(4); // شاشات lg وأكبر: 4 إعلانات
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalBanners = homeBanners.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalBanners);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalBanners) % totalBanners);
  };

  const visibleBanners = Array.from(
    { length: Math.min(itemsPerPage, totalBanners) },
    (_, i: number) => {
      const index = (currentIndex + i) % totalBanners;
      return homeBanners[index];
    }
  );

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6">
      {/* 1. البانر الرئيسي */}
    <div className="grid sm:min-h-[100px] md:min-h-[300px]  overflow-hidden rounded-xl bg-[#0071ce] text-white md:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[1fr_1fr]">
               <div className="hidden relative z-10 md:flex md:flex-col items-start justify-center gap-4 p-6 sm:p-8 lg:p-10">
                 <motion.p
                   initial={{ opacity: 0, y: -20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6 }}
                   className="text-xs font-bold uppercase text-[#ffe08a]"
                 >
                   Welcome to Bazaar
                 </motion.p>
   
                 <motion.h1
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.1 }}
                   className="max-w-xl text-3xl font-semibold  leading-tight  lg:text-4xl"
                 >
                   Everyday finds, all in one place.
                 </motion.h1>
   
                 <motion.p
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.2 }}
                   className="max-w-lg text-sm leading-6 text-white/90 md:text-base"
                 >
                   Shop tech, accessories, and personal care from one store.
                 </motion.p>
   
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.3 }}
                 >
                   <button
                     className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#ffc220] px-6 py-3 text-sm font-bold transition-colors hover:bg-[#fac73b] "
                   >
                     <span className="text-white">Shop now</span>
                     <IoArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                   </button>
                 </motion.div>
               </div>
               <div className="min-h-[180px] sm:min-h-[240px] items-center justify-center  md:flex">
                 <img
                  src={mainBanner?.imageUrl}
                   className="h-full max-h-[300px] md:max-h-[380px] w-full "
                 />
               </div>
             </div>
   

  
      {/* 2. قسم الإعلانات السفلية */}
      <div className="relative mt-6">
        {totalBanners > itemsPerPage && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute -left-3 top-1/2 -translate-y-6 sm:-translate-y-1/2 z-30 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700 text-gray-800 dark:text-white p-1.5 sm:p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all cursor-pointer border border-gray-200 dark:border-zinc-700"
              aria-label="Previous Ads"
            >
              <IoChevronBack className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute -right-3 top-1/2 -translate-y-6 sm:-translate-y-1/2 z-30 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700 text-gray-800 dark:text-white p-1.5 sm:p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all cursor-pointer border border-gray-200 dark:border-zinc-700"
              aria-label="Next Ads"
            >
              <IoChevronForward className="w-5 h-5" />
            </button>
          </>
        )}

        {/* 💡 شبكة متجاوبة    (1 للهاتف، 2 لـ sm، 3 لـ md، 4 لـ lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="wait">
            {visibleBanners.map((banner, index) => (
              <div
                key={`${banner.id}-${index}`}
                className="relative rounded-xl overflow-hidden shadow-md bg-black"
              >
                <a href={banner.linkUrl} className="block w-full h-full">
                  <img
                    src={banner.imageUrl}
                    alt="Promotional Banner"
                    className="w-full h-48 sm:h-44 md:h-48 object-cover"
                  />
                </a>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* النقاط تظهر فقط على شاشات الهاتف الأصغر (أقل من sm) */}
        {totalBanners > itemsPerPage && (
          <div className="flex justify-center items-center gap-2 mt-3 sm:hidden">
            {homeBanners.map((_, idx: number) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-2 bg-[#0071ce]"
                    : "w-2 bg-gray-300 dark:bg-zinc-700"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}