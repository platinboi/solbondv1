"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Rocket,
  Calendar,
  Smartphone,
  Globe2,
  CreditCard,
  Target,
  TrendingUp,
  BarChart3,
} from "lucide-react";

interface MilestoneProps {
  date: string;
  title: string;
  description: React.ReactNode;
  icon: React.ComponentType<any>;
  className?: string;
}

const Milestone = React.forwardRef<HTMLDivElement, MilestoneProps>(
  ({ date, title, description, icon: Icon, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl transition-all duration-300",
          className
        )}
        role="listitem"
        aria-label={`${title} - ${date}`}
      >
        {/* Glass card container */}
        <div className="glow-card relative h-full bg-white/[0.08] backdrop-blur-[12px] backdrop-saturate-[180%] transition-all duration-300 group-hover:bg-white/[0.12] rounded-2xl">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-50 rounded-2xl" />
          {/* Content */}
          <div className="relative flex gap-4 p-4 md:p-6">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-full bg-white/[0.08] backdrop-blur-[12px] flex items-center justify-center text-white/90 transition-all duration-300 group-hover:bg-white/[0.12] group-hover:scale-105 ring-1 ring-inset ring-white/[0.15] group-hover:ring-white/[0.25] group-hover:text-white">
                <Icon className="h-4 sm:h-[1.125rem] md:h-5 w-4 sm:w-[1.125rem] md:w-5" />
              </div>
              <div className="flex-1 w-px bg-gradient-to-b from-white/20 to-transparent mt-2 transition-all duration-300 group-hover:from-white/30"></div>
            </div>
            <div className="flex-1 transition-transform duration-300 group-hover:translate-y-[-2px]">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                <span className="text-white/50 text-xs sm:text-[13px] md:text-sm font-medium tracking-wide order-2 sm:order-1 uppercase">{date}</span>
                <h3 className="text-base sm:text-[17px] md:text-lg font-semibold text-white/95 order-1 sm:order-2 leading-tight group-hover:text-white transition-colors duration-300">{title}</h3>
              </div>
              <div className="text-sm sm:text-[15px] md:text-base text-white/70 font-medium leading-relaxed space-y-2 group-hover:text-white/80 transition-colors duration-300">
                {typeof description === 'string' ? (
                  <p>{description}</p>
                ) : (
                  description
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Milestone.displayName = "Milestone";

interface WhyActCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  className?: string;
}

const WhyActCard = React.forwardRef<HTMLDivElement, WhyActCardProps>(
  ({ icon: Icon, title, description, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl transition-all duration-300 h-full",
          className
        )}
        role="article"
        aria-label={title}
      >
        {/* Glass card container */}
        <div className="glow-card relative h-full bg-white/[0.08] backdrop-blur-[12px] backdrop-saturate-[180%] transition-all duration-300 group-hover:bg-white/[0.12] rounded-2xl">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-50 rounded-2xl" />
          {/* Content */}
          <div className="relative h-full p-6">
            <div className="relative z-10 transition-transform duration-300 group-hover:translate-y-[-2px]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-[12px] backdrop-saturate-[180%] ring-1 ring-inset ring-white/[0.15] group-hover:ring-white/[0.25] transition-all duration-300 group-hover:scale-105 group-hover:bg-white/[0.12]">
                <Icon className="h-4 w-4 text-white/90 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white/95 group-hover:text-white transition-colors duration-300">{title}</h3>
              <p className="text-sm md:text-base text-white/70 font-medium leading-relaxed group-hover:text-white/80 transition-colors duration-300">{description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

WhyActCard.displayName = "WhyActCard";

interface SolbondRoadmapProps {
  inDialog?: boolean;
}

export const SolbondRoadmap = React.forwardRef<HTMLDivElement, SolbondRoadmapProps>(({ inDialog = false }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full space-y-8 sm:space-y-10 text-white/80 bg-transparent",
        inDialog ? "" : "max-w-4xl mx-auto"
      )}
      role="region"
      aria-label="Solbond Vision and Roadmap"
    >
      {/* Vision Overview */}
      <section>
        <h2 className="text-lg sm:text-[20px] md:text-xl font-semibold text-white/95 mb-3 sm:mb-4">
          Our Vision
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          Solbond aims to seamlessly integrate digital assets with everyday financial transactions. 
          By leveraging Solana's exceptional speed and low fees, we are creating a robust, 
          community-driven ecosystem that empowers users to manage their funds anonymously and securely. 
          Our goal is to eliminate traditional barriers in finance—no intermediaries, no excessive 
          compliance, just straightforward, efficient payment solutions for the modern world.
        </p>
      </section>

      {/* Roadmap Overview */}
      <section>
        <h2 className="text-lg sm:text-[20px] md:text-xl font-semibold text-white/95 mb-3 sm:mb-4">
          Development Roadmap
        </h2>
        <div 
          role="list" 
          className="space-y-3 md:space-y-4"
          aria-label="Development timeline"
        >
          <Milestone
            date="Q3 2025"
            title="Virtual Launch"
            icon={Rocket}
            description={
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="block mt-2 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                  <span>Launch the virtual Solbond credit card with full Apple Pay and Google Pay integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="block mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                  <span>Open our staking platform, featuring exclusive early-adopter rewards and enabling non-KYC transactions up to $40K</span>
                </li>
              </ul>
            }
          />
          <Milestone
            date="Q3 2025"
            title="Beta iOS App Release"
            icon={Smartphone}
            description="Introduce our dedicated iOS app to deliver a tailored, on-the-go experience for managing your digital finances."
          />
          <Milestone
            date="Q4 2025"
            title="Ecosystem Expansion"
            icon={Globe2}
            description={
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="block mt-2 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                  <span>Integrate additional digital wallets and broaden merchant acceptance to enhance everyday usability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="block mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                  <span>Expand community engagement through a referral-based channel, providing members with exclusive insights and bonus rewards</span>
                </li>
              </ul>
            }
          />
          <Milestone
            date="2026"
            title="Physical Card Rollout"
            icon={CreditCard}
            description={
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="block mt-2 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                  <span>Launch the physical Solbond card, seamlessly merging digital asset management with real-world spending</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="block mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                  <span>Continue refining our staking system and reward distribution model to scale with increased network usage</span>
                </li>
              </ul>
            }
          />
        </div>
      </section>

      {/* Key Benefits */}
      <section>
        <h2 className="text-lg sm:text-[20px] md:text-xl font-semibold text-white/95 mb-3 sm:mb-4">
          Why Join Now
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <WhyActCard
            icon={Rocket}
            title="Join a Revolutionary Network"
            description="Be an early part of a pioneering ecosystem built on Solana's cutting-edge technology, designed to redefine how we handle everyday transactions."
          />
          <WhyActCard
            icon={BarChart3}
            title="Maximize Your Rewards"
            description="Early participation means securing lower entry prices and enjoying enhanced reward rates—your early support directly translates into higher proportional returns as transaction volumes grow."
          />
          <WhyActCard
            icon={Target}
            title="Transparent Growth"
            description="With a clearly defined roadmap and regular updates, you can be confident in how your investment contributes to the evolving future of crypto payments."
          />
        </div>
      </section>
    </div>
  );
});

SolbondRoadmap.displayName = "SolbondRoadmap";
