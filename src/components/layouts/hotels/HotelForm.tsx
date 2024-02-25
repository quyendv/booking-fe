'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Checkbox } from '~/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import UploadFile, { StorageResult } from '../form/UploadFile';
import { useState } from 'react';
import { useToast } from '~/components/ui/use-toast';
import Image from 'next/image';
import { Button } from '~/components/ui/button';
import { Loader2Icon, XCircleIcon } from 'lucide-react';
import { StorageApi } from '~/apis/storage.api';

interface HotelFormProps {
  title: string; // locale key
}

export default function HotelForm({ title }: HotelFormProps) {
  const [preview, setPreview] = useState<StorageResult | null>(null);
  const [previewIsDeleting, setPreviewIsDeleting] = useState<boolean>(false);

  const t = useTranslations();
  const { toast } = useToast();

  const gallerySchema = z.object({
    url: z.string().url({ message: t('HotelForm.error.galleryUrl') }),
    key: z.string().optional(),
  });

  const formSchema = z.object({
    email: z.string().email({ message: t('HotelForm.error.email') }),
    name: z.string().min(3, { message: t('HotelForm.error.name') }),
    description: z.string().min(10, { message: t('HotelForm.error.description') }),
    imageUrl: z.string().url({ message: t('HotelForm.error.imageUrl') }),
    imageKey: z.string().optional(),
    country: z.string().min(1, { message: t('HotelForm.error.country') }),
    province: z.string().min(1, { message: t('HotelForm.error.province') }),
    address: z.string().min(1, { message: t('HotelForm.error.address') }),
    district: z.string().optional(),
    ward: z.string().optional(),
    gallery: z.array(gallerySchema).optional(),
    gym: z.boolean().optional(),
    bar: z.boolean().optional(),
    restaurant: z.boolean().optional(),
    freeParking: z.boolean().optional(),
    movieNight: z.boolean().optional(),
    coffeeShop: z.boolean().optional(),
    spa: z.boolean().optional(),
    laundry: z.boolean().optional(),
    shopping: z.boolean().optional(),
    bikeRental: z.boolean().optional(),
    swimmingPool: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      description: '',
      imageUrl: '',
      imageKey: '',
      country: '',
      province: '',
      address: '',
      district: '',
      ward: '',
      gallery: [],
      gym: false,
      bar: false,
      restaurant: false,
      freeParking: false,
      movieNight: false,
      coffeeShop: false,
      spa: false,
      laundry: false,
      shopping: false,
      bikeRental: false,
      swimmingPool: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  async function handleDeleteImage() {
    setPreviewIsDeleting(true);
    const { isSuccess } = await StorageApi.deleteFile(preview!.key);
    setPreviewIsDeleting(false);
    if (isSuccess) {
      setPreview(null);
      toast({ variant: 'success', description: t('HotelForm.toast.removeSuccess') });
    } else {
      toast({ variant: 'destructive', description: t('HotelForm.toast.removeFailure') });
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t(title)}</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-1 flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('HotelForm.label.name')}</FormLabel>
                    <FormDescription>{t('HotelForm.desc.name')}</FormDescription>
                    <FormControl>
                      <Input placeholder={t('HotelForm.placeholder.name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('HotelForm.label.description')}</FormLabel>
                    <FormDescription>{t('HotelForm.desc.description')}</FormDescription>
                    <FormControl>
                      <Textarea placeholder={t('HotelForm.placeholder.description')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>{t('HotelForm.label.amenities')}</FormLabel>
                <FormDescription>{t('HotelForm.desc.amenities')}</FormDescription>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gym"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.gym')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bar"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.bar')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="restaurant"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.restaurant')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="freeParking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.freeParking')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="movieNight"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.movieNight')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coffeeShop"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.coffeeShop')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="spa"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.spa')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="laundry"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.laundry')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shopping"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.shopping')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bikeRental"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.bikeRental')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="swimmingPool"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>{t('HotelForm.label.swimmingPool')}</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>{t('HotelForm.label.image')}</FormLabel>
                    <FormDescription>{t('HotelForm.desc.image')}</FormDescription>
                    <FormControl>
                      {preview ? (
                        <div className="relative mt-4 max-h-[400px] min-h-[400px] min-w-[200px] max-w-[400px]">
                          <Image fill src={preview.url} alt="Hotel image" className="object-contain" />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute -right-3 top-0"
                            onClick={handleDeleteImage}
                          >
                            {previewIsDeleting ? <Loader2Icon /> : <XCircleIcon />}
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-4 flex max-w-[400px] flex-col items-center rounded border-2 border-dashed border-primary/50 p-12">
                          <UploadFile
                            folder="hotels"
                            onUploadComplete={(res) => {
                              setPreview(res);
                              toast({ variant: 'success', description: t('HotelForm.toast.uploadSuccess') });
                            }}
                            onUploadError={() => {
                              toast({ variant: 'destructive', description: t('HotelForm.toast.uploadFailed') });
                            }}
                          />
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-1 flex-col gap-6">part 2</div>
          </div>
        </form>
      </Form>
    </div>
  );
}
