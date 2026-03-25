/**
 * AIR 60-Question Full Quiz Data
 *
 * 4 dimensions x 15 questions = 60 total
 * Each dimension has 5 facets with 3 questions each (typically 2F + 1R or 1F + 2R)
 * Target ratio: 9 forward / 6 reverse per dimension (60/40)
 *
 * Based on: docs/air_quiz_60_design.md v2.0
 */

import { QuizQuestion, QuizDimension } from './air_quiz_data';

// =============================================================================
// Dimension 1: Learnability (E/T) — 15 questions
// =============================================================================

export const DIMENSION_LEARNABILITY_FULL: QuizQuestion[] = [
  // Facet 1A: Digitalization (3 questions)
  {
    id: 'Q1_full',
    indicator: 'Digitalization',
    direction: 'forward',
    question: {
      en: 'Where is your daily work mainly done?',
      zh: '你的日常工作主要在哪里完成？',
      ja: 'あなたの日常の仕事は主にどこで行いますか？',
      ko: '일상 업무는 주로 어디에서 하시나요?',
      de: 'Wo wird Ihre taegliche Arbeit hauptsaechlich erledigt?',
    },
    options: [
      { en: 'Almost never use a computer — all hands-on physical work', zh: '几乎不碰电脑，全靠手和身体干活', ja: 'パソコンはほとんど使わない。全部手作業や体を使う仕事', ko: '컴퓨터를 거의 안 씀 — 전부 손과 몸으로 하는 일', de: 'Fast nie am Computer — alles ist praktische Handarbeit' },
      { en: 'Occasionally use a computer, but core work is hands-on', zh: '偶尔用电脑查东西，但核心工作靠动手', ja: 'たまにパソコンを使うけど、メインの仕事は手作業', ko: '가끔 컴퓨터를 쓰지만, 핵심 업무는 직접 손으로', de: 'Gelegentlich am Computer, aber die Kernarbeit ist Handarbeit' },
      { en: 'About half digital, half physical', zh: '电脑和动手差不多各占一半', ja: 'パソコン仕事と手作業が大体半々', ko: '컴퓨터 작업과 손작업이 반반 정도', de: 'Etwa halb digital, halb physisch' },
      { en: 'Mostly done on computers/systems', zh: '大部分在电脑/系统上完成', ja: 'ほとんどパソコンやシステム上で完結', ko: '대부분 컴퓨터/시스템에서 완료', de: 'Groesstenteils am Computer/in Systemen' },
      { en: 'Almost entirely in digital systems', zh: '几乎全在电脑或数字系统里完成', ja: 'ほぼ全部パソコンかデジタルシステムの中で完結', ko: '거의 전부 컴퓨터나 디지털 시스템에서 완료', de: 'Fast ausschliesslich in digitalen Systemen' },
    ],
  },
  {
    id: 'Q2_full',
    indicator: 'Digitalization',
    direction: 'forward',
    question: {
      en: 'How much of your daily work output automatically leaves a digital trail?',
      zh: '你一天的工作产出有多少会自动留下数字记录？',
      ja: '1日の仕事の成果のうち、自動的にデジタル記録が残るのはどのくらいですか？',
      ko: '하루 업무 산출물 중 자동으로 디지털 기록이 남는 비율은 어느 정도인가요?',
      de: 'Wie viel Ihrer taeglichen Arbeitsleistung hinterlaesst automatisch eine digitale Spur?',
    },
    options: [
      { en: 'Almost nothing — results exist in the physical world', zh: '几乎什么都不留，成果在物理世界里', ja: 'ほとんど何も残らない。成果は物理的な世界にある', ko: '거의 남지 않음 — 결과물이 물리적 세계에 존재', de: 'Fast nichts — die Ergebnisse existieren in der physischen Welt' },
      { en: 'A small portion is recorded, most has no digital trace', zh: '少量有记录，大部分没有电子痕迹', ja: '少しは記録があるけど、ほとんど電子的な痕跡はない', ko: '소량만 기록, 대부분 전자 흔적이 없음', de: 'Ein kleiner Teil wird erfasst, das meiste hat keine digitale Spur' },
      { en: 'About half has digital records', zh: '大概一半有数字记录', ja: 'だいたい半分はデジタル記録がある', ko: '대략 절반 정도 디지털 기록이 남음', de: 'Etwa die Haelfte hat digitale Aufzeichnungen' },
      { en: 'Most processes and results have digital records', zh: '大部分工作过程和结果都有数字记录', ja: 'ほとんどの作業過程と結果にデジタル記録がある', ko: '대부분의 업무 과정과 결과에 디지털 기록이 남음', de: 'Die meisten Prozesse und Ergebnisse werden digital erfasst' },
      { en: 'Fully digital, every step is logged', zh: '全程数字化，每一步操作都有日志', ja: '完全にデジタル化されていて、すべてのステップにログが残る', ko: '완전히 디지털화, 모든 단계가 로그로 남음', de: 'Vollstaendig digital, jeder Schritt wird protokolliert' },
    ],
  },
  {
    id: 'Q3_full',
    indicator: 'Digitalization',
    direction: 'reverse',
    question: {
      en: 'How much of your work requires physically touching, inspecting, or handling real objects to make judgments?',
      zh: '你的工作中有多少需要对实物"上手摸一摸、看一看"才能判断的环节？',
      ja: 'あなたの仕事のうち、実物を「手で触って確かめる」必要がある工程はどのくらいありますか？',
      ko: '업무 중 실물을 "직접 만져보고, 눈으로 확인해야" 판단할 수 있는 부분이 얼마나 되나요?',
      de: 'Wie viel Ihrer Arbeit erfordert es, reale Gegenstaende physisch zu beruehren, zu begutachten oder zu handhaben, um Entscheidungen zu treffen?',
    },
    options: [
      { en: 'Almost every step requires hands-on contact with physical objects', zh: '几乎所有环节都需要亲手接触实物', ja: 'ほぼすべての工程で実物に直接触る必要がある', ko: '거의 모든 과정에서 실물을 직접 만져야 함', de: 'Fast jeder Schritt erfordert praktischen Kontakt mit physischen Objekten' },
      { en: 'Most requires hands-on work, a little can be done on screen', zh: '大部分要动手操作，少量看屏幕就行', ja: 'ほとんど手作業が必要で、画面だけでOKなのは少し', ko: '대부분 손으로 작업, 소량만 화면으로 가능', de: 'Das meiste erfordert Handarbeit, weniges kann am Bildschirm erledigt werden' },
      { en: 'Half needs physical handling, half can be done with data', zh: '一半需要上手，一半看数据就能搞定', ja: '半分は実物を触る必要があり、半分はデータで対応できる', ko: '절반은 직접 만져야 하고, 절반은 데이터로 처리 가능', de: 'Die Haelfte erfordert physisches Handling, die Haelfte geht mit Daten' },
      { en: 'Occasionally need to see physical objects, mostly done on screen', zh: '偶尔需要看看实物，大部分在屏幕上完成', ja: 'たまに実物を見る必要があるけど、ほとんど画面上で完結', ko: '가끔 실물을 봐야 하지만, 대부분 화면에서 완료', de: 'Gelegentlich muessen physische Objekte begutachtet werden, das meiste geht am Bildschirm' },
      { en: 'Never need to handle physical objects — purely data and information', zh: '完全不需要碰实物，纯粹跟数据和信息打交道', ja: '実物に触る必要はまったくない。純粋にデータと情報だけ', ko: '실물을 전혀 만질 필요 없음 — 순수하게 데이터와 정보만 다룸', de: 'Physische Objekte werden nie benoetigt — reine Daten- und Informationsarbeit' },
    ],
  },

  // Facet 1B: Knowledge Accessibility (3 questions)
  {
    id: 'Q4_full',
    indicator: 'Knowledge Accessibility',
    direction: 'forward',
    question: {
      en: 'How much of the professional knowledge your work involves can be found online?',
      zh: '你工作涉及的专业知识，网上能找到多少？',
      ja: 'あなたの仕事に必要な専門知識は、ネットでどのくらい見つかりますか？',
      ko: '업무에 필요한 전문 지식을 인터넷에서 얼마나 찾을 수 있나요?',
      de: 'Wie viel des Fachwissens, das Ihre Arbeit erfordert, ist online verfuegbar?',
    },
    options: [
      { en: 'Almost nothing — all internal accumulation or oral transmission', zh: '几乎找不到，全是内部积累或口传心授', ja: 'ほとんど見つからない。全部内部の蓄積や口伝え', ko: '거의 찾을 수 없음 — 전부 내부 축적이나 구전으로만 전해짐', de: 'Fast nichts — alles internes Wissen oder muendliche Weitergabe' },
      { en: 'Basic knowledge is available, but key techniques are insider-only', zh: '基础知识有，但核心技巧只有圈内人知道', ja: '基本的な知識はあるけど、コアなテクニックは業界内の人しか知らない', ko: '기본 지식은 있지만, 핵심 노하우는 업계 내부만 알고 있음', de: 'Grundwissen ist verfuegbar, aber Schluesseltechniken sind Insiderwissen' },
      { en: 'About half can be found, half relies on internal experience', zh: '大概一半能查到，一半靠内部经验', ja: 'だいたい半分はネットで見つかり、半分は内部の経験に頼る', ko: '대략 절반은 검색 가능, 절반은 내부 경험에 의존', de: 'Etwa die Haelfte ist auffindbar, die andere Haelfte beruht auf interner Erfahrung' },
      { en: 'Most has public tutorials and documentation', zh: '绝大部分有公开教程和文档', ja: 'ほとんどが公開されたチュートリアルやドキュメントがある', ko: '대부분 공개된 튜토리얼과 문서가 있음', de: 'Das meiste hat oeffentliche Anleitungen und Dokumentation' },
      { en: 'Everything is online — tutorials, videos, courses, case studies', zh: '网上要什么有什么，教程视频课程案例一应俱全', ja: 'ネットに何でもある。チュートリアル、動画、講座、事例が全部揃っている', ko: '인터넷에 다 있음 — 튜토리얼, 영상, 강좌, 사례 등 완비', de: 'Alles ist online — Tutorials, Videos, Kurse, Fallstudien' },
    ],
  },
  {
    id: 'Q5_full',
    indicator: 'Knowledge Accessibility',
    direction: 'forward',
    question: {
      en: 'If AI read all the books, papers, and textbooks in your field, what percentage of the knowledge your work requires would it have?',
      zh: '如果AI读完了你所在行业所有的书、论文和教材，它能掌握你工作所需知识的百分之多少？',
      ja: 'もしAIがあなたの業界のすべての書籍、論文、教科書を読み終えたら、仕事に必要な知識の何パーセントを習得できると思いますか？',
      ko: 'AI가 당신의 분야에 있는 모든 책, 논문, 교재를 다 읽었다면, 업무에 필요한 지식의 몇 퍼센트를 습득할 수 있을까요?',
      de: 'Wenn eine KI alle Buecher, Fachartikel und Lehrbuecher Ihres Fachgebiets gelesen haette, wie viel Prozent des fuer Ihre Arbeit benoetigten Wissens wuerde sie abdecken?',
    },
    options: [
      { en: 'Less than 20% — book knowledge is just the surface', zh: '不到20%，书本知识只是皮毛', ja: '20%以下。本の知識はほんの表面だけ', ko: '20% 미만 — 책 속 지식은 겉핥기에 불과', de: 'Weniger als 20% — Buchwissen ist nur die Oberflaeche' },
      { en: 'About 30-40% — useful but far from enough', zh: '大约30-40%，有用但远远不够', ja: 'だいたい30〜40%。役には立つけど全然足りない', ko: '약 30-40% — 유용하지만 턱없이 부족', de: 'Etwa 30-40% — nuetzlich, aber bei Weitem nicht genug' },
      { en: 'About 50-60% — a decent foundation', zh: '大约50-60%，能打个基础', ja: 'だいたい50〜60%。基礎は固められる', ko: '약 50-60% — 기초를 다질 수 있는 정도', de: 'Etwa 50-60% — eine solide Grundlage' },
      { en: 'About 70-80% — most can be learned from materials', zh: '大约70-80%，大部分都能从资料里学', ja: 'だいたい70〜80%。ほとんどは資料から学べる', ko: '약 70-80% — 대부분 자료에서 배울 수 있음', de: 'Etwa 70-80% — das meiste laesst sich aus Materialien lernen' },
      { en: 'Over 90% — books cover almost everything', zh: '90%以上，书上基本全覆盖了', ja: '90%以上。本にほぼ全部書いてある', ko: '90% 이상 — 책에 거의 다 나와 있음', de: 'Ueber 90% — Buecher decken fast alles ab' },
    ],
  },
  {
    id: 'Q6_full',
    indicator: 'Knowledge Accessibility',
    direction: 'reverse',
    question: {
      en: 'How did you learn the most critical knowledge for your work?',
      zh: '你工作中最关键的那些知识，是怎么学会的？',
      ja: 'あなたの仕事で最も重要な知識は、どうやって身につけましたか？',
      ko: '업무에서 가장 핵심적인 지식은 어떻게 배우셨나요?',
      de: 'Wie haben Sie das wichtigste Wissen fuer Ihre Arbeit erlernt?',
    },
    options: [
      { en: 'Only through years of personal experience and gradual realization', zh: '只能靠多年的亲身体验慢慢悟出来', ja: '長年の実体験を通じて少しずつ悟るしかなかった', ko: '오랜 세월 직접 경험하며 서서히 깨달을 수밖에 없었음', de: 'Nur durch jahrelange persoenliche Erfahrung und schrittweise Erkenntnis' },
      { en: 'Mainly through mentorship and self-exploration — not in books', zh: '主要靠师傅带和自己摸索，书上找不到', ja: '主に師匠について学んだり自分で模索したりで、本には載っていない', ko: '주로 선배에게 배우고 스스로 터득 — 책에는 없음', de: 'Hauptsaechlich durch Mentoring und Selbstentdeckung — steht in keinem Buch' },
      { en: 'Half from formal learning, half from practice', zh: '一半靠正规学习，一半靠实践积累', ja: '半分は正規の学習から、半分は実践で積み上げた', ko: '절반은 정규 교육, 절반은 실무 경험으로', de: 'Zur Haelfte durch formale Ausbildung, zur Haelfte durch Praxis' },
      { en: 'Most came from school or training programs', zh: '大部分来自学校或培训课程', ja: 'ほとんどが学校や研修プログラムから', ko: '대부분 학교나 교육 과정에서 배움', de: 'Das meiste kam aus der Schule oder Weiterbildungen' },
      { en: 'Almost entirely from textbooks and tutorials', zh: '基本都是从课本和教程里学的', ja: '基本的に全部教科書やチュートリアルから学んだ', ko: '거의 전부 교과서와 튜토리얼에서 배움', de: 'Fast ausschliesslich aus Lehrbuechern und Anleitungen' },
    ],
  },

  // Facet 1C: Process Standardization (3 questions)
  {
    id: 'Q7_full',
    indicator: 'Process Standardization',
    direction: 'forward',
    question: {
      en: 'How "by the book" are your work processes?',
      zh: '你的工作流程有多"按部就班"？',
      ja: 'あなたの仕事の流れは、どのくらい「マニュアル通り」ですか？',
      ko: '업무 프로세스가 얼마나 "정해진 절차대로" 진행되나요?',
      de: 'Wie stark folgen Ihre Arbeitsprozesse festen Ablaeufen?',
    },
    options: [
      { en: 'Almost no fixed process — every situation is new', zh: '几乎没有固定流程，每次都是全新情况', ja: '決まった流れはほとんどない。毎回新しい状況', ko: '정해진 프로세스가 거의 없음 — 매번 새로운 상황', de: 'Fast kein fester Prozess — jede Situation ist neu' },
      { en: 'Some basic steps, but mostly improvisation', zh: '有一些基本步骤，但大部分要灵活应变', ja: '基本的なステップはあるけど、ほとんど臨機応変', ko: '기본 단계는 있지만, 대부분 유연하게 대응해야 함', de: 'Einige Grundschritte, aber groesstenteils Improvisation' },
      { en: 'Half follows procedures, half improvisation', zh: '一半有章可循，一半随机应变', ja: '半分は手順通り、半分は臨機応変', ko: '절반은 절차를 따르고, 절반은 즉흥적으로 대응', de: 'Zur Haelfte nach Vorschrift, zur Haelfte improvisiert' },
      { en: 'Mostly standardized, occasional exceptions', zh: '大部分有标准流程，偶尔遇到例外', ja: 'ほとんどが標準プロセスに沿っていて、たまに例外がある', ko: '대부분 표준 프로세스가 있고, 가끔 예외가 발생', de: 'Groesstenteils standardisiert, gelegentliche Ausnahmen' },
      { en: 'Almost entirely by the manual — just follow it', zh: '几乎完全按操作手册来，照做就行', ja: 'ほぼ完全にマニュアル通り。そのままやればOK', ko: '거의 완전히 매뉴얼대로 — 따라 하면 됨', de: 'Fast vollstaendig nach Handbuch — einfach befolgen' },
    ],
  },
  {
    id: 'Q8_full',
    indicator: 'Process Standardization',
    direction: 'forward',
    question: {
      en: 'Could your work be written into a detailed manual for a newcomer to follow?',
      zh: '你的工作能不能被写成一份详细的操作手册，让新人照着做？',
      ja: 'あなたの仕事を詳しい作業手順書にまとめて、新人がそのまま従えるようにできますか？',
      ko: '당신의 업무를 상세한 매뉴얼로 작성해서 신입사원이 그대로 따라 할 수 있을까요?',
      de: 'Koennte Ihre Arbeit in ein detailliertes Handbuch geschrieben werden, dem ein Neuling folgen kann?',
    },
    options: [
      { en: 'Impossible — too many "it depends" judgment calls', zh: '根本写不出来，太多"看情况"的判断', ja: '絶対無理。「場合による」判断が多すぎる', ko: '도저히 쓸 수 없음 — "상황에 따라 다른" 판단이 너무 많음', de: 'Unmoeglich — zu viele "kommt drauf an"-Entscheidungen' },
      { en: 'Can write an outline, but details depend on personal judgment', zh: '能写个大纲，但细节靠个人悟性', ja: '大枠は書けるけど、細かいところは個人のセンス次第', ko: '대략적인 개요는 쓸 수 있지만, 세부사항은 개인의 판단에 의존', de: 'Man koennte einen Ueberblick schreiben, aber Details haengen von persoenlichem Urteil ab' },
      { en: 'Could cover about half; the other half can\'t be written down', zh: '能覆盖一半，另一半没法写清楚', ja: '半分くらいはカバーできるけど、残り半分は書ききれない', ko: '절반 정도는 커버 가능, 나머지 절반은 글로 설명 불가', de: 'Koennte etwa die Haelfte abdecken; die andere Haelfte laesst sich nicht aufschreiben' },
      { en: 'Most of it can be written very clearly', zh: '大部分都能写得很清楚', ja: 'ほとんどの部分をかなり明確に書ける', ko: '대부분 매우 명확하게 작성 가능', de: 'Das meiste laesst sich sehr klar aufschreiben' },
      { en: 'Absolutely — there\'s already an existing SOP', zh: '完全可以，已经有现成的SOP了', ja: '完全にできる。すでにSOPがある', ko: '완전히 가능 — 이미 기존 SOP가 있음', de: 'Absolut — es gibt bereits eine bestehende SOP' },
    ],
  },
  {
    id: 'Q9_full',
    indicator: 'Process Standardization',
    direction: 'reverse',
    question: {
      en: 'How often do you need to make a decision with no precedent to reference?',
      zh: '你在工作中多久需要做一次"没有先例可参考"的决定？',
      ja: '「前例のない」判断をしなければならないのは、どのくらいの頻度ですか？',
      ko: '업무 중 "참고할 선례가 없는" 결정을 얼마나 자주 내려야 하나요?',
      de: 'Wie oft muessen Sie eine Entscheidung treffen, fuer die es keinen Praezedenzfall gibt?',
    },
    options: [
      { en: 'Every day — having no precedent is the norm', zh: '每天都有，没有先例是常态', ja: '毎日ある。前例がないのが普通', ko: '매일 있음 — 선례가 없는 것이 일상', de: 'Jeden Tag — kein Praezedenzfall ist der Normalfall' },
      { en: 'At least several times a week', zh: '每周至少好几次', ja: '週に何回もある', ko: '일주일에 최소 몇 번', de: 'Mindestens mehrmals pro Woche' },
      { en: 'A few times a month', zh: '每个月会碰到几次', ja: '月に数回くらい', ko: '한 달에 몇 번 정도', de: 'Ein paar Mal im Monat' },
      { en: 'Rarely — just a few times a year', zh: '很少，一年也就几次', ja: 'めったにない。年に数回程度', ko: '거의 없음 — 일 년에 몇 번 정도', de: 'Selten — nur ein paar Mal im Jahr' },
      { en: 'Never — there are established solutions for every situation', zh: '从来没有，所有情况都有现成方案', ja: '一度もない。すべての状況に既存の解決策がある', ko: '전혀 없음 — 모든 상황에 기존 해결책이 있음', de: 'Nie — fuer jede Situation gibt es eine bewaeaehrte Loesung' },
    ],
  },

  // Facet 1D: Tacit Knowledge Depth (3 questions)
  {
    id: 'Q10_full',
    indicator: 'Tacit Knowledge Depth',
    direction: 'reverse',
    question: {
      en: 'How much does your work depend on "hard to articulate" experience?',
      zh: '你的工作有多依赖"只可意会不可言传"的经验？',
      ja: 'あなたの仕事は「言葉では伝えにくい」経験にどのくらい頼っていますか？',
      ko: '업무가 "말로는 전달할 수 없는" 경험에 얼마나 의존하나요?',
      de: 'Wie sehr haengt Ihre Arbeit von "schwer zu artikulierender" Erfahrung ab?',
    },
    options: [
      { en: 'Entirely relies on years of cultivated "feel" — hard to explain', zh: '全靠多年修炼的"感觉"，说都说不清楚', ja: '長年磨いた「感覚」がすべて。説明しようがない', ko: '전적으로 오랜 수련으로 얻은 "감"에 의존 — 설명할 수 없음', de: 'Beruht vollstaendig auf jahrelang kultiviertem "Gefuehl" — schwer zu erklaeren' },
      { en: 'Heavily depends on long-accumulated intuition and feel', zh: '非常依赖长期积累的直觉和手感', ja: '長期間で培った直感や手の感覚にかなり頼っている', ko: '오래 축적된 직감과 손감각에 크게 의존', de: 'Haengt stark von langjaehrig aufgebauter Intuition und Gespuer ab' },
      { en: 'Needs some experience, but can be taught', zh: '需要一定经验积累，但也能教会别人', ja: 'ある程度の経験は必要だけど、教えることもできる', ko: '어느 정도 경험이 필요하지만, 남에게 가르칠 수도 있음', de: 'Erfordert etwas Erfahrung, laesst sich aber vermitteln' },
      { en: 'Some small tricks but learnable quickly', zh: '有一点小技巧但很快能学会', ja: 'ちょっとしたコツはあるけど、すぐ覚えられる', ko: '약간의 요령이 있지만 금방 배울 수 있음', de: 'Einige kleine Kniffe, aber schnell erlernbar' },
      { en: 'Not at all — a newbie can do it with the manual', zh: '完全不依赖，照说明书新手也能做', ja: 'まったく頼っていない。マニュアルがあれば新人でもできる', ko: '전혀 의존하지 않음 — 매뉴얼만 보면 신입도 가능', de: 'Ueberhaupt nicht — ein Neuling kann es mit dem Handbuch machen' },
    ],
  },
  {
    id: 'Q11_full',
    indicator: 'Tacit Knowledge Depth',
    direction: 'reverse',
    question: {
      en: 'If you were teaching a smart but completely inexperienced person your job, what would be the hardest part to teach?',
      zh: '如果让你教一个聪明但完全没经验的人做你的工作，你觉得最难教的是什么？',
      ja: '頭はいいけどまったく未経験の人にあなたの仕事を教えるとしたら、一番教えにくいのは何ですか？',
      ko: '똑똑하지만 경험이 전혀 없는 사람에게 당신의 일을 가르친다면, 가장 어려운 부분은 무엇일까요?',
      de: 'Wenn Sie einem intelligenten, aber voellig unerfahrenen Menschen Ihre Arbeit beibringen wuerden, was waere am schwersten zu lehren?',
    },
    options: [
      { en: 'Almost everything is hard to teach — just "watch and learn over time"', zh: '几乎所有东西都难教，只能"跟着干慢慢悟"', ja: 'ほぼ全部教えにくい。「見て覚えて」としか言えない', ko: '거의 모든 것이 가르치기 어려움 — "옆에서 보면서 서서히 익히는" 수밖에 없음', de: 'Fast alles ist schwer zu lehren — einfach "zuschauen und mit der Zeit lernen"' },
      { en: 'Core skills can\'t be explained — only learned through extensive practice', zh: '核心技能说不清楚，只能靠大量实践体会', ja: 'コアスキルは説明できない。大量の実践でしか身につかない', ko: '핵심 기술은 설명이 안 됨 — 많은 실전 경험으로만 체득 가능', de: 'Kernfaehigkeiten lassen sich nicht erklaeren — nur durch umfangreiche Praxis erlernbar' },
      { en: 'Some things can be taught, some must be figured out on their own', zh: '有些能教，有些只能靠自己摸索', ja: '教えられるものもあれば、自分で掴むしかないものもある', ko: '일부는 가르칠 수 있고, 일부는 스스로 깨달아야 함', de: 'Manches laesst sich beibringen, anderes muss man selbst herausfinden' },
      { en: 'Most can be taught clearly, a few need some practice', zh: '大部分能教明白，少数需要自己练练', ja: 'ほとんどは教えられる。少しだけ自分で練習が必要', ko: '대부분 가르칠 수 있고, 소수만 연습이 필요', de: 'Das meiste laesst sich klar vermitteln, weniges erfordert etwas Uebung' },
      { en: 'Everything can be taught — just step by step', zh: '都能教，一步步教就行', ja: '全部教えられる。ステップバイステップでOK', ko: '전부 가르칠 수 있음 — 차근차근 알려주면 됨', de: 'Alles laesst sich beibringen — einfach Schritt fuer Schritt' },
    ],
  },
  {
    id: 'Q12_full',
    indicator: 'Tacit Knowledge Depth',
    direction: 'forward',
    question: {
      en: 'When making work decisions, what proportion can be explained with logical reasoning rather than "gut feeling"?',
      zh: '你工作中做决策时，多大比例是可以用逻辑推理解释的，而不是靠"直觉"？',
      ja: '仕事で判断を下すとき、「直感」ではなく論理的に説明できる割合はどのくらいですか？',
      ko: '업무에서 의사결정을 할 때, 논리적으로 설명 가능한 비율은 어느 정도인가요? ("직감"이 아니라)',
      de: 'Wie viel Ihrer Arbeitsentscheidungen laesst sich mit logischem Denken erklaeren, anstatt auf "Bauchgefuehl" zu beruhen?',
    },
    options: [
      { en: 'Less than 20% — mostly gut feeling', zh: '不到20%，绝大部分靠直觉', ja: '20%以下。ほとんど直感', ko: '20% 미만 — 대부분 직감에 의존', de: 'Weniger als 20% — groesstenteils Bauchgefuehl' },
      { en: 'About 30-40% — gut feeling dominates', zh: '大约30-40%，直觉居多', ja: 'だいたい30〜40%。直感の方が多い', ko: '약 30-40% — 직감이 우세', de: 'Etwa 30-40% — Bauchgefuehl ueberwiegt' },
      { en: 'About half and half', zh: '差不多一半一半', ja: 'だいたい半々', ko: '대략 반반', de: 'Etwa halb und halb' },
      { en: 'About 70-80% can be logically explained', zh: '大约70-80%都能说出理由', ja: 'だいたい70〜80%は理由を説明できる', ko: '약 70-80%는 논리적으로 설명 가능', de: 'Etwa 70-80% lassen sich logisch erklaeren' },
      { en: 'Nearly 100% — every decision has a clear basis', zh: '几乎100%，每个决定都有明确依据', ja: 'ほぼ100%。すべての判断に明確な根拠がある', ko: '거의 100% — 모든 결정에 명확한 근거가 있음', de: 'Nahezu 100% — jede Entscheidung hat eine klare Grundlage' },
    ],
  },

  // Facet 1E: Novelty & Change (3 questions)
  {
    id: 'Q13_full',
    indicator: 'Novelty & Change',
    direction: 'reverse',
    question: {
      en: 'How often does your work encounter completely new situations that no one has seen before?',
      zh: '你的工作多久会遇到一次"谁都没见过"的全新情况？',
      ja: '「誰も見たことがない」まったく新しい状況に遭遇するのは、どのくらいの頻度ですか？',
      ko: '업무에서 "아무도 본 적 없는" 완전히 새로운 상황을 얼마나 자주 만나나요?',
      de: 'Wie oft stoesst Ihre Arbeit auf voellig neue Situationen, die noch niemand zuvor erlebt hat?',
    },
    options: [
      { en: 'Constantly — every project is uncharted territory', zh: '一直在变，每个项目都是未知领域', ja: '常に変わっている。すべてのプロジェクトが未知の領域', ko: '계속 변함 — 매 프로젝트가 미지의 영역', de: 'Staendig — jedes Projekt ist Neuland' },
      { en: 'Often — the landscape shifts every few months', zh: '经常变，每隔几个月情况就不一样了', ja: 'よく変わる。数ヶ月ごとに状況が違う', ko: '자주 변함 — 몇 달마다 상황이 달라짐', de: 'Haeufig — die Rahmenbedingungen aendern sich alle paar Monate' },
      { en: 'Sometimes — new challenges come up regularly', zh: '时不时有，新挑战定期出现', ja: 'ときどきある。新しい課題が定期的に出てくる', ko: '가끔 있음 — 새로운 도전이 정기적으로 등장', de: 'Manchmal — neue Herausforderungen treten regelmaessig auf' },
      { en: 'Rarely — occasional new cases, mostly routine', zh: '很少，偶尔有新情况但大部分是常规', ja: 'めったにない。たまに新しい状況があるけど、ほとんどルーティン', ko: '드물게 — 가끔 새로운 경우가 있지만 대부분 일상적', de: 'Selten — gelegentlich neue Faelle, aber meist Routine' },
      { en: 'Almost never — same patterns day after day', zh: '几乎不会，天天都是一样的套路', ja: 'ほぼない。毎日同じパターン', ko: '거의 없음 — 매일 같은 패턴의 반복', de: 'Fast nie — jeden Tag dieselben Muster' },
    ],
  },
  {
    id: 'Q14_full',
    indicator: 'Novelty & Change',
    direction: 'forward',
    question: {
      en: 'How many of your work tasks have you "done something similar before"?',
      zh: '你的工作任务有多少是"之前做过类似的"？',
      ja: 'あなたの仕事のタスクのうち、「以前に似たようなことをやったことがある」ものはどのくらいありますか？',
      ko: '업무 과제 중 "전에 비슷한 것을 해본 적 있는" 것은 어느 정도인가요?',
      de: 'Wie viele Ihrer Arbeitsaufgaben sind solche, bei denen Sie "etwas Aehnliches schon mal gemacht haben"?',
    },
    options: [
      { en: 'Almost every time is brand new — no reference', zh: '几乎每次都是全新的，找不到参考', ja: 'ほぼ毎回が全く新しい。参考になるものがない', ko: '거의 매번 완전히 새로움 — 참고할 것이 없음', de: 'Fast jedes Mal ist alles voellig neu — kein Anhaltspunkt' },
      { en: 'Mostly new, occasionally can apply past experience', zh: '大部分是新的，偶尔能套用以前的经验', ja: 'ほとんどが新しい。たまに過去の経験を活かせる', ko: '대부분 새롭고, 가끔 이전 경험을 적용할 수 있음', de: 'Groesstenteils neu, gelegentlich kann man auf frueehere Erfahrung zurueckgreifen' },
      { en: 'About half are familiar patterns', zh: '大概一半是熟悉的模式', ja: 'だいたい半分は馴染みのあるパターン', ko: '약 절반은 익숙한 패턴', de: 'Etwa die Haelfte sind vertraute Muster' },
      { en: 'Most have similar cases to reference', zh: '大部分都有可参考的类似案例', ja: 'ほとんどに参考にできる類似の事例がある', ko: '대부분 참고할 수 있는 유사 사례가 있음', de: 'Die meisten haben aehnliche Referenzfaelle' },
      { en: 'Almost all are repetitive standard tasks', zh: '几乎全是重复的标准任务', ja: 'ほぼ全部が繰り返しの定型タスク', ko: '거의 전부 반복적인 표준 업무', de: 'Fast alle sind wiederholende Standardaufgaben' },
    ],
  },
  {
    id: 'Q15_full',
    indicator: 'Novelty & Change',
    direction: 'forward',
    question: {
      en: 'Has the way work is done in your industry changed much in the past 5 years?',
      zh: '你所在的行业，过去5年的工作方式变化大吗？',
      ja: 'あなたの業界では、過去5年間で仕事のやり方は大きく変わりましたか？',
      ko: '당신이 속한 업계에서 지난 5년간 업무 방식의 변화가 컸나요?',
      de: 'Hat sich die Arbeitsweise in Ihrer Branche in den letzten 5 Jahren stark veraendert?',
    },
    options: [
      { en: 'Completely transformed — methods from 5 years ago are obsolete', zh: '变化翻天覆地，五年前的方法完全不能用了', ja: '激変した。5年前の方法はもう完全に使えない', ko: '완전히 뒤바뀜 — 5년 전 방법은 전혀 쓸 수 없음', de: 'Voellig umgekrempelt — Methoden von vor 5 Jahren sind ueberholt' },
      { en: 'Big changes — core skills need constant updating', zh: '变化很大，核心技能需要不断更新', ja: 'かなり変わった。コアスキルを常にアップデートする必要がある', ko: '변화가 큼 — 핵심 역량을 계속 업데이트해야 함', de: 'Grosse Veraenderungen — Kernkompetenzen muessen staendig aktualisiert werden' },
      { en: 'Some changes, but fundamentals remain the same', zh: '有一些变化，但基本功还是一样', ja: 'いくつか変化はあるけど、基本的なスキルは同じ', ko: '어느 정도 변화는 있지만, 기본기는 그대로', de: 'Einige Veraenderungen, aber die Grundlagen bleiben gleich' },
      { en: 'Not much change — most methods are the same', zh: '变化不大，大部分方法还是老一套', ja: 'あまり変わっていない。ほとんどの方法はそのまま', ko: '변화가 크지 않음 — 대부분 예전 방식 그대로', de: 'Wenig Veraenderung — die meisten Methoden sind dieselben' },
      { en: 'Almost no change — same as 10 years ago', zh: '几乎没变，十年前怎么干现在还怎么干', ja: 'ほとんど変わっていない。10年前と同じやり方', ko: '거의 변하지 않음 — 10년 전이나 지금이나 똑같이 함', de: 'Fast keine Veraenderung — wie vor 10 Jahren' },
    ],
  },
];

