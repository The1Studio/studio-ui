import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '@repo/core';
import type { AvatarProps, AvatarSize, AvatarVariant } from '../../../primitives';
import { useAvatar } from '../../../primitives';

export type { AvatarProps, AvatarSize, AvatarVariant };

export function Avatar({
  imageUrl,
  name = '',
  size = 'md',
  variant = 'circle',
  showName = false,
  namePosition = 'right',
  backgroundColor,
  textColor,
  style,
  imageStyle,
  nameStyle,
  initialsStyle,
}: AvatarProps) {
  const {
    avatarSize,
    fontSize,
    nameFontSize,
    borderRadius,
    hasValidImage,
    initials,
    bgColor,
    setImageError,
  } = useAvatar({ imageUrl, name, size, variant, backgroundColor });

  const avatarStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius,
    backgroundColor: hasValidImage ? colors.border : bgColor,
  };

  const renderAvatar = () => (
    <View style={[styles.avatarContainer, avatarStyle]}>
      {hasValidImage ? (
        <Image
          source={{ uri: imageUrl! }}
          style={[
            styles.image,
            { width: avatarSize, height: avatarSize, borderRadius },
            imageStyle,
          ]}
          onError={() => setImageError(true)}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={[
            styles.initials,
            { fontSize, color: textColor || '#ffffff' },
            initialsStyle,
          ]}
        >
          {initials}
        </Text>
      )}
    </View>
  );

  if (!showName || !name) {
    return <View style={style}>{renderAvatar()}</View>;
  }

  const isHorizontal = namePosition === 'right';

  return (
    <View
      style={[
        styles.container,
        isHorizontal ? styles.containerHorizontal : styles.containerVertical,
        style,
      ]}
    >
      {renderAvatar()}
      <Text
        style={[
          styles.name,
          { fontSize: nameFontSize },
          isHorizontal ? styles.nameRight : styles.nameBottom,
          nameStyle,
        ]}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
}

// Avatar with only image (convenience component)
export function AvatarImage(props: Omit<AvatarProps, 'showName'>) {
  return <Avatar {...props} showName={false} />;
}

// Avatar with name displayed
export function AvatarWithName(
  props: Omit<AvatarProps, 'showName'> & { namePosition?: 'right' | 'bottom' }
) {
  return <Avatar {...props} showName={true} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerHorizontal: {
    flexDirection: 'row',
  },
  containerVertical: {
    flexDirection: 'column',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontWeight: '600',
    textAlign: 'center',
  },
  name: {
    color: colors.text,
    fontWeight: '500',
  },
  nameRight: {
    marginLeft: 12,
  },
  nameBottom: {
    marginTop: 8,
    textAlign: 'center',
  },
});
