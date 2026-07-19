import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// 1. تعريف بنية عنصر السلة
interface CartItem {
  id: string | number;
  quantity: number;
  color: string;
  image: string | number;
}

// 2. تعريف جميع القيم والدوال الممررة عبر الـ Context
interface GgContextType {
  storitems: CartItem[];
  Totals: number;
  visbil: boolean;
  show: { id?: string | number };
  quint: number;
  color: string;
  imagenumper: number;
  image: string | number;
  carId: { id?: string | number };
  add: (id: string | number, price: number) => void;
  increc: (id: string | number, color: string) => void;
  decrec: (id: string | number, color: string) => void;
  Quantity: (id: string | number, color?: string) => number; // تحديث لدعم فحص اللون
  increcTotal: (tot: number) => void;
  decrecTotal: (tot: number) => void;
  remove: (id: string | number, Tota: number, quantity: number, color: string) => void;
  hand: (id: string | number) => void;
  setcolor: React.Dispatch<React.SetStateAction<string>>;
  setimagenumper: React.Dispatch<React.SetStateAction<number>>;
  setimage: React.Dispatch<React.SetStateAction<string | number>>;
  checkCar: (id: string | number) => void;
}

// 3. إنشاء الـ Context
const GgContext = createContext<GgContextType | undefined>(undefined);

interface GgProviderProps {
  children: ReactNode;
}

export const GgProvider = ({ children }: GgProviderProps) => {
  const [visbil, setvisbil] = useState<boolean>(false);
  const [show, setshows] = useState<{ id?: string | number }>({});
  const [color, setcolor] = useState<string>("");
  const [imagenumper, setimagenumper] = useState<number>(0);
  const [image, setimage] = useState<string | number>(0);

  // قراءة البيانات بأمان من LocalStorage مع تحديد النوع التلقائي
  const [storitems, setstoritem] = useState<CartItem[]>(() => {
    const localData = localStorage.getItem("storitems");
    return localData ? JSON.parse(localData) : [];
  });

  const [Totals, setTotal] = useState<number>(() => {
    const localData = localStorage.getItem("Total");
    return localData ? JSON.parse(localData) : 0;
  });

  const [quint, setquint] = useState<number>(() => {
    const localData = localStorage.getItem("quint");
    return localData ? JSON.parse(localData) : 0;
  });

  /* المزامنة مع LocalStorage */
  useEffect(() => {
    localStorage.setItem("storitems", JSON.stringify(storitems));
  }, [storitems]);

  useEffect(() => {
    localStorage.setItem("Total", JSON.stringify(Totals));
  }, [Totals]);

  useEffect(() => {
    localStorage.setItem("quint", JSON.stringify(quint));
  }, [quint]);

  /* car project */
  const [carId, setcarId] = useState<{ id?: string | number }>(() => {
    const localData = localStorage.getItem("carId");
    return localData ? JSON.parse(localData) : {};
  });

  useEffect(() => {
    localStorage.setItem("carId", JSON.stringify(carId));
  }, [carId]);

  /* تحديد Id السيارة */
  const checkCar = (id: string | number) => {
    setcarId({ id });
  };

  /* التحكم بظهور تفاصيل المنتج وعمل Reset للحالة */
  const hand = (id: string | number) => {
    if (!visbil) {
      setshows({ id });
      setvisbil(true);
    } else {
      setvisbil(false);
      setimagenumper(0);
      setcolor("");
    }
  };

  /* تعديل إجمالي السعر */
  const increcTotal = (tot: number) => {
    setTotal((prev) => prev + tot);
  };
  const decrecTotal = (tot: number) => {
    setTotal((prev) => prev - tot);
  };

  /* معرفة كمية منتج محدد بدقة (مع مراعاة اللون لو مررته) */
  const Quantity = (id: string | number, itemColor?: string): number => {
    if (itemColor) {
      return storitems.find((item) => item.id === id && item.color === itemColor)?.quantity || 0;
    }
    // إذا لم يمرر اللون، يجمع كافة كميات هذا المنتج بكل ألوانه
    return storitems
      .filter((item) => item.id === id)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  /* إضافة عنصر جديد للسلة */
  const add = (id: string | number, price: number) => {
    const isExist = storitems.some((item) => item.id === id && item.color === color);
    if (isExist) {
      return; // خروج مبكر بدون إعادة رندر مصفوفة غير ضرورية
    }

    setstoritem((prev) => [...prev, { id, quantity: 1, color, image }]);
    setcolor("");
    setquint((prev) => prev + 1);
    setTotal((prev) => prev + price);
  };

  /* زيادة الكمية داخل السلة بطريقة آمنة بدون Side-Effects */
  const increc = (id: string | number, itemColor: string) => {
    const isExist = storitems.some((item) => item.id === id && item.color === itemColor);
    if (!isExist) return;

    setstoritem((currItems) =>
      currItems.map((item) =>
        item.id === id && item.color === itemColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    setquint((prev) => prev + 1);
  };

  /* تقليل الكمية داخل السلة بطريقة آمنة بدون Side-Effects */
  const decrec = (id: string | number, itemColor: string) => {
    const targetItem = storitems.find((item) => item.id === id && item.color === itemColor);
    // منع التقليل إذا كان العنصر غير موجود أو كانت الكمية 1 بالفعل
    if (!targetItem || targetItem.quantity <= 1) return;

    setstoritem((currItems) =>
      currItems.map((item) =>
        item.id === id && item.color === itemColor
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    setquint((prev) => prev - 1);
  };

  /* حذف عنصر نهائياً من السلة */
  const remove = (id: string | number, Tota: number, quantity: number, itemColor: string) => {
    setstoritem((prev) => prev.filter((item) => item.id !== id || item.color !== itemColor));
    setTotal((prev) => prev - Tota);
    setquint((prev) => prev - quantity);
  };

  return (
    <GgContext.Provider
      value={{
        storitems,
        Totals,
        visbil,
        show,
        quint,
        color,
        imagenumper,
        image,
        add,
        increc,
        decrec,
        Quantity,
        increcTotal,
        decrecTotal,
        remove,
        hand,
        setcolor,
        setimagenumper,
        setimage,
        checkCar,
        carId,
      }}
    >
      {children}
    </GgContext.Provider>
  );
};

export default GgProvider;

// 4. الـ Hook المخصص
export const useGg = () => {
  const context = useContext(GgContext);
  if (context === undefined) {
    throw new Error("useGg must be used within a GgProvider");
  }
  return context;
};