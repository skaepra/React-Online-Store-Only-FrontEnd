import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoBagCheckOutline, 
  IoChevronDownOutline, 
  IoTimeOutline, 
  IoLocationOutline, 
  IoCardOutline, 
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoSyncOutline,
  IoPersonOutline,
  IoCallOutline,
  IoHomeOutline
} from "react-icons/io5";

import { orderType} from "../types/orderType";
import { getOrders } from "../services/orderService";

// --- Helpers لتنسيق الحالات والأرقام ---

const getStatusBadge = (status: number) => {
  switch (status) {
    case 0:
      return { label: "قيد الانتظار", icon: IoTimeOutline, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800" };
    case 1:
      return { label: "جاري المعالجة", icon: IoSyncOutline, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800" };
    case 2:
      return { label: "تم الشحن / التوصيل", icon: IoBagCheckOutline, color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800" };
    case 3:
      return { label: "مكتمل", icon: IoCheckmarkCircleOutline, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" };
    case 4:
      return { label: "ملغى", icon: IoCloseCircleOutline, color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800" };
    default:
      return { label: "غير معروف", icon: IoTimeOutline, color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" };
  }
};

const getPaymentStatusBadge = (status: number) => {
  switch (status) {
    case 1:
      return { label: "مدفوع", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40" };
    case 0:
    default:
      return { label: "غير مدفوع", color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40" };
  }
};

const getPaymentMethodLabel = (method: number) => {
  switch (method) {
    case 0:
      return { label: "الدفع عند الاستلام", icon: IoCashOutline };
    case 1:
      return { label: "بطاقة ائتمان", icon: IoCardOutline };
    default:
      return { label: "طريقة أخرى", icon: IoCardOutline };
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data || []);
      } catch (error) {
        console.error("فشل في جلب الطلبات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpand = (id: string | number) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">جاري تحميل الطلبات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 pb-10 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">سجل الطلبات</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              متابعة جميع طلباتك السابقة والحالية وحالتها
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/60 rounded-2xl shadow-sm">
              <span className="text-xs text-gray-400 block">إجمالي الطلبات</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{orders.length}</span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-800/40 rounded-3xl border border-gray-100 dark:border-zinc-800 p-8">
            <IoBagCheckOutline className="mx-auto text-5xl text-gray-300 dark:text-zinc-600 mb-3" />
            <h3 className="text-lg font-semibold">لا توجد طلبات حتى الآن</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">عندما تقوم بطلب منتجات ستظهر جميع تفاصيلها هنا.</p>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order) => {
              const statusInfo = getStatusBadge(order.status);
              const paymentStatusInfo = getPaymentStatusBadge(order.paymentStatus);
              const PaymentMethodIcon = getPaymentMethodLabel(order.paymentMethod).icon;
              const StatusIcon = statusInfo.icon;
              const isExpanded = expandedOrderId === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-zinc-800/80 border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md"
                >
                  {/* Order Main Header */}
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className="p-4 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          #{String(order.id).slice(-8)}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                          <StatusIcon className="text-sm" />
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        تم الطلب بتاريخ: {order.createdAt ? new Date(order.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "غير محدد"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 dark:border-zinc-700/50">
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">المبلغ الإجمالي</span>
                        <span className="text-base font-extrabold text-gray-900 dark:text-white">
                          ${(order.totalAmount || 0).toFixed(2)}
                        </span>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-2 rounded-full bg-gray-50 dark:bg-zinc-700/50 text-gray-500 dark:text-gray-300"
                      >
                        <IoChevronDownOutline className="text-lg" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Order Details Collapsible Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-gray-100 dark:border-zinc-700/60 bg-gray-50/50 dark:bg-zinc-900/40 p-4 sm:p-6"
                      >
                        {/* Summary Bar */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 p-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/40 text-xs">
                          <div className="flex items-center gap-2">
                            <PaymentMethodIcon className="text-base text-gray-400" />
                            <div>
                              <span className="text-gray-400 block">طريقة الدفع:</span>
                              <span className="font-semibold">{getPaymentMethodLabel(order.paymentMethod).label}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md font-semibold ${paymentStatusInfo.color}`}>
                              {paymentStatusInfo.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <IoLocationOutline className="text-base text-rose-500" />
                            <div>
                              <span className="text-gray-400 block">العنوان والإحداثيات:</span>
                              <span className="font-medium block">{order.City}, {order.Country}</span>
                              {(order.dropoffLatitude !== 0 || order.dropoffLongitude !== 0) && (
                                <span className="font-mono text-[11px] text-gray-400">
                                  {order.dropoffLatitude?.toFixed(4)}, {order.dropoffLongitude?.toFixed(4)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Customer Info Section */}
                        <div className="mb-6 p-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/40 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="flex items-center gap-2">
                            <IoPersonOutline className="text-base text-indigo-500" />
                            <div>
                              <span className="text-gray-400 block">اسم العميل:</span>
                              <span className="font-semibold">{order.fullName}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <IoCallOutline className="text-base text-emerald-500" />
                            <div>
                              <span className="text-gray-400 block">رقم الهاتف:</span>
                              <span className="font-semibold font-mono">{order.phone}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <IoHomeOutline className="text-base text-amber-500" />
                            <div>
                              <span className="text-gray-400 block">تفاصيل العنوان / ملاحظات:</span>
                              <span className="font-medium">{order.building || order.Notes || "لا توجد تفاصيل إضافية"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Order Items Table */}
                        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          المنتجات المطلوبة ({order.items?.length || 0})
                        </h4>

                        <div className="space-y-2">
                          {order.items?.map((item: any, idx: number) => {
                            const name = item.ProductName || item.productName || "منتج بدون اسم";
                            const unitPrice = item.unitPrice || 0;
                            const quantity = item.quantity || 1;
                            const lineTotal = item.lineTotal ?? (unitPrice * quantity);
                            
                            // التعامل مع اللون سوء كان مصفوفة أم نص
                            const colorsArray = Array.isArray(item.Colors) 
                              ? item.Colors 
                              : item.color ? [item.color] : [];

                            return (
                              <div
                                key={item.id || idx}
                                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/30 text-xs sm:text-sm"
                              >
                                <div className="space-y-1">
                                  <h5 className="font-semibold text-gray-900 dark:text-white">
                                    {name}
                                  </h5>
                                  {colorsArray.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-gray-400 text-[11px]">اللون:</span>
                                      {colorsArray.map((colorVal: string, cIdx: number) => (
                                        <span
                                          key={cIdx}
                                          className="px-1.5 py-0.5 text-[10px] rounded border border-gray-200 dark:border-zinc-700 font-mono"
                                        >
                                          {colorVal}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-4 text-right">
                                  <div>
                                    <span className="text-gray-400 text-xs block">${unitPrice} × {quantity}</span>
                                    <span className="font-bold text-gray-900 dark:text-white">
                                      ${lineTotal.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}