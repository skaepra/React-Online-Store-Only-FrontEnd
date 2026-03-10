
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";


export default function CardSkeleton() {
  return (
<div className="flex">
    <div className="w-[300px] p-4 border-stone-300  border-[1px] m-2 rounded-lg">
      {/* صورة */}
      <Skeleton variant="rectangular" width="100%" height={150} />

      {/* نصوص */}
      <Stack spacing={1} mt={2}>
        <Skeleton variant="text" width="80%" height={25} />
        <Skeleton variant="text" width="60%" height={25} />
        <Skeleton variant="text" width="90%" height={25} />
      </Stack>

      {/* زر */}
      <Skeleton
        variant="rectangular"
        width="50%"
        height={40}
        sx={{ mt: 2, borderRadius: 1 }}
      />
      <Skeleton variant="circular" width={20} height={20}  />
      </div>

       <div className="w-[260px] h-[290px] p-2 border-stone-300 border-[1px] m-2 rounded-lg">
      {/* صورة */}
      <Skeleton variant="rectangular" width="100%" height={150} />

      {/* نصوص */}
      <Stack spacing={1} mt={1}>
        <Skeleton variant="text" width="80%" height={35} />
      </Stack>
      <div className="mt-3 flex space-x-3">
      <Skeleton variant="circular" width={20} height={20}  />
      <Skeleton variant="circular" width={20} height={20}  />
     </div>

      {/* زر */}
      <Skeleton
        variant="rectangular"
        width="50%"
        height={40}
        sx={{ mt: 2, borderRadius: 1 }}
      />
      
      </div>
     
      </div>
  );
}