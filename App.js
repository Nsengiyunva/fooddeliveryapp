import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, StackActions } from '@react-navigation/native'

import { Home, Restaraunt, OrderDelivery } from './app/screens'

import Tabs from './navigation/Tabs'

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}
            initialRouteName={"Home"}>
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="Restaraunt" component={Restaraunt} />
                <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App