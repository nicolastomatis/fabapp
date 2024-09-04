import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import InicioScreen from './screens/InicioScreen';
import NotificacionesScreen from './screens/NotificacionesScreen';
import AyudaScreen from './screens/AyudaScreen';
import MasScreen from './screens/MasScreen';
import PerfilScreen from './screens/PerfilScreen';
import FacturacionScreen from './screens/FacturacionScreen';
import NormasObrasSocialesScreen from './screens/NormasObrasSocialesScreen';
import NormaDetalleScreen from './screens/NormaDetalleScreen';
import ConfiguracionNotificacionesScreen from './screens/ConfiguracionNotificacionesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Imágenes PNG
import homeIcon from './assets/icons/home.png';
import notificationIcon from './assets/icons/notificaciones.png';
import questionIcon from './assets/icons/ayuda.png';
import moreIcon from './assets/icons/mas.png';

function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
      <Image source={require('./assets/icons/atras.png')} style={styles.icon} />
    </TouchableOpacity>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let imageSource;

          if (route.name === 'Inicio') {
            imageSource = homeIcon;
          } else if (route.name === 'Notificaciones') {
            imageSource = notificationIcon;
          } else if (route.name === 'Ayuda') {
            imageSource = questionIcon;
          } else if (route.name === 'Más') {
            imageSource = moreIcon;
          }

          return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
              <Image
                source={imageSource}
                style={{ width: 25, height: 25, tintColor: color, fontWeight: 'bold' }}
              />
            </View>
          );
        },
        tabBarLabel: ({ color }) => (
          <Text style={{ color, fontSize: 14, marginBottom: 10}}>
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: '#00A8A2',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
        },
        ...Platform.select({
          ios: {
            tabBarStyle: {
              height: 90,
            },
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
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
            height: 60,
          },
          ...Platform.select({
            ios: {
              tabBarStyle: {
                backgroundColor: '#0073A2',
                height: 90,
              },
            },
          }),
          headerStyle: {
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
        <Stack.Screen name="NormasObrasSociales" component={NormasObrasSocialesScreen} options={{ title: 'Normas de Obras Sociales' }} />
        <Stack.Screen name="NormaDetalle" component={NormaDetalleScreen} options={{ title: 'Detalle de Norma' }} />
        <Stack.Screen name="ConfiguracionNotificacionesScreen" component={ConfiguracionNotificacionesScreen} options={{ title: 'Editar notificaciones' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
  },
});
