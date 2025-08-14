/**
 * Convert an object like:
 * {
 *   corporate: { offered: false },
 *   sme: { offered: true }
 * }
 * into:
 * [
 *   { type: "sme", label: "Small and Medium Enterprises (SMEs)" }
 * ]
 */
export function getOfferedList<T extends Record<string, any>>(
  source: T | undefined | null,
  labelMap: Record<string, string>
) {
  if (!source) return [];

  return (
    Object.entries(source)
      // Keep only entries with offered === true
      .filter(([_customerType, customerInfo]) => customerInfo?.offered)
      // Map to a simple structure for v-for
      .map(([customerType]) => ({
        type: customerType,
        label: labelMap[customerType] ?? customerType,
      }))
  );
}
