import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '../contexts/AuthContext';
import type { UserProfile } from '../types';
import { Loader2, Plus, X, Briefcase, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { apiRequest } from '../lib/api';

interface ProfileFormProps {
  onProfileComplete: () => void;
}

/**
 * ProfileForm Component
 * Collects user profile information including skills, interests, education, and experience
 */
export function ProfileForm({ onProfileComplete }: ProfileFormProps) {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [currentRole, setCurrentRole] = useState('');

  /**
   * Fetch user's existing profile from backend
   */
  const loadProfile = useCallback(async () => {
    if (!accessToken) {
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest<{ profile: UserProfile }>('/profile/', {
        token: accessToken,
      });

      if (data?.profile) {
        const profile: UserProfile = data.profile;
        setSkills(profile.skills || []);
        setInterests(profile.interests || []);
        setEducationLevel(profile.educationLevel || '');
        setYearsExperience(profile.yearsExperience || '');
        setCurrentRole(profile.currentRole || '');
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  /**
   * Load existing profile on component mount
   */
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /**
   * Add a skill to the list
   */
  const addSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setSkillInput('');
    }
  };

  /**
   * Remove a skill from the list
   */
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  /**
   * Add an interest to the list
   */
  const addInterest = () => {
    const trimmedInterest = interestInput.trim();
    if (trimmedInterest && !interests.includes(trimmedInterest)) {
      setInterests([...interests, trimmedInterest]);
      setInterestInput('');
    }
  };

  /**
   * Remove an interest from the list
   */
  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  /**
   * Validate form before submission
   */
  const validateForm = (): boolean => {
    if (skills.length === 0) {
      setError('Please add at least one skill');
      return false;
    }
    if (interests.length === 0) {
      setError('Please add at least one interest');
      return false;
    }
    if (!educationLevel) {
      setError('Please select your education level');
      return false;
    }
    if (!yearsExperience) {
      setError('Please select your years of experience');
      return false;
    }
    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    if (!accessToken) {
      setError('Please log in again.');
      return;
    }

    setSaving(true);

    try {
      const profileData: UserProfile = {
        skills,
        interests,
        educationLevel,
        yearsExperience,
        currentRole,
      };

      await apiRequest('/profile/', {
        method: 'POST',
        token: accessToken,
        body: JSON.stringify(profileData),
      });

      setSuccess(true);
      setTimeout(() => {
        onProfileComplete();
      }, 1500);
    } catch (error) {
      console.error('Profile save error:', error);
      setError(error instanceof Error ? error.message : 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl backdrop-blur-sm bg-white/90 shadow-2xl border-0">
        <CardContent className="flex items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-7xl backdrop-blur-sm bg-white/90 shadow-2xl border-0 p-[3px] m-[3px]">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Briefcase className="size-5" />
              </motion.div>
              Complete Your Profile
            </CardTitle>
            <CardDescription>
              Tell us about your skills, interests, and experience to get personalized career recommendations
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <Label>Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., JavaScript, Project Management, Design"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  disabled={saving}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                <Button 
                  type="button" 
                  onClick={addSkill} 
                  variant="outline" 
                  disabled={saving}
                  className="transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="px-3 py-1 transition-all duration-200 hover:scale-105 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-destructive transition-colors duration-200"
                          disabled={saving}
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Interests Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <Label>Interests</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Technology, Healthcare, Marketing"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addInterest();
                    }
                  }}
                  disabled={saving}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                <Button 
                  type="button" 
                  onClick={addInterest} 
                  variant="outline" 
                  disabled={saving}
                  className="transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="px-3 py-1 transition-all duration-200 hover:scale-105 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800"
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="ml-2 hover:text-destructive transition-colors duration-200"
                          disabled={saving}
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Education Level */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="education">Education Level</Label>
              <Select value={educationLevel} onValueChange={setEducationLevel} disabled={saving}>
                <SelectTrigger id="education" className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="associates">Associate's Degree</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">Ph.D.</SelectItem>
                  <SelectItem value="mba">MBA</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Years of Experience */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="experience">Years of Experience</Label>
              <Select value={yearsExperience} onValueChange={setYearsExperience} disabled={saving}>
                <SelectTrigger id="experience" className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Entry Level (0 years)</SelectItem>
                  <SelectItem value="1">1-2 years</SelectItem>
                  <SelectItem value="3">3-5 years</SelectItem>
                  <SelectItem value="6">6-10 years</SelectItem>
                  <SelectItem value="11">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Current Role (Optional) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <Label htmlFor="currentRole">Current Role (Optional)</Label>
              <Input
                id="currentRole"
                placeholder="e.g., Software Developer, Student"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                disabled={saving}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Alert className="border-green-500 bg-green-50 text-green-800">
                    <CheckCircle className="size-4" />
                    <AlertDescription>Profile saved successfully! Loading recommendations...</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button 
                type="submit" 
                className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" 
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving Profile...
                  </>
                ) : (
                  'Save & Get Recommendations'
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}