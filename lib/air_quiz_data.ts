/**
 * AIR (AI Replacement Risk) Quiz Data
 *
 * 四维度 × 4题 = 16题核心问卷 + 4题AI现状快照 + 3题附加调研
 * 每维度取极性 → 2⁴ = 16 种职业画像类型
 * 每维度2正向+2反向，总计8正向/8反向 = 50/50完美平衡
 */

export type QuizAnswer = 1 | 2 | 3 | 4 | 5;

/** Localized string supporting all 5 UI languages. ja/ko/de fall back to en if absent. */
export type L10n = { en: string; zh: string; ja?: string; ko?: string; de?: string };

export interface QuizQuestion {
  id: string;
  indicator: string;
  direction: 'forward' | 'reverse'; // forward: high = AI favorable; reverse: high = AI resistant
  question: L10n;
  options: L10n[]; // index 0 = score 1, index 4 = score 5
}

export interface QuizDimension {
  id: string;
  name: L10n;
  description: L10n;
  favorableLabel: L10n; // E, O, F, P side
  resistantLabel: L10n; // T, S, R, H side
  favorableLetter: string; // E, O, F, P
  resistantLetter: string; // T, S, R, H
  questions: QuizQuestion[];
}

export interface AISnapshotQuestion {
  id: string;
  indicator: string;
  direction: 'forward' | 'reverse';
  question: L10n;
  options: L10n[];
}

export interface SurveyQuestion {
  id: string;
  topic: L10n;
  question: L10n;
  options: L10n[];
}

export interface ProfileType {
  code: string;
  name: { en: string; zh: string };
  /** Evocative archetype title for social sharing */
  archetype: { en: string; zh: string };
  /** One-line tagline that makes people say "that's so me" */
  tagline: { en: string; zh: string };
  /** The unique strength AI can't replicate */
  superpower: { en: string; zh: string };
  /** The vulnerability AI exploits */
  kryptonite: { en: string; zh: string };
  /** Signature color for visual identity (hex) */
  color: string;
  /** Emoji icon for quick visual recognition */
  icon: string;
  description: { en: string; zh: string };
  typicalJobs: { en: string; zh: string };
  riskTier: 'extreme-high' | 'high' | 'medium' | 'low' | 'extreme-low';
  /** Primary SOC major group code for job inference */
  primarySOC: number;
}

// ─── Dimension 1: Learnability ───────────────────────────────────────────────

const DIMENSION_LEARNABILITY: QuizDimension = {
  id: 'learnability',
  name: { en: 'Learnability', zh: '可学习性', ja: '学習可能性', ko: '학습 가능성', de: 'Lernbarkeit' },
  description: {
    en: 'Can AI acquire and learn the knowledge and skills your job requires?',
    zh: 'AI能否获取并学习你的工作所需的知识和技能？',
    ja: 'AIはあなたの仕事に必要な知識やスキルを習得・学習できますか？',
    ko: 'AI가 당신의 업무에 필요한 지식과 기술을 습득하고 학습할 수 있나요?',
    de: 'Kann KI das Wissen und die Fähigkeiten erwerben und erlernen, die Ihr Job erfordert?',
  },
  favorableLabel: { en: 'Explicit (E)', zh: '显性型 (E)', ja: '顕在型 (E)', ko: '명시적 (E)', de: 'Explizit (E)' },
  resistantLabel: { en: 'Tacit (T)', zh: '隐性型 (T)', ja: '暗黙型 (T)', ko: '암묵적 (T)', de: 'Implizit (T)' },
  favorableLetter: 'E',
  resistantLetter: 'T',
  questions: [
    {
      id: 'Q1',
      indicator: 'Digitalization',
      direction: 'forward',
      question: {
        en: 'Where is your daily work mainly done?',
        zh: '你的日常工作主要在哪里完成？',
        ja: 'あなたの日常業務は主にどこで行っていますか？',
        ko: '일상 업무를 주로 어디서 처리하시나요?',
        de: 'Wo wird Ihre tägliche Arbeit hauptsächlich erledigt?',
      },
      options: [
        { en: 'Almost never use a computer — all hands-on physical work', zh: '几乎不碰电脑，全靠手和身体干活', ja: 'パソコンはほとんど使わない、手と体を使う仕事がメイン', ko: '컴퓨터는 거의 안 쓰고, 전부 손과 몸으로 하는 일입니다', de: 'Fast nie am Computer — ausschließlich körperliche/handwerkliche Arbeit' },
        { en: 'Occasionally use a computer, but core work is hands-on', zh: '偶尔用电脑查东西，但核心工作靠动手', ja: 'たまにパソコンで調べ物をするけど、メインの仕事は手作業', ko: '가끔 컴퓨터로 확인하지만, 핵심 업무는 직접 손으로 합니다', de: 'Gelegentlich am Computer, aber die Kernarbeit ist Handarbeit' },
        { en: 'About half digital, half physical', zh: '电脑和动手差不多各占一半', ja: 'パソコン作業と手作業がだいたい半々', ko: '컴퓨터 작업과 직접 하는 일이 대략 반반입니다', de: 'Etwa zur Hälfte digital, zur Hälfte körperlich' },
        { en: 'Mostly done on computers/systems', zh: '大部分在电脑/系统上完成', ja: 'ほとんどパソコンやシステム上で完結する', ko: '대부분 컴퓨터나 시스템에서 처리합니다', de: 'Überwiegend am Computer oder in digitalen Systemen' },
        { en: 'Almost entirely in digital systems', zh: '几乎全在电脑或数字系统里完成', ja: 'ほぼ全部パソコンやデジタルシステムの中で完結する', ko: '거의 전부 컴퓨터 또는 디지털 시스템 안에서 끝납니다', de: 'Fast ausschließlich in digitalen Systemen' },
      ],
    },
    {
      id: 'Q2',
      indicator: 'KnowledgeAccessibility',
      direction: 'forward',
      question: {
        en: 'If AI read all the books, papers, and textbooks in your field, what percentage of the knowledge your work requires would it have?',
        zh: '如果AI读完了你所在行业所有的书、论文和教材，它能掌握你工作所需知识的百分之多少？',
        ja: 'もしAIがあなたの業界の本・論文・教科書を全部読んだとしたら、仕事に必要な知識の何パーセントをカバーできると思いますか？',
        ko: 'AI가 당신 분야의 모든 책, 논문, 교재를 다 읽었다면, 업무에 필요한 지식의 몇 퍼센트를 습득할 수 있을까요?',
        de: 'Wenn eine KI alle Bücher, Fachartikel und Lehrbücher Ihres Fachgebiets lesen würde — wie viel Prozent des für Ihre Arbeit nötigen Wissens hätte sie dann?',
      },
      options: [
        { en: 'Less than 20% — book knowledge is just the surface', zh: '不到20%，书本知识只是皮毛', ja: '20%未満、本の知識だけじゃ表面をなぞる程度', ko: '20% 미만 — 책에 나오는 건 빙산의 일각입니다', de: 'Weniger als 20 % — Buchwissen kratzt nur an der Oberfläche' },
        { en: 'About 30-40% — useful but far from enough', zh: '大约30-40%，有用但远远不够', ja: '30〜40%くらい、役には立つけど全然足りない', ko: '대략 30-40% — 도움은 되지만 턱없이 부족합니다', de: 'Etwa 30–40 % — nützlich, aber bei Weitem nicht ausreichend' },
        { en: 'About 50-60% — a decent foundation', zh: '大约50-60%，能打个基础', ja: '50〜60%くらい、基礎は押さえられる', ko: '대략 50-60% — 기초는 잡을 수 있습니다', de: 'Etwa 50–60 % — eine solide Grundlage' },
        { en: 'About 70-80% — most can be learned from materials', zh: '大约70-80%，大部分都能从资料里学', ja: '70〜80%くらい、大部分は資料から学べる', ko: '대략 70-80% — 대부분 자료에서 배울 수 있습니다', de: 'Etwa 70–80 % — das meiste lässt sich aus Fachliteratur lernen' },
        { en: 'Over 90% — books cover almost everything', zh: '90%以上，书上基本全覆盖了', ja: '90%以上、本でほぼ全部カバーできる', ko: '90% 이상 — 책에 거의 다 나와 있습니다', de: 'Über 90 % — Bücher decken fast alles ab' },
      ],
    },
    {
      id: 'Q3',
      indicator: 'TacitKnowledge',
      direction: 'reverse',
      question: {
        en: 'How much does your work depend on "hard to articulate" experience?',
        zh: '你的工作有多依赖"只可意会不可言传"的经验？',
        ja: 'あなたの仕事は「言葉では説明しにくい」経験にどれくらい頼っていますか？',
        ko: '업무에서 "말로 설명하기 어려운" 경험에 얼마나 의존하시나요?',
        de: 'Wie stark hängt Ihre Arbeit von Erfahrungswissen ab, das sich kaum in Worte fassen lässt?',
      },
      options: [
        { en: 'Not at all — a newbie can do it with the manual', zh: '完全不依赖，照说明书新手也能做', ja: 'まったく頼らない、マニュアル通りやれば初心者でもできる', ko: '전혀 의존하지 않습니다 — 매뉴얼만 보면 신입도 할 수 있어요', de: 'Gar nicht — mit einer Anleitung kann auch ein Anfänger die Arbeit erledigen' },
        { en: 'Some small tricks but learnable quickly', zh: '有一点小技巧但很快能学会', ja: 'ちょっとしたコツはあるけど、すぐ覚えられる', ko: '약간의 노하우가 있지만 금방 배울 수 있습니다', de: 'Es gibt ein paar kleine Kniffe, die man aber schnell lernt' },
        { en: 'Needs some experience, but can be taught', zh: '需要一定经验积累，但也能教会别人', ja: 'ある程度の経験は必要だけど、教えることもできる', ko: '어느 정도 경험이 필요하지만, 가르쳐줄 수는 있습니다', de: 'Es braucht gewisse Erfahrung, die sich aber vermitteln lässt' },
        { en: 'Heavily depends on long-accumulated intuition and feel', zh: '非常依赖长期积累的直觉和手感', ja: '長年積み重ねた勘や手の感覚にかなり頼っている', ko: '오랜 시간 쌓은 직감과 감각에 많이 의존합니다', de: 'Sehr stark — es kommt auf langjährig aufgebaute Intuition und Fingerspitzengefühl an' },
        { en: 'Entirely relies on years of cultivated "feel" — hard to explain', zh: '全靠多年修炼的"感觉"，说都说不清楚', ja: '何年もかけて身につけた「感覚」が全て、言葉にできない', ko: '전적으로 수년간 체득한 "감"에 달려 있어요 — 설명하기도 어렵습니다', de: 'Vollständig — es beruht auf einem über Jahre entwickelten „Gespür", das sich kaum erklären lässt' },
      ],
    },
    {
      id: 'Q4',
      indicator: 'NoveltyChange',
      direction: 'reverse',
      question: {
        en: 'How often does your work encounter completely new situations that no one has seen before?',
        zh: '你的工作多久会遇到一次"谁都没见过"的全新情况？',
        ja: '仕事で「誰も見たことがない」まったく新しい状況にどれくらいの頻度で遭遇しますか？',
        ko: '업무 중 "아무도 본 적 없는" 완전히 새로운 상황을 얼마나 자주 만나시나요?',
        de: 'Wie oft begegnen Ihnen in der Arbeit völlig neue Situationen, die noch niemand zuvor erlebt hat?',
      },
      options: [
        { en: 'Almost never — same patterns day after day', zh: '几乎不会，天天都是一样的套路', ja: 'ほぼない、毎日同じパターンの繰り返し', ko: '거의 없습니다 — 매일 똑같은 패턴입니다', de: 'Fast nie — jeden Tag dasselbe Schema' },
        { en: 'Rarely — occasional new cases, mostly routine', zh: '很少，偶尔有新情况但大部分是常规', ja: 'めったにない、たまに新しいことがあるけど大体ルーティン', ko: '드물게 새로운 상황이 생기지만 대부분 정해진 루틴입니다', de: 'Selten — gelegentlich etwas Neues, aber überwiegend Routine' },
        { en: 'Sometimes — new challenges come up regularly', zh: '时不时有，新挑战定期出现', ja: 'ときどきある、定期的に新しい課題が出てくる', ko: '종종 있습니다 — 새로운 과제가 주기적으로 나타납니다', de: 'Ab und zu — neue Herausforderungen tauchen regelmäßig auf' },
        { en: 'Often — the landscape shifts every few months', zh: '经常变，每隔几个月情况就不一样了', ja: 'しょっちゅう変わる、数ヶ月おきに状況が違ってくる', ko: '자주 바뀝니다 — 몇 달마다 상황이 달라집니다', de: 'Häufig — die Lage ändert sich alle paar Monate grundlegend' },
        { en: 'Constantly — every project is uncharted territory', zh: '一直在变，每个项目都是未知领域', ja: '常に変わり続けている、毎回未知の領域に踏み込む', ko: '늘 바뀝니다 — 프로젝트마다 미지의 영역입니다', de: 'Ständig — jedes Projekt ist Neuland' },
      ],
    },
  ],
};

