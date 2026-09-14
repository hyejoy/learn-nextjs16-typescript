# Next.js App Router 실습 가이드

## 🎯 학습 목표

Next.js App Router의 핵심 개념을 이해하고 다양한 라우팅 패턴을 구현할 수 있다.

- 파일 시스템 기반 라우팅 이해
- 동적 라우트와 중첩 라우트 구현
- 라우트 그룹과 프라이빗 폴더 활용
- Link와 useRouter를 통한 페이지 전환
- 쿼리 스트링 처리 방법

---

## 📋 제공 사항

### 1. 기본 프로젝트 구조

```
src/
└── app/
    ├── page.tsx      # 홈 페이지 (/)
    └── layout.tsx    # 루트 레이아웃
```

### 2. 학습 커리큘럼

1. 기본 라우트
2. 중첩 라우트
3. 동적 라우트
4. 중첩 동적 라우트
5. 쿼리 스트링
6. 프라이빗폴더
7. 라우트그룹
8. 라우트 전환하기 - Link
9. 라우트 전환하기 - useRouter

---

## 📝 과제 요구사항

### 공통

페이지의 내용은 아무것이나 입력해도 괜찮습니다.

### Step 1: 기본 라우트 구현

**요구사항:**
다음 정적 페이지들을 구현하세요:

- `/about` - 소개 페이지
- `/blog` - 블로그 목록 페이지
- `/contact` - 연락처 페이지

**생각해볼 질문:**

1. `/about` 페이지를 만들려면 어떤 폴더와 파일이 필요한가?
2. `app/about.tsx`로 만들어야 하는가, `app/about/page.tsx`로 만들어야 하는가?
3. 각 페이지는 어떤 내용을 export 해야 하는가?
4. 홈 페이지(`/`)에서 이 페이지들로 이동하는 링크를 어떻게 만드는가?

**구조 고민:**

```
app/
├── page.tsx          # 이미 있음
├── layout.tsx        # 이미 있음
├── about/
│   └── ???
├── blog/
│   └── ???
└── contact/
    └── ???
```

---

### Step 2: 중첩 라우트 구현

**요구사항:**
블로그 섹션에 카테고리별 페이지를 추가하세요:

- `/blog` - 블로그 메인
- `/blog/tech` - 기술 블로그
- `/blog/life` - 일상 블로그
- `/blog/travel` - 여행 블로그

**생각해볼 질문:**

1. 중첩된 경로를 만들려면 폴더 구조를 어떻게 구성해야 하는가?
2. `/blog`와 `/blog/tech`는 별개의 페이지인가, 아니면 관계가 있는가?
3. 중첩 레이아웃은 어떻게 작동하는가?

**구조 고민:**

```
app/
└── blog/
    ├── page.tsx       # /blog
    ├── tech/
    │   └── ???
    ├── life/
    │   └── ???
    └── travel/
        └── ???
```

---

### Step 3: 동적 라우트 구현

**요구사항:**
개별 블로그 포스트 페이지를 동적 라우트로 구현하세요:

- `/blog/tech/1` - 기술 블로그 1번 글
- `/blog/tech/2` - 기술 블로그 2번 글
- `/blog/life/1` - 일상 블로그 1번 글

**생각해볼 질문:**

1. 무한한 경로를 일일이 파일로 만들 수 없다면 어떻게 해야 하는가?
2. 대괄호 `[id]` 폴더의 의미는 무엇인가?
3. URL의 동적 부분(id)을 컴포넌트에서 어떻게 접근하는가?
4. `params` 객체는 무엇이고 어떻게 사용하는가?

**구조 고민:**

```
app/
└── blog/
    └── tech/
        ├── page.tsx           # /blog/tech
        └── [id]/
            └── page.tsx       # /blog/tech/1, /blog/tech/2, ...
```

**구현 힌트:**

