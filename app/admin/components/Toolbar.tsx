"use client";

import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import { useAuthStore } from "@/lib/store/useAuthStore";

type ToolbarProps = {
  onCreatePost: () => void;
  onViewSite: () => void;
  onLogout: () => void;
};

export const Toolbar: React.FC<ToolbarProps> = ({
  onCreatePost,
  onViewSite,
  onLogout,
}) => {
  const email = useAuthStore((s) => s.email);
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-bluewhale/12 bg-white/90 p-4 shadow-xl backdrop-blur-md lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" onClick={onCreatePost}>
          <Icon name="plus" size={18} />
          Create post
        </Button>
        <Button variant="secondary" size="sm" onClick={onViewSite}>
          View site
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {email && (
          <span className="text-sm font-medium text-bluewhale/70">{email}</span>
        )}
        <Button
          variant="secondary"
          size="sm"
          className="bg-[#dc2626] text-white hover:bg-[#b91c1c] border-transparent"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

