

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Add_productSchema } from "../../validations/Add_productSchema";
import { Button } from "@mui/material";
import { LocalMallSharp, MonetizationOn} from "@mui/icons-material"; 
import { ProductLists } from "../products/components/prodect_list";
import { Input_TextField } from "../../components/mui-components/input_TextField";
import { Input_TextField_Price } from "../../components/mui-components/input_TextField_Price";

import { Color_Selection } from "../../components/colorselection";





export const Add_item = () => {
  const { register, handleSubmit,reset, control, formState: { errors }, watch } = useForm({
    resolver: zodResolver(Add_productSchema),
    defaultValues: {
      Name: "",
      ImageAlt:"",
      Description:"",
      Quantity:"",
       Variants: [ { color: "#000000", image: null } ]
    }
  });

 const { fields: variantFields, append: appendVariant, remove: removeVariantField  } = useFieldArray({
  control,
  name: "Variants"
});

const watchedVariants = watch("Variants"); // كل الصور الحالية

const addVariant = () => {
  const lastIndex = variantFields.length - 1;

  // شرط: لا تضيف صف جديد إلا إذا الصورة الأخيرة موجودة
  if (lastIndex < 0 || watchedVariants[lastIndex]?.image) {
    appendVariant({ color: "#000000", image: null });
  }
};


const removeVariant = (index) => {
  removeVariantField(index); // ✅ هذا يحذف اللون + الصورة معًا
};

  // لمعاينة الصور


const onSubmit = async (data) => {
  // تحقق: هل هناك أي صورة فارغة؟
  const emptyImageIndex = data.Variants.findIndex(v => !v.image);
  if (emptyImageIndex !== -1) {
    alert(`يرجى تعبئة الصورة في الصف رقم ${emptyImageIndex + 1}`);
    return; // إيقاف عملية الإرسال
  }

  try {
    const convertToBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

    const colors = data.Variants.map(v => v.color);
    const images = await Promise.all(
      data.Variants.map(async (v) => v.image ? await convertToBase64(v.image) : null)
    );

    const payload = {
      Name: data.Name,
      Price: data.Price,
      ImageAlt: data.ImageAlt,
      Description: data.Description,
      Quantity: data.Quantity,
      Colors: colors,
      Images: images
    };

    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("Saved:", result);
    reset();
  } catch (error) {
    console.error(error);
    alert("حدث خطأ أثناء الإرسال");
  }
};



  return (
    <>
     <div className="h-screen bg-white  dark:bg-zinc-800 mb-56 ">
     <div className="h-auto bg-white dark:bg-zinc-800  pb-4">
       <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg w-[720px]  mt-24 h-auto border  p-6 pb-7 shadow-md mb-9 space-y-6 ">
          <h1 className=" m-1 font-bold text-2xl">Add a new item</h1>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex justify-between mx-2 ">
      <Input_TextField
        register={register}
        name="Name"
        errors={errors}
        icon={<LocalMallSharp />}
        Width={310}
      />
      <Input_TextField_Price
        register={register} 
        name="Price"         
        errors={errors}  
        icon={<MonetizationOn />}
         Width={310} 
        />         
      </div>
      <div className="flex space-x-[78px] ml-2">
       <Input_TextField       
        register={register}
        name="Description"
        errors={errors}
        icon={<LocalMallSharp />}
        Width={652}
      />
      </div>
      <div className="flex justify-between mx-2 ">
            <Input_TextField
        register={register}
        name="ImageAlt"
        errors={errors}
        icon={<LocalMallSharp />}
        Width={310}
        />
           <Input_TextField
        register={register}
        name="Quantity"
        errors={errors}
        icon={<LocalMallSharp />}
        Width={310}
      />
      </div>
 <div className="space-y-4 mt-6">
  {variantFields.map((field, index) => (
    <div key={field.id} className="flex items-center gap-4">

      {/* Color Picker */}
      <Controller
        control={control}
        name={`Variants.${index}.color`}
        render={({ field }) => (
          <Color_Selection
            color={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />

      {/* Image Upload + Preview */}
      <Controller
        control={control}
        name={`Variants.${index}.image`}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files[0])}
              className="border rounded p-2"
            />
            {watchedVariants[index]?.image && (
              <img
                src={URL.createObjectURL(watchedVariants[index].image)}
                alt={`preview ${index}`}
                className="w-24 h-24 object-cover rounded"
              />
            )}
          </div>
        )}
      />

      {/* زر حذف Variant */}
      <button
        type="button"
        onClick={() => removeVariant(index)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        حذف
      </button>
    </div>
  ))}
</div>


    <div className="mx-2 mt-4 space-x-4 flex">
  
<button
  type="button"
  onClick={addVariant}
  className="bg-blue-500 text-white px-3 py-1 rounded"
>
  + Add Variant
</button>



      </div>

      <div className="flex justify-center mt-4">
      <Button type="submit" variant="contained">Submit</Button>

      </div>
    </form>
    </div>
    </div>
    </div>
    <ProductLists/>
    
    </div>
  
    </>
  );
};

