import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleScreen from './src/screens/ScheduleScreen';
import RankingsScreen from './src/screens/RankingsScreen';
import PlayersScreen from './src/screens/PlayersScreen';
import NewsScreen from './src/screens/NewsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DetailScreen from './src/screens/DetailScreen';
import MainPlayerBanner from './src/components/MainPlayerBanner';
import { getSelectedSport } from './src/utils/storage';
import { theme } from './src/theme';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  ScheduleTab: { active: '📅', inactive: '📅', label: '赛程' },
  RankingsTab: { active: '📊', inactive: '📊', label: '排名' },
  PlayersTab: { active: '👥', inactive: '👥', label: '球员' },
  NewsTab: { active: '📰', inactive: '📰', label: '发现' },
  ProfileTab: { active: '👤', inactive: '👤', label: '我的' },
};

// Simple error boundary for production resilience
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, backgroundColor: theme.bg.primary, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>🔧</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text.primary, marginBottom: 8 }}>出现了一点问题</Text>
          <Text style={{ fontSize: 14, color: theme.text.secondary, textAlign: 'center', lineHeight: 20 }}>请重启应用。如果问题持续出现，请联系我们。</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [selectedSport, setSelectedSport] = useState('snooker');
  const [detailRoute, setDetailRoute] = useState(null);
  const [ready, setReady] = useState(false);

  // Load saved sport preference
  useEffect(() => {
    getSelectedSport().then(sport => {
      if (sport) setSelectedSport(sport);
      setReady(true);
    });
  }, []);

  const handleTournamentPress = (t) => setDetailRoute({ type: 'tournament', id: t.id });
  const handlePlayerPress = (p) => setDetailRoute({ type: 'player', id: p.id });
  const handleBack = () => setDetailRoute(null);

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg.primary, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 32 }}>🎱</Text>
      </View>
    );
  }

  // Show detail view as overlay
  if (detailRoute) {
    return (
      <ErrorBoundary>
        <View style={{ flex: 1, backgroundColor: theme.bg.primary }}>
          <StatusBar style="light" />
          <DetailScreen route={detailRoute} onBack={handleBack} />
        </View>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <View style={{ flex: 1, backgroundColor: theme.bg.primary }}>
        <StatusBar style="light" />
        <MainPlayerBanner onPress={(player) => handlePlayerPress({ ...player, sport: player.sport || 'snooker' })} />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                const icon = TAB_ICONS[route.name];
                return <Text style={{ fontSize: 22 }}>{focused ? icon.active : icon.inactive}</Text>;
              },
              tabBarLabel: ({ focused }) => {
                const icon = TAB_ICONS[route.name];
                return (
                  <Text style={{
                    fontSize: 10,
                    color: focused ? theme.color.green : theme.text.tertiary,
                    fontWeight: focused ? '600' : '400',
                    marginBottom: 4,
                  }}>
                    {icon.label}
                  </Text>
                );
              },
              tabBarStyle: {
                backgroundColor: theme.bg.surface,
                borderTopColor: 'rgba(255,255,255,0.05)',
                borderTopWidth: 1,
                paddingTop: 4,
                height: 80,
              },
              tabBarActiveTintColor: theme.color.green,
            })}
          >
            <Tab.Screen name="ScheduleTab">
              {() => <ScheduleScreen selectedSport={selectedSport} onSelectSport={setSelectedSport} onTournamentPress={handleTournamentPress} />}
            </Tab.Screen>
            <Tab.Screen name="RankingsTab">
              {() => <RankingsScreen selectedSport={selectedSport} onSelectSport={setSelectedSport} onPlayerPress={handlePlayerPress} />}
            </Tab.Screen>
            <Tab.Screen name="PlayersTab">
              {() => <PlayersScreen selectedSport={selectedSport} onSelectSport={setSelectedSport} onPlayerPress={handlePlayerPress} />}
            </Tab.Screen>
            <Tab.Screen name="NewsTab">
              {() => <NewsScreen selectedSport={selectedSport} onSelectSport={setSelectedSport} />}
            </Tab.Screen>
            <Tab.Screen name="ProfileTab" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </ErrorBoundary>
  );
}
