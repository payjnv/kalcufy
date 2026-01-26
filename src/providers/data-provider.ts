import { DataProvider } from "@refinedev/core";

const API_URL = "/api/admin";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};
    
    const query = new URLSearchParams({
      _start: String((current - 1) * pageSize),
      _end: String(current * pageSize),
    });

    // Add filters
    filters?.forEach((filter) => {
      if ("field" in filter) {
        query.append(filter.field, String(filter.value));
      }
    });

    // Add sorting
    if (sorters && sorters.length > 0) {
      query.append("_sort", sorters[0].field);
      query.append("_order", sorters[0].order);
    }

    const response = await fetch(`${API_URL}/${resource}?${query}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${resource}`);
    }
    
    const data = await response.json();

    return {
      data: data.data || [],
      total: data.total || 0,
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${resource}/${id}`);
    }
    
    const data = await response.json();
    return { data };
  },

  create: async ({ resource, variables }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create ${resource}`);
    }
    
    const data = await response.json();
    return { data };
  },

  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update ${resource}/${id}`);
    }
    
    const data = await response.json();
    return { data };
  },

  deleteOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete ${resource}/${id}`);
    }
    
    const data = await response.json();
    return { data };
  },

  getApiUrl: () => API_URL,

  // Optional: Custom method for stats/dashboard
  custom: async ({ url, method = "GET", payload }) => {
    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: payload ? JSON.stringify(payload) : undefined,
    });
    
    if (!response.ok) {
      throw new Error(`Custom request failed: ${url}`);
    }
    
    const data = await response.json();
    return { data };
  },
};
