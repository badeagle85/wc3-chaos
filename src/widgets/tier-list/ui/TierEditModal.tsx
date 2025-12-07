"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/shared/ui"
import { tierColors, tierLabels, tierOrderWithBanned } from "@/shared/config"
import type { TierKey } from "@/shared/types"

interface TierEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  playerName: string
  currentTier: TierKey
  onSave: (playerName: string, newTier: TierKey) => void
}

export function TierEditModal({
  open,
  onOpenChange,
  playerName,
  currentTier,
  onSave,
}: TierEditModalProps) {
  const [selectedTier, setSelectedTier] = useState<TierKey>(currentTier)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (selectedTier === currentTier) {
      onOpenChange(false)
      return
    }

    setIsSaving(true)
    try {
      await onSave(playerName, selectedTier)
      onOpenChange(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>티어 변경 - {playerName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              현재 티어: <span className={`inline-block px-2 py-0.5 rounded text-white text-xs ${tierColors[currentTier]}`}>{tierLabels[currentTier]}</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">변경할 티어 선택</p>
            <div className="grid grid-cols-3 gap-2">
              {tierOrderWithBanned.map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTier === tier
                      ? `${tierColors[tier]} text-white ring-2 ring-offset-2 ring-primary`
                      : `${tierColors[tier]} text-white opacity-60 hover:opacity-100`
                  }`}
                >
                  {tierLabels[tier]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
