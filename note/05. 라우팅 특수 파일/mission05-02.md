# Next.js Loading & Error 처리 미션 가이드

## 🎯 미션 목표

Next.js의 Loading 상태와 Error 처리 방법을 이해하고 적절히 활용할 수 있다.

- `loading.tsx`와 `error.tsx` 특수 파일의 역할 이해
- Suspense를 사용한 특정 영역 로딩 처리
- 전역 처리 vs 영역별 처리의 차이점 이해
- 실전에서 적절한 방법 선택 능력

---

## 📋 제공 사항

### 1. 프로젝트 구조

```
src/
└── app/
│   ├── page.tsx                # 루트 페이지 (기본 퍼블리싱만)
│   ├── layout.tsx              # 루트 레이아웃
├── components/
│   ├── common
│   ├── ── Header.tsx              # 헤더 컴포넌트
│   ├── ── Footer.tsx              # 푸터 컴포넌트
│   ├── etc
│   ├── ── ErrorPage.tsx           # 전역 에러 페이지
│   ├── ── LoadingSpinner.tsx      # 전역 로딩 페이지
│   ├── posts
│   ├── ── PostCard.tsx            # 게시물 카드 컴포넌트
│   ├── ── PostCardError.tsx       # 에러 상태 컴포넌트
│   └── ── PostCardSkeleton.tsx    # 로딩 스켈레톤 컴포넌트
└── services/
        └── api.ts                  # API 호출 함수
```

### 2. 제공되는 컴포넌트

**PostCardSkeleton** - 개별 카드 로딩 상태

```typescript
// 5개의 스켈레톤을 표시하려면
{
  Array.from({ length: 5 }).map((_, i) => <PostCardSkeleton key={i} />);
}
```

**PostCardError** - 에러 상태

```typescript
<PostCardError message="게시물을 불러올 수 없습니다" />
```

**LoadingSpinner** - 전체 페이지 로딩 (loading.tsx용 / 코드 복사해서 사용하세요)  
**ErrorPage** - 전체 페이지 에러 (error.tsx용 / 코드 복사해서 사용하세요)

### 3. API

JSONPlaceholder API 사용: `https://jsonplaceholder.typicode.com/posts?_limit=5`

- 한 번의 호출로 게시물 5개를 가져옴 (`_limit=5`)

---

## 📝 미션 단계

### 미션 1: 기본 페이지 구조 이해하기

**목표:** 제공된 프로젝트의 구조와 컴포넌트 파악

**요구사항:**

- 프로젝트 실행하고 초기 상태 확인
- Header, Footer, 메인 콘텐츠 영역 구분
- 어떤 부분이 정적이고 어떤 부분이 동적인지 파악

**생각해볼 질문:**

1. 페이지가 여러 영역으로 나뉘어 있는가? (Header, Main Content, Footer)
2. Header와 Footer는 항상 보여야 하는가?
3. 게시물 목록만 로딩 중일 때, Header와 Footer도 숨겨야 하는가?
4. 사용자 경험 관점에서 어느 부분의 로딩을 보여줘야 하는가?

---

### 미션 2: 기본 데이터 페칭 구현하기

**목표:** API에서 게시물 5개를 가져와 화면에 표시

**요구사항:**

- JSONPlaceholder API에서 posts 데이터 fetch (`_limit=5`)
- PostCard 컴포넌트로 렌더링
- Header와 Footer는 항상 보이도록 유지

**생각해볼 질문:**

1. Server Component에서 데이터를 어떻게 fetch 하는가?
2. `async/await`를 어디에 사용해야 하는가?
3. 데이터가 로딩되는 동안 사용자는 무엇을 보는가?
4. 전체 페이지가 비어 있는가, 아니면 Header/Footer는 보이는가?

**구현 힌트:**

```typescript
// app/page.tsx

async function getPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  return response.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>게시물 목록</h1>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
```

---

### 미션 3: 로딩 시간 늘려서 확인하기

**목표:** 로딩 상태를 명확히 보기 위해 지연 추가

**요구사항:**

- API 호출에 3초 지연 추가
- loading.tsx의 동작 확인
- 전체 화면이 3초간 로딩되는 것 확인

**구현 힌트:**

```typescript
async function getPosts() {
  // 3초 지연
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  return response.json();
}
```

---

### 미션 4: loading.tsx로 전체 페이지 로딩 처리하기

**목표:** Next.js의 `loading.tsx`로 페이지 전체 로딩 상태 처리

**생각해볼 질문:**

1. `loading.tsx` 파일은 어디에 생성해야 하는가?
2. 이 파일이 표시될 때 무엇이 보이는가?
3. 메인 콘텐츠 모두 가려지는가?
4. 사용자 입장에서 이것이 좋은 경험인가?

