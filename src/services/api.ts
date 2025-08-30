import axios from 'axios';
import type { Profile, Skill, Project, Experience } from '../types/portfolio';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const portfolioApi = {
  // Profile
  getProfile: async (): Promise<Profile> => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => {
    const response = await api.get('/skills');
    return response.data;
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },

  getFeaturedProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects?featured=true');
    return response.data;
  },

  getProjectsByCategory: async (category: string): Promise<Project[]> => {
    const response = await api.get(`/projects?category=${category}`);
    return response.data;
  },

  // Experience
  getExperience: async (): Promise<Experience[]> => {
    const response = await api.get('/experience');
    return response.data;
  },
};