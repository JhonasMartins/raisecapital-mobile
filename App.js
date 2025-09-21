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

// ---------------- Invest Screen ----------------
function InvestScreen() {
  // Dados mock para oportunidades de investimento
  const oportunidades = [
    {
      id: 1,
      nome: 'Edifício Comercial SP',
      tipo: 'Real Estate',
      rentabilidade: '12,5% a.a.',
      valorMinimo: 1000,
      prazo: '24 meses',
      risco: 'Médio',
      captado: 75,
      meta: 500000,
      descricao: 'Investimento em edifício comercial na região central de São Paulo',
      categoria: 'Imóveis',
      status: 'Captando',
    },
    {
      id: 2,
      nome: 'Energia Solar Nordeste',
      tipo: 'Energia Renovável',
      rentabilidade: '15,2% a.a.',
      valorMinimo: 500,
      prazo: '36 meses',
      risco: 'Baixo',
      captado: 45,
      meta: 1200000,
      descricao: 'Projeto de energia solar fotovoltaica no interior do Ceará',
      categoria: 'Energia',
      status: 'Captando',
    },
    {
      id: 3,
      nome: 'Startup FinTech',
      tipo: 'Tecnologia',
      rentabilidade: '25,0% a.a.',
      valorMinimo: 2500,
      prazo: '48 meses',
      risco: 'Alto',
      captado: 30,
      meta: 800000,
      descricao: 'Investimento em startup de tecnologia financeira em crescimento',
      categoria: 'Tecnologia',
      status: 'Captando',
    },
    {
      id: 4,
      nome: 'Agronegócio Sustentável',
      tipo: 'Agro',
      rentabilidade: '18,7% a.a.',
      valorMinimo: 1500,
      prazo: '30 meses',
      risco: 'Médio',
      captado: 85,
      meta: 2000000,
      descricao: 'Projeto de agricultura sustentável com foco em exportação',
      categoria: 'Agronegócio',
      status: 'Captando',
    },
  ];

  const getRiscoColor = (risco) => {
    switch (risco) {
      case 'Baixo': return '#10B981';
      case 'Médio': return '#F59E0B';
      case 'Alto': return '#EF4444';
      default: return colors.textSecondary;
    }
  };

  const renderOportunidadeCard = (item) => (
    <View key={item.id} style={[styles.card, styles.investmentCard]}>
      <View style={styles.investmentHeader}>
        <View style={styles.investmentInfo}>
          <Text style={styles.investmentName}>{item.nome}</Text>
          <View style={styles.investmentTypeContainer}>
            <Text style={styles.investmentType}>{item.categoria}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getRiscoColor(item.risco) + '20' }]}>
              <Text style={[styles.statusText, { color: getRiscoColor(item.risco) }]}>
                {item.risco}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.statusBadge, styles.statusActive]}>
          <Text style={[styles.statusText, styles.statusActiveText]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.investmentDetails}>
        <View style={styles.investmentRow}>
          <Text style={styles.investmentLabel}>Rentabilidade</Text>
          <Text style={styles.investmentRentability}>{item.rentabilidade}</Text>
        </View>
        <View style={styles.investmentRow}>
          <Text style={styles.investmentLabel}>Valor mínimo</Text>
          <Text style={styles.investmentValue}>
            R$ {item.valorMinimo.toLocaleString('pt-BR')}
          </Text>
        </View>
        <View style={styles.investmentRow}>
          <Text style={styles.investmentLabel}>Prazo</Text>
          <Text style={styles.investmentPeriod}>{item.prazo}</Text>
        </View>
        <View style={styles.investmentRow}>
          <Text style={styles.investmentLabel}>Captado</Text>
          <Text style={styles.investmentValue}>
            {item.captado}% (R$ {(item.meta * item.captado / 100).toLocaleString('pt-BR')})
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${item.captado}%` }]} />
        </View>
        <Text style={styles.progressText}>{item.captado}% captado</Text>
      </View>

      <View style={styles.investmentFooter}>
        <Text style={styles.investmentDescription}>{item.descricao}</Text>
        <TouchableOpacity style={styles.investButton}>
          <Text style={styles.investButtonText}>Investir</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );



  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.topbar}>
          <Text style={styles.topbarTitle}>Investir</Text>
          <View style={styles.topbarIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="filter-outline" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Oportunidades de investimento */}
        <View>
          {oportunidades.map(renderOportunidadeCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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

// Portfolio Screen com abas Ativos e Finalizados
function PortfolioScreen() {
  const [activeTab, setActiveTab] = useState('ativos');

  // Dados mock para investimentos ativos
  const activosData = [
    {
      id: 1,
      nome: 'CRI Smart House Sênior 2',
      tipo: 'CRI',
      valor: 50000,
      rentabilidade: 12.5,
      prazo: '24 meses',
      status: 'ativo',
      dataInvestimento: '15/09/2024',
      proximoRendimento: '15/12/2024'
    },
    {
      id: 2,
      nome: 'Debênture Verde Energia',
      tipo: 'Debênture',
      valor: 25000,
      rentabilidade: 10.8,
      prazo: '36 meses',
      status: 'ativo',
      dataInvestimento: '20/08/2024',
      proximoRendimento: '20/11/2024'
    },
    {
      id: 3,
      nome: 'FII Logística Premium',
      tipo: 'FII',
      valor: 15000,
      rentabilidade: 8.2,
      prazo: 'Indeterminado',
      status: 'ativo',
      dataInvestimento: '10/07/2024',
      proximoRendimento: '10/01/2025'
    }
  ];

  // Dados mock para investimentos finalizados
  const finalizadosData = [
    {
      id: 4,
      nome: 'CDB Premium Banco XYZ',
      tipo: 'CDB',
      valorInicial: 30000,
      valorFinal: 33600,
      rentabilidade: 12.0,
      prazo: '12 meses',
      status: 'finalizado',
      dataInvestimento: '15/01/2023',
      dataResgate: '15/01/2024',
      lucro: 3600
    },
    {
      id: 5,
      nome: 'LCI Habitação Segura',
      tipo: 'LCI',
      valorInicial: 20000,
      valorFinal: 22400,
      rentabilidade: 12.0,
      prazo: '12 meses',
      status: 'finalizado',
      dataInvestimento: '10/03/2023',
      dataResgate: '10/03/2024',
      lucro: 2400
    }
  ];

  const formatBRL = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const InvestmentCard = ({ investment, isActive = true }) => (
    <View style={[styles.card, styles.investmentCard]}>
      <View style={styles.investmentHeader}>
        <View style={styles.investmentInfo}>
          <Text style={styles.investmentName}>{investment.nome}</Text>
          <View style={styles.investmentTypeContainer}>
            <Text style={styles.investmentType}>{investment.tipo}</Text>
            <View style={[styles.statusBadge, isActive ? styles.statusActive : styles.statusFinalized]}>
              <Text style={[styles.statusText, isActive ? styles.statusActiveText : styles.statusFinalizedText]}>
                {isActive ? 'Ativo' : 'Finalizado'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.investmentDetails}>
        <View style={styles.investmentRow}>
          <Text style={styles.investmentLabel}>
            {isActive ? 'Valor investido' : 'Valor inicial'}
          </Text>
          <Text style={styles.investmentValue}>
            {formatBRL(isActive ? investment.valor : investment.valorInicial)}
          </Text>
        </View>

        {!isActive && (
          <View style={styles.investmentRow}>
            <Text style={styles.investmentLabel}>Valor final</Text>
            <Text style={styles.investmentValueFinal}>{formatBRL(investment.valorFinal)}</Text>
          </View>
        )}

        <View style={styles.investmentRow}>
          <Text style={styles.investmentLabel}>Rentabilidade</Text>
          <Text style={styles.investmentRentability}>
            {investment.rentabilidade}% a.a.
          </Text>
        </View>

        <View style={styles.investmentRow}>
          <Text style={styles.investmentLabel}>Prazo</Text>
          <Text style={styles.investmentPeriod}>{investment.prazo}</Text>
        </View>

        {!isActive && (
          <View style={[styles.investmentRow, styles.profitRow]}>
            <Text style={styles.investmentLabel}>Lucro obtido</Text>
            <Text style={styles.investmentProfit}>+ {formatBRL(investment.lucro)}</Text>
          </View>
        )}
      </View>

      <View style={styles.investmentFooter}>
        <Text style={styles.investmentDate}>
          {isActive 
            ? `Investido em ${investment.dataInvestimento}` 
            : `Resgatado em ${investment.dataResgate}`
          }
        </Text>
        {isActive && (
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Ver detalhes</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.accent} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const EmptyState = ({ isActive }) => (
    <View style={[styles.card, styles.emptyStateCard]}>
      <View style={styles.emptyIcon}>
        <Ionicons 
          name={isActive ? "trending-up-outline" : "checkmark-circle-outline"} 
          size={32} 
          color={colors.accent} 
        />
      </View>
      <Text style={styles.emptyTitle}>
        {isActive ? 'Nenhum investimento ativo' : 'Nenhum investimento finalizado'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {isActive 
          ? 'Comece a investir para ver seus ativos aqui'
          : 'Seus investimentos finalizados aparecerão aqui'
        }
      </Text>
      {isActive && (
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Explorar oportunidades</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.topbar}>
          <Text style={styles.topbarTitle}>Meu Portfolio</Text>
          <View style={styles.topbarIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { marginLeft: 8 }]}>
              <Ionicons name="filter-outline" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Resumo do Portfolio */}
        <View style={[styles.card, styles.portfolioSummary]}>
          <Text style={styles.summaryTitle}>Resumo do Portfolio</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total investido</Text>
              <Text style={styles.summaryValue}>{formatBRL(90000)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Rendimento total</Text>
              <Text style={styles.summaryProfit}>+ {formatBRL(6000)}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Investimentos ativos</Text>
              <Text style={styles.summaryCount}>3</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Finalizados</Text>
              <Text style={styles.summaryCount}>2</Text>
            </View>
          </View>
        </View>

        {/* Abas */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'ativos' && styles.tabButtonActive]}
            onPress={() => setActiveTab('ativos')}
          >
            <Text style={[styles.tabText, activeTab === 'ativos' && styles.tabTextActive]}>
              Ativos ({activosData.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'finalizados' && styles.tabButtonActive]}
            onPress={() => setActiveTab('finalizados')}
          >
            <Text style={[styles.tabText, activeTab === 'finalizados' && styles.tabTextActive]}>
              Finalizados ({finalizadosData.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo das abas */}
        {activeTab === 'ativos' ? (
          activosData.length > 0 ? (
            activosData.map(investment => (
              <InvestmentCard key={investment.id} investment={investment} isActive={true} />
            ))
          ) : (
            <EmptyState isActive={true} />
          )
        ) : (
          finalizadosData.length > 0 ? (
            finalizadosData.map(investment => (
              <InvestmentCard key={investment.id} investment={investment} isActive={false} />
            ))
          ) : (
            <EmptyState isActive={false} />
          )
        )}

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
          component={PortfolioScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Investir"
          component={InvestScreen}
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

  // Investment specific styles
  investSummary: {
    marginBottom: 20,
  },
  rendimentoContainer: {
    alignItems: 'flex-end',
  },
  rendimentoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  rendimentoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.card2,
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  investmentDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    flex: 1,
    marginRight: 12,
  },
  investButton: {
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  investButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Portfolio Screen Styles
  portfolioSummary: {
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  summaryProfit: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  summaryCount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent,
  },



  // Investment Cards
  investmentCard: {
    marginBottom: 16,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  investmentInfo: {
    flex: 1,
  },
  investmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  investmentTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  investmentType: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    backgroundColor: colors.card2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusActive: {
    backgroundColor: '#E8F5E8',
  },
  statusFinalized: {
    backgroundColor: '#E8F0FF',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusActiveText: {
    color: '#2E7D32',
  },
  statusFinalizedText: {
    color: '#1976D2',
  },

  // Investment Details
  investmentDetails: {
    marginBottom: 16,
  },
  investmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  investmentLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  investmentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  investmentValueFinal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  investmentRentability: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },
  investmentPeriod: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  profitRow: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 8,
  },
  investmentProfit: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },

  // Investment Footer
  investmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  investmentDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.accent,
    marginRight: 4,
  },

  // Empty State
  emptyStateCard: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },});
