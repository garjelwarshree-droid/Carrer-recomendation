import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { useAuth } from '../contexts/AuthContext';
import type { CareerRecommendation } from '../types';
import { 
  Loader2, 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  Target,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { apiRequest } from '../lib/api';

interface RecommendationsListProps {
  onEditProfile: () => void;
}

/**
 * RecommendationsList Component
 * Displays personalized career recommendations with match scores and details
 */
export function RecommendationsList({ onEditProfile }: RecommendationsListProps) {
  const { accessToken } = useAuth();
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Fetch career recommendations from backend
   */
  const loadRecommendations = useCallback(async () => {
    if (!accessToken) {
      setError('Please log in again.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await apiRequest<{ recommendations: CareerRecommendation[] }>(
        '/recommendations/',
        {
          token: accessToken,
        }
      );

      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Recommendations error:', error);
      setError(error instanceof Error ? error.message : 'Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);

  /**
   * Get color for match score
   */
  const getScoreColor = (score: number): string => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-orange-600';
  };

  /**
   * Get label for match score
   */
  const getScoreLabel = (score: number): string => {
    if (score >= 70) return 'Excellent Match';
    if (score >= 50) return 'Good Match';
    return 'Potential Match';
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-12"
      >
        <div className="text-center space-y-3">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Loader2 className="size-12 text-primary mx-auto" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Analyzing your profile and generating recommendations...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={loadRecommendations}>
              <RefreshCw className="size-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
          <CardContent className="py-12 text-center space-y-4">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="size-12 mx-auto text-muted-foreground" />
            </motion.div>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                No career recommendations found based on your current profile.
              </p>
              <p className="text-sm text-muted-foreground">
                Try updating your skills and interests to get better matches.
              </p>
            </div>
            <Button onClick={onEditProfile} className="transition-all duration-200 hover:scale-105">
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Enhanced Header with Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-3xl" />
        
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
                >
                  <Sparkles className="size-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Your Career Matches
                  </h1>
                  <p className="text-lg text-muted-foreground mt-1">
                    Personalized recommendations based on your profile
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-700">
                    {recommendations.length} Perfect {recommendations.length === 1 ? 'Match' : 'Matches'}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <TrendingUp className="size-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    High Growth Careers
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={onEditProfile}
              className="transition-all duration-200 hover:scale-105 active:scale-95 border-2 hover:border-primary hover:bg-primary/5"
            >
              <RefreshCw className="size-5 mr-2" />
              Update Profile
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Recommendations Grid - Larger Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {recommendations.map((career, index) => (
          <motion.div
            key={career.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
          >
            <Card className="h-full hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/90 border-0 overflow-hidden relative">
              {/* Gradient accent bar */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
              
              <CardHeader className="pb-4 relative space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-200 mb-2">
                      {career.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {career.description}
                    </CardDescription>
                  </div>
                  
                  {/* Large Match Score Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="flex-shrink-0"
                  >
                    <div className="relative">
                      <div className={`text-center px-5 py-4 rounded-2xl border-2 ${
                        career.matchScore >= 70 
                          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' 
                          : career.matchScore >= 50 
                          ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300'
                          : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-300'
                      }`}>
                        <div className={`text-4xl ${getScoreColor(career.matchScore)}`}>
                          {career.matchScore}%
                        </div>
                        <div className="text-xs font-medium text-muted-foreground mt-1">
                          {getScoreLabel(career.matchScore)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Match Score Progress Bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                  style={{ originX: 0 }}
                >
                  <Progress value={career.matchScore} className="h-3 mt-2" />
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-5 relative">
                {/* Matched Skills */}
                {career.matchedSkills.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="space-y-3 p-4 rounded-xl bg-green-50/50 border border-green-100"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center size-8 rounded-lg bg-green-100">
                        <Target className="size-5 text-green-600" />
                      </div>
                      <span className="font-medium text-green-900">Your Matching Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {career.matchedSkills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.6 + skillIndex * 0.05 }}
                            whileHover={{ scale: 1.1, rotate: 2 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="px-3 py-1.5 text-sm bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 transition-all duration-200"
                            >
                              ✓ {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* Matched Interests */}
                {career.matchedInterests.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    className="space-y-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center size-8 rounded-lg bg-blue-100">
                        <Sparkles className="size-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-blue-900">Your Matching Interests</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {career.matchedInterests.map((interest, interestIndex) => (
                          <motion.div
                            key={interest}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.7 + interestIndex * 0.05 }}
                            whileHover={{ scale: 1.1, rotate: -2 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 transition-all duration-200"
                            >
                              ★ {interest}
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* Career Details Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                  className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-dashed"
                >
                  <div className="space-y-2 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <DollarSign className="size-5" />
                      <span className="font-medium">Salary Range</span>
                    </div>
                    <p className="text-base font-semibold text-blue-900">{career.averageSalary}</p>
                  </div>
                  <div className="space-y-2 p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <TrendingUp className="size-5" />
                      <span className="font-medium">Job Growth</span>
                    </div>
                    <p className="text-base font-semibold text-purple-900">{career.growthRate}</p>
                  </div>
                </motion.div>

                {/* Education Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                  className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
                >
                  <div className="flex items-center gap-2 text-sm text-indigo-700">
                    <GraduationCap className="size-5" />
                    <span className="font-medium">Education Requirements</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {career.educationLevel.map((level) => (
                      <Badge key={level} variant="outline" className="text-sm px-3 py-1 border-indigo-300 bg-white/50">
                        🎓 {level}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-center shadow-2xl"
      >
        <h3 className="text-2xl mb-2">Want More Personalized Recommendations?</h3>
        <p className="text-blue-50 mb-4">Update your profile to discover more career opportunities</p>
        <Button 
          size="lg" 
          variant="secondary"
          onClick={onEditProfile}
          className="transition-all duration-200 hover:scale-105 active:scale-95 bg-white text-purple-600 hover:bg-white/90"
        >
          <RefreshCw className="size-5 mr-2" />
          Refine My Results
        </Button>
      </motion.div>
    </motion.div>
  );
}