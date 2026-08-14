import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

/**
 * LeadCaptureModal
 * ------------------------------------------------------------------
 * A 3-step "what can we help with" modal that opens automatically
 * after the site's startup loader finishes.
 *
 *   Step 1 — choice        : Website & App Development / Digital Marketing
 *   Step 2 — form          : name, phone, email, need (select) — copy
 *                             changes depending on the choice made in step 1
 *   Step 3 — confirmation  : "You're on our list ✓"
 *
 * Visual language matches the existing hero (near-black background,
 * blue → violet gradient accent, thin hairline borders, drifting
 * starfield) so it reads as part of the same site, not a bolted-on
 * popup.
 *
 * HOW TO WIRE IT UP
 * ------------------------------------------------------------------
 * 1. Drop this file in `src/components/LeadCaptureModal.tsx`.
 * 2. Add the keyframes in `modal-animations.css` to your global CSS
 *    (e.g. import it once in `index.css` or `main.tsx`).
 * 3. Render <LeadCaptureModal /> once, near the top of App.tsx,
 *    right after your loader unmounts:
 *
 *      {!isLoading && <LeadCaptureModal />}
 *
 *    If your loader doesn't unmount (e.g. it's just an opacity
 *    transition), instead fire a window event when it finishes:
 *      window.dispatchEvent(new Event("app:loaded"))
 *    LeadCaptureModal already listens for that event — see the
 *    OPEN_DELAY_MS / "app:loaded" handling below.
 * ------------------------------------------------------------------
 */

type ServiceType = "dev" | "marketing";
type Step = "closed" | "choice" | "form" | "success";

const DEV_OPTIONS = [
  "Portfolio Website",
  "E-commerce Website",
  "Web Application",
  "Mobile App",
  "Other",
];

const MARKETING_OPTIONS = [
  "Meta Ads",
  "Google Ads",
  "Social Media",
  "Branding & Design",
  "Video Production / Editing",
  "Complete Digital Marketing",
  "Other",
];

// Fallback delay if no "app:loaded" event ever fires (ms).
const OPEN_DELAY_MS = 900;
// Don't re-pester a visitor who already saw/dismissed it this session.
// const SESSION_KEY = "vedseem_modal_shown";

interface FormState {
  name: string;
  phone: string;
  email: string;
  need: string;
}

