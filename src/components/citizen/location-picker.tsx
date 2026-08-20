import { useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/common/form-field";
import { ErrorMessage } from "@/components/common/states";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationPickerProps {
  coords: Coordinates | null;
  manualLocation: string;
  error?: string | undefined;
  onCoords: (coords: Coordinates | null) => void;
  onManualLocation: (value: string) => void;
}

export function LocationPicker({
  coords,
  manualLocation,
  error,
  onCoords,
  onManualLocation,
}: LocationPickerProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "denied" | "unavailable">("idle");

  function capture() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unavailable");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onCoords({
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
        });
        setStatus("idle");
      },
      (geoError) => {
        setStatus(geoError.code === geoError.PERMISSION_DENIED ? "denied" : "unavailable");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="outline" onClick={capture} disabled={status === "loading"}>
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <MapPin className="size-4" aria-hidden="true" />
          )}
          Use My Current Location
        </Button>
        {coords ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onCoords(null)}>
            Clear
          </Button>
        ) : null}
      </div>

      {status === "loading" ? (
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
          Getting your current location…
        </p>
      ) : null}

      {status === "denied" ? (
        <ErrorMessage
          title="Location permission denied"
          message="Allow location access in your browser, or type the location manually below."
        />
      ) : null}

      {status === "unavailable" ? (
        <ErrorMessage
          title="Location unavailable"
          message="We could not read your device location. Please enter the location manually below."
        />
      ) : null}

      {coords ? (
        <div className="grid gap-1 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm">
          <p className="font-medium text-foreground">Coordinates captured</p>
          <p className="text-muted-foreground">
            Latitude: <span className="font-mono">{coords.latitude}</span> · Longitude:{" "}
            <span className="font-mono">{coords.longitude}</span>
          </p>
        </div>
      ) : null}

      <TextField
        id="issue-location"
        label="Location description"
        placeholder="Street, landmark or ward"
        hint="Use this if you cannot share your device location."
        value={manualLocation}
        onChange={(event) => onManualLocation(event.target.value)}
        {...(error ? { error } : {})}
      />
    </div>
  );
}
