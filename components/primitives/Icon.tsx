"use client";

import * as React from "react";
import type { IconProps as PhosphorIconProps } from "@phosphor-icons/react";
import {
  ArrowRight,
  ArrowSquareOut,
  Calendar,
  CalendarCheck,
  CaretDown,
  CaretUp,
  CaretRight,
  ChartBar,
  ChartLineUp,
  ChartPieSlice,
  Certificate,
  Clock,
  DownloadSimple,
  Folders,
  GlobeHemisphereEast,
  Handshake,
  Infinity,
  MapTrifold,
  NewspaperClipping,
  Play,
  Plus,
  PushPin,
  Trash,
  ShieldCheck,
  Sparkle,
  TrendUp,
  UsersThree,
} from "@phosphor-icons/react";

const ICON_MAP = {
  arrowRight: ArrowRight,
  arrowSquareOut: ArrowSquareOut,
  calendar: Calendar,
  calendarCheck: CalendarCheck,
  caretDown: CaretDown,
  caretUp: CaretUp,
  caretRight: CaretRight,
  certificate: Certificate,
  chartBar: ChartBar,
  chartLineUp: ChartLineUp,
  chartPieSlice: ChartPieSlice,
  clock: Clock,
  downloadSimple: DownloadSimple,
  folders: Folders,
  globe: GlobeHemisphereEast,
  handshake: Handshake,
  infinity: Infinity,
  map: MapTrifold,
  news: NewspaperClipping,
  play: Play,
  plus: Plus,
  pushPin: PushPin,
  trash: Trash,
  shieldCheck: ShieldCheck,
  sparkle: Sparkle,
  trendUp: TrendUp,
  usersThree: UsersThree,
} as const;

export type IconName = keyof typeof ICON_MAP;

export type IconProps = {
  name: IconName;
  size?: number;
  weight?: PhosphorIconProps["weight"];
  className?: string;
  "aria-label"?: string;
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  weight = "regular",
  className,
  "aria-label": ariaLabel,
}) => {
  const Component = ICON_MAP[name];

  if (!Component) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Icon '${name}' not found in ICON_MAP.`);
    }
    return null;
  }

  const ariaProps = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": true };

  return <Component size={size} weight={weight} className={className} {...ariaProps} />;
};

