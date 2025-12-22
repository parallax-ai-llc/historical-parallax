"use client";

import * as React from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { useRouter } from "next/navigation";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UfoLocation } from "@/lib/maps";
import { getMapViewConfig } from "@/lib/maps";

import { cn } from "@/lib/utils";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface InteractiveMapProps {
  mapId: string;
  locations: UfoLocation[];
  className?: string;
}

interface GeoGeometry {
  type: string;
  coordinates: number[][][] | number[][];
}

interface GeoProperties {
  name: string;
  [key: string]: unknown;
}

interface GeoFeature {
  type: "Feature";
  properties: GeoProperties;
  geometry: GeoGeometry;
  id?: string | number;
  rsmKey: string;
}

export function InteractiveMap({ mapId, locations, className }: InteractiveMapProps) {
  const router = useRouter();
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [position, setPosition] = React.useState({
    coordinates: [0, 0] as [number, number],
    zoom: 1,
  });

  React.useEffect(() => {
    // Check if there's a custom view config for this map
    const customConfig = getMapViewConfig(mapId);

    if (customConfig) {
      setPosition({
        coordinates: customConfig.center,
        zoom: customConfig.zoom
      });
      return;
    }

    // Otherwise, auto-calculate based on locations
    if (locations.length === 0) {
      setPosition({ coordinates: [0, 0], zoom: 1 });
      return;
    }

    const lons = locations.map((l) => l.coordinates[0]);
    const lats = locations.map((l) => l.coordinates[1]);

    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const centerLon = (minLon + maxLon) / 2;
    const centerLat = (minLat + maxLat) / 2;

    const maxDiff = Math.max(maxLon - minLon, maxLat - minLat);

    // Heuristic for zoom level
    let zoom = 1;
    if (maxDiff < 20) zoom = 4;
    else if (maxDiff < 60) zoom = 3;
    else if (maxDiff < 120) zoom = 2;
    else zoom = 1;

    setPosition({ coordinates: [centerLon, centerLat], zoom });
  }, [mapId, locations]);

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleReset() {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  }

  function handleMoveEnd(position: { coordinates: [number, number]; zoom: number }) {
    setPosition(position);
  }

  return (
    <div className={cn("w-full h-auto md:h-[600px] border rounded-lg bg-slate-950 overflow-hidden relative", className)}>
      <div className="absolute top-4 left-4 z-10 bg-black/50 p-2 rounded text-white text-sm pointer-events-none">
        <p className="text-xs text-muted-foreground">
          Click on a marker to view the incident file.
        </p>
      </div>

      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
          onClick={handleZoomIn}
          title="Zoom In"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
          onClick={handleReset}
          title="Reset View"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
        }}
        height={600}
        width={800}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          maxZoom={4}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: GeoFeature[] }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1e293b"
                  stroke="#334155"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#334155" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {locations.map(({ name, coordinates, id }) => (
            <Marker
              key={id}
              coordinates={coordinates}
              onClick={() => router.push(`/ a / ${id} `)}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle
                r={4 / position.zoom}
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth={1.5 / position.zoom}
                className="animate-pulse"
              />

              {/* Hover Tooltip */}
              {hovered === name && (
                <text
                  textAnchor="middle"
                  y={-10 / position.zoom}
                  style={{
                    fontFamily: "system-ui",
                    fill: "#ffffff",
                    fontSize: `${10 / position.zoom} px`,
                    fontWeight: "bold",
                    textShadow: "0px 1px 2px rgba(0,0,0,0.8)",
                    pointerEvents: "none",
                  }}
                >
                  {name}
                </text>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
