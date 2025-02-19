"use client";

import * as React from "react";
import { Coins, Lock, Network, Wallet, ChartBar, Users, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import type { LucideIcon } from 'lucide-react';

interface StakingStepProps {
  step: number;
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
  className?: string;
}

const StakingStep: React.ForwardRefExoticComponent<StakingStepProps & React.RefAttributes<HTMLDivElement>> = React.forwardRef((props, ref) => {
  const { step, title, description, icon: Icon, className } = props;

  return (
    <div 
      className={cn("relative flex gap-4 p-4 md:p-6 group", className)}
      ref={ref}
      role="listitem"
      aria-label={`Step ${step}: ${title}`}
    >
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.08] backdrop-blur-[12px] flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white/[0.12] group-hover:scale-105 ring-1 ring-inset ring-white/[0.15] group-hover:ring-white/[0.25]">
          <Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
        </div>
        <div className="flex-1 w-px bg-gradient-to-b from-white/20 to-transparent mt-2 transition-all duration-300 group-hover:from-white/30"></div>
      </div>
      <div className="flex-1 transition-all duration-300 group-hover:translate-y-[-2px]">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-2">
          <span className="text-white/50 text-xs md:text-sm font-medium order-2 md:order-1">Step {step}</span>
          <h3 className="text-base md:text-lg font-semibold text-white/95 order-1 md:order-2 leading-tight">{title}</h3>
        </div>
        <p className="text-sm text-white/70 font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  );
});

interface IncentiveCardProps {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const IncentiveCard: React.ForwardRefExoticComponent<IncentiveCardProps & React.RefAttributes<HTMLDivElement>> = React.forwardRef((props, ref) => {
  const { icon: Icon, title, description, className, ariaLabel = title } = props;


  return (
    <div 
      className={cn("group relative overflow-hidden rounded-2xl transition-all duration-300 h-full", className)}
      ref={ref}
      role="article"
      aria-label={ariaLabel}
    >
      {/* Glass card container */}
      <div className="glow-card relative h-full bg-white/[0.08] backdrop-blur-[12px] backdrop-saturate-[180%] transition-all duration-300 group-hover:bg-white/[0.12] rounded-2xl">
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-50 rounded-2xl" />
        {/* Content */}
        <div className="relative h-full p-6 md:p-8">
          <div className="relative z-10 transition-transform duration-300 group-hover:translate-y-[-2px]">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-[12px] backdrop-saturate-[180%] ring-1 ring-inset ring-white/[0.15] group-hover:ring-white/[0.25] transition-all duration-300 group-hover:scale-105">
              <Icon className="h-4 w-4 text-white" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white/95">{title}</h3>
            <p className="text-sm text-white/90 font-medium">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export const SolbondStaking: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>> = React.forwardRef((_, ref) => {
  return (
    <div 
      ref={ref}
      className="w-full max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-6 md:space-y-8"
      role="region"
      aria-label="Staking Information">

      {/* Ecosystem Overview */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">Ecosystem Overview</h2>
        <p className="text-white/70 text-base md:text-lg leading-relaxed">
          Solbond is more than a credit card—it's a complete financial ecosystem built on Solana. 
          By staking SOLB tokens, you become an active participant in a transparent, community-driven 
          network that shares rewards from everyday transactions. Leveraging Solana's speed, security, 
          and low fees, every transaction contributes directly to your returns and the growth of the platform.
        </p>
      </section>

      {/* Staking Steps */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">How the Staking System Works</h2>
        <div role="list" className="space-y-2">
          <StakingStep
            step={1}
            title="Acquire SOLB"
            description="Purchase SOLB tokens during our early-stage offering. Secure a competitive entry price as you join the network at its inception."
            icon={Coins}
          />
          <StakingStep
            step={2}
            title="Stake Your Tokens"
            description="Lock your tokens in our secure staking platform, underpinned by rigorously audited smart contracts. This step ensures your investment actively contributes to network stability and growth."
            icon={Lock}
          />
          <StakingStep
            step={3}
            title="Participate in the Ecosystem"
            description={
              <div className="space-y-2">
                <p>Your staked tokens empower the Solbond network, earning rewards through two primary channels:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>Transaction Fee Share: Receive a portion of the fees from every purchase made with Solbond.</li>
                  <li>Trading Fee Rewards: Earn additional income from $SOLB trading fees.</li>
                </ul>
              </div>
            }
            icon={Network}
          />
          <StakingStep
            step={4}
            title="Receive Regular Payouts"
            description="Enjoy periodic, transparent reward distributions as network activity increases. Our system is designed to scale alongside the growth of the ecosystem, ensuring that your returns improve with every transaction."
            icon={Wallet}
          />
        </div>
      </section>

      {/* Incentives Grid */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">Incentives to Stake Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IncentiveCard
            icon={ChartBar}
            title="Enhanced Reward Rates"
            description="Early stakers benefit from higher APY, with rates as high as 15% compared to lower yields post-launch. Secure these bonus rewards by staking your tokens now."
          />
          <IncentiveCard
            icon={Users}
            title="Exclusive Community Access"
            description="Gain entry to our dedicated community channel, where you'll receive real-time updates, insider insights, and access to referral bonuses. Engage directly with our team and fellow early adopters."
          />
          <IncentiveCard
            icon={Zap}
            title="Built for Scalability"
            description="Our staking mechanism is engineered to grow with the platform. As transaction volumes and network usage increase, so do your rewards. Benefit from a robust, secure system that leverages the expanding Solana ecosystem."
          />
        </div>
      </section>

      {/* CTA Button */}
      <div className="flex justify-center pt-4">
        <button 
          className="group relative px-6 md:px-8 py-3 md:py-4 bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-[12px] rounded-full text-white font-semibold transition-all duration-300 ring-1 ring-inset ring-white/[0.15] hover:ring-white/[0.25] active:scale-95 text-sm md:text-base w-full md:w-auto max-w-xs"
          aria-label="Start staking now"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-50 rounded-full transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2">
            Start Staking Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </div>
    </div>
  );
});
