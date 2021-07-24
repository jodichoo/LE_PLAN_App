import { Image } from 'react-native';
import React from 'react';
import { useAuth } from "../navigation/AuthProvider";
import Onboarding from 'react-native-onboarding-swiper';
import { Alert } from 'react-native';
import { db } from "../firebase/config";

function OnboardingScreen(props) {
    const { currentUser } = useAuth(); 
    const { isFirstMobileLogin, setIsFirstMobileLogin } = props; 
    const userTasks = db.collection("users").doc(currentUser.uid);

    const SkipAlert = () => {
        Alert.alert(
            'Skip Tutorial',
            'Are you sure you want to skip the walkthrough?',
            [
                {
                    text: 'Skip',
                    onPress: () => setIsFirstMobileLogin(false),
                },
                {
                    text: 'Cancel', 
                    onPress: () => console.log('cancel'),
                    style: 'cancel'
                }
            ]
        );
    }

    function handleFinishTutorial() {
        setIsFirstMobileLogin(false); 
        userTasks
            .update({
                firstMobileLogin: false
            })
    }

    return (
        <Onboarding 
            onDone={handleFinishTutorial}
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
                // image: <Image style={styles.image} source={require('../../assets/icon.png')} />,
                image: <Image style={styles.image} source={{uri: 'https://s6.gifyu.com/images/ezgif.com-gif-makerf8ddeead647f1053.gif'}} />,
                title: "Access Today's Schedule",
                subtitle: 'Press on a task to view its description. Long press to edit the task',
            },
            {
                backgroundColor: '#fe6e58',
                //drawer
                //video
                //access settings + profile here
                image: <Image style={styles.image} source={require('../../assets/icon.png')} />,
                title: 'View your Profile and Settings',
                subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
                backgroundColor: '#fe6e58',
                //calendar
                //select date from tab above, swipe to delete, click to edit
                image: <Image style={styles.image} source={require('../../assets/icon.png')} />,
                title: 'One Stop Platform to view all your plans',
                subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
                backgroundColor: 'whitesmoke',
                //friends
                //click to view friend profile
                // image: <Image style={styles.image} source={require('../../assets/icon.png')} />,
                image: <Image style={styles.image} source={{uri : 'https://s6.gifyu.com/images/friends35f5ec9749e61ac0.gif'}} />,
                title: 'Engage with your friends!',
                subtitle: 'Click on your friend to view their profile',
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
        height: 370
    }
}