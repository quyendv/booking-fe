'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, Loader2Icon, PencilLineIcon, Plus, Terminal, XCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { HotelApi, HotelSchema } from '~/apis/hotel.api';
import { StorageApi } from '~/apis/storage.api';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button, buttonVariants } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useToast } from '~/components/ui/use-toast';
import { routeConfig } from '~/configs/route.config';
import { ILink, useIRouter } from '~/locales/i18nNavigation';
import UploadFile from '../form/UploadFile';
import RoomForm from '../rooms/RoomForm';

interface HotelFormProps {
  hotel?: HotelSchema;
}

export default function HotelForm({ hotel }: HotelFormProps) {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useIRouter();

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
    defaultValues: hotel
      ? {
          ...hotel,
          ...(hotel.address && {
            address: hotel.address.details,
            country: hotel.address.country,
            province: hotel.address.province,
            district: hotel.address?.district,
            ward: hotel.address?.ward,
          }),
          imageKey: hotel.imageKey ?? undefined,
        }
      : {
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

  const [preview, setPreview] = useState<{ url: string; key?: string | null } | null>(
    hotel ? { url: hotel?.imageUrl, key: hotel?.imageKey } : null,
  );
  const [previewIsDeleting, setPreviewIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof preview?.url === 'string') {
      form.setValue('imageUrl', preview.url, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
      form.setValue('imageKey', preview.key ?? undefined);
    }
  }, [preview]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('submit');
    setIsLoading(true);
    console.log(values);
    if (hotel) {
      const { isSuccess } = await HotelApi.updateHotelById(hotel.id, {
        ...values,
        address: {
          details: values.address,
          country: values.country,
          province: values.province,
          district: values.district,
          ward: values.ward,
        },
      });
      if (isSuccess) {
        toast({ variant: 'success', description: t('HotelForm.toast.updateSuccess') });
        setIsLoading(false);
        router.push(routeConfig.MANAGE_HOTELS + '/' + hotel.id);
      } else {
        toast({ variant: 'destructive', description: t('HotelForm.toast.updateFailure') });
        setIsLoading(false);
      }
    } else {
      const { isSuccess, data } = await HotelApi.createHotel({
        ...values,
        address: {
          details: values.address,
          country: values.country,
          province: values.province,
          district: values.district,
          ward: values.ward,
        },
      } as any);
      if (isSuccess) {
        toast({ variant: 'success', description: t('HotelForm.toast.createSuccess') });
        setIsLoading(false);
        router.push(routeConfig.MANAGE_HOTELS + '/' + data.id);
      } else {
        toast({ variant: 'destructive', description: t('HotelForm.toast.createFailure') });
        setIsLoading(false);
      }
    }
  }

  async function handleDeleteImage() {
    if (!preview?.key) return;

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

  function handleDialogOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t(!hotel ? 'HotelForm.title.create' : 'HotelForm.title.edit')}</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Part 1: left */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Name, desc */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('HotelForm.label.name')}</FormLabel>
                    <FormDescription>{t('HotelForm.desc.name')}</FormDescription>
                    <FormControl>
                      <Input placeholder={t('HotelForm.placeholder.name')} disabled={isLoading} {...field} />
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
                      <Textarea placeholder={t('HotelForm.placeholder.description')} disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amenities */}
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
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.gym')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bar"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.bar')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="restaurant"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.restaurant')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="freeParking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.freeParking')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="movieNight"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.movieNight')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coffeeShop"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.coffeeShop')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="spa"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.spa')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="laundry"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.laundry')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shopping"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.shopping')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bikeRental"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.bikeRental')}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="swimmingPool"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                        </FormControl>
                        <FormLabel className="w-full cursor-pointer">{t('HotelForm.label.swimmingPool')}</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Profile Image */}
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

            {/* Part2: right */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('HotelForm.label.email')}</FormLabel>
                    <FormDescription>{t('HotelForm.desc.email')}</FormDescription>
                    <FormControl>
                      <Input
                        disabled={!!hotel || isLoading}
                        placeholder={t('HotelForm.placeholder.email')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Locations */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('HotelForm.label.country')}</FormLabel>
                      <FormDescription>{t('HotelForm.desc.country')}</FormDescription>
                      <FormControl>
                        <Input placeholder={t('HotelForm.placeholder.country')} disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('HotelForm.label.province')}</FormLabel>
                      <FormDescription>{t('HotelForm.desc.province')}</FormDescription>
                      <FormControl>
                        <Input placeholder={t('HotelForm.placeholder.province')} disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('HotelForm.label.district')}</FormLabel>
                      <FormDescription>{t('HotelForm.desc.district')}</FormDescription>
                      <FormControl>
                        <Input placeholder={t('HotelForm.placeholder.district')} disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('HotelForm.label.ward')}</FormLabel>
                      <FormDescription>{t('HotelForm.desc.ward')}</FormDescription>
                      <FormControl>
                        <Input placeholder={t('HotelForm.placeholder.ward')} disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location Description - details */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('HotelForm.label.address')}</FormLabel>
                    <FormDescription>{t('HotelForm.desc.address')}</FormDescription>
                    <FormControl>
                      <Textarea placeholder={t('HotelForm.placeholder.address')} disabled={isLoading} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Rooms */}
              {hotel && !hotel.rooms.length && (
                <Alert className="bg-indigo-600 text-white">
                  <Terminal className="size-4 stroke-white" />
                  <AlertTitle>{t('HotelForm.alert.title')}</AlertTitle>
                  <AlertDescription>
                    {t('HotelForm.alert.desc1')}
                    <div>{t('HotelForm.alert.desc2')}</div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Button */}
              <div className="flex flex-wrap justify-between gap-2">
                {/* Action Form Button */}
                <Button type="submit" className="max-w-[150px]" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2Icon className="mr-2 size-4" />
                      {t(`HotelForm.button.${hotel ? 'updating' : 'creating'}`)}
                    </>
                  ) : (
                    <>
                      <PencilLineIcon className="mr-2 size-4" />
                      {t(`HotelForm.button.${hotel ? 'update' : 'create'}`)}
                    </>
                  )}
                </Button>

                {/* View Details */}
                {hotel && (
                  <ILink
                    className={buttonVariants({ variant: 'outline' })}
                    href={routeConfig.SYSTEM_HOTEL_DETAILS + '/' + hotel.id}
                  >
                    <Eye className="mr-2 size-4" />
                    View
                  </ILink>
                )}

                {/* Room Handle */}
                {hotel && (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className="max-w-[150px]">
                        <Plus className="mr-2 size-4" />
                        {t('HotelForm.dialog.trigger')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-[900px] w-[90%]">
                      <DialogHeader className="px-2">
                        <DialogTitle>{t('HotelForm.dialog.title')}</DialogTitle>
                        <DialogDescription>{t('HotelForm.dialog.desc')}</DialogDescription>
                      </DialogHeader>
                      <RoomForm hotel={hotel} handleDialogOpen={handleDialogOpen} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
