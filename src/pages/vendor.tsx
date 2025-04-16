import React, { useEffect, useState } from "react";
import DynamicIcon from "@/components/dynamic-icons";
import Vendor, { PricingCategory } from "@/models/vendor";
import Header from "@/components/layout/Header";
import { Button } from "primereact/button";
import Radio from "@/components/ui/tabview";
import { useParams } from "react-router-dom";
import { getVendorDetails } from "../services/firestoreService.js";
import { Skeleton } from "primereact/skeleton";

export default function VendorDetails() {
  const { vendorId } = useParams();
  console.log("vendorId", vendorId);
  const [vendor, setVendor] = useState<Vendor>();
  const [isLoading, setIsLoading] = useState(true);
  const phoneNumber = "+917330732710";
  const message = "Hello, I am interested in your services!";

  useEffect(() => {
    setIsLoading(true);
    getVendorDetails(vendorId)
      .then((data) => {
        setVendor(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
        setIsLoading(false);
      });
  }, [vendorId]);

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-black p-4 sm:p-6 md:p-8">
      <Header />
      <div className="relative w-full flex flex-col items-center justify-center">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/fireworks.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 text-white w-full px-4 sm:px-8 pt-24 md:pt-32">
          <div className="text-2xl sm:text-3xl font-mono font-bold tracking-wide mb-6 md:pl-44 text-center md:text-left">
            <p className="italic inline-block">CHIEF</p> - {isLoading ? <Skeleton width="120px" /> : vendor?.name}
          </div>

          <div className="w-full max-w-5xl mx-auto bg-gradient-to-b from-blue-400 to-purple-400 rounded-3xl shadow-md px-4 sm:px-6 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                {isLoading ? (
                  <Skeleton shape="circle" height="256px" width="256px" />
                ) : (
                  <img
                    src="/images/vendor.jpeg"
                    alt={vendor?.name}
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-full border-2 shadow-xl"
                  />
                )}
              </div>

              <div className="hidden md:block border-l-2 border-black/20 h-full mx-6"></div>

              <div className="flex flex-col text-black w-full">
                <span className="text-lg sm:text-xl font-bold tracking-wide">
                  Experts in
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} width="80px" height="24px" />
                      ))
                    : vendor?.category.map((cat, index) => (
                        <span
                          key={index}
                          className="rounded-xl bg-blue-50 border-2 px-4 py-1 text-sm font-medium hover:bg-orange-400 hover:text-white transition"
                        >
                          {cat}
                        </span>
                      ))}
                </div>

                <div className="mt-4 text-base sm:text-md">
                  {isLoading ? <Skeleton width="180px" /> : vendor?.location}
                </div>

                <div className="mt-2 flex items-center text-sm sm:text-base">
                  <span className="mr-2 font-light">Price</span>
                  <div className="px-4 py-1 bg-indigo-700 text-white rounded-md">
                    {isLoading ? <Skeleton width="60px" /> : vendor?.price.toString()}
                  </div>
                </div>

                <div className="mt-2 flex items-center">
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} width="24px" height="24px" className="mr-1 rounded-full" />
                      ))
                    : <>
                        {Array.from({ length: vendor?.rating || 0 }, (_, i) => (
                          <DynamicIcon key={i} name="star" size="1x" color="orange" />
                        ))}
                        {Array.from({ length: 5 - (vendor?.rating || 0) }, (_, i) => (
                          <DynamicIcon key={i} name="star" size="1x" color="white" />
                        ))}
                      </>
                  }
                </div>

                <div className="mt-4">
                  {isLoading ? (
                    <Skeleton width="140px" height="38px" />
                  ) : (
                    <Button
                      label="Enquire now"
                      className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition w-fit"
                      icon="pi pi-check"
                      onClick={openWhatsApp}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center md:text-left">
              <p className="text-black font-light tracking-wide text-sm sm:text-base">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} width="100%" height="1.5rem" className="mb-2" />
                  ))
                ) : (
                  vendor?.description
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
{!isLoading?(<div className="flex justify-center items-center mt-8">
        <Radio videos={vendor.videos?vendor.videos:[]} />
      </div>):(<></>)}
      
    </div>
  );
}
