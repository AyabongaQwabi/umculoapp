"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { PACKAGE_OPTIONS, type PackageId } from "@/data/pricing";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  packageId: PackageId | "";
  consent: boolean;
}

const initialForm: FormState = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  packageId: "",
  consent: false,
};

const PACKAGE_QUERY_VALUES = new Set(
  PACKAGE_OPTIONS.map((option) => option.value),
);

function readHashParams(): { package?: PackageId } {
  if (typeof window === "undefined") return {};

  const hash = window.location.hash;
  const queryStart = hash.indexOf("?");
  if (queryStart === -1) return {};

  const params = new URLSearchParams(hash.slice(queryStart + 1));
  const pkg = params.get("package");

  return {
    package:
      pkg && PACKAGE_QUERY_VALUES.has(pkg as PackageId)
        ? (pkg as PackageId)
        : undefined,
  };
}

export function SignupFormSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    function applyFromLocation() {
      const fromSearch = new URLSearchParams(window.location.search);
      const pkgFromSearch = fromSearch.get("package");
      const fromHash = readHashParams();

      const pkg =
        pkgFromSearch && PACKAGE_QUERY_VALUES.has(pkgFromSearch as PackageId)
          ? (pkgFromSearch as PackageId)
          : fromHash.package;

      if (pkg) {
        setForm((current) => ({ ...current, packageId: pkg }));
      }
    }

    applyFromLocation();
    window.addEventListener("hashchange", applyFromLocation);
    return () => window.removeEventListener("hashchange", applyFromLocation);
  }, []);

  const isQuote = form.packageId === "special-project";

  const heading = useMemo(() => {
    if (isQuote) return "Request a quote";
    return "Sign up and subscribe";
  }, [isQuote]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        errors?: Record<string, string>;
        error?: string;
        redirectUrl?: string;
        quoteOnly?: boolean;
        signupId?: string;
      };

      if (!response.ok) {
        setErrors(
          data.errors ?? { form: data.error ?? "Something went wrong." },
        );
        return;
      }

      if (data.quoteOnly && data.signupId) {
        window.location.href = `/signup/${data.signupId}?quote=true`;
        return;
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      setErrors({ form: "Could not start checkout. Please try again." });
    } catch {
      setErrors({ form: "Could not submit your signup. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Get started
          </p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-base text-white/75">
            {isQuote
              ? "Tell us about your project. We will reply with scope and pricing."
              : "Fill in your details below. We save your signup immediately, then send you to Yoco to pay your first month."}
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            noValidate
          >
            {errors.form ? (
              <p className="rounded border border-red/40 bg-red/10 px-4 py-3 text-sm text-red">
                {errors.form}
              </p>
            ) : null}

            <Field label="Name" error={errors.name} required>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                className={inputClass(errors.name)}
              />
            </Field>

            <Field
              label="Artist or business name"
              error={errors.businessName}
              required
            >
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={form.businessName}
                onChange={(event) =>
                  setForm({ ...form, businessName: event.target.value })
                }
                className={inputClass(errors.businessName)}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" error={errors.email} required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  className={inputClass(errors.email)}
                />
              </Field>

              <Field label="Phone / WhatsApp" error={errors.phone} required>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  className={inputClass(errors.phone)}
                />
              </Field>
            </div>

            <Field label="Which plan?" error={errors.packageId} required>
              <select
                id="packageId"
                name="packageId"
                value={form.packageId}
                onChange={(event) =>
                  setForm({
                    ...form,
                    packageId: event.target.value as PackageId | "",
                  })
                }
                className={inputClass(errors.packageId)}
              >
                <option value="">Select a plan</option>
                {PACKAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <div>
              <label className="flex items-start gap-3 text-sm text-white/75">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={(event) =>
                    setForm({ ...form, consent: event.target.checked })
                  }
                  className="mt-1 h-4 w-4 accent-gold"
                />
                <span>
                  I agree that Umculo may contact me about this signup and store
                  my details for that purpose.{" "}
                  <span className="text-gold">*</span>
                </span>
              </label>
              {errors.consent ? (
                <p className="mt-2 text-sm text-red">{errors.consent}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full border-[1.5px] border-gold bg-gold px-6 py-3 font-display text-sm font-black uppercase tracking-wide text-black transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Saving…"
                : isQuote
                  ? "Submit quote request"
                  : "Continue to payment"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white/85">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1.5 text-sm text-red">{error}</p> : null}
    </div>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded border bg-black px-4 py-2.5 text-sm text-white outline-none transition-colors",
    error
      ? "border-red/60 focus:border-red"
      : "border-white/15 focus:border-gold/60",
  );
}
