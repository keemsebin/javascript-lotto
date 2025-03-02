# javascript-lotto 

## 1단계 폴더 구조

```
├── __test__
│   ├── Lotto.test.js
│   ├── LottoMachine.test.js
│   ├── LottoResult.test.js
│   ├── LottoShop.test.js
│   ├── LottoValidator.test.js
│   ├── Price.test.js
│   └── PriceValidator.test.js
└── src/ 
    ├── domain/
    │   ├── Lotto.js
    │   ├── LottoMachine.js
    │   ├── LottoNumber.js
    │   ├── LottoResult.js
    │   ├── LottoShop.js
    │   └── Price.js
    ├── utils/
    │   ├── count.js
    │   ├── random.js
    │   ├── throwError.js
    │   └── validation.js     
    ├── view/
    │   ├── message.js
    │   ├── Input.js
    │   └── Output.js   
    ├── step1-index.js
    └── step2-index.js
```

## 1단계 기능 목록

### **입력**

- [x]  로또 구입 금액 
- [x]  당첨 번호 
- [x]  보너스 번호
- [x]  재입력

### **출력**

- [x]  발행한 로또 수량 
- [x]  발행한 로또 번호
- [x]  당첨내역
- [x]  수익률
- [x]  [ERROR] 로 시작하는 에러 메시지

### **기능**

- [x] 입력받은 금액 만큼 로또 티켓 생성
  - [x] 입력받은 금액에 해당하는 로또 개수를 구한다.
  - [x] 정해진 개수만큼 로또를 생성한다.
- [x]  1~ 45 Random 값 생성
  - [x] 중복되지 않는 랜덤값이 6개가 있는 배열을 생성한다.
- [x]  로또 번호 오름차순 정렬
- [x]  하나의 로또 티켓 번호와 내가 입력한 로또 번호간의 공통된 번호 개수를 구한다.
- [x] 발행한 로또 번호와 입력한 로또 번호/보너스 번호의 일치 갯수를 기반으로 로또 상태를 매칭한다.
    - [x] 매칭된 갯수를 담은 배열을 구한다.
    - [x] 발행된 로또 번호들을 기반으로 보너스 숫자 존재 여부를 가진 배열을 구한다.
- [x]  내가 산 전체 로또의 당첨 내역 계산
- [x]  수익률 계산
    -[x] 로또의 총 수입을 구한다

### **유효성 검사**

- [x]  로또 구입 금액
    - [x]  예외1) 값이 비어있는 경우
    - [x]  예외2) 숫자가 아닌 경우
    - [x]  예외3) 범위를 벗어난 경우
    - [x]  예외4) 1000원으로 나눠떨어지지 않을 경우
- [x]  당첨 번호
    - [x]  예외1) 값이 비어있는 경우
    - [x]  예외2) 숫자가 아닌 경우
    - [x]  예외3) 범위를 벗어난 경우
    - [x]  예외4) 번호가 중복되는 경우
    - [x]  예외5) 6개가 아닌 경우
- [x]  보너스 번호
    - [x]  예외1) 값이 비어있는 경우
    - [x]  예외2) 숫자가 아닌 경우
    - [x]  예외3) 범위를 벗어난 경우
    - [x]  예외4) 로또번호와 중복되는 경우
- [x] 재시도 여부
    - [x] 예외1) y또는 n이 아닌 문자를 입력한 경우

### **lotto constants 목록**

- [x]  `구입금액을 입력해 주세요.`
- [x]  `n개를 구매했습니다.`
- [x]  `당첨 번호를 입력해 주세요.`
- [x]  `보너스 번호를 입력해 주세요.`
- [x]  `당첨 통계`
- [x]  `---`
- [ ]  `,`

### error constants 목록

- [x]  `[ERROR]`
- [x]  `숫자가 아닌 값은 입력할 수 없습니다.`
- [x]  `범위를 벗어난 입력은 할 수 없습니다.`
- [x]  `값이 입력되지 않았습니다.`
- [x]  `로또 번호와 보너스 번호는 중복될 수 없습니다.`
- [x]  로또 구입 금액
    - [x]  `금액은 1000원으로 나눠떨어져야 합니다.`
- [x]  당첨 번호
    - [x]  `6개의 숫자를 입력해야 합니다.`
    - [x]  `숫자는 중복될 수 없습니다.`

## 2단계 폴더 구조

├── step2-web
├── component/ 
│   ├── common
│   │   ├── Box
│   │   ├── Button
│   │   ├── Input
│   │   ├── Modal
│   │   ├── Style
│   │   ├── Table
│   │   └── Text
│   └── feature
│       ├── Footer
│       ├── Header
│       ├── LottoMachine
│       ├── LottoShop
│       ├── NumberForm
│       └── PriceForm
├── core/ 
│   └── component.js
└── helper/ 
    └── style.js

## 2단계 기능 목록

- [x] 부모 Component class 구현 

### 공통 컴포넌트 분리 
- [x] Box 컴포넌트
- [x] Button 컴포넌트
- [x] Input 컴포넌트
- [x] Modal 컴포넌트
- [x] Table 컴포넌트
- [x] Text 컴포넌트

### feature 컴포넌트 분리
- [x] Header 컴포넌트
- [x] Footer 컴포넌트
- [x] LottoMachine 컴포넌트
- [x] LottoResultBox 컴포넌트
- [x] LottoShop 컴포넌트
- [x] NumberForm 컴포넌트
- [x] PriceForm 컴포넌트

### css 작성

- [x] 공통으로 사용될 width, height, position, margin
- [x] colors 
- [x] flex
- [x] layout 초기화
- [x] text

### 도메인 연결

- [x] PriceDomain 연결
- [x] LottoNumberDomain 연결
- [x] Lotto 연결
- [x] LottoMachine 연결
- [x] LottoResult 연결
- [x] LottoResult 연결


