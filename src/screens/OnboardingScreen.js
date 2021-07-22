import { Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

function OnboardingScreen() {
    return (
        <Onboarding 
            onDone={() => console.log('done')}
            pages={[
            {
                backgroundColor: '#fff',
                //some intro
                image: <Image style={{width: 100, height: 100}} source={require('../../assets/defaultProfile.png')} />,
                title: 'Welcome to Le Plan',
                subtitle: 'pewpewpewpew',
            },
            {
                backgroundColor: '#fe6e58',
                //some video for today's schedule
                //add task -> show task desc -> edit task -> delete
                image: <Image style={{width: 100, height: 100}} source={require('../../assets/icon.png')} />,
                title: "Access Today's Schedule",
                subtitle: 'Press button to add task <br> Short press -> dfdf <br> Hold-> edit task',
            },
            {
                backgroundColor: '#fe6e58',
                //drawer
                //video
                //access settings + profile here
                image: <Image style={{width: 100, height: 100}} source={require('../../assets/icon.png')} />,
                title: 'View your Profile and Settings',
                subtitle: 'Press button to add task <br> Short press -> dfdf <br> Hold-> edit task',
            },
            {
                backgroundColor: '#fe6e58',
                //calendar
                //select date from tab above, swipe to delete, click to edit
                image: <Image style={{width: 100, height: 100}} source={require('../../assets/icon.png')} />,
                title: 'ONE STop Platform to view all your plans',
                subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
                backgroundColor: '#fe6e58',
                //friends
                //click to view friend profile
                image: <Image style={{width: 100, height: 100}} source={require('../../assets/icon.png')} />,
                title: 'Engage with your friends!',
                subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
                backgroundColor: '#999',
                image: <Image style={{width: 100, height: 100}} source={require('../../assets/defaultProfile.png')} />,
                title: 'Get started!',
                subtitle: "some button to finish tutorial",
            },
            ]}
        />
    )
}

export default OnboardingScreen; 