const EMPTY_FORM: FormState = { name: "", phone: "", email: "", need: "" };
const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function LeadCaptureModal() {
  const [step, setStep] = useState<Step>("closed");
  const [service, setService] = useState<ServiceType | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [leaving, setLeaving] = useState(false); // for close animation
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // ---- open logic --------------------------------------------------
  useEffect(() => {
    // if (sessionStorage.getItem(SESSION_KEY)) return;

    let timer: ReturnType<typeof setTimeout>;

    const open = () => {
      // if (sessionStorage.getItem(SESSION_KEY)) return;
      setStep("choice");
    };

    // Preferred: your loader dispatches this when it finishes.
    window.addEventListener("app:loaded", open, { once: true });
    window.addEventListener("open-lead-modal", open); // NEW: manual trigger

    // Fallback so the modal still appears if that event is never sent.
    timer = setTimeout(open, OPEN_DELAY_MS);

    return () => {
      window.removeEventListener("app:loaded", open);
      window.removeEventListener("open-lead-modal", open); // NEW

      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (step === "form") {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [step]);

  // Lock background scroll while open.
  useEffect(() => {
    if (step === "closed") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [step]);

  const close = () => {
    setLeaving(true);
    // sessionStorage.setItem(SESSION_KEY, "1");
    setTimeout(() => {
      setStep("closed");
      setLeaving(false);
      setService(null);
      setForm(EMPTY_FORM);
      setErrors({});
    }, 220);
  };

  const chooseService = (type: ServiceType) => {
    setService(type);
    setStep("form");
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Enter your name";
    if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email";
    if (!form.need) next.need = "Select an option";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
        throw new Error("Email service is not configured.");
      }

      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.need,
          service: service === "marketing" ? "Digital Marketing" : "Website & App Development",
          source: "Lead Capture Modal",
          reply_to: form.email,
          to_name: "VedSeem Team",
        },
        EMAIL_PUBLIC_KEY,
      );

      setForm(EMPTY_FORM);
      setErrors({});
      setStep("success");
      // sessionStorage.setItem(SESSION_KEY, "1");
    } catch (error) {
      console.error("Lead submission failed:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    setStep("choice");
    setErrors({});
  };

  if (step === "closed") return null;

  const options = service === "marketing" ? MARKETING_OPTIONS : DEV_OPTIONS;
  const needLabel =
    service === "marketing"
      ? "What do you need help with?"
      : "What do you need?";

  return (
    <div
      className={`vs-modal-overlay ${leaving ? "vs-fade-out" : "vs-fade-in"}`}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {/* ambient starfield dots, purely decorative */}
      <div className="vs-modal-stars" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="vs-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0.15 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      <div
        className={`vs-modal-panel ${leaving ? "vs-panel-out" : "vs-panel-in"}`}
      >
        <button className="vs-close-btn" onClick={close} aria-label="Close">
          ×
        </button>

        {/* progress dots */}
        {step !== "success" && (
          <div className="vs-progress">
            <span
              className={`vs-dot ${step === "choice" ? "vs-dot-active" : "vs-dot-done"}`}
            />
            <span
              className={`vs-dot ${step === "form" ? "vs-dot-active" : ""}`}
            />
          </div>
        )}

        {step === "choice" && (
          <div className="vs-step vs-step-enter" key="choice">
            <h2 className="vs-title">What can VedSeem help you with?</h2>
            <p className="vs-subtitle">
              Tell us what you're looking for, and we'll connect you with the
              right team.
            </p>

            <div className="vs-choice-grid">
              <button
                className="vs-choice-card"
                onClick={() => chooseService("dev")}
              >
                <span className="vs-choice-num">01</span>
                <span className="vs-choice-heading">
                  Website &amp; App Development
                </span>
                <span className="vs-choice-tags">
                  Websites · Web Apps · Mobile Apps · UI/UX
                </span>
                <span className="vs-choice-glow" aria-hidden="true" />
              </button>

              <button
                className="vs-choice-card"
                onClick={() => chooseService("marketing")}
              >
                <span className="vs-choice-num">02</span>
                <span className="vs-choice-heading">Digital Marketing</span>
                <span className="vs-choice-tags">
                  Meta · Google · LinkedIn · Design · Video · Content
                </span>
                <span className="vs-choice-glow" aria-hidden="true" />
              </button>
            </div>

            <button className="vs-maybe-later" onClick={close}>
              Maybe later
            </button>
          </div>
        )}

        {step === "form" && (
          <form
            className="vs-step vs-step-enter"
            key="form"
            onSubmit={handleSubmit}
          >
            <button type="button" className="vs-back-link" onClick={goBack}>
              ← Back
            </button>

            <h2 className="vs-title vs-title-sm">
              {service === "marketing"
                ? "Let's grow your business."
                : "Let's build something together."}
            </h2>
            <p className="vs-subtitle-eyebrow">
              {service === "marketing" ? "Marketing" : "Development"}
            </p>

            <div className="vs-field">
              <label htmlFor="vs-name">Your name</label>
              <input
                id="vs-name"
                ref={firstFieldRef}
                type="text"
                placeholder="e.g. Aditi Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <span className="vs-error">{errors.name}</span>}
            </div>

            <div className="vs-field">
              <label htmlFor="vs-phone">Phone</label>
              <input
                id="vs-phone"
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && <span className="vs-error">{errors.phone}</span>}
            </div>

            <div className="vs-field">
              <label htmlFor="vs-email">Email</label>
              <input
                id="vs-email"
                type="email"
                placeholder="e.g. aditi@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <span className="vs-error">{errors.email}</span>}
            </div>

            <div className="vs-field">
              <label htmlFor="vs-need">{needLabel}</label>
              <select
                id="vs-need"
                value={form.need}
                onChange={(e) => setForm({ ...form, need: e.target.value })}
              >
                <option value="" disabled>
                  Select one
                </option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.need && <span className="vs-error">{errors.need}</span>}
            </div>

            <button type="submit" className="vs-cta" disabled={submitting}>
              {submitting ? (
                <span className="vs-spinner" aria-hidden="true" />
              ) : (
                "Get a Callback"
              )}
            </button>

            {submitError && <p className="vs-error vs-error-inline">{submitError}</p>}
          </form>
        )}

        {step === "success" && (
          <div className="vs-step vs-step-enter vs-success" key="success">
            <div className="vs-check-circle">
              <svg viewBox="0 0 52 52" className="vs-check-svg">
                <circle
                  cx="26"
                  cy="26"
                  r="24"
                  className="vs-check-circle-path"
                />
                <path d="M14 27 L22 35 L38 17" className="vs-check-mark-path" />
              </svg>
            </div>
            <h2 className="vs-title vs-title-sm">You're on our list.</h2>
            <p className="vs-subtitle">
              Our team will review your requirements and get in touch with you
              shortly.
            </p>
            <button className="vs-cta vs-cta-outline" onClick={close}>
              Back to VedSeem →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
