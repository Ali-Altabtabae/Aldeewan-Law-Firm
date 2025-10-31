const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export interface LoginResponse {
  token: string;
  message: string;
}

export async function loginAdmin(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Login failed");
    }

    const data = (await res.json()) as LoginResponse;
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
