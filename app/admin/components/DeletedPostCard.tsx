"use client";

import Image from "next/image";

import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Icon } from "@/components/primitives/Icon";
import { usePostsStore, type Post } from "@/lib/store/usePostsStore";
import { formatDate } from "@/lib/utils";

type DeletedPostCardProps = {
  post: Post;
};

export const DeletedPostCard: React.FC<DeletedPostCardProps> = ({ post }) => {
  const restorePost = usePostsStore((state) => state.restorePost);
  const deletePermanently = usePostsStore((state) => state.deletePermanently);

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-[22px] border border-bluewhale/12 bg-white shadow-m">
      <div className="relative h-32">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          sizes="(min-width: 1280px) 320px, (min-width: 768px) 40vw, 100vw"
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-bluewhale/30 mix-blend-multiply" />
        <div className="absolute bottom-4 left-4 rounded-[var(--radius-pill)] bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-bluewhale">
          Archived {formatDate(post.publishedAt)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-bluewhale">{post.title}</h3>
          <p className="text-sm leading-relaxed text-bluewhale/70">{post.excerpt}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => restorePost(post.id)}
          >
            Restore
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-100/40 hover:text-red-700"
            onClick={() => deletePermanently(post.id)}
          >
            <Icon name="trash" size={18} />
            Delete permanently
          </Button>
        </div>
      </div>
    </Card>
  );
};

