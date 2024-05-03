import { View, Text, ProgressBarAndroidBase, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

export default function RenderLoader() {
        return(
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    {Platform.OS === 'android'
                        ?
                        (
                            <>
                                <ProgressBarAndroidBase size="large" color={COLORS.primary}/>
                                <Text style={{fontSize: 17}}>Chargement</Text>
                            </>
                        ) :
                        <>
                            <ActivityIndicator size="large" color={COLORS.primary}/>
                            <Text style={{fontSize: 17}}>Chargement</Text>
                        </>
                    }
                </View>
        )
      }
    