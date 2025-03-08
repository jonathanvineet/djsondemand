"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CompanyRegistrationForm() {
  const [formData, setFormData] = useState< {
    companyName: string;
    industry: string;
    contactName: string;
    email: string;
    phone: string;
    location: { city: string; country: string };
    description: string;
    services: string;
    eventTypes: string[];
    eventSize: string;
    budgetRange: string;
    communicationMethod: string;
    website: string;
    socialMedia: string;
    specialRequirements: string;
  }>({
    companyName: "",
    industry: "",
    contactName: "",
    email: "",
    phone: "",
    location: { city: "", country: "" },
    description: "",
    services: "",
    eventTypes: [],
    eventSize: "",
    budgetRange: "",
    communicationMethod: "",
    website: "",
    socialMedia: "",
    specialRequirements: "",
  });

  const eventTypeOptions = [
    "Weddings",
    "Corporate Events",
    "Nightclub Events",
    "Birthday Parties",
    "Festivals",
    "Other",
  ];

  const eventSizeOptions = [
    "Small (0-100 guests)",
    "Medium (100-500 guests)",
    "Large (500+ guests)",
  ];

  const communicationMethods = [
    "Email",
    "Phone Call",
    "WhatsApp",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventTypesChange = (eventType: string) => {
    setFormData((prevState) => {
      const eventTypes = prevState.eventTypes.includes(eventType)
        ? prevState.eventTypes.filter((e) => e !== eventType)
        : [...prevState.eventTypes, eventType];
      return { ...prevState, eventTypes };
    });
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { data, error } = await supabase.from("companies").insert([
    {
      company_name: formData.companyName,
      industry: formData.industry,
      contact_name: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      city: formData.location.city,
      country: formData.location.country,
      description: formData.description,
      services: formData.services,
      event_types: formData.eventTypes,
      event_size: formData.eventSize,
      budget_range: formData.budgetRange,
      communication_method: formData.communicationMethod,
      website: formData.website,
      social_media: formData.socialMedia,
      special_requirements: formData.specialRequirements,
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
    alert("There was an error submitting your registration. Please try again.");
  } else {
    console.log("Data inserted successfully:", data);
    alert("Company Registration Submitted Successfully!");
  }
};


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Company Registration Form</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Contact Name */}
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
            Full Name of Contact Person
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Company’s Email Address
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

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Company’s Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Location</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.location.city}
              onChange={handleLocationChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.location.country}
              onChange={handleLocationChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Short Description About Your Company
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Event Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Types of Events Your Company Manages</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {eventTypeOptions.map((eventType) => (
              <label key={eventType} className="flex items-center">
                <input
                  type="checkbox"
                  value={eventType}
                  checked={formData.eventTypes.includes(eventType)}
                  onChange={() => handleEventTypesChange(eventType)}
                  className="mr-2"
                />
                {eventType}
              </label>
            ))}
          </div>
        </div>

        {/* Event Size */}
        <div>
          <label htmlFor="eventSize" className="block text-sm font-medium text-gray-700">
            Typical Size of Your Events
          </label>
          <select
  id="eventSize"
  name="eventSize"
  value={formData.eventSize}
  onChange={handleChange}
  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
  required
>
  <option value="">Select Event Size</option>
  {eventSizeOptions.map((size) => (
    <option key={size} value={size}>
      {size}
    </option>
  ))}
</select>

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
