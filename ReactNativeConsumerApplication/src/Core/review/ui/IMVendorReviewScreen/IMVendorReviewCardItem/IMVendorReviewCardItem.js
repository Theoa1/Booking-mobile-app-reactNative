import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'dopenative';
import { Icon } from 'react-native-elements';
import dynamicStylesCard from './styles';

export default function IMVendorReviewCardItem({ singleReview }) {
  const { theme, appearance } = useTheme();
  const styles = dynamicStylesCard(theme, appearance);

  const reviewText =
    singleReview.text.length > 50
      ? singleReview.text.substring(0, 50) + '...'
      : singleReview.text;

  return (
    <View style={styles.reviewContainer}>
      <View style={[styles.horizontalPane, styles.pad]}>
        <FastImage
          source={{ uri: singleReview.authorProfilePic }}
          style={styles.profilePic}
        />
        <View style={{ marginLeft: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.authorName}>{singleReview.authorName}</Text>
            <Text style={{ marginHorizontal: 4 }}>
              {' ('}
              {singleReview.rating}
            </Text>
            <Icon
              size={10}
              type="ionicon"
              name="ios-star-sharp"
              color={theme.colors[appearance].primaryForeground}
            />
            <Text>)</Text>
          </View>
          <Text style={styles.reviewText}>{reviewText}</Text>
        </View>
      </View>
    </View>
  );
}