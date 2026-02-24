"use client";

import { Camera, ImageIcon, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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
			// Reset input so same file can be selected again
			e.target.value = "";
		},
		[handleFile],
	);

	return (
		<div className="space-y-4">
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={() => !disabled && fileInputRef.current?.click()}
				className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
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

				<div className="flex flex-col items-center gap-3">
					<div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
						{isDragging ? (
							<Upload className="w-7 h-7 text-primary animate-bounce" />
						) : (
							<ImageIcon className="w-7 h-7 text-muted-foreground" />
						)}
					</div>

					<div>
						<p className="font-medium text-foreground">
							{isDragging
								? "여기에 놓으세요"
								: "사진을 드래그하거나 클릭하여 업로드"}
						</p>
						<p className="text-sm text-muted-foreground mt-1">
							JPG, PNG, WebP / 최대 10MB
						</p>
					</div>
				</div>
			</div>

			<div className="flex justify-center">
				<Button
					variant="outline"
					size="sm"
					disabled={disabled}
					onClick={() => fileInputRef.current?.click()}
					className="gap-2"
				>
					<Camera className="w-4 h-4" />
					카메라로 촬영
				</Button>
			</div>

			{error && <p className="text-sm text-destructive text-center">{error}</p>}

			<div className="text-xs text-muted-foreground text-center space-y-0.5">
				<p>정면을 바라보는 얼굴 사진이 가장 정확한 결과를 제공합니다.</p>
				<p>한 명만 나온 사진을 사용해 주세요.</p>
			</div>
		</div>
	);
}
