from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Sequence

from .models import UserProfile

EXPERIENCE_BUCKETS = {
    '0': 0,   # entry level
    '1': 2,   # 1-2 years
    '3': 4,   # 3-5 years
    '6': 8,   # 6-10 years
    '11': 12,  # 10+ years
}


@dataclass(frozen=True)
class CareerDefinition:
    slug: str
    title: str
    description: str
    required_skills: Sequence[str]
    interests: Sequence[str]
    education_levels: Sequence[str]
    average_salary: str
    growth_rate: str
    demand_index: int  # 1 (stable) - 5 (hot demand)
    min_experience: int  # in years


CAREER_LIBRARY: List[CareerDefinition] = [
    CareerDefinition(
        slug='ux-researcher',
        title='UX Researcher',
        description='Investigate user behavior, run studies, and translate findings into product insights.',
        required_skills=['user research', 'interviewing', 'insight synthesis', 'usability testing'],
        interests=['design', 'psychology', 'product'],
        education_levels=['bachelors', 'masters'],
        average_salary='$85k - $115k',
        growth_rate='8% CAGR',
        demand_index=3,
        min_experience=2,
    ),
    CareerDefinition(
        slug='data-analyst',
        title='Data Analyst',
        description='Clean, analyze, and visualize data to guide product and business decisions.',
        required_skills=['sql', 'python', 'analytics', 'dashboards', 'storytelling'],
        interests=['data', 'business', 'technology'],
        education_levels=['bachelors', 'masters'],
        average_salary='$75k - $105k',
        growth_rate='11% CAGR',
        demand_index=4,
        min_experience=1,
    ),
    CareerDefinition(
        slug='ai-product-manager',
        title='AI Product Manager',
        description='Define AI features, align cross-functional teams, and ensure responsible launches.',
        required_skills=['roadmapping', 'stakeholder management', 'prompt design', 'model evaluation'],
        interests=['ai', 'strategy', 'product'],
        education_levels=['bachelors', 'mba', 'masters'],
        average_salary='$120k - $155k',
        growth_rate='18% CAGR',
        demand_index=5,
        min_experience=5,
    ),
    CareerDefinition(
        slug='learning-experience-designer',
        title='Learning Experience Designer',
        description='Build engaging curricula and digital learning paths for internal upskilling.',
        required_skills=['curriculum design', 'storyboarding', 'learning science', 'stakeholder interviews'],
        interests=['education', 'design', 'technology'],
        education_levels=['bachelors', 'masters'],
        average_salary='$70k - $95k',
        growth_rate='9% CAGR',
        demand_index=3,
        min_experience=2,
    ),
    CareerDefinition(
        slug='machine-learning-engineer',
        title='Machine Learning Engineer',
        description='Ship ML models to production, optimize performance, and monitor real-world impact.',
        required_skills=['python', 'ml ops', 'model deployment', 'data engineering'],
        interests=['ai', 'automation', 'data'],
        education_levels=['bachelors', 'masters'],
        average_salary='$125k - $165k',
        growth_rate='21% CAGR',
        demand_index=5,
        min_experience=3,
    ),
    CareerDefinition(
        slug='product-operations-strategist',
        title='Product Operations Strategist',
        description='Scale product rituals, streamline experimentation, and keep roadmaps unblocked.',
        required_skills=['process design', 'analytics', 'communication', 'program management'],
        interests=['operations', 'product', 'strategy'],
        education_levels=['bachelors', 'mba'],
        average_salary='$95k - $130k',
        growth_rate='12% CAGR',
        demand_index=4,
        min_experience=4,
    ),
    CareerDefinition(
        slug='customer-success-lead',
        title='Customer Success Lead',
        description='Partner with customers, drive adoption metrics, and translate insights back to product.',
        required_skills=['relationship management', 'data storytelling', 'escalation handling', 'playbooks'],
        interests=['people', 'business', 'enablement'],
        education_levels=['associates', 'bachelors'],
        average_salary='$80k - $110k',
        growth_rate='10% CAGR',
        demand_index=3,
        min_experience=3,
    ),
    CareerDefinition(
        slug='technical-writer',
        title='Technical Writer',
        description='Translate complex systems into clear docs, tutorials, and enablement assets.',
        required_skills=['technical writing', 'api literacy', 'information architecture', 'editing'],
        interests=['communication', 'technology', 'education'],
        education_levels=['bachelors'],
        average_salary='$65k - $95k',
        growth_rate='7% CAGR',
        demand_index=2,
        min_experience=1,
    ),
    CareerDefinition(
        slug='growth-product-analyst',
        title='Growth Product Analyst',
        description='Instrument funnels, run experiments, and turn insights into growth playbooks.',
        required_skills=['sql', 'experiment design', 'product analytics', 'dashboarding'],
        interests=['data', 'product', 'experimentation'],
        education_levels=['bachelors', 'masters'],
        average_salary='$90k - $120k',
        growth_rate='14% CAGR',
        demand_index=4,
        min_experience=2,
    ),
    CareerDefinition(
        slug='security-operations-analyst',
        title='Security Operations Analyst',
        description='Monitor threats, triage incidents, and automate response workflows.',
        required_skills=['siem', 'incident response', 'scripting', 'threat intelligence'],
        interests=['security', 'automation', 'operations'],
        education_levels=['bachelors', 'certifications'],
        average_salary='$95k - $135k',
        growth_rate='15% CAGR',
        demand_index=5,
        min_experience=3,
    ),
    CareerDefinition(
        slug='marketing-automation-specialist',
        title='Marketing Automation Specialist',
        description='Build lifecycle journeys, personalize campaigns, and ship scoring models.',
        required_skills=['marketing ops', 'crm', 'sql', 'copywriting'],
        interests=['marketing', 'data', 'automation'],
        education_levels=['associates', 'bachelors'],
        average_salary='$70k - $105k',
        growth_rate='9% CAGR',
        demand_index=3,
        min_experience=2,
    ),
    CareerDefinition(
        slug='cloud-solutions-architect',
        title='Cloud Solutions Architect',
        description='Design reliable cloud platforms, advise teams on cost-performance, and guide migrations.',
        required_skills=['aws/azure', 'infrastructure design', 'devops', 'cost optimization'],
        interests=['cloud', 'architecture', 'automation'],
        education_levels=['bachelors', 'masters'],
        average_salary='$140k - $185k',
        growth_rate='16% CAGR',
        demand_index=5,
        min_experience=6,
    ),
    CareerDefinition(
        slug='health-informatics-analyst',
        title='Health Informatics Analyst',
        description='Clean EMR data, identify care gaps, and support clinicians with dashboards.',
        required_skills=['data cleaning', 'healthcare compliance', 'visualization', 'sql'],
        interests=['healthcare', 'data', 'impact'],
        education_levels=['bachelors', 'masters'],
        average_salary='$80k - $110k',
        growth_rate='13% CAGR',
        demand_index=4,
        min_experience=2,
    ),
    CareerDefinition(
        slug='full-stack-engineer',
        title='Full-Stack Engineer',
        description='Ship end-to-end features across modern frontends and resilient APIs.',
        required_skills=['javascript', 'node.js', 'react', 'database design', 'devops'],
        interests=['code', 'product', 'problem solving'],
        education_levels=['bachelors', 'bootcamp'],
        average_salary='$110k - $145k',
        growth_rate='15% CAGR',
        demand_index=5,
        min_experience=3,
    ),
    CareerDefinition(
        slug='cybersecurity-engineer',
        title='Cybersecurity Engineer',
        description='Design defenses, run red/blue team exercises, and harden infrastructure.',
        required_skills=['network security', 'penetration testing', 'automation', 'incident response'],
        interests=['security', 'automation', 'systems'],
        education_levels=['bachelors', 'certifications'],
        average_salary='$115k - $150k',
        growth_rate='17% CAGR',
        demand_index=5,
        min_experience=4,
    ),
    CareerDefinition(
        slug='product-marketing-manager',
        title='Product Marketing Manager',
        description='Craft positioning, launch go-to-market plans, and enable revenue teams.',
        required_skills=['positioning', 'messaging', 'market research', 'stakeholder management'],
        interests=['marketing', 'storytelling', 'strategy'],
        education_levels=['bachelors', 'mba'],
        average_salary='$105k - $140k',
        growth_rate='9% CAGR',
        demand_index=4,
        min_experience=4,
    ),
    CareerDefinition(
        slug='financial-planning-analyst',
        title='Financial Planning Analyst',
        description='Model scenarios, monitor KPIs, and advise on budgeting decisions.',
        required_skills=['financial modeling', 'excel', 'sql', 'communication'],
        interests=['finance', 'business', 'analytics'],
        education_levels=['bachelors', 'cfa'],
        average_salary='$85k - $115k',
        growth_rate='7% CAGR',
        demand_index=3,
        min_experience=2,
    ),
    CareerDefinition(
        slug='supply-chain-analyst',
        title='Supply Chain Analyst',
        description='Forecast demand, optimize logistics, and reduce working capital.',
        required_skills=['demand planning', 'sql', 'optimization', 'erp'],
        interests=['operations', 'data', 'global business'],
        education_levels=['bachelors', 'masters'],
        average_salary='$80k - $110k',
        growth_rate='8% CAGR',
        demand_index=4,
        min_experience=3,
    ),
    CareerDefinition(
        slug='biomedical-engineer',
        title='Biomedical Engineer',
        description='Prototype medical devices, run usability studies, and ensure regulatory compliance.',
        required_skills=['biomechanics', 'cad', 'testing', 'documentation'],
        interests=['healthcare', 'engineering', 'innovation'],
        education_levels=['bachelors', 'masters'],
        average_salary='$95k - $125k',
        growth_rate='10% CAGR',
        demand_index=3,
        min_experience=3,
    ),
    CareerDefinition(
        slug='sustainability-consultant',
        title='Sustainability Consultant',
        description='Audit carbon footprints, design ESG roadmaps, and secure stakeholder buy-in.',
        required_skills=['life-cycle analysis', 'data storytelling', 'policy research', 'facilitation'],
        interests=['environment', 'policy', 'impact'],
        education_levels=['bachelors', 'masters'],
        average_salary='$90k - $130k',
        growth_rate='14% CAGR',
        demand_index=4,
        min_experience=4,
    ),
    CareerDefinition(
        slug='blockchain-developer',
        title='Blockchain Developer',
        description='Build decentralized apps, smart contracts, and secure wallets.',
        required_skills=['solidity', 'cryptography', 'distributed systems', 'javascript'],
        interests=['web3', 'finance', 'innovation'],
        education_levels=['bachelors', 'bootcamp'],
        average_salary='$120k - $160k',
        growth_rate='19% CAGR',
        demand_index=4,
        min_experience=3,
    ),
    CareerDefinition(
        slug='salesforce-consultant',
        title='Salesforce Consultant',
        description='Translate business workflows into scalable Salesforce automations.',
        required_skills=['salesforce admin', 'process design', 'apex', 'stakeholder management'],
        interests=['crm', 'operations', 'automation'],
        education_levels=['associates', 'bachelors'],
        average_salary='$95k - $125k',
        growth_rate='12% CAGR',
        demand_index=4,
        min_experience=2,
    ),
    CareerDefinition(
        slug='vr-interaction-designer',
        title='VR Interaction Designer',
        description='Craft immersive interactions and ensure comfort in virtual environments.',
        required_skills=['3d design', 'unity', 'user research', 'prototyping'],
        interests=['vr/ar', 'design', 'storytelling'],
        education_levels=['bachelors', 'masters'],
        average_salary='$100k - $135k',
        growth_rate='18% CAGR',
        demand_index=4,
        min_experience=3,
    ),
    CareerDefinition(
        slug='edtech-program-manager',
        title='EdTech Program Manager',
        description='Coordinate large learning deployments, drive adoption, and report impact.',
        required_skills=['project management', 'data analysis', 'facilitation', 'stakeholder alignment'],
        interests=['education', 'operations', 'technology'],
        education_levels=['bachelors', 'masters'],
        average_salary='$90k - $120k',
        growth_rate='11% CAGR',
        demand_index=3,
        min_experience=4,
    ),
    CareerDefinition(
        slug='game-producer',
        title='Game Producer',
        description='Run cross-functional sprint rituals, manage roadmaps, and ensure polished releases.',
        required_skills=['project management', 'communication', 'analytics', 'game pipelines'],
        interests=['gaming', 'storytelling', 'team leadership'],
        education_levels=['bachelors'],
        average_salary='$85k - $125k',
        growth_rate='9% CAGR',
        demand_index=4,
        min_experience=4,
    ),
    CareerDefinition(
        slug='data-engineering-lead',
        title='Data Engineering Lead',
        description='Architect pipelines, mentor engineers, and keep analytics platforms reliable.',
        required_skills=['python', 'spark', 'data modeling', 'cloud infrastructure'],
        interests=['data', 'architecture', 'leadership'],
        education_levels=['bachelors', 'masters'],
        average_salary='$135k - $180k',
        growth_rate='16% CAGR',
        demand_index=5,
        min_experience=5,
    ),
    CareerDefinition(
        slug='customer-research-strategist',
        title='Customer Research Strategist',
        description='Blend qual/quant methods, size markets, and inform product bets.',
        required_skills=['survey design', 'statistical analysis', 'storytelling', 'stakeholder alignment'],
        interests=['research', 'product', 'strategy'],
        education_levels=['bachelors', 'masters'],
        average_salary='$95k - $130k',
        growth_rate='10% CAGR',
        demand_index=3,
        min_experience=3,
    ),
    CareerDefinition(
        slug='content-strategy-lead',
        title='Content Strategy Lead',
        description='Guide multi-channel narratives, editorial calendars, and voice governance.',
        required_skills=['content ops', 'seo', 'analytics', 'copywriting'],
        interests=['storytelling', 'marketing', 'leadership'],
        education_levels=['bachelors'],
        average_salary='$100k - $140k',
        growth_rate='8% CAGR',
        demand_index=3,
        min_experience=5,
    ),
    CareerDefinition(
        slug='operations-research-analyst',
        title='Operations Research Analyst',
        description='Model complex systems and recommend optimizations for cost or throughput.',
        required_skills=['linear programming', 'python', 'simulation', 'statistics'],
        interests=['math', 'operations', 'analytics'],
        education_levels=['masters', 'phd'],
        average_salary='$105k - $140k',
        growth_rate='11% CAGR',
        demand_index=4,
        min_experience=3,
    ),
    CareerDefinition(
        slug='public-health-analyst',
        title='Public Health Analyst',
        description='Track population health metrics, prepare briefs, and inform policy.',
        required_skills=['epidemiology', 'r/python', 'data visualization', 'stakeholder management'],
        interests=['healthcare', 'policy', 'data'],
        education_levels=['masters'],
        average_salary='$85k - $115k',
        growth_rate='9% CAGR',
        demand_index=3,
        min_experience=3,
    ),
    CareerDefinition(
        slug='digital-transformation-consultant',
        title='Digital Transformation Consultant',
        description='Assess tech stacks, align execs, and deliver modernization roadmaps.',
        required_skills=['strategy', 'process mapping', 'cloud fluency', 'change management'],
        interests=['consulting', 'technology', 'operations'],
        education_levels=['bachelors', 'mba'],
        average_salary='$135k - $185k',
        growth_rate='13% CAGR',
        demand_index=4,
        min_experience=6,
    ),
    CareerDefinition(
        slug='manufacturing-automation-engineer',
        title='Manufacturing Automation Engineer',
        description='Deploy robotics, tune PLCs, and cut downtime on production lines.',
        required_skills=['plc programming', 'robotics', 'lean manufacturing', 'cad'],
        interests=['hardware', 'operations', 'automation'],
        education_levels=['bachelors'],
        average_salary='$95k - $130k',
        growth_rate='12% CAGR',
        demand_index=4,
        min_experience=4,
    ),
    CareerDefinition(
        slug='policy-analyst',
        title='Policy Analyst',
        description='Research legislation, model impact scenarios, and brief decision makers.',
        required_skills=['policy research', 'writing', 'statistics', 'stakeholder engagement'],
        interests=['public service', 'law', 'economics'],
        education_levels=['masters'],
        average_salary='$80k - $110k',
        growth_rate='6% CAGR',
        demand_index=3,
        min_experience=3,
    ),
    CareerDefinition(
        slug='clinical-psychologist',
        title='Clinical Psychologist',
        description='Diagnose mental health conditions, develop treatment plans, and document progress.',
        required_skills=['diagnostic assessment', 'cbt', 'report writing', 'empathy'],
        interests=['healthcare', 'psychology', 'people'],
        education_levels=['phd', 'psyd'],
        average_salary='$95k - $130k',
        growth_rate='11% CAGR',
        demand_index=4,
        min_experience=4,
    ),
    CareerDefinition(
        slug='school-counselor',
        title='School Counselor',
        description='Support students’ academic planning, social-emotional needs, and family coordination.',
        required_skills=['counseling', 'intervention planning', 'communication', 'record keeping'],
        interests=['education', 'youth development', 'guidance'],
        education_levels=['masters'],
        average_salary='$65k - $90k',
        growth_rate='8% CAGR',
        demand_index=4,
        min_experience=2,
    ),
    CareerDefinition(
        slug='healthcare-administrator',
        title='Healthcare Administrator',
        description='Oversee operations, staffing, and budgeting within hospitals or clinics.',
        required_skills=['operations', 'budget management', 'regulatory compliance', 'leadership'],
        interests=['healthcare', 'management', 'impact'],
        education_levels=['bachelors', 'masters'],
        average_salary='$110k - $150k',
        growth_rate='9% CAGR',
        demand_index=4,
        min_experience=5,
    ),
    CareerDefinition(
        slug='nonprofit-program-manager',
        title='Nonprofit Program Manager',
        description='Design community programs, manage grants, and measure social outcomes.',
        required_skills=['program design', 'grant writing', 'stakeholder engagement', 'reporting'],
        interests=['impact', 'community', 'leadership'],
        education_levels=['bachelors', 'masters'],
        average_salary='$70k - $100k',
        growth_rate='7% CAGR',
        demand_index=3,
        min_experience=3,
    ),
    CareerDefinition(
        slug='museum-curator',
        title='Museum Curator',
        description='Acquire collections, plan exhibitions, and steward educational experiences.',
        required_skills=['art history', 'research', 'storytelling', 'collection management'],
        interests=['arts', 'history', 'education'],
        education_levels=['masters'],
        average_salary='$60k - $85k',
        growth_rate='5% CAGR',
        demand_index=2,
        min_experience=4,
    ),
    CareerDefinition(
        slug='hospitality-operations-manager',
        title='Hospitality Operations Manager',
        description='Optimize guest experiences, lead staff, and meet revenue targets for hotels or resorts.',
        required_skills=['customer experience', 'p&l management', 'team leadership', 'vendor coordination'],
        interests=['hospitality', 'travel', 'service'],
        education_levels=['associates', 'bachelors'],
        average_salary='$85k - $120k',
        growth_rate='10% CAGR',
        demand_index=4,
        min_experience=4,
    ),
    CareerDefinition(
        slug='retail-merchandising-director',
        title='Retail Merchandising Director',
        description='Create assortment strategies, negotiate with vendors, and drive category performance.',
        required_skills=['merchandising', 'forecasting', 'negotiation', 'visual storytelling'],
        interests=['retail', 'fashion', 'business'],
        education_levels=['bachelors'],
        average_salary='$110k - $150k',
        growth_rate='6% CAGR',
        demand_index=3,
        min_experience=6,
    ),
    CareerDefinition(
        slug='logistics-coordinator',
        title='Logistics Coordinator',
        description='Schedule shipments, track carriers, and resolve delivery exceptions.',
        required_skills=['planning', 'communication', 'negotiation', 'data entry'],
        interests=['operations', 'global trade', 'problem solving'],
        education_levels=['associates', 'bachelors'],
        average_salary='$55k - $80k',
        growth_rate='7% CAGR',
        demand_index=3,
        min_experience=2,
    ),
    CareerDefinition(
        slug='public-relations-specialist',
        title='Public Relations Specialist',
        description='Craft narratives, pitch media, and manage reputation for brands or leaders.',
        required_skills=['writing', 'media relations', 'crisis communication', 'storytelling'],
        interests=['communications', 'storytelling', 'relationships'],
        education_levels=['bachelors'],
        average_salary='$70k - $95k',
        growth_rate='8% CAGR',
        demand_index=4,
        min_experience=3,
    ),
    CareerDefinition(
        slug='event-producer',
        title='Event Producer',
        description='Design live experiences, manage vendors, and execute seamless events.',
        required_skills=['project management', 'vendor coordination', 'budgeting', 'creative direction'],
        interests=['events', 'storytelling', 'people'],
        education_levels=['associates', 'bachelors'],
        average_salary='$75k - $105k',
        growth_rate='9% CAGR',
        demand_index=4,
        min_experience=4,
    ),
    CareerDefinition(
        slug='community-development-officer',
        title='Community Development Officer',
        description='Partner with municipalities, secure funding, and revitalize neighborhoods.',
        required_skills=['stakeholder engagement', 'grant management', 'urban planning', 'communication'],
        interests=['civic service', 'planning', 'impact'],
        education_levels=['bachelors', 'masters'],
        average_salary='$80k - $115k',
        growth_rate='7% CAGR',
        demand_index=3,
        min_experience=4,
    ),
    CareerDefinition(
        slug='agriculture-extension-officer',
        title='Agriculture Extension Officer',
        description='Train farmers on modern practices, analyze soil data, and support sustainability.',
        required_skills=['agronomy', 'field training', 'data collection', 'reporting'],
        interests=['agriculture', 'education', 'outdoors'],
        education_levels=['bachelors'],
        average_salary='$60k - $85k',
        growth_rate='6% CAGR',
        demand_index=3,
        min_experience=3,
    ),
    CareerDefinition(
        slug='environmental-compliance-inspector',
        title='Environmental Compliance Inspector',
        description='Audit facilities, interpret regulations, and enforce environmental standards.',
        required_skills=['regulatory knowledge', 'inspection', 'report writing', 'communication'],
        interests=['environment', 'policy', 'field work'],
        education_levels=['bachelors'],
        average_salary='$70k - $95k',
        growth_rate='8% CAGR',
        demand_index=4,
        min_experience=3,
    ),
    CareerDefinition(
        slug='construction-project-manager',
        title='Construction Project Manager',
        description='Oversee site schedules, safety, and budgets from ground-breaking to delivery.',
        required_skills=['project scheduling', 'contract management', 'safety compliance', 'leadership'],
        interests=['building', 'operations', 'leadership'],
        education_levels=['bachelors'],
        average_salary='$105k - $150k',
        growth_rate='10% CAGR',
        demand_index=4,
        min_experience=5,
    ),
    CareerDefinition(
        slug='insurance-underwriter',
        title='Insurance Underwriter',
        description='Assess risk profiles, price policies, and collaborate with brokers.',
        required_skills=['risk analysis', 'excel', 'communication', 'decision making'],
        interests=['finance', 'risk management', 'analysis'],
        education_levels=['bachelors'],
        average_salary='$80k - $110k',
        growth_rate='5% CAGR',
        demand_index=3,
        min_experience=3,
    ),
    CareerDefinition(
        slug='financial-advisor',
        title='Financial Advisor',
        description='Guide clients through investment strategies, retirement plans, and wealth goals.',
        required_skills=['financial planning', 'communication', 'sales', 'compliance'],
        interests=['finance', 'people', 'strategy'],
        education_levels=['bachelors', 'certifications'],
        average_salary='$90k - $130k',
        growth_rate='11% CAGR',
        demand_index=4,
        min_experience=3,
    ),
    CareerDefinition(
        slug='aviation-operations-manager',
        title='Aviation Operations Manager',
        description='Coordinate crews, turnaround times, and safety protocols for airline operations.',
        required_skills=['operations planning', 'regulatory compliance', 'communication', 'crisis management'],
        interests=['aviation', 'operations', 'leadership'],
        education_levels=['bachelors'],
        average_salary='$110k - $150k',
        growth_rate='9% CAGR',
        demand_index=4,
        min_experience=5,
    ),
    CareerDefinition(
        slug='sports-marketing-manager',
        title='Sports Marketing Manager',
        description='Develop fan engagement campaigns, manage sponsorships, and track ticketing KPIs.',
        required_skills=['marketing strategy', 'partnerships', 'data storytelling', 'negotiation'],
        interests=['sports', 'marketing', 'events'],
        education_levels=['bachelors'],
        average_salary='$95k - $130k',
        growth_rate='10% CAGR',
        demand_index=4,
        min_experience=4,
    ),
    CareerDefinition(
        slug='culinary-innovation-chef',
        title='Culinary Innovation Chef',
        description='Prototype new menus, collaborate with suppliers, and ensure consistent execution.',
        required_skills=['menu design', 'food science', 'costing', 'team leadership'],
        interests=['culinary', 'creativity', 'leadership'],
        education_levels=['culinary diploma', 'associates'],
        average_salary='$85k - $115k',
        growth_rate='8% CAGR',
        demand_index=3,
        min_experience=5,
    ),
    CareerDefinition(
        slug='occupational-therapist',
        title='Occupational Therapist',
        description='Help clients regain independence through tailored therapeutic plans.',
        required_skills=['assessment', 'treatment planning', 'documentation', 'patient education'],
        interests=['healthcare', 'people', 'rehabilitation'],
        education_levels=['masters'],
        average_salary='$90k - $120k',
        growth_rate='13% CAGR',
        demand_index=5,
        min_experience=2,
    ),
]