// ─── Dimension 2: Evaluation Objectivity ─────────────────────────────────────

const DIMENSION_EVALUATION: QuizDimension = {
  id: 'evaluation',
  name: { en: 'Evaluation Objectivity', zh: '评判客观性', ja: '評価客観性', ko: '평가 객관성', de: 'Bewertungsobjektivität' },
  description: {
    en: 'Does your work have a "right answer"? Can quality be objectively measured?',
    zh: '你的工作成果有没有"标准答案"？做得好不好，说得清吗？',
    ja: 'あなたの仕事に「正解」はありますか？品質を客観的に測定できますか？',
    ko: '당신의 업무에 "정답"이 있나요? 성과를 객관적으로 측정할 수 있나요?',
    de: 'Gibt es bei Ihrer Arbeit eine „richtige Antwort"? Lässt sich die Qualität objektiv messen?',
  },
  favorableLabel: { en: 'Objective (O)', zh: '客观型 (O)', ja: '客観型 (O)', ko: '객관적 (O)', de: 'Objektiv (O)' },
  resistantLabel: { en: 'Subjective (S)', zh: '主观型 (S)', ja: '主観型 (S)', ko: '주관적 (S)', de: 'Subjektiv (S)' },
  favorableLetter: 'O',
  resistantLetter: 'S',
  questions: [
    {
      id: 'Q5',
      indicator: 'Measurability',
      direction: 'forward',
      question: {
        en: 'Can your work quality be scored with clear numerical metrics?',
        zh: '你的工作做得好不好，能用明确的数字指标来打分吗？',
        ja: 'あなたの仕事の出来不出来は、はっきりした数字の指標で評価できますか？',
        ko: '업무의 성과를 명확한 수치 지표로 평가할 수 있나요?',
        de: 'Lässt sich die Qualität Ihrer Arbeit mit eindeutigen Zahlen und Kennzahlen bewerten?',
      },
      options: [
        { en: 'Impossible to score — quality is purely subjective', zh: '完全没法打分，好坏全凭感觉', ja: 'まったく数値化できない、良し悪しは完全に感覚', ko: '전혀 불가능합니다 — 잘했는지는 순전히 느낌입니다', de: 'Unmöglich — Qualität ist rein subjektiv' },
        { en: 'Mostly subjective, few things are quantifiable', zh: '大部分靠主观评价，少数能量化', ja: 'ほとんど主観的な評価で、数値化できるのはごく一部', ko: '대부분 주관적 평가이고, 일부만 수치화할 수 있습니다', de: 'Überwiegend subjektiv, nur weniges ist quantifizierbar' },
        { en: 'Half quantifiable, half subjective', zh: '一半量化打分，一半靠感觉', ja: '半分は数値で評価できて、半分は感覚頼み', ko: '절반은 수치로, 절반은 감으로 평가합니다', de: 'Zur Hälfte messbar, zur Hälfte subjektiv' },
        { en: 'Mostly clear metrics, few subjective ones', zh: '大部分有清晰指标，少数靠主观', ja: 'ほとんど明確な指標があって、主観的なのは少しだけ', ko: '대부분 명확한 지표가 있고, 일부만 주관적입니다', de: 'Überwiegend klare Kennzahlen, nur wenig Subjektives' },
        { en: 'Almost everything has clear KPIs or benchmarks', zh: '几乎都有明确KPI或达标线', ja: 'ほぼ全部にはっきりしたKPIや達成基準がある', ko: '거의 전부 명확한 KPI나 달성 기준이 있습니다', de: 'Fast alles hat eindeutige KPIs oder Zielwerte' },
      ],
    },
    {
      id: 'Q6',
      indicator: 'Convergence',
      direction: 'forward',
      question: {
        en: 'For the same task, how much do results vary between different people?',
        zh: '同一个任务，换不同的人来做，结果差异大吗？',
        ja: '同じタスクを別の人がやったら、結果はどれくらい違いますか？',
        ko: '같은 업무를 다른 사람이 하면, 결과 차이가 얼마나 날까요?',
        de: 'Wenn verschiedene Personen dieselbe Aufgabe bearbeiten — wie stark unterscheiden sich die Ergebnisse?',
      },
      options: [
        { en: 'Everyone produces completely different results', zh: '每个人做出来都截然不同', ja: '人によってまったく違うものが出来上がる', ko: '사람마다 완전히 다른 결과가 나옵니다', de: 'Jeder liefert ein völlig anderes Ergebnis' },
        { en: 'Similar direction but big differences in detail', zh: '大体方向类似但细节差异很大', ja: '大まかな方向は似ているけど、細部の違いが大きい', ko: '대략적인 방향은 비슷하지만 세부 사항이 크게 다릅니다', de: 'Die grobe Richtung stimmt, aber im Detail gibt es große Unterschiede' },
        { en: 'Core is similar, with room for personal touch', zh: '核心差不多，有不少个人发挥空间', ja: '核心部分は同じで、個人の裁量の余地もそこそこある', ko: '핵심은 비슷하고, 개인 재량의 여지가 꽤 있습니다', de: 'Der Kern ist ähnlich, mit deutlichem Spielraum für persönliche Note' },
        { en: 'Most results are basically the same, minor differences', zh: '大部分结果基本一样，只有小差异', ja: 'ほとんど同じ結果になって、違いはわずか', ko: '대부분 거의 같은 결과가 나오고, 차이는 미미합니다', de: 'Die meisten Ergebnisse sind im Wesentlichen gleich, nur kleine Unterschiede' },
        { en: 'Regardless of who does it, results are nearly identical', zh: '不管谁做，结果几乎一模一样', ja: '誰がやっても、ほぼ同じ結果になる', ko: '누가 하든 결과가 거의 똑같습니다', de: 'Egal wer es macht — die Ergebnisse sind nahezu identisch' },
      ],
    },
    {
      id: 'Q7',
      indicator: 'GoalClarity',
      direction: 'reverse',
      question: {
        en: 'When you receive a task, does the requester know clearly what they want?',
        zh: '你接到任务时，需求方清楚自己想要什么吗？',
        ja: '仕事の依頼を受けるとき、依頼者は自分が何を求めているかわかっていますか？',
        ko: '업무를 받을 때, 요청하는 쪽이 원하는 것을 명확히 알고 있나요?',
        de: 'Wenn Sie einen Auftrag erhalten — weiß der Auftraggeber genau, was er möchte?',
      },
      options: [
        { en: 'Requirements are always very clear — just execute', zh: '需求总是非常明确，按要求执行就行', ja: 'いつも要件が非常に明確で、その通りにやればいい', ko: '요구사항이 항상 매우 명확합니다 — 그대로 실행하면 됩니다', de: 'Die Anforderungen sind immer sehr klar — einfach umsetzen' },
        { en: 'Mostly clear, occasionally need to confirm details', zh: '大多数时候清晰，偶尔确认细节', ja: 'だいたい明確で、たまに細部を確認する程度', ko: '대부분 명확하고, 가끔 세부 사항만 확인합니다', de: 'Meistens klar, gelegentlich müssen Details abgestimmt werden' },
        { en: 'Half clear, half need to figure out yourself', zh: '一半说得清，一半得自己揣摩', ja: '半分ははっきりしていて、半分は自分で読み取る必要がある', ko: '절반은 명확하고, 절반은 스스로 파악해야 합니다', de: 'Zur Hälfte klar formuliert, zur Hälfte muss man es selbst herausfinden' },
        { en: 'Often "just figure it out" — need to define requirements myself', zh: '经常"你看着办"，得自己定义需求', ja: '「お任せします」が多くて、自分で要件を定義する必要がある', ko: '"알아서 해주세요"가 많아서 직접 요구사항을 정의해야 합니다', de: 'Oft heißt es „machen Sie mal" — ich muss die Anforderungen selbst definieren' },
        { en: 'Almost always "help me think about it"', zh: '几乎总是"你帮我想想吧"', ja: 'ほぼ毎回「いい感じにしてください」状態', ko: '거의 항상 "같이 좀 생각해봐요" 수준입니다', de: 'Fast immer: „Überlegen Sie sich etwas für mich"' },
      ],
    },
    {
      id: 'Q8',
      indicator: 'TasteDependence',
      direction: 'reverse',
      question: {
        en: 'How much does your work depend on personal aesthetics, taste, or intuitive judgment?',
        zh: '你的工作有多依赖个人审美、品味或直觉判断？',
        ja: 'あなたの仕事は、個人的な美的感覚やセンス、直感的な判断にどれくらい頼っていますか？',
        ko: '업무에서 개인의 미적 감각, 취향, 직관적 판단에 얼마나 의존하시나요?',
        de: 'Wie stark hängt Ihre Arbeit von persönlicher Ästhetik, Geschmack oder intuitivem Urteilsvermögen ab?',
      },
      options: [
        { en: 'Not at all — just execute standard operations', zh: '完全不需要，执行标准操作就行', ja: 'まったく必要ない、決められた手順通りにやるだけ', ko: '전혀 필요 없습니다 — 정해진 표준 절차대로 하면 됩니다', de: 'Gar nicht — Standardabläufe ausführen genügt' },
        { en: 'Occasionally need a bit of aesthetic judgment', zh: '偶尔需要一点审美判断', ja: 'たまにちょっとした美的判断が必要になる', ko: '가끔 약간의 미적 판단이 필요합니다', de: 'Gelegentlich ist ein gewisses ästhetisches Gespür gefragt' },
        { en: 'Half by standards, half by taste and feel', zh: '一半靠规范标准，一半靠品味感觉', ja: '半分は規格や基準に従い、半分はセンスや感覚で判断', ko: '절반은 규정과 기준, 절반은 감각과 취향입니다', de: 'Zur Hälfte nach Normen und Standards, zur Hälfte nach Geschmack und Gefühl' },
        { en: 'Heavily depends on aesthetics and insight', zh: '很依赖审美和洞察力', ja: '審美眼や洞察力にかなり頼っている', ko: '미적 감각과 통찰력에 많이 의존합니다', de: 'Stark abhängig von Ästhetik und Einfühlungsvermögen' },
        { en: 'Aesthetics and taste ARE my core competitive advantage', zh: '审美和品味就是我的核心竞争力', ja: '美的センスこそが自分の一番の武器', ko: '미적 감각과 취향 자체가 저의 핵심 경쟁력입니다', de: 'Ästhetik und Geschmack SIND mein entscheidender Wettbewerbsvorteil' },
      ],
    },
  ],
};

