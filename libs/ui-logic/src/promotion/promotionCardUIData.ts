import {useGetFeaturedPromotion} from '@smarty-app/api-controller';
import {DateFormat, Promotion} from '@smarty-app/core';
import {en} from '@smarty-app/language';
import {useCallback, useMemo} from 'react';

/** What the promotion card shows, as display-ready text. */
export interface PromotionCardUIData {
  title: string;
  voucherCode: string;
  expiry: string;
  supportingText: string;
  supportingStrikethroughText: string;
  priceAccessibilityLabel: string;
}

export interface PromotionCardViewModel {
  promotion?: PromotionCardUIData;
  onGetPromotion: () => void;
  onDismiss: () => void;
}

/**
 * @param promotion - The promotion to show.
 * @returns The promotion as display-ready text.
 */
export function mapPromotionToCardUIData(
  promotion: Promotion,
): PromotionCardUIData {
  const price = promotion.price?.formatPrice() ?? '';
  const originalPrice = promotion.originalPrice?.formatPrice() ?? '';
  const expiryDate = promotion.expiryDate.formatDate(
    DateFormat.DayShortMonthYear,
  );

  return {
    title: promotion.description,
    voucherCode: promotion.voucherCode
      ? `${en.promotionVoucherCode}: ${promotion.voucherCode}`
      : '',
    expiry: expiryDate ? `${en.promotionExpires} ${expiryDate}` : '',
    supportingText: promotion.price ? `${en.promotionPriceNow} ${price}` : '',
    supportingStrikethroughText: originalPrice
      ? `${en.promotionPriceWas} ${originalPrice}`
      : '',
    priceAccessibilityLabel: originalPrice
      ? `${en.promotionPriceNow} ${price}, ${en.promotionPriceWas} ${originalPrice}`
      : price,
  };
}

/**
 * Hook for the promotion card on the Account screen.
 *
 * @returns The promotion to feature, if any, and the card's button handlers.
 */
export function usePromotionCardUIData(): PromotionCardViewModel {
  const {data: promotion} = useGetFeaturedPromotion();

  const uiData = useMemo(
    () => (promotion ? mapPromotionToCardUIData(promotion) : undefined),
    [promotion],
  );

  const onGetPromotion = useCallback(() => {
    // TODO: Implement navigation into the promotion details screen here.
  }, []);

  const onDismiss = useCallback(() => {
    // TODO: Implement dismissing the promotion with an API call invoke.
  }, []);

  return {promotion: uiData, onGetPromotion, onDismiss};
}
