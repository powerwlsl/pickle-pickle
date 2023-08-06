import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import call from 'react-native-phone-call'
import {useNavigation} from "@react-navigation/native";


let locationsOfInterest = [];

for (let i = 0; i < 20; i++) {
  let location = {
    title: "Location " + (i + 1),
    location: {
      latitude: Math.random() * (38.6 - 33.1) + 33.1,
      longitude: Math.random() * (129.6 - 125.1) + 125.1
    },
    description: "Marker " + (i + 1) + " in Korea",
    image: "https://picsum.photos/200/300"
  };
  locationsOfInterest.push(location);
}



export default function Map({data, long, lat, onRegionChange}) {
  const mapRef = useRef();
  const navigation = useNavigation();

  const showLocationsOfInterest = () => {
    return data.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        >
          <Callout>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', {item})
              }}>
              <View className="p-3">
                <Text className={'font-bold'}>{item.name}</Text>
                <Text className={'mt-3 text-gray-800'}>{item.address}</Text>
                <TouchableOpacity
                  onPress={() => {
                    call({number: item.phone, prompt: false, skipCanOpen: true}).catch(console.error)
                  }}
                  >

                  <Text className={'mt-1 text-blue-600'}>{item.phone}</Text>
                </TouchableOpacity>

                <Text className={'mt-4 text-gray-600'}>{item.description}</Text>
              </View>
            </TouchableOpacity>
            {/*<Button title='Take Snapshot and Share' onPress={takeSnapshotAndShare} />*/}
          </Callout>
        </Marker>
      )
    });
  };

  const takeSnapshotAndShare = async () => {
    const snapshot = await mapRef.current.takeSnapshot({ width: 300, height: 300, result: 'base64' });
    const uri = FileSystem.documentDirectory + "snapshot.png";
    await FileSystem.writeAsStringAsync(uri, snapshot, { encoding: FileSystem.EncodingType.Base64 });
    await shareAsync(uri);
  };

  return (
    <>
      <MapView
        // provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 37.5665,
          latitudeDelta: 1,
          longitude: 126.9780,
          longitudeDelta: 1,
        }}
      >
        {showLocationsOfInterest()}
      </MapView>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  mapOverlay: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 5,
    padding: 16,
    left: "25%",
    width: "50%",
    textAlign: "center"
  },
});
