import { createClient } from "@/lib/supabase/server";


export async function hasCourseAccess(
  courseSlug:string
){

 const supabase =
   await createClient();



 const {
   data:{
     user
   }
 } =
 await supabase.auth.getUser();



 if(!user){
   return false;
 }



 const {
   data
 } =
 await supabase
 .from("enrollments")
 .select("*")
 .eq(
   "user_id",
   user.id
 )
 .eq(
   "course_slug",
   courseSlug
 )
 .eq(
   "status",
   "active"
 )
 .single();



 return !!data;

}