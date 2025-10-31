import { Video } from "@/types/Video";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

/* ───────────────────────────────
   1. Get all videos
──────────────────────────────── */
export async function getVideos(): Promise<Video[]> {
  const res = await fetch(`${API_BASE_URL}/api/videos`);
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
}

/* ───────────────────────────────
   2. Get single video by ID
──────────────────────────────── */
export async function getVideoById(id: string): Promise<Video> {
  const res = await fetch(`${API_BASE_URL}/api/videos/${id}`);
  if (!res.ok) throw new Error("Failed to fetch video details");
  return res.json();
}

/* ───────────────────────────────
   3. Add new video (Admin only)
──────────────────────────────── */
export async function addVideo(
  video: Partial<Video>,
  token: string
): Promise<Video> {
  const res = await fetch(`${API_BASE_URL}/api/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(video),
  });
  if (!res.ok) throw new Error("Failed to add video");
  return res.json();
}

/* ───────────────────────────────
   4. Update video (Admin only)
──────────────────────────────── */
export async function updateVideo(
  id: string,
  video: Partial<Video>,
  token: string
): Promise<Video> {
  const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
    method: "PATCH", // ✅ matches backend
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(video),
  });
  if (!res.ok) throw new Error("Failed to update video");
  return res.json();
}

/* ───────────────────────────────
   5. Delete video (Admin only)
──────────────────────────────── */
export async function deleteVideo(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete video");
}
