import {ApiError} from '@smarty-app/core';
import {PromotionRecord} from '@smarty-app/dx-api';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {useCallback} from 'react';

import {useDxApi} from '../dxApiWrapper';

export const promotionsQueryKey = ['promotions'];

/**
 * A hook to fetch the promotions offered to a subscriber.
 *
 * @param msisdn - The subscriber's mobile number.
 * @returns A query result containing the promotions or an error.
 */
export function usePromotionsQuery(
  msisdn?: string,
): UseQueryResult<PromotionRecord[], ApiError> {
  const onRequestPromotions = usePromotionsApiFetchFn();

  return useQuery<PromotionRecord[], ApiError>({
    queryKey: promotionsQueryKey,
    queryFn: ({signal}) => onRequestPromotions(msisdn || '', signal),
  });
}

/**
 * A hook that returns a function to fetch a subscriber's promotions.
 *
 * @returns A function that fetches the promotions for the given msisdn.
 * Throws if the request fails.
 */
export function usePromotionsApiFetchFn(): (
  msisdn: string,
  signal?: AbortSignal,
) => Promise<PromotionRecord[]> {
  const dxApi = useDxApi();

  return useCallback(
    async (msisdn: string, signal?: AbortSignal) => {
      const response = await dxApi.subscriber.subscriberPromoGet(
        {msisdn},
        {signal},
      );
      return response.data ?? [];
    },
    [dxApi],
  );
}
