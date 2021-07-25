import { Image, Dimensions } from 'react-native';
import React from 'react';
import { useAuth } from "../navigation/AuthProvider";
import Onboarding from 'react-native-onboarding-swiper';
import { Alert } from 'react-native';
import { db } from "../firebase/config";

function OnboardingScreen(props) {
    const { currentUser } = useAuth(); 
    const { isFirstMobileLogin, setIsFirstMobileLogin } = props; 
    const userTasks = db.collection("users").doc(currentUser.uid);
    const width = Dimensions.get('window').width * 0.8;

    const SkipAlert = () => {
        Alert.alert(
            'Skip Tutorial',
            'Are you sure you want to skip the walkthrough?',
            [
                {
                    text: 'Skip',
                    onPress: handleFinishTutorial,
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

    const styles = {
        image: {
            width: width,
        },
        welcome: {
            width: "100%",
            height: '100%'
        }
    }

    return (
        <Onboarding 
            onDone={handleFinishTutorial}
            onSkip={SkipAlert}
            pages={[
            {
                backgroundColor: '#fff',
                image: <Image style={styles.welcome} source={require("../../assets/welcome.png")} />,
                title: 'Welcome to Le Plan',
                subtitle: 'pewpewpewpew',
            },
            {
                backgroundColor: '#fe6e58',
                image: <Image style={{width: width, height: width * 1080 / 756}} resizeMode={'contain'} source={require("../../assets/todaySchedule.gif")} />,
                title: "Access Today's Schedule",
                subtitle: 'Press on a task to view its description. Long press to edit the task',
            },
            {
                backgroundColor: '#fe6e58',
                //access settings + profile here
                image: <Image style={{width: Dimensions.get('window').width * 0.65, height: Dimensions.get('window').width * 0.65 * 1056 / 600}} resizeMode={'contain'} source={require('../../assets/drawer.gif')} />,
                title: 'View your Profile and Settings',
                subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
                backgroundColor: '#fe6e58',
                image: <Image style={{width: width, height: width * 973 / 759}} resizeMode={'contain'} source={require('../../assets/calendar.gif')} />,
                title: 'One Stop Platform to view all your plans',
                subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
                backgroundColor: 'whitesmoke',
                //friends
                //click to view friend profile
                image: <Image style={{width: width, height: width * 831 / 600}} resizeMode={'contain'} source={require("../../assets/friends.gif")} />,
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
