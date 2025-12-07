import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import type { TierKey } from "@/shared/types"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const body = await request.json()
    const { tier } = body as { tier: TierKey }

    const supabase = await createServerSupabaseClient()

    // 티어에 따라 status와 tier 값 결정
    let dbTier: string
    let status: string

    if (tier === "banned") {
      dbTier = "7"
      status = "banned"
    } else if (tier === "new") {
      dbTier = "7"
      status = "new"
    } else {
      dbTier = tier
      status = "active"
    }

    const { data, error } = await supabase
      .from("chaos_players")
      .update({ tier: dbTier, status, updated_at: new Date().toISOString() })
      .eq("name", decodeURIComponent(name))
      .select()

    if (error) {
      console.error("Error updating player:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, player: data[0] })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
