"use client";

import * as React from "react";

import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Modal, ModalFooter, ModalClose } from "@/components/primitives/Modal";
import { Icon } from "@/components/primitives/Icon";
import { LoginModal } from "./components/LoginModal";
import { PostCard } from "./components/PostCard";
import { DeletedPostCard } from "./components/DeletedPostCard";
import { Toolbar } from "./components/Toolbar";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { usePostsStore } from "@/lib/store/usePostsStore";

const AdminDashboard: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  // Removed tab switch; show both sections
  const [editingPostId, setEditingPostId] = React.useState<string | null>(null);

  const posts = usePostsStore((state) => state.posts);
  const deletedPosts = usePostsStore((state) => state.deletedPosts);
  const updatePost = usePostsStore((state) => state.updatePost);
  const createPost = usePostsStore((state) => state.createPost);

  const sortedPosts = React.useMemo(
    () => [...posts].sort((a, b) => a.order - b.order),
    [posts],
  );

  const handleCreatePost = () => {
    const created = createPost({
      title: "New Program Spotlight",
      excerpt: "Outline the value proposition and key impact metrics.",
      tags: ["Draft", "Spotlight"],
    });
    setEditingPostId(created.id);
  };

  const editingPost = sortedPosts.find((post) => post.id === editingPostId) ?? null;

  const handleSaveEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingPostId) return;
    const formData = new FormData(event.currentTarget);
    updatePost(editingPostId, {
      title: String(formData.get("title") ?? "Untitled Draft"),
      excerpt: String(formData.get("excerpt") ?? ""),
      author: String(formData.get("author") ?? "Editorial Team"),
      content: String(formData.get("content") ?? ""),
      links: String(formData.get("links") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      tags: String(formData.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
    setEditingPostId(null);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="space-y-3 text-center">
          <h1 className="text-[2.75rem] font-semibold tracking-[-0.02em] text-bluewhale">
            Content Operations Dashboard
          </h1>
        </div>

        {!isAuthenticated ? (
          <Card className="flex flex-col gap-6 rounded-[28px] border border-bluewhale/12 bg-white p-8 shadow-xl">
            <div className="space-y-3">
              <h2 className="text-[1.75rem] font-semibold text-bluewhale">
                Sign in to access moderation tools.
              </h2>
              <p className="text-sm leading-relaxed text-bluewhale/70">
                Use the consortium-provided credentials to review drafts, publish updates, and coordinate communications. This environment is staged for demonstration purposes only.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" onClick={() => setIsLoginModalOpen(true)}>
                Launch login
              </Button>
              <Badge tone="neutral" className="bg-white text-bluewhale/70">
                Email: admin@example.com
              </Badge>
              <Badge tone="neutral" className="bg-white text-bluewhale/70">
                Password: changeme
              </Badge>
            </div>
          </Card>
        ) : (
          <>
            <Toolbar
              onCreatePost={handleCreatePost}
              onViewSite={() => window.open("/", "_blank", "noopener")}
              onLogout={() => {
                logout();
              }}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-bluewhale">All Posts ({sortedPosts.length})</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {sortedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onEdit={(selected) => setEditingPostId(selected.id)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-bluewhale">Deleted Posts ({deletedPosts.length})</h2>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {deletedPosts.length === 0 ? (
                  <Card className="col-span-full flex flex-col items-center justify-center gap-4 rounded-[24px] border border-bluewhale/10 bg-white p-10 text-center text-bluewhale/60">
                    <Icon name="sparkle" size={28} />
                    <p>No deleted posts yet. Content you archive will appear here for recovery.</p>
                  </Card>
                ) : (
                  deletedPosts.map((post) => <DeletedPostCard key={post.id} post={post} />)
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />

      <Modal
        open={editingPost != null}
        onOpenChange={(next) => {
          if (!next) setEditingPostId(null);
        }}
        title={editingPost ? `Edit ${editingPost.title}` : "Edit post"}
      >
        {editingPost && (
          <form className="flex flex-col gap-4" onSubmit={handleSaveEdit}>
            <label className="flex flex-col gap-2 text-sm font-medium text-bluewhale">
              Title
              <input
                name="title"
                defaultValue={editingPost.title}
                className="rounded-[var(--radius-md)] border border-bluewhale/20 bg-white px-4 py-3 text-base text-bluewhale shadow-s focus:border-persian/60 focus:ring-2 focus:ring-persian/40"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-bluewhale">
              Summary
              <textarea
                name="excerpt"
                defaultValue={editingPost.excerpt}
                rows={4}
                className="resize-none rounded-[var(--radius-md)] border border-bluewhale/20 bg-white px-4 py-3 text-base text-bluewhale shadow-s focus:border-persian/60 focus:ring-2 focus:ring-persian/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-bluewhale">
              Body
              <textarea
                name="content"
                defaultValue={editingPost.content ?? ""}
                rows={10}
                className="rounded-[var(--radius-md)] border border-bluewhale/20 bg-white px-4 py-3 text-base text-bluewhale shadow-s focus:border-persian/60 focus:ring-2 focus:ring-persian/40"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-bluewhale">
                Author
                <input
                  name="author"
                  defaultValue={editingPost.author}
                  className="rounded-[var(--radius-md)] border border-bluewhale/20 bg-white px-4 py-3 text-base text-bluewhale shadow-s focus:border-persian/60 focus:ring-2 focus:ring-persian/40"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-bluewhale">
                Tags
                <input
                  name="tags"
                  defaultValue={editingPost.tags.join(", ")}
                  className="rounded-[var(--radius-md)] border border-bluewhale/20 bg-white px-4 py-3 text-base text-bluewhale shadow-s focus:border-persian/60 focus:ring-2 focus:ring-persian/40"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-bluewhale">
                Links (comma separated)
                <input
                  name="links"
                  defaultValue={(editingPost.links ?? []).join(", ")}
                  className="rounded-[var(--radius-md)] border border-bluewhale/20 bg-white px-4 py-3 text-base text-bluewhale shadow-s focus:border-persian/60 focus:ring-2 focus:ring-persian/40"
                />
              </label>
            </div>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary" size="sm" type="button">
                  Cancel
                </Button>
              </ModalClose>
              <Button size="sm" type="submit">
                Save changes
              </Button>
            </ModalFooter>
          </form>
        )}
      </Modal>

      {/* TODO(supabase): Wire post mutations to Supabase once endpoints are available. */}
    </>
  );
};

export default AdminDashboard;