// ─── Dimension 3: Risk Tolerance ─────────────────────────────────────────────

const DIMENSION_RISK: QuizDimension = {
  id: 'riskTolerance',
  name: { en: 'Risk Tolerance', zh: '容错性', ja: '許容度', ko: '오류 허용도', de: 'Fehlertoleranz' },
  description: {
    en: 'If AI makes a mistake, can the consequences be tolerated? Can its output be trusted?',
    zh: 'AI做错了，后果能承受吗？产出能被信任吗？',
    ja: 'AIがミスをした場合、その結果を許容できますか？その出力を信頼できますか？',
    ko: 'AI가 실수하면 그 결과를 감당할 수 있나요? 그 산출물을 신뢰할 수 있나요?',
    de: 'Wenn die KI einen Fehler macht, sind die Folgen tragbar? Kann man ihrem Output vertrauen?',
  },
  favorableLabel: { en: 'Flexible (F)', zh: '弹性型 (F)', ja: '柔軟型 (F)', ko: '유연형 (F)', de: 'Flexibel (F)' },
  resistantLabel: { en: 'Rigid (R)', zh: '刚性型 (R)', ja: '厳格型 (R)', ko: '엄격형 (R)', de: 'Rigide (R)' },
  favorableLetter: 'F',
  resistantLetter: 'R',
  questions: [
    {
      id: 'Q9',
      indicator: 'ErrorSeverity',
      direction: 'reverse',
      question: {
        en: 'If your work has an error, what\'s the worst that could happen?',
        zh: '你的工作如果出了错，最严重会怎样？',
        ja: 'あなたの仕事でミスが起きたら、最悪どうなりますか？',
        ko: '업무에서 실수가 발생하면, 최악의 경우 어떤 일이 생기나요?',
        de: 'Was wäre die schlimmste Folge eines Fehlers in Ihrer Arbeit?',
      },
      options: [
        { en: 'No big deal — just redo it', zh: '没什么大不了，重新来就好', ja: '大したことない、やり直せばいいだけ', ko: '별일 아닙니다 — 다시 하면 됩니다', de: 'Nicht schlimm — einfach nochmal machen' },
        { en: 'Wastes some time/money, limited impact', zh: '浪费一些时间金钱，影响有限', ja: '時間やお金が少し無駄になるけど、影響は限定的', ko: '시간이나 비용이 좀 낭비되지만, 영향은 제한적입니다', de: 'Etwas Zeit- oder Geldverlust, aber überschaubarer Schaden' },
        { en: 'Noticeable financial loss or reputation damage', zh: '会造成明显经济损失或名誉受损', ja: 'はっきりとした金銭的損失や信用の低下が起きる', ko: '눈에 띄는 금전적 손실이나 평판 손상이 생깁니다', de: 'Spürbarer finanzieller Verlust oder Reputationsschaden' },
        { en: 'Could cause serious property loss or health risks', zh: '可能导致严重财产损失或健康风险', ja: '重大な財産的損失や健康上のリスクにつながりかねない', ko: '심각한 재산 피해나 건강 위험으로 이어질 수 있습니다', de: 'Könnte zu ernsthaftem Sachschaden oder Gesundheitsrisiken führen' },
        { en: 'Could directly endanger lives or cause major safety incidents', zh: '可能直接危及人命或重大安全事故', ja: '人命に直接関わる、または重大な安全事故になりうる', ko: '직접적으로 인명 피해나 중대 안전사고가 날 수 있습니다', de: 'Könnte direkt Menschenleben gefährden oder einen schweren Sicherheitsvorfall verursachen' },
      ],
    },
    {
      id: 'Q10',
      indicator: 'Reversibility',
      direction: 'forward',
      question: {
        en: 'Does your work allow a "try it first, change it if it doesn\'t work" approach?',
        zh: '你的工作允许"先试试看，不行再改"这种方式吗？',
        ja: 'あなたの仕事は「とりあえずやってみて、ダメだったら直す」というやり方ができますか？',
        ko: '업무에서 "일단 해보고, 안 되면 고치자"는 방식이 통하나요?',
        de: 'Erlaubt Ihre Arbeit den Ansatz „erst ausprobieren, dann korrigieren"?',
      },
      options: [
        { en: 'Absolutely not — must get it right the first time', zh: '绝对不允许，必须一次做对', ja: '絶対にダメ、一発で正解を出さないといけない', ko: '절대 안 됩니다 — 반드시 한 번에 정확히 해야 합니다', de: 'Auf keinen Fall — es muss beim ersten Mal sitzen' },
        { en: 'Rarely — the cost of errors is too high', zh: '很少能试错，出错代价太高', ja: 'ほとんどできない、失敗のコストが高すぎる', ko: '거의 안 됩니다 — 실수 비용이 너무 큽니다', de: 'Selten — die Kosten eines Fehlers sind zu hoch' },
        { en: 'Some stages allow trial and error, some don\'t', zh: '有些环节可以试错，有些不行', ja: '試行錯誤できる工程もあれば、できない工程もある', ko: '일부 단계는 시행착오가 가능하고, 일부는 안 됩니다', de: 'Bei manchen Schritten ist Ausprobieren möglich, bei anderen nicht' },
        { en: 'Most of the time, experimentation and rapid iteration are encouraged', zh: '大部分时候鼓励尝试和快速迭代', ja: 'だいたいの場面でトライ＆エラーや素早い改善が推奨される', ko: '대부분 시도와 빠른 반복을 권장합니다', de: 'Meistens wird Experimentieren und schnelles Iterieren sogar gefördert' },
        { en: 'The entire workflow IS constant experimentation and adjustment', zh: '整个工作方式就是不断实验和调整', ja: '仕事全体が実験と調整の連続そのもの', ko: '업무 방식 자체가 끊임없는 실험과 조정입니다', de: 'Die gesamte Arbeitsweise IST ständiges Experimentieren und Anpassen' },
      ],
    },
    {
      id: 'Q11',
      indicator: 'Regulation',
      direction: 'forward',
      question: {
        en: 'If your work were entirely handed to AI, how much obstacle would current laws create?',
        zh: '如果你的工作全部交给AI来做，在当前的法律法规下，会遇到多大障碍？',
        ja: 'もしあなたの仕事を全部AIに任せるとしたら、現行の法律上どれくらいの障壁がありますか？',
        ko: '업무를 전부 AI에게 맡긴다면, 현행 법률상 얼마나 큰 장벽이 있을까요?',
        de: 'Wenn Ihre Arbeit vollständig von einer KI übernommen würde — welche Hürden würden die aktuellen Gesetze aufstellen?',
      },
      options: [
        { en: 'Explicitly prohibited by law — impossible', zh: '法律明确禁止，绝无可能', ja: '法律で明確に禁止されている、絶対に無理', ko: '법으로 명확히 금지되어 있습니다 — 절대 불가능합니다', de: 'Gesetzlich ausdrücklich verboten — unmöglich' },
        { en: 'Significant legal grey areas and restrictions', zh: '法规上有很大的灰色地带和限制', ja: '法的にグレーゾーンが大きくて、制約も多い', ko: '법적으로 큰 회색지대와 제약이 있습니다', de: 'Erhebliche rechtliche Grauzonen und Einschränkungen' },
        { en: 'Some steps face legal restrictions, some don\'t', zh: '有些环节有法律限制，有些没有', ja: '法律で制限される部分もあれば、されない部分もある', ko: '일부 단계에는 법적 제한이 있고, 일부는 없습니다', de: 'Manche Schritte unterliegen rechtlichen Beschränkungen, andere nicht' },
        { en: 'Essentially no regulatory obstacles', zh: '法规上基本没有障碍', ja: '法的にはほぼ障壁がない', ko: '법규상 장벽이 거의 없습니다', de: 'Im Wesentlichen keine regulatorischen Hürden' },
        { en: 'No restrictions — policies even encourage AI adoption', zh: '完全没限制，甚至政策在鼓励AI应用', ja: 'まったく制限なし、むしろ政策がAI活用を後押ししている', ko: '아무런 제한이 없고, 오히려 정책적으로 AI 도입을 장려합니다', de: 'Keinerlei Einschränkungen — die Politik fördert KI-Einsatz sogar aktiv' },
      ],
    },
    {
      id: 'Q12',
      indicator: 'PublicTrust',
      direction: 'reverse',
      question: {
        en: 'Can the public accept AI making decisions in your role?',
        zh: '公众能接受让AI在你的岗位上做决策吗？',
        ja: 'あなたの仕事のポジションで、AIが意思決定することを世の中の人は受け入れられますか？',
        ko: '대중은 AI가 당신의 역할에서 의사결정을 하는 것을 받아들일 수 있을까요?',
        de: 'Kann die Öffentlichkeit akzeptieren, dass eine KI in Ihrer Rolle Entscheidungen trifft?',
      },
      options: [
        { en: 'Totally fine — nobody cares who does it', zh: '完全可以，没人在乎是谁做的', ja: 'まったく問題ない、誰がやっても気にしない', ko: '전혀 문제없습니다 — 누가 하든 상관없어합니다', de: 'Völlig in Ordnung — es interessiert niemanden, wer es macht' },
        { en: 'Most people wouldn\'t mind', zh: '大部分人不介意', ja: 'ほとんどの人は気にしない', ko: '대부분 개의치 않습니다', de: 'Die meisten hätten nichts dagegen' },
        { en: 'Depends — some accept it, some don\'t', zh: '看情况，有人能接受有人不舒服', ja: '人による、受け入れる人もいれば抵抗がある人もいる', ko: '경우에 따라 다릅니다 — 수용하는 사람도, 불편해하는 사람도 있습니다', de: 'Kommt darauf an — manche akzeptieren es, manche nicht' },
        { en: 'Most people would feel uneasy', zh: '大部分人会觉得不放心', ja: 'ほとんどの人が不安に思う', ko: '대부분 불안해할 것입니다', de: 'Die meisten würden sich unwohl fühlen' },
        { en: 'Absolutely unacceptable — public would strongly oppose', zh: '完全不能接受，公众会强烈反对', ja: 'まったく受け入れられない、世間が強く反対する', ko: '절대 수용할 수 없습니다 — 대중이 강하게 반대할 것입니다', de: 'Absolut inakzeptabel — die Öffentlichkeit würde sich entschieden dagegen aussprechen' },
      ],
    },
  ],
};