**미션 설명:**

```
현재 상황:
- 페이지 접속 시 → 빈 화면 → 데이터 로드 완료 후 게시물 표시

loading.tsx 적용:
- 페이지 접속 시 → LoadingSpinner (전체 화면) → 게시물 표시
- 메인 콘텐츠가 모두 가려짐
```

**구현 가이드:**

```typescript
// app/loading.tsx 생성

import { LoadingSpinner } from "./components/LoadingSpinner";

export default function Loading() {
  return <LoadingSpinner />;
}
```

**문제점 파악:**

```
loading.tsx의 문제:
- 전체 페이지가 로딩 스피너로 덮임
- 메인 배너 같은 정적 요소도 숨겨짐
- 좋지 않은 사용자 경험

해결책:
- 게시물 목록 영역만 로딩 처리
- 메인 배너는 항상 보이도록
```

---

### 미션 5: Suspense로 특정 영역만 로딩 처리하기 ⭐

**목표:** 게시물 목록 영역만 로딩하고, Header/Footer는 항상 표시

**생각해볼 질문:**

1. 페이지 전체가 아닌 일부만 로딩 처리하려면?
2. `loading.tsx`는 전체를 처리한다. 부분 처리 방법은?
3. React의 `Suspense`를 사용할 수 있는가?
4. Suspense는 어디에 어떻게 배치해야 하는가?

**미션 설명:**

```
목표 구조:
┌─────────────────────┐
│  Header (항상 보임)  │
├─────────────────────┤
│                     │
│  메인배너             │
│  📝 게시물 1        │ ← 이 영역만
│  📝 게시물 2        │   로딩 처리
│  📝 게시물 3        │   (Suspense)
│                     │
├─────────────────────┤
│  Footer (항상 보임)  │
└─────────────────────┘

로딩 중:
┌─────────────────────┐
│  Header (보임) ✅    │
├─────────────────────┤
│  메인 배너                   │
│  ⏳ 스켈레톤 1      │ ← 이 영역만
│  ⏳ 스켈레톤 2      │   로딩 표시
│  ⏳ 스켈레톤 3      │
│                     │
├─────────────────────┤
│  Footer (보임) ✅    │
└─────────────────────┘
```

**구현 전략:**

```typescript
// 1단계: loading.tsx 삭제 또는 주석 처리

// 2단계: 게시물 목록을 별도 컴포넌트로 분리
async function PostList() {
  const posts = await getPosts(); // 여기서 3초 지연

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// 3단계: Suspense로 감싸기
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <Header />

      <main>
        <h1>게시물 목록</h1>

        <Suspense
          fallback={
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <PostList />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
```

**구현 힌트:**

```typescript
// app/page.tsx

import { Suspense } from "react";
import { PostCardSkeleton } from "./components/PostCardSkeleton";

// 게시물 목록 컴포넌트 (async Server Component)
async function PostList() {
  // 3초 지연
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const posts = await response.json();

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// 메인 페이지
export default function HomePage() {
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">게시물 목록</h1>

        {/* 게시물 영역만 Suspense로 감싸기 */}
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <PostList />
        </Suspense>
      </main>
    </div>
  );
}
```

**loading.tsx vs Suspense 비교:**

```
loading.tsx:
❌ 전체 페이지 로딩
❌ 메인 배너도 가려짐
❌ 사용자는 어느 사이트인지 모름
✅ 구현 간단

Suspense (특정 영역):
✅ 필요한 영역만 로딩
✅ 메인 배너 항상 표시
✅ 더 나은 사용자 경험
✅ 여러 영역에 개별 적용 가능
⚠️ 컴포넌트 분리 필요
```

---

### 미션 6: error.tsx로 전체 페이지 에러 처리하기

**목표:** Next.js의 `error.tsx`로 에러 상태 처리

**생각해볼 질문:**

1. `error.tsx` 파일은 어떤 역할을 하는가?
2. 에러 발생 시 전체 페이지가 교체되는가?
3. `error.tsx`는 반드시 Client Component여야 하는가?
4. `reset` 함수는 무엇을 하는가?

**미션 설명:**

```
현재 상황:
- API 에러 발생 시 → 빈 화면 또는 앱 크래시

error.tsx 적용:
- API 에러 발생 시 → ErrorPage 표시 (전체 화면)
- "다시 시도" 버튼으로 재시도 가능
```

**구현 가이드:**

```typescript
// app/error.tsx

"use client"; // 필수!

import { ErrorPage } from "./components/ErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage message={error.message} onRetry={reset} />;
}
```

**에러 발생시키기:**

