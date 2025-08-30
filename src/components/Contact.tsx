import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { portfolioApi } from '../services/api';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { data: profile, loading } = useApi(() => portfolioApi.getProfile());
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulation d'envoi (remplacer par vraie logique d'envoi)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !profile) {
    return (
      <section className="py-20 bg-dark-50">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-algae-800 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white dark:bg-dark-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6">
            Contactez-<span className="text-primary-600">moi</span>
          </h2>
          <p className="text-gray-800 dark:text-gray-300 text-xl max-w-3xl mx-auto">
            Vous avez un projet en tête ? Discutons-en ensemble
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Infos de contact */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-8 shadow-lg">
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center">
                  <div className="p-4 bg-primary-100 dark:bg-primary-900/50 rounded-xl mr-4">
                    <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Email</p>
                    <p className="text-black dark:text-white font-medium">{profile.email}</p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-center">
                  <div className="p-4 bg-primary-100 dark:bg-primary-900/50 rounded-xl mr-4">
                    <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Téléphone</p>
                    <p className="text-black dark:text-white font-medium">{profile.phone}</p>
                  </div>
                </div>

                {/* Localisation */}
                <div className="flex items-center">
                  <div className="p-4 bg-primary-100 dark:bg-primary-900/50 rounded-xl mr-4">
                    <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Localisation</p>
                    <p className="text-black dark:text-white font-medium">{profile.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section collaboration */}
            <div className="bg-primary-600 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Prêt à collaborer ?</h3>
              <p className="text-white/90">
                Je suis toujours ouvert aux nouvelles opportunités et aux projets passionnants. 
                N'hésitez pas à me contacter pour discuter de votre prochain projet.
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-6">
              Envoyez-moi un message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl text-black dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl text-black dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl text-black dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-xl text-black dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl disabled:opacity-50 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;