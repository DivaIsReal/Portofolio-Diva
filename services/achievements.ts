import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { AchievementItem } from "@/common/types/achievements";

interface GetAchievementsDataProps {
  category?: string;
  search?: string;
}

interface SanityCertificate {
  _id: string;
  name: string;
  issuer: string;
  field: string;
  status: "done" | "progress" | "planned";
  progress: number;
  year?: string;
  image?: any;
  credentialUrl?: string;
}

export const getAchievementsData = async ({
  category,
  search,
}: GetAchievementsDataProps) => {
  try {
    // Build GROQ query with filters
    let query = `*[_type == "certificates"`;
    
    const filters = [];
    if (category) {
      filters.push(`field == "${category}"`);
    }
    if (search) {
      filters.push(`name match "*${search}*"`);
    }
    
    if (filters.length > 0) {
      query += ` && (${filters.join(" && ")})`;
    }
    
    query += `] | order(status asc, year desc) {
      _id, name, issuer, field, status, progress, year, image, credentialUrl
    }`;

    const data: SanityCertificate[] = await client.fetch(query);

    // Transform Sanity data to AchievementItem format
    return data.map((item, index): AchievementItem => ({
      id: index + 1,
      name: item.name,
      issuing_organization: item.issuer,
      type: item.status === "done" ? "certificate" : "learning",
      category: item.field,
      url_credential: item.credentialUrl,
      issue_date: item.year ? `${item.year}-01-01` : new Date().toISOString().split('T')[0],
      image: item.image ? urlFor(item.image).width(800).url() : "/images/placeholder.png",
      is_show: true,
    }));
  } catch (error) {
    console.error("Error fetching achievements from Sanity:", error);
    return [];
  }
};

export const getAchivementTypes = async () => {
  try {
    const query = `*[_type == "certificates"] | order(status asc) {
      status
    }`;
    
    const data: { status: string }[] = await client.fetch(query);
    const uniqueTypes = [...new Set(data.map(item => item.status))];
    
    // Map status to type names
    return uniqueTypes.map(status => {
      if (status === "done") return "certificate";
      return "learning";
    }).filter((value, index, self) => self.indexOf(value) === index);
  } catch (error) {
    console.error("Error fetching achievement types from Sanity:", error);
    return [];
  }
};

export const getAchivementCategories = async () => {
  try {
    const query = `*[_type == "certificates"] | order(field asc) {
      field
    }`;
    
    const data: { field: string }[] = await client.fetch(query);
    const uniqueCategories = [...new Set(data.map(item => item.field))];
    
    return uniqueCategories.filter(Boolean);
  } catch (error) {
    console.error("Error fetching achievement categories from Sanity:", error);
    return [];
  }
};
