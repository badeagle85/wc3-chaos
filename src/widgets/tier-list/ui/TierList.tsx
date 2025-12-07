"use client"

import { Search, X, Pencil } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, Input, Badge } from "@/shared/ui"
import { tierColors, tierLabels } from "@/shared/config"
import { TierListMode, type TierKey } from "@/shared/types"

interface TierListProps {
  // 공통 props
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedTiers: Set<TierKey>
  onToggleTier: (tier: TierKey) => void
  tierOrder: TierKey[]
  filteredData: { tier: TierKey; players: string[]; matchedPlayers: Set<string> }[]

  // 모드별 설정
  mode?: TierListMode  // standalone: 티어표 페이지, balancer: 밸런서 사이드

  // standalone 모드 전용
  onSelectAll?: () => void
  onSelectNone?: () => void
  totalPlayers?: number
  matchedCount?: number

  // balancer 모드 전용
  isPlayerAdded?: (name: string) => boolean
  onAddPlayer?: (name: string) => void

  // 편집 모드 전용
  isEditMode?: boolean
  onEditPlayer?: (playerName: string, currentTier: TierKey) => void
}

export function TierList({
  searchQuery,
  onSearchChange,
  selectedTiers,
  onToggleTier,
  tierOrder,
  filteredData,
  mode = TierListMode.STANDALONE,
  onSelectAll,
  onSelectNone,
  totalPlayers,
  matchedCount,
  isPlayerAdded,
  onAddPlayer,
  isEditMode = false,
  onEditPlayer,
}: TierListProps) {
  const isBalancerMode = mode === TierListMode.BALANCER
  const isStandaloneMode = mode === TierListMode.STANDALONE

  return (
    <div className="space-y-4">
      <Card>
        {isBalancerMode && (
          <CardHeader className="pb-3">
            <CardTitle className="text-base">티어표 (클릭하여 추가)</CardTitle>
          </CardHeader>
        )}
        <CardContent className={`space-y-3 ${isStandaloneMode ? "pt-6 space-y-4" : ""}`}>
          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="플레이어 검색..."
              className={`pl-9 pr-9 ${isBalancerMode ? "h-9" : "text-base"}`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* 티어 필터 */}
          <div className={isStandaloneMode ? "space-y-2" : ""}>
            {isStandaloneMode && onSelectAll && onSelectNone && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">티어 필터</span>
                <div className="flex gap-2 text-sm">
                  <button onClick={onSelectAll} className="text-primary hover:underline">
                    전체 선택
                  </button>
                  <span className="text-muted-foreground">|</span>
                  <button onClick={onSelectNone} className="text-primary hover:underline">
                    전체 해제
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5">
              {tierOrder.map((tier) => (
                <button
                  key={tier}
                  onClick={() => onToggleTier(tier)}
                  className={`px-2 py-1 text-xs rounded-full font-medium transition-all ${
                    selectedTiers.has(tier)
                      ? `${tierColors[tier]} text-white`
                      : "bg-muted text-muted-foreground opacity-50"
                  }`}
                >
                  {tierLabels[tier]}
                </button>
              ))}
            </div>
          </div>

          {/* 결과 카운트 (standalone 모드만) */}
          {isStandaloneMode && totalPlayers !== undefined && matchedCount !== undefined && (
            <div className="text-sm text-muted-foreground">
              {searchQuery.trim() ? (
                <>
                  <span className="font-medium text-foreground">{matchedCount}명</span> 검색됨
                  {" "}(전체 {totalPlayers}명)
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">{matchedCount}명</span> 표시 중
                  {" "}(전체 {totalPlayers}명)
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 티어 목록 */}
      {isStandaloneMode && filteredData.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {searchQuery.trim()
              ? `"${searchQuery}" 검색 결과가 없습니다.`
              : "선택된 티어가 없습니다."}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredData.map(({ tier, players: tierPlayers, matchedPlayers }) => (
            <Card key={tier} className="overflow-hidden">
              <CardHeader className={isBalancerMode ? "py-2 px-3" : "pb-3"}>
                <CardTitle className={`flex items-center gap-2 ${isBalancerMode ? "text-sm" : ""}`}>
                  <Badge className={`${tierColors[tier]} text-white`}>
                    {tierLabels[tier]}
                  </Badge>
                  <span className={`text-muted-foreground font-normal ${isBalancerMode ? "text-xs" : "text-base"}`}>
                    {searchQuery.trim() && matchedPlayers.size > 0
                      ? `${matchedPlayers.size}명 / ${tierPlayers.length}명`
                      : `${tierPlayers.length}명`}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className={isBalancerMode ? "p-2" : ""}>
                <div className={`flex flex-wrap ${isBalancerMode ? "gap-1" : "gap-2"}`}>
                  {tierPlayers.map((name, index) => {
                    const isMatched = matchedPlayers.has(name)
                    const isSearching = searchQuery.trim().length > 0
                    const isAdded = isBalancerMode && isPlayerAdded ? isPlayerAdded(name) : false

                    if (isBalancerMode && onAddPlayer) {
                      return (
                        <button
                          key={`${name}-${index}`}
                          onClick={() => onAddPlayer(name)}
                          disabled={isAdded}
                          className={`px-2 py-1 text-sm rounded border transition-colors ${
                            isAdded
                              ? "bg-primary text-primary-foreground border-primary"
                              : isSearching
                              ? isMatched
                                ? "bg-yellow-100 border-yellow-400 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:border-yellow-600 dark:hover:bg-yellow-900"
                                : "opacity-40 border-border"
                              : "border-border hover:bg-accent"
                          }`}
                        >
                          {name}
                        </button>
                      )
                    }

                    return (
                      <span
                        key={`${name}-${index}`}
                        className={`px-2 py-1 text-sm rounded border transition-colors inline-flex items-center gap-1 ${
                          isSearching
                            ? isMatched
                              ? "bg-yellow-100 border-yellow-400 dark:bg-yellow-900/50 dark:border-yellow-600"
                              : "opacity-40 border-border"
                            : "border-border"
                        }`}
                      >
                        {name}
                        {isEditMode && onEditPlayer && (
                          <button
                            onClick={() => onEditPlayer(name, tier)}
                            className="ml-1 p-0.5 rounded hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Pencil className="h-3 w-3" />
                          </button>
                        )}
                      </span>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
