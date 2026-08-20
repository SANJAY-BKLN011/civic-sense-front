import { useRef } from "react";
import { ImagePlus, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic"];
const MAX_BYTES = 5 * 1024 * 1024;

interface PhotoUploadProps {
  previewUrl: string | null;
  fileName?: string | undefined;
  error?: string | undefined;
  onSelect: (file: File, previewUrl: string) => void;
  onRemove: () => void;
  onError: (message: string) => void;
}

export function PhotoUpload({
  previewUrl,
  fileName,
  error,
  onSelect,
  onRemove,
  onError,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      onError("Choose a JPG, PNG, WebP or GIF image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      onError("Image must be smaller than 5 MB.");
      return;
    }
    onSelect(file, URL.createObjectURL(file));
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor="issue-photo" className="text-sm font-medium text-foreground">
        Issue photo <span className="text-muted-foreground">(optional)</span>
      </Label>
      <input
        ref={inputRef}
        id="issue-photo"
        type="file"
        accept="image/*"
        className="sr-only"
        aria-invalid={Boolean(error)}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      {previewUrl ? (
        <div className="rounded-lg border border-border bg-card p-3">
          <img
            src={previewUrl}
            alt={fileName ? `Selected issue photo: ${fileName}` : "Selected issue photo"}
            className="max-h-64 w-full rounded-md object-cover"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="min-w-0 truncate text-xs text-muted-foreground">{fileName}</p>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
                <RefreshCw className="size-4" aria-hidden="true" />
                Replace
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
                <Trash2 className="size-4" aria-hidden="true" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card px-6 py-10 text-center transition-colors hover:border-primary/40 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
            <ImagePlus className="size-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold text-foreground">Upload a photo of the issue</span>
          <span className="text-xs text-muted-foreground">JPG, PNG, WebP or GIF — up to 5 MB</span>
        </button>
      )}

      {error ? (
        <p className="text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Photos stay on your device at this stage — nothing is uploaded yet.
        </p>
      )}
    </div>
  );
}
