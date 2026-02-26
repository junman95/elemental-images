"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { validateImageFile } from "@/lib/utils/image";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  disabled?: boolean;
}

export default function ImageUploader({
  onImageSelected,
  disabled = false,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      const validationError = validateImageFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      onImageSelected(file);
    },
    [onImageSelected],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [disabled, handleFile],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile],
  );

  return (
    <div className="space-y-3">
      {/* ── Drop zone ── */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={cn(
          "relative rounded-2xl p-10 text-center transition-all duration-200 select-none",
          "border-2 border-dashed",
          // glass base
          "bg-white/60 backdrop-blur-md",
          // idle
          !isDragging && !disabled &&
            "border-[rgba(212,175,55,0.35)] hover:border-[#13ec5b] hover:bg-white/80 cursor-pointer",
          // dragging
          isDragging &&
            "border-[#13ec5b] bg-[rgba(19,236,91,0.06)] scale-[1.015] shadow-[0_0_0_4px_rgba(19,236,91,0.12)]",
          // disabled
          disabled && "opacity-50 cursor-not-allowed border-[rgba(26,46,26,0.1)]",
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="user"
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex flex-col items-center gap-4">
          {/* 아이콘 */}
          <div
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200",
              isDragging
                ? "bg-[rgba(19,236,91,0.15)] shadow-[0_0_24px_rgba(19,236,91,0.25)]"
                : "bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.25)]",
            )}
          >
            {isDragging ? (
              /* 드래그 중 — 위로 화살표 */
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#13ec5b"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            ) : (
              /* 기본 — 얼굴 스캔 아이콘 */
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="12" cy="12" r="1.5" fill="#d4af37" />
              </svg>
            )}
          </div>

          {/* 텍스트 */}
          <div className="space-y-1">
            <p
              className={cn(
                "font-bold text-base transition-colors duration-200",
                isDragging ? "text-[#13ec5b]" : "text-[#1a2e1a]",
              )}
            >
              {isDragging ? "여기에 놓으세요" : "사진을 드래그하거나 클릭하여 업로드"}
            </p>
            <p className="text-sm text-[#8aaa8a]">JPG, PNG, WebP · 최대 10MB</p>
          </div>
        </div>
      </div>

      {/* ── 카메라 버튼 ── */}
      <div className="flex justify-center">
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "bg-[#13ec5b] text-[#102216] font-bold",
            "hover:bg-[#0db849] shadow-[0_4px_16px_rgba(19,236,91,0.25)] hover:shadow-[0_4px_20px_rgba(19,236,91,0.4)]",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {/* 카메라 SVG */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          카메라로 촬영
        </button>
      </div>

      {/* ── 에러 ── */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.2)]">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <p className="text-sm text-[#ef4444] font-medium">{error}</p>
        </div>
      )}

      {/* ── 안내 문구 ── */}
      <div className="flex flex-col items-center gap-1 pt-1">
        <p className="text-[11px] text-[#8aaa8a] flex items-center gap-1.5">
          <span style={{ color: "#d4af37" }}>✦</span>
          정면을 바라보는 사진이 가장 정확합니다
        </p>
        <p className="text-[11px] text-[#8aaa8a] flex items-center gap-1.5">
          <span style={{ color: "#d4af37" }}>✦</span>
          한 명만 나온 사진을 사용해 주세요
        </p>
      </div>
    </div>
  );
}
