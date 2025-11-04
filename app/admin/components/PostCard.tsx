"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Icon } from "@/components/primitives/Icon";
import { usePostsStore, type Post } from "@/lib/store/usePostsStore";
import { formatDate } from "@/lib/utils";

type PostCardProps = {
  post: Post;
  onEdit: (post: Post) => void;
};

export const PostCard: React.FC<PostCardProps> = ({ post, onEdit }) => {
  const publishPost = usePostsStore((state) => state.publishPost);
  const unpublishPost = usePostsStore((state) => state.unpublishPost);
  const togglePin = usePostsStore((state) => state.togglePin);
  const duplicatePost = usePostsStore((state) => state.duplicatePost);
  const deletePost = usePostsStore((state) => state.deletePost);
  const movePost = usePostsStore((state) => state.movePost);

  const isPublished = post.status === "published";

  return (
    <motion.div layout className="h-full">
    <Card
      className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-bluewhale/12 bg-white shadow-m"
      onClick={() => onEdit(post)}
    >
      {/* Control bar above image */}
      <div className="flex items-center justify-between border-b border-bluewhale/12 bg-white/90 px-4 py-2">
        {post.pinned ? (
          <span className="rounded-[var(--radius-pill)] bg-[#ef4444]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#b91c1c]">
            Pinned
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="h-7 px-2 text-xs"
              aria-label="Move post left"
              onClick={(e) => {
                e.stopPropagation();
                movePost(post.id, "up");
              }}
            >
              <Icon name="caretRight" size={16} className="rotate-180" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="h-7 px-2 text-xs"
              aria-label="Move post right"
              onClick={(e) => {
                e.stopPropagation();
                movePost(post.id, "down");
              }}
            >
              <Icon name="caretRight" size={16} />
            </Button>
          </div>
        )}
      </div>

      <div className="relative h-40">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          sizes="(min-width: 1280px) 340px, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bluewhale/40 via-transparent to-transparent" />
        <div className="absolute left-5 right-5 top-4 flex items-start justify-between">
          <Badge tone="neutral" className="bg-white/80 text-bluewhale">
            {formatDate(post.publishedAt)}
          </Badge>
          <Badge tone={isPublished ? "accent" : "neutral"} className={isPublished ? "bg-lagoon/20 text-lagoon" : "bg-white text-bluewhale"}>
            {isPublished ? "Published" : "Draft"}
          </Badge>
        </div>
        {/* Pinned banner moved to top control bar; arrows live there when not pinned */}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-bluewhale">{post.title}</h3>
          <p className="text-sm leading-relaxed text-bluewhale/70">{post.excerpt}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral" className="bg-white text-bluewhale/80">
            {post.author}
          </Badge>
          {post.tags?.map((tag) => (
            <Badge key={tag} tone="accent" className="bg-persian/12 text-persian">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="mt-auto -mx-6 border-t border-bluewhale/12">
          <div className="grid grid-cols-5 divide-x divide-bluewhale/12">
            <Button variant="ghost" size="sm" className="rounded-none first:rounded-bl-[24px] last:rounded-br-[24px] h-12 w-full justify-center"
              onClick={(e) => { e.stopPropagation(); onEdit(post); }}>Edit</Button>
            <Button variant="ghost" size="sm" className="rounded-none first:rounded-bl-[24px] last:rounded-br-[24px] h-12 w-full justify-center"
              onClick={(e) => { e.stopPropagation(); (isPublished ? unpublishPost(post.id) : publishPost(post.id)); }}>{isPublished ? "Unpublish" : "Publish"}</Button>
            <Button variant="ghost" size="sm" className="rounded-none first:rounded-bl-[24px] last:rounded-br-[24px] h-12 w-full justify-center"
              onClick={(e) => { e.stopPropagation(); togglePin(post.id); }}>{post.pinned ? "Unpin" : "Pin"}</Button>
            <Button variant="ghost" size="sm" className="rounded-none first:rounded-bl-[24px] last:rounded-br-[24px] h-12 w-full justify-center"
              onClick={(e) => { e.stopPropagation(); duplicatePost(post.id); }}>Duplicate</Button>
            <Button variant="ghost" size="sm" className="rounded-none first:rounded-bl-[24px] last:rounded-br-[24px] h-12 w-full justify-center"
              onClick={(e) => { e.stopPropagation(); deletePost(post.id); }}>Delete</Button>
          </div>
        </div>
      </div>
    </Card>
    </motion.div>
  );
};

