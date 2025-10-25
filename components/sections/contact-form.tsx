"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { buildLocalizedPath } from "@/lib/slugMap";
import type { Locale } from "@/lib/i18n";

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  useCase: z.enum(["manufacturing", "configurator", "other"]),
  message: z.string().min(10),
  consent: z.literal(true),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations("form");
  const success = useTranslations("contact.success");
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const defaultValues: ContactFormData = {
    name: "",
    company: "",
    email: "",
    phone: "",
    useCase: "other",
    message: "",
    consent: false,
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      reset(defaultValues);
      setTimeout(() => setStatus("idle"), 8000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const roiHref = buildLocalizedPath("roi", locale);
  const useCaseOptions = [
    { value: "manufacturing" as const, label: t("useCases.manufacturing") },
    { value: "configurator" as const, label: t("useCases.configurator") },
    { value: "other" as const, label: t("useCases.other") },
  ];

  return (
    <Card className="space-y-6 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            id="name"
            label={t("name")}
            required
            error={errors.name ? t("error.name") : undefined}
          >
            <Input id="name" {...register("name")} disabled={status === "loading"} />
          </FormField>

          <FormField
            id="company"
            label={t("company")}
            required
            error={errors.company ? t("error.company") : undefined}
          >
            <Input id="company" {...register("company")} disabled={status === "loading"} />
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            id="email"
            label={t("email")}
            required
            error={errors.email ? t("error.email") : undefined}
          >
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              disabled={status === "loading"}
            />
          </FormField>

          <FormField id="phone" label={t("phone")}> 
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              {...register("phone")}
              disabled={status === "loading"}
            />
          </FormField>
        </div>

        <FormField
          id="useCase"
          label={t("useCase")}
          required
          error={errors.useCase ? t("error.useCase") : undefined}
        >
          <select
            id="useCase"
            {...register("useCase")}
            disabled={status === "loading"}
            className="flex h-11 w-full rounded-xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-white/5 px-3 text-sm text-[color:var(--fg)] shadow-sm backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          >
            {useCaseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id="message"
          label={t("message")}
          required
          error={errors.message ? t("error.message") : undefined}
        >
          <Textarea
            id="message"
            rows={6}
            {...register("message")}
            disabled={status === "loading"}
          />
        </FormField>

        <div className="space-y-3">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 flex-shrink-0 rounded border border-[color:color-mix(in_oklab,var(--fg)_35%,transparent)] bg-white text-[color:var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
              {...register("consent")}
              disabled={status === "loading"}
            />
            <span className="text-sm text-[color:var(--fg-subtle)]">{t("consent")}</span>
          </label>
          {errors.consent && (
            <p className="text-sm text-destructive">{t("consentError")}</p>
          )}
        </div>

        {status === "success" && (
          <div className="space-y-3 rounded-2xl border border-[color:color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[color:color-mix(in_oklab,var(--accent)_12%,transparent)] p-4 text-[color:var(--accent)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm font-semibold">{success("title")}</p>
            </div>
            <p className="text-sm text-[color:var(--fg)]/70">{success("body")}</p>
            <Link
              href={roiHref}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)] hover:underline"
            >
              {success("cta")}
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-semibold">{t("error.generic")}</p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("submitting")}
            </>
          ) : (
            t("submit")
          )}
        </Button>
      </form>
    </Card>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FormField({ id, label, required, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-[color:var(--fg)]">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

