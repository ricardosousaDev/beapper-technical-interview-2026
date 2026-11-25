import {usePromotionsQuery} from '@smarty-app/api';
import {
  ApiFetch,
  mapPromotionDtoToPromotion,
  Promotion,
} from '@smarty-app/core';
import {useMemo} from 'react';

import {useGetUserDetails} from '../user/userDetails';
import {mapQueryResultToFetchResult} from '../util/common';

/**
 * A hook to fetch the promotion to feature for the current subscriber.
 *
 * @returns An ApiFetch result whose data is the promotion, or undefined if
 * there is none.
 */
export function useGetFeaturedPromotion(): ApiFetch<Promotion> {
  const {data: userDetails} = useGetUserDetails();
  const query = usePromotionsQuery(userDetails?.msisdn || '447700900123');

  const promotion = useMemo(
    () => query.data?.map(mapPromotionDtoToPromotion)[0],
    [query.data],
  );

  return {
    ...mapQueryResultToFetchResult(query),
    data: promotion,
  };
}
