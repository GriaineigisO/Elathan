import React, { useState } from "react";
import supabase from "../Components/supabaseClient";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorText(null);

    try {
      const redirectTo = `${window.location.origin}/reset`;
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo }
      );

      // Avoid account enumeration: always show the same success notice.
      if (error) console.error("resetPasswordForEmail:", error);
      setSent(true);
    } catch (err) {
      console.error(err);
      // If you prefer to always show success, you can setSent(true) here too.
      setErrorText("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <p className="text-sm">
        If that email exists, we’ve sent a reset link. Please check your inbox (and spam).
      </p>
    );
  }

  return (
    <div  className="form-container" style={{textAlign:"center"}}>
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm">
      <label className="block">
        <span className="text-sm">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full border rounded-lg p-2"
        />
      </label>
      {errorText && <p className="text-sm text-red-600">{errorText}</p>}
      <button disabled={loading} className="rounded-lg px-3 py-2 border">
        {loading ? "Sending…" : "Send reset link"}
      </button>
    </form>
    </div>
  );
}
