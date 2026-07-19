import { useState, useEffect, useMemo, useRef } from "react";
import { getOrders } from "../services/orderService";
import { orderType } from "../types/orderType";
import { filterOrders } from "../Helpers/orderHelpers";

export function useOrders() {
  const [activeFilter, setActiveFilter] = useState<"current" | "completed" | "rejected" | string>("current");
  const [orders, setOrders] = useState<orderType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const isFirstLoad = useRef(true);

  // جعلنا الدالة معرفة في نطاق الـ Hook لتتمكن من تصديرها
  const fetchOrders = async () => {
    try {
      if (isFirstLoad.current) {
        setIsLoading(true);
      }
      const data = await getOrders();
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      if (isFirstLoad.current) {
        setIsLoading(false);
        isFirstLoad.current = false;
      }
    }
  };

  useEffect(() => {
    fetchOrders();

    const intervalId = setInterval(fetchOrders, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredOrders = useMemo(() => {
    return filterOrders(orders, activeFilter);
  }, [orders, activeFilter]);

  // هنا نقوم بتصدير كل شيء للـ Component
  return {
    activeFilter,
    setActiveFilter,
    filteredOrders,
    isLoading,
    fetchOrders, // 👈 التعديل المنقذ هنا
  };
}