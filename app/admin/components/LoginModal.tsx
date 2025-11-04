"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/primitives/Button";
import { Modal, ModalFooter, ModalClose } from "@/components/primitives/Modal";
import { useAuthStore, getAuthCredentials } from "@/lib/store/useAuthStore";

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const LoginModal: React.FC<LoginModalProps> = ({ open, onOpenChange }) => {
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const router = useRouter();

  const [email, setEmail] = React.useState("admin@example.com");
  const [password, setPassword] = React.useState("changeme");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      const credentials = getAuthCredentials();
      setEmail(credentials.email);
      setPassword(credentials.password);
      setIsSubmitting(false);
    }
  }, [open]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const success = login(email, password);
    if (success) {
      onOpenChange(false);
      // Navigate to the admin dashboard after successful login
      router.push("/admin");
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Administrator Login"
      description="Use the provided credentials to explore the content management experience."
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-bluewhale">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[var(--radius-md)] border border-bluewhale/20 bg-white px-4 py-3 text-base text-bluewhale shadow-s outline-none transition focus:border-persian/60 focus:ring-2 focus:ring-persian/40"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-bluewhale">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-[var(--radius-md)] border border-bluewhale/20 bg-white px-4 py-3 text-base text-bluewhale shadow-s outline-none transition focus:border-persian/60 focus:ring-2 focus:ring-persian/40"
            required
          />
        </label>
        {error && (
          <p className="rounded-[var(--radius-sm)] bg-persian/10 px-4 py-2 text-sm text-persian">
            {error}
          </p>
        )}
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary" type="button" size="sm">
              Cancel
            </Button>
          </ModalClose>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Verifying…" : "Login"}
          </Button>
        </ModalFooter>
      </form>
      {/* TODO(supabase): Replace with Supabase Auth client when backend is connected. */}
    </Modal>
  );
};

