interface MapViewProps {
  className?: string;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onMapReady?: (map: unknown) => void;
}

export function MapView({ className = "" }: MapViewProps) {
  return (
    <div className={className} aria-label="Mapa de atendimento em Minas Gerais">
      <iframe
        title="Mapa de atendimento Vértice Tecnologia"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-44.35%2C-20.15%2C-43.55%2C-19.65&layer=mapnik&marker=-19.9191%2C-43.9386"
        style={{ border: 0, width: "100%", height: "100%" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
