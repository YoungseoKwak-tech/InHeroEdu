export interface ClickableTerm {
  term: string;
  termEn: string;
}

export interface TranscriptSegment {
  time: string;
  text: string;
  clickableTerms: ClickableTerm[];
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  titleEn: string;
  duration: string;
  youtubeId: string;
  topic: string;
  transcript: TranscriptSegment[];
  practiceQuestions: PracticeQuestion[];
  nextLessonId: string | null;
  prevLessonId: string | null;
  order: number;
}

export const lessons: Record<string, Lesson> = {
  "cell-structure": {
    id: "cell-structure",
    courseId: "ap-biology",
    title: "세포의 구조와 기능",
    titleEn: "Cell Structure and Function",
    duration: "18:24",
    youtubeId: "dQw4w9WgXcQ",
    topic: "cell structure and organelles",
    order: 1,
    nextLessonId: "mitochondria",
    prevLessonId: null,
    transcript: [
      {
        time: "0:00",
        text: "안녕하세요! 오늘은 AP Biology에서 가장 기본이 되는 세포 구조에 대해 배워볼 거예요. 모든 생명체의 기본 단위인 세포는 크게 원핵세포와 진핵세포로 나뉩니다.",
        clickableTerms: [
          { term: "원핵세포", termEn: "prokaryotic cell" },
          { term: "진핵세포", termEn: "eukaryotic cell" },
        ],
      },
      {
        time: "1:30",
        text: "진핵세포에는 막으로 둘러싸인 세포소기관들이 있습니다. 핵은 유전정보를 담고 있으며, 핵막으로 보호됩니다. 핵 안에는 DNA와 히스톤 단백질로 이루어진 염색질이 있어요.",
        clickableTerms: [
          { term: "세포소기관", termEn: "organelle" },
          { term: "핵막", termEn: "nuclear envelope" },
          { term: "염색질", termEn: "chromatin" },
        ],
      },
      {
        time: "3:45",
        text: "세포막은 인지질 이중층으로 구성되어 있습니다. 이 구조 덕분에 세포막은 선택적 투과성을 가지게 되죠. 단백질들이 막에 박혀있어서 물질의 이동을 조절합니다.",
        clickableTerms: [
          { term: "인지질 이중층", termEn: "phospholipid bilayer" },
          { term: "선택적 투과성", termEn: "selective permeability" },
        ],
      },
      {
        time: "5:20",
        text: "리보솜은 단백질을 합성하는 공장이에요. 거친면 소포체와 연결되어 있거나 세포질 내에 자유롭게 떠 있기도 합니다. mRNA의 정보를 읽어서 아미노산을 연결해줍니다.",
        clickableTerms: [
          { term: "리보솜", termEn: "ribosome" },
          { term: "거친면 소포체", termEn: "rough endoplasmic reticulum" },
          { term: "mRNA", termEn: "messenger RNA" },
        ],
      },
      {
        time: "7:10",
        text: "골지체는 세포의 택배 시스템이라고 생각하면 돼요. 소포체에서 만들어진 단백질을 받아서 수정하고, 적절한 곳으로 보내줍니다. 시스면에서 받아서 트랜스면으로 내보내죠.",
        clickableTerms: [
          { term: "골지체", termEn: "Golgi apparatus" },
          { term: "시스면", termEn: "cis face" },
          { term: "트랜스면", termEn: "trans face" },
        ],
      },
      {
        time: "9:30",
        text: "리소솜은 세포 내 소화기관입니다. 가수분해효소를 이용해서 낡은 세포소기관이나 외부에서 들어온 물질을 분해합니다. pH가 낮은 산성 환경을 유지해요.",
        clickableTerms: [
          { term: "리소솜", termEn: "lysosome" },
          { term: "가수분해효소", termEn: "hydrolytic enzyme" },
        ],
      },
      {
        time: "11:45",
        text: "세포골격은 세포의 모양을 유지하고 세포소기관의 이동을 돕습니다. 미세섬유, 중간섬유, 미세소관 세 종류가 있어요. 미세소관은 방추사의 구성 성분이기도 합니다.",
        clickableTerms: [
          { term: "세포골격", termEn: "cytoskeleton" },
          { term: "미세소관", termEn: "microtubule" },
          { term: "방추사", termEn: "spindle fiber" },
        ],
      },
    ],
    practiceQuestions: [
      {
        id: "cs-q1",
        question: "다음 중 원핵세포에만 있는 특징은?",
        options: [
          "리보솜이 있다",
          "DNA를 가지고 있다",
          "핵막이 없다",
          "세포막이 있다",
        ],
        correctIndex: 2,
        explanation: "원핵세포의 가장 큰 특징은 핵막(nuclear envelope)이 없다는 것입니다. DNA가 세포질에 직접 노출되어 있으며, 막으로 둘러싸인 세포소기관이 없습니다. 리보솜, DNA, 세포막은 원핵세포와 진핵세포 모두 가지고 있습니다.",
      },
      {
        id: "cs-q2",
        question: "골지체의 주요 기능으로 가장 적절한 것은?",
        options: [
          "ATP 생산",
          "단백질 합성",
          "단백질 수정 및 분류",
          "광합성",
        ],
        correctIndex: 2,
        explanation: "골지체(Golgi apparatus)는 소포체에서 받은 단백질을 수정하고, 표지를 붙여서 적절한 목적지(세포막, 리소솜, 세포 외부 등)로 보내는 역할을 합니다. ATP 생산은 미토콘드리아, 단백질 합성은 리보솜, 광합성은 엽록체의 기능입니다.",
      },
      {
        id: "cs-q3",
        question: "세포막의 인지질 이중층에서 친수성 머리 부분이 향하는 방향은?",
        options: [
          "두 층 모두 안쪽을 향한다",
          "두 층 모두 바깥쪽을 향한다",
          "바깥층은 세포 외부, 안쪽층은 세포질 쪽을 향한다",
          "무작위 방향으로 배열된다",
        ],
        correctIndex: 2,
        explanation: "인지질 이중층에서 친수성(hydrophilic) 머리 부분은 물과 접촉하는 방향을 향합니다. 바깥층의 머리는 세포 외부의 수용액을 향하고, 안쪽층의 머리는 세포질(cytoplasm)을 향합니다. 소수성(hydrophobic) 꼬리 부분은 서로 마주보며 안쪽에 위치합니다.",
      },
    ],
  },

  "mitochondria": {
    id: "mitochondria",
    courseId: "ap-biology",
    title: "미토콘드리아와 세포 호흡",
    titleEn: "Mitochondria and Cellular Respiration",
    duration: "22:10",
    youtubeId: "dQw4w9WgXcQ",
    topic: "mitochondria and cellular respiration",
    order: 2,
    nextLessonId: "dna-replication",
    prevLessonId: "cell-structure",
    transcript: [
      {
        time: "0:00",
        text: "오늘은 '세포의 발전소'라고 불리는 미토콘드리아에 대해 배울 거예요. 미토콘드리아는 세포 호흡을 통해 ATP를 생산합니다. ATP는 세포가 사용하는 에너지 화폐예요.",
        clickableTerms: [
          { term: "미토콘드리아", termEn: "mitochondria" },
          { term: "세포 호흡", termEn: "cellular respiration" },
          { term: "ATP", termEn: "adenosine triphosphate" },
        ],
      },
      {
        time: "2:00",
        text: "미토콘드리아는 이중막 구조를 가집니다. 외막과 내막 사이에는 막간 공간이 있고, 내막이 안쪽으로 접힌 크리스타라는 구조가 있어요. 내막 안쪽은 미토콘드리아 기질이라고 부릅니다.",
        clickableTerms: [
          { term: "크리스타", termEn: "cristae" },
          { term: "미토콘드리아 기질", termEn: "mitochondrial matrix" },
          { term: "막간 공간", termEn: "intermembrane space" },
        ],
      },
      {
        time: "4:30",
        text: "세포 호흡의 첫 단계는 해당과정입니다. 세포질에서 일어나며, 포도당 하나가 2개의 피루브산으로 분해됩니다. 이 과정에서 순 2ATP와 2NADH가 만들어져요.",
        clickableTerms: [
          { term: "해당과정", termEn: "glycolysis" },
          { term: "피루브산", termEn: "pyruvate" },
          { term: "NADH", termEn: "NADH" },
        ],
      },
      {
        time: "7:15",
        text: "피루브산은 미토콘드리아 기질로 이동해서 피루브산 산화 과정을 거쳐 아세틸-CoA가 됩니다. 이 과정에서 이산화탄소가 방출되고 NADH가 생성됩니다.",
        clickableTerms: [
          { term: "아세틸-CoA", termEn: "acetyl-CoA" },
          { term: "피루브산 산화", termEn: "pyruvate oxidation" },
        ],
      },
      {
        time: "10:00",
        text: "크렙스 회로는 미토콘드리아 기질에서 일어납니다. 아세틸-CoA가 옥살로아세트산과 결합하여 구연산이 되고, 여러 단계를 거쳐 다시 옥살로아세트산으로 돌아옵니다. 1회전당 3NADH, 1FADH2, 1ATP가 생산됩니다.",
        clickableTerms: [
          { term: "크렙스 회로", termEn: "Krebs cycle" },
          { term: "옥살로아세트산", termEn: "oxaloacetate" },
          { term: "FADH2", termEn: "FADH2" },
        ],
      },
      {
        time: "14:30",
        text: "산화적 인산화는 미토콘드리아 내막에서 일어납니다. 전자전달계를 통해 NADH와 FADH2의 전자가 전달되면서 수소 이온 농도 기울기가 형성됩니다. ATP 합성효소가 이 기울기를 이용해서 ATP를 대량 생산합니다.",
        clickableTerms: [
          { term: "산화적 인산화", termEn: "oxidative phosphorylation" },
          { term: "전자전달계", termEn: "electron transport chain" },
          { term: "ATP 합성효소", termEn: "ATP synthase" },
        ],
      },
    ],
    practiceQuestions: [
      {
        id: "mito-q1",
        question: "해당과정이 일어나는 장소는?",
        options: [
          "미토콘드리아 기질",
          "미토콘드리아 내막",
          "세포질",
          "핵",
        ],
        correctIndex: 2,
        explanation: "해당과정(glycolysis)은 세포질(cytoplasm)에서 일어납니다. 산소 없이도 진행되는 과정이며, 미토콘드리아가 없는 원핵세포에서도 일어날 수 있습니다. 크렙스 회로는 미토콘드리아 기질에서, 산화적 인산화는 미토콘드리아 내막에서 일어납니다.",
      },
      {
        id: "mito-q2",
        question: "포도당 1분자의 완전한 산화로 만들어지는 ATP의 최대 개수는 (이론적으로)?",
        options: ["2개", "4개", "32~34개", "100개"],
        correctIndex: 2,
        explanation: "포도당 1분자의 완전한 산화에서 이론적으로 약 30~32개(또는 36~38개, 교재에 따라 다름)의 ATP가 생산됩니다. AP Biology에서는 보통 약 30~32개로 표기합니다. 해당과정에서 2개, 크렙스 회로에서 2개, 산화적 인산화에서 나머지 대부분이 생산됩니다.",
      },
      {
        id: "mito-q3",
        question: "미토콘드리아의 크리스타(cristae) 구조의 기능은?",
        options: [
          "DNA를 저장한다",
          "표면적을 늘려 ATP 생산 효율을 높인다",
          "단백질을 합성한다",
          "세포질과 핵을 연결한다",
        ],
        correctIndex: 1,
        explanation: "크리스타는 미토콘드리아 내막이 안쪽으로 접힌 구조로, 내막의 표면적을 크게 늘립니다. 전자전달계와 ATP 합성효소가 내막에 위치하기 때문에, 표면적이 넓을수록 더 많은 단백질 복합체가 들어갈 수 있어 ATP 생산 효율이 높아집니다.",
      },
    ],
  },

  "dna-replication": {
    id: "dna-replication",
    courseId: "ap-biology",
    title: "DNA 복제 과정",
    titleEn: "DNA Replication",
    duration: "20:45",
    youtubeId: "dQw4w9WgXcQ",
    topic: "DNA replication and the enzymes involved",
    order: 3,
    nextLessonId: "photosynthesis",
    prevLessonId: "mitochondria",
    transcript: [
      {
        time: "0:00",
        text: "DNA 복제는 세포 분열 전에 반드시 일어나야 하는 과정이에요. 반보존적 복제 방식으로 진행되는데, 원래 두 가닥 각각이 새 가닥의 주형이 됩니다.",
        clickableTerms: [
          { term: "반보존적 복제", termEn: "semi-conservative replication" },
          { term: "주형", termEn: "template strand" },
        ],
      },
      {
        time: "2:30",
        text: "복제는 복제 원점에서 시작됩니다. 헬리케이스가 수소 결합을 끊어 DNA 이중 나선을 풀어줍니다. 이렇게 열린 복제 분기점에서 새로운 DNA 합성이 시작되죠.",
        clickableTerms: [
          { term: "복제 원점", termEn: "origin of replication" },
          { term: "헬리케이스", termEn: "helicase" },
          { term: "복제 분기점", termEn: "replication fork" },
        ],
      },
      {
        time: "5:00",
        text: "DNA 중합효소는 기존 가닥을 주형으로 삼아 새 가닥을 합성합니다. 하지만 DNA 중합효소는 혼자서 합성을 시작할 수 없어서 프라이메이스가 먼저 RNA 프라이머를 만들어줍니다.",
        clickableTerms: [
          { term: "DNA 중합효소", termEn: "DNA polymerase" },
          { term: "프라이메이스", termEn: "primase" },
          { term: "RNA 프라이머", termEn: "RNA primer" },
        ],
      },
      {
        time: "8:20",
        text: "선도 가닥은 복제 분기점 방향으로 연속적으로 합성됩니다. 하지만 지연 가닥은 반대 방향으로만 합성이 가능해서 짧은 오카자키 절편들이 불연속적으로 만들어집니다.",
        clickableTerms: [
          { term: "선도 가닥", termEn: "leading strand" },
          { term: "지연 가닥", termEn: "lagging strand" },
          { term: "오카자키 절편", termEn: "Okazaki fragments" },
        ],
      },
      {
        time: "12:00",
        text: "DNA 연결효소는 오카자키 절편들을 연결해서 하나의 연속된 가닥으로 만들어줍니다. 또한 DNA 중합효소 I은 RNA 프라이머를 DNA로 교체합니다.",
        clickableTerms: [
          { term: "DNA 연결효소", termEn: "DNA ligase" },
        ],
      },
    ],
    practiceQuestions: [
      {
        id: "dna-q1",
        question: "DNA 복제에서 헬리케이스(helicase)의 역할은?",
        options: [
          "뉴클레오타이드를 연결한다",
          "RNA 프라이머를 합성한다",
          "이중 나선 DNA를 풀어준다",
          "오카자키 절편을 연결한다",
        ],
        correctIndex: 2,
        explanation: "헬리케이스는 DNA 이중 나선을 유지하는 수소 결합을 끊어서 두 가닥을 분리합니다. 이렇게 DNA가 풀려야 각 가닥이 주형으로 사용될 수 있습니다. RNA 프라이머 합성은 프라이메이스, 뉴클레오타이드 연결은 DNA 중합효소, 오카자키 절편 연결은 DNA 연결효소의 역할입니다.",
      },
      {
        id: "dna-q2",
        question: "반보존적 복제의 결과로 생성되는 두 딸세포 DNA의 구성은?",
        options: [
          "두 딸 DNA 모두 완전히 새로운 가닥으로 구성",
          "각 딸 DNA는 원래 가닥 하나와 새 가닥 하나로 구성",
          "하나는 원래 두 가닥, 하나는 새로운 두 가닥",
          "두 딸 DNA 모두 원래 가닥의 일부를 포함",
        ],
        correctIndex: 1,
        explanation: "반보존적 복제(semi-conservative replication)에서는 원래 DNA의 두 가닥이 각각 새 가닥의 주형이 됩니다. 따라서 복제 후 각 딸 DNA 분자는 원래 가닥(주형) 하나와 새로 합성된 가닥 하나로 구성됩니다. 이는 Meselson-Stahl 실험으로 증명되었습니다.",
      },
      {
        id: "dna-q3",
        question: "오카자키 절편이 형성되는 이유는?",
        options: [
          "DNA 중합효소가 너무 작아서",
          "DNA 중합효소가 3'→5' 방향으로만 합성하기 때문에",
          "DNA 중합효소가 5'→3' 방향으로만 합성하기 때문에",
          "ATP가 부족해서",
        ],
        correctIndex: 2,
        explanation: "DNA 중합효소는 새로운 뉴클레오타이드를 5'→3' 방향으로만 추가할 수 있습니다. 복제 분기점이 열리는 방향에 반대인 지연 가닥(lagging strand)에서는 이 방향으로 연속 합성이 불가능하여, 짧은 조각들(오카자키 절편)을 불연속적으로 합성한 뒤 나중에 연결합니다.",
      },
    ],
  },

  "photosynthesis": {
    id: "photosynthesis",
    courseId: "ap-biology",
    title: "광합성의 두 단계",
    titleEn: "Photosynthesis: Light and Dark Reactions",
    duration: "24:30",
    youtubeId: "dQw4w9WgXcQ",
    topic: "photosynthesis including light-dependent and light-independent reactions",
    order: 4,
    nextLessonId: "cell-division",
    prevLessonId: "dna-replication",
    transcript: [
      {
        time: "0:00",
        text: "광합성은 식물, 조류, 일부 세균이 빛 에너지를 화학 에너지로 전환하는 과정입니다. 엽록체에서 일어나며, 크게 명반응과 캘빈 회로 두 단계로 나뉩니다.",
        clickableTerms: [
          { term: "광합성", termEn: "photosynthesis" },
          { term: "엽록체", termEn: "chloroplast" },
          { term: "명반응", termEn: "light-dependent reactions" },
          { term: "캘빈 회로", termEn: "Calvin cycle" },
        ],
      },
      {
        time: "3:00",
        text: "엽록체의 구조를 먼저 봐야 해요. 엽록체는 이중막 구조이며, 안에는 그라나라는 납작한 막 주머니 구조가 있어요. 그라나를 이루는 각 납작한 주머니를 틸라코이드라고 합니다. 틸라코이드 사이사이의 액체는 스트로마예요.",
        clickableTerms: [
          { term: "그라나", termEn: "granum/grana" },
          { term: "틸라코이드", termEn: "thylakoid" },
          { term: "스트로마", termEn: "stroma" },
        ],
      },
      {
        time: "7:00",
        text: "명반응은 틸라코이드 막에서 일어납니다. 엽록소가 빛을 흡수하면 물이 분해되면서 산소가 방출됩니다. 동시에 ATP와 NADPH가 생성되어 캘빈 회로에 공급됩니다.",
        clickableTerms: [
          { term: "엽록소", termEn: "chlorophyll" },
          { term: "NADPH", termEn: "NADPH" },
        ],
      },
      {
        time: "12:00",
        text: "캘빈 회로는 스트로마에서 일어나며 명반응의 산물인 ATP와 NADPH를 이용해 이산화탄소를 당으로 고정합니다. RuBisCO 효소가 CO2를 C3 화합물인 3-PGA로 고정합니다. 최종적으로 포도당이 만들어집니다.",
        clickableTerms: [
          { term: "RuBisCO", termEn: "RuBisCO" },
          { term: "탄소 고정", termEn: "carbon fixation" },
          { term: "3-PGA", termEn: "3-phosphoglycerate" },
        ],
      },
    ],
    practiceQuestions: [
      {
        id: "photo-q1",
        question: "광합성의 명반응이 일어나는 장소는?",
        options: ["스트로마", "틸라코이드 막", "세포질", "미토콘드리아"],
        correctIndex: 1,
        explanation: "명반응(light-dependent reactions)은 틸라코이드 막(thylakoid membrane)에서 일어납니다. 여기서 빛 에너지를 이용해 물을 분해하고(광분해), ATP와 NADPH를 생산합니다. 캘빈 회로(명칭 이 없는 반응)는 스트로마에서 일어납니다.",
      },
      {
        id: "photo-q2",
        question: "캘빈 회로에서 CO2 고정을 담당하는 효소는?",
        options: ["헬리케이스", "ATP 합성효소", "RuBisCO", "DNA 중합효소"],
        correctIndex: 2,
        explanation: "RuBisCO(ribulose bisphosphate carboxylase/oxygenase)는 대기 중의 CO2를 RuBP(5탄소 화합물)와 결합시켜 3-PGA(3탄소 화합물)를 만드는 탄소 고정 반응을 촉매합니다. 지구에서 가장 풍부한 효소 중 하나입니다.",
      },
      {
        id: "photo-q3",
        question: "광합성에서 산소(O2)는 어디서 유래하는가?",
        options: ["CO2의 분해", "물(H2O)의 분해", "포도당의 분해", "ATP의 분해"],
        correctIndex: 1,
        explanation: "광합성에서 방출되는 산소는 물(H2O)의 광분해(photolysis)에서 유래합니다. 명반응 중 광계 II에서 물 분자가 분해되어 산소, 수소 이온, 전자가 생성됩니다. 이 반응의 부산물로 산소가 대기 중으로 방출됩니다.",
      },
    ],
  },

  "cell-division": {
    id: "cell-division",
    courseId: "ap-biology",
    title: "세포 분열: 유사분열과 감수분열",
    titleEn: "Cell Division: Mitosis and Meiosis",
    duration: "26:15",
    youtubeId: "dQw4w9WgXcQ",
    topic: "mitosis and meiosis in cell division",
    order: 5,
    nextLessonId: null,
    prevLessonId: "photosynthesis",
    transcript: [
      {
        time: "0:00",
        text: "세포 분열에는 두 가지 종류가 있어요. 체세포 분열인 유사분열과 생식세포를 만드는 감수분열입니다. 먼저 세포 주기부터 이해해봅시다.",
        clickableTerms: [
          { term: "유사분열", termEn: "mitosis" },
          { term: "감수분열", termEn: "meiosis" },
          { term: "세포 주기", termEn: "cell cycle" },
        ],
      },
      {
        time: "2:30",
        text: "세포 주기는 간기와 분열기로 나뉩니다. 간기는 G1, S, G2 단계로 구성됩니다. S기에서 DNA 복제가 일어나고, G1과 G2는 성장과 준비 단계예요.",
        clickableTerms: [
          { term: "간기", termEn: "interphase" },
          { term: "G1 단계", termEn: "G1 phase" },
          { term: "S기", termEn: "S phase" },
        ],
      },
      {
        time: "6:00",
        text: "유사분열의 단계: 전기, 전중기, 중기, 후기, 말기. 전기에서 염색사가 응축되어 염색체가 됩니다. 중기에서 염색체들이 세포 중앙(적도판)에 정렬합니다. 후기에서 방추사가 자매 염색분체를 분리시킵니다.",
        clickableTerms: [
          { term: "염색체", termEn: "chromosome" },
          { term: "자매 염색분체", termEn: "sister chromatid" },
          { term: "적도판", termEn: "metaphase plate" },
        ],
      },
      {
        time: "13:00",
        text: "감수분열은 2회 연속 분열로 4개의 반수체 세포를 만듭니다. 감수분열 I에서는 상동염색체가 분리됩니다. 이 때 교차가 일어나 유전적 재조합이 생깁니다.",
        clickableTerms: [
          { term: "상동염색체", termEn: "homologous chromosomes" },
          { term: "교차", termEn: "crossing over" },
          { term: "유전적 재조합", termEn: "genetic recombination" },
          { term: "반수체", termEn: "haploid" },
        ],
      },
    ],
    practiceQuestions: [
      {
        id: "cd-q1",
        question: "유사분열 중기(metaphase)의 특징은?",
        options: [
          "핵막이 재형성된다",
          "DNA 복제가 일어난다",
          "염색체가 적도판에 정렬된다",
          "자매 염색분체가 분리된다",
        ],
        correctIndex: 2,
        explanation: "유사분열 중기에는 응축된 염색체들이 방추사에 의해 세포 중앙의 적도판(metaphase plate)에 정렬됩니다. 이 배열은 다음 단계인 후기에서 자매 염색분체가 균등하게 분리될 수 있도록 합니다. 핵막 재형성은 말기, DNA 복제는 S기, 자매 염색분체 분리는 후기에 일어납니다.",
      },
      {
        id: "cd-q2",
        question: "감수분열이 유사분열과 다른 가장 중요한 점은?",
        options: [
          "DNA 복제가 일어난다",
          "2n → n으로 염색체 수가 반감된다",
          "세포막이 수축된다",
          "미토콘드리아가 복제된다",
        ],
        correctIndex: 1,
        explanation: "감수분열의 핵심 차이는 상동염색체의 분리로 인해 염색체 수가 2n(이배체)에서 n(반수체)으로 반감된다는 것입니다. 이를 통해 생식세포(정자, 난자)가 만들어지며, 수정 시 다시 2n이 됩니다. 유사분열은 2n → 2n으로 염색체 수를 유지합니다.",
      },
      {
        id: "cd-q3",
        question: "교차(crossing over)가 일어나는 시점은?",
        options: [
          "유사분열 중기",
          "감수분열 I 전기",
          "S기",
          "감수분열 II 중기",
        ],
        correctIndex: 1,
        explanation: "교차(crossing over)는 감수분열 I 전기(prophase I)에서 상동염색체가 이가염색체(bivalent)를 형성할 때 일어납니다. 상동염색체의 비자매 염색분체 사이에서 DNA 절편이 교환되어 유전적 재조합이 일어나고, 이것이 생물 다양성의 중요한 원천이 됩니다.",
      },
    ],
  },
};

export function getLessonsByCourse(courseId: string): Lesson[] {
  return Object.values(lessons)
    .filter((l) => l.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}
