import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

export default function RenderLoader() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={{ fontSize: 17 }}>Chargement</Text>
            </View>
        )
      }
    