// ─── Dimension 4: Human Presence ─────────────────────────────────────────────

const DIMENSION_HUMAN: QuizDimension = {
  id: 'humanPresence',
  name: { en: 'Human Presence', zh: '人格依赖性', ja: '人格依存性', ko: '인격 의존성', de: 'Personenabhängigkeit' },
  description: {
    en: 'Is your value in "what you produce" or "who you are"?',
    zh: '你的价值在于"做出了什么"，还是"你是谁"？',
    ja: 'あなたの価値は「何を作るか」にありますか、それとも「あなたが誰であるか」にありますか？',
    ko: '당신의 가치는 "무엇을 만드느냐"에 있나요, 아니면 "당신이 누구인지"에 있나요?',
    de: 'Liegt Ihr Wert in „was Sie produzieren" oder in „wer Sie sind"?',
  },
  favorableLabel: { en: 'Product (P)', zh: '对事型 (P)', ja: '成果型 (P)', ko: '성과형 (P)', de: 'Produkt (P)' },
  resistantLabel: { en: 'Human (H)', zh: '对人型 (H)', ja: '人間型 (H)', ko: '인간형 (H)', de: 'Mensch (H)' },
  favorableLetter: 'P',
  resistantLetter: 'H',
  questions: [
    {
      id: 'Q13',
      indicator: 'Relationship',
      direction: 'reverse',
      question: {
        en: 'Why do clients or partners choose you (or your team)?',
        zh: '客户或合作方选择你（或你的团队），主要是因为什么？',
        ja: 'お客さんや取引先があなた（またはあなたのチーム）を選ぶ一番の理由は何ですか？',
        ko: '고객이나 협력사가 당신(또는 당신 팀)을 선택하는 주된 이유는 무엇인가요?',
        de: 'Warum entscheiden sich Kunden oder Partner für Sie (oder Ihr Team)?',
      },
      options: [
        { en: 'Purely price and efficiency — cheapest wins', zh: '纯粹看价格和效率，谁便宜找谁', ja: '純粋に価格と効率、一番安いところに頼む', ko: '순전히 가격과 효율 — 가장 저렴한 곳을 찾습니다', de: 'Rein nach Preis und Effizienz — der Günstigste bekommt den Zuschlag' },
        { en: 'Mainly capabilities — no preference for who', zh: '主要看能力资质，对谁没有偏好', ja: '主にスキルや資格を見ていて、誰かへのこだわりはない', ko: '주로 역량과 자격을 보고, 특정 사람에 대한 선호는 없습니다', de: 'Hauptsächlich nach Kompetenz — ohne persönliche Präferenz' },
        { en: 'Capabilities matter, but chemistry and trust too', zh: '能力重要，也考虑合作默契和信任', ja: '能力も大事だけど、相性や信頼関係も考慮する', ko: '역량도 중요하지만, 협업 궁합과 신뢰도 고려합니다', de: 'Kompetenz ist wichtig, aber auch Vertrauen und gute Zusammenarbeit zählen' },
        { en: 'Many clients stay because of the long-term relationship', zh: '很多客户因为长期关系才继续合作', ja: '長い付き合いがあるから続けている、というお客さんが多い', ko: '오랜 관계 때문에 계속 함께하는 고객이 많습니다', de: 'Viele Kunden bleiben wegen der langjährigen Beziehung' },
        { en: 'Clients only work with ME — they leave if I leave', zh: '客户只认我这个人，换人就不合作了', ja: 'お客さんは自分じゃないとダメ、担当が変わったら取引終了', ko: '고객이 저라는 사람만 믿고, 담당자가 바뀌면 거래를 끊습니다', de: 'Kunden arbeiten nur mit MIR — wenn ich gehe, wechseln sie auch' },
      ],
    },
    {
      id: 'Q14',
      indicator: 'PersonalBrand',
      direction: 'forward',
      question: {
        en: 'If you suddenly left tomorrow, how long would it take to find a replacement at your level?',
        zh: '如果你明天突然离职，公司需要多久才能找到替代者达到你的工作水平？',
        ja: 'もしあなたが明日突然辞めたら、同じレベルの後任を見つけるのにどれくらいかかりますか？',
        ko: '만약 내일 갑자기 퇴사한다면, 회사가 당신 수준의 대체자를 찾는 데 얼마나 걸릴까요?',
        de: 'Wenn Sie morgen plötzlich kündigen würden — wie lange bräuchte Ihr Unternehmen, um einen gleichwertigen Ersatz zu finden?',
      },
      options: [
        { en: 'Very hard — maybe 6+ months, or never', zh: '非常难找，可能半年以上，甚至找不到', ja: '非常に難しい、半年以上かかるか見つからないかもしれない', ko: '매우 어렵습니다 — 6개월 이상, 어쩌면 못 찾을 수도 있습니다', de: 'Sehr schwierig — vielleicht über 6 Monate, möglicherweise gar nicht' },
        { en: 'Quite hard — needs a few months', zh: '比较难，需要几个月', ja: 'けっこう大変、数ヶ月はかかる', ko: '꽤 어렵습니다 — 몇 달은 걸립니다', de: 'Ziemlich schwierig — einige Monate wären nötig' },
        { en: '1-2 months to find the right person', zh: '一两个月能找到合适的人', ja: '1〜2ヶ月あれば適任者が見つかる', ko: '한두 달이면 적합한 사람을 찾을 수 있습니다', de: 'In 1–2 Monaten ließe sich jemand Passendes finden' },
        { en: '2-3 weeks to hire someone', zh: '两三周就能招到', ja: '2〜3週間で採用できる', ko: '2-3주면 채용할 수 있습니다', de: 'In 2–3 Wochen wäre jemand eingestellt' },
        { en: 'Can find a replacement immediately', zh: '马上就能找到替代者', ja: 'すぐに代わりが見つかる', ko: '즉시 대체자를 구할 수 있습니다', de: 'Sofort — ein Ersatz wäre umgehend verfügbar' },
      ],
    },
    {
      id: 'Q15',
      indicator: 'PhysicalPresence',
      direction: 'reverse',
      question: {
        en: 'Must your work be done with you physically present?',
        zh: '你的工作必须本人亲自到场完成吗？',
        ja: 'あなたの仕事は本人が現場にいないとできませんか？',
        ko: '업무를 반드시 본인이 직접 현장에서 수행해야 하나요?',
        de: 'Muss Ihre Arbeit zwingend von Ihnen persönlich vor Ort erledigt werden?',
      },
      options: [
        { en: 'Not at all — can be done remotely from anywhere', zh: '完全不用，在哪都能远程完成', ja: 'まったく不要、どこからでもリモートで完結する', ko: '전혀 그렇지 않습니다 — 어디서든 원격으로 가능합니다', de: 'Überhaupt nicht — alles lässt sich von überall aus remote erledigen' },
        { en: 'Occasionally need to be there, mostly remote', zh: '偶尔需要到场，大部分可远程', ja: 'たまに現場に行く必要があるけど、ほとんどリモートでOK', ko: '가끔 현장에 가야 하지만, 대부분 원격으로 됩니다', de: 'Gelegentlich muss ich vor Ort sein, aber größtenteils remote' },
        { en: 'About half on-site, half remote', zh: '大概一半到场，一半远程', ja: 'だいたい半分は現場、半分はリモート', ko: '대략 절반은 현장, 절반은 원격입니다', de: 'Etwa zur Hälfte vor Ort, zur Hälfte remote' },
        { en: 'Must be on-site most of the time', zh: '大部分时候必须到场', ja: 'ほとんどの場合、現場にいないといけない', ko: '대부분 현장에 있어야 합니다', de: 'Ich muss die meiste Zeit vor Ort sein' },
        { en: 'Must be physically present, doing the work in person', zh: '必须本人在现场，用身体完成工作', ja: '必ず本人がその場にいて、体を使って仕事をする必要がある', ko: '반드시 본인이 현장에서 직접 몸으로 해야 하는 일입니다', de: 'Ich muss persönlich anwesend sein und die Arbeit körperlich ausführen' },
      ],
    },
    {
      id: 'Q16',
      indicator: 'HumanPremium',
      direction: 'reverse',
      question: {
        en: 'If clients discovered your work was actually done by AI, what would happen?',
        zh: '如果客户发现你的工作其实是AI完成的，会怎样？',
        ja: 'もしお客さんに、あなたの仕事が実はAIがやっていたとバレたら、どうなりますか？',
        ko: '고객이 당신의 업무가 실은 AI가 한 것이라고 알게 되면 어떻게 될까요?',
        de: 'Wenn Kunden herausfänden, dass Ihre Arbeit tatsächlich von einer KI erledigt wurde — wie würden sie reagieren?',
      },
      options: [
        { en: 'Wouldn\'t care — might even think it\'s more efficient', zh: '无所谓，甚至觉得更高效', ja: '気にしない、むしろ効率的だと思われる', ko: '상관없어합니다 — 오히려 더 효율적이라고 생각할 수도 있습니다', de: 'Wäre ihnen egal — sie fänden es vielleicht sogar effizienter' },
        { en: 'A bit surprised but basically acceptable', zh: '有点意外但基本能接受', ja: 'ちょっと驚かれるけど、基本的には許容範囲', ko: '좀 놀라겠지만 대체로 받아들입니다', de: 'Etwas überrascht, aber grundsätzlich akzeptabel' },
        { en: 'Would feel it\'s worth less, but still acceptable', zh: '觉得打了折扣，但还算认可', ja: '価値が下がった気がするけど、まあ認めてもらえる', ko: '가치가 좀 떨어진다고 느끼지만, 그래도 인정은 합니다', de: 'Würden den Wert als gemindert empfinden, es aber noch hinnehmen' },
        { en: 'Clearly feel the value decreased — dissatisfied', zh: '明显觉得价值降低、不满意', ja: '明らかに価値が下がったと感じて、不満を持たれる', ko: '확실히 가치가 낮아졌다고 느끼고 불만스러워합니다', de: 'Würden deutlich das Gefühl haben, dass der Wert gesunken ist — unzufrieden' },
        { en: 'Absolutely unacceptable — would feel deceived', zh: '完全无法接受，觉得被欺骗了', ja: '絶対に受け入れられない、騙されたと感じる', ko: '절대 받아들일 수 없습니다 — 속았다고 느낄 것입니다', de: 'Absolut inakzeptabel — sie würden sich getäuscht fühlen' },
      ],
    },
  ],
};

