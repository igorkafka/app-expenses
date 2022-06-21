import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { GlobalStyles } from './constants/styles';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import { Ionicons } from '@expo/vector-icons'
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
const Stack = createNativeStackNavigator();
const BottomTaps = createBottomTabNavigator();

function ExpensesOverview() {
  return <BottomTaps.Navigator screenOptions={({navigation}) => ({
    headerStyle: {
      backgroundColor: GlobalStyles.colors.primary500
    },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({tintColor}) => <IconButton icon="add" size={24} color={tintColor} onPress={()=>{ 
      navigation.navigate('ManageExpense')
    }} />
  })}>
    <BottomTaps.Screen name='RecentExpenses' component={RecentExpense}  options={{
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({color, size}) => {
        return <Ionicons name='hourglass' color={color} size={size}/>
      }
    }}/>
    <BottomTaps.Screen name='AllExpenses' component={AllExpenses} options={{
      title: 'All Expenses',
      tabBarLabel: 'All Expenses',
      tabBarIcon: ({color, size}) => {
        return <Ionicons name='calendar' color={color} size={size}/>
      }
    }}/>
  </BottomTaps.Navigator>
}

export default function App() {
  return (<>
      <StatusBar style="dark" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500
          },
          headerTintColor: 'white'
        }}>
        <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{headerShown: false}}/>
          <Stack.Screen name='ManageExpense' component={ManageExpense} options={
            {
              presentation: 'modal'
            }
          }/>
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}


