import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput, ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Map from '../components/Map';
import GroupTabs from '../components/GroupTabs';
import List from '../components/List';
import { useNavigation } from '@react-navigation/native';
import {useQuery} from "@tanstack/react-query";
import {supabase} from "../lib/supabase";
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [currentTab, setCurrentTab] = useState(0);
  const navigation = useNavigation();
  const [long, setLong] = useState(126.9780);
  const [lat, setLat] = useState(37.5665);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [courts , setCourts] = useState([])
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const [region, setRegion] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 1,
    longitudeDelta: 1,
  })

  const fetchCourts = async () => {
    try {
      const { data, error } = await supabase
        .from('courts')
        .select('*')
        .gt('long', region.longitude - region.longitudeDelta)
        .lt('long', region.longitude + region.longitudeDelta)
        .gt('lat', region.latitude - region.latitudeDelta)
        .lt('lat', region.latitude + region.latitudeDelta);

      if (error) throw error;

      return data.map((court) => {
        return {
          ...JSON.parse(court.data),
          location: {
            longitude: court.long,
            latitude: court.lat,
          }
        };
      });
    } catch (error) {
      console.error("Error fetching courts:", error.message);
      return [];  // Return an empty array as a default value
    }
  }


  const { isLoading } = useQuery(['courts'], () => fetchCourts(), {
    onSuccess: (data) => {
      setCourts(data);
    }
  });

  const handleLocateMe = async () => {
    setIsFetchingLocation(true); // Start loading indicator
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setIsFetchingLocation(false);
      return;
    }
    const location = await Location.getCurrentPositionAsync({});

    setLong(location.coords.longitude)
    setLat(location.coords.latitude)
    setIsFetchingLocation(false); // Stop loading indicator once location is fetched

  }

  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }


  function onRegionChange(region) {
    setRegion(region)
    fetchCourts()
      .then((data) => {
        setCourts(data);
      })
  }

  const debouncedOnRegionChange = debounce(onRegionChange, 300);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3EC795" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#FBFCFF' }} />
      {isFetchingLocation ? (
        <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', zIndex: 1000, backgroundColor: 'rgba(255,255,255,0.8)'}}>
          <ActivityIndicator size="large" color="#3EC795" />
        </View>
      ) : null}
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSearch}>
            <View style={styles.headerSearchIcon}>
              <FeatherIcon color="#121A26" name="search" size={19} />
            </View>

            <TextInput
              autoCapitalize="words"
              autoComplete="name"
              placeholder="서울시 종로구"
              placeholderTextColor="#778599"
              style={styles.headerSearchInput}
            />
          </View>

          <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
            <TouchableOpacity
              onPress={handleLocateMe}>
              <FeatherIcon name="navigation" size={24} color={"blue"} />
            </TouchableOpacity>
          </View>
        </View>
        <GroupTabs onTabChange={handleTabChange} numOfCourts={courts.length} />

        <View style={styles.placeholder}>
          {currentTab === 0 ?
            <Map
              data={courts}
              long={long}
              lat={lat}
              onRegionChange={debouncedOnRegionChange}
            />
            :
            <List data={courts}/>}
        </View>
        <TouchableOpacity
          className="absolute w-14 h-14 items-center justify-center right-5 bottom-5 bg-blue-500 rounded-full"
          onPress={() => navigation.navigate('Form')
          }>
          <FeatherIcon name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
    marginHorizontal: 24,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 24,
  },
  container: {
    // padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerSearchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 40,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  headerSearchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
  },
});