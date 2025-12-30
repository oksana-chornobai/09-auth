// app/proxy.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { checkSession } from '@/lib/api/serverApi';

const PRIVATE_ROUTES = ['/profile', '/notes'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export async function proxy(pathname: string) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivate = PRIVATE_ROUTES.some(r => pathname.startsWith(r));
  const isAuth = AUTH_ROUTES.some(r => pathname.startsWith(r));

  // ❌ неавторизований
  if (!accessToken) {
    if (refreshToken) {
      try {
        await checkSession();
        return;
      } catch {
        if (isPrivate) redirect('/sign-in');
      }
    }

    if (isPrivate) {
      redirect('/sign-in');
    }

    return;
  }

  // ✅ авторизований
  if (isAuth) {
    redirect('/profile');
  }
}
