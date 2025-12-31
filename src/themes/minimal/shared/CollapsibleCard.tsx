import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../tokens';
import {
  useCollapsibleCard,
  type CollapsibleCardProps,
} from '../../../primitives';
import ArrowDownIcon from '../icons/ArrowDownIcon';

export { type CollapsibleCardProps };

export function CollapsibleCard(props: CollapsibleCardProps) {
  const {
    title,
    children,
    containerStyle,
    headerStyle,
    titleStyle,
    contentStyle,
    renderHeaderRight,
  } = props;

  const { isExpanded, isDisabled, rotation, toggleExpand, accessibilityProps } =
    useCollapsibleCard(props);

  return (
    <View
      style={[
        styles.container,
        isDisabled && styles.containerDisabled,
        containerStyle,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleExpand}
        disabled={isDisabled}
        style={[styles.header, headerStyle]}
        {...accessibilityProps}
      >
        <Text
          style={[
            styles.title,
            isDisabled && styles.titleDisabled,
            titleStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View style={styles.headerRight}>
          {renderHeaderRight?.()}
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <ArrowDownIcon
              color={isDisabled ? colors.textSecondary : colors.text}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    width: '100%',
  },
  containerDisabled: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  titleDisabled: {
    color: colors.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
});

export default CollapsibleCard;
