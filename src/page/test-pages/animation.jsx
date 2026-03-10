import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";

export default function ListExample() {
  const [items, setItems] = useState([1, 2, 3]);
    const [pro, setpro] = useState([1, 2, 3]);

  const transitions = useTransition(pro, {
    from: { opacity: 0, y: 20 },   // عند البداية (قبل الظهور)
    enter: { opacity: 1, y: 0 },   // عند الدخول
    leave: { opacity: 0, y: -20 }, // عند الخروج
    config: { tension: 180, friction: 18 }, // إعدادات الفيزياء (سرعة ومرونة)
    trail: 100, // تأخير بسيط بين العناصر
  });


  return (
    <>
    <div className="p-4">
      <button
        onClick={() => setItems(items.length ? [] : [1, 2, 3])}
        className="mb-4 px-3 py-2 bg-blue-600 text-white rounded"
      >
        Toggle List
      </button>
      

      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            
            className="p-2 mb-2 bg-gray-200 rounded"
          >
            Item {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>

     <div className="p-4">
      <button
        onClick={() => setpro(pro.length ? [] : [1, 2, 3])}
        className="mb-4 px-3 py-2 bg-green-600 text-white rounded"
      >
        Toggle List
      </button>

      {/* كل عنصر داخل useTransition يحصل على أنيميشن خاص به */}
      {transitions((style, item) => (
        <animated.div
          key={item}
          style={{
            ...style,
            transform: style.y.to((y) => `translateY(${y}px)`),
          }}
          className="p-2 mb-2 bg-gray-200 rounded"
        >
          Item {item}
        </animated.div>
      ))}
    </div>
    </>
  );
}
