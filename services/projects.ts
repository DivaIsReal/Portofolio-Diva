// import { createClient } from "@/common/utils/server"; // DISABLED

export const getProjectsData = async () => {
  return []; // DISABLED: Supabase - uncomment below to re-enable

  // const supabase = createClient();
  // let { data, error } = await supabase.from("projects").select();
  // if (error) throw new Error(error.message);
  // if (!data) return [];
  // return data.map((item) => {
  //   const { data: imageData } = supabase.storage
  //     .from("projects")
  //     .getPublicUrl(`${item.slug}.webp`);
  //   return { ...item, image: imageData.publicUrl };
  // });
};

export const getProjectsDataBySlug = async (slug: string) => {
  return null; // DISABLED: Supabase - uncomment below to re-enable

  // const supabase = createClient();
  // let { data, error } = await supabase
  //   .from("projects")
  //   .select()
  //   .eq("slug", slug)
  //   .single();
  // if (error) throw new Error(error.message);
  // if (!data) return null;
  // const { data: imageData } = supabase.storage
  //   .from("projects")
  //   .getPublicUrl(`${data.slug}.webp`);
  // return { ...data, image: imageData.publicUrl };
};
