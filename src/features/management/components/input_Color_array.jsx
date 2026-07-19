import { Controller } from "react-hook-form";
import { Color_Selection } from "../colorselection";

export const Input_Color_array = ({ control, fields, append, remove, errors }) => {
  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center">

          {/* اختيار اللون */}
          <Controller
            control={control}
            name={`Colors.${index}`}
            render={({ field }) => (
              <Color_Selection
                color={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />

          {/* زر حذف اللون */}
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            حذف
          </button>

          {/* عرض الخطأ إن وجد */}
          {errors.Colors?.[index] && (
            <span className="text-red-500 text-sm">
              {errors.Colors[index]?.message}
            </span>
          )}
        </div>
      ))}

      {/* زر إضافة لون جديد */}
      <button
        type="button"
        onClick={() => append("#000000")}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        + إضافة لون
      </button>
    </div>
  );
};

{/*طريقة الاستخدام*/}
  // <Input_Color_array
  //       control={control}
  //       fields={fields}
  //       remove={remove}
  //       append={append}
  //       errors={errors}
  //     />