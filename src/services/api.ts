import axios from 'axios';
import type { Profile, Skill, Project, Experience } from '../types/portfolio';

// Import des données statiques pour la production
import portfolioData from '../../db.json';

const API_BASE_URL = 'http://localhost:3001';
const isProduction = import.meta.env.PROD;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const portfolioApi = {
  // Profile
  getProfile: async (): Promise<Profile> => {
    try {
      if (isProduction) {
        return portfolioData.profile as Profile;
      }
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      console.warn('API non disponible, utilisation des données statiques');
      return portfolioData.profile as Profile;
    }
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => {
    try {
      if (isProduction) {
        return portfolioData.skills as Skill[];
      }
      const response = await api.get('/skills');
      return response.data;
    } catch (error) {
      console.warn('API non disponible, utilisation des données statiques');
      return portfolioData.skills as Skill[];
    }
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    try {
      if (isProduction) {
        return portfolioData.projects as Project[];
      }
      const response = await api.get('/projects');
      return response.data;
    } catch (error) {
      console.warn('API non disponible, utilisation des données statiques');
      return portfolioData.projects as Project[];
    }
  },

  getFeaturedProjects: async (): Promise<Project[]> => {
    try {
      if (isProduction) {
        return portfolioData.projects.filter(project => project.featured) as Project[];
      }
      const response = await api.get('/projects?featured=true');
      return response.data;
    } catch (error) {
      console.warn('API non disponible, utilisation des données statiques');
      return portfolioData.projects.filter(project => project.featured) as Project[];
    }
  },

  getProjectsByCategory: async (category: string): Promise<Project[]> => {
    try {
      if (isProduction) {
        return portfolioData.projects.filter(project => project.category === category) as Project[];
      }
      const response = await api.get(`/projects?category=${category}`);
      return response.data;
    } catch (error) {
      console.warn('API non disponible, utilisation des données statiques');
      return portfolioData.projects.filter(project => project.category === category) as Project[];
    }
  },

  // Experience
  getExperience: async (): Promise<Experience[]> => {
    try {
      if (isProduction) {
        return portfolioData.experience as Experience[];
      }
      const response = await api.get('/experience');
      return response.data;
    } catch (error) {
      console.warn('API non disponible, utilisation des données statiques');
      return portfolioData.experience as Experience[];
    }
  },
};