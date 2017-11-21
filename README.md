Project.Hamilton
================

proj.document
-------------

Milestone2(17.11.20) ver
------------------------

# 게임 디자인 필라
- 전략형 디펜스 게임 
- 공격과 수비를 모두 조율
- 심플한 디자인... 단순한 그래픽과 UI 
- 웹 게임으로 제작... 쉬운 조작

# 게임 요소 및 규칙
## 타워 (tower)
- 해당 정점에 온 적군을 반드시 공격하고, 공격을 택한 적군에게 공격받는다.  
- 세울 수 있는 타워의 수는 제한적이며, 본진 타워를 제외하곤 HP가 모두 동일하다.

## 부대 (army) 
- 부대의 HP는 군사 수와 동일한 개념이다.   
- 소환할 때마다 부대 당 군사의 수는 제한 되어 있고, 필드에 존재 가능한 전체 군사의 수 역시 제한되어 있다. 
- 타워가 있는 정점에서는 진격/공격을 택할 수 있는데, 무엇을 고르든 항상 HP가 깎이지만 공격을 택할 경우 타워를 공격할 수 있으며 타워를 파괴하면 소환 가능한 부대의 **군사 수가 소폭 증가**한다.   
- 필드에서 부대를 합치는 것이 가능하다.  
- 부대 간 전투는 양 부대가 동일한 정점에 있을 때 발생하며, 서로 공격하되 공격하는 측의 군사 수의 절반만큼 HP가 감소한다. (보류)

## 경로 (path)
- 나의 경로와 상대방의 경로는 독립적인 해밀턴 경로이다.

## 게임 진행 (D 페이즈)
- 턴을 번갈아가며 경로를 만들고 타워를 설치한다.   
- 경로를 짜면서 현재 위치한 타워를 클릭하면 타워가 설치된다.  
- 해밀턴 경로가 아니라면 경로를 완성할 수 없다. 
- 한 명의 플레이어만 경로를 완성하고 모든 타워를 설치했다면 다른 한명이 완성할 때까지 대기한다.  
- 모든 플레이어가 경로를 완성하고 모든 타워를 설치했다면 페이즈가 전환된다.

## 게임 진행 (A 페이즈)
- 부대를 생성 및 이동한다. 생성된 모든 부대(군대)는 일반적으로 다같이(동시에) 진군하게 된다.  
- 자신의 본진을 클릭하면 하나의 부대가 생성된다.
- 기본 선택지는 진군 뿐이지만 자신의 부대가 적의 타워 위에 있으면 공격 선택지가 추가된다. 
- 복수의 부대는 그 위치에 상관없이 선택에 따라 다같이 행동하게 된다.
 
># (17.11.20 김범주) 진행사항과 논의할 점들
>## D페이즈 경로 수정에 관하여..
>- 현재 한명이 경로를 완성하면 다른 한명이 완성할때까지 기다림
>- 그러나 이때를 노리고 **한명이 경로를 모두 수정**해버리면 먼저 완성한 사람이 손해라고 생각하여..
>- 한명이 완성하면 다른 한명은 경로 취소를 하지 못하게 했음(경로 마지막 위치의 타워 설치/해체는 가능)
>- 근데 이렇게 하면 **한명이 해밀턴 경로를 만들수 없는 사태**가 발생할 수 있음. 이때도 게임 오버 처리를 해야하는가?
>## 필요할 수도 있는 알고리즘
>- 현재 vertex와 edge정보, 그리고 이미 완성된 path가 주어질 때 기존의 path에 vertex를 추가로 잇는 방식으로 해밀턴 경로를 만들 수 있는가?
>## TODOS
>1. D phase 게임 오버 처리
>2. 군사수 증가
>3. 메세지 표시
>4. 군사 원 채우고 글씨 하얀색 + 크기 조금 키우기
>5. 배경 사운드 고려