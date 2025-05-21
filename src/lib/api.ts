import axios from './config';
import { LoginResponse, User } from '../types';

export async function getCsrfToken(): Promise<void> {
  await axios.get('/sanctum/csrf-cookie');
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  await getCsrfToken();
  const response = await axios.post('/login', { username, password });
  
  // Store token if using JWT
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data;
}

export async function logout(): Promise<void> {
  await axios.post('/logout');
  localStorage.removeItem('authToken');
}

export async function fetchUser(): Promise<User> {
  const response = await axios.get('/user');
  return response.data;
}

export async function getUsers(): Promise<User[]> {
  const response = await axios.get('/users');
  return response.data;
}

// Add other API endpoints as needed
export async function getBooks() {
  const response = await axios.get('/books');
  return response.data;
}