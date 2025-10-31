import { Lawyer } from "../types/Lawyer";

// ✅ Base URL from .env (fallback to 5001)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

/* ──────────────────────────────────────────────
   ── 1. Get All Lawyers
────────────────────────────────────────────── */
export async function getLawyers(): Promise<Lawyer[]> {
  const res = await fetch(`${API_BASE_URL}/api/lawyers`);
  if (!res.ok) throw new Error("Failed to fetch lawyers");
  return res.json() as Promise<Lawyer[]>;
}

/* ──────────────────────────────────────────────
   ── 2. Get One Lawyer by ID
────────────────────────────────────────────── */
export async function getLawyerById(id: string): Promise<Lawyer> {
  const res = await fetch(`${API_BASE_URL}/api/lawyers/${id}`);
  if (!res.ok) throw new Error("Failed to fetch lawyer details");
  return res.json() as Promise<Lawyer>;
}

/* ──────────────────────────────────────────────
   ── 3. Add New Lawyer  (Admin only)
────────────────────────────────────────────── */
export async function addLawyer(lawyer: Partial<Lawyer>, token: string): Promise<Lawyer> {
  const res = await fetch(`${API_BASE_URL}/api/lawyers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(lawyer),
  });
  if (!res.ok) throw new Error("Failed to add lawyer");
  return res.json() as Promise<Lawyer>;
}

/* ──────────────────────────────────────────────
   ── 4. Update Lawyer  (Admin only)
────────────────────────────────────────────── */
export async function updateLawyer(id: string, lawyer: Partial<Lawyer>, token: string): Promise<Lawyer> {
  const res = await fetch(`${API_BASE_URL}/api/lawyers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(lawyer),
  });
  if (!res.ok) throw new Error("Failed to update lawyer");
  return res.json() as Promise<Lawyer>;
}

/* ──────────────────────────────────────────────
   ── 5. Delete Lawyer  (Admin only)
────────────────────────────────────────────── */
export async function deleteLawyer(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/lawyers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete lawyer");
}