// ─── AI Snapshot Questions ───────────────────────────────────────────────────

export const AI_SNAPSHOT_QUESTIONS: AISnapshotQuestion[] = [
  {
    id: 'S1',
    indicator: 'PromptFriction',
    direction: 'reverse',
    question: {
      en: 'How much effort does it take to get AI to produce a usable first draft?',
      zh: '让AI给出能用的初稿，要花多少功夫沟通？',
    },
    options: [
      { en: 'Barely need to say anything — satisfied on first try', zh: '几乎不用说，一次就满意' },
      { en: 'Simple description works, occasional tweaking', zh: '简单描述就行，偶尔微调' },
      { en: 'Need to craft prompts carefully, several rounds', zh: '需要花时间组织提示词，来回几轮' },
      { en: 'Takes a lot of effort for barely usable results', zh: '花很大功夫才得到勉强可用的结果' },
      { en: 'No matter what I say, AI can\'t understand', zh: '怎么说AI都理解不了' },
    ],
  },
  {
    id: 'S2',
    indicator: 'Coverage',
    direction: 'forward',
    question: {
      en: 'How much of your daily work can AI currently help with?',
      zh: '在你的日常工作中，AI目前能帮你分担多少？',
    },
    options: [
      { en: 'Barely any help', zh: '几乎帮不上忙' },
      { en: 'Can help with some simple auxiliary tasks', zh: '能帮一些简单辅助工作' },
      { en: 'Can handle close to half the workload', zh: '能承担接近一半工作量' },
      { en: 'Can do most of it — I mainly review and finalize', zh: '能做大部分，我主要把关收尾' },
      { en: 'Handles almost everything — I just check', zh: '几乎全部搞定，我只需检查' },
    ],
  },
  {
    id: 'S3',
    indicator: 'QualityParity',
    direction: 'forward',
    question: {
      en: 'How would you rate the quality of AI\'s current output?',
      zh: '你觉得AI目前产出的东西质量怎么样？',
    },
    options: [
      { en: 'Completely unusable — need to redo everything', zh: '完全不能用，要全部重做' },
      { en: 'Barely acceptable — needs major revisions', zh: '勉强能看，需大幅修改' },
      { en: 'OK — usable with some edits', zh: '还行，修修改改能用' },
      { en: 'Good quality — only needs minor tweaks', zh: '质量不错，只需微调' },
      { en: 'Consistently better than what I\'d produce myself', zh: '质量稳定超过我自己做的' },
    ],
  },
  {
    id: 'S4',
    indicator: 'EditLoad',
    direction: 'reverse',
    question: {
      en: 'After AI generates something, how much editing before you can deliver it?',
      zh: 'AI生成之后，你还需要花多少功夫修改才能交付？',
    },
    options: [
      { en: 'Almost none — ready to deliver', zh: '几乎不用改，直接能交' },
      { en: 'Just a quick polish', zh: '稍微润色一下就行' },
      { en: 'Need a serious round of editing', zh: '需要比较认真地改一轮' },
      { en: 'Major rework needed — lots of changes', zh: '要大幅返工，改动量很大' },
      { en: 'Easier to just do it myself from scratch', zh: '不如自己从头做' },
    ],
  },
];

