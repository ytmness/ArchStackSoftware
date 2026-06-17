"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { contactQuestions } from "@/lib/data/contact";

function QuickReplyInput({
  onSubmit,
  defaultValue,
  placeholder,
}: {
  onSubmit: (value: string) => void;
  defaultValue?: string;
  placeholder: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!value.trim()) return;
        onSubmit(value.trim());
      }}
      className="flex flex-col gap-3 md:flex-row"
    >
      <label className="sr-only" htmlFor="reply">
        Escribe tu respuesta
      </label>
      <input
        id="reply"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="min-h-14 flex-1 rounded-2xl border border-line bg-black/20 px-4 text-text outline-none placeholder:text-white/25 focus:border-accent/30 focus:ring-1 focus:ring-accent/20"
        placeholder={placeholder}
      />
      <Button type="submit">Continuar</Button>
    </form>
  );
}

export function Contact() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const current = contactQuestions[step];
  const progress = useMemo(
    () => ((step + 1) / contactQuestions.length) * 100,
    [step]
  );

  const onNext = async (value: string) => {
    const updated = { ...answers, [current.key]: value };
    setAnswers(updated);

    if (step < contactQuestions.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error("Error al enviar");
      setSubmitted(true);
    } catch {
      setError("No pudimos enviar tu mensaje. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="border-t border-line py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Contacto"
          title="Cuéntanos qué estás construyendo"
          description="Un brief conversacional para entender tu proyecto antes de la primera llamada."
        />

        <div className="mx-auto max-w-2xl rounded-[32px] border border-line bg-white/[0.03] p-6 md:p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 text-center"
            >
              <p className="text-2xl font-semibold text-text">
                Brief recibido
              </p>
              <p className="mt-3 text-muted">
                Revisaremos tu proyecto y te contactaremos pronto.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-accent"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.24 }}
                >
                  <p className="mb-3 text-sm uppercase tracking-[0.2em] text-white/45">
                    Brief · Paso {step + 1} de {contactQuestions.length}
                  </p>
                  <h3 className="mb-6 text-2xl font-semibold text-text md:text-3xl">
                    {current.label}
                  </h3>

                  <QuickReplyInput
                    onSubmit={onNext}
                    defaultValue={answers[current.key] ?? ""}
                    placeholder={current.placeholder}
                  />
                </motion.div>
              </AnimatePresence>

              {error && (
                <p className="mt-4 text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              {loading && (
                <p className="mt-4 text-sm text-muted">Enviando…</p>
              )}

              {step > 0 && !loading && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-4 text-sm text-muted hover:text-text"
                >
                  ← Volver
                </button>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
