import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {FontWeight, Typography} from "../../config/typography";
import {Color} from "../../config/Color";

export default function Index(props) {
    const {
        //props style
        header,
        title1,
        title2,
        title3,
        headline,
        body1,
        body2,
        callout,
        subhead,
        footnote,
        caption1,
        caption2,
        overline,
        // props font
        thin,
        ultraLight,
        light,
        regular,
        medium,
        semibold,
        bold,
        heavy,
        black,
        //custom color
        primaryColor,
        darkPrimaryColor,
        lightPrimaryColor,
        accentColor,
        grayColor,
        dividerColor,
        whiteColor,
        fieldColor,
        //numberOfLines
        numberOfLines,
        textAlign,
        //custom
        style,
        //children
        children,
    } = props;

    return (
        <Text
            style={StyleSheet.flatten([
                {textAlign},
                header && Typography.header,
                title1 && Typography.title1,
                title2 && Typography.title2,
                title3 && Typography.title3,
                headline && Typography.headline,
                body1 && Typography.body1,
                body2 && Typography.body2,
                callout && Typography.callout,
                subhead && Typography.subhead,
                footnote && Typography.footnote,
                caption1 && Typography.caption1,
                caption2 && Typography.caption2,
                overline && Typography.overline,
                //custom for font
                thin && StyleSheet.flatten({fontWeight: FontWeight.thin}),
                ultraLight && StyleSheet.flatten({fontWeight: FontWeight.ultraLight}),
                light && StyleSheet.flatten({fontWeight: FontWeight.light}),
                regular && StyleSheet.flatten({fontWeight: FontWeight.regular}),
                medium && StyleSheet.flatten({fontWeight: FontWeight.medium}),
                semibold && StyleSheet.flatten({fontWeight: FontWeight.semibold}),
                bold && StyleSheet.flatten({fontWeight: FontWeight.bold}),
                heavy && StyleSheet.flatten({fontWeight: FontWeight.heavy}),
                black && StyleSheet.flatten({fontWeight: FontWeight.black}),
                // default color
                StyleSheet.flatten({color: Color.textColor}),
                //custom for color
                primaryColor && StyleSheet.flatten({color: Color.primaryColor}),
                darkPrimaryColor && StyleSheet.flatten({color: Color.primaryDarkColor}),
                lightPrimaryColor && StyleSheet.flatten({color: Color.primaryLightColor}),
                accentColor && StyleSheet.flatten({color: Color.accentColor}),
                grayColor && StyleSheet.flatten({color: Color.grayColor}),
                dividerColor && StyleSheet.flatten({color: Color.dividerColor}),
                whiteColor && StyleSheet.flatten({color: Color.whiteColor}),
                fieldColor && StyleSheet.flatten({color: Color.fieldColor}),
                style && style,
            ])}
            numberOfLines={numberOfLines}>
            {children}
        </Text>
    );
}

// Define typechecking
Index.propTypes = {
    //define style
    header: PropTypes.bool,
    title1: PropTypes.bool,
    title2: PropTypes.bool,
    title3: PropTypes.bool,
    headline: PropTypes.bool,
    body1: PropTypes.bool,
    body2: PropTypes.bool,
    callout: PropTypes.bool,
    subhead: PropTypes.bool,
    footnote: PropTypes.bool,
    caption1: PropTypes.bool,
    caption2: PropTypes.bool,
    overline: PropTypes.bool,
    //define font custom
    thin: PropTypes.bool,
    ultraLight: PropTypes.bool,
    light: PropTypes.bool,
    regular: PropTypes.bool,
    medium: PropTypes.bool,
    semibold: PropTypes.bool,
    bold: PropTypes.bool,
    heavy: PropTypes.bool,
    black: PropTypes.bool,
    //custon for text color
    primaryColor: PropTypes.bool,
    darkPrimaryColor: PropTypes.bool,
    lightPrimaryColor: PropTypes.bool,
    accentColor: PropTypes.bool,
    grayColor: PropTypes.bool,
    dividerColor: PropTypes.bool,
    whiteColor: PropTypes.bool,
    fieldColor: PropTypes.bool,
    //numberOfLines
    numberOfLines: PropTypes.number,
    textAlign: PropTypes.string,
    //custom style
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    children: PropTypes.node, // plain text
};

Index.defaultProps = {
    //props for style
    header: false,
    title1: false,
    title2: false,
    title3: false,
    headline: false,
    body1: false,
    body2: false,
    callout: false,
    subhead: false,
    footnote: false,
    caption1: false,
    caption2: false,
    overline: false,
    //props for font
    thin: false,
    ultraLight: false,
    light: false,
    regular: false,
    medium: false,
    semibold: false,
    bold: false,
    heavy: false,
    black: false,
    //custon for text color
    primaryColor: false,
    darkPrimaryColor: false,
    lightPrimaryColor: false,
    accentColor: false,
    grayColor: false,
    dividerColor: false,
    whiteColor: false,
    fieldColor: false,
    //numberOfLines
    numberOfLines: 10,
    textAlign: 'left',
    //custom style
    style: {},
    children: '',
};
