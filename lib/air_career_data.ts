/**
 * AIR Career Path Data
 *
 * For each of the 16 profile types, provides 6 representative career examples
 * sourced from BLS OES + O*NET + Anthropic Economic Index fusion dataset (798 occupations).
 *
 * Risk scores derived from Risk_E_54_wmean column (×100, rounded).
 * Employment figures from BLS OES 2023. Ordered high → low risk within each type.
 */

export interface CareerPath {
  title: { en: string; zh: string };
  riskScore: number;
  reason: { en: string; zh: string };
}

/**
 * Mapping from 4-letter profile code to array of career paths.
 * Ordered from highest risk to lowest within each type.
 */
export const PROFILE_CAREERS: Record<string, CareerPath[]> = {

  // ═══════════════════════════════════════════════════════════════════════════
  // EXTREME HIGH RISK — 4/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════

  // SOC 43: Office and Administrative Support (2.37M customer service, 2.37M office clerks)
  EOFP: [
    {
      title: { en: 'Customer Service Representatives', zh: '客服专员' },
      riskScore: 46,
      reason: {
        en: 'Scripted, high-volume interactions — chatbots already handle majority of L1 queries',
        zh: '标准化高频对话——聊天机器人已接管大部分初级客服',
      },
    },
    {
      title: { en: 'Office Clerks, General', zh: '普通办公室文员' },
      riskScore: 17,
      reason: {
        en: 'Routine document handling and data entry — workflow automation replaces most tasks',
        zh: '日常文件处理与数据录入——工作流自动化正在取代大部分任务',
      },
    },
    {
      title: { en: 'Secretaries and Administrative Assistants', zh: '行政助理' },
      riskScore: 16,
      reason: {
        en: 'Scheduling, filing, correspondence — AI assistants handle routine coordination',
        zh: '日程安排、归档、沟通——AI助手越来越擅长常规协调工作',
      },
    },
    {
      title: { en: 'Receptionists and Information Clerks', zh: '前台接待员' },
      riskScore: 15,
      reason: {
        en: 'Information lookup and appointment booking — automated kiosks and voice AI replacing role',
        zh: '信息查询与预约登记——自动化前台和语音AI正在替代该岗位',
      },
    },
    {
      title: { en: 'Medical Secretaries and Administrative Assistants', zh: '医疗行政助理' },
      riskScore: 10,
      reason: {
        en: 'Regulated documentation and coding — EHR systems automate scheduling and billing',
        zh: '规范化文档与编码——电子健康档案系统自动化排班和账单处理',
      },
    },
    {
      title: { en: 'Bookkeeping, Accounting, and Auditing Clerks', zh: '会计记账员' },
      riskScore: 9,
      reason: {
        en: 'Rule-based number reconciliation — accounting software handles end-to-end bookkeeping',
        zh: '规则化数字核对——记账软件已能端到端处理账务',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // HIGH RISK — 3/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════

  // SOC 41: Sales and Related Occupations (3.45M retail salespersons)
  EOFH: [
    {
      title: { en: 'Sales Representatives of Services', zh: '服务业销售代表' },
      riskScore: 37,
      reason: {
        en: 'Product knowledge is commoditized — AI recommendation engines erode information advantage',
        zh: '产品知识已商品化——AI推荐引擎正在侵蚀信息优势',
      },
    },
    {
      title: { en: 'First-Line Supervisors of Retail Sales Workers', zh: '零售一线主管' },
      riskScore: 26,
      reason: {
        en: 'Operational tasks increasingly automated — human value shifts to team motivation',
        zh: '运营任务日益自动化——人的价值转向团队激励',
      },
    },
    {
      title: { en: 'Counter and Rental Clerks', zh: '柜台与租赁服务员' },
      riskScore: 18,
      reason: {
        en: 'Transaction-oriented role — self-service kiosks and apps replace routine counter work',
        zh: '交易导向型岗位——自助终端和App正在替代常规柜台工作',
      },
    },
    {
      title: { en: 'Retail Salespersons', zh: '零售销售员' },
      riskScore: 14,
      reason: {
        en: 'E-commerce and AI recommendations eroding in-store advantage — relationship is the last moat',
        zh: '电商和AI推荐侵蚀实体优势——人际关系是最后的护城河',
      },
    },
    {
      title: { en: 'Insurance Sales Agents', zh: '保险销售代理' },
      riskScore: 14,
      reason: {
        en: 'AI can compare and recommend plans — agents survive on trust and complex case handling',
        zh: 'AI能比较和推荐方案——代理人靠信任和复杂案件处理存活',
      },
    },
    {
      title: { en: 'Cashiers', zh: '收银员' },
      riskScore: 5,
      reason: {
        en: 'Self-checkout terminals and mobile payment already displaced millions of cashier roles',
        zh: '自助收银机和移动支付已取代数百万收银员岗位',
      },
    },
  ],

  // SOC 13: Business and Financial Operations (1.36M accountants, 1.07M business ops)
  EORH: [
    {
      title: { en: 'Market Research Analysts and Marketing Specialists', zh: '市场研究分析师' },
      riskScore: 31,
      reason: {
        en: 'Data synthesis is AI-native — analysts who cannot interpret qualitative signals are exposed',
        zh: '数据综合已是AI原生能力——不能解读定性信号的分析师面临风险',
      },
    },
    {
      title: { en: 'Human Resources Specialists', zh: '人力资源专员' },
      riskScore: 21,
      reason: {
        en: 'Resume screening and onboarding workflows heavily automated — human judgment at edge cases',
        zh: '简历筛选和入职流程高度自动化——人的判断力集中在边界案例',
      },
    },
    {
      title: { en: 'Business Operations Specialists', zh: '业务运营专员' },
      riskScore: 14,
      reason: {
        en: 'Process optimization roles increasingly augmented by AI tools — value shifts to implementation',
        zh: '流程优化岗位日益被AI工具增强——价值转向落地执行',
      },
    },
    {
      title: { en: 'Management Analysts', zh: '管理顾问' },
      riskScore: 13,
      reason: {
        en: 'Structured problem-solving and report writing — AI handles research; humans handle client trust',
        zh: '结构化问题解决与报告撰写——AI处理研究，人处理客户信任',
      },
    },
    {
      title: { en: 'Project Management Specialists', zh: '项目管理专员' },
      riskScore: 11,
      reason: {
        en: 'Coordination and status tracking automated by PM tools — value is in stakeholder management',
        zh: '协调与进度跟踪被项目管理工具自动化——价值在于干系人管理',
      },
    },
    {
      title: { en: 'Accountants and Auditors', zh: '会计师与审计师' },
      riskScore: 7,
      reason: {
        en: 'Compliance and professional liability create barriers — AI augments rather than replaces CPAs',
        zh: '合规要求和职业责任形成壁垒——AI增强而非取代注册会计师',
      },
    },
  ],

  // SOC 51: Production Occupations (518K supervisors, 498K inspectors)
  EORP: [
    {
      title: { en: 'First-Line Supervisors of Production Workers', zh: '生产一线主管' },
      riskScore: 2,
      reason: {
        en: 'On-floor decision-making and worker management require physical presence',
        zh: '现场决策和工人管理需要实际在场',
      },
    },
    {
      title: { en: 'Inspectors, Testers, Sorters, Samplers, and Weighers', zh: '质量检验员' },
      riskScore: 2,
      reason: {
        en: 'Sensory judgment and standards compliance — machine vision helps but cannot fully replace',
        zh: '感官判断与标准合规——机器视觉辅助但无法完全替代',
      },
    },
    {
      title: { en: 'Packaging and Filling Machine Operators', zh: '包装机操作员' },
      riskScore: 2,
      reason: {
        en: 'Machine operation and troubleshooting on physical production lines',
        zh: '实体生产线上的机器操作与故障排除',
      },
    },
    {
      title: { en: 'Welders, Cutters, Solderers, and Brazers', zh: '焊接工' },
      riskScore: 2,
      reason: {
        en: 'Precision manual skill with physical safety responsibility — hard to fully automate',
        zh: '具有人身安全责任的精密手工技能——难以完全自动化',
      },
    },
    {
      title: { en: 'Machinists', zh: '机械操作工' },
      riskScore: 2,
      reason: {
        en: 'CNC programming and custom part production require technical judgment and adaptation',
        zh: '数控编程和定制零件生产需要技术判断和灵活应变',
      },
    },
    {
      title: { en: 'Bakers', zh: '烘焙师' },
      riskScore: 2,
      reason: {
        en: 'Industrial baking is mechanized; artisan quality relies on sensory skill and creativity',
        zh: '工业烘焙已机械化；手工品质依赖感官技能和创意',
      },
    },
  ],

  // SOC 25: Education, Training, and Library (1.39M elementary, 1.07M secondary teachers)
  ESFH: [
    {
      title: { en: 'Health Specialties Teachers, Postsecondary', zh: '医学类高校教师' },
      riskScore: 20,
      reason: {
        en: 'Clinical knowledge delivery — AI tutoring supplements but credential requirements persist',
        zh: '临床知识传授——AI辅导补充，但资质要求仍然存在',
      },
    },
    {
      title: { en: 'Middle School Teachers', zh: '初中教师' },
      riskScore: 20,
      reason: {
        en: 'AI tools augment lesson delivery — emotional development and classroom management remain human',
        zh: 'AI工具辅助授课——情感发展和课堂管理仍需人来完成',
      },
    },
    {
      title: { en: 'Secondary School Teachers', zh: '高中教师' },
      riskScore: 17,
      reason: {
        en: 'Subject expertise commoditized online — teacher value is mentorship and motivation',
        zh: '学科专业知识已在线上商品化——教师价值在于指导和激励',
      },
    },
    {
      title: { en: 'Elementary School Teachers', zh: '小学教师' },
      riskScore: 14,
      reason: {
        en: 'Child development and socialization require human relationship — curriculum delivery augmented by AI',
        zh: '儿童发展和社会化需要人际关系——课程传授由AI辅助',
      },
    },
    {
      title: { en: 'Self-Enrichment Teachers', zh: '兴趣班教师' },
      riskScore: 12,
      reason: {
        en: 'Personal coaching and motivation are the product — AI cannot replicate the human accountability bond',
        zh: '个人辅导和激励就是产品本身——AI无法复制人际问责关系',
      },
    },
    {
      title: { en: 'Preschool Teachers', zh: '幼儿园教师' },
      riskScore: 7,
      reason: {
        en: 'Physical care, emotional attunement, and early development are deeply human work',
        zh: '身体照料、情感共鸣和早期发展是深度人类工作',
      },
    },
  ],

  // SOC 15: Computer and Mathematical Occupations (1.57M software developers)
  ESFP: [
    {
      title: { en: 'Software Developers', zh: '软件开发工程师' },
      riskScore: 39,
      reason: {
        en: 'AI coding assistants accelerating productivity — and also changing what developers need to know',
        zh: 'AI编程助手大幅提升效率——同时也在改变开发者需要掌握的知识',
      },
    },
    {
      title: { en: 'Software Quality Assurance Analysts and Testers', zh: '软件测试工程师' },
      riskScore: 22,
      reason: {
        en: 'Test generation and regression automated — exploratory and edge-case testing still requires humans',
        zh: '测试用例生成和回归测试已自动化——探索性测试仍需人类',
      },
    },
    {
      title: { en: 'Computer User Support Specialists', zh: '计算机用户支持专员' },
      riskScore: 21,
      reason: {
        en: 'Tier-1 troubleshooting increasingly automated by AI; complex issues still need human diagnosis',
        zh: '一级故障排除日益被AI自动化；复杂问题仍需人工诊断',
      },
    },
    {
      title: { en: 'Data Scientists', zh: '数据科学家' },
      riskScore: 20,
      reason: {
        en: 'Automated ML pipelines lower the bar — data scientists shift toward problem framing and interpretation',
        zh: '自动化ML流水线降低门槛——数据科学家转向问题定义和结果解读',
      },
    },
    {
      title: { en: 'Computer Systems Analysts', zh: '计算机系统分析师' },
      riskScore: 18,
      reason: {
        en: 'Requirements translation and integration work — business context requires humans in the loop',
        zh: '需求转化和集成工作——业务背景需要人在回路中',
      },
    },
    {
      title: { en: 'Network and Computer Systems Administrators', zh: '网络与系统管理员' },
      riskScore: 16,
      reason: {
        en: 'Infrastructure monitoring increasingly automated — complex configurations and security still need humans',
        zh: '基础设施监控日益自动化——复杂配置和安全仍需人工',
      },
    },
  ],

  // SOC 23: Legal Occupations (730K lawyers, 363K paralegals)
  ESRH: [
    {
      title: { en: 'Administrative Law Judges', zh: '行政法法官' },
      riskScore: 15,
      reason: {
        en: 'Rule-based adjudication on structured cases — AI can assist research but decisions carry legal weight',
        zh: '结构化案件的规则裁决——AI辅助研究，但决定具有法律效力',
      },
    },
    {
      title: { en: 'Arbitrators, Mediators, and Conciliators', zh: '仲裁员与调解员' },
      riskScore: 15,
      reason: {
        en: 'Dispute resolution depends on interpersonal trust and contextual judgment',
        zh: '纠纷解决依赖人际信任和情境判断',
      },
    },
    {
      title: { en: 'Judicial Law Clerks', zh: '司法助理' },
      riskScore: 12,
      reason: {
        en: 'Legal research and memo drafting increasingly AI-assisted — judgment and synthesis remain human',
        zh: '法律研究和备忘录起草日益由AI辅助——判断和综合仍需人工',
      },
    },
    {
      title: { en: 'Judges, Magistrate Judges, and Magistrates', zh: '法官与治安法官' },
      riskScore: 11,
      reason: {
        en: 'Constitutional authority and moral reasoning make judicial decisions irreducibly human',
        zh: '宪法权威和道德推理使司法决定不可还原为机器',
      },
    },
    {
      title: { en: 'Paralegals and Legal Assistants', zh: '律师助理' },
      riskScore: 6,
      reason: {
        en: 'Document review and case research automating fast — value shifts to complex filings and client contact',
        zh: '文件审查和案件研究快速自动化——价值转向复杂文书和客户接触',
      },
    },
    {
      title: { en: 'Lawyers', zh: '律师' },
      riskScore: 2,
      reason: {
        en: 'Professional liability, bar licensure, and client trust create deep structural moats',
        zh: '职业责任、律师执照和客户信任形成深厚结构壁垒',
      },
    },
  ],

  // SOC 17+19: Architecture, Engineering, and Science (350K civil, 284K industrial)
  ESRP: [
    {
      title: { en: 'Electrical Engineers', zh: '电气工程师' },
      riskScore: 6,
      reason: {
        en: 'System design and safety sign-off require licensed professional judgment',
        zh: '系统设计和安全签字需要持证专业人员的判断',
      },
    },
    {
      title: { en: 'Architects, Except Landscape and Naval', zh: '建筑师' },
      riskScore: 6,
      reason: {
        en: 'AI generates designs but code compliance, liability, and client negotiation keep humans central',
        zh: 'AI生成设计，但规范合规、责任和客户谈判使人类居于核心',
      },
    },
    {
      title: { en: 'Mechanical Engineers', zh: '机械工程师' },
      riskScore: 4,
      reason: {
        en: 'Physical prototyping, tolerances, and manufacturing constraints require hands-on expertise',
        zh: '物理原型制作、公差和制造约束需要实操专业知识',
      },
    },
    {
      title: { en: 'Civil Engineers', zh: '土木工程师' },
      riskScore: 1,
      reason: {
        en: 'Infrastructure design with public safety accountability — PE licensure is a hard moat',
        zh: '具有公共安全责任的基础设施设计——注册工程师执照是硬壁垒',
      },
    },
    {
      title: { en: 'Industrial Engineers', zh: '工业工程师' },
      riskScore: 1,
      reason: {
        en: 'Process optimization in physical environments requires operational context AI cannot observe',
        zh: '实体环境中的流程优化需要AI无法观察到的操作背景',
      },
    },
    {
      title: { en: 'Medical Scientists, Except Epidemiologists', zh: '医学研究员' },
      riskScore: 1,
      reason: {
        en: 'Experimental design and hypothesis generation require deep domain creativity',
        zh: '实验设计和假设生成需要深厚的领域创造力',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // MODERATE RISK — 2/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════

  // SOC 39: Personal Care and Service (516K childcare, 295K hairdressers)
  TOFH: [
    {
      title: { en: 'Amusement and Recreation Attendants', zh: '娱乐休闲服务员' },
      riskScore: 6,
      reason: {
        en: 'In-person hospitality and crowd management — guest experience is inherently human-delivered',
        zh: '现场款待和人群管理——宾客体验本质上由人类提供',
      },
    },
    {
      title: { en: 'Hairdressers, Hairstylists, and Cosmetologists', zh: '发型师与美容师' },
      riskScore: 4,
      reason: {
        en: 'Tactile craft and aesthetic consultation — clients pay for human touch and personal relationship',
        zh: '触觉技艺和美学咨询——客户为人的触感和个人关系付费',
      },
    },
    {
      title: { en: 'Manicurists and Pedicurists', zh: '美甲师' },
      riskScore: 3,
      reason: {
        en: 'Fine manual dexterity on varied clients — robotic alternatives not commercially viable',
        zh: '对不同客户的精细手工操作——机器人替代方案尚不具商业可行性',
      },
    },
    {
      title: { en: 'Exercise Trainers and Group Fitness Instructors', zh: '健身教练' },
      riskScore: 2,
      reason: {
        en: 'Motivation, form correction, and accountability are physical and relational — AI apps supplement not replace',
        zh: '激励、动作纠正和问责是身体性和关系性的——AI应用补充而非替代',
      },
    },
    {
      title: { en: 'Childcare Workers', zh: '托育工作者' },
      riskScore: 1,
      reason: {
        en: 'Child safety, emotional nurturing, and developmental support require constant human presence',
        zh: '儿童安全、情感养育和发展支持需要持续的人类陪伴',
      },
    },
    {
      title: { en: 'Animal Caretakers', zh: '动物护理员' },
      riskScore: 2,
      reason: {
        en: 'Daily care, behavioral monitoring, and animal welfare require physical attentiveness',
        zh: '日常照料、行为监测和动物福利需要身体上的细心关注',
      },
    },
  ],

  // SOC 37+49+53: Transportation, Installation, Material Moving (2.5M laborers, 1.78M truck drivers)
  TOFP: [
    {
      title: { en: 'Laborers and Freight, Stock, and Material Movers', zh: '仓库搬运工' },
      riskScore: 2,
      reason: {
        en: 'Unstructured physical environments resist full automation — warehouse robots still need human oversight',
        zh: '非结构化物理环境抵制完全自动化——仓库机器人仍需人工监督',
      },
    },
    {
      title: { en: 'Heavy and Tractor-Trailer Truck Drivers', zh: '重型卡车司机' },
      riskScore: 2,
      reason: {
        en: 'Long-haul autonomous vehicles emerging but full deployment still requires regulatory and safety validation',
        zh: '长途自动驾驶正在兴起，但全面部署仍需监管和安全验证',
      },
    },
    {
      title: { en: 'Stockers and Order Fillers', zh: '理货员' },
      riskScore: 2,
      reason: {
        en: 'Picking and placing in varied retail environments — robotics advancing but not yet cost-effective everywhere',
        zh: '在多变零售环境中拣选和放置商品——机器人在进步，但尚未在所有场景具备成本效益',
      },
    },
    {
      title: { en: 'Janitors and Cleaners', zh: '清洁工' },
      riskScore: 2,
      reason: {
        en: 'Varied surfaces, obstacles, and standards make full robotic cleaning commercially limited',
        zh: '多变的表面、障碍物和标准使全机器人清洁在商业上受限',
      },
    },
    {
      title: { en: 'Maintenance and Repair Workers, General', zh: '综合维修工人' },
      riskScore: 2,
      reason: {
        en: 'Diagnostic and hands-on repair in unpredictable physical situations — judgment and dexterity required',
        zh: '在不可预测的物理情况下诊断和动手修理——需要判断力和灵巧性',
      },
    },
    {
      title: { en: 'Landscaping and Groundskeeping Workers', zh: '园林绿化工' },
      riskScore: 2,
      reason: {
        en: 'Outdoor, seasonally varied physical work — robotic mowers exist but full automation remains limited',
        zh: '户外季节性变化的体力工作——机器人割草机存在，但全面自动化仍然有限',
      },
    },
  ],

  // SOC 29+31: Healthcare Practitioners and Support (3.28M registered nurses, 1.39M nursing assistants)
  TORH: [
    {
      title: { en: 'Nurse Practitioners', zh: '执业护士' },
      riskScore: 5,
      reason: {
        en: 'Advanced clinical judgment and prescribing authority — AI assists diagnosis but liability stays with NP',
        zh: '高级临床判断和处方权——AI辅助诊断，但责任仍归执业护士',
      },
    },
    {
      title: { en: 'Medical Assistants', zh: '医疗助理' },
      riskScore: 3,
      reason: {
        en: 'Clinical procedures and patient preparation require physical skill and compassionate presence',
        zh: '临床操作和患者准备需要身体技能和富有同情心的陪伴',
      },
    },
    {
      title: { en: 'Registered Nurses', zh: '注册护士' },
      riskScore: 2,
      reason: {
        en: 'Bedside care, patient advocacy, and real-time clinical judgment cannot be digitized away',
        zh: '床旁护理、患者倡导和实时临床判断无法被数字化取代',
      },
    },
    {
      title: { en: 'Pharmacy Technicians', zh: '药房技术员' },
      riskScore: 2,
      reason: {
        en: 'Dispensing automation advancing — technicians shift to patient counseling and exception handling',
        zh: '配药自动化在推进——技术员转向患者咨询和异常处理',
      },
    },
    {
      title: { en: 'Licensed Practical and Licensed Vocational Nurses', zh: '执照实习护士' },
      riskScore: 2,
      reason: {
        en: 'Direct patient care under supervision — physical and emotional presence is the core value',
        zh: '在监督下直接护理患者——身体和情感的陪伴是核心价值',
      },
    },
    {
      title: { en: 'Nursing Assistants', zh: '护理助理' },
      riskScore: 2,
      reason: {
        en: 'Personal care, mobility assistance, and human dignity in daily routines resist automation',
        zh: '个人护理、行动辅助和日常生活中的人的尊严抵制自动化',
      },
    },
  ],

  // SOC 47: Construction and Extraction (1.05M construction laborers, 730K electricians)
  TORP: [
    {
      title: { en: 'Construction Laborers', zh: '建筑工人' },
      riskScore: 3,
      reason: {
        en: 'Unstructured outdoor environments and varied tasks make robotic replacement commercially infeasible',
        zh: '非结构化户外环境和多变任务使机器人替代在商业上不可行',
      },
    },
    {
      title: { en: 'First-Line Supervisors of Construction Trades', zh: '建筑施工主管' },
      riskScore: 3,
      reason: {
        en: 'Real-time site coordination and safety oversight require physical presence and experienced judgment',
        zh: '实时现场协调和安全监督需要实际在场和经验判断',
      },
    },
    {
      title: { en: 'Plumbers, Pipefitters, and Steamfitters', zh: '管道工' },
      riskScore: 1,
      reason: {
        en: 'Licensed trade with physical installation in unique building configurations — hard to automate',
        zh: '在独特建筑配置中进行实体安装的持证工种——难以自动化',
      },
    },
    {
      title: { en: 'Electricians', zh: '电工' },
      riskScore: 2,
      reason: {
        en: 'Code compliance, troubleshooting, and physical wiring require licensed skill and safety awareness',
        zh: '规范合规、故障排除和实体布线需要持证技能和安全意识',
      },
    },
    {
      title: { en: 'Carpenters', zh: '木工' },
      riskScore: 2,
      reason: {
        en: 'Custom framing, finishing, and repair in varied conditions require adaptive physical skill',
        zh: '在多变条件下的定制框架、装修和维修需要适应性体力技能',
      },
    },
    {
      title: { en: 'Operating Engineers and Other Construction Equipment Operators', zh: '工程机械操作员' },
      riskScore: 2,
      reason: {
        en: 'Heavy equipment in complex site conditions requires real-time human judgment for safety',
        zh: '复杂工地条件下的重型设备操作需要实时人工判断以确保安全',
      },
    },
  ],

  // SOC 27: Arts, Design, Entertainment, Sports, and Media (270K PR, 198K graphic designers)
  TSFH: [
    {
      title: { en: 'Public Relations Specialists', zh: '公关专员' },
      riskScore: 19,
      reason: {
        en: 'Media relations and reputation management — AI drafts content but human relationships drive outcomes',
        zh: '媒体关系和声誉管理——AI起草内容，但人际关系决定结果',
      },
    },
    {
      title: { en: 'Editors', zh: '编辑' },
      riskScore: 19,
      reason: {
        en: 'AI-generated content increasing editorial volume — human taste, voice, and judgment remain differentiators',
        zh: 'AI生成内容增加编辑工作量——人的品味、风格和判断力仍是差异化因素',
      },
    },
    {
      title: { en: 'Interpreters and Translators', zh: '翻译员' },
      riskScore: 10,
      reason: {
        en: 'AI translation quality advancing rapidly — human value is in nuance, legal precision, and live interpretation',
        zh: 'AI翻译质量快速提升——人的价值在于细微差别、法律精确性和现场口译',
      },
    },
    {
      title: { en: 'Graphic Designers', zh: '平面设计师' },
      riskScore: 9,
      reason: {
        en: 'Generative AI disrupting visual production — designers who direct AI and handle strategy survive',
        zh: '生成式AI颠覆视觉生产——能指挥AI并处理策略的设计师能存活',
      },
    },
    {
      title: { en: 'Producers and Directors', zh: '制片人与导演' },
      riskScore: 4,
      reason: {
        en: 'Creative vision, talent management, and production orchestration are leadership roles with human stakes',
        zh: '创意愿景、人才管理和制作统筹是有人际风险的领导岗位',
      },
    },
    {
      title: { en: 'Interior Designers', zh: '室内设计师' },
      riskScore: 2,
      reason: {
        en: 'Client taste interpretation and spatial problem-solving on real projects require human collaboration',
        zh: '对真实项目的客户品味解读和空间问题解决需要人类协作',
      },
    },
  ],

  // SOC 35+45: Food Preparation and Agriculture (3.64M fast food, 2.29M waitstaff)
  TSFP: [
    {
      title: { en: 'First-Line Supervisors of Food Preparation and Serving Workers', zh: '餐饮一线主管' },
      riskScore: 4,
      reason: {
        en: 'Real-time team coordination and quality control in fast-paced physical environment',
        zh: '快节奏实体环境中的实时团队协调和质量控制',
      },
    },
    {
      title: { en: 'Cooks, Restaurant', zh: '餐厅厨师' },
      riskScore: 1,
      reason: {
        en: 'Creative adaptation to orders and ingredients in live service — kitchen robots limited to narrow tasks',
        zh: '在现场服务中对订单和食材的创意适应——厨房机器人仅限于窄范围任务',
      },
    },
    {
      title: { en: 'Fast Food and Counter Workers', zh: '快餐服务员' },
      riskScore: 2,
      reason: {
        en: 'Self-service kiosks replacing order-taking; food assembly and customer interaction still human',
        zh: '自助点餐机取代接单；食物组装和客户互动仍由人完成',
      },
    },
    {
      title: { en: 'Waiters and Waitresses', zh: '餐厅服务员' },
      riskScore: 2,
      reason: {
        en: 'Hospitality and upselling are relationship-driven — robotic servers exist but guest experience suffers',
        zh: '款待和追加销售以关系为驱动——机器人服务员存在但宾客体验下降',
      },
    },
    {
      title: { en: 'Bartenders', zh: '调酒师' },
      riskScore: 2,
      reason: {
        en: 'Social ritual, improvisation, and reading the room are core to the role',
        zh: '社交仪式感、即兴发挥和读懂现场氛围是该角色的核心',
      },
    },
    {
      title: { en: 'Food Preparation Workers', zh: '食品准备工人' },
      riskScore: 2,
      reason: {
        en: 'Manual prep work in varied kitchen settings — automation focused on narrow, high-volume tasks only',
        zh: '在多变厨房环境中的手工备料——自动化仅聚焦于窄范围高产量任务',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // LOW RISK — 1/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════

  // SOC 11+21: Management and Community/Social Services (3.23M general managers, 419K social workers)
  TSRH: [
    {
      title: { en: 'Computer and Information Systems Managers', zh: '信息技术经理' },
      riskScore: 16,
      reason: {
        en: 'Technical strategy and vendor management — AI tools accelerate work but decision authority stays human',
        zh: '技术战略和供应商管理——AI工具加速工作，但决策权仍在人类手中',
      },
    },
    {
      title: { en: 'General and Operations Managers', zh: '运营总经理' },
      riskScore: 8,
      reason: {
        en: 'Organizational leadership and stakeholder accountability cannot be delegated to an algorithm',
        zh: '组织领导和干系人问责无法委托给算法',
      },
    },
    {
      title: { en: 'Sales Managers', zh: '销售经理' },
      riskScore: 8,
      reason: {
        en: 'Pipeline judgment, team coaching, and client relationships require human intuition and credibility',
        zh: '管道判断、团队辅导和客户关系需要人类直觉和可信度',
      },
    },
    {
      title: { en: 'Medical and Health Services Managers', zh: '医疗服务经理' },
      riskScore: 4,
      reason: {
        en: 'Healthcare compliance and clinical staff management require regulatory expertise and human leadership',
        zh: '医疗合规和临床人员管理需要监管专业知识和人类领导力',
      },
    },
    {
      title: { en: 'Financial Managers', zh: '财务经理' },
      riskScore: 4,
      reason: {
        en: 'Capital allocation decisions carry fiduciary responsibility — AI informs but cannot sign off',
        zh: '资本配置决策具有受托责任——AI提供信息，但无法签署批准',
      },
    },
    {
      title: { en: 'Child, Family, and School Social Workers', zh: '儿童与家庭社工' },
      riskScore: 1,
      reason: {
        en: 'Crisis intervention, family trust, and welfare decisions are deeply relational human work',
        zh: '危机干预、家庭信任和福利决定是深度关系性的人类工作',
      },
    },
  ],

  // SOC 33: Protective Service Occupations (1.23M security guards, 667K police)
  TSRP: [
    {
      title: { en: 'Police and Sheriff\'s Patrol Officers', zh: '警察与治安巡逻警' },
      riskScore: 3,
      reason: {
        en: 'Discretionary force, community accountability, and real-time threat assessment must remain human',
        zh: '自由裁量武力使用、社区问责和实时威胁评估必须由人类完成',
      },
    },
    {
      title: { en: 'Detectives and Criminal Investigators', zh: '刑警与刑事调查员' },
      riskScore: 3,
      reason: {
        en: 'Investigative judgment and witness interviews require contextual intelligence and legal authority',
        zh: '调查判断和证人访谈需要情境智能和法律权威',
      },
    },
    {
      title: { en: 'Security Guards', zh: '安保人员' },
      riskScore: 2,
      reason: {
        en: 'Physical deterrence and rapid response to unpredictable situations require human presence',
        zh: '对不可预测情况的身体威慑和快速响应需要人类在场',
      },
    },
    {
      title: { en: 'First-Line Supervisors of Police and Detectives', zh: '警察一线主管' },
      riskScore: 2,
      reason: {
        en: 'Command decisions in dynamic situations carry both legal and moral accountability',
        zh: '动态情况下的指挥决定同时承担法律和道德责任',
      },
    },
    {
      title: { en: 'Correctional Officers and Jailers', zh: '狱警' },
      riskScore: 2,
      reason: {
        en: 'Facility safety and inmate management in confined environments require constant human judgment',
        zh: '密闭环境中的设施安全和被监管人管理需要持续人类判断',
      },
    },
    {
      title: { en: 'Firefighters', zh: '消防员' },
      riskScore: 2,
      reason: {
        en: 'Dynamic fire suppression and rescue operations in unpredictable emergencies are irreducibly human',
        zh: '不可预测紧急情况中动态的灭火和救援行动是不可还原的人类工作',
      },
    },
  ],

};
