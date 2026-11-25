import {
  cn,
  SmartyCallToAction,
  SmartyDismissButton,
  SmartyText,
} from '@smarty-app/controls-basic';
import {JSX} from 'react';
import {View} from 'react-native';

export interface SmartyPromoCardProps {
  title: string;
  subtitle?: string;
  caption?: string;
  supportingText?: string;
  supportingStrikethroughText?: string;
  supportingAccessibilityLabel?: string;
  ctaLabel: string;
  onCtaPress: () => void;
  onDismiss?: () => void;
  className?: string;
  testID?: string;
}

/**
 * A promotional card: a coloured panel with a headline and up to two lines of
 * detail, an optional dismiss button, and a footer with supporting text and a
 * call to action.
 *
 * @param props - Component props {@link SmartyPromoCardProps}.
 * @returns A React element.
 */
export function SmartyPromoCard(props: SmartyPromoCardProps): JSX.Element {
  const {
    title,
    subtitle,
    caption,
    supportingText,
    supportingStrikethroughText,
    supportingAccessibilityLabel,
    ctaLabel,
    onCtaPress,
    onDismiss,
    className,
    testID = 'promo-card',
  } = props;

  const hasSupportingText = !!supportingText || !!supportingStrikethroughText;

  return (
    <View
      testID={testID}
      // w-1/2 just for demonstration purposes.
      className={cn('w-1/2 smarty-rounded-2xl overflow-hidden', className)}>
      <View
        className="flex-row items-start smarty-p-2xl smarty-pb-3xl smarty-gap-m"
        style={{backgroundColor: '#82c7ff'}}>
        <View
          className="flex-1 smarty-gap-m"
          accessible={true}
          accessibilityRole="header"
          accessibilityLabel={[title, subtitle, caption]
            .filter(Boolean)
            .join(', ')}>
          <SmartyText
            testID={`${testID}-title`}
            className="smarty-heading-l text-brand-slate-800">
            {title}
          </SmartyText>
          <View className="smarty-gap-xs">
            {subtitle && (
              <SmartyText
                testID={`${testID}-subtitle`}
                className="smarty-body-l text-brand-slate-800">
                {subtitle}
              </SmartyText>
            )}
            {caption && (
              <SmartyText
                testID={`${testID}-caption`}
                className="smarty-body-m text-brand-slate-800">
                {caption}
              </SmartyText>
            )}
          </View>
        </View>
        {onDismiss && (
          <SmartyDismissButton
            testID={`${testID}-dismiss`}
            showBackground={true}
            onPress={onDismiss}
          />
        )}
      </View>

      <View className="flex-row items-center bg-background-tertiary smarty-px-2xl smarty-py-l smarty-gap-m">
        <View
          className="flex-1 flex-row flex-wrap items-baseline smarty-gap-x-m"
          accessible={hasSupportingText}
          accessibilityLabel={supportingAccessibilityLabel}>
          {supportingText && (
            <SmartyText
              testID={`${testID}-supporting-text`}
              className="smarty-body-l text-foreground-primary">
              {supportingText}
            </SmartyText>
          )}
          {supportingStrikethroughText && (
            <SmartyText
              testID={`${testID}-supporting-strikethrough-text`}
              className="smarty-body-m text-foreground-secondary line-through">
              {supportingStrikethroughText}
            </SmartyText>
          )}
        </View>
        <SmartyCallToAction
          className="self-center"
          testID={`${testID}-cta`}
          accessibilityRole="button"
          accessibilityLabel={ctaLabel}
          onPress={onCtaPress}>
          {ctaLabel}
        </SmartyCallToAction>
      </View>
    </View>
  );
}
