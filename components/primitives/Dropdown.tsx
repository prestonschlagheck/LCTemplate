"use client";

import * as React from "react";
import { CaretDown } from "@phosphor-icons/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/primitives/Button";

export type DropdownItem = {
  id: string;
  label: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
};

type DropdownProps = {
  triggerLabel: string;
  items: DropdownItem[];
  description?: string;
  align?: "start" | "end" | "center";
};

export const Dropdown: React.FC<DropdownProps> = ({
  triggerLabel,
  items,
  description,
  align = "end",
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="primary"
          size="md"
          className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-5 shadow-m [&>svg]:transition-transform [&>svg]:duration-150 data-[state=open]:[&>svg]:rotate-180"
        >
          <span>{triggerLabel}</span>
          <CaretDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className="w-[20rem] rounded-[var(--radius-lg)] border border-bluewhale/12 bg-white/98 backdrop-blur-xl"
        sideOffset={12}
      >
        {description && (
          <DropdownMenuLabel className="pb-3 text-xs font-medium uppercase tracking-[0.14em] text-bluewhale/60">
            {description}
          </DropdownMenuLabel>
        )}
        {description && <DropdownMenuSeparator />}
        <div className="flex flex-col gap-1.5">
          {items.map((item) => {
            const content = (
              <div className="flex w-full items-start gap-3 rounded-lg p-2 transition duration-150 hover:bg-bluewhale/6">
                {item.icon && <span className="mt-1 text-lagoon">{item.icon}</span>}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-bluewhale">{item.label}</span>
                  {item.description && (
                    <span className="text-xs leading-relaxed text-bluewhale/70">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
            );

            return item.href ? (
              <DropdownMenuItem key={item.id} asChild>
                <a href={item.href} className="no-underline">
                  {content}
                </a>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem key={item.id} className="cursor-default">
                {content}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

