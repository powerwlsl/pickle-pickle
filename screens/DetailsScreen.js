import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from "@react-navigation/native";
import call from 'react-native-phone-call'

const IMAGES = [
  'https://assets.withfra.me/Detailed.4--hero.png',
  'https://images.unsplash.com/photo-1639358336404-b847ac2a3272?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  'https://images.unsplash.com/photo-1652509525608-6b44097ea5a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHRlc2xhJTIwbW9kZWwlMjBzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
];

export default function DetailsScreen() {
  const route = useRoute();
  const {item: court} = route.params;
  const navigation = useNavigation();
  const [value, setValue] = React.useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
      <View style={styles.actions}>
        <SafeAreaView>
          <View style={styles.actionWrapper}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginRight: 'auto' }}>
              <View style={styles.action}>
                <FeatherIcon color="#242329" name="chevron-left" size={20} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.action}>
                <FeatherIcon color="#242329" name="share" size={18} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.action}>
                <FeatherIcon color="#242329" name="heart" size={18} />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/*<View style={styles.photos}>*/}
        {/*  <Swiper*/}
        {/*    renderPagination={(index, total) => (*/}
        {/*      <View style={styles.photosPagination}>*/}
        {/*        <Text style={styles.photosPaginationText}>*/}
        {/*          {index + 1} / {total}*/}
        {/*        </Text>*/}
        {/*      </View>*/}
        {/*    )}>*/}
        {/*    {IMAGES.map((src, index) => (*/}
        {/*      <View key={src} style={{ flex: 1 }}>*/}
        {/*        <Image alt="" source={{ uri: src }} style={styles.photosImg} />*/}
        {/*      </View>*/}
        {/*    ))}*/}
        {/*  </Swiper>*/}
        {/*</View>*/}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{court.name}</Text>

          <View style={styles.headerRow}>
            <View style={styles.headerLocation}>
              <FeatherIcon color="#7B7C7E" name="map-pin" size={14} />

              <Text style={styles.headerLocationText}>
                {court.address}
              </Text>
            </View>

            {/*<Text style={styles.headerPrice}>$650.00</Text>*/}
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerLocation}>
              <FeatherIcon color="#7B7C7E" name="phone" size={14} />

              <TouchableOpacity
                onPress={() => {
                  call({number: court.phone, prompt: false, skipCanOpen: true}).catch(console.error)
                }}
              >
                <Text style={styles.headerPhoneText}>
                  {court.phone}
                </Text>
              </TouchableOpacity>
            </View>

            {/*<Text style={styles.headerPrice}>$650.00</Text>*/}
          </View>

          {/*<View style={styles.headerRow}>*/}
          {/*  <View style={styles.headerStars}>*/}
          {/*    <FontAwesome color="#f26463" name="star" solid={true} size={14} />*/}

          {/*    <FontAwesome color="#f26463" name="star" solid={true} size={14} />*/}

          {/*    <FontAwesome color="#f26463" name="star" solid={true} size={14} />*/}

          {/*    <FontAwesome color="#f26463" name="star" solid={true} size={14} />*/}

          {/*    <FontAwesome color="#f26463" name="star" size={14} />*/}

          {/*    <Text style={styles.headerStarsText}>20 reviews</Text>*/}
          {/*  </View>*/}

          {/*  <Text style={styles.headerDistance}>4.6 miles</Text>*/}
          {/*</View>*/}
        </View>
        {/*<View style={styles.picker}>*/}
        {/*  <TouchableOpacity*/}
        {/*    onPress={() => {*/}
        {/*      // handle onPress*/}
        {/*    }}*/}
        {/*    style={styles.pickerDates}>*/}
        {/*    <FeatherIcon color="#242329" name="calendar" size={16} />*/}

        {/*    <Text style={styles.pickerDatesText}>11 Mar - 12 Mar</Text>*/}
        {/*  </TouchableOpacity>*/}

        {/*  <View style={styles.pickerFilterWrapper}>*/}
        {/*    <TouchableOpacity*/}
        {/*      onPress={() => {*/}
        {/*        // handle onPress*/}
        {/*      }}*/}
        {/*      style={styles.pickerFilter}>*/}
        {/*      <View style={styles.pickerFilterItem}>*/}
        {/*        <FontAwesome color="#242329" name="bed" size={16} />*/}

        {/*        <Text style={styles.pickerFilterItemText}>1</Text>*/}
        {/*      </View>*/}

        {/*      <View style={styles.pickerFilterItem}>*/}
        {/*        <FeatherIcon color="#242329" name="users" size={16} />*/}

        {/*        <Text style={styles.pickerFilterItemText}>2</Text>*/}
        {/*      </View>*/}
        {/*    </TouchableOpacity>*/}
        {/*  </View>*/}
        {/*</View>*/}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          >
          <View style={styles.stats} className={"space-x-5"}>
            <View style={styles.statsItem}>
              <FontAwesome color="#7B7C7E" name="wifi" size={15} />

              <Text style={styles.statsItemText}>야외</Text>
            </View>

            <View style={styles.statsItem}>
              <FontAwesome color="#7B7C7E" name="car" size={15} />

              <Text style={styles.statsItemText}>무료</Text>
            </View>
            <View style={styles.statsItem}>
              <FontAwesome color="#7B7C7E" name="car" size={15} />

              <Text style={styles.statsItemText}>무료</Text>
            </View>
            <View style={styles.statsItem}>
              <FontAwesome color="#7B7C7E" name="car" size={15} />

              <Text style={styles.statsItemText}>무료</Text>
            </View>
            <View style={styles.statsItem}>
              <FontAwesome color="#7B7C7E" name="car" size={15} />

              <Text style={styles.statsItemText}>무료</Text>
            </View>

            <View style={styles.statsItem}>
              <FontAwesome color="#7B7C7E" name="coffee" size={15} />

              <Text style={styles.statsItemText}>기타</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.about}>
          <Text style={styles.aboutTitle}>상세정보</Text>

          <Text style={styles.aboutDescription}>
            {court.description}
          </Text>
        </View>
      </ScrollView>

      {/*<View style={styles.overlay}>*/}
      {/*  <View style={styles.footer}>*/}
      {/*    <TouchableOpacity*/}
      {/*      onPress={() => {*/}
      {/*        // handle onPress*/}
      {/*      }}>*/}
      {/*      <View style={styles.btn}>*/}
      {/*        <Text style={styles.btnText}>길찾기</Text>*/}
      {/*      </View>*/}
      {/*    </TouchableOpacity>*/}

      {/*    <TouchableOpacity*/}
      {/*      onPress={() => {*/}
      {/*        // handle onPress*/}
      {/*      }}*/}
      {/*      style={{ flex: 1, paddingHorizontal: 8 }}>*/}
      {/*      <View style={styles.btnSecondary}>*/}
      {/*        <Text style={styles.btnSecondaryText}>Book a travel</Text>*/}
      {/*      </View>*/}
      {/*    </TouchableOpacity>*/}
      {/*  </View>*/}
      {/*</View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  actions: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: -8,
    marginBottom: 12,
  },
  photos: {
    paddingTop: 6,
    paddingHorizontal: 20,
    marginTop: 12,
    position: 'relative',
    height: 240,
    overflow: 'hidden',
    borderRadius: 12,
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: '100%',
    height: 240,
    borderRadius: 12,
  },
  photosPagination: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#242329',
    borderRadius: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  photosPaginationText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#ffffff',
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#242329',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  headerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLocationText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
    marginLeft: 4,
  },
  headerPhoneText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#0C62E0',
    marginLeft: 4,
  },
  headerPrice: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    textAlign: 'right',
    color: '#f26463',
  },
  headerStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerStarsText: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  headerDistance: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  picker: {
    marginTop: 6,
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderStyle: 'solid',
    borderRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerDates: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerDatesText: {
    marginLeft: 8,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#242329',
  },
  pickerFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerFilterWrapper: {
    borderLeftWidth: 1,
    borderColor: '#e5e5e5',
    paddingLeft: 12,
  },
  pickerFilterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  pickerFilterItemText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: '#242329',
    marginLeft: 4,
  },
  stats: {
    marginVertical: 16,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsItemText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#242329',
    marginLeft: 7,
  },
  about: {
    marginHorizontal: 20,
  },
  aboutTitle: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#242329',
    marginBottom: 4,
  },
  aboutDescription: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  footer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderWidth: 1,
    backgroundColor: '#242329',
    borderColor: '#242329',
    height: 52,
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#F26463',
    borderColor: '#F26463',
    height: 52,
  },
  btnSecondaryText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
  action: {
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderStyle: 'solid',
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  tabsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  tabsItemLine: {
    width: 20,
    height: 3,
    backgroundColor: '#f26463',
    borderRadius: 24,
  },
  tabsItemWrapper: {
    marginRight: 28,
  },
  tabsItemText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#7b7c7e',
  },
});