"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Dropzone, { useDropzone } from "react-dropzone";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormInput from "@/components/shared/form/formInput";
import { ImageFormSchema, ImageFormSchemaType } from "@/lib/schema/imageForm";
import GrowingTextArea from "@/components/shared/form/descriptionTextArea";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AddImageToCloudinaryAction } from "@/lib/images/actions";

import { useActionError } from "@/hooks/action-error-handler";
import { toast } from "sonner";
import { server_GetDescription } from "@/lib/gemini/action";
import { cn } from "@/lib/utils";

export default function UploadForm() {
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const form = useForm<ImageFormSchemaType>({
    resolver: zodResolver(ImageFormSchema),
    defaultValues: {
      description: "",
      name: "",
      tags: [],
      image: undefined,
    },
  });

  const { handleErrorResponse } = useActionError();

  const {
    setFocus,
    formState: { errors },
  } = form;

  const watchImage = form.watch("image");

  const ImageUrl = useMemo(() => {
    if (!watchImage) return null;
    return URL.createObjectURL(watchImage);
  }, [watchImage]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.keys(errors)[0] as keyof typeof errors;
      setFocus(firstError as any);
    }
  }, [errors, setFocus]);

  async function onSubmit(values: ImageFormSchemaType) {
    try {
      const formData = new FormData();

      const LoaderToastId = toast.loading("Adding The Image");
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("tags", JSON.stringify(values.tags));
      formData.append("description", values.description);
      const res = await AddImageToCloudinaryAction(formData);

      toast.dismiss(LoaderToastId);
      if (!res.success) {
        handleErrorResponse(res.code);
      } else {
        toast.success("Successfully Created The Image");
        form.reset();
      }
    } catch {
      toast.error("Something Went Wrong", { description: "Try Again Later" });
    }
  }

  const GenerateDescription = async () => {
    try {
      setIsGeneratingDescription(true);
      const image = form.getValues("image");
      const formData = new FormData();
      formData.append("image", image);

      const description = await server_GetDescription(formData);
      form.setValue("description", description);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8  grid grid-cols-1 md:grid-cols-2 py-3 w-full"
        >
          <div className="max-w-[290px] max-h-[60vh] ">
            <FormField
              control={form.control}
              name={"image"}
              render={({ field }) => (
                <FormItem className=" h-full">
                  <FormLabel>Upload Image</FormLabel>

                  <FormControl className="h-full">
                    <Dropzone
                      accept={{ "image/*": [".png", ".jpeg", ".jpg", ".webp"] }}
                      onDropAccepted={(files) => {
                        const file = files[0];
                        field.onChange(file);
                      }}
                      onDropRejected={() => {
                        alert("Please upload a valid image file");
                      }}
                    >
                      {({
                        getRootProps,
                        getInputProps,
                        isDragActive,
                        isDragAccept,
                      }) => (
                        <section
                          className={"h-full flex gap-2 flex-col text-center "}
                        >
                          {ImageUrl ? (
                            <Image
                              alt="uploaded Image"
                              width={100}
                              height={100}
                              src={ImageUrl}
                              className=" aspect-auto w-full flex-1 max-h-full object-cover  "
                            />
                          ) : null}

                          <div
                            {...getRootProps({
                              className: cn(
                                " w-full h-full cursor-pointer bg-gray-100 p-4 border flex justify-center border-4 border-gray-300  border-dotted items-center ",
                                watchImage ? "h-[100px]" : null,
                                isDragActive ? "border-green-400" : null,
                                !isDragAccept && isDragActive
                                  ? "border-red-400"
                                  : null
                              ),
                            })}
                          >
                            <Input {...getInputProps()} />

                            {isDragActive && isDragAccept ? (
                              <p>Drop your files here to upload</p>
                            ) : null}

                            {!isDragActive ? (
                              <p>
                                Drag and drop your files here, or click to
                                select files
                              </p>
                            ) : null}

                            {!isDragAccept && isDragActive ? (
                              <p>Unsupported file type.</p>
                            ) : null}
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-1 flex flex-col gap-3 ">
            <FormInput
              comment="Enter the Title of the image"
              label="Title"
              control={form.control}
              name="name"
            >
              {(field) => <Input type="string" {...field} />}
            </FormInput>

            <FormInput
              comment="Upload an Image to generate description through ai"
              label="Description"
              control={form.control}
              name="description"
            >
              {({ ref, ...field }) => (
                <GrowingTextArea maxHeight={150} maxLength={300} {...field} />
              )}
            </FormInput>

            {watchImage ? (
              <Button
                type="button"
                onClick={GenerateDescription}
                variant={"outline"}
              >
                {isGeneratingDescription
                  ? "Generating..."
                  : "Generate Description"}
              </Button>
            ) : null}

            <FormInput
              comment="Tags Help To Identify the image"
              label="Tags (comma separated)"
              control={form.control}
              name="tags"
            >
              {(field) => (
                <Input
                  type="string"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    if (value === "") return;
                    const tagsArray = value.split(",").map((tag) => tag.trim());
                    field.onChange(tagsArray);
                  }}
                />
              )}
            </FormInput>

            <Button type="submit">
              {form.formState.isSubmitting ? "Adding...." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
