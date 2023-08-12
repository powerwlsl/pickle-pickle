import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Map from '../components/Map';
import GroupTabs from '../components/GroupTabs';
import List from '../components/List';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import * as Location from 'expo-location';
import axios from 'axios';
import { EXPO_PUBLIC_GOOGLE_API_KEY } from "@env";
export default function HomeScreen() {
  const [currentTab, setCurrentTab] = useState(0);
  const navigation = useNavigation();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [courts, setCourts] = useState([])
  const [searchText, setSearchText] = useState("");
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionClicked, setSuggestionClicked] = useState(false);


  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const [region, setRegion] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 1,
    longitudeDelta: 1,
  })

  const fetchCourts = async (newRegion) => {
    const r = newRegion || region;
    try {
      setIsFetchingLocation(true)
      const { data, error } = await supabase
        .from('courts')
        .select('*')
        .gt('long', r.longitude - r.longitudeDelta)
        .lt('long', r.longitude + r.longitudeDelta)
        .gt('lat', r.latitude - r.latitudeDelta)
        .lt('lat', r.latitude + r.latitudeDelta);

      setIsFetchingLocation(false)
      if (error) throw error;
      // Return an empty array as a default value
      if (data.length === 0) return [];

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

    const newRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 1,
      longitudeDelta: 1,
    }
    setRegion(newRegion)

    fetchCourts(newRegion)
      .then((data) => {
        setCourts(data);
      })

    setIsFetchingLocation(false);
  }

  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  useEffect(() => {
    if (suggestionClicked) {
      setSuggestionClicked(false); // Reset it for future use
      return; // Exit early from the effect
    }

    if (searchText.trim() !== "" && searchText) {
      const handle = setTimeout(() => {
        searchPlace(searchText);
      }, 1000);  // wait for 1 second after user stops typing

      // Cleanup function, it gets called whenever searchText changes.
      return () => {
        clearTimeout(handle);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [searchText]);


  const searchPlace = async (query) => {
    const endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${EXPO_PUBLIC_GOOGLE_API_KEY}&language=ko&region=kr`;

    return axios.get(endpoint)
      .then(response => {
        const results = response.data.results.map((result) => {
          return {
            location: {
              longitude: result.geometry.location.lng,
              latitude: result.geometry.location.lat,
            },
            name: result.formatted_address.replace('대한민국', '')
          }
        })
        setFilteredRegions(results);
        setShowSuggestions(true);
      })
      .catch(error => {
        // Handle error.
        console.error("There was an error!", error);
      });
  }

  const debouncedOnRegionChange = debounce(onRegionChange, 300);

  function onRegionChange(region) {
    setRegion(region)
    fetchCourts(region)
      .then((data) => {
        setCourts(data);
      })
  }

  const handleRegionClick = (region) => {

    setSearchText(region.name);
    setSuggestionClicked(true);
    setShowSuggestions(false);
    setRegion(region.location)
    fetchCourts(region.location)
      .then((data) => {
        setCourts(data);
      })
  }


  if (isLoading) {
    return (
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', zIndex: 1000, backgroundColor: 'rgba(255,255,255,0.8)' }}>
        <ActivityIndicator size="large" color="#3EC795" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#FBFCFF' }} />
      {isFetchingLocation ? (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', zIndex: 1000, backgroundColor: 'rgba(255,255,255,0.8)' }}>
          <ActivityIndicator size="large" color="#3EC795" />
        </View>
      ) : null}
      <GroupTabs onTabChange={handleTabChange} numOfCourts={courts.length} />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSearch}>
            <View style={styles.headerSearchIcon}>
              <FeatherIcon color="#121A26" name="search" size={19} />
            </View>
            <View className="flex-row">
              <TextInput
                autoCapitalize="words"
                autoComplete="name"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                placeholder="서울시 종로구"
                placeholderTextColor="#778599"
                style={styles.headerSearchInput}
              />
              <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
                <TouchableOpacity
                  onPress={handleLocateMe}>
                  <FeatherIcon name="navigation" size={20} color={"blue"} />
                </TouchableOpacity>
              </View>
            </View>

          </View>

          <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
            <TouchableOpacity
              onPress={handleLocateMe}>
              <FeatherIcon name="navigation" size={24} color={"blue"} />
            </TouchableOpacity>
          </View>
          {showSuggestions && (
            <ScrollView style={styles.suggestionsContainer}>
              {filteredRegions.map((region, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => handleRegionClick(region)}
                >
                  <Text>{region.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.placeholder}>
          {currentTab === 0 ?
            <Map
              region={region}
              data={courts}
              onRegionChange={debouncedOnRegionChange}
            />
            :
            <List data={courts} />}
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
    zIndex: 10,
    // marginBottom: 10,
    // marginHorizontal: 24,
    // marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 24,
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    zIndex: 1000, // <-- add a high zIndex
  },

  headerSearchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    // borderRadius: 8,
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
    // shadowOpacity: 0.2,
    // shadowRadius: 8,
    // elevation: 2,
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
    backgroundColor: '#fff',
    paddingRight: 10,
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

  suggestionsContainer: {
    position: 'absolute',
    top: 40, // Adjust this value based on the height of your TextInput
    left: 0,
    right: 0,
    maxHeight: 400,
    zIndex: 1000,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,  // Android Shadow
    shadowColor: '#000',  // iOS Shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});