"use client";

import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
}) => {
  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="border border-white/8 bg-white/98 p-8 shadow-xl backdrop-blur-md">
        <div className="flex flex-col gap-6">
          {(title || description) && (
            <DialogHeader className="space-y-3">
              {title && <DialogTitle className="text-[1.75rem] text-bluewhale">{title}</DialogTitle>}
              {description && (
                <DialogDescription className="text-base leading-relaxed text-bluewhale/70">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}
          <div className="flex flex-col gap-5">{children}</div>
          {footer && <div className="flex items-center justify-between gap-3">{footer}</div>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ModalClose = DialogClose;

export const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("mt-2 flex items-center justify-end gap-3", className)} {...props} />;

