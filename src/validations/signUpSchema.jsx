import { z } from "zod"; 

export const SignUpSchema = z.object({
      Name:z.string().min(1,{message:"Name is requaeid "}),

      Email:z.string().min(1,{message:"Email address is requaeid "}).email(),

      Password:z.string().min(8,{message:"Password must At least 8 characters "}).regex(/.*[!@#$%^&*()_+{}|[\]\\:";'~`<>?,./].*/,{message:"Must contain a special character"}),

      confirmPassword:z.string().min(1,{message:"confirmPassword is requaeid "}).refine(
        (input)=> input.Password ===input.confirmPassword ,{message:"Incorrect confirm Password ",
          path:["confirmPassword"]
        }),
    })

