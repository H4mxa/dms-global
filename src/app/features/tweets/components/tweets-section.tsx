import Avatar from '@components/Avatar';
import {Text, View} from '@rn-core';
import React, {memo, useCallback} from 'react';
import isEqual from 'react-fast-compare';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {IFeed} from '@redux/tweets/types';
import {tweetActionTypes} from '../types';
import {execFunc} from '@common/method';

interface TweetsComponentProps {
  firstName: IFeed['user']['first_name'];
  companyName: IFeed['user']['company_name'];
  profileImageUrl: IFeed['user']['profile_image_url'];
  tweetText: React.JSX.Element;
  likes_count: IFeed['likes_count'];
  hourMinute: string;
  onPress: (eventType: tweetActionTypes) => void;
}

const TweetsComponent: React.FC<TweetsComponentProps> = ({
  firstName,
  companyName,
  profileImageUrl,
  likes_count,
  tweetText,
  hourMinute,
  onPress,
}) => {
  const {theme} = useStyles();

  const renderBottomIcons = useCallback(
    (name: string, text: string | number, eventType: tweetActionTypes) => {
      return (
        <View style={{gap: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => execFunc(onPress, eventType)}>
            {name === 'retweet' ? (
              <FontAwesome
                name={name}
                size={18}
                color={theme.color.dark_gray}
              />
            ) : (
              <MaterialCommunityIcons
                name={name}
                size={18}
                color={theme.color.dark_gray}
              />
            )}
            <Text style={{marginLeft: 5, color: theme.color.dark_gray}}>
              {text}
            </Text>
          </TouchableOpacity>
        </View>
      );
    },
    [onPress, theme.color.dark_gray],
  );

  return (
    <View style={[{backgroundColor: theme.color.white}, {paddingBottom: 15}]}>
      <View style={{flexDirection: 'row'}}>
        <Avatar size={50} photo={profileImageUrl} />

        <View style={{marginLeft: 10, flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: theme.color.text,
                }}>
                {firstName}
              </Text>
              <Text style={{paddingLeft: 5, color: theme.color.dark_gray}}>
                {companyName}
              </Text>
              <View
                style={{
                  backgroundColor: theme.color.dark_gray,
                  marginHorizontal: 4,
                  width: 1.5,
                  height: 1.5,
                  borderRadius: 3,
                }}
              />
              <Text style={{color: theme.color.dark_gray}}>{hourMinute}</Text>
            </View>
          </View>
          <View style={{flex: 1}}>{tweetText}</View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '80%',
              marginTop: 15,
            }}>
            {renderBottomIcons(
              'comment-outline',
              Math.floor(Math.random() * (1000 - 0 + 1)) + 0,
              'comment',
            )}
            {renderBottomIcons(
              'retweet',
              Math.floor(Math.random() * (100 - 0 + 1)) + 0,
              'retweet',
            )}
            {renderBottomIcons('heart-outline', likes_count.toString(), 'like')}
            {renderBottomIcons(
              'share-outline',
              Math.floor(Math.random() * (100 - 0 + 1)) + 0,
              'share',
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export const TweetsSection = memo(TweetsComponent, isEqual);
