import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { BarChart3, Calculator, Swords, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <LayoutWrapper title="홈">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/tiers">
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">티어표</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>플레이어 티어 확인</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/balancer">
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">팀 밸런서</CardTitle>
              <Swords className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>공정한 팀 구성</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/calculator">
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">점수 계산기</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>게임 점수 계산</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/players">
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">플레이어</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>플레이어 관리</CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </LayoutWrapper>
  )
}
