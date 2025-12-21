"use client"

import * as React from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { useRouter } from "next/navigation"
import type { UfoLocation } from "@/lib/ufo-map"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface UfoMapProps {
    locations: UfoLocation[]
}

export function UfoMap({ locations }: UfoMapProps) {
    const router = useRouter()
    const [hovered, setHovered] = React.useState<string | null>(null)

    return (
        <div className="w-full h-[600px] border rounded-lg bg-slate-950 overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 bg-black/50 p-2 rounded text-white text-sm">
                <h3 className="font-bold">Project Blue Map</h3>
                <p className="text-xs text-muted-foreground">Click on a red marker to view the incident file.</p>
            </div>

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 140,
                }}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }: { geographies: any[] }) =>
                        geographies.map((geo: any) => (
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
                        onClick={() => router.push(`/a/${id}`)}
                        onMouseEnter={() => setHovered(name)}
                        onMouseLeave={() => setHovered(null)}
                        className="cursor-pointer"
                    >
                        <circle r={4} fill="#ef4444" stroke="#ffffff" strokeWidth={1.5} className="animate-pulse" />

                        {/* Hover Tooltip */}
                        {hovered === name && (
                            <text
                                textAnchor="middle"
                                y={-10}
                                style={{
                                    fontFamily: "system-ui",
                                    fill: "#ffffff",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    textShadow: "0px 1px 2px rgba(0,0,0,0.8)",
                                    pointerEvents: "none" // Prevent tooltip from catching events
                                }}
                            >
                                {name}
                            </text>
                        )}
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    )
}
