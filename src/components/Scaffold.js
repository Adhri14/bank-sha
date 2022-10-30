import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    StatusBar,
    SafeAreaView,
    useWindowDimensions,
    ScrollView,
} from 'react-native';

// import Header from '@src/components/Header';
import ScreenIndicator from './ScreenIndicator';
import ScreenEmptyData from './ScreenEmptyData';
// import Popup from 'src/components/Popup';
// import {useColor} from '@src/components/Color';
import { isIphoneNotch, statusBarHeight } from '../utils/Constants';
import StaticColor from '../utils/Colors';
import Header from './Header';

const propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    headerTitle: PropTypes.string,
    showHeader: PropTypes.bool,
    iconRightButton: PropTypes.node,
    fallback: PropTypes.bool,

    empty: PropTypes.bool,
    emptyTitle: PropTypes.string,
    emptyButtonLabel: PropTypes.string,
    emptyButtonColor: PropTypes.string,
    emptyButtonPress: PropTypes.func,

    popupProps: PropTypes.object,
    isLoading: PropTypes.bool,
    style: PropTypes.object,
    useSafeArea: PropTypes.bool,
    translucent: PropTypes.bool,
    statusBarColor: PropTypes.string,
    floatingActionButton: PropTypes.PropTypes.node,
    barStyle: PropTypes.string,
    scrollEnabled: PropTypes.bool,
    contentContainerStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.string,
    ]),
    isLeftButton: PropTypes.bool,
};

const defaultProps = {
    headerTitle: '',
    useSafeArea: true,
    showHeader: false,
    fallback: false,

    empty: false,
    emptyTitle: 'Data tidak tersedia',
    emptyButtonLabel: '',
    emptyButtonPress: () => {},

    popupProps: {
        visible: false,
    },
    isLoading: false,
    style: {},
    translucent: false,
    floatingActionButton: null,
    scrollEnabled: false,
    contentContainerStyle: {},
    isLeftButton: true,
};

const Scaffold = ({
    children,
    header,
    headerTitle,
    useSafeArea,
    translucent,
    statusBarColor,
    showHeader,
    iconRightButton,
    onPressLeftButton,
    fallback,

    empty,
    emptyTitle,
    emptyButtonLabel,
    emptyButtonColor,
    emptyButtonPress,

    popupProps,
    isLoading,
    style,
    floatingActionButton,
    barStyle,
    scrollEnabled,
    contentContainerStyle,
    isLeftButton,
}) => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();

    const MainView = useSafeArea ? SafeAreaView : View;

    return (
        <MainView
            style={{
                flex: 1,
                backgroundColor: StaticColor.backgroundColor,
                ...style,
            }}
        >
            <StatusBar
                translucent={translucent}
                backgroundColor={statusBarColor || StaticColor.backgroundColor}
                barStyle={barStyle || 'dark-content'}
            />
            {translucent && (
                <View
                    style={{
                        height: statusBarHeight,
                        backgroundColor:
                            statusBarColor || StaticColor.backgroundColor,
                    }}
                />
            )}
            {showHeader && header ? (
                header
            ) : showHeader ? (
                <Header
                    title={headerTitle}
                    onPressLeftButton={() =>
                        onPressLeftButton
                            ? onPressLeftButton()
                            : navigation.pop()
                    }
                    iconRightButton={iconRightButton}
                    isLeftButton={isLeftButton}
                />
            ) : null}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    ...contentContainerStyle,
                }}
                scrollEnabled={scrollEnabled}
                showsVerticalScrollIndicator={false}
            >
                {fallback ? (
                    <ScreenIndicator transparent />
                ) : empty && !isLoading ? (
                    <ScreenEmptyData
                        message={emptyTitle}
                        buttonLabel={emptyButtonLabel}
                        buttonColor={emptyButtonColor}
                        onButtonPress={() => emptyButtonPress()}
                    />
                ) : (
                    children
                )}

                {isLoading && (
                    <View
                        style={{
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width,
                            height: translucent
                                ? height + statusBarHeight
                                : height -
                                  (showHeader
                                      ? 60 +
                                        (isIphoneNotch() ? statusBarHeight : 0)
                                      : 0),
                            top: showHeader
                                ? 60 + (isIphoneNotch() ? statusBarHeight : 0)
                                : 0,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                        }}
                    >
                        <ScreenIndicator transparent={false} />
                    </View>
                )}

                {translucent && (
                    <View
                        style={{
                            height: isIphoneNotch() ? statusBarHeight : 0,
                        }}
                    />
                )}

                {floatingActionButton && (
                    <View
                        style={{
                            position: 'absolute',
                            right: 16,
                            bottom: 0,
                            backgroundColor: 'transparent',
                        }}
                    >
                        {floatingActionButton}
                    </View>
                )}

                {/* <Popup isTranslucent={translucent} {...popupProps} /> */}
            </ScrollView>
        </MainView>
    );
};

Scaffold.propTypes = propTypes;
Scaffold.defaultProps = defaultProps;

export default Scaffold;
