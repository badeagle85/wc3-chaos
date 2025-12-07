"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { useTierFilter } from "@/features/tier-filter"
import { TierList } from "@/widgets/tier-list"
import { Tier, TierListMode, type TierKey } from "@/shared/types"

// 티어표 페이지에서는 banned도 포함
const tierOrderWithBanned: TierKey[] = [
  Tier.TIER_1,
  Tier.TIER_2,
  Tier.TIER_2_5,
  Tier.TIER_3,
  Tier.TIER_3_5,
  Tier.TIER_4,
  Tier.TIER_5,
  Tier.TIER_6,
  Tier.NEW,
  Tier.BANNED,
]

export default function TiersPage() {
  const {
    tierOrder,
    searchQuery,
    setSearchQuery,
    selectedTiers,
    toggleTier,
    selectAll,
    selectNone,
    filteredData,
    totalPlayers,
    matchedCount,
  } = useTierFilter({ tierOrder: tierOrderWithBanned })

  return (
    <LayoutWrapper title="티어표">
      <TierList
        mode={TierListMode.STANDALONE}
        tierOrder={tierOrder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTiers={selectedTiers}
        onToggleTier={toggleTier}
        onSelectAll={selectAll}
        onSelectNone={selectNone}
        filteredData={filteredData}
        totalPlayers={totalPlayers}
        matchedCount={matchedCount}
      />
    </LayoutWrapper>
  )
}