// ─── Survey Questions (non-scoring) ──────────────────────────────────────────

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'X1',
    topic: { en: 'Company AI Support', zh: '公司AI支持' },
    question: {
      en: 'Does your company provide AI tools for you?',
      zh: '你所在的公司有给你提供AI工具吗？',
    },
    options: [
      { en: 'No', zh: '没有' },
      { en: 'Yes but not great', zh: '有但不好用' },
      { en: 'Yes and I use them often', zh: '有且经常用' },
    ],
  },
  {
    id: 'X2',
    topic: { en: 'Company AI Layoffs', zh: '公司AI裁员' },
    question: {
      en: 'Has your company laid off people due to AI?',
      zh: '你的公司有因为引入AI而裁员吗？',
    },
    options: [
      { en: 'No', zh: '没有' },
      { en: 'Heard rumors but unsure', zh: '听说有但不确定' },
      { en: 'Yes, it\'s happening', zh: '确实在裁' },
    ],
  },
  {
    id: 'X3',
    topic: { en: 'Willingness to Pay', zh: '个人付费意愿' },
    question: {
      en: 'Would you pay out of pocket for the best AI to boost your performance?',
      zh: '你愿意自掏腰包买最好的AI来提升工作表现吗？',
    },
    options: [
      { en: 'Not willing', zh: '不愿意' },
      { en: 'Depends on the price', zh: '看价格' },
      { en: 'Willing — already paying', zh: '愿意，已经在付了' },
    ],
  },
];

// ─── SOC Major Occupational Groups (23 categories) ──────────────────────────

export const SOC_MAJOR_GROUPS: { code: number; name: { en: string; zh: string }; riskScore: number }[] = [
  { code: 11, name: { en: 'Management', zh: '管理' }, riskScore: 28 },
  { code: 13, name: { en: 'Business & Financial Operations', zh: '商业与金融运营' }, riskScore: 72 },
  { code: 15, name: { en: 'Computer & Mathematical', zh: '计算机与数学' }, riskScore: 55 },
  { code: 17, name: { en: 'Architecture & Engineering', zh: '建筑与工程' }, riskScore: 45 },
  { code: 19, name: { en: 'Life, Physical & Social Science', zh: '生命、物理和社会科学' }, riskScore: 30 },
  { code: 21, name: { en: 'Community & Social Service', zh: '社区和社会服务' }, riskScore: 18 },
  { code: 23, name: { en: 'Legal', zh: '法律' }, riskScore: 52 },
  { code: 25, name: { en: 'Educational Instruction & Library', zh: '教育与图书馆' }, riskScore: 35 },
  { code: 27, name: { en: 'Arts, Design, Entertainment, Sports & Media', zh: '艺术、设计、娱乐、体育和媒体' }, riskScore: 58 },
  { code: 29, name: { en: 'Healthcare Practitioners & Technical', zh: '医疗从业者和技术人员' }, riskScore: 25 },
  { code: 31, name: { en: 'Healthcare Support', zh: '医疗辅助' }, riskScore: 42 },
  { code: 33, name: { en: 'Protective Service', zh: '保护性服务' }, riskScore: 15 },
  { code: 35, name: { en: 'Food Preparation & Serving', zh: '餐饮制备和服务' }, riskScore: 65 },
  { code: 37, name: { en: 'Building & Grounds Cleaning/Maintenance', zh: '建筑物和场地清洁维护' }, riskScore: 38 },
  { code: 39, name: { en: 'Personal Care & Service', zh: '个人护理和服务' }, riskScore: 20 },
  { code: 41, name: { en: 'Sales & Related', zh: '销售及相关' }, riskScore: 68 },
  { code: 43, name: { en: 'Office & Administrative Support', zh: '办公室和行政支持' }, riskScore: 85 },
  { code: 45, name: { en: 'Farming, Fishing & Forestry', zh: '农业、渔业和林业' }, riskScore: 40 },
  { code: 47, name: { en: 'Construction & Extraction', zh: '建筑施工和采掘' }, riskScore: 22 },
  { code: 49, name: { en: 'Installation, Maintenance & Repair', zh: '安装、维护和修理' }, riskScore: 32 },
  { code: 51, name: { en: 'Production', zh: '生产制造' }, riskScore: 70 },
  { code: 53, name: { en: 'Transportation & Material Moving', zh: '运输和物料搬运' }, riskScore: 73 },
  { code: 55, name: { en: 'Military Specific', zh: '军事专属' }, riskScore: 12 },
];

// ─── 16 Profile Types ────────────────────────────────────────────────────────

