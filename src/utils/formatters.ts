/**
 * Price formatting according to Indian Rupee standard format
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercentage(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Format delivery estimate based on deliveryDays
 */
export function getDeliveryEstimate(deliveryDays: number): string {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + deliveryDays);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  
  return targetDate.toLocaleDateString('en-IN', options);
}

/**
 * Validate Indian 6-digit PIN code
 */
export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}
