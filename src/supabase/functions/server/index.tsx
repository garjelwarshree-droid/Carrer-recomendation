import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Career recommendation data
const CAREER_DATABASE = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems.',
    requiredSkills: ['programming', 'problem solving', 'algorithms', 'data structures', 'javascript', 'python', 'java', 'software development'],
    interests: ['technology', 'coding', 'innovation', 'problem solving'],
    educationLevel: ['bachelors', 'masters'],
    averageSalary: '$95,000 - $150,000',
    growthRate: 'High (22% growth)',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make better decisions.',
    requiredSkills: ['python', 'statistics', 'machine learning', 'data analysis', 'sql', 'r', 'data visualization'],
    interests: ['data', 'analytics', 'mathematics', 'research'],
    educationLevel: ['bachelors', 'masters', 'phd'],
    averageSalary: '$100,000 - $160,000',
    growthRate: 'Very High (36% growth)',
  },
  {
    id: 'ux-designer',
    title: 'UX/UI Designer',
    description: 'Create user-friendly interfaces and enhance user experience.',
    requiredSkills: ['design', 'figma', 'adobe', 'user research', 'prototyping', 'wireframing', 'creativity'],
    interests: ['design', 'creativity', 'user experience', 'visual arts'],
    educationLevel: ['bachelors', 'associates'],
    averageSalary: '$75,000 - $120,000',
    growthRate: 'High (16% growth)',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Manager',
    description: 'Develop and execute online marketing strategies to grow brands.',
    requiredSkills: ['marketing', 'seo', 'content creation', 'social media', 'analytics', 'communication'],
    interests: ['marketing', 'communication', 'creativity', 'business'],
    educationLevel: ['bachelors', 'associates'],
    averageSalary: '$65,000 - $110,000',
    growthRate: 'High (10% growth)',
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    description: 'Lead teams and manage projects from inception to completion.',
    requiredSkills: ['leadership', 'communication', 'organization', 'planning', 'agile', 'project management'],
    interests: ['leadership', 'organization', 'business', 'teamwork'],
    educationLevel: ['bachelors', 'masters'],
    averageSalary: '$80,000 - $130,000',
    growthRate: 'Moderate (7% growth)',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats and security breaches.',
    requiredSkills: ['security', 'networking', 'penetration testing', 'risk assessment', 'firewalls', 'encryption'],
    interests: ['security', 'technology', 'problem solving', 'investigation'],
    educationLevel: ['bachelors', 'masters'],
    averageSalary: '$85,000 - $140,000',
    growthRate: 'Very High (33% growth)',
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Guide product development strategy and roadmap for successful launches.',
    requiredSkills: ['product strategy', 'communication', 'analytics', 'leadership', 'market research'],
    interests: ['business', 'strategy', 'innovation', 'technology'],
    educationLevel: ['bachelors', 'masters', 'mba'],
    averageSalary: '$90,000 - $150,000',
    growthRate: 'High (14% growth)',
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    description: 'Create visual content for brands, marketing materials, and digital media.',
    requiredSkills: ['adobe', 'illustrator', 'photoshop', 'creativity', 'design', 'typography', 'branding'],
    interests: ['design', 'creativity', 'visual arts', 'communication'],
    educationLevel: ['bachelors', 'associates'],
    averageSalary: '$50,000 - $80,000',
    growthRate: 'Moderate (3% growth)',
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'Bridge the gap between IT and business to improve processes.',
    requiredSkills: ['analysis', 'communication', 'sql', 'excel', 'documentation', 'problem solving'],
    interests: ['business', 'analytics', 'problem solving', 'strategy'],
    educationLevel: ['bachelors', 'masters'],
    averageSalary: '$70,000 - $110,000',
    growthRate: 'Moderate (11% growth)',
  },
  {
    id: 'nurse',
    title: 'Registered Nurse',
    description: 'Provide patient care and support in healthcare settings.',
    requiredSkills: ['patient care', 'medical knowledge', 'communication', 'empathy', 'attention to detail'],
    interests: ['healthcare', 'helping others', 'medicine', 'caregiving'],
    educationLevel: ['associates', 'bachelors'],
    averageSalary: '$60,000 - $90,000',
    growthRate: 'High (9% growth)',
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    description: 'Analyze financial data and provide insights for investment decisions.',
    requiredSkills: ['finance', 'excel', 'modeling', 'forecasting', 'analysis', 'reporting'],
    interests: ['finance', 'economics', 'analytics', 'business'],
    educationLevel: ['bachelors', 'masters', 'mba'],
    averageSalary: '$70,000 - $115,000',
    growthRate: 'Moderate (6% growth)',
  },
  {
    id: 'content-writer',
    title: 'Content Writer',
    description: 'Create engaging written content for various platforms and audiences.',
    requiredSkills: ['writing', 'creativity', 'seo', 'research', 'editing', 'storytelling'],
    interests: ['writing', 'communication', 'creativity', 'marketing'],
    educationLevel: ['bachelors', 'associates'],
    averageSalary: '$45,000 - $75,000',
    growthRate: 'Moderate (8% growth)',
  },
  {
    id: 'hr-manager',
    title: 'Human Resources Manager',
    description: 'Oversee recruitment, employee relations, and organizational development.',
    requiredSkills: ['communication', 'leadership', 'conflict resolution', 'recruiting', 'training', 'employee relations'],
    interests: ['people management', 'organization', 'business', 'leadership'],
    educationLevel: ['bachelors', 'masters'],
    averageSalary: '$75,000 - $120,000',
    growthRate: 'Moderate (7% growth)',
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    description: 'Build and maintain websites using modern web technologies.',
    requiredSkills: ['html', 'css', 'javascript', 'react', 'responsive design', 'web development'],
    interests: ['technology', 'coding', 'web design', 'creativity'],
    educationLevel: ['bachelors', 'associates', 'high-school'],
    averageSalary: '$65,000 - $110,000',
    growthRate: 'High (13% growth)',
  },
  {
    id: 'sales-manager',
    title: 'Sales Manager',
    description: 'Lead sales teams and develop strategies to drive revenue growth.',
    requiredSkills: ['sales', 'leadership', 'communication', 'negotiation', 'crm', 'strategy'],
    interests: ['business', 'leadership', 'communication', 'strategy'],
    educationLevel: ['bachelors', 'associates'],
    averageSalary: '$70,000 - $130,000',
    growthRate: 'Moderate (5% growth)',
  },
  {
    id: 'teacher',
    title: 'High School Teacher',
    description: 'Educate and inspire students in various academic subjects.',
    requiredSkills: ['teaching', 'communication', 'patience', 'curriculum development', 'classroom management'],
    interests: ['education', 'helping others', 'communication', 'learning'],
    educationLevel: ['bachelors', 'masters'],
    averageSalary: '$50,000 - $75,000',
    growthRate: 'Low (4% growth)',
  },
  {
    id: 'accountant',
    title: 'Accountant',
    description: 'Manage financial records and ensure accuracy in financial reporting.',
    requiredSkills: ['accounting', 'excel', 'attention to detail', 'gaap', 'tax preparation', 'auditing'],
    interests: ['finance', 'mathematics', 'organization', 'business'],
    educationLevel: ['bachelors', 'masters'],
    averageSalary: '$55,000 - $90,000',
    growthRate: 'Moderate (6% growth)',
  },
  {
    id: 'physical-therapist',
    title: 'Physical Therapist',
    description: 'Help patients recover mobility and manage pain through therapeutic exercises.',
    requiredSkills: ['patient care', 'rehabilitation', 'anatomy', 'communication', 'empathy'],
    interests: ['healthcare', 'helping others', 'fitness', 'medicine'],
    educationLevel: ['masters', 'phd'],
    averageSalary: '$75,000 - $105,000',
    growthRate: 'High (18% growth)',
  },
  {
    id: 'civil-engineer',
    title: 'Civil Engineer',
    description: 'Design and oversee construction of infrastructure projects.',
    requiredSkills: ['engineering', 'cad', 'mathematics', 'project management', 'structural analysis'],
    interests: ['engineering', 'construction', 'mathematics', 'problem solving'],
    educationLevel: ['bachelors', 'masters'],
    averageSalary: '$75,000 - $115,000',
    growthRate: 'Moderate (8% growth)',
  },
  {
    id: 'social-media-manager',
    title: 'Social Media Manager',
    description: 'Develop and execute social media strategies to build brand presence.',
    requiredSkills: ['social media', 'content creation', 'analytics', 'creativity', 'communication', 'marketing'],
    interests: ['social media', 'marketing', 'creativity', 'communication'],
    educationLevel: ['bachelors', 'associates'],
    averageSalary: '$50,000 - $85,000',
    growthRate: 'High (10% growth)',
  },
  {
    id: 'mechanical-engineer',
    title: 'Mechanical Engineer',
    description: 'Design and develop mechanical systems and devices.',
    requiredSkills: ['engineering', 'cad', 'mechanics', 'thermodynamics', 'problem solving', 'mathematics'],
    interests: ['engineering', 'innovation', 'technology', 'mathematics'],
    educationLevel: ['bachelors', 'masters'],
    averageSalary: '$75,000 - $120,000',
    growthRate: 'Moderate (7% growth)',
  },
  {
    id: 'video-editor',
    title: 'Video Editor',
    description: 'Edit and produce video content for various media platforms.',
    requiredSkills: ['video editing', 'premiere pro', 'creativity', 'storytelling', 'after effects'],
    interests: ['video production', 'creativity', 'media', 'visual arts'],
    educationLevel: ['bachelors', 'associates', 'high-school'],
    averageSalary: '$45,000 - $80,000',
    growthRate: 'High (12% growth)',
  },
  {
    id: 'architect',
    title: 'Architect',
    description: 'Design buildings and structures that are functional and aesthetically pleasing.',
    requiredSkills: ['architecture', 'cad', 'design', 'creativity', 'building codes', '3d modeling'],
    interests: ['architecture', 'design', 'creativity', 'construction'],
    educationLevel: ['bachelors', 'masters'],
    averageSalary: '$70,000 - $115,000',
    growthRate: 'Low (3% growth)',
  },
  {
    id: 'pharmacist',
    title: 'Pharmacist',
    description: 'Dispense medications and provide healthcare advice to patients.',
    requiredSkills: ['pharmacy', 'medical knowledge', 'attention to detail', 'communication', 'patient care'],
    interests: ['healthcare', 'medicine', 'helping others', 'science'],
    educationLevel: ['phd'],
    averageSalary: '$110,000 - $140,000',
    growthRate: 'Low (2% growth)',
  },
  {
    id: 'ai-engineer',
    title: 'AI/Machine Learning Engineer',
    description: 'Develop artificial intelligence systems and machine learning models.',
    requiredSkills: ['machine learning', 'python', 'tensorflow', 'neural networks', 'algorithms', 'data science'],
    interests: ['artificial intelligence', 'technology', 'mathematics', 'innovation'],
    educationLevel: ['bachelors', 'masters', 'phd'],
    averageSalary: '$120,000 - $180,000',
    growthRate: 'Very High (40% growth)',
  },
  {
    id: 'chef',
    title: 'Executive Chef',
    description: 'Lead kitchen operations and create innovative culinary experiences.',
    requiredSkills: ['cooking', 'creativity', 'leadership', 'menu planning', 'food safety', 'culinary arts'],
    interests: ['cooking', 'creativity', 'food', 'leadership'],
    educationLevel: ['associates', 'high-school'],
    averageSalary: '$50,000 - $85,000',
    growthRate: 'Moderate (6% growth)',
  },
  {
    id: 'environmental-scientist',
    title: 'Environmental Scientist',
    description: 'Study the environment and develop solutions to environmental problems.',
    requiredSkills: ['research', 'data analysis', 'environmental science', 'fieldwork', 'report writing'],
    interests: ['environment', 'science', 'sustainability', 'research'],
    educationLevel: ['bachelors', 'masters', 'phd'],
    averageSalary: '$60,000 - $95,000',
    growthRate: 'Moderate (8% growth)',
  },
  {
    id: 'lawyer',
    title: 'Lawyer',
    description: 'Provide legal counsel and represent clients in legal matters.',
    requiredSkills: ['law', 'research', 'communication', 'critical thinking', 'negotiation', 'writing'],
    interests: ['law', 'justice', 'problem solving', 'advocacy'],
    educationLevel: ['phd'],
    averageSalary: '$90,000 - $160,000',
    growthRate: 'Moderate (6% growth)',
  },
  {
    id: 'psychologist',
    title: 'Clinical Psychologist',
    description: 'Assess and treat mental, emotional, and behavioral disorders.',
    requiredSkills: ['psychology', 'empathy', 'communication', 'assessment', 'counseling', 'research'],
    interests: ['psychology', 'helping others', 'mental health', 'research'],
    educationLevel: ['masters', 'phd'],
    averageSalary: '$75,000 - $110,000',
    growthRate: 'High (14% growth)',
  },
  {
    id: 'interior-designer',
    title: 'Interior Designer',
    description: 'Create functional and aesthetically pleasing interior spaces.',
    requiredSkills: ['design', 'creativity', 'cad', 'color theory', 'space planning', 'client relations'],
    interests: ['design', 'creativity', 'visual arts', 'architecture'],
    educationLevel: ['bachelors', 'associates'],
    averageSalary: '$50,000 - $85,000',
    growthRate: 'Low (4% growth)',
  },
];

