# Layout과 라우트 그룹 실습 가이드

## 🎯 학습 목표

Next.js의 Layout 시스템과 라우트 그룹을 이해하고 페이지별로 다른 레이아웃을 적용할 수 있다.

- Layout의 역할과 중첩 원리 이해
- 루트 레이아웃과 중첩 레이아웃의 관계
- 라우트 그룹을 활용한 레이아웃 분리
- 특정 페이지에서 레이아웃 제외하기

---

## 📋 제공 사항

### 1. 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 루트 페이지 (/)
│   ├── favicon.ico
│   ├── layout.tsx            # 루트 레이아웃 (헤더, 푸터 포함)
│   ├── login/
│   │   └── page.tsx          # 로그인 페이지 (/login)
│── components/
│   ├── Header.tsx
│   └── Footer.tsx
│── styles/
│   └── globals.css
```

### 2. 현재 상태

- **루트 레이아웃** (`app/layout.tsx`): 모든 페이지에 Header와 Footer 포함
- **루트 페이지** (`/`): Header, Footer가 표시됨 ✅
- **로그인 페이지** (`/login`): Header, Footer가 표시됨 ❌ (제거 필요!)

### 3. 목표

**로그인 페이지에서만** Header와 Footer를 표시하지 않도록 레이아웃 구조 변경

---

## 📝 과제 요구사항

### Step 1: 현재 레이아웃 동작 분석하기

**요구사항:**

- 제공된 프로젝트 실행
- 루트 페이지와 로그인 페이지 모두 방문
- 현재 레이아웃 적용 상태 확인

**생각해볼 질문:**

1. 루트 페이지(`/`)와 로그인 페이지(`/login`) 모두에 Header와 Footer가 보이는가?
2. `app/layout.tsx` 파일에서 무엇을 렌더링하고 있는가?
3. `{children}` prop은 무엇을 의미하는가?
4. 루트 레이아웃은 어떤 페이지들에 적용되는가?
5. 로그인 페이지만 다른 레이아웃을 사용하려면 어떻게 해야 하는가?

**확인해보기:**

```typescript
// app/layout.tsx (현재 상태 예상)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children} {/* 모든 페이지 내용이 여기에 렌더링 */}
        <Footer />
      </body>
    </html>
  );
}
```

### Step 2: Layout 중첩 원리 이해하기

**요구사항:**

- `login` 폴더에 새로운 `layout.tsx` 생성 실험
- 레이아웃이 어떻게 중첩되는지 관찰

**생각해볼 질문:**

1. `app/login/layout.tsx` 파일을 만들면 어떻게 되는가?
2. 루트 레이아웃과 로그인 레이아웃이 동시에 적용되는가?
3. 레이아웃의 중첩 순서는 어떻게 되는가?
4. 로그인 레이아웃에서 `{children}`은 무엇을 렌더링하는가?

**실험해보기:**

```typescript
// app/login/layout.tsx 생성 후 테스트
export default function LoginLayout({ children }) {
  return (
    <div style={{ border: "2px solid red" }}>
      <p>로그인 레이아웃</p>
      {children}
    </div>
  );
}
```

**고민 포인트:**

```
현재 렌더링 순서:
<RootLayout>              ← Header, Footer 여기 있음
  <LoginLayout>           ← 새로 추가한 레이아웃
    <LoginPage>           ← 실제 페이지
    </LoginPage>
  </LoginLayout>
</RootLayout>

문제: 루트 레이아웃을 우회할 수 없음!
해결책: ?
```

---

### Step 3: 문제 상황 정의하기

**요구사항:**

- 왜 중첩 레이아웃으로는 해결할 수 없는지 이해
- 진짜 문제가 무엇인지 파악

**생각해볼 질문:**

1. 로그인 페이지에 루트 레이아웃이 적용되지 않게 할 수 있는가?
2. 루트 레이아웃(`app/layout.tsx`)은 반드시 모든 페이지에 적용되는가?
3. 페이지에 따라 "완전히 다른" 레이아웃을 사용하려면 어떤 방법이 필요한가?
4. 루트 레이아웃을 "건너뛸" 수 있는 방법이 있는가?

**문제 정의:**

```
원하는 것:
- 루트 페이지: Header + Content + Footer
- 로그인 페이지: Content만

현재 구조의 한계:
- 루트 레이아웃은 무조건 모든 페이지에 적용됨
- 중첩 레이아웃은 루트 레이아웃 "안에" 추가될 뿐
- 루트 레이아웃을 우회할 방법이 없음

필요한 것:
- 같은 레벨의 페이지들이 서로 다른 루트 레이아웃을 사용
- URL에는 영향을 주지 않아야 함
```

---

### Step 4: 라우트 그룹 개념 탐구하기

**요구사항:**

- 라우트 그룹이 무엇인지 학습
- 라우트 그룹이 이 문제를 어떻게 해결할 수 있는지 고민

**생각해볼 질문:**

1. `(group)` 형태의 폴더는 URL에 어떤 영향을 주는가?
2. 라우트 그룹 폴더 안에 `layout.tsx`를 만들 수 있는가?
3. 여러 개의 라우트 그룹을 만들 수 있는가?
4. 각 라우트 그룹이 독립적인 레이아웃을 가질 수 있는가?
5. 이것을 활용하면 우리 문제를 어떻게 해결할 수 있는가?

**개념 정리:**

```
라우트 그룹의 특징:
1. (폴더명) - 소괄호로 감싼 폴더
2. URL에 나타나지 않음
3. 레이아웃을 논리적으로 그룹화
4. 각 그룹마다 독립적인 layout.tsx 가능

