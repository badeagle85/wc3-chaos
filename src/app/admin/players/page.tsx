"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Badge } from "@/shared/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Search, UserPlus } from "lucide-react"
import playersData from "@/data/players.json"

type PlayerData = typeof playersData

const tierLabels: Record<string, string> = {
  "1": "1티어",
  "2": "2티어",
  "2.5": "2.5티어",
  "3": "3티어",
  "3.5": "3.5티어",
  "4": "4티어",
  "5": "5티어",
  "6": "6티어",
  "new": "신규",
  "banned": "밴",
}

function getAllPlayers() {
  const players: { name: string; tier: string }[] = []
  const tiers: (keyof PlayerData)[] = ["1", "2", "2.5", "3", "3.5", "4", "5", "6", "new"]

  for (const tier of tiers) {
    const tierPlayers = playersData[tier] as string[]
    for (const name of tierPlayers) {
      players.push({ name, tier })
    }
  }

  const banned = playersData.banned as { name: string; reason: string }[]
  for (const player of banned) {
    players.push({ name: player.name, tier: "banned" })
  }

  return players
}

export default function AdminPlayersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const allPlayers = getAllPlayers()

  const filteredPlayers = allPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <LayoutWrapper title="플레이어 관리" isAdmin>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                플레이어 목록
                <Badge variant="secondary">{allPlayers.length}명</Badge>
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="플레이어 검색"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button>
                  <UserPlus className="h-4 w-4 mr-1" />
                  추가
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>티어</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.slice(0, 50).map((player, index) => (
                    <TableRow key={`${player.name}-${index}`}>
                      <TableCell className="text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={player.tier === "banned" ? "destructive" : "outline"}
                        >
                          {tierLabels[player.tier]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          수정
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredPlayers.length > 50 && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                50명까지만 표시됩니다. 검색을 이용해주세요.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  )
}
