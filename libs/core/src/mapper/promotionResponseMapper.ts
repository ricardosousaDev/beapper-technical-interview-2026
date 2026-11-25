import {PromotionRecord as PromotionDto} from '@smarty-app/dx-api';

import {Promotion} from '../model/promotion';
import {SmartyPrice} from '../model/smartyPrice';
import {
  mapCurrencyDtoToCurrency,
  mapDateStringToSmartyDate,
} from './utilMapper';

/**
 * Maps a promotion from the API to the {@link Promotion} model used in the app.
 *
 * The price to pay is `fixedValueWithDiscount`. The original price,
 * `fixedValue`, is only set when it's higher than the price to pay.
 *
 * @param dto - The promotion from the API.
 * @returns A {@link Promotion}.
 */
export function mapPromotionDtoToPromotion(dto: PromotionDto): Promotion {
  const currency = mapCurrencyDtoToCurrency(dto.currencyCode);
  const priceValue = dto.fixedValueWithDiscount ?? 0;
  const originalValue = dto.fixedValue;
  const hasDiscount =
    priceValue !== undefined &&
    originalValue !== undefined &&
    originalValue > priceValue;

  return {
    description: dto.description?.trim() ?? '',
    voucherCode: dto.voucherCode?.trim() ?? '',
    expiryDate: mapDateStringToSmartyDate(dto.voucherToDate),
    price:
      priceValue !== undefined
        ? new SmartyPrice({value: priceValue, currency})
        : undefined,
    originalPrice: hasDiscount
      ? new SmartyPrice({value: originalValue, currency})
      : undefined,
  };
}