예시:
app/
├── (with-nav)/
│   ├── layout.tsx      ← Header, Footer 있음
│   └── page.tsx        ← URL: /
└── (without-nav)/
    ├── layout.tsx      ← Header, Footer 없음
    └── login/
        └── page.tsx    ← URL: /login (그룹명 없음!)
```

---

### Step 5: 라우트 그룹으로 레이아웃 분리하기

**요구사항:**

- 루트 레이아웃을 유지한 채로 라우트 그룹 생성
- Header/Footer가 있는 페이지와 없는 페이지를 그룹으로 분리

**생각해볼 질문:**

1. 기존 루트 레이아웃(`app/layout.tsx`)은 어떻게 처리해야 하는가?
2. 어떤 페이지들을 어떤 그룹으로 묶어야 하는가?
3. 그룹 이름은 무엇으로 정하는 것이 좋은가?
4. 각 그룹의 레이아웃에는 무엇을 포함해야 하는가?

**구조 설계 고민:**

```
방법 1: 루트 레이아웃 유지하고 그룹에서 Header/Footer 추가?
app/
├── layout.tsx           ← html, body만?
├── (main)/
│   ├── layout.tsx       ← Header, Footer 추가
│   └── page.tsx
└── (auth)/
    ├── layout.tsx       ← 빈 레이아웃
    └── login/
        └── page.tsx

방법 2: 루트 레이아웃을 각 그룹으로 이동?
app/
├── (with-header)/
│   ├── layout.tsx       ← html, body, Header, Footer
│   └── page.tsx
└── (without-header)/
    ├── layout.tsx       ← html, body만
    └── login/
        └── page.tsx

방법 3: 루트 레이아웃은 최소한만, 공통 부분은 그룹 레이아웃에?

어떤 방법이 좋을까? 각각의 장단점은?
```

---

### Step 6: 실제 폴더 구조 리팩토링하기

**요구사항:**

- 설계한 구조대로 파일과 폴더 재구성
- 각 레이아웃 파일 작성
- 모든 페이지가 올바르게 동작하는지 확인

**구현 힌트:**

```
목표 구조 (예시):
src/
└── app/
    ├── layout.tsx                    ← 기본 html, body 구조만
    ├── (with-layout)/
    │   ├── layout.tsx                ← Header, Footer 여기에
    │   └── page.tsx                  ← URL: /
    └── (auth)/
        ├── layout.tsx                ← Header, Footer 없음
        └── login/
            └── page.tsx              ← URL: /login
```

**각 파일 작성 가이드:**

```typescript
// app/layout.tsx - 무엇을 포함해야 할까?
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* 여기에 Header, Footer를 넣어야 할까? */}
        {children}
      </body>
    </html>
  );
}

// app/(with-layout)/layout.tsx - 무엇을 포함해야 할까?
export default function MainLayout({ children }) {
  return (
    <>
      {/* Header를 여기에? */}
      {children}
      {/* Footer를 여기에? */}
    </>
  );
}

// app/(auth)/layout.tsx - 무엇을 포함해야 할까?
export default function AuthLayout({ children }) {
  return (
    <>
      {/* Header, Footer 없이 children만? */}
      {children}
    </>
  );
}
```

---

### Step 7: 레이아웃 렌더링 흐름 검증하기

**요구사항:**

- 각 페이지의 레이아웃 중첩 구조 이해
- React DevTools로 컴포넌트 트리 확인

**생각해볼 질문:**

1. 루트 페이지(`/`)의 렌더링 순서는?
2. 로그인 페이지(`/login`)의 렌더링 순서는?
3. 두 페이지의 레이아웃 구조가 어떻게 다른가?
4. 라우트 그룹이 컴포넌트 트리에 나타나는가?

**예상 렌더링 구조:**

```
루트 페이지 (/):
<RootLayout>              ← app/layout.tsx
  <MainLayout>            ← app/(with-layout)/layout.tsx
    <Header />
    <HomePage />          ← app/(with-layout)/page.tsx
    <Footer />
  </MainLayout>
</RootLayout>

로그인 페이지 (/login):
<RootLayout>              ← app/layout.tsx
  <AuthLayout>            ← app/(auth)/layout.tsx
    <LoginPage />         ← app/(auth)/login/page.tsx
  </AuthLayout>
</RootLayout>
```

---

### Step 8: 다른 페이지 추가해보기

**요구사항:**

- 같은 그룹에 새 페이지 추가
- 다른 그룹에 새 페이지 추가
- 각각 올바른 레이아웃이 적용되는지 확인

**실험 시나리오:**

1. `(with-layout)` 그룹에 `/about` 페이지 추가
   - Header, Footer가 보여야 함
2. `(auth)` 그룹에 `/signup` 페이지 추가
   - Header, Footer가 없어야 함

**생각해볼 질문:**

1. 새 페이지를 추가할 때 어느 그룹 폴더에 넣어야 하는가?
2. 페이지마다 개별 레이아웃이 필요한가?
3. 그룹 레이아웃은 자동으로 적용되는가?

## 📊 레이아웃 전략 비교표

| 전략               | 구조                    | 장점                 | 단점                      | 사용 사례        |
| ------------------ | ----------------------- | -------------------- | ------------------------- | ---------------- |
| 단일 루트 레이아웃 | `app/layout.tsx`만 사용 | 간단함               | 모든 페이지 동일 레이아웃 | 단순한 사이트    |
| 중첩 레이아웃      | 폴더마다 `layout.tsx`   | 점진적 추가          | 루트 레이아웃 우회 불가   | 섹션별 추가 요소 |
| 라우트 그룹        | `(group)/layout.tsx`    | 완전히 다른 레이아웃 | 구조 복잡도 증가          | 인증/비인증 분리 |
