import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

import LoginScreen from './screens/LoginScreen';
import InicioScreen from './screens/InicioScreen';
import NotificacionesScreen from './screens/NotificacionesScreen';
import AyudaScreen from './screens/AyudaScreen';
import MasScreen from './screens/MasScreen';
import PerfilScreen from './screens/PerfilScreen';
import FacturacionScreen from './screens/FacturacionScreen';
import CambiarContrasenaScreen from './screens/CambiarContrasenaScreen';
import NormasObrasSocialesScreen from './screens/NormasObrasSocialesScreen';
import NormaDetalleScreen from './screens/NormaDetalleScreen';
import ConfiguracionNotificacionesScreen from './screens/ConfiguracionNotificacionesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
      <AntDesign name="arrowleft" size={30} color="#0671B8" />
    </TouchableOpacity>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Notificaciones') {
            iconName = focused ? 'notification' : 'notification';
          } else if (route.name === 'Ayuda') {
            iconName = focused ? 'question' : 'question';
          } else if (route.name === 'Más') {
            iconName = focused ? 'ellipsis1' : 'ellipsis1';
          }

          const iconSize = focused ? 30 : 25;

          return <AntDesign name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: '#00A8A2',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0.2,
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          height: 100,
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          color: '#00A8A2',
          fontSize: 20,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Notificaciones" component={NotificacionesScreen} />
      <Tab.Screen name="Ayuda" component={AyudaScreen} />
      <Tab.Screen
        name="Más"
        component={MasScreen}
        options={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#0073A2',
            height: 100,
          },
          headerStyle: {
            height: 100,
            backgroundColor: '#0073A2',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'white',
            height: 100,
          },
          headerTitleStyle: {
            color: '#0671B8',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerLeft: () => <BackButton />,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: '¡Bienvenido!' }} />
        <Stack.Screen name="Facturacion" component={FacturacionScreen} options={{ title: 'Cierre de Facturación' }} />
        <Stack.Screen name="CambiarContrasena" component={CambiarContrasenaScreen} options={{ title: 'Cambiar Contraseña' }} />
        <Stack.Screen name="NormasObrasSociales" component={NormasObrasSocialesScreen} options={{ title: 'Normas de Obras Sociales' }} />
        <Stack.Screen name="NormaDetalle" component={NormaDetalleScreen} options={{ title: 'Detalle de Norma' }} />
        <Stack.Screen name="ConfiguracionNotificacionesScreen" component={ConfiguracionNotificacionesScreen} options={{ title: 'Editar notificaciones' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
