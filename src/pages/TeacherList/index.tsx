import React, { useState, useEffect } from 'react';
import { View,Text,ScrollView,TextInput } from 'react-native';


import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import api from '../../services/api';

import AsyncStorage from '@react-native-community/async-storage';


import styles from './styles';

function TeacherList(){
    const [teachers,setTeachers] = useState([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    

    const [subject,setSubject] = useState('');
    const [week_day,setWeekDay] = useState('');
    const [time,setTime] = useState('');

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit(){
        const response = await api.get('classes',{
            params:{
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data); 
        setIsFiltersVisible(false);
    }

    async function getAllTeachers() {
        const response = await api.get('classes');
        setTeachers(response.data); 
        
    }
    async function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher : Teacher) => teacher.id);
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useEffect(() => {
        loadFavorites();
        getAllTeachers();

    },[])

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys Disponíveis" 
             headerRight={
                 <BorderlessButton onPress={handleToggleFiltersVisible}>
                     <Feather name="filter" size={20} color='#FFF' />
                 </BorderlessButton>
             }
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            placeholderTextColor="#c1bccc" 
                            style={styles.input}
                            onChangeText={text => setSubject(text)}
                            value={subject}
                            placeholder="Qual a matéria?"
                        />
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholderTextColor="#c1bccc" 
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                            />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                onChangeText={text => setTime(text)}
                                     value={time}
                                    placeholderTextColor="#c1bccc" 
                                style={styles.input}
                                placeholder="Qual horário?"
                            />
                            </View>
                        </View>
                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar </Text>
                        </RectButton>
                    </View>
                )}
             </PageHeader>   
            <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal:16,
                paddingBottom:16
            }}>
                {teachers.map((teacher: Teacher) => {
                  return ( <TeacherItem  
                  key={teacher.id} 
                  teacher={teacher}
                  favorited={favorites.includes(teacher.id)}
                  />
                  )
                })}
            </ScrollView>
        </View>
    )
    
}

export default TeacherList;