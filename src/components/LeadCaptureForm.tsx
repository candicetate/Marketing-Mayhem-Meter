import { FormEvent, useState } from "react";

export type LeadFormValues = {
  firstName: string;
  email: string;
  websiteUrl?: string;
  businessName?: string;
  newsletterOptIn: boolean;
};

type LeadCaptureFormProps = {
  onSubmit: (values: LeadFormValues) => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadCaptureForm({ onSubmit }: LeadCaptureFormProps) {
  const [values, setValues] = useState<LeadFormValues>({
    firstName: "",
    email: "",
    websiteUrl: "",
    businessName: "",
    newsletterOptIn: true
  });
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});

  function update<K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      firstName: values.firstName.trim() ? undefined : "Please enter your first name.",
      email: emailPattern.test(values.email.trim())
        ? undefined
        : "Please enter a valid email so we can send your result."
    };

    setErrors(nextErrors);
    if (nextErrors.firstName || nextErrors.email) return;
    onSubmit({ ...values, firstName: values.firstName.trim(), email: values.email.trim() });
  }

  return (
    <section className="quiz-card">
      <p className="eyebrow">The meter has spoken.</p>
      <h2>Your Marketing Mayhem Type is ready.</h2>
      <p className="intro-copy">
        Enter your details and we'll show you what's slowing your marketing down, what it means, and what to fix first.
      </p>
      <form className="lead-form" onSubmit={handleSubmit} noValidate>
        <label>
          First name
          <input
            value={values.firstName}
            onChange={(event) => update("firstName", event.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "first-name-error" : undefined}
            required
          />
          {errors.firstName && <span className="field-error" id="first-name-error">{errors.firstName}</span>}
        </label>
        <label>
          Email
          <input
            type="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
        </label>
        <label>
          Website URL <span className="optional">optional</span>
          <input value={values.websiteUrl} onChange={(event) => update("websiteUrl", event.target.value)} />
        </label>
        <label>
          Business name <span className="optional">optional</span>
          <input value={values.businessName} onChange={(event) => update("businessName", event.target.value)} />
        </label>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={values.newsletterOptIn}
            onChange={(event) => update("newsletterOptIn", event.target.checked)}
          />
          <span>Yes, send me my result and helpful marketing tips from Clever Calicco.</span>
        </label>
        <button className="button primary" type="submit">Show My Result</button>
      </form>
    </section>
  );
}
