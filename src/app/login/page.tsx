import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const resolvedParams = await searchParams
  
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Pratika Pro&apos;ya Giriş Yap</h1>
          <p className="text-sm text-muted-foreground mt-2">
            İşletmenizi ve menünüzü yönetmek için giriş yapın.
          </p>
        </div>

        <label className="text-md font-medium" htmlFor="email">
          E-posta
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="isim@ornek.com"
          required
        />
        <label className="text-md font-medium" htmlFor="password">
          Şifre
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        
        <div className="flex flex-col gap-2">
          <button
            formAction={login}
            className="bg-black text-white hover:bg-gray-800 rounded-md px-4 py-2 mb-2"
          >
            Giriş Yap
          </button>
          <button
            formAction={signup}
            className="border border-black text-black hover:bg-gray-50 rounded-md px-4 py-2"
          >
            Kayıt Ol
          </button>
        </div>

        {resolvedParams?.message && (
          <p className="mt-4 p-4 bg-red-100 text-red-600 border border-red-200 text-center rounded-md">
            {resolvedParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
