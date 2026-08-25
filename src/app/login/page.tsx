import LoginForm from '@/components/auth/LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const resolvedParams = await searchParams;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/20 px-4 py-10 sm:px-6">
      <LoginForm message={resolvedParams?.message} />
    </div>
  );
}
