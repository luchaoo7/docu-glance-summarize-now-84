import { supabase } from '@/lib/supabase/client'
import { useState } from 'react'

type Mode = 'sign-in' | 'sign-up'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<Mode>('sign-in')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // ⚠️ If email confirmations are enabled, session will be null here
      if (!data.session) {
        setError("Check your email to confirm your account before logging in.");
      }
    }

    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-12">
      <input
        className="border rounded p-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border rounded p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSignIn}
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Loading..." : "Sign In"}
      </button>

      <button
        onClick={handleSignUp}
        disabled={loading}
        className="bg-green-600 text-white p-2 rounded"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </div>
  );
}