# WC3 카오스 프로젝트 가이드

## Supabase 규칙

이 프로젝트는 다른 프로젝트와 Supabase를 공유합니다.

### 테이블 네이밍 규칙
- **prefix**: `chaos_`
- 예: `chaos_players`, `chaos_users`, `chaos_announcements`

### 테이블 목록
| 테이블명 | 설명 |
|---------|------|
| `chaos_users` | 로그인/권한 관리용 유저 |
| `chaos_players` | 게임 내 플레이어 (티어표) |
| `chaos_tier_scores` | 티어별 점수 설정 |
| `chaos_announcements` | 공지사항 |
| `chaos_tournaments` | 대회 정보 |

### Enum 타입
- `chaos_user_role`: admin, master, staff, user, banned
- `chaos_player_status`: active, resting, banned, new
- `chaos_tier_level`: 1, 2, 2.5, 3, 3.5, 4, 5, 6, 7

### 스키마 파일
- `supabase/schema.sql` - 전체 스키마 정의

## 인증 방식

1차: 단순 비밀번호 인증 (`.env.local`)
- `ADMIN_PASSWORD`
- `MASTER_PASSWORD`
- `STAFF_PASSWORD`

## 프로젝트 구조 (FSD)

```
src/
├── app/           # 페이지 라우트
├── components/    # 레이아웃 컴포넌트
├── entities/      # 엔티티 (player)
├── features/      # 기능 (team-balancer, tier-filter, auth)
├── shared/        # 공유 (ui, types, config, lib)
└── widgets/       # 위젯 (tier-list, balancer-panel)
```

## 주요 타입

```typescript
enum Tier {
  TIER_1 = "1", TIER_2 = "2", TIER_2_5 = "2.5",
  TIER_3 = "3", TIER_3_5 = "3.5", TIER_4 = "4",
  TIER_5 = "5", TIER_6 = "6", TIER_7 = "7",
  NEW = "new", BANNED = "banned"
}

enum Team { NIGHT_ELF = "nightelf", UNDEAD = "undead" }
enum MoveStatus { STAY = "stay", MOVE = "move" }
enum TierListMode { STANDALONE = "standalone", BALANCER = "balancer" }
```