export const PROFILE_TYPES: Record<string, ProfileType> = {
  // ── Extreme high (4/4 AI favorable) ──
  EOFP: {
    code: 'EOFP',
    name: { en: 'Full Chain Open', zh: '全链路畅通型' },
    archetype: { en: 'The Transparent Target', zh: '透明靶心' },
    tagline: { en: 'Your entire workflow is a tutorial for AI', zh: '你的整个工作流程就是 AI 的教程' },
    superpower: { en: 'Unmatched execution speed and systematic thinking', zh: '无与伦比的执行速度和系统化思维' },
    kryptonite: { en: 'Every skill you have can be documented, measured, and automated', zh: '你的每一项技能都能被记录、量化、自动化' },
    color: '#ff1744',
    icon: '🎯',
    description: {
      en: 'Explicit + Objective + Flexible + Product: Knowledge is transparent, evaluation is clear, errors are fixable, only results matter',
      zh: '显+客+弹+事：知识透明、标准客观、出错可改、只看结果',
    },
    typicalJobs: {
      en: 'Office & Administrative Support (43), Business & Financial Operations (13) — entry-level positions',
      zh: '办公室和行政支持(43)、商业与金融运营(13)基础岗',
    },
    riskTier: 'extreme-high',
    primarySOC: 43,
  },
  // ── High (3/4 AI favorable) ──
  EOFH: {
    code: 'EOFH',
    name: { en: 'Relationship Anchored', zh: '关系锚定型' },
    archetype: { en: 'The Human Bridge', zh: '人脉桥梁' },
    tagline: { en: 'AI does the work, but they come back for YOU', zh: 'AI 能干活，但客户回来找的是你' },
    superpower: { en: 'Trust and relationships that no algorithm can replicate', zh: '算法无法复制的信任和人际关系' },
    kryptonite: { en: 'Once AI builds rapport through persistent personalization, your moat shrinks', zh: '一旦 AI 通过持续个性化建立关系，你的护城河就缩小了' },
    color: '#ff6d00',
    icon: '🤝',
    description: {
      en: 'Explicit + Objective + Flexible + Human: AI can do everything, but clients trust YOU specifically',
      zh: '显+客+弹+人：AI全都能做，但客户认的是你这个人',
    },
    typicalJobs: {
      en: 'Sales & Related (41), Business & Financial Operations (13) — client relationship roles',
      zh: '销售及相关(41)、商业与金融运营(13)客户经理方向',
    },
    riskTier: 'high',
    primarySOC: 41,
  },
  EORP: {
    code: 'EORP',
    name: { en: 'Compliance Gatekeeper', zh: '合规守门型' },
    archetype: { en: 'The Rule Keeper', zh: '规则守卫' },
    tagline: { en: 'AI knows the rules — you enforce the consequences', zh: 'AI 懂规则，你执行后果' },
    superpower: { en: 'Accountability and regulatory authority that AI cannot legally hold', zh: 'AI 在法律上无法承担的问责权和监管权力' },
    kryptonite: { en: 'AI already knows every regulation better than you do', zh: 'AI 已经比你更了解每一条法规了' },
    color: '#ff9100',
    icon: '🛡️',
    description: {
      en: 'Explicit + Objective + Rigid + Product: AI can learn and do it, but errors are too costly / regulated',
      zh: '显+客+刚+事：AI能学也能做，但出错代价太大/有监管',
    },
    typicalJobs: {
      en: 'Production (51) — quality inspection, Healthcare Practitioners & Technical (29) — pharmacy/lab roles',
      zh: '生产制造(51)质检方向、医疗从业者和技术人员(29)药剂/检验方向',
    },
    riskTier: 'high',
    primarySOC: 51,
  },
  ESFP: {
    code: 'ESFP',
    name: { en: 'Creative Trial-and-Error', zh: '创意试错型' },
    archetype: { en: 'The Taste Maker', zh: '品味定义者' },
    tagline: { en: 'AI generates a thousand options — you know which one is right', zh: 'AI 生成一千个选项，你知道哪个是对的' },
    superpower: { en: 'Aesthetic judgment and cultural intuition machines can\'t learn from data', zh: '机器无法从数据中学到的审美判断和文化直觉' },
    kryptonite: { en: 'AI is already generating content that passes the taste test', zh: 'AI 已经在生成能通过品味测试的内容了' },
    color: '#ff5252',
    icon: '🎨',
    description: {
      en: 'Explicit + Subjective + Flexible + Product: AI can learn, errors are tolerable, only results matter, but quality is subjective',
      zh: '显+主+弹+事：AI能学、可以试错、只看结果，但好坏全靠主观判断',
    },
    typicalJobs: {
      en: 'Arts, Design, Entertainment, Sports & Media (27) — design/planning, Computer & Mathematical (15)',
      zh: '艺术、设计、娱乐、体育和媒体(27)设计/策划方向、计算机与数学(15)',
    },
    riskTier: 'high',
    primarySOC: 27,
  },
  TOFP: {
    code: 'TOFP',
    name: { en: 'Skill Executor', zh: '技能执行型' },
    archetype: { en: 'The Muscle Memory', zh: '肌肉记忆者' },
    tagline: { en: 'Your hands know things your brain can\'t explain', zh: '你的双手懂得大脑无法解释的东西' },
    superpower: { en: 'Physical dexterity and embodied knowledge gained through years of practice', zh: '多年实践积累的身体灵活性和具身知识' },
    kryptonite: { en: 'Robotics is catching up — and robots don\'t get tired', zh: '机器人在追赶，而且它们不会累' },
    color: '#ff6e40',
    icon: '🔧',
    description: {
      en: 'Tacit + Objective + Flexible + Product: Clear standards, fixable errors, results-only, but needs physical experience',
      zh: '隐+客+弹+事：标准客观、可试错、只看结果，但需要身体经验',
    },
    typicalJobs: {
      en: 'Installation, Maintenance & Repair (49), Transportation & Material Moving (53) — warehouse, Food Preparation & Serving (35) — chain, Building & Grounds Cleaning/Maintenance (37)',
      zh: '安装、维护和修理(49)、运输和物料搬运(53)仓储方向、餐饮制备和服务(35)连锁方向、建筑物和场地清洁维护(37)',
    },
    riskTier: 'high',
    primarySOC: 49,
  },
  // ── Medium (2/4 AI favorable) ──
  EORH: {
    code: 'EORH',
    name: { en: 'Licensed Trust', zh: '执证信任型' },
    archetype: { en: 'The Certified Shield', zh: '持证护盾' },
    tagline: { en: 'AI has the knowledge, but not the license on the wall', zh: 'AI 有知识，但墙上没有你的执照' },
    superpower: { en: 'Regulatory barriers and institutional trust that protect your position', zh: '保护你地位的监管壁垒和机构信任' },
    kryptonite: { en: 'Regulations change — and AI lobbying is a thing', zh: '法规会变——AI 游说已经是现实了' },
    color: '#ffc107',
    icon: '📜',
    description: {
      en: 'Explicit + Objective + Rigid + Human: Transparent knowledge + regulated + clients trust you — AI only lacks entry',
      zh: '显+客+刚+人：知识透明+有监管+客户认人，AI只缺一个入口',
    },
    typicalJobs: {
      en: 'Business & Financial Operations (13) — licensed roles, Legal (23) — notary/compliance',
      zh: '商业与金融运营(13)持证方向、法律(23)公证/合规方向',
    },
    riskTier: 'medium',
    primarySOC: 13,
  },
  ESFH: {
    code: 'ESFH',
    name: { en: 'Digital Persona', zh: '数字人格型' },
    archetype: { en: 'The Living Brand', zh: '活体品牌' },
    tagline: { en: 'AI can mimic your style, but it can\'t BE you', zh: 'AI 能模仿你的风格，但它成不了你' },
    superpower: { en: 'Personal brand and audience loyalty that follows the person, not the content', zh: '跟随人而非内容的个人品牌和受众忠诚度' },
    kryptonite: { en: 'AI influencers are already gaining followers — and they never have a bad day', zh: 'AI 网红已经在涨粉了——而且它们永远不会有糟糕的一天' },
    color: '#ffca28',
    icon: '⭐',
    description: {
      en: 'Explicit + Subjective + Flexible + Human: AI can learn, but quality is subjective + fans trust the person',
      zh: '显+主+弹+人：AI能学，但好坏靠主观+粉丝认的是人',
    },
    typicalJobs: {
      en: 'Arts, Design, Entertainment, Sports & Media (27) — content creators, Educational Instruction & Library (25)',
      zh: '艺术、设计、娱乐、体育和媒体(27)自媒体/内容方向、教育与图书馆(25)',
    },
    riskTier: 'medium',
    primarySOC: 25,
  },
  ESRP: {
    code: 'ESRP',
    name: { en: 'High-Stakes Creative', zh: '高压创造型' },
    archetype: { en: 'The Pressure Alchemist', zh: '高压炼金师' },
    tagline: { en: 'When failure isn\'t an option, they call a human', zh: '当失败不是选项时，他们会找一个人类' },
    superpower: { en: 'Making irreversible creative decisions under pressure — stakes too high for AI', zh: '在高压下做出不可逆的创造性决策——风险太高，AI 承担不了' },
    kryptonite: { en: 'AI is getting better at high-stakes reasoning every quarter', zh: 'AI 的高风险推理能力每个季度都在提升' },
    color: '#ffab00',
    icon: '⚗️',
    description: {
      en: 'Explicit + Subjective + Rigid + Product: AI can learn, but quality is subjective + errors have serious consequences',
      zh: '显+主+刚+事：AI能学，但好坏靠主观+出错后果严重',
    },
    typicalJobs: {
      en: 'Architecture & Engineering (17), Life, Physical & Social Science (19), Business & Financial Operations (13) — investment management',
      zh: '建筑与工程(17)、生命、物理和社会科学(19)、商业与金融运营(13)投资管理方向',
    },
    riskTier: 'medium',
    primarySOC: 17,
  },
  TOFH: {
    code: 'TOFH',
    name: { en: 'Craftsman Persona', zh: '手艺人格型' },
    archetype: { en: 'The Signature Touch', zh: '签名手艺人' },
    tagline: { en: 'People don\'t pay for the haircut — they pay for YOUR haircut', zh: '人们不是为理发买单——是为你的理发买单' },
    superpower: { en: 'Physical craft combined with personal connection — clients come for the experience of YOU', zh: '身体技艺与个人连接的结合——客户是为了体验你而来' },
    kryptonite: { en: 'Scaling is your weakness — AI doesn\'t need appointments', zh: '规模化是你的弱点——AI 不需要预约' },
    color: '#ffd740',
    icon: '✂️',
    description: {
      en: 'Tacit + Objective + Flexible + Human: Physical skills needed + clients come for you specifically',
      zh: '隐+客+弹+人：需要身体技能+客户认你这个人',
    },
    typicalJobs: {
      en: 'Personal Care & Service (39)',
      zh: '个人护理和服务(39)',
    },
    riskTier: 'medium',
    primarySOC: 39,
  },
  TORP: {
    code: 'TORP',
    name: { en: 'Precision Operator', zh: '精密操控型' },
    archetype: { en: 'The Steady Hand', zh: '不颤之手' },
    tagline: { en: 'One wrong move and it\'s over — that\'s why they need you', zh: '一步走错就完了——这就是为什么他们需要你' },
    superpower: { en: 'Split-second physical judgment in irreversible situations', zh: '在不可逆情境中做出瞬间的身体判断' },
    kryptonite: { en: 'Surgical robots and autonomous vehicles are already in trials', zh: '手术机器人和自动驾驶汽车已经在试验了' },
    color: '#ff8f00',
    icon: '🎯',
    description: {
      en: 'Tacit + Objective + Rigid + Product: Physical experience needed + errors are irreversible',
      zh: '隐+客+刚+事：需要身体经验+出错不可逆',
    },
    typicalJobs: {
      en: 'Healthcare Practitioners & Technical (29) — surgical, Transportation & Material Moving (53) — aviation, Construction & Extraction (47) — precision',
      zh: '医疗从业者和技术人员(29)外科方向、运输和物料搬运(53)飞行方向、建筑施工和采掘(47)精密方向',
    },
    riskTier: 'medium',
    primarySOC: 29,
  },
  TSFP: {
    code: 'TSFP',
    name: { en: 'Artisan Creator', zh: '匠心创作型' },
    archetype: { en: 'The Soul Craftsman', zh: '灵魂匠人' },
    tagline: { en: 'Your imperfections are what make your work perfect', zh: '你的不完美恰恰是作品完美的原因' },
    superpower: { en: 'Physical mastery meets artistic vision — each piece carries your signature', zh: '身体技艺与艺术视野的结合——每件作品都带着你的签名' },
    kryptonite: { en: 'Mass production doesn\'t need signatures', zh: '量产不需要签名' },
    color: '#ffe082',
    icon: '🏺',
    description: {
      en: 'Tacit + Subjective + Flexible + Product: Physical experience + subjective quality, but fixable errors, results-only',
      zh: '隐+主+弹+事：身体经验+好坏靠主观，但可试错、只看结果',
    },
    typicalJobs: {
      en: 'Food Preparation & Serving (35) — independent chef, Farming, Fishing & Forestry (45)',
      zh: '餐饮制备和服务(35)独立主厨方向、农业、渔业和林业(45)',
    },
    riskTier: 'medium',
    primarySOC: 35,
  },
  // ── Low (1/4 AI favorable) ──
  ESRH: {
    code: 'ESRH',
    name: { en: 'Authority Advisor', zh: '权威顾问型' },
    archetype: { en: 'The Oracle', zh: '神谕者' },
    tagline: { en: 'People trust your judgment with their careers, fortunes, and lives', zh: '人们把职业、财富和生命交给你的判断' },
    superpower: { en: 'Decades of judgment that carries legal and moral weight — AI has opinions, you have authority', zh: '数十年积累的判断力，承载着法律和道德分量——AI 有意见，你有权威' },
    kryptonite: { en: 'AI is accessible 24/7 and costs nothing — some will choose convenience over credentials', zh: 'AI 全天候可用且免费——有些人会选择便利而非资历' },
    color: '#00c853',
    icon: '🔮',
    description: {
      en: 'Explicit + Subjective + Rigid + Human: AI can learn knowledge, but subjective quality + high liability + clients trust the person',
      zh: '显+主+刚+人：AI能学知识，但好坏靠主观+高责任+客户认人',
    },
    typicalJobs: {
      en: 'Legal (23) — partners, Management (11) — consulting, Healthcare Practitioners & Technical (29) — attending physicians',
      zh: '法律(23)合伙人方向、管理(11)咨询方向、医疗从业者和技术人员(29)主治方向',
    },
    riskTier: 'low',
    primarySOC: 23,
  },
  TORH: {
    code: 'TORH',
    name: { en: 'Life Guardian', zh: '生命守护型' },
    archetype: { en: 'The Healing Hand', zh: '疗愈之手' },
    tagline: { en: 'When lives are on the line, no one asks for the AI', zh: '命悬一线时，没人想要 AI' },
    superpower: { en: 'Physical healing skill combined with irreversible stakes and deep patient trust', zh: '身体治愈技能结合不可逆的风险和深厚的患者信任' },
    kryptonite: { en: 'AI diagnostics are already more accurate — the hands may be last to go, but the mind goes first', zh: 'AI 诊断已经更准确了——双手可能最后被替代，但大脑会先被取代' },
    color: '#66bb6a',
    icon: '🫀',
    description: {
      en: 'Tacit + Objective + Rigid + Human: Physical experience + irreversible errors + patient trust',
      zh: '隐+客+刚+人：身体经验+出错不可逆+患者信任关系',
    },
    typicalJobs: {
      en: 'Healthcare Practitioners & Technical (29) — dental/obstetric, Healthcare Support (31)',
      zh: '医疗从业者和技术人员(29)口腔/产科方向、医疗辅助(31)',
    },
    riskTier: 'low',
    primarySOC: 29,
  },
  TSFH: {
    code: 'TSFH',
    name: { en: 'Soul Expresser', zh: '灵魂表达型' },
    archetype: { en: 'The Irreplaceable', zh: '不可替代者' },
    tagline: { en: 'You ARE the product — no one can automate who you are', zh: '你就是产品本身——没人能自动化你这个人' },
    superpower: { en: 'Your identity IS the value — physical artistry, subjective taste, and personal presence fused into one', zh: '你的身份就是价值——身体技艺、主观品味和个人存在融为一体' },
    kryptonite: { en: 'Deepfakes and AI avatars are blurring the line between real and synthetic presence', zh: '深度伪造和 AI 虚拟人正在模糊真实与合成存在的界限' },
    color: '#69f0ae',
    icon: '🦋',
    description: {
      en: 'Tacit + Subjective + Flexible + Human: Physical experience + subjective quality + the person IS the work',
      zh: '隐+主+弹+人：身体经验+好坏靠主观+人本身就是作品',
    },
    typicalJobs: {
      en: 'Arts, Design, Entertainment, Sports & Media (27) — performing arts',
      zh: '艺术、设计、娱乐、体育和媒体(27)表演方向',
    },
    riskTier: 'low',
    primarySOC: 27,
  },
  TSRP: {
    code: 'TSRP',
    name: { en: 'Extreme Judgment', zh: '极限判断型' },
    archetype: { en: 'The Last Call', zh: '终极裁决者' },
    tagline: { en: 'In chaos, you decide who lives — AI freezes', zh: '混乱中，你决定谁活——AI 死机了' },
    superpower: { en: 'Irreversible physical decisions under extreme uncertainty — no training data exists for this', zh: '极端不确定性下做出不可逆的身体决策——不存在这类训练数据' },
    kryptonite: { en: 'Predictive AI may reduce the chaos you thrive in', zh: '预测性 AI 可能会减少你赖以生存的混乱' },
    color: '#81c784',
    icon: '⚡',
    description: {
      en: 'Tacit + Subjective + Rigid + Product: Physical experience + subjective quality + irreversible errors',
      zh: '隐+主+刚+事：身体经验+好坏靠主观+出错不可逆',
    },
    typicalJobs: {
      en: 'Protective Service (33), Military Specific (55), Healthcare Practitioners & Technical (29) — emergency medicine',
      zh: '保护性服务(33)、军事专属(55)、医疗从业者和技术人员(29)急诊方向',
    },
    riskTier: 'low',
    primarySOC: 33,
  },
  // ── Extreme low (0/4 AI favorable) ──
  TSRH: {
    code: 'TSRH',
    name: { en: 'Full Barrier', zh: '全维壁垒型' },
    archetype: { en: 'The Iron Fortress', zh: '铁壁堡垒' },
    tagline: { en: 'Four walls between you and AI — it can\'t even see you', zh: '你和 AI 之间隔着四道墙——它连你的影子都看不到' },
    superpower: { en: 'Every dimension blocks AI: tacit knowledge, subjective judgment, irreversible stakes, and human trust', zh: '每个维度都阻断 AI：隐性知识、主观判断、不可逆风险、人际信任' },
    kryptonite: { en: 'Your fortress is strong — but the world around it is changing', zh: '你的堡垒很坚固——但周围的世界在变' },
    color: '#34d399',
    icon: '🏰',
    description: {
      en: 'Tacit + Subjective + Rigid + Human: All four dimensions block AI replacement',
      zh: '隐+主+刚+人：四个维度全部阻断AI替代链路',
    },
    typicalJobs: {
      en: 'Management (11) — top executives, Community & Social Service (21), Arts, Design, Entertainment, Sports & Media (27) — elite athletes',
      zh: '管理(11)最高层、社区和社会服务(21)、艺术、设计、娱乐、体育和媒体(27)顶级运动员方向',
    },
    riskTier: 'extreme-low',
    primarySOC: 11,
  },
};

