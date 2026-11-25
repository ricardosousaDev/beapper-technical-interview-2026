import {SmartyDate} from './smartyDate';
import {SmartyPrice} from './smartyPrice';

/** A promotion offered to the subscriber, redeemed with a voucher code. */
export interface Promotion {
  description: string;
  voucherCode: string;
  expiryDate: SmartyDate;
  price?: SmartyPrice;
  /** Only set when there is a discount. */
  originalPrice?: SmartyPrice;
}

/**
 * @param promotion - The promotion to check.
 * @param now - The time to check against. Defaults to now.
 * @returns True if the promotion's voucher hasn't expired. A promotion with no
 * expiry date never expires.
 */
export function isPromotionActive(
  promotion: Promotion,
  now: Date = new Date(),
): boolean {
  const expiry = promotion.expiryDate.date;
  return !expiry || expiry.getTime() >= now.getTime();
}
