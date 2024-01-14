'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Icons } from '~/components/common/Icons';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { routeConfig } from '~/configs/route.config';
import { useAuth } from '~/contexts/auth.context';
import { ILink } from '~/locales/i18nNavigation';

export default function SignIn() {
  const { signInWithGoogle, signInWithPassword } = useAuth();
  const t = useTranslations('SignIn');

  // TODO: place in ReactComponent to use intl -> refactor to use https://github.com/aiji42/zod-i18n
  const formSchema = useMemo(
    () =>
      z.object({
        email: z.string().email({ message: t('invalidEmail') }),
        password: z.string().min(1, { message: t('invalidPassword') }),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    try {
      await signInWithPassword(values.email, values.password);
      // show toast
    } catch (error: any) {
      const { code, message } = error;
      if (code === 'auth/invalid-credential') {
        // invalid provider, or correct provider but wrong email/password. If signUpWithPassword and signInWithGoogle before, can't signInWithPassword (wrong credentials with this provider)
        form.setError('email', { message: t('invalidCredentials') });
      } else {
        form.setError('email', message ?? t('unknownError'));
      }
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* OAuth2 */}
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" disabled>
              <Icons.gitHub className="mr-2 h-6 w-6" />
              Github
            </Button>
            <Button variant="outline" onClick={signInWithGoogle}>
              <Icons.google className="mr-2 h-6 w-6" />
              Google
            </Button>
          </div>

          {/* Separate */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t('otherSignIn')}</span>
            </div>
          </div>

          {/* Email & Password */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('email')}</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('password')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                {t('submit')}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button asChild variant="link" className="flex-1">
            <ILink href={routeConfig.SIGN_UP}>{t('signUpLink')}</ILink>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
