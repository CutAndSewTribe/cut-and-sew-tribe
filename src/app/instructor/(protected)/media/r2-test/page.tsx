"use client";

import { useState } from "react";

interface UploadResponse {
  uploadUrl?: string;
  videoId?: string;
  key?: string;
  publicUrl?: string | null;
  expiresIn?: number;
  error?: string;
}

export default function R2TestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file) {
      setStatus("Please select a video first.");
      return;
    }

    setUploading(true);
    setPublicUrl(null);
    setStatus("Requesting secure upload URL...");

    try {
      const response = await fetch("/api/videos/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      const data = (await response.json()) as UploadResponse;

      if (!response.ok || !data.uploadUrl) {
        throw new Error(data.error ?? "Could not create upload URL.");
      }

      setStatus("Uploading video directly to Cloudflare R2...");

      const uploadResponse = await fetch(data.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error(
          `R2 upload failed with status ${uploadResponse.status}.`,
        );
      }

      setStatus("Upload successful.");

      setPublicUrl(data.publicUrl ?? null);
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">R2 Upload Test</h1>

      <p className="mt-3 text-gray-600">
        Temporary test page for verifying direct browser uploads to Cloudflare
        R2.
      </p>

      <div className="mt-8 rounded-xl border p-6">
        <label className="block text-sm font-medium">
          Select a small video
        </label>

        <input
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          className="mt-3 block w-full"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setStatus("");
            setPublicUrl(null);
          }}
        />

        {file && (
          <p className="mt-3 text-sm text-gray-600">
            Selected: {file.name} (
            {(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || uploading}
          className="mt-6 rounded-lg bg-[#661093] px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Test Video"}
        </button>

        {status && (
          <p className="mt-5 rounded-lg bg-gray-100 p-4 text-sm">
            {status}
          </p>
        )}

        {publicUrl && (
          <div className="mt-5 rounded-lg bg-green-50 p-4">
            <p className="font-medium text-green-800">
              Public R2 URL:
            </p>

            <a
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block break-all text-sm text-blue-700 underline"
            >
              {publicUrl}
            </a>

            <video
              className="mt-5 w-full rounded-lg"
              controls
              src={publicUrl}
            />
          </div>
        )}
      </div>
    </main>
  );
}

