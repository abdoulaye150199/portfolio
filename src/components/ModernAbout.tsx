import React from 'react';
import { User, MapPin, Mail, Phone, Code, Database, Palette, Briefcase, Star, Trophy, Calendar } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { portfolioApi } from '../services/api';

const ModernAbout: React.FC = () => {
  const { data: profile, loading: profileLoading } = useApi(() => portfolioApi.getProfile());
  const { data: skills, loading: skillsLoading } = useApi(() => portfolioApi.getSkills());
  const { data: experience, loading: experienceLoading } = useApi(() => portfolioApi.getExperience());

  const skillCategories = {
    frontend: { label: 'Frontend', icon: Palette, gradient: 'from-primary-400 to-primary-500' },
    backend: { label: 'Backend', icon: Code, gradient: 'from-primary-600 to-primary-700' },
    database: { label: 'Base de données', icon: Database, gradient: 'from-primary-500 to-primary-600' },
  };

  if (profileLoading || skillsLoading || experienceLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </section>
    );
  }

  return (
    <section id="apropos" className="min-h-screen py-20 pt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            À propos de <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">moi</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez mon parcours, mes compétences et ma passion pour le développement
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bio & Contact */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-gray-300/30 dark:border-white/20 hover:border-primary-500/50 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Profil</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {profile?.bio}
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-gray-300/30 dark:border-white/20 hover:border-primary-400/50 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Contact</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-200/30 dark:bg-white/5 rounded-xl hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors duration-200">
                  <Mail className="w-5 h-5 text-primary-400 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">{profile?.email}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-200/30 dark:bg-white/5 rounded-xl hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors duration-200">
                  <Phone className="w-5 h-5 text-primary-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">{profile?.phone}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-200/30 dark:bg-white/5 rounded-xl hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors duration-200">
                  <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">{profile?.location}</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-gray-300/30 dark:border-white/20 hover:border-primary-600/50 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-primary-700 to-primary-800 rounded-xl mr-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Expérience</h3>
              </div>
              <div className="space-y-6">
                {experience?.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    {index !== experience.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-primary-500 to-transparent"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 bg-gray-200/30 dark:bg-white/5 rounded-xl p-4 hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors duration-200">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{exp.position}</h4>
                        <p className="text-primary-500 dark:text-primary-400 font-medium mb-1">{exp.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exp.period}</p>
                        <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-gray-300/30 dark:border-white/20 hover:border-primary-500/50 transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl mr-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Compétences</h3>
            </div>
            
            {Object.entries(skillCategories).map(([category, config]) => {
              const categorySkills = skills?.filter(skill => skill.category === category) || [];
              
              if (categorySkills.length === 0) return null;

              const Icon = config.icon;

              return (
                <div key={category} className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className={`p-2 bg-gradient-to-r ${config.gradient} rounded-lg mr-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{config.label}</h4>
                  </div>
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="group">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">{skill.name}</span>
                          <span className="text-primary-500 dark:text-primary-400 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-300/50 dark:bg-white/20 rounded-full h-3 overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${config.gradient} h-3 rounded-full transition-all duration-1000 ease-out transform origin-left hover:scale-y-110`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gray-200/30 dark:bg-white/5 rounded-xl p-4 text-center hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors duration-200">
                <Trophy className="w-8 h-8 text-primary-500 dark:text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{skills?.length}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Compétences</div>
              </div>
              <div className="bg-gray-200/30 dark:bg-white/5 rounded-xl p-4 text-center hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors duration-200">
                <Briefcase className="w-8 h-8 text-primary-600 dark:text-primary-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{experience?.length}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Expériences</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAbout;
