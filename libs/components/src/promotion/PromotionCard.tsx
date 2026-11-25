import {SmartyPromoCard} from '@smarty-app/controls';
import {usePromotionCardUIData} from '@smarty-app/ui-logic';
import {JSX} from 'react';

interface PromotionCardProps {
  className?: string;
  testID?: string;
}

/**
 * The subscriber's featured promotion, with its voucher code, expiry date and
 * price. Renders nothing if there is no promotion to show.
 *
 * @param props - Component props.
 * @returns A React element, or null.
 */
export function PromotionCard(props: PromotionCardProps): JSX.Element | null {
  const {className, testID = 'promotion-card'} = props;
  const {promotion, onGetPromotion, onDismiss} = usePromotionCardUIData();

  if (!promotion) {
    return null;
  }

  return (
    <SmartyPromoCard
      testID={testID}
      className={className}
      title={promotion.title}
      subtitle={promotion.voucherCode}
      caption={promotion.expiry}
      supportingText={promotion.supportingText}
      supportingStrikethroughText={promotion.supportingStrikethroughText}
      supportingAccessibilityLabel={promotion.priceAccessibilityLabel}
      ctaLabel="Get promotion"
      onCtaPress={onGetPromotion}
      onDismiss={onDismiss}
    />
  );
}