/**
 * User Registration Endpoint
 * Creates a new user account with Supabase Auth
 */
app.post('/make-server-0c4b0f7b/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    // Validate input
    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: `Failed to create user: ${error.message}` }, 400);
    }

    return c.json({ 
      success: true, 
      user: { 
        id: data.user.id, 
        email: data.user.email,
        name: data.user.user_metadata.name 
      } 
    });
  } catch (error) {
    console.error('Signup exception:', error);
    return c.json({ error: `Signup failed: ${error.message}` }, 500);
  }
});

/**
 * Save User Profile Endpoint
 * Stores user profile data (skills, interests, education, experience)
 */
app.post('/make-server-0c4b0f7b/profile', async (c) => {
  try {
    // Verify user authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    const profileData = await c.req.json();

    // Validate required fields
    if (!profileData.skills || !profileData.interests || !profileData.educationLevel) {
      return c.json({ error: 'Skills, interests, and education level are required' }, 400);
    }

    // Store profile in KV store
    const key = `profile:${user.id}`;
    await kv.set(key, {
      ...profileData,
      userId: user.id,
      updatedAt: new Date().toISOString(),
    });

    return c.json({ success: true, message: 'Profile saved successfully' });
  } catch (error) {
    console.error('Profile save error:', error);
    return c.json({ error: `Failed to save profile: ${error.message}` }, 500);
  }
});

