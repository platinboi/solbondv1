"use client"

import { FloatingDock } from "@/components/ui/floating-dock"
import { IconCreditCard, IconRocket, IconBrandTwitter, IconBrandTelegram, IconCoin } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { StakingDialog } from "@/components/ui/staking-dialog"

const items = [
  {
    title: "Solbond",
    icon: <IconCreditCard className="h-full w-full text-white/80" />,
    href: "#",
    content: `
      <div class="space-y-6">
        <card title="Core Features">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="feature-item flex items-center gap-2">
              <span class="shrink-0">✅</span>
              <span>Instant SOL to $SOLB conversion</span>
            </div>
            <div class="feature-item flex items-center gap-2">
              <span class="shrink-0">✅</span>
              <span>Zero personal data collection</span>
            </div>
            <div class="feature-item flex items-center gap-2">
              <span class="shrink-0">✅</span>
              <span>Community-driven ecosystem</span>
            </div>
            <div class="feature-item flex items-center gap-2">
              <span class="shrink-0">✅</span>
              <span>Real-world payment integration</span>
            </div>
          </div>
        </card>
        
        <div class="performance-section">
          <h3 class="flex items-center gap-2 text-lg font-semibold">
            <span class="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            Live Network Performance
          </h3>
          <pre><code class="language-chart">
          {
            "type": "bar",
            "data": [
              {"name": "TPS", "value": 2400, "color": "#3B82F6", "goal": 3000},
              {"name": "Avg Fee", "value": 0.00025, "color": "#10B981", "goal": 0.0002},
              {"name": "Latency", "value": 1.8, "color": "#F59E0B", "goal": 1.5}
            ],
            "options": {
              "showGoals": true,
              "interactive": true,
              "animation": "spring"
            }
          }
          </code></pre>
        </div>

        <div class="flex flex-col items-center justify-center w-full space-y-4 mt-6">
          <div class="flex items-center justify-center gap-3">
            <Button variant="default" className="gap-2 bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-[12px] backdrop-saturate-[180%] ring-1 ring-inset ring-white/[0.15] hover:ring-white/[0.25]">
              <IconWallet className="h-4 w-4 text-gray-400" />
              Connect Wallet
            </Button>
            <Button variant="outline" className="gap-2 bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-[12px] backdrop-saturate-[180%] ring-1 ring-inset ring-white/[0.15] hover:ring-white/[0.25]">
              Learn More
              <IconArrowRight className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: "Staking",
    icon: <IconCoin className="h-full w-full text-white/80" />,
    href: "#",
    content: `
      <div class="space-y-6">
        <h2>Staking & Rewards – Optimize Your $SOLB</h2>
        <div class="flex justify-around items-center my-8">
          <progress-circle value="14" label="APR" />
          <progress-circle value="0.5" label="Fee Redistribution" />
          <progress-circle value="2" label="Referral Bonus" />
        </div>
        
        <div class="performance-section">
          <h3 class="flex items-center gap-2 text-lg font-semibold">
            <span class="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
            Staking Growth
          </h3>
          <pre><code class="language-chart">
          {
            "type": "line",
            "data": [
              {"name": "Day 1", "value": 100},
              {"name": "Week 1", "value": 110},
              {"name": "Month 1", "value": 150},
              {"name": "Month 3", "value": 200},
              {"name": "Month 6", "value": 300},
              {"name": "Year 1", "value": 500}
            ]
          }
          </code></pre>
        </div>

        <card title="Tokenomics">
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <span class="shrink-0 text-blue-500">•</span>
              <span><strong>Transaction Fees:</strong> ~0.5% redistributed to stakers</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="shrink-0 text-blue-500">•</span>
              <span><strong>Token Burning:</strong> Reduces supply, potentially increasing value</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="shrink-0 text-blue-500">•</span>
              <span><strong>Growing Staking Pool:</strong> Influences reward distribution</span>
            </li>
          </ul>
        </card>
      </div>
    `,
  },
  {
    title: "Vision",
    icon: <IconRocket className="h-full w-full text-white/80" />,
    href: "#",
    content: "<SolbondRoadmap inDialog />",
  },
  {
    title: "Twitter",
    icon: <IconBrandTwitter className="h-full w-full text-white/80" />,
    href: "#",
    content: "Twitter",
  },
  {
    title: "Telegram",
    icon: <IconBrandTelegram className="h-full w-full text-white/80" />,
    href: "#",
    content: "Telegram",
  },
]

export default function FloatingDockWrapper() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center items-end p-4">
      <FloatingDock items={items} />
    </div>
  )
}