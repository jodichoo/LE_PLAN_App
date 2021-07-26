import { Image, Dimensions, View } from 'react-native';
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
            height: '100%',
        }
    }

    return (
        <Onboarding 
            onDone={handleFinishTutorial}
            onSkip={SkipAlert}
            showSkip={false}
            showNext={false}
            bottomBarHighlight={false}
            pages={[
            {
                backgroundColor: '#680605',
                image: <Image style={styles.welcome} source={require("../../assets/welcome.png")} />,
                title: '',
                subtitle: '',
            },
            {
                backgroundColor: '#680605',
                image: <Image style={{width: width, height: width * 1080 / 756}} resizeMode={'contain'} source={require("../../assets/todaySchedule.gif")} />,
                title: "Access Today's Schedule",
                subtitle: 'Make changes. Anytime. Anywhere.',
            },
            {
                backgroundColor: '#680605',
                image: <Image style={{width: Dimensions.get('window').width * 0.65, height: Dimensions.get('window').width * 0.65 * 1056 / 600}} resizeMode={'contain'} source={require('../../assets/drawer.gif')} />,
                title: 'Swipe your hidden Drawer',
                subtitle: 'View Profile, change themes and more! ◕。◕',
            },
            {
                backgroundColor: '#680605',
                image: <Image style={{width: width, height: width * 973 / 759}} resizeMode={'contain'} source={require('../../assets/calendar.gif')} />,
                title: 'One Stop Platform to view all your plans',
                subtitle: 'Update your Schedule on your convenience! ٩(̾●̮̮̃̾•̃̾)۶',
            },
            {
                backgroundColor: '#680605',
                image: <Image style={{width: width, height: width * 831 / 600}} resizeMode={'contain'} source={require("../../assets/friends.gif")} />,
                title: 'Engage with your friends!',
                subtitle: 'Peek at how your friends are doing this week ◕‿◕',
            },
            {
                backgroundColor: '#680605',
                image: (<View style={{width: '100%'}}/>),
                title: 'Welcome',
                subtitle: "",
            },
            ]}
        />
    )
}

export default OnboardingScreen; 
