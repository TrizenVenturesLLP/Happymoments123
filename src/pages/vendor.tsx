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
    <div className="min-h-screen  bg-black  p-8 ">
      <Header />
      <div className="relative min-h-screen w-full flex-col items-center justify-center">
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

        <div className="relative z-10 text-white px-8 pt-32 w-full">
          <div className="text-4xl font-mono font-bold tracking-wide mb-6 ml-44 flex ">
            <p className="italic font-mono">CHIEF</p> - {vendor.name}
          </div>
          <div className="w-[64rem] bg-gradient-to-b from-blue-400 to-purple-400 rounded-3xl  shadow-md shadow-orange-40  px-8 py-6   item-center justify-start mx-auto">
            <div className="flex flex-col  mr-8">
              <div className="flex justify-start">
                {/* image */}
                <div className="flex justify-center mb-2">
                  <img
                    src="/images/vendor.jpeg"
                    alt={vendor.name}
                    className="w-64 h-64 object-cover rounded-full border-2 border-  shadow-xl"
                  />
                </div>
                {/* divider */}
                <div className="border-l-2 border-black/20 h564 ml-16"></div>
                <div className="pl-16">
                  <span className="text-xl text-gray-800 font-bold tracking-wide">
                    Experts in
                  </span>

                  {/* Categories */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {vendor.category.map((cat, index) => (
                      <span
                        key={index}
                        className="rounded-xl bg-blue-50 border-2 px-5 py-2 text-black hover:text-white hover:bg-orange-400 text-sm font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Location */}
                  <div className="mt-4 flex items-center">
                    <span className="text-lg text-black tracking-wide">
                      {vendor.location}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="mt-2 flex items-center text-black">
                    <span className="mr-2 tracking-normal font-light">
                      Price
                    </span>
                    <div className="px-5 py-1 bg-indigo-700 text-white rounded-md">
                      {vendor.price.toString()}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="mt-2 flex items-center">
                    {Array.from({ length: vendor.rating }, (_, i) => (
                      <span key={i} className="text-xl">
                        <DynamicIcon name="star" size="1x" color="orange" />
                      </span>
                    ))}
                    {Array.from({ length: 5 - vendor.rating }, (_, i) => (
                      <span key={i} className="text-xl text-white">
                        <DynamicIcon name="star" size="1x" color={""} />
                      </span>
                    ))}
                  </div>

                  {/* Enquire Now Button */}
                  <Button
                    label="Enquire now"
                    className="bg-orange-400 text-white py-2 px-4 mt-4 rounded-md hover:bg-orange-500 transition"
                    icon="pi pi-check"
                    onClick={() => openWhatsApp()}
                  />
                </div>
              </div>
            
                <div className="relative  flex-col item-center justify-center   rounded-xl ">
                  <p className="relative z-10 px-6 text-black font-light tracking-wide mt-4 ">
                    Abhilash and his team are experts in providing event
                    lighting solutions in Telangana, ideal for weddings,
                    parties, and corporate events. Their professional approach
                    guarantees top-quality service, customized to create the
                    perfect ambiance for every occasion.
                  </p>
                </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center m-8" ><Radio/></div>

    
    </div>
  );
}
