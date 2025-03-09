import React, { useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { supabase } from '@/lib/supabaseClient'; // Adjust the import path as necessary

export default function DJRegistrationForm() {
  const [formData, setFormData] = useState<{ 
    fullName: string; 
    stageName: string; 
    profilePicture: File | null; 
    email: string; 
    phoneNumber: string; 
    location: { country: string; state: string; city: string }; 
    experienceYears: string; 
    genres: string[]; 
    bio: string; 
    djSoftware: string; 
    demoLinks: string; 
    pastEvents: string; 
    pricing: string; 
    travelPreference: string; 
    socialMediaLinks: string; 
    personalWebsite: string; 
  }>({
    fullName: "",
    stageName: "",
    profilePicture: null,
    email: "",
    phoneNumber: "",
    location: { country: "", state: "", city: "" },
    experienceYears: "",
    genres: [],
    bio: "",
    djSoftware: "",
    demoLinks: "",
    pastEvents: "",
    pricing: "",
    travelPreference: "",
    socialMediaLinks: "",
    personalWebsite: "",
  });

  const genresOptions = [
    "EDM",
    "Hip-Hop",
    "House",
    "Techno",
    "Pop",
    "Rock",
    "Other",
  ];

  const travelPreferences = [
    "Local only",
    "National",
    "International",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('dj_registrations')
      .insert([formData]);

    if (error) {
      console.error("Error inserting data:", error);
      alert("There was an error submitting your registration. Please try again.");
    } else {
      console.log("Data inserted successfully:", data);
      alert("DJ Registration Submitted Successfully!");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">DJ Registration Form</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Stage Name */}
        <div>
          <label htmlFor="stageName" className="block text-sm font-medium text-gray-700">
            Stage Name (Optional)
          </label>
          <input
            type="text"
            id="stageName"
            name="stageName"
            value={formData.stageName}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
            Upload Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Other form fields */}
      </form>
    </main>
  );
}