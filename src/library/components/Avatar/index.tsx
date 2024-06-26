import React from 'react';
import {View, Image} from 'react-native';

const Avatar = function (props: any) {
  if (props.photo) {
    let size = 30;
    if (props.size) size = props.size;

    return (
      <Image
        style={[
          {
            height: size,
            width: size,
            borderRadius: size / 2,
          },
          props.style,
        ]}
        resizeMode={'contain'}
        source={{uri: props.photo}}
      />
    );
  }

  let avatarSize = 30;
  if (props.size) avatarSize = props.size;

  let headSize = avatarSize;
  return (
    <View
      style={[
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize * 2,
          backgroundColor: '#D46287',
          alignItems: 'center',
        },
        props.style,
      ]}>
      <View
        style={{
          width: avatarSize / 3,
          height: avatarSize / 3,
          borderRadius: headSize * 2,
          marginTop: avatarSize / 10,
          backgroundColor: '#D46287',
        }}
      />
      <View
        style={{
          width: avatarSize / 1.7,
          height: avatarSize / 2.5,
          borderRadius: 16.5,
          marginTop: avatarSize / 15,
          backgroundColor: '#D46287',
        }}
      />
    </View>
  );
};

export default Avatar;