// ─── Exports ─────────────────────────────────────────────────────────────────

export const QUIZ_DIMENSIONS: QuizDimension[] = [
  DIMENSION_LEARNABILITY,
  DIMENSION_EVALUATION,
  DIMENSION_RISK,
  DIMENSION_HUMAN,
];

/** All 16 core questions in order */
export const ALL_CORE_QUESTIONS: QuizQuestion[] = QUIZ_DIMENSIONS.flatMap(d => d.questions);

/** Total core questions count */
export const CORE_QUESTION_COUNT = ALL_CORE_QUESTIONS.length; // 16

/** Total snapshot questions count */
export const SNAPSHOT_QUESTION_COUNT = AI_SNAPSHOT_QUESTIONS.length; // 4

/** Risk tier display info */
export const RISK_TIER_INFO: Record<ProfileType['riskTier'], {
  label: { en: string; zh: string };
  color: string;
  probability: { min: number; max: number };
}> = {
  'extreme-high': {
    label: { en: 'Extreme High Risk', zh: '极高风险' },
    color: '#ff1744',
    probability: { min: 80, max: 95 },
  },
  'high': {
    label: { en: 'High Risk', zh: '高风险' },
    color: '#ff6d00',
    probability: { min: 60, max: 80 },
  },
  'medium': {
    label: { en: 'Medium Risk', zh: '中等风险' },
    color: '#ffc107',
    probability: { min: 35, max: 60 },
  },
  'low': {
    label: { en: 'Low Risk', zh: '低风险' },
    color: '#00c853',
    probability: { min: 15, max: 35 },
  },
  'extreme-low': {
    label: { en: 'Very Low Risk', zh: '极低风险' },
    color: '#34d399',
    probability: { min: 5, max: 15 },
  },
};
