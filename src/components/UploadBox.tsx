"use client";
import { useEffect, useRef, useState } from "react";

export const ACCEPT = ["image/jpeg", "image/png", "image/webp"];
export const MAX_MB = 10;

export type UploadState = "idle" | "uploading" | "done" | "error";
export type UploadValue = { file: File; url: string } | null;

/**
 * Mobile-friendly upload box: camera / gallery / file picker, client-side preview,
 * size+format validation, progress, retry. The file lives in parent state so a failure
 * (or stepping back) never discards it or any other form data.
 *
 * Upload transport is simulated; wire `startUpload` to a real signed-URL upload.
 * Pass `simulateFail` to demo the failure + retry state.
 */
export function UploadBox({
  value, onChange, status, onStatus, simulateFail = false,
}: {
  value: UploadValue;
  onChange: (v: UploadValue) => void;
  status: UploadState;
  onStatus: (s: UploadState) => void;
  simulateFail?: boolean;
}) {
  const [progress, setProgress] = useState(status === "done" ? 100 : 0);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const failNext = useRef(simulateFail);
  const fileInput = useRef<HTMLInputElement>(null);
  const camInput = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);
  useEffect(() => { failNext.current = simulateFail; }, [simulateFail]);

  function validate(f: File): string {
    if (!ACCEPT.includes(f.type)) return "That file type isn't supported. Please use JPG, PNG or WebP.";
    if (f.size > MAX_MB * 1024 * 1024) return `That file is ${(f.size / 1048576).toFixed(1)} MB. The maximum is ${MAX_MB} MB.`;
    return "";
  }

  function startUpload() {
    setError("");
    setProgress(0);
    onStatus("uploading");
    let p = 0;
    timer.current = setInterval(() => {
      p += 8 + Math.random() * 10;
      if (failNext.current && p > 55) {
        clearInterval(timer.current!);
        failNext.current = false;
        setError("Upload interrupted — your connection dropped. Your details are safe; tap Retry.");
        onStatus("error");
        return;
      }
      if (p >= 100) {
        clearInterval(timer.current!);
        setProgress(100);
        onStatus("done");
        return;
      }
      setProgress(Math.round(p));
    }, 220);
  }

  function pick(f?: File | null) {
    if (!f) return;
    const msg = validate(f);
    if (msg) { setError(msg); onStatus("error"); onChange(null); return; }
    if (value) URL.revokeObjectURL(value.url);
    onChange({ file: f, url: URL.createObjectURL(f) });
    startUpload();
  }

  function remove() {
    if (value) URL.revokeObjectURL(value.url);
    onChange(null); setError(""); setProgress(0); onStatus("idle");
  }

  const cls = `upload ${drag ? "upload--drag" : ""} ${status === "error" ? "upload--error" : ""} ${status === "done" ? "upload--done" : ""}`;

  return (
    <div
      className={cls}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0]); }}
    >
      {!value ? (
        <>
          <svg className="upload__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="6" y="9" width="36" height="30" rx="3" /><circle cx="17" cy="20" r="3.5" /><path d="m6 33 11-9 8 6 6-5 11 9" />
          </svg>
          <div>
            <p style={{ fontWeight: 600 }}>Add your artwork</p>
            <p className="small muted">JPG, PNG or WebP · up to {MAX_MB} MB</p>
          </div>
          <div className="upload__actions">
            <button type="button" className="btn btn--primary" onClick={() => camInput.current?.click()}>Take a photo</button>
            <button type="button" className="btn btn--secondary" onClick={() => fileInput.current?.click()}>Choose from gallery</button>
          </div>
        </>
      ) : (
        <div className="upload__preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.url} alt="Preview of your uploaded artwork" />
          <p className="small"><b>{value.file.name}</b> · {(value.file.size / 1048576).toFixed(1)} MB</p>

          {status === "uploading" && (
            <>
              <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Upload progress"><span style={{ width: `${progress}%` }} /></div>
              <p className="small muted" aria-live="polite">Uploading… {progress}%</p>
            </>
          )}
          {status === "done" && <p className="small" style={{ color: "var(--ok)", fontWeight: 700 }} aria-live="polite">✓ Uploaded and ready</p>}
          <div className="upload__actions">
            {status === "error" && <button type="button" className="btn btn--primary" onClick={startUpload}>Retry upload</button>}
            {status !== "uploading" && <button type="button" className="btn btn--secondary" onClick={() => fileInput.current?.click()}>Replace</button>}
            {status !== "uploading" && <button type="button" className="btn btn--text" onClick={remove}>Remove</button>}
          </div>
        </div>
      )}
      {error && <p className="error-text" role="alert">{error}</p>}
      <input ref={fileInput} type="file" accept={ACCEPT.join(",")} hidden onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ""; }} />
      <input ref={camInput} type="file" accept="image/*" capture="environment" hidden onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ""; }} />
    </div>
  );
}
