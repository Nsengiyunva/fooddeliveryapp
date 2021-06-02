import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY} from '../../constants'

const OrderDelivery = ( { navigation, route } ) => {

    const [ restaurant, setRestaurant ] = useState( null )
    const [ streetName, setStreetName ] = useState( "" )
    const [ fromLocation, setFromLocation ] = useState( null )
    const [ toLocation, setToLocation ] = useState( null )
    const [ region, setRegion ] = useState( null )

    useEffect( () => {
        
        let { restaurant, currentLocation } = route.params

        

        let fromLoc = currentLocation.gps
        let toLoc = restaurant.location
        let street = currentLocation.streetName

        let mapRegion = {
            latitude: ( fromLoc.latitude + toLoc.latitude ) / 2,
            longitude: ( fromLoc.longitude + toLoc.longitude ) / 2,
            latitudeDelta: Math.abs( fromLoc.latitude - toLoc.latitude ) * 2,
            longitudeDelta:  Math.abs( fromLoc.longitude - toLoc.longitude ) * 2,
        }
        
        setRestaurant( restaurant )
        setStreetName( street )
        setFromLocation( fromLoc )
        setToLocation( toLoc )
        setRegion( {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        } )

    }, [])

    function renderMap() {
        return (
            <View style={{ flex: 1}}>
            <MapView
                style={{ flex: 1 }}
            ></MapView>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {renderMap()}
        </View>
    )
}
export default OrderDelivery