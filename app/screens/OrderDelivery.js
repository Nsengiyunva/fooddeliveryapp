import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY} from '../../constants'
import MapViewDirections from 'react-native-maps-directions'


const { width, height } = Dimensions.get( "window" )

const SCREEN_WIDTH = width


const OrderDelivery = ( { navigation, route } ) => {

    const [ restaurant, setRestaurant ] = useState( null )
    const [ streetName, setStreetName ] = useState( "" )
    const [ fromLocation, setFromLocation ] = useState( null )
    const [ toLocation, setToLocation ] = useState( null )
    const [ region, setRegion ] = useState( null )

    useEffect( () => {
        
        let { restaurant, currentLocation } = route.params;

        let fromLoc = currentLocation.gps
        let toLoc = restaurant.location
        let street = currentLocation.streetName

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
        }

        setRestaurant(restaurant)
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)

    }, [])

    function renderMap() {
        const destinationMarker = () => {
            return (
                <Marker
                    coordinate={toLocation}
                >
                    <View style={{
                        height: 40, 
                        width: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white
                    }}>
                        <View style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.primary
                        }}>
                            <Image source={icons.pin} 
                                style={{
                                    width: 25,
                                    height: 24,
                                    tintColor: COLORS.white
                                }}/>
                        </View>
                    </View>
                </Marker>
            )
        }

        const carIcon = () => {
            return (
                <Marker
                    coordinate={fromLocation}
                    anchor={{ x: 0.5, y: 0.5 }}
                    flat={true}>
                    <Image source={icons.car} style={{
                        width: 40,
                        height: 40,
                    }} />
                </Marker>
            )
        }
        return (
            <View style={{ flex: 1}}>
            <MapView
                style={styles.map}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                initialRegion={region}
                provider={PROVIDER_GOOGLE}
            >
                <MapViewDirections 
                    origin={fromLocation} 
                    destination={toLocation}
                    strokeColor={COLORS.primary}
                    strokeWidth={5}
                />
                {destinationMarker()}
                {carIcon()}
            </MapView>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {renderMap()}
        </View>
    )
}
const styles = StyleSheet.create( {
    map: {
        flex: 1
    }
} )
export default OrderDelivery