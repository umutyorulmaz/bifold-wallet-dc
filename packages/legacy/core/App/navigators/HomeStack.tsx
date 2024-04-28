import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useTheme } from '../contexts/theme'
import EducationList from '../screens/EducationList'
import EmployersList from '../screens/EmployersList'
import Home from '../screens/Home'
import InstitutionDetailScreen from '../screens/InstitutionDetailScreen'
import MilitaryList from '../screens/MilitaryList'
import StateGovernmentList from '../screens/StateGovernmentList'
import { HomeStackParams, Screens } from '../types/navigators'

import { createDefaultStackOptions } from './defaultStackOptions'

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
      <Stack.Screen
        name={Screens.MilitaryList}
        component={MilitaryList}
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
