import { Controller } from "react-hook-form";

export const Input_Image_array = ({ control, fields, append, remove, errors, watch }) => {

  const watchedImages = watch("Images"); // ✅ مهم جداً

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center">

          {/* إدخال ملف الصورة */}
          <Controller
            control={control}
            name={`Images.${index}`}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files[0])}
                className="border rounded p-2 w-[200px]"
              />
            )}
          />

          {/* عرض الصورة (Preview) */}
          <div className="flex">
            {watchedImages?.[index] && (
              <img
                src={URL.createObjectURL(watchedImages[index])}
                alt={`preview ${index}`}
                className="w-24 h-24 object-cover rounded ml-8 mr-7"
              />
            )}

            {/* زر حذف */}
            <button
              type="button"
              className="text-red-600"
              onClick={() => remove(index)}
            >
              حذف
            </button>
          </div>

          {/* عرض الأخطاء */}
          {errors.Images?.[index] && (
            <span className="text-red-500 text-sm">
              {errors.Images[index]?.message}
            </span>
          )}
        </div>
      ))}

      {/* زر إضافة صورة */}
      <button
        type="button"
        onClick={() => append(null)}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        + إضافة صورة
      </button>
    </div>
  );
};
