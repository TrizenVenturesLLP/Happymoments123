import React, { useState } from "react";
import PhotoGallery from "@/components/ui/photo-gallery";
import DynamicIcon from "@/components/dynamic-icons";
import Vendor, { PricingCategory } from "@/models/vendor";
import Header from "@/components/layout/Header";
import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Button } from "primereact/button";
import Radio from "@/components/ui/tabview";

export default function Details() {
  const vendor: Vendor = {
    id: 1,
    name: "ABHILASH",
    category: ["SFX", "Lighting", "Fireworks"],
    location: "Hyderabad, Telangana",
    rating: 4,
    reviews: 0,
    image: "",
    featured: false,
    price: PricingCategory.basic,
    description: `Abhilash and his team are experts in providing event lighting
              solutions in Telangana, ideal for weddings, parties, and corporate
              events. Their professional approach guarantees top-quality service,
              customized to create the perfect ambiance for every occasion.`
  };
  const phoneNumber = "+917330732710"; // Replace with the actual phone number
  const message = "Hello, I am interested in your services!"; // Custom message

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  const [selectedTab, setSelectedState] = useState(0);

  return (
    <div className="bg-black p-4 sm:p-6 md:p-8">
    <Header />
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/fireworks.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  
      <div className="relative z-10 text-white w-full px-4 sm:px-8 pt-24 md:pt-32">
        {/* Vendor Header */}
        <div className="text-2xl sm:text-3xl md:text-3xl font-mono font-bold tracking-wide mb-6 md:pl-44 text-center md:text-left">
          <p className="italic inline-block">CHIEF</p> - {vendor.name}
        </div>
  
        {/* Vendor Card */}
        <div className="w-full max-w-5xl mx-auto bg-gradient-to-b from-blue-400 to-purple-400 rounded-3xl shadow-md px-4 sm:px-6 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Image */}
            <div className="flex-shrink-0">
              <img
                src="/images/vendor.jpeg"
                alt={vendor.name}
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-full border-2 shadow-xl"
              />
            </div>
  
            {/* Divider - only visible on large screens */}
            <div className="hidden md:block border-l-2 border-black/20 h-full mx-6"></div>
  
            {/* Info */}
            <div className="flex flex-col text-black w-full">
              <span className="text-lg sm:text-xl font-bold tracking-wide">
                Experts in
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {vendor.category.map((cat, index) => (
                  <span
                    key={index}
                    className="rounded-xl bg-blue-50 border-2 px-4 py-1 text-sm font-medium hover:bg-orange-400 hover:text-white transition"
                  >
                    {cat}
                  </span>
                ))}
              </div>
  
              <div className="mt-4 text-base sm:text-md">{vendor.location}</div>
  
              <div className="mt-2 flex items-center text-sm sm:text-base">
                <span className="mr-2 font-light">Price</span>
                <div className="px-4 py-1 bg-indigo-700 text-white rounded-md">
                  {vendor.price.toString()}
                </div>
              </div>
  
              <div className="mt-2 flex items-center">
                {Array.from({ length: vendor.rating }, (_, i) => (
                  <DynamicIcon key={i} name="star" size="1x" color="orange" />
                ))}
                {Array.from({ length: 5 - vendor.rating }, (_, i) => (
                  <DynamicIcon key={i} name="star" size="1x" color="white" />
                ))}
              </div>
  
              <Button
                label="Enquire now"
                className="bg-orange-400 text-white py-2 px-4 mt-4 rounded-md hover:bg-orange-500 transition w-fit"
                icon="pi pi-check"
                onClick={openWhatsApp}
              />
            </div>
          </div>
  
          {/* Description */}
          <div className="mt-6 text-center md:text-left">
            <p className="text-black font-light tracking-wide text-sm sm:text-base">
              
              {vendor.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  
    {/* Radio Component */}
    <div className="flex justify-center items-center mt-8">
      <Radio />
    </div>
  </div>
  
  );
}
