import { Journal } from "@/types/Journal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

/* ───────────────────────────────
   1. Get all journals
──────────────────────────────── */
export async function getJournals(): Promise<Journal[]> {
  const res = await fetch(`${API_BASE_URL}/api/journals`);
  if (!res.ok) throw new Error("Failed to fetch journals");
  return res.json();
}

/* ───────────────────────────────
   2. Get single journal by ID
──────────────────────────────── */
export async function getJournalById(id: string): Promise<Journal> {
  const res = await fetch(`${API_BASE_URL}/api/journals/${id}`);
  if (!res.ok) throw new Error("Failed to fetch journal details");
  return res.json();
}

/* ───────────────────────────────
   3. Add new journal  (Admin only)
──────────────────────────────── */
export async function addJournal(
  journal: Partial<Journal>,
  token: string
): Promise<Journal> {
  const res = await fetch(`${API_BASE_URL}/api/journals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(journal),
  });
  if (!res.ok) throw new Error("Failed to add journal");
  return res.json();
}

/* ───────────────────────────────
   4. Update journal  (Admin only)
──────────────────────────────── */
export async function updateJournal(
  id: string,
  journal: Partial<Journal>,
  token: string
): Promise<Journal> {
  const res = await fetch(`${API_BASE_URL}/api/journals/${id}`, {
    method: "PATCH", // ✅ matches backend
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(journal),
  });
  if (!res.ok) throw new Error("Failed to update journal");
  return res.json();
}

/* ───────────────────────────────
   5. Delete journal  (Admin only)
──────────────────────────────── */
export async function deleteJournal(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/journals/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete journal");
}
