import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { InputSwitch } from "primereact/inputswitch";

import { InputTextarea } from "primereact/inputtextarea";

import DynamicIcon from "@/components/dynamic-icons";

type VendorFormInputs = {
  name: string;
  email: string;
  phone: string;
  services: { value: string }[];
  videoLinks: { value: string }[]; // ✅ Add this
  description: string;
  images: FileList;
  location: string;
  price: string;
  rating: number;
  featured: boolean;
};

export default function AddVendor() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VendorFormInputs>({
    defaultValues: {
      services: [{ value: "" }],
      featured: false,
    },
  });

  const {
    fields: serviceFields,
    append: serviceAppend,
    remove: serviceRemove,
  } = useFieldArray({
    control,
    name: "services",
  });

  const {
    fields: videoLinkFields,
    append: videoLinkAppend,
    remove: videoLinkRemove,
  } = useFieldArray({
    control,
    name: "videoLinks",
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onSubmit = (data: VendorFormInputs) => {
    const images = data.images ? Array.from(data.images) : [];
    console.log("Form Data:", data);
    
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setValue("images", files);
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(previews);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-4">
      <h2 className="text-3xl font-bold mb-6">Add Vendor Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <section className="p-4">
          <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Vendor Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full border p-2 rounded"
                placeholder="Vendor name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full border p-2 rounded"
                placeholder="Vendor email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="w-full border p-2 rounded"
                placeholder="10-digit phone number"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Service + Price + Rating */}
        <section className="p-4">
          <h3 className="text-xl font-semibold mb-4">Services & Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Price</label>
              <select
                {...register("price", { required: "Price is required" })}
                className="w-full border p-2 rounded bg-white"
              >
                <option value="">Select price category</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Rating</label>
              <select
                {...register("rating", { required: "Rating is required" })}
                className="w-full border p-2 rounded bg-white"
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.rating && (
                <p className="text-red-500">{errors.rating.message}</p>
              )}
            </div>

            <div className="flex items-center gap-4 pt-6">
              <label className="font-medium">Featured</label>
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <InputSwitch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.value)}
                  />
                )}
              />
            </div>
          </div>
        </section>

        {/* Description */}
        <div className="px-4">
          <label className="block font-medium mb-1">Description</label>
          <InputTextarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="w-full border rounded"
            placeholder="Short vendor description"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="flex flex-row  gap-32 p-4" >
          {" "}
          {/* Services Offered */}
          <div className="w-full">
            <label className="block font-medium mb-1">Services Offered</label>
            {serviceFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mb-2">
                <input
                  {...register(`services.${index}.value` as const, {
                    required: "Service name required",
                  })}
                  className="w-full border p-2 rounded"
                  placeholder={`Service #${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => serviceRemove(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <DynamicIcon name="trash" size="1x" color="orange" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => serviceAppend({ value: "" })}
              className="flex items-center text-blue-600 mt-2 hover:underline"
            >
              <DynamicIcon name="plus" size="1x" color="orange" /> Add Another
              Service
            </button>
          </div>{" "}

          {/* Video Links */}
          <div className="w-full">
            <label className="block font-medium mb-1">Video Links</label>
            {videoLinkFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mb-2 ">
                <input
                  {...register(`videoLinks.${index}.value` as const, {
                    required: "Video link is required",
                  })}
                  className=" w-full  border p-2 rounded"
                  placeholder={`Video Link #${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => videoLinkRemove(index)}
                  className="text-red-600 hover:text-red-800"
                >
               <DynamicIcon name="trash" size="1x" color="orange" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => videoLinkAppend({ value: "" })}
              className="flex items-center text-blue-600 mt-2 hover:underline"
            >
               <DynamicIcon name="plus" size="1x" color="orange"  /> Add Another Video Link
            </button>
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium mb-1">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover border rounded"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Vendor
          </button>
        </div>
      </form>
    </div>
  );
}
