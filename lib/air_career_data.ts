/**
 * AIR Career Path Data
 *
 * For each of the 16 profile types, provides 5-6 specific career examples
 * with individual AI replacement risk scores and explanations.
 *
 * Risk scores are 0-100 where higher = more replaceable by AI.
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

  EOFP: [
    {
      title: { en: 'Data Entry Clerk', zh: '数据录入员' },
      riskScore: 95,
      reason: {
        en: 'Fully structured, repetitive digital work — AI already outperforms humans',
        zh: '完全结构化、重复性数字工作——AI已经超越人类表现',
      },
    },
    {
      title: { en: 'Bookkeeper', zh: '记账员' },
      riskScore: 92,
      reason: {
        en: 'Rule-based calculations with clear standards — automated accounting tools handle it end-to-end',
        zh: '规则明确的计算工作——自动化记账工具已能端到端处理',
      },
    },
    {
      title: { en: 'Insurance Claims Processor', zh: '保险理赔处理员' },
      riskScore: 88,
      reason: {
        en: 'Pattern matching on structured forms — AI claims systems already deployed at scale',
        zh: '结构化表单的模式匹配——AI理赔系统已大规模部署',
      },
    },
    {
      title: { en: 'Administrative Assistant', zh: '行政助理' },
      riskScore: 85,
      reason: {
        en: 'Scheduling, filing, email — AI agents handle routine coordination increasingly well',
        zh: '日程安排、文件归档、邮件——AI助手越来越擅长常规协调',
      },
    },
    {
      title: { en: 'Payroll Specialist', zh: '薪酬专员' },
      riskScore: 83,
      reason: {
        en: 'Calculation-heavy, rule-driven process — payroll software already automates most tasks',
        zh: '计算密集、规则驱动的流程——薪酬软件已自动化大部分任务',
      },
    },
    {
      title: { en: 'Customer Service Rep (Scripted)', zh: '客服代表（标准话术）' },
      riskScore: 80,
      reason: {
        en: 'Scripted interactions with known solutions — chatbots increasingly replacing L1 support',
        zh: '标准话术的已知方案应答——聊天机器人正在替代初级客服',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // HIGH RISK — 3/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════

  EOFH: [
    {
      title: { en: 'Retail Salesperson', zh: '零售销售员' },
      riskScore: 75,
      reason: {
        en: 'E-commerce and AI recommendations eroding in-store advantage — relationship is the last moat',
        zh: '电商和AI推荐侵蚀实体优势——人际关系是最后护城河',
      },
    },
    {
      title: { en: 'Insurance Agent', zh: '保险代理人' },
      riskScore: 70,
      reason: {
        en: 'AI can compare and recommend plans — agents survive on trust and personal follow-up',
        zh: 'AI能比较和推荐方案——代理人靠信任和个人跟进存活',
      },
    },
    {
      title: { en: 'Recruitment Consultant', zh: '招聘顾问' },
      riskScore: 68,
      reason: {
        en: 'AI sourcing and matching improving fast — human value is in candidate relationships',
        zh: 'AI筛选匹配快速进步——人的价值在候选人关系维护',
      },
    },
    {
      title: { en: 'Real Estate Agent', zh: '房产经纪人' },
      riskScore: 65,
      reason: {
        en: 'Listings and matching are digital — agents survive on local knowledge and client trust',
        zh: '房源匹配已数字化——经纪人靠本地知识和客户信任存活',
      },
    },
    {
      title: { en: 'Account Manager (B2B)', zh: '客户经理（B2B）' },
      riskScore: 58,
      reason: {
        en: 'Complex relationship management — AI assists but can\'t replace the human face of deals',
        zh: '复杂的关系管理——AI可辅助但无法替代交易中的人情面',
      },
    },
    {
      title: { en: 'Financial Advisor (Relationship)', zh: '理财顾问（关系型）' },
      riskScore: 55,
      reason: {
        en: 'Robo-advisors handle portfolios — but high-net-worth clients want a trusted person',
        zh: '智能投顾管理组合——但高净值客户需要信任的人',
      },
    },
  ],

  EORP: [
    {
      title: { en: 'Assembly Line Inspector', zh: '流水线质检员' },
      riskScore: 75,
      reason: {
        en: 'Visual inspection being automated by computer vision — but regulatory liability slows adoption',
        zh: '视觉检测正被机器视觉自动化——但监管责任减缓采用速度',
      },
    },
    {
      title: { en: 'Pharmacy Technician', zh: '药剂技师' },
      riskScore: 70,
      reason: {
        en: 'Automated dispensing spreading — but drug safety regulations require human oversight',
        zh: '自动配药扩展中——但药品安全法规要求人工监督',
      },
    },
    {
      title: { en: 'Lab Technician (Routine)', zh: '实验室技术员（常规）' },
      riskScore: 68,
      reason: {
        en: 'Standard test protocols being automated — regulated industries keep humans as checkpoint',
        zh: '标准检测流程正在自动化——受监管行业保留人工作为检查环节',
      },
    },
    {
      title: { en: 'Compliance Analyst', zh: '合规分析师' },
      riskScore: 62,
      reason: {
        en: 'AI scans regulations faster — but interpretation and liability still require human sign-off',
        zh: 'AI扫描法规更快——但解释和责任仍需人工签字确认',
      },
    },
    {
      title: { en: 'Manufacturing Quality Manager', zh: '制造质量经理' },
      riskScore: 55,
      reason: {
        en: 'AI assists defect detection — but production halts and recalls need human judgment calls',
        zh: 'AI辅助缺陷检测——但停产和召回需要人的判断决策',
      },
    },
  ],

  ESFP: [
    {
      title: { en: 'Marketing Copywriter', zh: '营销文案' },
      riskScore: 78,
      reason: {
        en: 'AI writes competent copy — but brand voice and creative concepts still need human taste',
        zh: 'AI能写合格文案——但品牌调性和创意概念仍需人的品味',
      },
    },
    {
      title: { en: 'Graphic Designer (Template)', zh: '平面设计师（模版型）' },
      riskScore: 75,
      reason: {
        en: 'AI generates designs from prompts — template-based work is most vulnerable',
        zh: 'AI从提示生成设计——模版型工作最易被替代',
      },
    },
    {
      title: { en: 'Social Media Manager', zh: '社交媒体运营' },
      riskScore: 70,
      reason: {
        en: 'AI generates posts and schedules — but platform intuition and trend sensing is human',
        zh: 'AI生成帖子和排期——但平台直觉和趋势洞察是人的优势',
      },
    },
    {
      title: { en: 'Front-End Developer', zh: '前端开发' },
      riskScore: 65,
      reason: {
        en: 'AI coding assistants accelerating — creative UI/UX decisions provide human edge',
        zh: 'AI编码助手加速中——创意UI/UX决策是人的优势',
      },
    },
    {
      title: { en: 'UX Designer', zh: 'UX设计师' },
      riskScore: 55,
      reason: {
        en: 'AI generates wireframes — but user empathy and product judgment remain human strengths',
        zh: 'AI生成线框图——但用户同理心和产品判断仍是人的强项',
      },
    },
    {
      title: { en: 'Game Designer', zh: '游戏策划' },
      riskScore: 48,
      reason: {
        en: 'AI assists with balancing and content — but fun is subjective and iterative',
        zh: 'AI辅助数值平衡和内容——但"好玩"是主观且迭代的',
      },
    },
  ],

  TOFP: [
    {
      title: { en: 'Assembly Line Worker', zh: '流水线工人' },
      riskScore: 80,
      reason: {
        en: 'Repetitive physical tasks — industrial robots steadily replacing in structured environments',
        zh: '重复性体力劳动——工业机器人在结构化环境中持续替代',
      },
    },
    {
      title: { en: 'Warehouse Picker/Packer', zh: '仓库拣货/打包员' },
      riskScore: 78,
      reason: {
        en: 'Amazon-style automation scaling fast — but dexterity for varied items still challenging for robots',
        zh: '亚马逊式自动化快速扩展——但机器人抓取多样物品仍有挑战',
      },
    },
    {
      title: { en: 'Delivery Driver', zh: '配送司机' },
      riskScore: 72,
      reason: {
        en: 'Autonomous vehicles progressing — last-mile and complex urban scenarios delay full replacement',
        zh: '自动驾驶持续进展——最后一公里和复杂城市场景延缓全面替代',
      },
    },
    {
      title: { en: 'Fast Food Cook (Chain)', zh: '快餐厨师（连锁）' },
      riskScore: 68,
      reason: {
        en: 'Standardized recipes suit automation — but kitchen robotics still expensive and limited',
        zh: '标准化菜谱适合自动化——但厨房机器人仍昂贵且有限',
      },
    },
    {
      title: { en: 'Janitor/Custodian', zh: '清洁工/物业保洁' },
      riskScore: 55,
      reason: {
        en: 'Cleaning robots exist but struggle with varied real-world spaces and edge cases',
        zh: '清洁机器人已有但难以应对多样真实空间和边缘情况',
      },
    },
    {
      title: { en: 'HVAC Technician', zh: '暖通技术员' },
      riskScore: 42,
      reason: {
        en: 'Diagnosis can be AI-assisted — but physical access and repairs in varied buildings require humans',
        zh: '诊断可由AI辅助——但不同建筑中的物理检修需要人',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM RISK — 2/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════

  EORH: [
    {
      title: { en: 'Notary Public', zh: '公证员' },
      riskScore: 62,
      reason: {
        en: 'Digital notarization emerging — but legal witnessing and trust still require a person',
        zh: '数字公证兴起——但法律见证和信任仍需要真人',
      },
    },
    {
      title: { en: 'Tax Preparer (Licensed)', zh: '税务师（持证）' },
      riskScore: 58,
      reason: {
        en: 'TurboTax-style AI handles simple returns — complex situations and audits still need licensed humans',
        zh: 'AI报税工具处理简单申报——复杂情况和审计仍需持证人员',
      },
    },
    {
      title: { en: 'Mortgage Broker', zh: '贷款经纪人' },
      riskScore: 55,
      reason: {
        en: 'Online lending platforms growing — but regulated process and client trust keep humans relevant',
        zh: '在线贷款平台增长——但受监管流程和客户信任使人保持相关性',
      },
    },
    {
      title: { en: 'CPA / Accountant', zh: '注册会计师' },
      riskScore: 50,
      reason: {
        en: 'AI automates bookkeeping — but audit judgment, licensing, and client advisory remain human',
        zh: 'AI自动化记账——但审计判断、执照和客户咨询仍属于人',
      },
    },
    {
      title: { en: 'Compliance Officer', zh: '合规官' },
      riskScore: 45,
      reason: {
        en: 'AI monitors transactions — but regulatory interpretation and organizational trust require humans',
        zh: 'AI监控交易——但法规解释和组织信任需要人',
      },
    },
    {
      title: { en: 'Financial Planner (CFP)', zh: '理财规划师（CFP）' },
      riskScore: 42,
      reason: {
        en: 'Robo-advisors commoditize allocation — but life planning and fiduciary trust stay human',
        zh: '智能投顾商品化资产配置——但人生规划和信托信任仍在人手中',
      },
    },
  ],

  ESFH: [
    {
      title: { en: 'Online Course Creator', zh: '网课制作者' },
      riskScore: 58,
      reason: {
        en: 'AI generates educational content rapidly — but student engagement favors known instructors',
        zh: 'AI快速生成教育内容——但学生参与度偏好知名讲师',
      },
    },
    {
      title: { en: 'Social Media Influencer', zh: '社交媒体KOL' },
      riskScore: 52,
      reason: {
        en: 'AI-generated avatars emerging — but authenticity and parasocial bonds are human advantages',
        zh: 'AI虚拟形象兴起——但真实性和粉丝情感连接是人的优势',
      },
    },
    {
      title: { en: 'YouTuber / Content Creator', zh: 'YouTuber / 内容创作者' },
      riskScore: 48,
      reason: {
        en: 'AI tools help production — but personality, storytelling, and audience loyalty are human',
        zh: 'AI工具辅助制作——但人格魅力、叙事力和观众忠诚是人的',
      },
    },
    {
      title: { en: 'Online Tutor (1-on-1)', zh: '在线家教（一对一）' },
      riskScore: 42,
      reason: {
        en: 'AI tutoring systems improving — but personal connection and motivation are hard to replicate',
        zh: 'AI辅导系统进步——但个人连接和激励作用难以复制',
      },
    },
    {
      title: { en: 'Podcast Host', zh: '播客主持人' },
      riskScore: 38,
      reason: {
        en: 'AI can summarize and script — but the host\'s personality IS the product',
        zh: 'AI能总结和写稿——但主持人的人格就是产品本身',
      },
    },
    {
      title: { en: 'University Professor (Teaching)', zh: '大学教授（教学型）' },
      riskScore: 35,
      reason: {
        en: 'AI can deliver content — but mentorship, academic guidance, and inspiration are deeply human',
        zh: 'AI能传递知识——但指导、学术引领和启发是深度人性的',
      },
    },
  ],

  ESRP: [
    {
      title: { en: 'Junior Investment Analyst', zh: '初级投资分析师' },
      riskScore: 60,
      reason: {
        en: 'AI processes market data faster — but novel thesis and risk judgment still need humans',
        zh: 'AI处理市场数据更快——但新颖论点和风险判断仍需人',
      },
    },
    {
      title: { en: 'Product Designer (Digital)', zh: '产品设计师（数字）' },
      riskScore: 52,
      reason: {
        en: 'AI generates prototypes — but design taste and user empathy at scale are human',
        zh: 'AI生成原型——但设计品味和规模化用户同理心是人的',
      },
    },
    {
      title: { en: 'Architect', zh: '建筑师' },
      riskScore: 48,
      reason: {
        en: 'AI assists drafting and optimization — but creative vision and liability are human-owned',
        zh: 'AI辅助制图和优化——但创意愿景和法律责任归属于人',
      },
    },
    {
      title: { en: 'Urban Planner', zh: '城市规划师' },
      riskScore: 45,
      reason: {
        en: 'AI models traffic and demographics — but community vision and political navigation are human',
        zh: 'AI模拟交通和人口——但社区愿景和政治协调是人的工作',
      },
    },
    {
      title: { en: 'Civil Engineer', zh: '土木工程师' },
      riskScore: 42,
      reason: {
        en: 'AI optimizes structural analysis — but creative solutions for unique sites carry human liability',
        zh: 'AI优化结构分析——但独特场地的创造性方案承载人的责任',
      },
    },
    {
      title: { en: 'Research Scientist', zh: '科研人员' },
      riskScore: 35,
      reason: {
        en: 'AI accelerates literature and data analysis — but novel hypotheses and experimental design are human',
        zh: 'AI加速文献和数据分析——但新假设和实验设计是人的领域',
      },
    },
  ],

  TOFH: [
    {
      title: { en: 'Nail Technician', zh: '美甲师' },
      riskScore: 45,
      reason: {
        en: 'Some automation possible — but dexterity and client preference for a personal touch protect it',
        zh: '部分自动化可能——但灵巧度和客户对个人服务的偏好保护它',
      },
    },
    {
      title: { en: 'Dog Groomer', zh: '宠物美容师' },
      riskScore: 40,
      reason: {
        en: 'Handling living animals safely requires human judgment — owners trust specific groomers',
        zh: '安全处理活体动物需要人的判断——宠物主信任特定美容师',
      },
    },
    {
      title: { en: 'Personal Trainer', zh: '私人健身教练' },
      riskScore: 38,
      reason: {
        en: 'AI fitness apps exist — but real-time form correction and motivational coaching are human strengths',
        zh: 'AI健身APP已有——但实时动作纠正和激励辅导是人的强项',
      },
    },
    {
      title: { en: 'Barber / Hairstylist', zh: '理发师 / 发型师' },
      riskScore: 35,
      reason: {
        en: 'Robotic haircuts experimental — clients value the personal ritual and trusted stylist',
        zh: '机器人理发在实验阶段——客户重视个人仪式感和信赖的发型师',
      },
    },
    {
      title: { en: 'Massage Therapist', zh: '按摩治疗师' },
      riskScore: 30,
      reason: {
        en: 'Massage chairs exist but lack the adaptive, empathetic touch — clients seek the human experience',
        zh: '按摩椅已有但缺乏适应性、共情的触感——客户追求人的体验',
      },
    },
    {
      title: { en: 'Tattoo Artist', zh: '纹身师' },
      riskScore: 25,
      reason: {
        en: 'Skin is unpredictable, design is personal — the artist\'s reputation IS the business',
        zh: '皮肤不可预测、设计因人而异——纹身师的声誉就是生意本身',
      },
    },
  ],

  TORP: [
    {
      title: { en: 'CNC Machine Operator', zh: 'CNC机床操作员' },
      riskScore: 55,
      reason: {
        en: 'Automation increasing for standard parts — but custom precision work still needs experienced hands',
        zh: '标准件自动化增加——但定制精密工作仍需经验丰富的双手',
      },
    },
    {
      title: { en: 'Commercial Pilot', zh: '商业飞行员' },
      riskScore: 45,
      reason: {
        en: 'Autopilot handles cruise — but takeoff, landing, emergencies need human judgment and regulation mandates it',
        zh: '自动驾驶处理巡航——但起降和紧急情况需要人的判断，法规也要求如此',
      },
    },
    {
      title: { en: 'Electrician (Industrial)', zh: '电工（工业）' },
      riskScore: 40,
      reason: {
        en: 'Diagnostics can be AI-assisted — but wiring in unique installations requires physical judgment',
        zh: '诊断可AI辅助——但独特安装环境中的布线需要身体判断',
      },
    },
    {
      title: { en: 'Welder (Structural)', zh: '焊工（结构件）' },
      riskScore: 38,
      reason: {
        en: 'Welding robots handle repetitive joints — but fieldwork on unique structures needs skilled humans',
        zh: '焊接机器人处理重复焊缝——但独特结构的现场工作需要技术工人',
      },
    },
    {
      title: { en: 'Surgeon (General)', zh: '外科医生（普外）' },
      riskScore: 28,
      reason: {
        en: 'Robotic surgery is surgeon-controlled — tactile feedback and split-second decisions are irreplaceable',
        zh: '机器人手术由医生控制——触觉反馈和瞬间决策不可替代',
      },
    },
    {
      title: { en: 'Neurosurgeon', zh: '神经外科医生' },
      riskScore: 18,
      reason: {
        en: 'Extreme precision + irreversible consequences + years of tacit knowledge — one of the hardest to replace',
        zh: '极致精密+不可逆后果+多年隐性知识——最难被替代的职业之一',
      },
    },
  ],

  TSFP: [
    {
      title: { en: 'Fast-Casual Line Cook', zh: '快餐厨师' },
      riskScore: 55,
      reason: {
        en: 'Standardized recipes can be automated — but adapting to ingredients in real-time is still human',
        zh: '标准化食谱可自动化——但实时适应食材仍靠人',
      },
    },
    {
      title: { en: 'Baker (Wholesale)', zh: '面包师（批量）' },
      riskScore: 50,
      reason: {
        en: 'Industrial baking increasingly automated — artisan touch and taste judgment harder to replicate',
        zh: '工业烘焙越来越自动化——匠心手感和味觉判断难以复制',
      },
    },
    {
      title: { en: 'Florist', zh: '花艺师' },
      riskScore: 45,
      reason: {
        en: 'AI generates arrangements — but working with live flowers and sensing freshness is physical craft',
        zh: 'AI生成插花方案——但处理鲜花和感知新鲜度是身体技艺',
      },
    },
    {
      title: { en: 'Farmer (Specialty Crop)', zh: '农人（特色种植）' },
      riskScore: 42,
      reason: {
        en: 'Precision agriculture AI advancing — but soil intuition and microclimate adaptation remain human',
        zh: '精准农业AI进步——但土壤直觉和微气候适应仍属于人',
      },
    },
    {
      title: { en: 'Independent Chef', zh: '独立主厨' },
      riskScore: 35,
      reason: {
        en: 'AI can suggest recipes — but palate development and original flavor creation is deeply tacit and subjective',
        zh: 'AI能推荐食谱——但味觉培养和原创风味创造是深度隐性和主观的',
      },
    },
    {
      title: { en: 'Furniture Maker / Woodworker', zh: '家具匠 / 木工' },
      riskScore: 30,
      reason: {
        en: 'CNC handles mass production — but custom one-off pieces need tactile skill and aesthetic sense',
        zh: 'CNC处理批量生产——但定制单品需要触觉技巧和审美感知',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // LOW RISK — 1/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════

  ESRH: [
    {
      title: { en: 'Junior Lawyer (Research)', zh: '初级律师（研究型）' },
      riskScore: 45,
      reason: {
        en: 'AI handles legal research and drafting — but entry-level associates losing billable tasks fastest',
        zh: 'AI处理法律研究和起草——初级律师的可计费工作流失最快',
      },
    },
    {
      title: { en: 'Management Consultant', zh: '管理咨询师' },
      riskScore: 35,
      reason: {
        en: 'AI generates analysis and slide decks — but C-suite trust and organizational politics are human',
        zh: 'AI生成分析和幻灯片——但高管信任和组织政治是人的领域',
      },
    },
    {
      title: { en: 'Attending Physician', zh: '主治医师' },
      riskScore: 28,
      reason: {
        en: 'AI aids diagnosis — but treatment decisions carry personal liability and patient trust',
        zh: 'AI辅助诊断——但治疗决策承担个人责任和患者信任',
      },
    },
    {
      title: { en: 'Senior Partner (Law)', zh: '律所合伙人' },
      riskScore: 22,
      reason: {
        en: 'Client relationships span decades — subjective judgment on high-stakes cases is irreplaceable',
        zh: '客户关系跨越数十年——高风险案件的主观判断不可替代',
      },
    },
    {
      title: { en: 'Executive Coach', zh: '高管教练' },
      riskScore: 18,
      reason: {
        en: 'Deep personal transformation work — trust, empathy, and confrontation are uniquely human',
        zh: '深度个人转化工作——信任、共情和直面问题是独特的人类能力',
      },
    },
    {
      title: { en: 'Chief Medical Officer', zh: '首席医疗官' },
      riskScore: 15,
      reason: {
        en: 'Sets institutional medical policy — combines clinical authority, ethics, and organizational leadership',
        zh: '制定机构医疗政策——融合临床权威、伦理和组织领导力',
      },
    },
  ],

  TORH: [
    {
      title: { en: 'Home Health Aide', zh: '居家护理员' },
      riskScore: 35,
      reason: {
        en: 'Physical care in unpredictable home settings — robots still far from safe patient handling',
        zh: '不可预测家庭环境中的身体护理——机器人远未能安全处理患者',
      },
    },
    {
      title: { en: 'Physical Therapist', zh: '物理治疗师' },
      riskScore: 28,
      reason: {
        en: 'Hands-on manipulation + patient trust + real-time adaptation — AI assists but cannot replace touch',
        zh: '手法治疗+患者信任+实时调整——AI辅助但无法替代触感',
      },
    },
    {
      title: { en: 'Paramedic / EMT', zh: '急救医护人员' },
      riskScore: 25,
      reason: {
        en: 'Chaotic field conditions + physical interventions + patient reassurance — deeply human',
        zh: '混乱现场条件+身体干预+安抚患者——深度依赖人',
      },
    },
    {
      title: { en: 'Dentist', zh: '牙医' },
      riskScore: 22,
      reason: {
        en: 'Working in a tiny, sensitive space on a conscious patient — requires hands, eyes, and trust simultaneously',
        zh: '在清醒患者的微小敏感空间工作——同时需要双手、眼睛和信任',
      },
    },
    {
      title: { en: 'Midwife / OB Nurse', zh: '助产士 / 产科护士' },
      riskScore: 18,
      reason: {
        en: 'Birth is high-stakes, physical, emotional, and every case is unique — families need a trusted person',
        zh: '分娩是高风险、体力、情感并举的，每次都不同——家庭需要信任的人',
      },
    },
    {
      title: { en: 'Pediatric Nurse', zh: '儿科护士' },
      riskScore: 20,
      reason: {
        en: 'Children cannot articulate symptoms — requires physical assessment skill and a calming presence',
        zh: '儿童无法描述症状——需要身体评估技能和安抚能力',
      },
    },
  ],

  TSFH: [
    {
      title: { en: 'Session Musician (Studio)', zh: '录音室乐手' },
      riskScore: 35,
      reason: {
        en: 'AI generates music — but live session feel, improvisation, and producer relationships are human',
        zh: 'AI生成音乐——但现场录音感、即兴和制作人关系是人的',
      },
    },
    {
      title: { en: 'Dance Instructor', zh: '舞蹈教师' },
      riskScore: 28,
      reason: {
        en: 'The body teaches the body — physical demonstration and correction cannot be replaced by video',
        zh: '身体教身体——身体示范和纠正无法被视频替代',
      },
    },
    {
      title: { en: 'Theater Actor', zh: '话剧演员' },
      riskScore: 22,
      reason: {
        en: 'Live performance with real-time audience connection — the human body IS the medium',
        zh: '与观众实时连接的现场表演——人的身体就是媒介',
      },
    },
    {
      title: { en: 'Concert Musician', zh: '音乐家（现场）' },
      riskScore: 18,
      reason: {
        en: 'Live music is a physical, emotional, unrepeatable experience — audiences pay for presence',
        zh: '现场音乐是身体性的、情感性的、不可复制的体验——观众为"在场"买单',
      },
    },
    {
      title: { en: 'Comedian (Stand-up)', zh: '脱口秀演员' },
      riskScore: 15,
      reason: {
        en: 'Reading a live room and improvising — humor is deeply contextual and the person IS the act',
        zh: '感知现场气氛和即兴发挥——幽默深度依赖语境，人本身就是表演',
      },
    },
    {
      title: { en: 'Professional Athlete', zh: '职业运动员' },
      riskScore: 10,
      reason: {
        en: 'Competition between human bodies — fans watch for human drama, not optimal performance',
        zh: '人体之间的竞技——观众看的是人的戏剧性，不是最优表现',
      },
    },
  ],

  TSRP: [
    {
      title: { en: 'Security Guard (Basic)', zh: '保安（基础）' },
      riskScore: 45,
      reason: {
        en: 'AI surveillance improving — but physical intervention and judgment in emergencies still require humans',
        zh: 'AI监控在进步——但紧急情况的身体干预和判断仍需人',
      },
    },
    {
      title: { en: 'Police Officer (Patrol)', zh: '巡警' },
      riskScore: 30,
      reason: {
        en: 'AI assists with data and dispatch — but de-escalation, physical confrontation, and community trust are human',
        zh: 'AI辅助数据和调度——但缓和局势、身体对抗和社区信任属于人',
      },
    },
    {
      title: { en: 'ER Doctor', zh: '急诊医生' },
      riskScore: 22,
      reason: {
        en: 'Chaotic environment + physical procedures + irreversible decisions in minutes — deeply human challenge',
        zh: '混乱环境+身体操作+分钟内不可逆决策——深度人类挑战',
      },
    },
    {
      title: { en: 'Firefighter', zh: '消防员' },
      riskScore: 18,
      reason: {
        en: 'Unpredictable physical danger + split-second life-death judgment — robots assist but can\'t lead',
        zh: '不可预测的身体危险+生死瞬间判断——机器人辅助但无法领导',
      },
    },
    {
      title: { en: 'Bomb Disposal Technician', zh: '拆弹专家' },
      riskScore: 15,
      reason: {
        en: 'Each device is unique — robots assist remotely but the final judgment is human',
        zh: '每个装置都是独特的——机器人远程辅助但最终判断是人的',
      },
    },
    {
      title: { en: 'Search & Rescue (Mountain/Sea)', zh: '搜救人员（山地/海上）' },
      riskScore: 12,
      reason: {
        en: 'Extreme unstructured environments — physical endurance, risk judgment, and empathy in crisis',
        zh: '极端非结构化环境——体能耐力、风险判断和危机中的共情',
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EXTREME LOW RISK — 0/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════

  TSRH: [
    {
      title: { en: 'Social Worker (Frontline)', zh: '社工（一线）' },
      riskScore: 18,
      reason: {
        en: 'Navigating human crisis with empathy + physical presence + institutional stakes — deeply human',
        zh: '以共情+身体在场+制度性风险应对人的危机——深度人类工作',
      },
    },
    {
      title: { en: 'Psychotherapist', zh: '心理治疗师' },
      riskScore: 15,
      reason: {
        en: 'Deep, adaptive human connection — trust, confrontation, and healing are irreducibly personal',
        zh: '深度的、适应性的人际连接——信任、直面和治愈是不可还原的个人体验',
      },
    },
    {
      title: { en: 'CEO / Top Executive', zh: 'CEO / 最高管理层' },
      riskScore: 12,
      reason: {
        en: 'Ultimate accountability + organizational vision + stakeholder trust — AI advises, humans decide',
        zh: '终极责任+组织愿景+利益相关者信任——AI建议，人做决策',
      },
    },
    {
      title: { en: 'Hospice / Palliative Care Nurse', zh: '临终关怀护士' },
      riskScore: 10,
      reason: {
        en: 'Accompanying death — physical care + emotional presence + family support at the deepest level',
        zh: '陪伴死亡——身体护理+情感在场+家属支持的最深层次',
      },
    },
    {
      title: { en: 'Religious Leader / Chaplain', zh: '宗教领袖 / 牧师' },
      riskScore: 8,
      reason: {
        en: 'Spiritual guidance in life\'s hardest moments — community trust built over a lifetime',
        zh: '在人生最艰难时刻的精神引导——终其一生建立的社区信任',
      },
    },
    {
      title: { en: 'Elite Athlete (Olympic)', zh: '顶级运动员（奥运级）' },
      riskScore: 5,
      reason: {
        en: 'The entire point is human physical excellence — replacing with AI would destroy the meaning',
        zh: '全部意义在于人体极限——用AI替代将摧毁意义本身',
      },
    },
  ],
};
