
import { Skeleton, Stack } from "@mui/material"


export const CardSkelaton = () => {
  return (
    <>
           <div className="w-[260px] h-[244px]  border-stone-300 dark:border-stone-900 border-[1px]  rounded-lg">
      {/* صورة */}
      <Skeleton variant="rectangular" width="100%" height={150} sx={{borderRadius: 1 }} />

      {/* نصوص */}
      <Stack spacing={1} mt={0.5} ml={1}>
        <Skeleton variant="text" width="60%" height={35} />
      </Stack>

      <div className="mt-2 flex  ml-2 items-center">      
       <Skeleton
        variant="rectangular"     
        sx={{ borderRadius: 1 ,width:23,height:23 }}
      />
       <Skeleton
        variant="rectangular"     
        sx={{ borderRadius: 1 ,width:23,height:23,ml:2}}
      />      
         {/* زر */}
      <Skeleton
        variant="rectangular"  
           
        sx={{ borderRadius: 1 ,width:70,height:30,ml:13}}
      />
     </div>
     </div>
    </>
  )
}
