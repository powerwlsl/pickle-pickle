import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput, Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase'

export default function FormScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: '',
    address: '',
    description: '',
    phone: '',
  });

  const handleSubmit = async () => {
    await supabase.from('courts')
      .insert([
        {
          data: JSON.stringify(form),
        }
      ])

    Alert.alert('등록 요청되었습니다.')
    navigation.navigate('Home')
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4EFF3' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backBtn}>
            <FeatherIcon color="#FD6B69" name="arrow-left" size={24} />
          </TouchableOpacity>

          <Text style={styles.title}>피클볼 코트 등록하기</Text>
          <Text className="text-gray-700 mb-10">피클볼 코트를 등록해주시면 확인 후 리스트에 추가해드리겠습니다.</Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>장소명</Text>

              <TextInput
                onChangeText={name => setForm({ ...form, name })}
                placeholder="OO 청소년 센터"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.name}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>전화번호</Text>
              <TextInput
                keyboardType={'phone-pad'}
                onChangeText={phone => setForm({ ...form, phone })}
                placeholder="010-1234-4567"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.phone}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>주소</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                onChangeText={address => setForm({ ...form, address })}
                placeholder="서울시 강남구 역삼동 123-45"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.address}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>부가설명</Text>

              <TextInput
                onChangeText={description => setForm({ ...form, description })}
                placeholder="월요일은 10시부터 12시까지 무료"
                placeholderTextColor="#6b7280"
                multiline={true}
                numberOfLines={4}
                style={styles.multilineInputControl}
                value={form.description}
              />
            </View>


            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>등록요청</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View >
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingHorizontal: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffdada',
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#181818',
    marginBottom: 10,
  },
  form: {
    paddingHorizontal: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    color: '#9fa5af',
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 6,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#24262e',
  },
  multilineInputControl: {
    height: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#24262e',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: '#FD6B68',
    borderColor: '#FD6B68',
  },
});