def generate_recommendations(profile: UserProfile) -> List[Dict[str, object]]:
    scored = [_score_career(profile, career) for career in CAREER_LIBRARY]
    scored.sort(key=lambda item: item['matchScore'], reverse=True)
    return scored[:3]


def _score_career(profile: UserProfile, career: CareerDefinition) -> Dict[str, object]:
    normalized_skills = {skill.lower() for skill in profile.skills}
    normalized_interests = {interest.lower() for interest in profile.interests}
    matched_skills = sorted(
        {skill for skill in career.required_skills if skill.lower() in normalized_skills}
    )
    matched_interests = sorted(
        {interest for interest in career.interests if interest.lower() in normalized_interests}
    )

    skill_score = _safe_ratio(len(matched_skills), len(career.required_skills))
    interest_score = _safe_ratio(len(matched_interests), len(career.interests))
    education_score = _education_alignment(profile.education_level, career.education_levels)
    experience_score = _experience_alignment(profile.years_experience, career.min_experience)
    demand_score = career.demand_index / 5
    role_bonus = _role_alignment(profile.current_role, career.title)

    weighted_score = (
        (skill_score * 0.5)
        + (interest_score * 0.2)
        + (education_score * 0.1)
        + (experience_score * 0.1)
        + (demand_score * 0.1)
        + role_bonus
    )
    variance = (len(matched_skills) * 1.7) + (len(matched_interests) * 1.1)
    match_score = max(28, min(98, int((weighted_score * 100) + variance)))

    return {
        'id': career.slug,
        'title': career.title,
        'description': career.description,
        'requiredSkills': list(career.required_skills),
        'interests': list(career.interests),
        'educationLevel': list(career.education_levels),
        'averageSalary': career.average_salary,
        'growthRate': career.growth_rate,
        'matchScore': match_score,
        'matchedSkills': matched_skills,
        'matchedInterests': matched_interests,
    }


def _safe_ratio(numerator: int, denominator: int) -> float:
    if denominator == 0:
        return 0.0
    return numerator / denominator


def _education_alignment(user_level: str, accepted_levels: Sequence[str]) -> float:
    if not accepted_levels:
        return 1.0
    if not user_level:
        return 0.4
    return 1.0 if user_level in accepted_levels else 0.6


def _experience_alignment(user_years: str, required_years: int) -> float:
    user_value = EXPERIENCE_BUCKETS.get(user_years, 2)
    if required_years <= 0:
        return 1.0
    if user_value >= required_years:
        return 1.0
    gap = required_years - user_value
    return max(0.3, 1 - (gap / 10))


def _role_alignment(current_role: str | None, career_title: str) -> float:
    if not current_role:
        return 0.0
    current = current_role.lower()
    keywords = {career_title.lower(), *career_title.lower().split()}
    return 0.05 if any(keyword in current for keyword in keywords) else 0.0