```typescript
// app/page.tsx의 PostList 컴포넌트에서

async function PostList() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // 방법 1: 잘못된 URL
  const response = await fetch("https://invalid-url.com");

  // 방법 2: 에러 던지기
  throw new Error("게시물을 불러오는데 실패했습니다");

  // 방법 3: 실패하는 API
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/invalid-endpoint",
  );
  if (!response.ok) throw new Error("API 에러");
}
```

**문제점 파악:**

```
error.tsx의 문제:
- 전체 페이지가 에러 화면으로 교체
- 메인 배너도 사라짐
- 게시물 영역만 에러인데 전체가 에러 표시

해결책:
- 게시물 목록 영역만 에러 처리
- 메인 배너는 그대로 유지
```

---

### 미션 7: 에러 바운더리로 특정 영역만 에러 처리하기 ⭐

**목표:** 게시물 목록 영역만 에러 표시하고, Header/Footer는 유지

**생각해볼 질문:**

1. `error.tsx`는 페이지 전체를 처리한다. 부분 처리 방법은?
2. Server Component에서 에러 바운더리를 사용할 수 있는가?
3. 에러가 발생해도 나머지 UI는 정상적으로 보여야 한다면?

**미션 설명:**

```
목표:
┌─────────────────────┐
│  Header             │
├─────────────────────┤
│                     │
│  메인배너             │
│  ❌ 에러 발생       │ ← 이 영역만
│  게시물을 불러올     │   에러 표시
│  수 없습니다        │
│  [다시 시도]        │
│                     │
├─────────────────────┤
│  Footer             │
└─────────────────────┘
```

**error.tsx vs try-catch 비교:**

```
error.tsx:
❌ 전체 페이지 에러 처리
❌ 메인 배너도 사라짐
❌ 게시물만 실패해도 전체 에러
✅ 자동 Error Boundary
✅ reset 함수 제공

try-catch (특정 영역):
✅ 필요한 영역만 에러 처리
✅ 메인 배너 유지
✅ 더 나은 사용자 경험
✅ 세밀한 제어
⚠️ 수동으로 에러 처리
⚠️ reset 기능 직접 구현 필요
```

---

### 미션 8: global-error.tsx 이해하기

**목표:** 루트 레이아웃의 에러까지 처리하는 최후의 안전장치

**생각해볼 질문:**

1. `error.tsx`와 `global-error.tsx`의 차이는?
2. layout.tsx에서 에러가 발생하면?
3. global-error.tsx는 언제 표시되는가?
4. 왜 `<html>`, `<body>` 태그가 필요한가?

**미션 설명:**

```
error.tsx의 한계:
- 같은 레벨의 layout.tsx 에러는 잡지 못함
- 루트 레이아웃 에러 → 앱 크래시

global-error.tsx:
- 루트 레이아웃 포함 모든 에러의 최후 방어선
- 앱이 완전히 망가지는 것을 방지
```

**구현 가이드:**

```typescript
// app/global-error.tsx

"use client";

import { ErrorPage } from "./components/ErrorPage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorPage message="심각한 오류가 발생했습니다" onRetry={reset} />
      </body>
    </html>
  );
}
```

## 🔍 핵심 개념 정리

### 전체 처리 vs 영역별 처리

| 항목            | 전체 처리                         | 영역별 처리                        | 권장         |
| --------------- | --------------------------------- | ---------------------------------- | ------------ |
| **로딩**        | `loading.tsx`<br>전체 화면 로딩   | `Suspense`<br>특정 영역만 로딩     | ✅ Suspense  |
| **에러**        | `error.tsx`<br>전체 화면 에러     | `에러바운더리`<br>특정 영역만 에러 | ✅ try-catch |
| **사용자 경험** | ❌ 나쁨<br>Header/Footer도 가려짐 | ✅ 좋음<br>Header/Footer 유지      | ✅ 영역별    |
| **구현 난이도** | ✅ 쉬움                           | ⚠️ 보통                            | -            |

### 언제 무엇을 사용할까?

```
✅ Suspense + 에러바운더리 (권장):
- 페이지에 여러 독립적인 영역이 있을 때
- 메인 배너와 같은 정적 요소가 있을 때
- 더 나은 사용자 경험을 원할 때
- 한 영역의 실패가 다른 영역에 영향을 주면 안 될 때

⚠️ loading.tsx + error.tsx:
- 매우 단순한 페이지
- 전체가 하나의 데이터에 의존
- 빠른 프로토타이핑
- 전체 페이지 영역이 로딩으로 처리가 되어도 상관 없는 페이지 (예: 로그인 페이지)

✅ global-error.tsx:
- 항상 생성 권장
- 예상치 못한 치명적 에러의 마지막 방어선
```

---
