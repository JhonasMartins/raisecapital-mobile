import React, { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PieChart } from 'react-native-gifted-charts';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Paleta Light Mode
const colors = {
  bg: '#FAFBFC',
  card: '#FFFFFF',
  card2: '#F8FAFC',
  cardBorder: '#E2E8F0',
  text: '#1E293B',
  textSecondary: '#475569',
  sub: '#64748B',
  border: '#CBD5E1',
  accent: '#04a2fa',
  accent2: '#0284c7',
  accentLight: '#dbeafe',
  shadow: '#000000',
  legend1: '#3B82F6',
  legend2: '#10B981',
  legend3: '#F59E0B',
  legend4: '#8B5CF6',
  legend5: '#EF4444',
  legend6: '#EC4899',
};

// ---------------- Wallet (Carteira) Screen ----------------
function WalletScreen() {
  // Dados simulados
  const patrimonioEstimado = 0.0;
  const qtdInvestimentos = 0;
  const [period, setPeriod] = useState('Mensal');

  const categorias = [
    { label: 'Real Estate', value: 20, color: colors.legend1 },
    { label: 'Energia', value: 14, color: colors.legend2 },
    { label: 'Negócios', value: 18, color: colors.legend3 },
    { label: 'Agronegócio', value: 12, color: colors.legend4 },
    { label: 'Ativos Judiciais', value: 9, color: colors.legend5 },
    { label: 'Startups', value: 27, color: colors.legend6 },
  ];

  const pieData = useMemo(
    () => categorias.map((c) => ({ value: c.value, color: c.color })),
    [categorias]
  );

  const formatBRL = (n) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
    }).format(n);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header superior elegante */}
        <View style={styles.topbar}>
          <View style={{ width: 28 }} />
          <Text style={styles.topbarTitle}>Minha Carteira</Text>
          <View style={styles.topbarIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="cart-outline" size={22} color={colors.text} />
            </TouchableOpacity>
            <View style={{ width: 8 }} />
            <TouchableOpacity style={styles.iconButton}>
              <View style={{ position: 'relative' }}>
                <Ionicons name="notifications-outline" size={22} color={colors.text} />
                <View style={styles.badgeDot} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card de saudação premium */}
        <View style={[styles.card, styles.greetingCard]}>
          <LinearGradient 
            colors={[colors.accent, colors.accent2]} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }} 
            style={styles.avatarRing}
          >
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={24} color={colors.accent} />
            </View>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.greetingName}>Olá, Jhonas</Text>
            <Text style={styles.greetingSub}>Acesse seu perfil</Text>
          </View>
          <TouchableOpacity style={styles.eyeButton}>
            <Ionicons name="eye-off-outline" size={22} color={colors.sub} />
          </TouchableOpacity>
        </View>

        {/* Card principal com gráfico */}
        <View style={[styles.card, styles.mainCard]}>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              donut
              showText={false}
              radius={88}
              innerRadius={65}
              strokeColor={colors.cardBorder}
              strokeWidth={3}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Text style={styles.centerValue}>{formatBRL(patrimonioEstimado)}</Text>
                  <Text style={styles.centerSubtitle}>Patrimônio estimado</Text>
                  <Text style={styles.centerInvestments}>{qtdInvestimentos} Investimentos</Text>
                </View>
              )}
            />
          </View>

          {/* Controle de período */}
          <View style={styles.periodControl}>
            <View style={styles.segmentContainer}>
              <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => setPeriod('Mensal')} 
                style={[styles.segmentButton, period === 'Mensal' && styles.segmentButtonActive]}
              >
                <Text style={[styles.segmentText, period === 'Mensal' && styles.segmentTextActive]}>
                  Mensal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => setPeriod('Anual')} 
                style={[styles.segmentButton, period === 'Anual' && styles.segmentButtonActive]}
              >
                <Text style={[styles.segmentText, period === 'Anual' && styles.segmentTextActive]}>
                  Anual
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Legenda como chips */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.legendScroll}
            contentContainerStyle={styles.legendContainer}
          >
            {categorias.map((c) => (
              <View key={c.label} style={[styles.legendChip, { borderColor: c.color }]}>
                <View style={[styles.legendDot, { backgroundColor: c.color }]} />
                <Text style={styles.legendText}>{c.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Card de estado vazio */}
        <View style={[styles.card, styles.emptyCard]}>
          <View style={styles.emptyIcon}>
            <Ionicons name="trending-up-outline" size={32} color={colors.accent} />
          </View>
          <Text style={styles.emptyTitle}>Comece a investir hoje</Text>
          <Text style={styles.emptySubtitle}>Você ainda não possui investimentos ativos</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Ver oportunidades disponíveis</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de extrato */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Meu extrato</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>ver todos</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.extractCard]}>
          <Text style={styles.extractDate}>RESERVA REALIZADA – 15/09/2025</Text>
          <View style={styles.extractRow}>
            <Text style={styles.extractName}>CRI Smart House Sênior 2</Text>
            <View style={styles.extractValue}>
              <Text style={styles.extractAmount}>{formatBRL(50000)}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------- Placeholders for other tabs ----------------
function PlaceholderScreen({ title }) {
  return (
    <SafeAreaView style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={[styles.text, { opacity: 0.9 }]}>{title}</Text>
      <Text style={[styles.sub, { marginTop: 8 }]}>Em breve</Text>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Carteira"
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 11, marginBottom: 4, fontWeight: '500' },
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.sub,
          tabBarStyle: {
            height: 72,
            paddingBottom: 8,
            paddingTop: 8,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            backgroundColor: colors.card,
            shadowColor: colors.shadow,
            shadowOpacity: 0.1,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: -5 },
            elevation: 10,
          },
        }}
      >
        <Tab.Screen
          name="Carteira"
          component={WalletScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="wallet-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Portfolio"
          children={() => <PlaceholderScreen title="Portfolio" />}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Investir"
          children={() => <PlaceholderScreen title="Investir" />}
          options={{
            tabBarLabel: 'Investir',
            tabBarIcon: ({ focused }) => (
              <LinearGradient 
                colors={[colors.accent, colors.accent2]} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }} 
                style={[styles.fabTab, { transform: [{ translateY: focused ? -4 : -12 }] }]}
              >
                <Ionicons name="add" size={28} color="#FFFFFF" />
              </LinearGradient>
            ),
            tabBarItemStyle: { paddingTop: 0 },
          }}
        />
        <Tab.Screen
          name="Conteúdos"
          children={() => <PlaceholderScreen title="Conteúdos" />}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="library-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          children={() => <PlaceholderScreen title="Perfil" />}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-outline" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS === 'android' ? 8 : 0,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 16,
  },
  text: { color: colors.text, fontSize: 16 },
  sub: { color: colors.sub, fontSize: 13 },

  // Header
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  topbarTitle: { 
    color: colors.text, 
    fontSize: 18, 
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  topbarIcons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card2,
  },
  badgeDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.card2,
  },

  // Cards base
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  // Greeting card
  greetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  avatarRing: { 
    padding: 3, 
    borderRadius: 26, 
    marginRight: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  greetingSub: {
    color: colors.sub,
    fontSize: 14,
    marginTop: 2,
  },
  eyeButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card2,
  },

  // Main chart card
  mainCard: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  centerLabel: {
    alignItems: 'center',
  },
  centerValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  centerSubtitle: {
    color: colors.sub,
    fontSize: 13,
    marginTop: 4,
  },
  centerInvestments: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },

  // Period control
  periodControl: {
    alignItems: 'center',
    marginBottom: 20,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card2,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  segmentButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: colors.card,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  segmentText: {
    color: colors.sub,
    fontSize: 13,
    fontWeight: '500',
  },
  segmentTextActive: {
    color: colors.text,
    fontWeight: '700',
  },

  // Legend chips
  legendScroll: {
    marginTop: 4,
  },
  legendContainer: {
    gap: 10,
    paddingHorizontal: 4,
  },
  legendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    backgroundColor: colors.card2,
  },
  legendDot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4,
  },
  legendText: { 
    color: colors.textSecondary, 
    fontSize: 12,
    fontWeight: '500',
  },

  // Empty state card
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  emptySubtitle: {
    color: colors.sub,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sectionLink: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
  },

  // Extract card
  extractCard: {
    paddingVertical: 18,
  },
  extractDate: {
    color: colors.sub,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  extractRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  extractName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    letterSpacing: -0.2,
  },
  extractValue: {
    backgroundColor: colors.text,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  extractAmount: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },

  // Tab bar central button
  fabTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
});
