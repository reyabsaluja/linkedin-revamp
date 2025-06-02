"use client"

import { useState, FormEvent } from "react";

type Profile = {
  name: string;
  headline: string;
  about: string;
  experience: { title: string; company: string; years: string }[];
};

export default function Home() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setProfile(null);

    try {
      const res = await fetch("http://localhost:4000/api/revamp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: linkedinUrl }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setProfile(data.original_profile);
      setMessage(data.message);
    } catch (err) {
      setMessage("❌ Error reaching backend");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">LinkedIn Revamp</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter LinkedIn URL"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Submit
          </button>
        </form>

        {message && <p className="mt-4 text-gray-700">{message}</p>}

        {profile && (
          <div className="mt-6 space-y-2">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Headline:</strong> {profile.headline}</p>
            <p><strong>About:</strong> {profile.about}</p>
            <p><strong>Experience:</strong></p>
            <ul className="list-disc pl-5">
              {profile.experience.map((job, idx) => (
                <li key={idx}>
                  {job.title} at {job.company} ({job.years})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
