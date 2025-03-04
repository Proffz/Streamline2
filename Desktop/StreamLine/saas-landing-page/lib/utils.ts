import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number to have a maximum of 2 decimal places
 * @param value The number to format
 * @param decimals The maximum number of decimal places (default: 2)
 * @returns The formatted number as a string
 */
export function formatNumber(value: number | string | null | undefined, decimals = 2): string {
  // Handle null, undefined, or empty string
  if (value === null || value === undefined || value === "") {
    return "0.00"
  }

  // Convert to number if it's a string
  const num = typeof value === "string" ? Number.parseFloat(value) : value

  // Check if it's a valid number
  if (isNaN(num)) {
    return "0.00"
  }

  // Format the number with the specified number of decimal places
  return num.toFixed(decimals)
}

/**
 * Formats a currency value with the specified currency symbol
 * @param value The number to format
 * @param currency The currency symbol (default: 'SEK')
 * @param decimals The maximum number of decimal places (default: 2)
 * @returns The formatted currency as a string
 */
export function formatCurrency(value: number | string | null | undefined, currency = "SEK", decimals = 2): string {
  return `${currency} ${formatNumber(value, decimals)}`
}

