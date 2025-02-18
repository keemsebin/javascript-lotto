# javascript-lotto 

## 기능 목록

### **입력**

- [ ]  로또 구입 금액 
- [ ]  당첨 번호 
- [ ]  보너스 번호
- [ ]  재입력

### **출력**

- [ ]  발행한 로또 수량 
- [ ]  발행한 로또 번호
- [ ]  당첨내역
- [ ]  수익률
- [ ]  [ERROR] 로 시작하는 에러 메시지

### **기능**

- [x] 입력받은 금액 만큼 로또 티켓 생성
  - [x] 입력받은 금액에 해당하는 로또 개수를 구한다.
  - [x] 정해진 개수만큼 로또를 생성한다.
- [x]  1~ 45 Random 값 생성
  - [x] 중복되지 않는 랜덤값이 6개가 있는 배열을 생성한다.
- [ ]  로또 번호 오름차순 정렬
- [ ]  하나의 로또 티켓 번호와 내가 입력한 로또 번호간의 공통된 번호 개수를 구한다.
- [ ]  일치하는 숫자에 따른 등수를 구한다.
- [ ]  내가 산 전체 로또의 당첨 내역 계산
- [ ]  수익률 계산

### **유효성 검사**

- [ ]  로또 구입 금액
    - [ ]  예외1) 값이 비어있는 경우
    - [ ]  예외2) 숫자가 아닌 경우
    - [ ]  예외3) 0을 입력한 경우
    - [ ]  예외4) 1000원으로 나눠떨어지지 않을 경우
- [ ]  당첨 번호
    - [ ]  예외1) 값이 비어있는 경우
    - [ ]  예외2) 숫자가 아닌 경우
    - [ ]  예외3) 최댓값인 45보다 큰 경우
    - [ ]  예외4) 번호가 중복되는 경우
    - [ ]  예외5) 6개 이상 입력하는 경우
- [ ]  보너스 번호
    - [ ]  예외1) 값이 비어있는 경우
    - [ ]  예외2) 숫자가 아닌 경우
    - [ ]  예외3) 0을 입력한 경우
    - [ ]  예외4) 로또번호와 중복되는 경우

### **lotto constants 목록**

- [ ]  `구입금액을 입력해 주세요.`
- [ ]  `n개를 구매했습니다.`
- [ ]  `당첨 번호를 입력해 주세요.`
- [ ]  `보너스 번호를 입력해 주세요.`
- [ ]  `당첨 통계`
- [ ]  `---`
- [ ]  `,`

### error constants 목록

- [ ]  `[ERROR]`
- [ ]  `숫자를 입력해주세요.`
- [ ]  `값은 0보다 커야합니다.`
- [ ]  `값이 입력되지 않았습니다.`
- [ ]  `로또 번호와 보너스 번호는 중복될 수 없습니다.`
- [ ]  로또 구입 금액
    - [ ]  `금액은 1000원으로 나눠떨어져야 합니다.`
- [ ]  당첨 번호
    - [ ]  `1~45 사이의 값을 입력해주세요.`
    - [ ]  `6개의 숫자를 입력해야 합니다.`
    - [ ]  `숫자는 중복될 수 없습니다.`
    - [ ]  `쉼표를 제외한 다른 특수문자는 사용할 수 없습니다.`