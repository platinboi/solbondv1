"use client";

import * as React from "react";
import { CreditCard, Sparkles, Timer, Wallet, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const GridItem: React.FC<GridItemProps> = ({ 
  area, 
  icon, 
  title, 
  description,
  className,
  ariaLabel = title
}) => {
  return (
    <li 
      className={cn(area, className)}
      role="article"
      aria-label={ariaLabel}>
      <div className="group relative h-full overflow-hidden rounded-2xl transition-all duration-300">
        {/* Glass card container */}
        <div className="glow-card relative h-full bg-white/[0.08] backdrop-blur-[12px] backdrop-saturate-[180%] transition-all duration-300 group-hover:bg-white/[0.12] rounded-2xl">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-50 rounded-2xl" />
          {/* Content */}
          <div className="relative h-full p-6 md:p-8">
            <div className="relative z-10 transition-transform duration-300 group-hover:translate-y-[-2px]">
              {icon ? (
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-[12px] backdrop-saturate-[180%] ring-1 ring-inset ring-white/[0.15]">
                  {icon}
                </div>
              ) : (
                <div className="mb-4 h-10 w-10 rounded-full bg-red-500/20" />
              )}
              <h3 className="mb-2 text-lg font-semibold text-white/95">
                {title || "Untitled Card"}
              </h3>
              {description ? (
                <p className="text-sm text-white/90 font-medium">{description}</p>
              ) : (
                <p className="text-sm text-red-400/90 font-medium">Description missing</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export const SolbondOverview: React.FC = () => {
  return React.createElement(
    "ul",
    {
      className: "grid grid-cols-1 gap-4 px-4 md:px-0 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:grid-rows-2 w-full max-w-full overflow-y-auto overscroll-none -webkit-overflow-scrolling-touch",
      role: "list",
      "aria-label": "Solbond Features Overview"
    },
    /* Main Overview Card */
    React.createElement(GridItem, {
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
      icon: React.createElement(Wallet, { className: "h-4 w-4 text-white" }),
      title: "Solbond: Privacy-First Crypto Spending",
      description: "Convert your digital assets into everyday spending power with Solbond. Our non-KYC virtual credit card supports transactions up to $40K and integrates seamlessly with Apple Pay. Built on Solana's high-speed, low-fee blockchain."
    }),

    /* Why Buy Now Card */
    React.createElement(GridItem, {
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
      icon: React.createElement(Timer, { className: "h-4 w-4 text-white" }),
      title: "Why Buy $SOLB Now",
      description: "Early participation at favorable entry points. Enhanced staking rewards at 15% APY compared to 8% post-launch. Enjoy non-KYC flexibility with up to $40K spending limit."
    }),

    /* Early Benefits Card */
    React.createElement(GridItem, {
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
      icon: React.createElement(Sparkles, { className: "h-4 w-4 text-white" }),
      title: "Limited-Time Benefits",
      description: "Earn 5% in $SOLB for each referral (first 10,000 users). Priority access to virtual card (Q2 2025) and iOS app (Q3 2025). 30% fee sharing for token holders."
    }),

    /* Virtual Card Features */
    React.createElement(GridItem, {
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
      icon: React.createElement(CreditCard, { className: "h-4 w-4 text-white" }),
      title: "Virtual Card Features",
      description: "Instant Apple Pay/Google Pay integration. 0% foreign exchange fees for first six months. Launch in Q2 2025 with seamless digital wallet connectivity."
    }),

    /* Technology & Security */
    React.createElement(GridItem, {
      area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
      icon: React.createElement(Zap, { className: "h-4 w-4 text-white" }),
      title: "Solana-Powered Security",
      description: "Sub-second transactions (<0.8s) with minimal fees (<$0.001). Non-custodial model ensures full asset control. No hidden costs or wallet lock-ins."
    })
  );
}