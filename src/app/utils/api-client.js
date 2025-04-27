import { getSession } from "next-auth/react";

export const createApiClient = () => {
  const apiClient = {
    async fetch(endpoint, options = {}) {
      try {
        const session = await getSession();
        const token = session?.accessToken;
        
        const headers = {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1',
          ...options.headers,
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`https://reqres.in/api${endpoint}`, {
          ...options,
          headers,
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          const error = new Error(data.error || 'API request failed');
          error.status = response.status;
          error.data = data;
          throw error;
        }
        
        return data;
      } catch (error) {
        console.error('API request error:', error);
        
        throw error;
      }
    },
    
    get(endpoint, options = {}) {
      return this.fetch(endpoint, { ...options, method: 'GET' });
    },
    
    post(endpoint, body, options = {}) {
      return this.fetch(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body),
      });
    },
    
    put(endpoint, body, options = {}) {
      return this.fetch(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(body),
      });
    },
    
    delete(endpoint, options = {}) {
      return this.fetch(endpoint, { ...options, method: 'DELETE' });
    },
  };
  
  return apiClient;
};

export const apiClient = createApiClient();