//   return (
//     <>
//       <div className="h-screen bg-white  dark:bg-zinc-800 ">
//         <div className="h-auto bg-white dark:bg-zinc-800  pb-4">
//           <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
//             <div className="rounded-lg md:w-2/3  mt-24 h-auto border  bg-white p-6 pb-7 shadow-md mb-9 space-y-6">
//               <h1 className=" m-1 font-bold text-2xl">Add a new item</h1>

//               <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-10">
//                 <div>
//                   <h1 className="ml-1 mb-1">id</h1>
//                   <input
//                     type="text"
//                     name="id"
//                     onChange={onChangeHandler}
//                     value={values.id}
//                     className=" border border-[#aaaaaa] bg-white  rounded pl-2 pb-[2px] w-full min-w-[280px]  h-[30px] shadow-md "
//                   />
//                 </div>
//                 <div>
//                   <h1 className="ml-1 mb-1">name</h1>
//                   <input
//                     type="text"
//                     name="name"
//                     onChange={onChangeHandler}
//                     value={values.name}
//                     className=" border  border-[#aaaaaa] rounded pl-2 pb-[2px] w-full min-w-[280px] h-[30px] shadow-md "
//                   />
//                 </div>
//               </div>

//               <div className="lg:flex  lg:space-y-0 ">
//                 <div>
//                   {imageSrcs.map((PimageSrc, index) => (
//                     <div key={index} className=" ">
//                       <h1 className="ml-1 mb-1">ImageSrc {index + 1}</h1>
//                       <input
//                         type="file"
//                         name="PimageSrc"
//                         onChange={(e) => {
//                           handimg(index, e);
//                         }}
//                         value={PimageSrc}
//                         className=" border  border-[#aaaaaa] rounded  pb-[2px] w-full min-w-[280px] 
//                          lg:max-w-[280px]  h-[30px] shadow-md mb-4"/>
//                     </div>
//                   ))}
//                 </div>

//                 <div>
//                   {colors.map((color, index) => (
//                     <div key={index}>
//                       <div>
//                         <h1 className="lg:ml-10 mb-1">Colors {index + 1}</h1>
//                         <div className="flex space-x-[13px] lg:ml-10 mb-[18px] h-7 "> 
//                          <Color_Selection 
//                           color={color}                       
//                           onChange={(e) => handcolor(index, e)}                       
//                           />         
//                           <button className="border border-red-600 rounded p-2 h-7 flex items-center  text-red-600 hover:text-white hover:bg-red-600 ">
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className=" -mt-6">
//                 <button onClick={addimage} className="border border-green-600 p-[2px] pl-2 pr-2 rounded flex items-center text-green-600 hover:text-white hover:bg-green-600">              
//                   Add
//                 </button>
//                </div>
//               <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-10">
//                 <div>
//                   <h1 className="ml-1 mb-1">imageAlt</h1>
//                   <input
//                     type="text"
//                     name="imageAlt"
//                     onChange={onChangeHandler}
//                     value={values.imageAlt}
//                     className=" border  border-[#aaaaaa] rounded  pl-2 pb-[2px] w-full min-w-[280px] h-[30px] shadow-md "
//                   />
//                 </div>
//                 <div>
//                   <h1 className="ml-1 mb-1">price</h1>
//                   <input
//                     type="text"
//                     name="price"
//                     onChange={onChangeHandler}
//                     value={values.price}
//                     className=" border  border-[#aaaaaa] rounded  pl-2 pb-[2px] w-full min-w-[280px] h-[30px] shadow-md "
//                   />
//                 </div>
//               </div>

//               <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-10">
//                 <div>
//                   <h1 className="ml-1 mb-1">description </h1>
//                   <input
//                     type="text"
//                     name="description"
//                     onChange={onChangeHandler}
//                     value={values.description}
//                     className=" border  border-[#aaaaaa] rounded pl-2 pb-[2px]  w-full min-w-[280px] h-[30px] shadow-md "
//                   />
//                 </div>

//                 <div>
//                   <button
//                     onClick={onSubmit}
//                     className=" border  border-[#aaaaaa] rounded-full pl-2 pb-[2px]  w-full min-w-[180px] h-[30px] shadow-md lg:ml-7 lg:mt-8 mt-4  bg-[#c7c5c5] hover:bg-[#aaa8a8]"
//                   >
//                     Use this address
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
