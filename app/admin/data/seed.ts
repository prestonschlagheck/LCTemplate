import news from "@/content/news.json";

export type SeedPost = {
  id: string;
  title: string;
  author: string;
  preview: string;
  tags: string[];
  pinned: boolean;
  status: "published" | "draft";
  date: string;
  thumbnail: string;
  readingTime: string;
};

export const seedPosts: SeedPost[] = news.map((item) => ({
  id: item.id,
  title: item.title,
  author: item.author,
  preview: item.preview,
  tags: item.tags,
  pinned: Boolean(item.pinned),
  status: (item.status ?? "draft") as SeedPost["status"],
  date: item.date,
  thumbnail: item.thumbnail,
  readingTime: item.readingTime,
}));

export const seedDeleted: SeedPost[] = [];

/**
 * TODO(supabase): Replace this seed with Supabase initial migrations.
 */

