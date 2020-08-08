import React from 'react';
import { View,Text,Image } from 'react-native';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles'
import { RectButton } from 'react-native-gesture-handler';

function TeacherItem (){
    
    return(
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{uri: 'https://www.ironmaiden.com/media/gallery/tallinn-im--55609.jpg' }}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>Tiago Maggioni</Text>
                        <Text style={styles.subject}>Quimica</Text>
                    </View>
            </View>
            <Text style={styles.bio}>
                        Bla bla bla Bla bla bla  Bla bla bla 
                        {'\n'}{'\n'}
                        Bla bla bla Bla bla bla  Bla bla bla Bla bla bla Bla bla bla  Bla bla bla Bla bla bla Bla bla bla 
            </Text>

            <View style={styles.footer}> 
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ 20,00</Text>
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <RectButton style={styles.favoriteButton}>
                    <Image source={heartOutlineIcon} />
                </RectButton>
                <RectButton style={styles.contactButton}>
                    <Image source={whatsappIcon} />
                    <Text style={styles.contatButtonText}>Entrar em contato</Text>
                </RectButton>
            </View>
         </View>   
    )
}

export default TeacherItem;