// =============================================================================
// Dimension 2: Evaluation Objectivity (O/S) — 15 questions
// =============================================================================

export const DIMENSION_EVALUATION_FULL: QuizQuestion[] = [
  // Facet 2A: Measurability (3 questions)
  {
    id: 'Q16_full',
    indicator: 'Measurability',
    direction: 'forward',
    question: {
      en: 'Can your work quality be scored with clear numerical metrics?',
      zh: '你的工作做得好不好，能用明确的数字指标来打分吗？',
      ja: 'あなたの仕事の出来は、明確な数値指標でスコアリングできますか？',
      ko: '업무를 잘했는지 못했는지, 명확한 수치 지표로 평가할 수 있나요?',
      de: 'Kann die Qualitaet Ihrer Arbeit mit klaren numerischen Kennzahlen bewertet werden?',
    },
    options: [
      { en: 'Impossible to score — quality is purely subjective', zh: '完全没法打分，好坏全凭感觉', ja: 'まったく無理。良し悪しは完全に感覚', ko: '전혀 점수를 매길 수 없음 — 잘하고 못하고가 전적으로 느낌', de: 'Unmoeglich zu bewerten — Qualitaet ist rein subjektiv' },
      { en: 'Mostly subjective, few things are quantifiable', zh: '大部分靠主观评价，少数能量化', ja: 'ほとんどが主観的な評価で、数値化できるのは少し', ko: '대부분 주관적 평가, 소수만 정량화 가능', de: 'Groesstenteils subjektiv, weniges ist quantifizierbar' },
      { en: 'Half quantifiable, half subjective', zh: '一半量化打分，一半靠感觉', ja: '半分は数値でスコアリングでき、半分は感覚に頼る', ko: '절반은 정량 평가, 절반은 느낌으로', de: 'Zur Haelfte quantifizierbar, zur Haelfte subjektiv' },
      { en: 'Mostly clear metrics, few subjective ones', zh: '大部分有清晰指标，少数靠主观', ja: 'ほとんどに明確な指標があり、主観的なのは少しだけ', ko: '대부분 명확한 지표가 있고, 소수만 주관적', de: 'Groesstenteils klare Kennzahlen, wenig Subjektives' },
      { en: 'Almost everything has clear KPIs or benchmarks', zh: '几乎都有明确KPI或达标线', ja: 'ほぼすべてに明確なKPIや達成基準がある', ko: '거의 전부 명확한 KPI나 달성 기준이 있음', de: 'Fast alles hat klare KPIs oder Benchmarks' },
    ],
  },
  {
    id: 'Q17_full',
    indicator: 'Measurability',
    direction: 'forward',
    question: {
      en: 'After completing a task, how quickly can you tell if it was done well?',
      zh: '你做完一件事后，多快能知道做得好不好？',
      ja: '一つの仕事を終えた後、出来が良かったかどうかどのくらいの速さでわかりますか？',
      ko: '일을 마친 후, 잘했는지 얼마나 빨리 알 수 있나요?',
      de: 'Wie schnell koennen Sie nach Abschluss einer Aufgabe erkennen, ob sie gut erledigt wurde?',
    },
    options: [
      { en: 'May not know for years — impact unfolds slowly', zh: '可能几年都不知道，影响慢慢才显现', ja: '何年もわからないかもしれない。影響はゆっくり現れる', ko: '몇 년이 지나도 모를 수 있음 — 영향이 서서히 나타남', de: 'Moegglicherweise erst nach Jahren — die Auswirkungen entfalten sich langsam' },
      { en: 'Can only be evaluated months later', zh: '几个月后才能评估效果', ja: '数ヶ月後にやっと効果を評価できる', ko: '몇 달 후에야 효과를 평가할 수 있음', de: 'Erst nach Monaten bewertbar' },
      { en: 'Feedback visible within days to weeks', zh: '几天到几周就能看到反馈', ja: '数日〜数週間でフィードバックが見える', ko: '며칠에서 몇 주 안에 피드백을 볼 수 있음', de: 'Feedback sichtbar innerhalb von Tagen bis Wochen' },
      { en: 'Know the result within hours', zh: '几小时内就知道结果', ja: '数時間以内に結果がわかる', ko: '몇 시간 안에 결과를 알 수 있음', de: 'Ergebnis innerhalb von Stunden bekannt' },
      { en: 'Instant feedback — right or wrong is immediately clear', zh: '即时反馈，对错一目了然', ja: '即座にフィードバックがある。正解か不正解か一目瞭然', ko: '즉각 피드백 — 맞고 틀리고가 바로 보임', de: 'Sofortiges Feedback — richtig oder falsch ist sofort klar' },
    ],
  },
  {
    id: 'Q18_full',
    indicator: 'Measurability',
    direction: 'reverse',
    question: {
      en: 'Can your work output be checked for quality using automated tools?',
      zh: '你的工作成果能不能用自动化工具来检查质量？',
      ja: 'あなたの仕事の成果は、自動化ツールで品質チェックできますか？',
      ko: '업무 결과물의 품질을 자동화 도구로 검사할 수 있나요?',
      de: 'Kann Ihr Arbeitsergebnis mit automatisierten Tools auf Qualitaet geprueft werden?',
    },
    options: [
      { en: 'Almost entirely verifiable by automated programs', zh: '几乎可以完全用程序自动验证', ja: 'ほぼ完全にプログラムで自動検証できる', ko: '거의 전부 프로그램으로 자동 검증 가능', de: 'Fast vollstaendig durch automatisierte Programme ueberpruefbar' },
      { en: 'Most can be checked with automated testing or QC', zh: '大部分可以用自动化测试或质检', ja: 'ほとんどが自動テストや品質管理で確認できる', ko: '대부분 자동화 테스트나 품질 검사로 확인 가능', de: 'Das meiste laesst sich mit automatisierten Tests oder Qualitaetskontrollen pruefen' },
      { en: 'Some can be checked with tool assistance', zh: '部分可以用工具辅助检查', ja: '一部はツールを使って補助的にチェックできる', ko: '일부는 도구의 도움으로 검사 가능', de: 'Teile lassen sich mit Tool-Unterstuetzung pruefen' },
      { en: 'Very few aspects can be auto-checked', zh: '极少数环节可以自动检查', ja: 'ごくわずかな工程だけ自動チェックできる', ko: '극소수의 부분만 자동 검사 가능', de: 'Sehr wenige Aspekte sind automatisch pruefbar' },
      { en: 'Not at all — must be judged by humans', zh: '完全不能，必须靠人来判断', ja: 'まったくできない。必ず人が判断しなければならない', ko: '전혀 불가능 — 반드시 사람이 판단해야 함', de: 'Ueberhaupt nicht — muss von Menschen beurteilt werden' },
    ],
  },

  // Facet 2B: Result Convergence (3 questions)
  {
    id: 'Q19_full',
    indicator: 'Result Convergence',
    direction: 'forward',
    question: {
      en: 'For the same task, how much do results vary between different people?',
      zh: '同一个任务，换不同的人来做，结果差异大吗？',
      ja: '同じタスクを違う人がやったら、結果にどのくらい差がありますか？',
      ko: '같은 업무를 다른 사람이 하면, 결과의 차이가 큰가요?',
      de: 'Wie stark unterscheiden sich die Ergebnisse fuer dieselbe Aufgabe zwischen verschiedenen Personen?',
    },
    options: [
      { en: 'Everyone produces completely different results', zh: '每个人做出来都截然不同', ja: '一人一人まったく違う結果になる', ko: '사람마다 결과가 완전히 다름', de: 'Jeder produziert voellig andere Ergebnisse' },
      { en: 'Similar direction but big differences in detail', zh: '大体方向类似但细节差异很大', ja: '大まかな方向は似ているけど、細部の違いが大きい', ko: '대체적인 방향은 비슷하지만, 세부적으로 차이가 큼', de: 'Aehnliche Richtung, aber grosse Unterschiede im Detail' },
      { en: 'Core is similar, with room for personal touch', zh: '核心差不多，有不少个人发挥空间', ja: 'コアは同じで、個人のアレンジの余地がそこそこある', ko: '핵심은 비슷하고, 개인의 재량 여지가 어느 정도 있음', de: 'Der Kern ist aehnlich, mit Raum fuer persoenliche Note' },
      { en: 'Most results are basically the same, minor differences', zh: '大部分结果基本一样，只有小差异', ja: 'ほとんど同じ結果で、わずかな差しかない', ko: '대부분의 결과가 기본적으로 같고, 미세한 차이만 있음', de: 'Die meisten Ergebnisse sind im Wesentlichen gleich, geringfuegige Unterschiede' },
      { en: 'Regardless of who does it, results are nearly identical', zh: '不管谁做，结果几乎一模一样', ja: '誰がやっても結果はほぼ同一', ko: '누가 하든 결과가 거의 동일', de: 'Unabhaengig davon, wer es macht, sind die Ergebnisse nahezu identisch' },
    ],
  },
  {
    id: 'Q20_full',
    indicator: 'Result Convergence',
    direction: 'forward',
    question: {
      en: 'Does your work have a "right answer" or "optimal solution"?',
      zh: '你的工作有没有"标准答案"或"最优解"？',
      ja: 'あなたの仕事には「正解」や「最適解」がありますか？',
      ko: '당신의 업무에 "정답" 또는 "최적해"가 있나요?',
      de: 'Hat Ihre Arbeit eine "richtige Antwort" oder "optimale Loesung"?',
    },
    options: [
      { en: 'Never a right answer — only different choices', zh: '从来没有标准答案，只有不同的选择', ja: '正解なんてない。異なる選択があるだけ', ko: '정답이란 것이 없음 — 다양한 선택지만 있을 뿐', de: 'Nie eine richtige Antwort — nur verschiedene Wahlmoeglichkeiten' },
      { en: 'Rarely clear right or wrong', zh: '很少有明确的对错', ja: '明確な正解・不正解はめったにない', ko: '명확한 옳고 그름이 거의 없음', de: 'Selten klares Richtig oder Falsch' },
      { en: 'Sometimes there\'s an optimal solution, sometimes not', zh: '有时有最优解，有时没有', ja: '最適解があるときもあれば、ないときもある', ko: '때로는 최적해가 있고, 때로는 없음', de: 'Manchmal gibt es eine optimale Loesung, manchmal nicht' },
      { en: 'Most tasks have a clearly correct approach', zh: '大部分任务有明确的正确做法', ja: 'ほとんどのタスクに明確に正しいやり方がある', ko: '대부분의 업무에 명확하게 올바른 방법이 있음', de: 'Die meisten Aufgaben haben einen klar richtigen Ansatz' },
      { en: 'Almost every question has one correct answer', zh: '几乎每个问题都有唯一正确答案', ja: 'ほぼすべての問題に唯一の正解がある', ko: '거의 모든 문제에 유일한 정답이 있음', de: 'Fast jede Frage hat eine einzige richtige Antwort' },
    ],
  },
  {
    id: 'Q21_full',
    indicator: 'Result Convergence',
    direction: 'reverse',
    question: {
      en: 'If three senior peers scored the same work output, how much would their scores differ?',
      zh: '对于同样的工作成果，如果请三位资深同行打分，分数会差多少？',
      ja: '同じ仕事の成果をベテランの同業者3人に評価してもらったら、スコアはどのくらい違いますか？',
      ko: '같은 업무 결과물을 세 명의 숙련된 동종 업계 전문가가 평가한다면, 점수 차이가 얼마나 날까요?',
      de: 'Wenn drei erfahrene Fachkollegen dasselbe Arbeitsergebnis bewerten wuerden, wie stark wuerden ihre Bewertungen voneinander abweichen?',
    },
    options: [
      { en: 'Scores would be very consistent, almost no difference', zh: '分数会非常一致，几乎没差别', ja: 'スコアは非常に一致していて、ほとんど差がない', ko: '점수가 매우 일관될 것임 — 거의 차이 없음', de: 'Bewertungen waeren sehr einheitlich, fast kein Unterschied' },
      { en: 'Very small difference, largely consistent', zh: '差别很小，基本一致', ja: '差はとても小さく、おおむね一致', ko: '차이가 매우 작고, 대체로 일치', de: 'Sehr geringe Abweichung, weitgehend uebereinstimmend' },
      { en: 'Some disagreement, but general direction is the same', zh: '会有一些分歧，但大方向一致', ja: 'いくらかの意見の相違はあるけど、大きな方向性は同じ', ko: '약간의 의견 차이는 있지만, 큰 방향은 같음', de: 'Etwas Uneinigkeit, aber die allgemeine Richtung stimmt' },
      { en: 'Often noticeably different scores', zh: '经常会有明显不同的打分', ja: 'はっきりと異なるスコアになることがよくある', ko: '종종 눈에 띄게 다른 점수가 나옴', de: 'Haeufig deutlich unterschiedliche Bewertungen' },
      { en: 'Completely different scores wouldn\'t be surprising', zh: '打分完全不同也不意外', ja: 'まったく異なるスコアでも驚かない', ko: '완전히 다른 점수가 나와도 놀랍지 않음', de: 'Voellig unterschiedliche Bewertungen waeren keine Ueberraschung' },
    ],
  },

  // Facet 2C: Goal Clarity (3 questions)
  {
    id: 'Q22_full',
    indicator: 'Goal Clarity',
    direction: 'reverse',
    question: {
      en: 'When you receive a task, does the requester know clearly what they want?',
      zh: '你接到任务时，需求方清楚自己想要什么吗？',
      ja: 'タスクを受けたとき、依頼者は自分が何を求めているかわかっていますか？',
      ko: '업무를 받을 때, 요청자가 자신이 원하는 것을 명확히 알고 있나요?',
      de: 'Wenn Sie einen Auftrag erhalten — weiss der Auftraggeber klar, was er moechte?',
    },
    options: [
      { en: 'Requirements are always very clear — just execute', zh: '需求总是非常明确，按要求执行就行', ja: '要件はいつもとても明確。指示通りにやればいい', ko: '요구사항이 항상 매우 명확 — 그대로 실행하면 됨', de: 'Anforderungen sind immer sehr klar — einfach umsetzen' },
      { en: 'Mostly clear, occasionally need to confirm details', zh: '大多数时候清晰，偶尔确认细节', ja: 'ほとんどの場合は明確で、たまに細部を確認する程度', ko: '대부분 명확하고, 가끔 세부사항 확인이 필요', de: 'Meistens klar, gelegentlich muessen Details geklaert werden' },
      { en: 'Half clear, half need to figure out yourself', zh: '一半说得清，一半得自己揣摩', ja: '半分は明確に言えて、半分は自分で汲み取る必要がある', ko: '절반은 명확하고, 절반은 스스로 파악해야 함', de: 'Zur Haelfte klar, zur Haelfte muss man es selbst herausfinden' },
      { en: 'Often "just figure it out" — need to define requirements myself', zh: '经常"你看着办"，得自己定义需求', ja: 'よく「適当にやって」と言われるので、自分で要件を定義する必要がある', ko: '"알아서 해주세요"가 잦아, 직접 요구사항을 정의해야 함', de: 'Oft "machen Sie mal" — ich muss die Anforderungen selbst definieren' },
      { en: 'Almost always "help me think about it"', zh: '几乎总是"你帮我想想吧"', ja: 'ほぼいつも「ちょっと考えてみて」と言われる', ko: '거의 항상 "좀 생각해 봐주세요"라는 식', de: 'Fast immer "denken Sie mal drueber nach fuer mich"' },
    ],
  },
  {
    id: 'Q23_full',
    indicator: 'Goal Clarity',
    direction: 'forward',
    question: {
      en: 'Before starting a task, can you list out a "definition of done" checklist in advance?',
      zh: '你开始一个任务之前，能不能提前列出"做到什么算完成"的清单？',
      ja: 'タスクを始める前に、「ここまでやったら完了」というチェックリストを事前に作れますか？',
      ko: '업무를 시작하기 전에, "여기까지 하면 완료"라는 체크리스트를 미리 만들 수 있나요?',
      de: 'Koennen Sie vor Beginn einer Aufgabe vorab eine "Definition of Done"-Checkliste erstellen?',
    },
    options: [
      { en: 'Not at all — you figure it out as you go', zh: '完全不能，做到哪步算哪步', ja: 'まったく作れない。やりながら考えるしかない', ko: '전혀 못 만듦 — 진행하면서 결정하는 수밖에 없음', de: 'Ueberhaupt nicht — man findet es unterwegs heraus' },
      { en: 'Can only list a general direction, specific criteria are unclear', zh: '只能列个大方向，具体完成标准说不清', ja: '大まかな方向だけは書けるけど、具体的な完了基準は不明確', ko: '대략적인 방향만 정할 수 있고, 구체적 완료 기준은 불명확', de: 'Nur eine grobe Richtung moeglich, spezifische Kriterien unklar' },
      { en: 'Can list some clear conditions, others depend on context', zh: '能列出部分明确条件，部分看情况', ja: '一部の明確な条件は挙げられるけど、残りは状況次第', ko: '일부 명확한 조건은 나열 가능, 나머지는 상황에 따라', de: 'Einige klare Bedingungen auflistbar, andere haengen vom Kontext ab' },
      { en: 'Most completion criteria can be defined in advance', zh: '大部分完成标准都能提前定义', ja: 'ほとんどの完了基準を事前に定義できる', ko: '대부분의 완료 기준을 미리 정의할 수 있음', de: 'Die meisten Abnahmekriterien lassen sich vorab festlegen' },
      { en: 'Can create a very detailed acceptance checklist', zh: '可以列出非常详细的验收清单', ja: '非常に詳細な受入チェックリストを作れる', ko: '매우 상세한 검수 체크리스트를 만들 수 있음', de: 'Es laesst sich eine sehr detaillierte Abnahme-Checkliste erstellen' },
    ],
  },
  {
    id: 'Q24_full',
    indicator: 'Goal Clarity',
    direction: 'forward',
    question: {
      en: 'Is your work goal more like "solve this math problem" or more like "write a good essay"?',
      zh: '你的工作目标，是更像"把这道数学题解出来"还是更像"写一篇好文章"？',
      ja: 'あなたの仕事のゴールは、「この数学の問題を解く」のに近いですか？それとも「良い文章を書く」のに近いですか？',
      ko: '당신의 업무 목표는 "수학 문제 풀기"에 더 가깝나요, 아니면 "좋은 글 쓰기"에 더 가깝나요?',
      de: 'Ist Ihr Arbeitsziel eher wie "diese Matheaufgabe loesen" oder eher wie "einen guten Aufsatz schreiben"?',
    },
    options: [
      { en: 'Completely like writing an essay — standards vary by person', zh: '完全像写好文章——标准因人而异', ja: '完全に文章を書くのに近い — 基準は人それぞれ', ko: '완전히 글쓰기 같음 — 기준이 사람마다 다름', de: 'Voellig wie einen Aufsatz schreiben — Masstaebe variieren je nach Person' },
      { en: 'More like an essay — some basic requirements but quality is subjective', zh: '更像写文章，有些基本要求但好坏很主观', ja: 'どちらかというと文章を書くのに近い。基本的な要件はあるけど良し悪しは主観的', ko: '글쓰기에 더 가까움 — 기본 요건은 있지만 잘하고 못하고는 주관적', de: 'Eher wie ein Aufsatz — einige Grundanforderungen, aber Qualitaet ist subjektiv' },
      { en: 'Both — some tasks have right answers, some don\'t', zh: '两者都有，有些任务有标准答案有些没有', ja: '両方ある。正解があるタスクもあれば、ないタスクもある', ko: '둘 다 — 어떤 업무는 정답이 있고, 어떤 것은 없음', de: 'Beides — manche Aufgaben haben richtige Antworten, manche nicht' },
      { en: 'More like problem-solving — most have clear right or wrong', zh: '更像解题，大部分有明确的对错', ja: 'どちらかというと問題を解くのに近い。ほとんどに明確な正解・不正解がある', ko: '문제 풀이에 더 가까움 — 대부분 명확한 맞고 틀림이 있음', de: 'Eher wie Problemloesung — die meisten haben ein klares Richtig oder Falsch' },
      { en: 'Completely like math — either right or wrong', zh: '完全像解数学题——要么对要么错', ja: '完全に数学の問題を解くのと同じ — 合ってるか間違ってるか', ko: '완전히 수학 문제 같음 — 맞거나 틀리거나', de: 'Voellig wie Mathematik — entweder richtig oder falsch' },
    ],
  },

  // Facet 2D: Taste Dependence (3 questions)
  {
    id: 'Q25_full',
    indicator: 'Taste Dependence',
    direction: 'reverse',
    question: {
      en: 'How much does your work depend on personal aesthetics, taste, or intuitive judgment?',
      zh: '你的工作有多依赖个人审美、品味或直觉判断？',
      ja: 'あなたの仕事は、個人のセンス、テイスト、直感的な判断にどのくらい頼っていますか？',
      ko: '업무가 개인의 심미안, 취향, 직관적 판단에 얼마나 의존하나요?',
      de: 'Wie sehr haengt Ihre Arbeit von persoenlicher Aesthetik, Geschmack oder intuitiver Beurteilung ab?',
    },
    options: [
      { en: 'Not at all — just execute standard operations', zh: '完全不需要，执行标准操作就行', ja: 'まったく必要ない。標準的な作業を実行するだけ', ko: '전혀 필요 없음 — 표준 절차대로 실행하면 됨', de: 'Ueberhaupt nicht — einfach Standardoperationen ausfuehren' },
      { en: 'Occasionally need a bit of aesthetic judgment', zh: '偶尔需要一点审美判断', ja: 'たまにちょっとした美的判断が必要', ko: '가끔 약간의 미적 판단이 필요', de: 'Gelegentlich etwas aesthetisches Urteil noetig' },
      { en: 'Half by standards, half by taste and feel', zh: '一半靠规范标准，一半靠品味感觉', ja: '半分は基準やルールに従い、半分はテイストや感覚で', ko: '절반은 규범과 기준, 절반은 취향과 감각', de: 'Zur Haelfte nach Standards, zur Haelfte nach Geschmack und Gefuehl' },
      { en: 'Heavily depends on aesthetics and insight', zh: '很依赖审美和洞察力', ja: 'センスや洞察力にかなり頼っている', ko: '심미안과 통찰력에 크게 의존', de: 'Haengt stark von Aesthetik und Urteilsvermoegen ab' },
      { en: 'Aesthetics and taste ARE my core competitive advantage', zh: '审美和品味就是我的核心竞争力', ja: '美的感覚とテイストこそが自分のコアな強み', ko: '심미안과 취향이 바로 나의 핵심 경쟁력', de: 'Aesthetik und Geschmack SIND mein zentraler Wettbewerbsvorteil' },
    ],
  },
  {
    id: 'Q26_full',
    indicator: 'Taste Dependence',
    direction: 'reverse',
    question: {
      en: 'In your work, how big is the gap between "good enough" and "just right"?',
      zh: '在你的工作中，"差不多"和"恰到好处"之间的差距有多大？',
      ja: 'あなたの仕事で、「まあまあ」と「ぴったり」の差はどのくらい大きいですか？',
      ko: '당신의 업무에서 "대충 괜찮은 것"과 "딱 맞는 것" 사이의 차이가 얼마나 큰가요?',
      de: 'Wie gross ist bei Ihrer Arbeit der Unterschied zwischen "gut genug" und "genau richtig"?',
    },
    options: [
      { en: 'No difference — roughly right is fine', zh: '没区别，大致对了就行', ja: '差はない。だいたい合っていればOK', ko: '차이가 없음 — 대강 맞으면 됨', de: 'Kein Unterschied — ungefaehr richtig reicht' },
      { en: 'Very small — close enough works most of the time', zh: '区别很小，大部分情况差不多就够', ja: '差はとても小さい。ほとんどの場合「だいたい」で十分', ko: '차이가 매우 작음 — 대부분의 경우 대충 괜찮으면 충분', de: 'Sehr gering — nah genug funktioniert meistens' },
      { en: 'Some occasions need precision, some don\'t', zh: '有些场合需要精到，有些差不多就行', ja: '精密さが求められる場面もあれば、「だいたい」で良い場面もある', ko: '어떤 경우에는 정밀해야 하고, 어떤 경우에는 대충이면 됨', de: 'Manchmal muss es praezise sein, manchmal nicht' },
      { en: 'Often need to nail subtle differences in detail', zh: '经常需要精确把握微妙的细节差别', ja: '微妙なディテールの違いを正確に捉える必要がよくある', ko: '미묘한 디테일의 차이를 정확히 잡아내야 할 때가 많음', de: 'Oft muessen feine Detailunterschiede genau getroffen werden' },
      { en: 'A tiny difference changes everything — must be exactly right', zh: '差一点就是天壤之别，必须恰到好处', ja: 'ちょっとの差が雲泥の差。必ず「ぴったり」でなければならない', ko: '조금만 달라도 천지 차이 — 반드시 딱 맞아야 함', de: 'Ein winziger Unterschied aendert alles — muss genau stimmen' },
    ],
  },
  {
    id: 'Q27_full',
    indicator: 'Taste Dependence',
    direction: 'forward',
    question: {
      en: 'How much of "doing well" at your work is something everyone can agree on?',
      zh: '你工作中的"做得好"，有多少是大家都能达成共识的？',
      ja: 'あなたの仕事の「よくできた」のうち、みんなが合意できる部分はどのくらいですか？',
      ko: '업무에서 "잘했다"는 것에 대해 모두가 의견이 일치하는 경우가 얼마나 되나요?',
      de: 'Wie viel von "gute Arbeit geleistet" ist bei Ihrer Taetigkeit etwas, worueber sich alle einig sind?',
    },
    options: [
      { en: 'Quality depends entirely on who\'s judging — opinions always differ', zh: '好坏完全看谁在评判，意见总是不一样', ja: '良し悪しは完全に評価する人次第。意見はいつも異なる', ko: '잘하고 못하고는 전적으로 누가 평가하느냐에 달림 — 의견이 항상 다름', de: 'Qualitaet haengt voellig davon ab, wer urteilt — Meinungen gehen immer auseinander' },
      { en: 'Most of the time, different people have different views', zh: '大部分时候各人有各人的看法', ja: 'ほとんどの場合、人によって見方が違う', ko: '대부분 사람마다 의견이 다름', de: 'Meistens haben verschiedene Menschen verschiedene Ansichten' },
      { en: 'Basic agreement, but significant disagreement on details', zh: '基本面有共识，细节上分歧较大', ja: '基本的な部分は合意があるけど、細部では大きな意見の相違', ko: '기본적인 부분은 공감대가 있지만, 세부사항에서 의견 차이가 큼', de: 'Grundsaetzliche Uebereinstimmung, aber deutliche Meinungsverschiedenheiten bei Details' },
      { en: 'Consensus on most aspects, disagreement on a few', zh: '大部分方面都有共识，少数有分歧', ja: 'ほとんどの点で合意があり、少しだけ意見が分かれる', ko: '대부분의 면에서 공감대가 있고, 소수에서만 의견이 갈림', de: 'Konsens bei den meisten Aspekten, Meinungsverschiedenheiten bei wenigen' },
      { en: 'Whether it\'s good or not, everyone agrees', zh: '做得好不好，所有人都看法一致', ja: 'よくできたかどうか、全員の意見が一致する', ko: '잘했는지 못했는지 모두가 같은 의견', de: 'Ob gut oder nicht — alle sind sich einig' },
    ],
  },

  // Facet 2E: Cross-domain Synthesis (3 questions)
  {
    id: 'Q28_full',
    indicator: 'Cross-domain Synthesis',
    direction: 'reverse',
    question: {
      en: 'How many different fields of knowledge do you need to combine to make a decision?',
      zh: '你做一个决策需要综合多少个不同领域的知识？',
      ja: '一つの判断を下すのに、いくつの異なる分野の知識を総合する必要がありますか？',
      ko: '의사결정을 할 때 몇 개의 서로 다른 분야의 지식을 종합해야 하나요?',
      de: 'Wie viele verschiedene Fachgebiete muessen Sie fuer eine Entscheidung kombinieren?',
    },
    options: [
      { en: 'Just one — deep expertise in a single area', zh: '一个就够，只需要单一领域的深入知识', ja: '一つで十分。一つの分野の深い専門知識だけでいい', ko: '하나면 충분 — 단일 분야의 깊은 전문성만 필요', de: 'Nur eines — tiefe Expertise in einem einzigen Bereich' },
      { en: 'Mainly one field, occasionally another', zh: '主要一个领域，偶尔涉及另一个', ja: '主に一つの分野で、たまにもう一つの分野にかかわる', ko: '주로 한 분야, 가끔 다른 분야 하나', de: 'Hauptsaechlich ein Fachgebiet, gelegentlich ein weiteres' },
      { en: 'Need to combine 2-3 different fields regularly', zh: '经常需要结合2-3个不同领域', ja: '日常的に2〜3つの異なる分野を組み合わせる必要がある', ko: '정기적으로 2-3개의 서로 다른 분야를 결합해야 함', de: 'Regelmaessig muessen 2-3 verschiedene Gebiete kombiniert werden' },
      { en: 'Routinely synthesize 4+ fields', zh: '日常要综合4个以上领域', ja: '日常的に4つ以上の分野を総合している', ko: '일상적으로 4개 이상의 분야를 종합', de: 'Routinemaessig werden 4+ Fachgebiete synthetisiert' },
      { en: 'My entire job IS connecting dots across unrelated domains', zh: '我的工作本质就是在不相关的领域之间找连接', ja: '私の仕事の本質は、無関係な分野同士のつながりを見つけること', ko: '내 일의 본질이 관련 없는 분야들 사이에서 연결 고리를 찾는 것', de: 'Mein gesamter Job IST es, Verbindungen zwischen unabhaengigen Bereichen herzustellen' },
    ],
  },
  {
    id: 'Q29_full',
    indicator: 'Cross-domain Synthesis',
    direction: 'forward',
    question: {
      en: 'If your work output were given to an AI system to check, how many issues could it find?',
      zh: '你的工作成果交给一个AI系统来检查，它能发现多少问题？',
      ja: 'あなたの仕事の成果をAIシステムにチェックさせたら、どのくらいの問題を見つけられると思いますか？',
      ko: '당신의 업무 결과물을 AI 시스템에게 맡겨 검사한다면, 문제점을 얼마나 찾아낼 수 있을까요?',
      de: 'Wenn Ihr Arbeitsergebnis einem KI-System zur Pruefung gegeben wuerde, wie viele Probleme koennte es finden?',
    },
    options: [
      { en: 'Almost nothing — the issue is whether it "feels right"', zh: '几乎什么都发现不了，问题在于"感觉对不对"', ja: 'ほぼ何も見つけられない。問題は「感覚的に合っているか」', ko: '거의 아무것도 못 찾음 — 문제는 "느낌이 맞는지"에 달려 있음', de: 'Fast nichts — die Frage ist, ob es sich "richtig anfuehlt"' },
      { en: 'Can find surface errors, but can\'t judge core quality', zh: '能查出一些表面错误，但核心质量判断不了', ja: '表面的なエラーは見つけられるけど、コアな品質は判断できない', ko: '표면적인 오류는 찾겠지만, 핵심 품질은 판단 불가', de: 'Oberflaechliche Fehler finden ja, aber die Kernqualitaet nicht beurteilen' },
      { en: 'Can find about half the issues', zh: '能查出大概一半的问题', ja: 'だいたい半分の問題は見つけられる', ko: '대략 절반 정도의 문제를 찾을 수 있음', de: 'Etwa die Haelfte der Probleme finden' },
      { en: 'Most issues can be automatically detected', zh: '大部分问题都能自动检测到', ja: 'ほとんどの問題を自動で検出できる', ko: '대부분의 문제를 자동으로 감지 가능', de: 'Die meisten Probleme koennen automatisch erkannt werden' },
      { en: 'Almost all issues can be automatically found', zh: '几乎所有问题都可以被自动发现', ja: 'ほぼすべての問題を自動で発見できる', ko: '거의 모든 문제를 자동으로 발견 가능', de: 'Fast alle Probleme koennen automatisch gefunden werden' },
    ],
  },
  {
    id: 'Q30_full',
    indicator: 'Cross-domain Synthesis',
    direction: 'forward',
    question: {
      en: 'Does the definition of "what counts as good work" change frequently in your job?',
      zh: '"什么算做得好"在你的工作中变化频繁吗？',
      ja: 'あなたの仕事で「何が良い仕事か」という基準は、よく変わりますか？',
      ko: '당신의 업무에서 "무엇을 잘하는 것인가"의 기준이 자주 바뀌나요?',
      de: 'Aendert sich in Ihrem Beruf haeufig, was als "gute Arbeit" gilt?',
    },
    options: [
      { en: 'Different standard every time — depends on context and people', zh: '每次标准都不同，完全看当时的情况和人', ja: '毎回基準が違う。そのときの状況や人によって完全に異なる', ko: '매번 기준이 다름 — 그때그때 상황과 사람에 따라 완전히 달라짐', de: 'Jedes Mal ein anderer Massstab — haengt von Kontext und Personen ab' },
      { en: 'Standards change often, must constantly adjust', zh: '标准经常变化，要随时调整', ja: '基準はよく変わるので、常に調整が必要', ko: '기준이 자주 바뀌어 수시로 조정해야 함', de: 'Standards aendern sich haeufig, man muss sich staendig anpassen' },
      { en: 'There\'s a basic framework, but specific criteria shift', zh: '有一个基本框架，但具体标准会微调', ja: '基本的な枠組みはあるけど、具体的な基準は微調整される', ko: '기본 틀은 있지만, 구체적 기준은 미세하게 조정됨', de: 'Es gibt ein Grundgeruest, aber spezifische Kriterien verschieben sich' },
      { en: 'Standards are mostly fixed, occasional small adjustments', zh: '标准基本固定，偶尔有小调整', ja: '基準はほぼ固定で、たまに小さな調整がある', ko: '기준이 대체로 고정되어 있고, 가끔 소폭 조정', de: 'Standards sind groesstenteils fest, gelegentlich kleine Anpassungen' },
      { en: 'Standards never change — universally applicable', zh: '标准永远不变，放之四海皆准', ja: '基準は永遠に変わらない。どこでも通用する', ko: '기준이 절대 바뀌지 않음 — 언제 어디서나 동일', de: 'Standards aendern sich nie — universell anwendbar' },
    ],
  },
];