/**
 * Get User Profile Endpoint
 * Retrieves stored user profile data
 */
app.get('/make-server-0c4b0f7b/profile', async (c) => {
  try {
    // Verify user authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    // Retrieve profile from KV store
    const key = `profile:${user.id}`;
    const profile = await kv.get(key);

    if (!profile) {
      return c.json({ profile: null });
    }

    return c.json({ profile });
  } catch (error) {
    console.error('Profile retrieval error:', error);
    return c.json({ error: `Failed to retrieve profile: ${error.message}` }, 500);
  }
});

/**
 * Career Recommendations Endpoint
 * Generates personalized career recommendations based on user profile
 */
app.get('/make-server-0c4b0f7b/recommendations', async (c) => {
  try {
    // Verify user authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - invalid or missing access token' }, 401);
    }

    // Retrieve user profile
    const key = `profile:${user.id}`;
    const profile = await kv.get(key);

    if (!profile) {
      return c.json({ error: 'Profile not found. Please complete your profile first.' }, 404);
    }

    // Calculate match scores for each career
    const recommendations = CAREER_DATABASE.map((career) => {
      let score = 0;
      const matchedSkills: string[] = [];
      const matchedInterests: string[] = [];

      // Normalize user input to lowercase for matching
      const userSkills = profile.skills.map((s: string) => s.toLowerCase());
      const userInterests = profile.interests.map((i: string) => i.toLowerCase());
      const userEducation = profile.educationLevel.toLowerCase();

      // Score based on skills match (40% weight)
      career.requiredSkills.forEach((skill) => {
        if (userSkills.some((userSkill) => 
          userSkill.includes(skill) || skill.includes(userSkill)
        )) {
          score += 40 / career.requiredSkills.length;
          matchedSkills.push(skill);
        }
      });

      // Score based on interests match (30% weight)
      career.interests.forEach((interest) => {
        if (userInterests.some((userInterest) => 
          userInterest.includes(interest) || interest.includes(userInterest)
        )) {
          score += 30 / career.interests.length;
          matchedInterests.push(interest);
        }
      });

      // Score based on education level match (20% weight)
      if (career.educationLevel.includes(userEducation)) {
        score += 20;
      }

      // Score based on years of experience (10% weight)
      const yearsExperience = parseInt(profile.yearsExperience) || 0;
      if (yearsExperience >= 3) {
        score += 10;
      } else if (yearsExperience >= 1) {
        score += 5;
      }

      return {
        ...career,
        matchScore: Math.round(score),
        matchedSkills,
        matchedInterests,
      };
    });

    // Sort by match score (highest first) and return top recommendations
    const sortedRecommendations = recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .filter((rec) => rec.matchScore > 20); // Only return careers with >20% match

    return c.json({ recommendations: sortedRecommendations });
  } catch (error) {
    console.error('Recommendations error:', error);
    return c.json({ error: `Failed to generate recommendations: ${error.message}` }, 500);
  }
});

// Health check endpoint
app.get('/make-server-0c4b0f7b/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);