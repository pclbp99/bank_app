import React,{ useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    Text
  } from 'react-native';

import Header from '../../Components/Header';
import styles from './styles.js';
import CustomText from '../../../CustomText.tsx';
import SelectBox from '../Home/SelectBox/SelectBox';
import exchange from '../../Assets/Images/exchange.png';

const Payment = () => {

    const [unit, setUnit] = useState('');
    const [amount, setAmount] = useState('');
    const [changeUnit, setChangeUnit] = useState('$');
    const [ChangeAmount, setChangeAmount] = useState('￦');

    const [activeInput, setActiveInput] = useState('amount');

    const currencyUnit =[
        { label: '$', value: '$' },
    ];

    const convertUnit =[
        { label: '￦', value: '￦' },
    ];

    const handleNumberPress = (number) => {
        if (activeInput === 'amount') {
            setAmount(prev => prev + number);
        } else {
            setChangeAmount(prev => prev + number);
        }
    };

    const handleClear = () => {
        if (activeInput === 'amount') {
            setAmount('');
        } else {
            setChangeAmount('');
        }
    };

    useEffect(() => {
        const numericAmount = parseFloat(amount) || 0;
        setChangeAmount((numericAmount * 1300).toString());
    }, [amount]);

    useFocusEffect(
        React.useCallback(() => {
            setAmount('');
            setChangeAmount('');
        }, [])
    );

    return (
        <SafeAreaView>
          <View style={styles.full_page}>
            <Header title="환전" />
            <View>
                <View style={styles.exchange_img_box}>
                    <Image source={exchange} style={styles.exchange_img}/>
                </View>

                <View style={styles.common_area}>
                    <View style={[styles.card_each, {marginBottom:0}]}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={styles.picker_container}>
                                <SelectBox
                                    options={currencyUnit}
                                    selectedValue={unit}
                                    onValueChange={setUnit}
                                />
                            </View>
                            <TextInput 
                                placeholder='0'
                                style={[
                                    { width: '69%', height: 50 }, 
                                    styles.exchange_input, 
                                    { color: amount ? '#000' : '#333' }
                                ]}
                                value={amount}
                                onChangeText={(text) => {
                                    const numericText = text.replace(/[^0-9]/g, '');
                                    setAmount(numericText)
                                }}
                                onFocus={() => setActiveInput('amount')}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <CustomText style={styles.convert_txt}>CONVERT TO</CustomText>

                    <View style={styles.card_each}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={styles.picker_container}>
                                <SelectBox
                                    options={convertUnit}
                                    selectedValue={changeUnit}
                                    onValueChange={setChangeUnit}
                                />
                            </View>
                            <TextInput 
                                placeholder='0'
                                style={[
                                    { width: '69%', height: 50 }, 
                                    styles.exchange_input, 
                                    { color: amount ? '#000' : '#333' }
                                ]}
                                value={ChangeAmount}
                                onChangeText={(text) => setChangeAmount(text)}
                                onFocus={() => setActiveInput('changeAmount')}
                                keyboardType="numeric"
                                editable={false}
                                showSoftInputOnFocus={false}
                            />
                        </View>
                    </View>
                </View>
            </View>
          </View>
        </SafeAreaView>
      );
}

export default Payment;