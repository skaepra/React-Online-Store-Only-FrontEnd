import { Controller } from "react-hook-form";
import { Input_Color_array } from "./input_Color_array";

export const Input_Image_Color = ({
  control,
  index,
  field,
  watchedImages,
  errors,
  colorFields,
  removeImage,
  removeColor,
  appendColor,
}) => {
  return (
    <div className="flex">
    <div className="flex gap-2 flex-col items-center" key={field.id}>
      {/* صورة */}
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

      {/* معاينة صورة */}
      <div className="flex">
      {watchedImages[index] && (
        <img
          src={URL.createObjectURL(watchedImages[index])}
          alt={`preview ${index}`}
          className="w-24 h-24 object-cover rounded ml-8 mr-7"
        />
      )}
            <button
        type="button"
        className="text-red-600 "
        onClick={() => {
          removeImage(index);
          removeColor(index);
        }}
      >
        X
      </button>
      </div>

      {/* إدخال اللون (باستخدام Input_Color_array) */}
      <Input_Color_array
        control={control}
        fields={[colorFields[index]]} // فقط اللون الموازي للصورة
        remove={() => removeColor(index)}
        append={() => appendColor("#000000")}
        errors={errors}
      />
      

      {/* خطأ صورة */}
      {errors.Images?.[index] && (
        <span className="text-red-500">{errors.Images[index]?.message}</span>
      )}
    </div>
          {/* زر حذف */}

      </div>
  );
};