// =============================================================================
// Dimension 3: Risk Tolerance (F/R) — 15 questions (corrected version)
// =============================================================================

export const DIMENSION_RISK_FULL: QuizQuestion[] = [
  // Facet 3A: Error Severity (3 questions)
  {
    id: 'Q31_full',
    indicator: 'Error Severity',
    direction: 'reverse',
    question: {
      en: 'If your work has an error, what\'s the worst that could happen?',
      zh: '你的工作如果出了错，最严重会怎样？',
      ja: 'あなたの仕事でミスがあった場合、最悪どうなりますか？',
      ko: '업무에서 실수가 생기면, 최악의 경우 어떤 일이 벌어지나요?',
      de: 'Was waere das Schlimmste, das passieren koennte, wenn bei Ihrer Arbeit ein Fehler unterlaeuft?',
    },
    options: [
      { en: 'No big deal — just redo it', zh: '没什么大不了，重新来就好', ja: '大したことない。やり直せばいい', ko: '별일 아님 — 다시 하면 됨', de: 'Nicht schlimm — einfach nochmal machen' },
      { en: 'Wastes some time/money, limited impact', zh: '浪费一些时间金钱，影响有限', ja: '多少の時間やお金の無駄になるけど、影響は限定的', ko: '시간과 비용이 좀 낭비되지만, 영향은 제한적', de: 'Kostet etwas Zeit/Geld, begrenzte Auswirkungen' },
      { en: 'Noticeable financial loss or reputation damage', zh: '会造成明显经济损失或名誉受损', ja: 'はっきりとした経済的損失や評判の低下を招く', ko: '눈에 띄는 금전적 손실이나 평판 손상이 발생', de: 'Spuerbarer finanzieller Verlust oder Reputationsschaden' },
      { en: 'Could cause serious property loss or health risks', zh: '可能导致严重财产损失或健康风险', ja: '深刻な財産の損失や健康リスクにつながる可能性がある', ko: '심각한 재산 손실이나 건강 위험을 초래할 수 있음', de: 'Koennte ernsthaften Vermogensschaden oder Gesundheitsrisiken verursachen' },
      { en: 'Could directly endanger lives or cause major safety incidents', zh: '可能直接危及人命或重大安全事故', ja: '直接人命に関わるか、重大な安全事故になり得る', ko: '직접적으로 인명 피해나 대형 안전사고로 이어질 수 있음', de: 'Koennte direkt Menschenleben gefaehrden oder schwere Sicherheitsvorfaelle ausloesen' },
    ],
  },
  {
    id: 'Q32_full',
    indicator: 'Error Severity',
    direction: 'forward',
    question: {
      en: 'How many people could be affected by a single wrong decision you make?',
      zh: '你的一个错误决定最多会影响多少人？',
      ja: 'あなたの一つの誤った判断は、最大で何人に影響を与えますか？',
      ko: '당신의 잘못된 결정 하나가 최대 몇 명에게 영향을 미칠 수 있나요?',
      de: 'Wie viele Menschen koennten von einer einzigen Fehlentscheidung Ihrerseits betroffen sein?',
    },
    options: [
      { en: 'Could affect thousands or more', zh: '可能影响成千上万人甚至更多', ja: '数千人以上に影響する可能性がある', ko: '수천 명 이상에게 영향을 미칠 수 있음', de: 'Koennte Tausende oder mehr betreffen' },
      { en: 'Could impact the company or hundreds of clients', zh: '可能波及整个公司或几百个客户', ja: '会社全体や数百人の顧客に波及する可能性がある', ko: '회사 전체나 수백 명의 고객에게 파급될 수 있음', de: 'Koennte das Unternehmen oder Hunderte von Kunden betreffen' },
      { en: 'Affects the team or dozens of related people', zh: '影响团队或几十个相关的人', ja: 'チームや数十人の関係者に影響する', ko: '팀이나 수십 명의 관련자에게 영향', de: 'Betrifft das Team oder Dutzende betroffene Personen' },
      { en: 'At most affects a few colleagues or clients', zh: '最多影响几个同事或客户', ja: '最大でも数人の同僚や顧客に影響する程度', ko: '최대 몇 명의 동료나 고객에게 영향', de: 'Betrifft hoechstens einige Kollegen oder Kunden' },
      { en: 'Only affects my own work progress', zh: '只影响我自己的工作进度', ja: '自分自身の作業進捗にしか影響しない', ko: '내 자신의 업무 진행에만 영향', de: 'Betrifft nur meinen eigenen Arbeitsfortschritt' },
    ],
  },
  {
    id: 'Q33_full',
    indicator: 'Error Severity',
    direction: 'forward',
    question: {
      en: 'In your work, how big is the practical difference between "80%" and "100%"?',
      zh: '你的工作中，"80分"和"100分"的实际差别有多大？',
      ja: 'あなたの仕事で、「80点」と「100点」の実質的な差はどのくらいありますか？',
      ko: '당신의 업무에서 "80점"과 "100점"의 실질적 차이가 얼마나 큰가요?',
      de: 'Wie gross ist bei Ihrer Arbeit der praktische Unterschied zwischen "80%" und "100%"?',
    },
    options: [
      { en: 'Enormous — 80% could mean a major incident', zh: '差距极大，80分可能意味着重大事故', ja: '差は極めて大きい。80点は重大事故を意味しうる', ko: '차이가 매우 큼 — 80점이면 대형 사고가 날 수 있음', de: 'Enorm — 80% koennte einen schweren Vorfall bedeuten' },
      { en: 'Significant — striving for perfection matters greatly', zh: '差距明显，精益求精非常重要', ja: '差は明らかで、完璧を追求することがとても重要', ko: '차이가 뚜렷함 — 완벽을 추구하는 것이 매우 중요', de: 'Erheblich — Perfektion anzustreben ist sehr wichtig' },
      { en: 'Depends — some situations it matters, some it doesn\'t', zh: '有些场合差距大，有些差不多就行', ja: '差が大きい場面もあれば、「だいたい」で良い場面もある', ko: '경우에 따라 다름 — 어떤 상황에서는 크고, 어떤 상황에서는 별 차이 없음', de: 'Kommt darauf an — in manchen Situationen wichtig, in manchen nicht' },
      { en: 'Not much — 80% is basically good enough', zh: '差距不大，80分基本够用了', ja: '差は小さい。80点で基本的に十分', ko: '별 차이 없음 — 80점이면 충분', de: 'Nicht gross — 80% ist im Grunde ausreichend' },
      { en: 'No difference at all — pass the bar and you\'re done', zh: '完全没区别，达标就行', ja: 'まったく差がない。合格ラインを超えればそれでいい', ko: '전혀 차이 없음 — 기준만 통과하면 됨', de: 'Kein Unterschied — die Schwelle erreichen und fertig' },
    ],
  },

  // Facet 3B: Reversibility (3 questions)
  {
    id: 'Q34_full',
    indicator: 'Reversibility',
    direction: 'reverse',
    question: {
      en: 'If your work has an error, is there a chance to fix it?',
      zh: '你的工作出了错，还有机会补救吗？',
      ja: '仕事でミスがあった場合、挽回するチャンスはありますか？',
      ko: '업무에서 실수가 생기면, 사후에 바로잡을 수 있나요?',
      de: 'Wenn bei Ihrer Arbeit ein Fehler passiert, gibt es eine Moeglichkeit zur Korrektur?',
    },
    options: [
      { en: 'Can undo and revise anytime, no pressure', zh: '随时可以撤回修改，没有压力', ja: 'いつでも取り消して修正できる。プレッシャーなし', ko: '언제든 취소하고 수정 가능 — 부담 없음', de: 'Kann jederzeit rueckgaengig gemacht und ueberarbeitet werden, kein Druck' },
      { en: 'Most errors can be corrected afterward', zh: '大部分错误都能事后弥补', ja: 'ほとんどのミスは事後に修正できる', ko: '대부분의 실수는 사후에 보완 가능', de: 'Die meisten Fehler lassen sich nachtraeglich korrigieren' },
      { en: 'Some can be fixed, some can\'t', zh: '有些能补救，有些不能', ja: '修正できるものもあれば、できないものもある', ko: '일부는 바로잡을 수 있고, 일부는 불가', de: 'Manche lassen sich beheben, manche nicht' },
      { en: 'Most errors are hard to reverse once made', zh: '大部分错误犯了就很难挽回', ja: 'ほとんどのミスは一度やると取り返しがつかない', ko: '대부분의 실수는 일단 저지르면 되돌리기 매우 어려움', de: 'Die meisten Fehler lassen sich nach dem Auftreten kaum rueckgaengig machen' },
      { en: 'Once wrong, almost impossible to fix — no taking it back', zh: '一旦出错几乎无法补救，覆水难收', ja: '一度ミスしたらほぼ修復不可能。覆水盆に返らず', ko: '한번 잘못되면 거의 복구 불가능 — 엎질러진 물', de: 'Einmal falsch, fast unmoeglich zu beheben — nicht rueckgaengig zu machen' },
    ],
  },
  {
    id: 'Q35_full',
    indicator: 'Reversibility',
    direction: 'forward',
    question: {
      en: 'Does your work allow a "try it first, change it if it doesn\'t work" approach?',
      zh: '你的工作允许"先试试看，不行再改"这种方式吗？',
      ja: 'あなたの仕事は「まず試してみて、ダメだったら変える」というやり方が許されますか？',
      ko: '업무에서 "일단 해보고, 안 되면 고치자"는 방식이 허용되나요?',
      de: 'Erlaubt Ihre Arbeit einen Ansatz wie "erst ausprobieren, bei Bedarf aendern"?',
    },
    options: [
      { en: 'Absolutely not — must get it right the first time', zh: '绝对不允许，必须一次做对', ja: '絶対にダメ。一発で正しくやらなければならない', ko: '절대 안 됨 — 반드시 한 번에 정확히 해야 함', de: 'Absolut nicht — muss beim ersten Mal richtig sein' },
      { en: 'Rarely — the cost of errors is too high', zh: '很少能试错，出错代价太高', ja: 'めったに試行錯誤できない。ミスのコストが高すぎる', ko: '거의 안 됨 — 실수의 대가가 너무 큼', de: 'Selten — die Fehlerkosten sind zu hoch' },
      { en: 'Some stages allow trial and error, some don\'t', zh: '有些环节可以试错，有些不行', ja: '試行錯誤できる工程もあれば、できない工程もある', ko: '일부 단계는 시행착오가 가능하고, 일부는 불가', de: 'Manche Phasen erlauben Versuch und Irrtum, manche nicht' },
      { en: 'Most of the time, experimentation and rapid iteration are encouraged', zh: '大部分时候鼓励尝试和快速迭代', ja: 'ほとんどの場合、試行と素早い改善が推奨されている', ko: '대부분의 경우 시도와 빠른 반복이 권장됨', de: 'Meistens werden Experimente und schnelle Iteration ermutigt' },
      { en: 'The entire workflow IS constant experimentation and adjustment', zh: '整个工作方式就是不断实验和调整', ja: '仕事のやり方自体が常に実験と調整の繰り返し', ko: '업무 방식 자체가 끊임없는 실험과 조정', de: 'Der gesamte Arbeitsablauf IST staendiges Experimentieren und Anpassen' },
    ],
  },
  {
    id: 'Q36_full',
    indicator: 'Reversibility',
    direction: 'forward',
    question: {
      en: 'If a problem is found tomorrow in today\'s work, how hard is it to fix?',
      zh: '如果你今天做的工作明天发现有问题，补救的难度有多大？',
      ja: '今日やった仕事に明日問題が見つかった場合、修正するのはどのくらい大変ですか？',
      ko: '오늘 한 업무에서 내일 문제가 발견되면, 바로잡기가 얼마나 어려운가요?',
      de: 'Wenn morgen ein Problem in der heutigen Arbeit entdeckt wird, wie schwer ist es zu beheben?',
    },
    options: [
      { en: 'Nearly impossible — damage done and irreversible', zh: '几乎不可能，损害已经造成且无法撤回', ja: 'ほぼ不可能。ダメージはすでに発生し、元に戻せない', ko: '거의 불가능 — 이미 피해가 발생했고 되돌릴 수 없음', de: 'Nahezu unmoeglich — Schaden ist angerichtet und irreversibel' },
      { en: 'Very difficult, requiring enormous cost to repair', zh: '很困难，需要付出巨大代价去修复', ja: 'とても大変。修復に莫大なコストがかかる', ko: '매우 어려움 — 복구에 막대한 비용이 필요', de: 'Sehr schwierig, erfordert enormen Aufwand zur Reparatur' },
      { en: 'Some difficulty, but fixable with effort', zh: '有一定难度，但可以想办法补救', ja: 'ある程度大変だけど、何とか対処できる', ko: '어느 정도 어렵지만, 방법을 찾아 바로잡을 수 있음', de: 'Etwas schwierig, aber mit Muehe behebbar' },
      { en: 'Not too hard — just make some corrections', zh: '不太难，改改就好', ja: 'そこまで大変じゃない。ちょっと直せばOK', ko: '그리 어렵지 않음 — 약간 수정하면 됨', de: 'Nicht allzu schwer — einfach ein paar Korrekturen vornehmen' },
      { en: 'Zero pressure — just delete and redo', zh: '毫无压力，删了重做就是了', ja: 'まったくプレッシャーなし。消してやり直すだけ', ko: '전혀 부담 없음 — 삭제하고 다시 하면 됨', de: 'Kein Druck — einfach loeschen und neu machen' },
    ],
  },

  // Facet 3C: Regulation (3 questions)
  {
    id: 'Q37_full',
    indicator: 'Regulation',
    direction: 'reverse',
    question: {
      en: 'How strict are the regulatory and qualification requirements for your work?',
      zh: '你的工作受行业监管和资质要求的约束严格吗？',
      ja: 'あなたの仕事に対する業界規制や資格要件はどのくらい厳しいですか？',
      ko: '당신의 업무에 대한 산업 규제와 자격요건 제약이 엄격한가요?',
      de: 'Wie streng sind die regulatorischen und Qualifikationsanforderungen fuer Ihre Arbeit?',
    },
    options: [
      { en: 'No barriers to entry — anyone can do it', zh: '完全没有准入门槛，谁都可以做', ja: '参入障壁はまったくない。誰でもできる', ko: '진입 장벽이 전혀 없음 — 누구나 할 수 있음', de: 'Keine Zugangsschranken — jeder kann es machen' },
      { en: 'Some basic requirements but low bar', zh: '有一些基本要求但门槛很低', ja: '基本的な要件はあるけど、ハードルは低い', ko: '기본적인 요건은 있지만 문턱이 낮음', de: 'Einige Grundanforderungen, aber niedrige Schwelle' },
      { en: 'Requires certain certifications or training', zh: '需要一定的认证或培训资质', ja: '一定の認証や研修資格が必要', ko: '일정 수준의 인증이나 교육 자격이 필요', de: 'Erfordert bestimmte Zertifizierungen oder Schulungen' },
      { en: 'Strict industry oversight and licensing', zh: '有严格的行业监管和执照要求', ja: '厳格な業界監督とライセンス要件がある', ko: '엄격한 산업 규제와 면허 요건이 있음', de: 'Strenge Branchenaufsicht und Lizenzanforderungen' },
      { en: 'Must be licensed, violations lead to legal consequences', zh: '必须持证上岗，违规会被追究法律责任', ja: '資格がなければ仕事ができない。違反すると法的責任を問われる', ko: '반드시 자격증을 소지해야 하며, 위반 시 법적 책임을 짐', de: 'Zulassung zwingend erforderlich, Verstoesse fuehren zu rechtlichen Konsequenzen' },
    ],
  },
  {
    id: 'Q38_full',
    indicator: 'Regulation',
    direction: 'forward',
    question: {
      en: 'If your work were entirely handed to AI, how much obstacle would current laws create?',
      zh: '如果你的工作全部交给AI来做，在当前的法律法规下，会遇到多大障碍？',
      ja: 'もしあなたの仕事を全部AIに任せるとしたら、現在の法律や規制ではどのくらい障害がありますか？',
      ko: '당신의 업무를 전부 AI에게 맡긴다면, 현행 법규상 얼마나 큰 장애가 있을까요?',
      de: 'Wenn Ihre Arbeit vollstaendig einer KI uebertragen wuerde, wie viele Hindernisse wuerden die aktuellen Gesetze schaffen?',
    },
    options: [
      { en: 'Explicitly prohibited by law — impossible', zh: '法律明确禁止，绝无可能', ja: '法律で明確に禁止されている。絶対に不可能', ko: '법으로 명확히 금지됨 — 절대 불가능', de: 'Gesetzlich ausdruecklich verboten — unmoeglich' },
      { en: 'Significant legal grey areas and restrictions', zh: '法规上有很大的灰色地带和限制', ja: '法的にかなりのグレーゾーンと制限がある', ko: '법규상 큰 회색지대와 제한이 존재', de: 'Erhebliche rechtliche Grauzonen und Einschraenkungen' },
      { en: 'Some steps face legal restrictions, some don\'t', zh: '有些环节有法律限制，有些没有', ja: '法的制限がある工程もあれば、ない工程もある', ko: '일부 단계에는 법적 제한이 있고, 일부에는 없음', de: 'Manche Schritte unterliegen gesetzlichen Einschraenkungen, manche nicht' },
      { en: 'Essentially no regulatory obstacles', zh: '法规上基本没有障碍', ja: '法規制上はほとんど障害がない', ko: '법규상 장애가 거의 없음', de: 'Im Wesentlichen keine regulatorischen Hindernisse' },
      { en: 'No restrictions — policies even encourage AI adoption', zh: '完全没限制，甚至政策在鼓励AI应用', ja: 'まったく制限なし。政策がAI活用を推奨しているくらい', ko: '제한이 전혀 없음 — 오히려 정책이 AI 활용을 장려', de: 'Keine Einschraenkungen — Richtlinien foerdern sogar den KI-Einsatz' },
    ],
  },
  {
    id: 'Q39_full',
    indicator: 'Regulation',
    direction: 'forward',
    question: {
      en: 'In your industry, how likely is it that regulators would investigate after an incident?',
      zh: '你所在的行业，出了事故后，监管机构介入调查的可能性有多大？',
      ja: 'あなたの業界で事故が起きた場合、規制当局が調査に乗り出す可能性はどのくらいですか？',
      ko: '당신이 속한 업계에서 사고가 발생한 후, 규제 기관이 조사에 나설 가능성은 얼마나 되나요?',
      de: 'Wie wahrscheinlich ist es in Ihrer Branche, dass Aufsichtsbehoerden nach einem Vorfall ermitteln?',
    },
    options: [
      { en: 'Almost certain — dedicated regulators are watching', zh: '几乎一定会被调查，有专门的监管机构盯着', ja: 'ほぼ確実に調査される。専門の規制機関が監視している', ko: '거의 확실히 조사받음 — 전담 규제 기관이 감시 중', de: 'Fast sicher — spezielle Aufsichtsbehoerden ueberwachen staendig' },
      { en: 'Very likely — strict incident reporting system', zh: '很有可能，行业有严格的事故报告制度', ja: '可能性が高い。業界に厳格な事故報告制度がある', ko: '가능성이 높음 — 엄격한 사고 보고 체계가 있음', de: 'Sehr wahrscheinlich — strenges Meldesystem fuer Vorfaelle' },
      { en: 'Depends on severity — serious ones get investigated', zh: '看严重程度，严重的会被查', ja: '深刻さ次第。深刻なものは調査される', ko: '심각도에 따라 다름 — 심각하면 조사받음', de: 'Kommt auf die Schwere an — schwere Faelle werden untersucht' },
      { en: 'Unlikely, unless extremely serious', zh: '不太可能，除非特别严重', ja: '可能性は低い。よほど深刻でない限り', ko: '가능성이 낮음 — 특별히 심각한 경우가 아니면', de: 'Unwahrscheinlich, es sei denn extrem schwerwiegend' },
      { en: 'Almost impossible — my industry has little oversight', zh: '几乎不可能，我的行业没有什么监管', ja: 'ほぼ可能性ゼロ。私の業界にはほとんど規制がない', ko: '거의 불가능 — 우리 업계에는 별다른 규제가 없음', de: 'Fast unmoeglich — meine Branche hat kaum Aufsicht' },
    ],
  },

  // Facet 3D: Accountability (3 questions)
  {
    id: 'Q40_full',
    indicator: 'Accountability',
    direction: 'reverse',
    question: {
      en: 'If something goes wrong with your work, how much personal responsibility do you bear?',
      zh: '如果你的工作出了问题，你个人要承担多大责任？',
      ja: '仕事で問題が起きた場合、あなた個人はどのくらいの責任を負いますか？',
      ko: '업무에서 문제가 생기면, 개인적으로 얼마나 큰 책임을 져야 하나요?',
      de: 'Wenn bei Ihrer Arbeit etwas schiefgeht, wie viel persoenliche Verantwortung tragen Sie?',
    },
    options: [
      { en: 'Basically no personal liability — team/company covers it', zh: '基本不需要个人承担，团队或公司兜底', ja: '個人の責任はほとんどない。チームや会社がカバーする', ko: '개인이 부담할 필요 거의 없음 — 팀이나 회사가 책임', de: 'Im Grunde keine persoenliche Haftung — Team/Unternehmen steht gerade' },
      { en: 'Might get criticized but no legal/financial liability', zh: '可能挨批评但不涉及法律经济责任', ja: '叱責される可能性はあるけど、法的・経済的責任は問われない', ko: '질책을 받을 수는 있지만 법적/경제적 책임은 없음', de: 'Koennte Kritik geben, aber keine rechtliche/finanzielle Haftung' },
      { en: 'Could face some financial compensation or penalty', zh: '可能面临一定的经济赔偿或处分', ja: 'ある程度の経済的な賠償や処分に直面する可能性がある', ko: '일정한 금전적 배상이나 징계를 받을 수 있음', de: 'Koennte mit finanzieller Entschaedigung oder Disziplinarmassnahmen konfrontiert werden' },
      { en: 'Could face significant lawsuits or disciplinary action', zh: '可能面临较大的法律诉讼或处分', ja: '重大な訴訟や懲戒処分に直面する可能性がある', ko: '상당한 법적 소송이나 징계를 받을 수 있음', de: 'Koennte mit erheblichen Klagen oder Disziplinarverfahren konfrontiert werden' },
      { en: 'Could face criminal charges or enormous compensation', zh: '出了事可能面临刑事责任或巨额赔偿', ja: '刑事責任を問われたり巨額の賠償を求められる可能性がある', ko: '형사 책임이나 거액의 배상을 질 수도 있음', de: 'Koennte mit strafrechtlicher Verfolgung oder enormen Schadensersatzforderungen konfrontiert werden' },
    ],
  },
  {
    id: 'Q41_full',
    indicator: 'Accountability',
    direction: 'forward',
    question: {
      en: 'How often does your work involve moral judgments or ethical trade-offs?',
      zh: '你的工作中多久会遇到需要做"道德判断"或"伦理权衡"的情况？',
      ja: '仕事の中で「道徳的判断」や「倫理的なトレードオフ」が必要な場面は、どのくらいの頻度でありますか？',
      ko: '업무 중 "도덕적 판단"이나 "윤리적 저울질"이 필요한 상황을 얼마나 자주 만나나요?',
      de: 'Wie oft beinhaltet Ihre Arbeit moralische Urteile oder ethische Abwaegungen?',
    },
    options: [
      { en: 'Face ethical dilemmas almost every day', zh: '几乎每天都面对伦理抉择', ja: 'ほぼ毎日、倫理的なジレンマに直面する', ko: '거의 매일 윤리적 딜레마에 직면', de: 'Stehe fast taeglich vor ethischen Dilemmas' },
      { en: 'Frequently need to weigh ethical factors', zh: '经常需要权衡伦理因素', ja: 'よく倫理的な要素を天秤にかける必要がある', ko: '윤리적 요소를 자주 고려해야 함', de: 'Muss haeufig ethische Faktoren abwaegen' },
      { en: 'Occasionally encounter them', zh: '偶尔会遇到', ja: 'たまにある', ko: '가끔 만남', de: 'Kommt gelegentlich vor' },
      { en: 'Very rarely — mostly routine decisions', zh: '极少遇到，绝大部分是常规决策', ja: 'めったにない。ほぼすべてがルーティンの判断', ko: '극히 드묾 — 대부분 일상적인 결정', de: 'Sehr selten — groesstenteils Routineentscheidungen' },
      { en: 'Never — purely technical operations', zh: '从来不需要，纯粹的技术操作', ja: 'まったくない。純粋に技術的な作業だけ', ko: '전혀 필요 없음 — 순수한 기술 작업', de: 'Nie — rein technische Vorgaenge' },
    ],
  },
  // Q42 corrected version: changed to Reverse
  {
    id: 'Q42_full',
    indicator: 'Accountability',
    direction: 'reverse',
    question: {
      en: 'How detailed must the records and approval documentation of your work be?',
      zh: '你的工作过程需要留下多详细的记录和审批文档？',
      ja: '仕事のプロセスでは、どのくらい詳しい記録や承認文書を残す必要がありますか？',
      ko: '업무 과정에서 얼마나 상세한 기록과 결재 문서를 남겨야 하나요?',
      de: 'Wie detailliert muessen die Aufzeichnungen und Genehmigungsdokumente Ihrer Arbeit sein?',
    },
    options: [
      { en: 'No records needed — just get it done', zh: '不需要任何记录，做完就行', ja: '記録は一切不要。やり終えればOK', ko: '기록이 전혀 필요 없음 — 하기만 하면 됨', de: 'Keine Aufzeichnungen noetig — einfach erledigen' },
      { en: 'Simple completion records suffice', zh: '简单的完成记录就行', ja: '簡単な完了記録だけあればいい', ko: '간단한 완료 기록 정도면 충분', de: 'Einfache Erledigungsnachweise genuegen' },
      { en: 'Requires some process documentation', zh: '需要一定的过程文档', ja: 'ある程度のプロセス文書が必要', ko: '어느 정도의 과정 문서가 필요', de: 'Erfordert eine gewisse Prozessdokumentation' },
      { en: 'Requires detailed operation records and approvals', zh: '需要详细的操作记录和审批流程', ja: '詳細な作業記録と承認プロセスが必要', ko: '상세한 작업 기록과 결재 절차가 필요', de: 'Erfordert detaillierte Arbeitsaufzeichnungen und Genehmigungsverfahren' },
      { en: 'Every step must have complete traceable records', zh: '每一步都必须有完整的可追溯记录', ja: 'すべてのステップに完全な追跡可能な記録が必須', ko: '모든 단계마다 완전한 추적 가능 기록이 있어야 함', de: 'Jeder Schritt muss vollstaendig rueckverfolgbar dokumentiert werden' },
    ],
  },

  // Facet 3E: Public Trust (3 questions)
  {
    id: 'Q43_full',
    indicator: 'Public Trust',
    direction: 'reverse',
    question: {
      en: 'Can the public accept AI making decisions in your role?',
      zh: '公众能接受让AI在你的岗位上做决策吗？',
      ja: '一般の人は、あなたのポジションでAIが判断を下すことを受け入れられますか？',
      ko: '대중이 당신의 직무에서 AI가 의사결정하는 것을 받아들일 수 있을까요?',
      de: 'Kann die Oeffentlichkeit akzeptieren, dass eine KI in Ihrer Rolle Entscheidungen trifft?',
    },
    options: [
      { en: 'Totally fine — nobody cares who does it', zh: '完全可以，没人在乎是谁做的', ja: 'まったく問題ない。誰がやっても気にしない', ko: '완전히 괜찮음 — 누가 하든 상관없음', de: 'Voellig in Ordnung — niemanden interessiert, wer es macht' },
      { en: 'Most people wouldn\'t mind', zh: '大部分人不介意', ja: 'ほとんどの人は気にしない', ko: '대부분의 사람들이 개의치 않음', de: 'Die meisten Menschen haetten nichts dagegen' },
      { en: 'Depends — some accept it, some don\'t', zh: '看情况，有人能接受有人不舒服', ja: '場合による。受け入れられる人もいれば、不安に思う人もいる', ko: '경우에 따라 다름 — 수용하는 사람도, 불편해하는 사람도 있음', de: 'Kommt darauf an — manche akzeptieren es, manche nicht' },
      { en: 'Most people would feel uneasy', zh: '大部分人会觉得不放心', ja: 'ほとんどの人は不安に思う', ko: '대부분의 사람들이 불안해할 것임', de: 'Die meisten Menschen wuerden sich unwohl fuehlen' },
      { en: 'Absolutely unacceptable — public would strongly oppose', zh: '完全不能接受，公众会强烈反对', ja: 'まったく受け入れられない。世間は強く反対する', ko: '절대 받아들일 수 없음 — 대중이 강력히 반대할 것', de: 'Absolut inakzeptabel — die Oeffentlichkeit wuerde sich stark dagegen wehren' },
    ],
  },
  {
    id: 'Q44_full',
    indicator: 'Public Trust',
    direction: 'forward',
    question: {
      en: 'How common is AI-assisted work already in your industry?',
      zh: '在你的行业里，AI辅助工作已经有多普遍了？',
      ja: 'あなたの業界では、AI支援の仕事はどのくらい普及していますか？',
      ko: '당신의 업계에서 AI 보조 업무가 이미 얼마나 보편화되었나요?',
      de: 'Wie verbreitet ist KI-unterstuetzte Arbeit in Ihrer Branche bereits?',
    },
    options: [
      { en: 'Not at all — people are watching or even resisting', zh: '完全没有，大家还在观望甚至抵制', ja: 'まったく普及していない。様子見や抵抗すらある', ko: '전혀 없음 — 관망하거나 심지어 거부하는 분위기', de: 'Gar nicht — die Leute beobachten oder widersetzen sich sogar' },
      { en: 'Just starting — a few pioneers are trying', zh: '刚起步，少数先行者在尝试', ja: '始まったばかり。少数の先駆者が試している段階', ko: '이제 막 시작 — 소수의 선구자들이 시도 중', de: 'Gerade erst am Anfang — einige Vorreiter probieren es aus' },
      { en: 'Some stages already use AI assistance', zh: '有些环节已经用上了AI辅助', ja: 'いくつかの工程ではすでにAI支援を使っている', ko: '일부 단계에서 이미 AI 보조를 활용 중', de: 'Manche Arbeitsschritte nutzen bereits KI-Unterstuetzung' },
      { en: 'Fairly common — most people are using it', zh: '已经比较普遍，大部分人都在用', ja: 'かなり普及していて、ほとんどの人が使っている', ko: '꽤 보편화됨 — 대부분의 사람이 사용 중', de: 'Ziemlich verbreitet — die meisten nutzen es' },
      { en: 'Very common — not using AI means falling behind', zh: '非常普遍，不用AI反而落伍了', ja: '非常に普及していて、AIを使わないと時代遅れ', ko: '매우 보편적 — AI를 안 쓰면 오히려 뒤처지는 분위기', de: 'Sehr verbreitet — wer keine KI nutzt, haengt hinterher' },
    ],
  },
  {
    id: 'Q45_full',
    indicator: 'Public Trust',
    direction: 'forward',
    question: {
      en: 'If a colleague secretly used AI to complete a task, what would your reaction be upon finding out?',
      zh: '在你的工作中，如果同事悄悄用AI帮忙完成了一项任务，你发现后什么反应？',
      ja: 'もし同僚がこっそりAIを使ってタスクを完了していたことがわかったら、どう感じますか？',
      ko: '동료가 몰래 AI를 활용해 업무를 완료한 사실을 알게 되면, 어떤 반응이신가요?',
      de: 'Wenn ein Kollege heimlich eine KI benutzt haette, um eine Aufgabe zu erledigen — wie waere Ihre Reaktion, wenn Sie es erfahren?',
    },
    options: [
      { en: 'Very serious — could involve violations or illegality', zh: '非常严重，可能涉及违规甚至违法', ja: 'とても深刻。規則違反や違法行為に該当する可能性がある', ko: '매우 심각한 문제 — 규정 위반이나 불법에 해당할 수 있음', de: 'Sehr ernst — koennte Regelverstoesse oder Gesetzesuebertretungen beinhalten' },
      { en: 'Would feel uneasy — should have been disclosed', zh: '会很不安，这种事应该提前说清楚', ja: '不安を感じる。事前に言うべきだった', ko: '불안함 — 이런 것은 사전에 밝혀야 함', de: 'Wuerde mich unwohl fuehlen — das haette vorher gesagt werden sollen' },
      { en: 'A bit surprised, but OK if quality is fine', zh: '有点意外，但如果质量没问题也行', ja: 'ちょっと驚くけど、品質に問題がなければOK', ko: '좀 의외지만, 품질에 문제가 없다면 괜찮음', de: 'Etwas ueberrascht, aber ok, wenn die Qualitaet stimmt' },
      { en: 'Doesn\'t matter — good results are what count', zh: '无所谓，结果好就行', ja: 'どうでもいい。結果が良ければそれでいい', ko: '상관없음 — 결과가 좋으면 됨', de: 'Egal — gute Ergebnisse zaehlen' },
      { en: 'Totally normal — I do it myself all the time', zh: '觉得很正常，自己也经常这么做', ja: 'まったく普通。自分もいつもやっている', ko: '아주 당연한 일 — 나도 자주 그렇게 함', de: 'Voellig normal — mache ich selbst staendig' },
    ],
  },
];