```typescript
// 이런 패턴을 고민해보세요

// app/blog/tech/[id]/page.tsx
export default function TechPostPage(/* 어떤 props? */) {
  // URL의 id를 어떻게 가져올까?

  return (
    <div>
      <h1>기술 블로그 포스트 #{/* id 표시 */}</h1>
    </div>
  );
}
```

---

### Step 4: 중첩 동적 라우트 구현

**요구사항:**
카테고리도 동적으로 처리하여 더 유연한 구조 만들기:

- `/blog/[category]/[id]` 패턴으로 변경
- 어떤 카테고리든 대응 가능하도록

**생각해볼 질문:**

1. 여러 개의 동적 세그먼트를 사용할 수 있는가?
2. `[category]`와 `[id]` 모두를 어떻게 접근하는가?
3. 이전의 정적 카테고리 폴더(`tech`, `life`)와 어떻게 다른가?
4. 어느 방식이 더 유연한가? 트레이드오프는?

**구조 고민:**

```
app/
└── blog/
    ├── page.tsx                    # /blog
    └── [category]/
        ├── page.tsx                # /blog/tech, /blog/life
        └── [id]/
            └── page.tsx            # /blog/tech/1, /blog/any/123
```

---

### Step 5: 쿼리 스트링 처리

**요구사항:**
검색 및 필터링 기능 구현:

- `/blog?search=next.js` - 검색어
- `/blog?category=tech&sort=latest` - 필터링
- 쿼리 파라미터를 읽어 UI에 표시

**생각해볼 질문:**

1. 쿼리 스트링은 URL의 어느 부분인가?
2. `params`와 `searchParams`의 차이는 무엇인가?
3. Server Component에서 쿼리 파라미터를 어떻게 접근하는가?
4. Client Component에서는 어떻게 접근하는가?
5. 쿼리 파라미터가 변경되면 페이지가 리렌더링되는가?

**구현 힌트:**

```typescript
// Server Component
export default function BlogPage({
  searchParams
}: {
  searchParams: /* 타입은? */
}) {
  // searchParams.search 접근?
  // searchParams.category 접근?

  return <div>검색어: {/* 표시 */}</div>
}

// Client Component에서는?
'use client'
import { useSearchParams } from 'next/navigation'

export default function SearchBox() {
  const searchParams = useSearchParams()
  // 어떻게 사용?
}
```

---

### Step 6: 프라이빗 폴더 활용

**요구사항:**
컴포넌트와 유틸리티 파일을 라우트와 구분하여 정리:

- `app/_components` - 공통 컴포넌트
- `app/_lib` - 유틸리티 함수
- 이 폴더들은 URL에 노출되지 않아야 함

**생각해볼 질문:**

1. 언더스코어(`_`)로 시작하는 폴더의 특별한 의미는?
2. `_components` 폴더는 라우트로 인식되는가?
3. `/blog/_components`는 접근 가능한 URL인가?
4. 프라이빗 폴더 안에 `page.tsx`를 만들면 어떻게 되는가?
5. 언제 프라이빗 폴더를 사용하는 것이 좋은가?

**구조 고민:**

```
app/
├── _components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── BlogCard.tsx
├── _lib/
│   └── utils.ts
├── blog/
│   ├── _components/      # 블로그 전용 컴포넌트
│   │   └── CategoryNav.tsx
│   └── page.tsx
└── page.tsx
```

---

### Step 7: 라우트 그룹 활용

**요구사항:**
URL에 영향을 주지 않고 라우트를 논리적으로 그룹화:

- `(marketing)` 그룹: about, contact 페이지 - 마케팅 레이아웃
- `(shop)` 그룹: products, cart 페이지 - 쇼핑 레이아웃
- 각 그룹마다 다른 레이아웃 적용

**생각해볼 질문:**

1. 소괄호 `(marketing)` 폴더의 의미는?
2. `/about` 페이지의 URL이 `/(marketing)/about`이 되는가?
3. 라우트 그룹의 목적은 무엇인가?
4. 같은 레벨에 여러 라우트 그룹을 만들 수 있는가?

