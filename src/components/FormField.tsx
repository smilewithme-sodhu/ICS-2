"use client";
import { useId, type InputHTMLAttributes, type ReactNode } from "react";

type Props = {
  label: string;
  hint?: string;
  error?: string;
  select?: string[];
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

/** Label above field, hint + inline error programmatically associated, 52px tap height. */
export function FormField({ label, hint, error, select, value, onChange, placeholder, ...rest }: Props) {
  const id = useId();
  const describedBy = [hint ? `${id}-h` : "", error ? `${id}-e` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="hint" id={`${id}-h`}>{hint}</p>}
      {select ? (
        <select id={id} className="select" value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={describedBy}>
          <option value="">{placeholder ?? "Select"}</option>
          {select.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={describedBy} placeholder={placeholder} {...rest} />
      )}
      {error && <p className="error-text" id={`${id}-e`} role="alert">{error}</p>}
    </div>
  );
}

export function Check({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{children}</span>
    </label>
  );
}
