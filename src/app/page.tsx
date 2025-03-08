import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to My Next.js App!</h1>
      <p className="mt-4 text-lg">Start building your project here 🚀</p>
      {/* Register as DJ Button */}
      <Link href="/dj-registration">
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition">
          Register as DJ
        </button>
      </Link>
      {/* Register as Company Button */}
      <Link href="/company-registration">
        <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
          Register as Company
        </button>
      </Link>
    </main>
  );
}
