import { redirect } from 'next/navigation';
import { getCurrentSession } from '@/lib/server/session';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const { user } = await getCurrentSession();

    if (!user) {
        redirect('/login/google');
    }

    return (
        <>
        {children}
        </>
    );
}