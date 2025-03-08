"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleGenresChange = (genre: string) => {
    setFormData((prevState) => {
      const genres = prevState.genres.includes(genre)
        ? prevState.genres.filter((g) => g !== genre)
        : [...prevState.genres, genre];
      return { ...prevState, genres };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    }
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Step 1: Upload Profile Picture to Supabase Storage
    let profilePictureUrl = null;
  
    if (formData.profilePicture) {
      const fileName = `${formData.fullName}-${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("dj-profile-pictures") // The bucket name
        .upload(fileName, formData.profilePicture);
  
      if (uploadError) {
        console.error("Error uploading profile picture:", uploadError);
        alert("Failed to upload profile picture. Please try again.");
        return;
      }
  
      // Construct the public URL for the uploaded file
      profilePictureUrl = `https://jacecfkyvowsylckxojv.supabase.co/storage/v1/object/public/dj-profile-pictures/${uploadData.path}`;
    }
  
    // Step 2: Insert the Form Data into the Database
    const { data, error } = await supabase.from("djs").insert([
      {
        full_name: formData.fullName,
        stage_name: formData.stageName,
        profile_picture_url: profilePictureUrl,
        email: formData.email,
        phone_number: formData.phoneNumber,
        country: formData.location.country,
        state: formData.location.state,
        city: formData.location.city,
        experience_years: parseInt(formData.experienceYears),
        primary_genres: formData.genres,
        bio: formData.bio,
        dj_software: formData.djSoftware,
        demo_links: formData.demoLinks,
        past_events: formData.pastEvents,
        pricing_structure: formData.pricing,
        travel_preference: formData.travelPreference,
        social_links: formData.socialMediaLinks,
        website: formData.personalWebsite,
      },
    ]);
  
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
            required
          />
        </div>
        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.location.country}
              onChange={handleLocationChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.location.state}
              onChange={handleLocationChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.location.city}
              onChange={handleLocationChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Years of Experience */}
        <div>
          <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">
            Years of Experience
          </label>
          <input
            type="number"
            id="experienceYears"
            name="experienceYears"
            value={formData.experienceYears}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Music Genres */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Primary Music Genres</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {genresOptions.map((genre) => (
              <label key={genre} className="flex items-center">
                <input
                  type="checkbox"
                  value={genre}
                  checked={formData.genres.includes(genre)}
                  onChange={() => handleGenresChange(genre)}
                  className="mr-2"
                />
                {genre}
              </label>
            ))}
          </div>
        </div>

        {/* Short Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Short Bio or Artist Statement
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Registration
        </button>
      </form>
    </main>
  );
}
