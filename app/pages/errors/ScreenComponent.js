/**
 * Project YooLearn
 * File index
 * Path app/components/Screen
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import React from 'react';
import {SafeAreaView} from 'react-native';
import { NetWork } from './netWork';
import COLORS from '../../consts/colors';

export const ScreenComponent = React.forwardRef((props, ref) => (
    <SafeAreaView style={[{flex: 1, backgroundColor: COLORS.primary}, props.style]} {...props}>
        <NetWork/>
        {/* React.Children.map(props.children, child =>
                React.cloneElement(child, {}),
            ) */}
        {props.children}
    </SafeAreaView>
));