**구조 고민:**

```
app/
├── (marketing)/
│   ├── about/
│   │   └── page.tsx      # URL: /about
│   └── contact/
│       └── page.tsx      # URL: /contact
├── (shop)/
│   ├── products/
│   │   └── page.tsx      # URL: /products
│   └── cart/
│       └── page.tsx      # URL: /cart
└── layout.tsx            # 루트 레이아웃
```

**실험해보기:**

- [ ] 라우트 그룹 폴더 생성
- [ ] 각 그룹에 다른 레이아웃 적용 (배경색 다르게)
- [ ] `/about`, `/products` URL 접속
- [ ] URL에 그룹명이 포함되는가?
- [ ] 레이아웃이 그룹별로 다르게 적용되는가?
- [ ] 그룹 없는 페이지와 그룹 있는 페이지 비교

---

### Step 8: Link를 통한 라우트 전환

**요구사항:**
모든 페이지에 네비게이션 메뉴 구현:

- 홈, About, Blog, Products 등 링크
- 현재 페이지 하이라이트

**생각해볼 질문:**

1. `<a>` 태그 대신 `<Link>`를 사용하는 이유는?
2. `<Link>`를 사용하면 페이지가 새로고침되는가?
3. `href` 속성에는 어떤 형태의 경로를 사용하는가?

**구현 힌트:**

```typescript
import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">홈</Link>
      <Link href="/about">소개</Link>
      {/* 다른 링크들 */}
    </nav>
  );
}

// 현재 경로 확인하려면?
// usePathname 훅 사용?
```

---

### Step 9: useRouter를 통한 프로그래매틱 네비게이션

**요구사항:**
다음 기능 구현:

- 폼 제출 후 자동으로 다른 페이지로 이동
- 뒤로가기 버튼
- 검색 후 결과 페이지로 이동
- 특정 조건에서 리다이렉트

**생각해볼 질문:**

1. 버튼 클릭이나 폼 제출 후 페이지 이동을 어떻게 처리하는가?
2. `useRouter`는 어디서 import 하는가? (`next/navigation` vs `next/router`)
3. `router.push`, `router.replace`, `router.back`의 차이는?
4. Server Component에서 `useRouter`를 사용할 수 있는가?

**구현 힌트:**

```typescript
"use client";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 검색 후 결과 페이지로 이동
    // router.???
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 검색 폼 */}
      <button type="button" onClick={() => router.back()}>
        뒤로가기
      </button>
    </form>
  );
}
```

---

## 📊 라우팅 패턴 비교표

다음 표를 채우며 각 라우팅 패턴의 사용 사례를 정리하세요:

| 패턴          | 폴더 구조                      | URL 예시       | 사용 사례                     | 고려사항                                       |
| ------------- | ------------------------------ | -------------- | ----------------------------- | ---------------------------------------------- |
| 정적 라우트   | `app/about/page.tsx`           | `/about`       | 단일페이지                    | 없음                                           |
| 중첩 라우트   | `app/blog/tech/page.tsx`       | `/blog/tech`   | 중첩페이지                    | 라우트 깊어질수록 폴더 구조 복잡해짐           |
| 동적 라우트   | `app/blog/[id]/page.tsx`       | `/blog/1`      | 동적라우팅                    | 동적 라우트 잘못된 id접근시 not Found 처리필요 |
| 중첩 동적     | `app/blog/[cat]/[id]/page.tsx` | `/blog/tech/1` | 중첩 + 동적라우팅             | 같은 동적파라미터명 겹치지않게 조심            |
| 프라이빗 폴더 | `app/_components/`             | -              | 라우팅되지않음                |                                                |
| 라우트 그룹   | `app/(shop)/products/page.tsx` | `/products`    | 그룹라우팅(shop)레이아웃 공유 | 레이아웃 공유 목적으로 사용                    |

---