// =============================================================================
// Dimension 4: Human Presence (P/H) — 15 questions
// =============================================================================

export const DIMENSION_HUMAN_FULL: QuizQuestion[] = [
  // Facet 4A: Relationship Dependency (3 questions)
  {
    id: 'Q46_full',
    indicator: 'Relationship Dependency',
    direction: 'reverse',
    question: {
      en: 'Why do clients or partners choose you (or your team)?',
      zh: '客户或合作方选择你（或你的团队），主要是因为什么？',
      ja: '顧客やパートナーがあなた（またはあなたのチーム）を選ぶ主な理由は何ですか？',
      ko: '고객이나 파트너가 당신(또는 당신의 팀)을 선택하는 주된 이유는 무엇인가요?',
      de: 'Warum waehlen Kunden oder Partner Sie (oder Ihr Team)?',
    },
    options: [
      { en: 'Purely price and efficiency — cheapest wins', zh: '纯粹看价格和效率，谁便宜找谁', ja: '純粋に価格と効率。一番安いところを選ぶだけ', ko: '순전히 가격과 효율 — 가장 저렴한 곳에 맡김', de: 'Rein nach Preis und Effizienz — der Guenstigste gewinnt' },
      { en: 'Mainly capabilities — no preference for who', zh: '主要看能力资质，对谁没有偏好', ja: '主に能力と資格で判断。誰かという好みはない', ko: '주로 역량과 자격을 봄 — 특정인에 대한 선호 없음', de: 'Hauptsaechlich nach Faehigkeiten — keine Praeferenz fuer eine bestimmte Person' },
      { en: 'Capabilities matter, but chemistry and trust too', zh: '能力重要，也考虑合作默契和信任', ja: '能力も大事だけど、相性や信頼関係も考慮する', ko: '역량도 중요하지만, 협업 호흡과 신뢰도 고려', de: 'Faehigkeiten zaehlen, aber auch Zusammenarbeit und Vertrauen' },
      { en: 'Many clients stay because of the long-term relationship', zh: '很多客户因为长期关系才继续合作', ja: '多くの顧客が長期的な関係があるから取引を続けている', ko: '오랜 관계 덕분에 계속 협력하는 고객이 많음', de: 'Viele Kunden bleiben wegen der langjaehrigen Beziehung' },
      { en: 'Clients only work with ME — they leave if I leave', zh: '客户只认我这个人，换人就不合作了', ja: '顧客は「私」という人間だけを信頼している。担当が変わったら取引終了', ko: '고객이 나 개인만 찾음 — 내가 빠지면 협력 안 함', de: 'Kunden arbeiten nur mit MIR — wenn ich gehe, gehen sie auch' },
    ],
  },
  // Q47 corrected version: changed to Forward
  {
    id: 'Q47_full',
    indicator: 'Relationship Dependency',
    direction: 'forward',
    question: {
      en: 'How long does it typically take to build the trust relationships your work requires?',
      zh: '建立起工作所需的信任关系，通常要花多长时间？',
      ja: '仕事に必要な信頼関係を築くのに、通常どのくらいの時間がかかりますか？',
      ko: '업무에 필요한 신뢰 관계를 구축하는 데 보통 얼마나 걸리나요?',
      de: 'Wie lange dauert es typischerweise, die fuer Ihre Arbeit noetige Vertrauensbeziehung aufzubauen?',
    },
    options: [
      { en: 'Takes years of sustained relationship for real trust', zh: '需要多年的持续关系才能获得真正信任', ja: '本当の信頼を得るには何年もの継続的な関係が必要', ko: '진정한 신뢰를 얻으려면 수년간의 지속적 관계가 필요', de: 'Dauert Jahre kontinuierlicher Beziehungspflege fuer echtes Vertrauen' },
      { en: 'Takes 1-2 years of deep collaboration', zh: '需要一两年的深度合作', ja: '1〜2年の深い協力関係が必要', ko: '1~2년의 깊은 협업이 필요', de: 'Dauert 1-2 Jahre intensiver Zusammenarbeit' },
      { en: 'Takes months of collaboration to build', zh: '需要几个月的合作才能建立', ja: '数ヶ月の協力で築ける', ko: '몇 달간의 협업이 있어야 구축 가능', de: 'Dauert Monate der Zusammenarbeit' },
      { en: 'A few interactions build basic trust', zh: '几次接触就能建立基本信任', ja: '数回のやり取りで基本的な信頼が築ける', ko: '몇 번의 접촉으로 기본 신뢰가 형성됨', de: 'Ein paar Kontakte reichen fuer grundlegendes Vertrauen' },
      { en: 'No trust needed — one-time transactions are fine', zh: '不需要信任关系，一次性交易就行', ja: '信頼関係は不要。一回きりの取引で十分', ko: '신뢰 관계가 필요 없음 — 일회성 거래면 충분', de: 'Kein Vertrauen noetig — einmalige Transaktionen genuegen' },
    ],
  },
  {
    id: 'Q48_full',
    indicator: 'Relationship Dependency',
    direction: 'forward',
    question: {
      en: 'How important are the personal connections you\'ve built for your work?',
      zh: '你积累的人脉关系对工作有多重要？',
      ja: 'あなたが築いてきた人脈は、仕事にとってどのくらい重要ですか？',
      ko: '축적해온 인맥이 업무에 얼마나 중요한가요?',
      de: 'Wie wichtig sind die persoenlichen Verbindungen, die Sie aufgebaut haben, fuer Ihre Arbeit?',
    },
    options: [
      { en: 'My network IS my greatest value', zh: '我的人脉网络就是我最大的价值', ja: '人脈こそが自分の最大の価値', ko: '내 인맥 네트워크가 곧 나의 가장 큰 가치', de: 'Mein Netzwerk IST mein groesster Wert' },
      { en: 'Connections are a very important asset', zh: '人脉是工作中非常重要的资产', ja: '人脈は仕事上の非常に重要な資産', ko: '인맥은 업무에서 매우 중요한 자산', de: 'Kontakte sind ein sehr wichtiges Asset' },
      { en: 'Connections are a useful supporting resource', zh: '人脉是有用的辅助资源', ja: '人脈は役に立つ補助的なリソース', ko: '인맥은 유용한 보조 자원', de: 'Kontakte sind eine nuetzliche unterstuetzende Ressource' },
      { en: 'Somewhat helpful but not essential', zh: '有一些帮助但不是必须的', ja: '多少の助けにはなるけど、必須ではない', ko: '어느 정도 도움은 되지만 필수는 아님', de: 'Etwas hilfreich, aber nicht wesentlich' },
      { en: 'Not important at all — no connections needed', zh: '完全不重要，不需要任何人脉', ja: 'まったく重要ではない。人脈は一切不要', ko: '전혀 중요하지 않음 — 인맥이 필요 없음', de: 'Ueberhaupt nicht wichtig — keine Kontakte noetig' },
    ],
  },

  // Facet 4B: Personal Brand (3 questions)
  {
    id: 'Q49_full',
    indicator: 'Personal Brand',
    direction: 'reverse',
    question: {
      en: 'How many clients/audiences come specifically because of YOU as a person?',
      zh: '有多少客户/受众是冲着"你这个人"来的？',
      ja: '顧客や受け手のうち、「あなたという人」だから来ている人はどのくらいいますか？',
      ko: '고객/수용자 중 "당신이라는 사람" 때문에 찾아오는 비율은 어느 정도인가요?',
      de: 'Wie viele Kunden/Zielgruppen kommen speziell wegen IHNEN als Person?',
    },
    options: [
      { en: 'None — they only care if I can do the job', zh: '完全没有，只看我能不能干好活', ja: 'まったくいない。仕事ができるかどうかだけ', ko: '전혀 없음 — 일을 잘할 수 있는지만 봄', de: 'Keine — sie interessiert nur, ob ich die Arbeit erledigen kann' },
      { en: 'Very few know me specifically — mostly capability-based', zh: '极少数人认我，绝大部分看能力', ja: 'ごく少数が自分を知っている程度。ほとんどは能力で判断', ko: '극소수만 나를 알고, 대부분은 역량 기준', de: 'Sehr wenige kennen mich persoenlich — groesstenteils kompetenzbasiert' },
      { en: 'Some come for me, more for the capability', zh: '有一部分冲我来的，更多还是看能力', ja: '自分目当ての人もいるけど、能力で来る人の方が多い', ko: '일부는 나를 보고 오지만, 더 많은 수는 역량 기준', de: 'Manche kommen meinetwegen, mehr wegen der Kompetenz' },
      { en: 'Many come for me — I have some recognition', zh: '不少人冲我来的，我有一定知名度', ja: 'かなりの人が自分目当てで来る。ある程度の知名度がある', ko: '적지 않은 사람이 나를 보고 옴 — 일정한 인지도가 있음', de: 'Viele kommen meinetwegen — ich habe eine gewisse Bekanntheit' },
      { en: 'I AM the brand — people come specifically for me', zh: '我本身就是品牌，大家就是冲我来的', ja: '私自身がブランド。みんな「私」だから来ている', ko: '나 자체가 브랜드 — 사람들이 나를 보고 옴', de: 'Ich BIN die Marke — die Leute kommen speziell wegen mir' },
    ],
  },
  {
    id: 'Q50_full',
    indicator: 'Personal Brand',
    direction: 'forward',
    question: {
      en: 'If you suddenly left tomorrow, how long would it take to find a replacement at your level?',
      zh: '如果你明天突然离职，公司需要多久才能找到替代者达到你的工作水平？',
      ja: '明日突然退職したとしたら、あなたと同レベルの後任を見つけるのにどのくらいかかりますか？',
      ko: '내일 갑자기 퇴사한다면, 회사가 당신 수준의 대체자를 찾는 데 얼마나 걸릴까요?',
      de: 'Wenn Sie morgen ploetzlich kuendigen wuerden, wie lange wuerde es dauern, einen Ersatz auf Ihrem Niveau zu finden?',
    },
    options: [
      { en: 'Very hard — maybe 6+ months, or never', zh: '非常难找，可能半年以上，甚至找不到', ja: '非常に困難。半年以上かかるか、見つからないかもしれない', ko: '매우 어려움 — 6개월 이상, 어쩌면 못 찾을 수도', de: 'Sehr schwer — vielleicht 6+ Monate oder gar nicht' },
      { en: 'Quite hard — needs a few months', zh: '比较难，需要几个月', ja: 'かなり困難。数ヶ月はかかる', ko: '꽤 어려움 — 몇 달은 필요', de: 'Ziemlich schwer — braucht ein paar Monate' },
      { en: '1-2 months to find the right person', zh: '一两个月能找到合适的人', ja: '1〜2ヶ月で適任者が見つかる', ko: '1~2개월이면 적합한 사람을 찾을 수 있음', de: '1-2 Monate, um die richtige Person zu finden' },
      { en: '2-3 weeks to hire someone', zh: '两三周就能招到', ja: '2〜3週間で採用できる', ko: '2~3주면 채용 가능', de: '2-3 Wochen, um jemanden einzustellen' },
      { en: 'Can find a replacement immediately', zh: '马上就能找到替代者', ja: 'すぐに見つかる', ko: '바로 대체자를 찾을 수 있음', de: 'Kann sofort einen Ersatz finden' },
    ],
  },
  {
    id: 'Q51_full',
    indicator: 'Personal Brand',
    direction: 'reverse',
    question: {
      en: 'How much of your output has a "only you would do it this way" personal style?',
      zh: '你的产出中有多少"只有你才会这样做"的个人风格？',
      ja: 'あなたの成果物の中に、「あなたにしかできないやり方」という個人的なスタイルはどのくらいありますか？',
      ko: '당신의 결과물에 "나만의 방식"이라 할 수 있는 개인적 스타일이 얼마나 담겨 있나요?',
      de: 'Wie viel Ihrer Arbeitsergebnisse hat einen "nur Sie wuerden es so machen" persoenlichen Stil?',
    },
    options: [
      { en: 'No personal style — anyone would produce the same', zh: '没有个人风格，谁做都一样', ja: '個人スタイルはない。誰がやっても同じ', ko: '개인 스타일이 없음 — 누가 해도 같은 결과', de: 'Kein persoenlicher Stil — jeder wuerde dasselbe produzieren' },
      { en: 'Slight personal habits but not noticeable', zh: '有一点个人习惯但不明显', ja: 'ちょっとした個人的な癖はあるけど目立たない', ko: '약간의 개인 습관이 있지만 눈에 띄지 않음', de: 'Leichte persoenliche Gewohnheiten, aber nicht auffaellig' },
      { en: 'Some personal touches — people who know me can tell', zh: '有一些个人特色，熟悉的人能认出来', ja: 'いくらかの個人的な特色がある。よく知っている人ならわかる', ko: '어느 정도 개인 특색이 있어, 나를 아는 사람은 알아볼 수 있음', de: 'Einige persoenliche Noten — wer mich kennt, erkennt es' },
      { en: 'Clearly identifiable personal style', zh: '有明显的个人风格和标识性', ja: 'はっきりとした個人スタイルと特徴がある', ko: '뚜렷한 개인 스타일과 식별성이 있음', de: 'Klar erkennbarer persoenlicher Stil' },
      { en: 'My style IS my brand — it wouldn\'t be the same without me', zh: '我的风格就是我的招牌，换人做就变味了', ja: '私のスタイルこそが看板。他の人がやったら味が変わる', ko: '내 스타일이 곧 나의 간판 — 다른 사람이 하면 느낌이 달라짐', de: 'Mein Stil IST meine Marke — ohne mich waere es nicht dasselbe' },
    ],
  },

  // Facet 4C: Physical Presence (3 questions)
  {
    id: 'Q52_full',
    indicator: 'Physical Presence',
    direction: 'reverse',
    question: {
      en: 'Must your work be done with you physically present?',
      zh: '你的工作必须本人亲自到场完成吗？',
      ja: 'あなたの仕事は、本人が現場にいて行う必要がありますか？',
      ko: '업무를 반드시 본인이 직접 현장에서 수행해야 하나요?',
      de: 'Muss Ihre Arbeit mit Ihrer physischen Anwesenheit vor Ort erledigt werden?',
    },
    options: [
      { en: 'Not at all — can be done remotely from anywhere', zh: '完全不用，在哪都能远程完成', ja: 'まったく不要。どこからでもリモートで完結できる', ko: '전혀 아님 — 어디서든 원격으로 완료 가능', de: 'Ueberhaupt nicht — kann von ueberall aus remote erledigt werden' },
      { en: 'Occasionally need to be there, mostly remote', zh: '偶尔需要到场，大部分可远程', ja: 'たまに現場に行く必要があるけど、ほとんどはリモート', ko: '가끔 현장이 필요하지만, 대부분 원격 가능', de: 'Gelegentlich Anwesenheit noetig, groesstenteils remote' },
      { en: 'About half on-site, half remote', zh: '大概一半到场，一半远程', ja: 'だいたい半分が現場、半分がリモート', ko: '대략 절반은 현장, 절반은 원격', de: 'Etwa halb vor Ort, halb remote' },
      { en: 'Must be on-site most of the time', zh: '大部分时候必须到场', ja: 'ほとんどの場合、現場にいなければならない', ko: '대부분 현장에 있어야 함', de: 'Muss groesstenteils vor Ort sein' },
      { en: 'Must be physically present, doing the work in person', zh: '必须本人在现场，用身体完成工作', ja: '必ず本人が現場にいて、体を使って仕事をする必要がある', ko: '반드시 본인이 현장에서, 몸으로 직접 수행해야 함', de: 'Muss persoenlich anwesend sein und die Arbeit koerperlich ausfuehren' },
    ],
  },
  {
    id: 'Q53_full',
    indicator: 'Physical Presence',
    direction: 'forward',
    question: {
      en: 'Can your work output be fully delivered remotely over the internet?',
      zh: '你的工作成果能不能完全通过网络远程交付？',
      ja: 'あなたの仕事の成果は、完全にインターネット経由でリモート納品できますか？',
      ko: '업무 결과물을 인터넷을 통해 완전히 원격 납품할 수 있나요?',
      de: 'Kann Ihr Arbeitsergebnis vollstaendig remote ueber das Internet geliefert werden?',
    },
    options: [
      { en: 'Not at all — must be face-to-face on-site', zh: '完全不能，必须在现场面对面', ja: 'まったくできない。現場で対面でなければならない', ko: '전혀 불가 — 반드시 현장에서 대면으로', de: 'Ueberhaupt nicht — muss persoenlich vor Ort sein' },
      { en: 'Mostly not — core work requires presence', zh: '大部分不能，核心工作需要到场', ja: 'ほとんどできない。コアの仕事は現場が必要', ko: '대부분 불가 — 핵심 업무는 현장이 필요', de: 'Groesstenteils nicht — Kernarbeit erfordert Anwesenheit' },
      { en: 'Half can be remote, half requires on-site', zh: '一半可以远程，一半必须到场', ja: '半分はリモート可能、半分は現場が必要', ko: '절반은 원격 가능, 절반은 현장 필수', de: 'Die Haelfte remote moeglich, die Haelfte erfordert Praesenz' },
      { en: 'Mostly remote, a few require meeting in person', zh: '大部分可以远程，少数需要见面', ja: 'ほとんどリモート可能で、少しだけ対面が必要', ko: '대부분 원격 가능, 소수만 대면 필요', de: 'Groesstenteils remote, weniges erfordert persoenliches Treffen' },
      { en: '100% deliverable online', zh: '100%可以在线交付', ja: '100%オンラインで納品できる', ko: '100% 온라인 납품 가능', de: '100% online lieferbar' },
    ],
  },
  {
    id: 'Q54_full',
    indicator: 'Physical Presence',
    direction: 'forward',
    question: {
      en: 'If your work went fully online (no face-to-face), how much would effectiveness decrease?',
      zh: '如果把你的工作变成纯线上进行（不再面对面），效果会打几折？',
      ja: 'もし仕事を完全にオンライン（対面なし）に切り替えたら、効果はどのくらい下がりますか？',
      ko: '업무를 순수 온라인으로만 진행한다면(대면 없이), 효과가 몇 퍼센트나 될까요?',
      de: 'Wenn Ihre Arbeit vollstaendig online stattfaende (kein persoenlicher Kontakt), wie stark wuerde die Effektivitaet sinken?',
    },
    options: [
      { en: 'Impossible — must be done on-site', zh: '完全无法进行，必须在现场', ja: 'まったく不可能。現場でなければならない', ko: '전혀 진행 불가 — 반드시 현장이어야 함', de: 'Unmoeglich — muss vor Ort erledigt werden' },
      { en: '50-60% effectiveness — seriously impaired', zh: '效果打五六折，严重受损', ja: '効果は5〜6割に。深刻なダメージ', ko: '효과 50-60% — 심각하게 저하', de: '50-60% Effektivitaet — stark beeintraechtigt' },
      { en: '70-80% effectiveness — noticeably affected', zh: '效果打七八折，有明显影响', ja: '効果は7〜8割に。はっきりとした影響がある', ko: '효과 70-80% — 눈에 띄는 영향', de: '70-80% Effektivitaet — spuerbar betroffen' },
      { en: '90% effectiveness — minimal impact', zh: '效果打九折，影响不大', ja: '効果は9割。影響はほとんどない', ko: '효과 90% — 영향 미미', de: '90% Effektivitaet — minimale Auswirkung' },
      { en: 'No difference at all — might even be more efficient', zh: '完全没区别，甚至可能更高效', ja: 'まったく変わらない。むしろ効率が上がるかもしれない', ko: '차이 전혀 없음 — 오히려 더 효율적일 수도', de: 'Kein Unterschied — koennte sogar effizienter sein' },
    ],
  },

  // Facet 4D: Emotional Labor (3 questions)
  {
    id: 'Q55_full',
    indicator: 'Emotional Labor',
    direction: 'reverse',
    question: {
      en: 'How much of your work involves reading people, managing emotions, or persuading others?',
      zh: '你的工作有多少需要察言观色、安抚情绪或说服他人的成分？',
      ja: 'あなたの仕事のうち、相手の表情を読む、感情をなだめる、説得するといった要素はどのくらいありますか？',
      ko: '업무 중 상대의 기색을 살피고, 감정을 달래거나, 설득해야 하는 비중이 얼마나 되나요?',
      de: 'Wie viel Ihrer Arbeit beinhaltet es, Menschen zu lesen, Emotionen zu managen oder andere zu ueberzeugen?',
    },
    options: [
      { en: 'None at all — I work with data/machines', zh: '完全没有，我对着数据/机器干活', ja: 'まったくない。データや機械を相手に仕事している', ko: '전혀 없음 — 데이터/기계를 상대로 일함', de: 'Ueberhaupt nichts — ich arbeite mit Daten/Maschinen' },
      { en: 'Occasionally interact with people, mostly work alone', zh: '偶尔跟人打交道，大部分独立工作', ja: 'たまに人と関わるけど、ほとんどは一人で作業', ko: '가끔 사람을 대하지만, 대부분 독립적으로 일함', de: 'Gelegentlich Umgang mit Menschen, groesstenteils Einzelarbeit' },
      { en: 'About half people-facing, half independent', zh: '差不多一半对人、一半独立', ja: 'だいたい半分が人に対する仕事、半分が一人の作業', ko: '대략 절반은 대인 업무, 절반은 독립 업무', de: 'Etwa halb mit Menschen, halb eigenstaendig' },
      { en: 'Most time spent dealing with people and their emotions', zh: '大部分时间在跟人打交道、处理情绪', ja: 'ほとんどの時間を人との関わりや感情のケアに使っている', ko: '대부분의 시간을 사람을 대하고 감정을 다루는 데 씀', de: 'Die meiste Zeit mit Menschen und deren Emotionen befasst' },
      { en: 'My entire value IS understanding and connecting people', zh: '我的全部价值就在于理解人、连接人', ja: '私の価値のすべては、人を理解し、人をつなげること', ko: '나의 모든 가치는 사람을 이해하고 연결하는 데 있음', de: 'Mein gesamter Wert LIEGT darin, Menschen zu verstehen und zu verbinden' },
    ],
  },
  // Q56 corrected version: changed to Forward
  {
    id: 'Q56_full',
    indicator: 'Emotional Labor',
    direction: 'forward',
    question: {
      en: 'How much of your work involves leading teams, boosting morale, or motivating others?',
      zh: '你的工作中有多少需要"带团队/鼓舞士气/激励他人"的成分？',
      ja: 'あなたの仕事のうち、「チームを率いる・士気を高める・他の人を鼓舞する」要素はどのくらいありますか？',
      ko: '업무 중 "팀을 이끌고/사기를 높이고/타인에게 동기를 부여하는" 비중이 얼마나 되나요?',
      de: 'Wie viel Ihrer Arbeit beinhaltet Teamfuehrung, Motivation oder die Ermutigung anderer?',
    },
    options: [
      { en: 'My work IS essentially leading and motivating others', zh: '我的工作本质就是领导和激励他人', ja: '仕事の本質がリーダーシップと人を鼓舞すること', ko: '내 업무의 본질이 바로 리더십과 동기 부여', de: 'Meine Arbeit IST im Wesentlichen Fuehrung und Motivation anderer' },
      { en: 'Leadership is one of my core skills', zh: '领导力是核心技能之一', ja: 'リーダーシップはコアスキルの一つ', ko: '리더십이 핵심 역량 중 하나', de: 'Fuehrung ist eine meiner Kernkompetenzen' },
      { en: 'Requires some team management and coordination', zh: '需要一定的团队管理和协调能力', ja: 'ある程度のチームマネジメントと調整能力が必要', ko: '어느 정도의 팀 관리와 조율 능력이 필요', de: 'Erfordert eine gewisse Teamfuehrung und Koordination' },
      { en: 'Occasionally need to mentor newcomers', zh: '偶尔需要带一下新人', ja: 'たまに新人の指導をする程度', ko: '가끔 신입을 이끌어 주는 정도', de: 'Gelegentlich muessen Neulinge angeleitet werden' },
      { en: 'Not at all — I just do my own work', zh: '完全不需要，我只做自己的事', ja: 'まったく不要。自分の仕事だけをやる', ko: '전혀 필요 없음 — 내 일만 하면 됨', de: 'Ueberhaupt nicht — ich erledige nur meine eigene Arbeit' },
    ],
  },
  {
    id: 'Q57_full',
    indicator: 'Emotional Labor',
    direction: 'forward',
    question: {
      en: 'How much does your work depend on negotiation and persuasion skills?',
      zh: '你的工作有多依赖谈判和说服技巧？',
      ja: 'あなたの仕事は、交渉や説得のスキルにどのくらい頼っていますか？',
      ko: '업무가 협상과 설득 능력에 얼마나 의존하나요?',
      de: 'Wie sehr haengt Ihre Arbeit von Verhandlungs- und Ueberzeugungsfaehigkeiten ab?',
    },
    options: [
      { en: 'Negotiation and persuasion are my core work', zh: '谈判和说服是我的核心工作', ja: '交渉と説得が私のコアの仕事', ko: '협상과 설득이 나의 핵심 업무', de: 'Verhandlung und Ueberzeugung sind meine Kernarbeit' },
      { en: 'Negotiation is a major part of the work', zh: '谈判是工作的重要组成部分', ja: '交渉は仕事の重要な構成要素', ko: '협상이 업무의 중요한 부분', de: 'Verhandlung ist ein wichtiger Teil der Arbeit' },
      { en: 'Regularly need to negotiate with various parties', zh: '定期需要跟各方协商', ja: '定期的に各方面との折衝が必要', ko: '정기적으로 각 측과 협의가 필요', de: 'Regelmaessig muessen Verhandlungen mit verschiedenen Parteien gefuehrt werden' },
      { en: 'Occasionally need simple communication for agreement', zh: '偶尔需要简单沟通达成一致', ja: 'たまに簡単なコミュニケーションで合意を得る程度', ko: '가끔 간단한 소통으로 합의를 이루는 정도', de: 'Gelegentlich einfache Kommunikation zur Einigung noetig' },
      { en: 'No negotiation or persuasion needed at all', zh: '完全不需要谈判或说服任何人', ja: '交渉や説得はまったく不要', ko: '협상이나 설득이 전혀 필요 없음', de: 'Keinerlei Verhandlung oder Ueberzeugungsarbeit noetig' },
    ],
  },

  // Facet 4E: Human Premium (3 questions)
  {
    id: 'Q58_full',
    indicator: 'Human Premium',
    direction: 'reverse',
    question: {
      en: 'If clients discovered your work was actually done by AI, what would happen?',
      zh: '如果客户发现你的工作其实是AI完成的，会怎样？',
      ja: 'もし顧客があなたの仕事が実はAIによって完成されたと知ったら、どうなりますか？',
      ko: '고객이 당신의 업무가 사실 AI가 한 것이었음을 알게 되면 어떻게 될까요?',
      de: 'Wenn Kunden entdecken wuerden, dass Ihre Arbeit tatsaechlich von einer KI erledigt wurde — was wuerde passieren?',
    },
    options: [
      { en: 'Wouldn\'t care — might even think it\'s more efficient', zh: '无所谓，甚至觉得更高效', ja: '気にしない。むしろ効率的だと思うかも', ko: '상관없음 — 오히려 더 효율적이라고 생각할 것', de: 'Waere egal — vielleicht sogar als effizienter empfunden' },
      { en: 'A bit surprised but basically acceptable', zh: '有点意外但基本能接受', ja: 'ちょっと驚くけど、基本的に受け入れられる', ko: '좀 의외지만 대체로 수용 가능', de: 'Etwas ueberrascht, aber grundsaetzlich akzeptabel' },
      { en: 'Would feel it\'s worth less, but still acceptable', zh: '觉得打了折扣，但还算认可', ja: '値打ちが下がったと感じるけど、まあ認められる', ko: '가치가 떨어졌다고 느끼지만, 그래도 인정은 함', de: 'Wuerde als weniger wertvoll empfunden, aber noch akzeptabel' },
      { en: 'Clearly feel the value decreased — dissatisfied', zh: '明显觉得价值降低、不满意', ja: '明らかに価値が下がったと感じて不満に思う', ko: '확실히 가치가 낮아졌다고 느끼며 불만족', de: 'Klar empfundener Wertverlust — Unzufriedenheit' },
      { en: 'Absolutely unacceptable — would feel deceived', zh: '完全无法接受，觉得被欺骗了', ja: 'まったく受け入れられない。騙されたと感じる', ko: '절대 받아들일 수 없음 — 속았다고 느낄 것', de: 'Absolut inakzeptabel — wuerde sich getaeuscht fuehlen' },
    ],
  },
  {
    id: 'Q59_full',
    indicator: 'Human Premium',
    direction: 'forward',
    question: {
      en: 'If your work output had someone else\'s name on it, would its value change?',
      zh: '你的工作成果如果署上别人的名字，价值会变吗？',
      ja: 'あなたの仕事の成果に別の人の名前が載ったら、その価値は変わりますか？',
      ko: '당신의 업무 결과물에 다른 사람의 이름이 올라간다면, 가치가 달라지나요?',
      de: 'Wenn Ihr Arbeitsergebnis unter dem Namen einer anderen Person stehen wuerde, wuerde sich sein Wert aendern?',
    },
    options: [
      { en: 'Completely changes — my name IS part of the value', zh: '完全变了——我的名字就是价值的一部分', ja: '完全に変わる — 私の名前こそが価値の一部', ko: '완전히 달라짐 — 내 이름 자체가 가치의 일부', de: 'Aendert sich komplett — mein Name IST Teil des Wertes' },
      { en: 'Noticeably affected — attribution matters a lot', zh: '会受到明显影响，署名很重要', ja: 'はっきりと影響がある。署名はとても重要', ko: '눈에 띄게 영향 받음 — 이름이 매우 중요', de: 'Spuerbar betroffen — Namensnennung ist sehr wichtig' },
      { en: 'Some impact, but mainly judged by work quality itself', zh: '有一些影响，但主要看作品本身质量', ja: '多少の影響はあるけど、主に作品自体の品質で判断される', ko: '약간의 영향은 있지만, 주로 작품 자체의 품질로 판단', de: 'Etwas Einfluss, aber hauptsaechlich wird nach Qualitaet beurteilt' },
      { en: 'Almost no impact — doesn\'t matter whose name it is', zh: '几乎没影响，署谁的名无所谓', ja: 'ほとんど影響ない。誰の名前でもどうでもいい', ko: '거의 영향 없음 — 누구 이름이든 상관없음', de: 'Fast kein Einfluss — egal wessen Name draufsteht' },
      { en: 'No impact at all — output is output', zh: '完全不影响，产出就是产出', ja: 'まったく影響ない。アウトプットはアウトプット', ko: '전혀 영향 없음 — 결과물은 결과물일 뿐', de: 'Kein Einfluss — das Ergebnis ist das Ergebnis' },
    ],
  },
  {
    id: 'Q60_full',
    indicator: 'Human Premium',
    direction: 'forward',
    question: {
      en: 'How much of your work involves "live improvisational performance"?',
      zh: '你的工作中有多少需要"现场即兴表现"的成分？',
      ja: 'あなたの仕事のうち、「その場での即興パフォーマンス」が必要な要素はどのくらいありますか？',
      ko: '업무 중 "현장에서 즉흥적으로 대응해야 하는" 비중이 얼마나 되나요?',
      de: 'Wie viel Ihrer Arbeit beinhaltet "Improvisation und Live-Reaktion"?',
    },
    options: [
      { en: 'My core work IS improvisation and live reaction', zh: '我的工作核心就是即兴表现和现场反应', ja: '仕事の核心が即興パフォーマンスとライブの反応', ko: '내 업무의 핵심이 바로 즉흥 퍼포먼스와 현장 반응', de: 'Meine Kernarbeit IST Improvisation und Spontanreaktion' },
      { en: 'Often need to improvise and adapt on the spot', zh: '经常需要临场发挥和随机应变', ja: 'よく臨機応変にアドリブで対応する必要がある', ko: '현장에서 임기응변이 자주 필요', de: 'Muss oft spontan agieren und sich anpassen' },
      { en: 'Some occasions require live spontaneous reactions', zh: '有些场合需要现场随机反应', ja: 'その場で即座に反応が求められる場面がある', ko: '일부 상황에서 즉흥적 대응이 필요', de: 'Manche Situationen erfordern spontane Reaktionen vor Ort' },
      { en: 'Very rarely need to improvise', zh: '极少需要即兴发挥', ja: '即興が必要なことはめったにない', ko: '즉흥 대응이 거의 필요 없음', de: 'Sehr selten Improvisation noetig' },
      { en: 'None — everything is prepared in advance', zh: '完全没有，一切都是提前准备好的', ja: 'まったくない。すべて事前に準備されている', ko: '전혀 없음 — 모든 것이 사전에 준비되어 있음', de: 'Gar nicht — alles ist im Voraus vorbereitet' },
    ],
  },
];

// =============================================================================
// Combined exports
// =============================================================================

export const ALL_FULL_QUESTIONS: QuizQuestion[] = [
  ...DIMENSION_LEARNABILITY_FULL,
  ...DIMENSION_EVALUATION_FULL,
  ...DIMENSION_RISK_FULL,
  ...DIMENSION_HUMAN_FULL,
];

export const FULL_QUESTION_COUNT = 60;
