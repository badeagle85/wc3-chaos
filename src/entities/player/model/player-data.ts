import type { TierKey, BannedPlayer } from "@/shared/types"
import playersData from "@/data/players.json"
import { tierScores, tierOrder } from "@/shared/config"

type PlayersDataType = typeof playersData

export function getPlayerList(tier: TierKey): string[] {
  const players = playersData[tier as keyof PlayersDataType]
  if (tier === "banned") {
    return (players as BannedPlayer[]).map((p) => p.name)
  }
  return players as string[]
}

export function getAllPlayers(): { name: string; tier: TierKey }[] {
  const result: { name: string; tier: TierKey }[] = []
  for (const tier of tierOrder) {
    const players = getPlayerList(tier)
    for (const name of players) {
      result.push({ name, tier })
    }
  }
  return result
}

export function getPlayerTier(name: string): TierKey | null {
  for (const tier of tierOrder) {
    const players = playersData[tier as keyof PlayersDataType]
    if (Array.isArray(players) && players.includes(name as never)) {
      return tier
    }
  }
  return null
}

export function isBannedPlayer(name: string): boolean {
  const banned = playersData.banned as BannedPlayer[]
  return banned.some((p) => p.name.toLowerCase() === name.toLowerCase())
}

export function getPlayerScore(name: string): number {
  const tier = getPlayerTier(name)
  return tier ? tierScores[tier] : 5
}

export const allPlayers = getAllPlayers()
