import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import AllExpense from './screens/AllExpense';
import IconButton from './UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import { GlobalStyles } from './constants/styles';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator screenOptions={ ({navigation}) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500
      },
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => (
        <IconButton 
          icon="add" 
          size={24} 
          color={tintColor} 
          onPress={() => navigation.navigate('ManageExpense')}
        />
      )
    })}>
      <BottomTabs.Screen 
        name="RecentExpense" 
        component={RecentExpense}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="hourglass" size={size} color={color}/>
          }
        }}
      />
      <BottomTabs.Screen 
        name="AllExpense" 
        component={AllExpense}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="calendar" size={size} color={color}/>
          }
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'
          }}
        >
          <Stack.Navigator>
            <Stack.Screen 
              name="ExpensesOverview" 
              component={ExpensesOverview}
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name="ManageExpense" 
              component={ManageExpense}
              options={{
                presentation: 'modal'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}