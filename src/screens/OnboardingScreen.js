import { Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Alert } from 'react-native';

function OnboardingScreen(props) {
    const { isFirstLogin, setIsFirstLogin } = props; 

    const SkipAlert = () => {
        Alert.alert(
            'Skip Tutorial',
            'Are you sure you want to skip the walkthrough?',
            [
                {
                    text: 'Skip',
                    onPress: () => setIsFirstLogin(false),
                },
                {
                    text: 'Cancel', 
                    onPress: () => console.log('cancel'),
                    style: 'cancel'
                }
            ]
        );
    }

    return (
        <Onboarding 
            onDone={() => setIsFirstLogin(false)}
            onSkip={SkipAlert}
            pages={[
            {
                backgroundColor: '#fff',
                //some intro
                // image: <Image style={styles.image} source={require('../../assets/defaultProfile.png')} />,
                
                //check to see if gifs are compatible, might not work on android apparently 
                image: <Image style={styles.image} source={{uri: 'https://static.wixstatic.com/media/4cbe8d_f1ed2800a49649848102c68fc5a66e53~mv2.gif'}} />,
                title: 'Welcome to Le Plan',
                subtitle: 'pewpewpewpew',
            },
            {
                backgroundColor: '#fe6e58',
                //some video for today's schedule
                //add task -> show task desc -> edit task -> delete
                image: <Image style={styles.image} source={require('../../assets/icon.png')} />,
                title: "Access Today's Schedule",
                subtitle: 'Press button to add task <br> Short press -> dfdf <br> Hold-> edit task',
            },
            {
                backgroundColor: '#fe6e58',
                //drawer
                //video
                //access settings + profile here
                image: <Image style={styles.image} source={require('../../assets/icon.png')} />,
                title: 'View your Profile and Settings',
                subtitle: 'Press button to add task <br> Short press -> dfdf <br> Hold-> edit task',
            },
            {
                backgroundColor: '#fe6e58',
                //calendar
                //select date from tab above, swipe to delete, click to edit
                image: <Image style={styles.image} source={require('../../assets/icon.png')} />,
                title: 'ONE STop Platform to view all your plans',
                subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
                backgroundColor: '#fe6e58',
                //friends
                //click to view friend profile
                image: <Image style={styles.image} source={require('../../assets/icon.png')} />,
                title: 'Engage with your friends!',
                subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
                backgroundColor: '#999',
                image: <Image style={styles.image} source={require('../../assets/defaultProfile.png')} />,
                title: 'Get started!',
                subtitle: "Press on the check button to get started!",
            },
            ]}
        />
    )
}

export default OnboardingScreen; 

const styles = {
    image: {
        width: '80%', 
        height: 280,
    }
}