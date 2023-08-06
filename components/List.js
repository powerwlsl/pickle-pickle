import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'
import FeatherIcon from "react-native-vector-icons/Feather";
import call from 'react-native-phone-call'

const items = [
  {
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    address: '225 Talbot Street Trumbull, CT 06611',
    bedrooms: 4,
    sqft: 1250,
    price: 2550,
  },
  {
    img: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    address: '998 Hillcrest Street Cookeville, TN 38501',
    bedrooms: 2,
    sqft: 800,
    price: 1725,
  },
  {
    img: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    address: '15 Santa Clara Street Antioch, TN 37013',
    bedrooms: 3,
    sqft: 920,
    price: 2200,
  },
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2350&q=80',
    address: '8757 Sunbeam Street Fullerton, CA 92831',
    bedrooms: 5,
    sqft: 2400,
    price: 6700,
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    address: '468 E. Atlantic Dr. Passaic, NJ 07055',
    bedrooms: 3,
    sqft: 1975,
    price: 5650,
  },
  {
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    address: '954 Bishop St. Capitol Heights, MD 20743',
    bedrooms: 2,
    sqft: 925,
    price: 2250,
  },
];

export default function List({data}) {
  const navigation = useNavigation()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item, index) => {
        return (
          <View
            key={index}
            style={[
              styles.cardWrapper,
              index === 0 && { borderTopWidth: 0 },
            ]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', { item });
              }}>
              <View style={styles.card}>
                {/*<Image*/}
                {/*  alt=""*/}
                {/*  resizeMode="cover"*/}
                {/*  source={{ uri: img }}*/}
                {/*  style={styles.cardImg}*/}
                {/*/>*/}

                <View >
                  <Text className="font-bold text-lg">
                    {item.name}
                  </Text>

                  <View className="mt-2">
                    <View className={"flex-row"}>
                      <FeatherIcon color="#7B7C7E" name="map-pin" size={14} />

                      <Text className="ml-2 text-gray-800">
                        {item.address}
                      </Text>
                    </View>
                    <View className={"flex-row mt-2"}>
                      <FeatherIcon color="#7B7C7E" name="phone" size={14} />
                      <TouchableOpacity
                        onPress={() => {
                          call({number: item.phone, prompt: false, skipCanOpen: true}).catch(console.error)
                        }}
                      >
                        <Text className="ml-2 text-blue-600">
                          {item.phone}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View className={"mt-4"}>

                      <Text className="text-gray-600">
                        {item.description}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.cardPrice}>
                    {/*${price.toLocaleString('en-US')} / month*/}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  cardWrapper: {
    paddingVertical: 16,
    borderTopWidth: 2,
    borderColor: '#e6e7e8',
  },
  cardImg: {
    width: 88,
    height: 88,
    borderRadius: 12,
    marginRight: 16,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingVertical: 4,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    color: '#222',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: -6,
  },
  cardRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  cardRowItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#173153',
    marginLeft: 4,
  },
  cardPrice: {
    fontSize: 19,
    fontWeight: '700',
    color: '#173153',
  },
});