import { getAirlineBrand, getCarrierMonogram } from "@/lib/airline-brand";

type Props = {
  carrierCode: string;
  airlineName?: string;
  compact?: boolean;
  showName?: boolean;
};

export function AirlineIdentity({ carrierCode, airlineName, compact = false, showName = true }: Props) {
  const brand = getAirlineBrand(carrierCode, airlineName);
  const monogram = getCarrierMonogram(carrierCode);

  return (
    <div className={`airline-identity ${compact ? "compact" : ""}`}>
      <span
        className="airline-mark"
        aria-hidden
        style={{
          background: `linear-gradient(135deg, ${brand.colorFrom} 0%, ${brand.colorTo} 100%)`,
        }}
      >
        {monogram}
      </span>
      <span>
        <strong className="airline-code">{brand.carrierCode}</strong>
        {showName ? <span className="airline-name">{brand.displayName}</span> : null}
      </span>
    </div>
  );
}
