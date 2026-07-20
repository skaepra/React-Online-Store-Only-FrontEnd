import { useGg } from "../../../context/gg";
import products from "../../../data/products";

// 1. تعريف نوع المنتج القادم من قاعدة البيانات الداخليّة
interface DatabaseProduct {
  id: string | number;
  Name: string;
  Price: number;
  ImageAlt?: string;
}

// 2. تعريف الـ Interface الخاص بالـ Props المعطاة للمكون من السلة
interface ItemProps {
  id: string | number;
  quantity: number;
  color: string;
  image: string|number; // رابط الصورة الممرر لعنصر السلة
}

export function CartItem({ id, quantity, color, image }: ItemProps) {
  const { increc, decrec, increcTotal, decrecTotal, remove } = useGg();
  
  // البحث عن المنتج مع التأكد من مطابقة نوع المعرّف واستخدام الكاستينج لقائمة المنتجات
  const item = (products as DatabaseProduct[]).find(
    (i) => Number(i.id) === Number(id)
  );

  // حماية في حال لم يعثر على المنتج في المصفوفة لتجنب انهيار التطبيق
  if (!item) return null; 

  const total: number = item.Price * quantity;

  // 3. تحديد أنواع المعاملات للدوال الداخلية صراحةً
  const plass = (itemId: string | number, itemColor: string, price: number) => {
    increc(itemId, itemColor);
    increcTotal(price);
  };

  const mines = (itemId: string | number, itemColor: string, price: number) => {
    decrec(itemId, itemColor);
    if (quantity > 1) decrecTotal(price);
  };

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md xs:flex xs:justify-start">
      <img 
        src={typeof image === 'number' ? String(image) : image}
        alt={item.ImageAlt || item.Name} 
        className="w-full aspect-[4/3] overflow-hidden rounded-lg max-h-44 lg:max-h-32 lg:w-[250px] object-fill"
      />
      <div className="xs:ml-4 xs:flex xs:w-full xs:justify-between">
        <div className="mt-5 xs:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{item.Name} {color}</h2>
          <p className="mt-1 text-xs text-gray-700">${item.Price}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span 
              onClick={() => mines(id, color, item.Price)}
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            > - </span>
            <span className="cursor-pointer bg-gray-100 py-1 px-3.5 duration-100"> 
              {quantity} 
            </span>
            <span  
              onClick={() => plass(id, color, item.Price)}
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            > + </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">${total}</p>
            <svg   
              onClick={() => remove(id, total, quantity, color)}
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}