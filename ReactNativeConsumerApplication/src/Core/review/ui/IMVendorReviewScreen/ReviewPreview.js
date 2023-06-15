import { View, FlatList, StyleSheet, Text } from 'react-native'; // Import Text
import IMVendorReviewCardItem from './IMVendorReviewCardItem/IMVendorReviewCardItem';
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { useReviewMutations, useReviews } from '../../api';
import FastImage from 'react-native-fast-image';
import { useTheme, useTranslations } from 'dopenative';
import { useVendorConfig } from '../../../vendor/hooks/useVendorConfig';

function ReviewPreview({ entityId }) {
  const { config } = useVendorConfig();
  const { theme } = useTheme();
  const { loading, reviews } = useReviews(config.tables?.vendorReviewsTableName, entityId);

  const renderSingleReview = ({ item, index }) => (
    <IMVendorReviewCardItem
      singleReview={item?.singleReview}
      key={`${item?.id ?? index}`}
    />
  );

  return (
    <View style={styles.container}>
      {!loading && reviews.length === 0 && (
        <View style={styles.noReviews}>
          {/* Add a message here indicating "No Reviews" */}
          <Text style={styles.noReviewsText}>Ooops, this vender doesn't have any reviews yet</Text>
        </View>
      )}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={reviews.slice(0, 5)} // Show only first 5 reviews as a preview
        renderItem={renderSingleReview}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: theme.spaces.m }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  noReviews: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default ReviewPreview;