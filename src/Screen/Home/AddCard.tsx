import React,{ useState } from 'react';

import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Header from '../../Components/Header';
import card from '../../Assets/Images/card.png';
import styles from './styles.js';
import CustomText from '../../../CustomText';
import SelectBox from '../Home/SelectBox/SelectBox';


const AddCard = () => {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [cardnum, setCardnum] = useState('');
    const [cardpw, setCardpw] = useState('');
    const [phone, setPhone] = useState('');

    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+82');

    const cardnumRegex = /^\d{16}$/;
    const passwordRegex = /^\d{4}$/;

    const countryCodes = [
      { label: 'United States (+1)', value: '+1' },
      { label: 'Canada (+1)', value: '+1' },
      { label: 'United Kingdom (+44)', value: '+44' },
      { label: 'Australia (+61)', value: '+61' },
      { label: 'South Korea (+82)', value: '+82' },
      { label: 'Japan (+81)', value: '+81' },
      { label: 'China (+86)', value: '+86' },
      { label: 'Germany (+49)', value: '+49' },
      { label: 'France (+33)', value: '+33' },
    ];

    const years = Array.from({ length: 20 }, (_, i) => ({
      label: `${currentYear + i}`,
      value: currentYear + i,
    }));
    const months = Array.from({ length: 12 }, (_, i) => ({
      label: `${i + 1}`,
      value: i + 1,
    }));
    const days = Array.from({ length: 31 }, (_, i) => ({
      label: `${i + 1}`,
      value: i + 1,
    }));

    const Registration = () => {
      if(!name || !cardnum || !cardpw || !phone){
        Alert.alert('입력 오류', '모든 내용을 입력해주세요');
        return;
      }

      if(!cardnumRegex.test(cardnum)){
        Alert.alert('카드 번호 확인', '16자리의 숫자로 입력하세요');
        return;
      }

      if(!passwordRegex.test(cardpw)){
        Alert.alert('카드 비밀번호 확인', '4자리의 숫자로 입력하세요');
        return;
      }

      Alert.alert('카드 등록 성공', '카드 등록이 완료되었습니다');
      navigation.navigate('Main');
    }

    return (
      <SafeAreaView>
        <ScrollView>
            <Header title="카드 추가"/>
            <View style={styles.common_area}>
              <View style={styles.card_img_box}>
                <Image source={card} style={styles.card_img}/>
              </View>
              <View>
                <View style={styles.card_each}>
                  <CustomText style={styles.card_tit}>이름</CustomText>
                  <TextInput 
                    placeholder='이름을 입력해주세요'
                    style={styles.card_input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                  />
                </View>

                <View style={styles.card_each}>
                  <CustomText style={styles.card_tit}>카드 번호</CustomText>
                  <TextInput 
                    placeholder='카드 번호를 입력해주세요'
                    style={styles.card_input}
                    value={cardnum}
                    onChangeText={(text) => {
                      const numericText = text.replace(/[^0-9]/g, '');
                      setCardnum(numericText)
                    }}
                    
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.card_each}>
                  <CustomText style={styles.card_tit}>만료일</CustomText>
                  <View style={styles.sel_container}>
                    <View style={styles.picker_container}>
                      <SelectBox
                        options={years}
                        selectedValue={selectedYear}
                        onValueChange={setSelectedYear}
                      />
                    </View>

                    <View style={styles.picker_container}>
                      <SelectBox
                        options={months}
                        selectedValue={selectedMonth}
                        onValueChange={setSelectedMonth}
                      />
                    </View>

                    <View style={styles.picker_container}>
                      <SelectBox
                        options={days}
                        selectedValue={selectedDay}
                        onValueChange={setSelectedDay}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.card_each}>
                  <CustomText style={styles.card_tit}>카드 비밀번호</CustomText>
                  <TextInput 
                    placeholder='카드 비밀번호를 입력해주세요'
                    style={styles.card_input} 
                    value={cardpw}
                    onChangeText={(text) => {
                      const numericText = text.replace(/[^0-9]/g, '');
                      setCardpw(numericText)
                    }}
                    keyboardType="numeric"
                    secureTextEntry
                  />
                </View>

                <View style={styles.card_each}>
                  <CustomText style={styles.card_tit}>연락처</CustomText>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={styles.picker_container}>
                      <SelectBox
                        options={countryCodes}
                        selectedValue={selectedCountryCode}
                        onValueChange={setSelectedCountryCode}
                      />
                    </View>
                    <TextInput 
                      placeholder='연락처를 입력하세요'
                      style={[{width:'69%'}, styles.card_input]}
                      value={phone}
                      onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, '');
                        setPhone(numericText)
                      }}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 10}}>
                    <TouchableOpacity 
                      style={styles.main_btn} 
                      onPress={Registration}
                    >
                      <CustomText style={styles.main_btn_txt}>카드연결</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub_btn} onPress={() => navigation.navigate('Main')}><CustomText style={styles.sub_btn_txt}>취소</CustomText></TouchableOpacity>
                </View>
              </View>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  

  
export default AddCard;