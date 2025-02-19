"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface TokenStakingProps {
  onClose?: () => void;
  userBalance?: number;
}

export function TokenStaking({ onClose, userBalance = 1000 }: TokenStakingProps) {
  const [isStaking, setIsStaking] = React.useState(false);

  return (
    <div className="p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl">
      <h2 className="text-white">Token Staking</h2>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <div 
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: stakingTier.color }}
            />
            <span className="text-sm font-medium" style={{ color: stakingTier.color }}>
              {stakingTier.name}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "stake" | "stats")} className="w-full">
          <TabsList className="w-full bg-white/5 border-b border-white/10 rounded-none p-0 h-12 mb-6 grid grid-cols-2">
            <TabsTrigger
              value="stake"
              className={cn(
                "w-full h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#e7095d]",
                "text-white/60 data-[state=active]:text-white font-medium",
                "data-[state=active]:bg-white/5"
              )}
            >
              <IconWallet className="h-4 w-4 mr-2" />
              Stake
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className={cn(
                "w-full h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#e7095d]",
                "text-white/60 data-[state=active]:text-white font-medium",
                "data-[state=active]:bg-white/5"
              )}
            >
              <IconChartBar className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stake" className="space-y-6 mt-0 outline-none">
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm text-white/80 font-medium">Amount to Stake</label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm text-white/60">
              <IconCoins className="h-4 w-4" />
              SOLB
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Balance: {userBalance.toLocaleString()} SOLB</span>
            <button 
              onClick={() => setAmount(userBalance.toString())}
              className="text-[#e7095d] hover:text-[#e7095d]/80 transition-colors"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Duration Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm text-white/80 font-medium">Lock Duration</label>
            <div className="flex items-center gap-2 text-sm">
              <IconClock className="h-4 w-4 text-white/40" />
              <span className="text-white/90 font-medium">{duration} Days</span>
            </div>
          </div>
          <label className="text-sm text-white/80 font-medium">Lock Duration</label>
          <Slider
            value={[duration]}
            onValueChange={(vals) => setDuration(vals[0])}
            min={30}
            max={180}
            step={30}
            className="py-4"
            trackClassName="[&>div]:bg-[#e7095d]"
          />
          <div className="flex justify-between text-sm text-white/60">
            <span>1 Month</span>
            <span>6 Months</span>
          </div>
        </div>

        {/* Rewards Preview */}
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">Tier</span>
              <span className="text-sm font-medium" style={{ color: stakingTier.color }}>
                {stakingTier.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">Duration</span>
              <span className="text-sm text-white/90 font-medium">{duration} Days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">Base APR</span>
              <span className="text-sm text-white/90 font-medium">{stakingTier.baseAPR.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">Duration Bonus</span>
              <span className="text-sm text-[#e7095d] font-medium">
                +{(durationBonus * 5).toFixed(1)}%
              </span>
            </div>
            <div className="pt-3 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/90 font-medium">Estimated Rewards</span>
                <span className="text-base text-white font-semibold">
                  {estimatedRewards.toFixed(2)} SOLB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center p-6 pt-0">
        <motion.div className="w-full"
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            onClick={() => setIsStaking(true)}
            disabled={!amount || isStaking}
            className={cn(
              "w-full bg-gradient-to-r from-[#e7095d] to-[#6003e5] hover:opacity-90 transition-opacity",
              "text-white font-medium py-6"
            )}
          >
            <AnimatePresence mode="wait">
              {isStaking ? (
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconLock className="h-4 w-4 animate-pulse" />
                  Staking...
                </motion.div>
              ) : (
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconWallet className="h-4 w-4" />
                  Stake Tokens
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
