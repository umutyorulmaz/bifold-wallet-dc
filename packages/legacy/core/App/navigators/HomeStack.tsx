import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../contexts/theme'
import Home from '../screens/Home'
import { HomeStackParams, Screens } from '../types/navigators'

import { createDefaultStackOptions } from './defaultStackOptions'

import EducationList from '../screens/EducationList'
import EmployersList from '../screens/EmployersList'
import InstitutionDetailScreen from '../screens/InstitutionDetailScreen'
import MilitaryList from '../screens/MilitaryList'
import { SvgUri } from 'react-native-svg'
import StateGovernmentList from '../screens/StateGovernmentList'

const HomeStack: React.FC = () => {
  const Stack = createStackNavigator<HomeStackParams>()
  const theme = useTheme()
  const { t } = useTranslation()
  const defaultStackOptions = createDefaultStackOptions(theme)

  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions }}>
      <Stack.Screen
        name={Screens.Home}
        component={Home}
        options={() => ({
          title: t('Screens.Home'),
          headerRight: () => null,
        })}
      />
      <Stack.Screen
          name={Screens.EducationList}
          component={EducationList}
          options={() => ({
            title: t('Screens.EducationList'),
            headerRight: () => null,
          })}

          // options={{
          //   title: 'Education', 
          //   // The title you want to display in the header
          //   // headerBackImage: () => (
          //   //   <Image
          //   //     source={require('../path-to-back-arrow-icon.png')} // Your back arrow icon
          //   //     style={{ width: 25, height: 25, marginLeft: 10 }}
          //   //   />
          //   // ),
          //   //the below suppose to show digicred logo and title on top but somehow doesnt work!?
          //   headerRight: () => (
          //     <SvgUri
          //       width="50"
          //       height="50"
          //       uri={require('../assets/img/digi-cred-logo.svg')}
          //       style={{ marginRight: 10 }}
          //     />
          //   ),
          // }}
        />
        <Stack.Screen
          name={Screens.InstitutionDetail}
          component={InstitutionDetailScreen}
          options={() => ({
            title: t('Screens.InstitutionDetail'),
            headerRight: () => null,
          })}

          // options={{ title: 'Institution Details' }}
        />
        <Stack.Screen name={Screens.MilitaryList} component={MilitaryList} 
        options={() => ({
          title: t('Screens.MilitaryList'),
          headerRight: () => null,
        })}
        // options={{ title: 'Military' }}
         />

        <Stack.Screen
          name={Screens.EmployersList}
          component={EmployersList}
          options={() => ({
            title: t('Screens.EmployersList'),
            headerRight: () => null,
          })}
          // options={{ title: 'Employers' }}
        />

        <Stack.Screen
          name={Screens.StateGovernmentList}
          component={StateGovernmentList}
          options={() => ({
            title: t('Screens.StateGovernmentList'),
            headerRight: () => null,
          })}
          // options={{ title: 'State Government' }}
        />
    </Stack.Navigator>
  )
}

export default HomeStack
