import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Modal } from 'react-native';

// Páginas do Processo de Investimento
function InvestmentAmountScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const formatCurrency = (value) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formattedValue = (numericValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formattedValue;
  };

  const getNumericValue = (formattedValue) => {
    return parseFloat(formattedValue.replace(/[^\d]/g, '')) / 100;
  };

  const handleAmountChange = (text) => {
    const formatted = formatCurrency(text);
    setAmount(formatted);
    setSelectedSuggestion(null);
  };

  const handleSuggestionPress = (value) => {
    const formatted = formatCurrency(value + '00');
    setAmount(formatted);
    setSelectedSuggestion(value);
  };

  const numericAmount = getNumericValue(amount);
  const isValidAmount = numericAmount >= 100; // Valor mínimo de R$ 100
  const isHighAmount = numericAmount >= 50000; // Valor alto para mostrar aviso

  const suggestedValues = [
    { value: '11800', label: 'R$ 11.800' },
    { value: '15000', label: 'R$ 15.000' },
    { value: '25000', label: 'R$ 25.000' }
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.investmentHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.investmentHeaderTitle}>Valor do Investimento</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={styles.container} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.investmentHeaderSection}>
            <Text style={styles.investmentHeaderSubtitle}>
              Defina o valor que você gostaria de investir nesta oportunidade
            </Text>
          </View>

          {/* Amount Input Section */}
          <View style={styles.investmentAmountSection}>
            <View style={[
              styles.investmentAmountCard,
              inputFocused && styles.investmentAmountCardFocused,
              !isValidAmount && amount && styles.investmentAmountCardError
            ]}>
              <Text style={styles.currencySymbol}>R$</Text>
              <TextInput
                style={styles.amountInput}
                value={amount.replace('R$', '').trim()}
                onChangeText={handleAmountChange}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="0,00"
                keyboardType="numeric"
                placeholderTextColor={colors.sub}
                selectionColor={colors.accent}
              />
            </View>

            {/* Feedback de validação */}
            {amount && !isValidAmount && (
              <View style={styles.validationContainer}>
                <Ionicons name="alert-circle" size={16} color="#EF4444" />
                <Text style={styles.validationText}>
                  Valor mínimo de investimento: R$ 100,00
                </Text>
              </View>
            )}

            {isHighAmount && (
              <View style={styles.warningContainer}>
                <Ionicons name="information-circle" size={16} color="#F59E0B" />
                <Text style={styles.warningText}>
                  Investimento de alto valor. Certifique-se de que está dentro do seu perfil de risco.
                </Text>
              </View>
            )}
          </View>

          {/* Suggested Values Section */}
          <View style={styles.investmentSuggestedSection}>
            <View style={styles.suggestedValuesCard}>
              <Text style={styles.suggestedValuesTitle}>Valores sugeridos</Text>
              <View style={styles.suggestedValuesGrid}>
                {suggestedValues.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.suggestedValueButton,
                      selectedSuggestion === item.value && styles.suggestedValueButtonSelected
                    ]}
                    onPress={() => handleSuggestionPress(item.value)}
                  >
                    <Text style={[
                      styles.suggestedValueText,
                      selectedSuggestion === item.value && styles.suggestedValueTextSelected
                    ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Investment Info Section */}
          {isValidAmount && (
            <View style={styles.investmentInfoSection}>
              <View style={styles.investmentInfoCard}>
                <Text style={styles.investmentInfoTitle}>Informações do investimento</Text>
                <View style={styles.investmentInfoRow}>
                  <View style={styles.investmentInfoIconContainer}>
                    <Ionicons name="trending-up" size={18} color={colors.accent} />
                  </View>
                  <View style={styles.investmentInfoTextContainer}>
                    <Text style={styles.investmentInfoLabel}>Rentabilidade estimada</Text>
                    <Text style={styles.investmentInfoValue}>
                      {((numericAmount * 0.12) / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/mês
                    </Text>
                  </View>
                </View>
                <View style={styles.investmentInfoDivider} />
                <View style={styles.investmentInfoRow}>
                  <View style={styles.investmentInfoIconContainer}>
                    <Ionicons name="shield-checkmark" size={18} color="#10B981" />
                  </View>
                  <View style={styles.investmentInfoTextContainer}>
                    <Text style={styles.investmentInfoLabel}>Proteção</Text>
                    <Text style={styles.investmentInfoValue}>
                      Garantido pelo FGC até R$ 250.000
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.continueButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton, 
              !isValidAmount && styles.continueButtonDisabled
            ]}
            onPress={() => isValidAmount && navigation.navigate('InvestorProfile')}
            disabled={!isValidAmount}
          >
            <Text style={[
              styles.continueButtonText,
              !isValidAmount && styles.continueButtonTextDisabled
            ]}>
              {isValidAmount ? 'Continuar' : 'Insira um valor válido'}
            </Text>
            {isValidAmount && <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



function InvestorProfileScreen({ navigation }) {
  const [profileData, setProfileData] = useState({
    totalInvestido: '',
    perfilInvestidor: '',
    aceitaTermos: false
  });
  const [showTermsModal, setShowTermsModal] = useState(false);

  const updateField = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return profileData.totalInvestido.trim() !== '' && 
           profileData.perfilInvestidor !== '' && 
           profileData.aceitaTermos;
  };

  const formatCurrency = (value) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formattedValue = (numericValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formattedValue;
  };

  const handleAmountChange = (text) => {
    const formatted = formatCurrency(text);
    updateField('totalInvestido', formatted);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.investmentHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.investmentHeaderTitle}>Perfil de Investidor</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollViewWithNavbar}>
        <View style={styles.card}>
          <Text style={styles.investmentSubtitle}>
            Complete as informações sobre seu perfil de investimento
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.formFieldFull}>
              <Text style={styles.formLabel}>Total investido em outras plataformas</Text>
              <TextInput
                style={styles.formInput}
                value={profileData.totalInvestido}
                onChangeText={handleAmountChange}
                placeholder="R$ 0,00"
                placeholderTextColor={colors.sub}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formFieldFull}>
              <Text style={styles.formLabel}>Auto-declaração de perfil de investidor</Text>
              <Text style={styles.formSubLabel}>Escolha uma das opções:</Text>
              
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => updateField('perfilInvestidor', 'opcao1')}
                >
                  <View style={[styles.radioCircle, profileData.perfilInvestidor === 'opcao1' && styles.radioCircleSelected]}>
                    {profileData.perfilInvestidor === 'opcao1' && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioText}>
                    Possuo investimentos financeiros em valor superior a R$ 1 milhão
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => updateField('perfilInvestidor', 'opcao2')}
                >
                  <View style={[styles.radioCircle, profileData.perfilInvestidor === 'opcao2' && styles.radioCircleSelected]}>
                    {profileData.perfilInvestidor === 'opcao2' && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioText}>
                    Possuo investimentos financeiros ou renda bruta anual em valor superior a R$ 200 mil
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => updateField('perfilInvestidor', 'opcao3')}
                >
                  <View style={[styles.radioCircle, profileData.perfilInvestidor === 'opcao3' && styles.radioCircleSelected]}>
                    {profileData.perfilInvestidor === 'opcao3' && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioText}>
                    Não possuo investimentos financeiros ou renda bruta anual em valor superior a R$ 200 mil
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.termsContainer}>
              <Text style={styles.termsTitle}>Termo de Ciência de Risco</Text>
              
              <TouchableOpacity
                style={styles.termsButton}
                onPress={() => setShowTermsModal(true)}
              >
                <Text style={styles.termsButtonText}>Termo de ciência de risco</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => updateField('aceitaTermos', !profileData.aceitaTermos)}
              >
                <View style={[styles.checkbox, profileData.aceitaTermos && styles.checkboxChecked]}>
                  {profileData.aceitaTermos && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
                <Text style={styles.checkboxText}>
                  Concordo com os termos de ciência de risco
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.continueButtonContainer}>
          <TouchableOpacity
            style={[styles.continueButton, !isFormValid() && styles.continueButtonDisabled]}
            onPress={() => isFormValid() && navigation.navigate('InvestmentConfirmation')}
            disabled={!isFormValid()}
          >
            <Text style={styles.continueButtonText}>Avançar</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal do Termo de Ciência de Risco */}
      <Modal
        visible={showTermsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTermsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Termo de Ciência de Risco</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowTermsModal(false)}
              >
                <Ionicons name="close" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalText}>
                Eu, <Text style={styles.modalHighlight}>Nome do usuário</Text>, declaro estar ciente dos riscos advindos do investimento que estou realizando, inclusive:
                {'\n\n'}
                a) da possibilidade de perda da totalidade do capital investido em decorrência do insucesso da Emissora, na condição de sociedade empresária de pequeno porte;
                {'\n\n'}
                b) quando aplicável, do risco advindo da aquisição ou da conversão dos valores mobiliários de que é titular em participação em na Emissora, na condição de sociedade empresária de pequeno porte, que, dependendo do tipo societário adotado, pode acarretar riscos ao seu patrimônio pessoal em razão de sua responsabilidade patrimonial limitada não ser reconhecida em decisões judiciais nas esferas trabalhistas, previdenciária e tributária, entre outras;
                {'\n\n'}
                c) dos riscos associados à detenção de posição minoritária na Emissora, na condição de sociedade empresária de pequeno porte, considerando a influência que os seus controladores possam vir a exercer em eventos corporativos como a emissão adicional de valores mobiliários, alienação do controle ou de ativos, e transações com partes relacionadas;
                {'\n\n'}
                d) do risco de crédito da Emissora, na condição de sociedade empresária de pequeno porte, quando da emissão de títulos representativos de dívida;
                {'\n\n'}
                e) do risco associado às dificuldades que possa enfrentar para vender valores mobiliários da Emissora, na condição de sociedade empresária de pequeno porte, não registrada na CVM e que não são admitidos à negociação em mercados regulamentados;
                {'\n\n'}
                f) de que da Emissora, na condição de sociedade empresária de pequeno porte, não é registrada na CVM e que pode não haver prestação de informações contínuas pela Emissora após a realização da oferta; e
                {'\n\n'}
                g) de que não existe obrigação, definida em lei ou regulamentação, da sociedade empresária de pequeno porte, como é o caso da Emissora, que não seja constituída como sociedade anônima em transformar-se neste tipo de sociedade.
                {'\n\n'}
                Também declaro que li e estou ciente dos Fatores de Risco disponibilizados na página do projeto no site da Raise Capital.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function InvestmentConfirmationScreen({ navigation }) {
  const [paymentLink] = useState('https://pay.example.com/investment-123456');

  const launchPayment = () => {
    // Em um app real, você usaria Linking.openURL(paymentLink)
    Alert.alert('Redirecionando...', 'Você será redirecionado para a página de pagamento.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.investmentHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.investmentHeaderTitle}>Confirmação</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollViewWithNavbar}>
        <View style={styles.card}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={64} color="#10B981" />
          </View>
          
          <Text style={styles.successTitle}>Investimento Confirmado!</Text>
          <Text style={styles.successSubtitle}>
            Seu investimento foi processado com sucesso. Use o link abaixo para realizar o pagamento.
          </Text>

          <View style={styles.paymentLinkContainer}>
            <Text style={styles.paymentLinkLabel}>Link de Pagamento:</Text>
            <View style={styles.paymentLinkBox}>
              <Text style={styles.paymentLinkText} numberOfLines={2}>
                {paymentLink}
              </Text>
              <TouchableOpacity
                style={styles.launchButton}
                onPress={launchPayment}
              >
                <Ionicons name="open-outline" size={20} color="#FFFFFF" />
                <Text style={styles.launchButtonText}>Launch</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Próximos passos:</Text>
            <View style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>1</Text>
              </View>
              <Text style={styles.instructionText}>
                Clique no link de pagamento ou copie e cole em seu navegador
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>2</Text>
              </View>
              <Text style={styles.instructionText}>
                Complete o pagamento seguindo as instruções na página
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>3</Text>
              </View>
              <Text style={styles.instructionText}>
                Aguarde a confirmação do pagamento por email
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.confirmationButtonsContainer}>
          <TouchableOpacity
            style={[styles.continueButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('OpportunityDetails', {
              opportunity: {
                id: 1,
                name: 'Fundo Imobiliário XP LOG',
                type: 'FII',
                category: 'Logística',
                risk: 'Médio',
                minInvestment: 100,
                expectedReturn: '12,5% a.a.',
                description: 'Fundo de investimento imobiliário focado em galpões logísticos em regiões estratégicas.',
                manager: 'XP Asset Management',
                patrimony: 'R$ 2,1 bilhões',
                dividend: 'R$ 0,85 por cota',
                lastDividend: '2024-01-15',
                price: 98.50,
                variation: '+2.3%',
                variationType: 'positive',
                liquidity: 'D+1',
                composition: [
                  { name: 'Galpões SP', percentage: 35, color: '#3B82F6' },
                  { name: 'Centros RJ', percentage: 25, color: '#10B981' },
                  { name: 'Armazéns MG', percentage: 20, color: '#F59E0B' },
                  { name: 'Outros', percentage: 20, color: '#8B5CF6' }
                ]
              }
            })}
          >
            <Ionicons name="arrow-back" size={20} color={colors.accent} />
            <Text style={[styles.continueButtonText, styles.secondaryButtonText]}>Voltar aos Detalhes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              Alert.alert(
                'Investimento Finalizado',
                'Seu processo de investimento foi concluído com sucesso! Você receberá atualizações por email.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // Reset the InvestStack to go back to the main invest screen
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'InvestMain' }],
                      });
                      // Navigate to Portfolio tab
                      navigation.getParent()?.navigate('Portfolio');
                    }
                  }
                ]
              );
            }}
          >
            <Text style={styles.continueButtonText}>Sair</Text>
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PieChart } from 'react-native-gifted-charts';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

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

// ---------------- Opportunity Details Screen ----------------
function OpportunityDetailsScreen({ route, navigation }) {
  const { opportunity } = route.params || {};

  // Se não há opportunity, usar dados mock padrão
  const defaultOpportunity = {
    id: 1,
    name: 'Fundo Imobiliário XP LOG',
    type: 'FII',
    category: 'Logística',
    risk: 'Médio',
    minInvestment: 100,
    expectedReturn: '12,5% a.a.',
    description: 'Fundo de investimento imobiliário focado em galpões logísticos em regiões estratégicas.',
    manager: 'XP Asset Management',
    patrimony: 'R$ 2,1 bilhões',
    dividend: 'R$ 0,85 por cota',
    lastDividend: '2024-01-15',
    price: 98.50,
    variation: '+2.3%',
    variationType: 'positive',
    liquidity: 'D+1',
    composition: [
      { name: 'Galpões SP', percentage: 35, color: '#3B82F6' },
      { name: 'Centros RJ', percentage: 25, color: '#10B981' },
      { name: 'Armazéns MG', percentage: 20, color: '#F59E0B' },
      { name: 'Outros', percentage: 20, color: '#8B5CF6' }
    ]
  };

  const currentOpportunity = opportunity || defaultOpportunity;

  // Dados mock expandidos para a oportunidade
  const opportunityDetails = {
    ...currentOpportunity,
    capa: 'https://via.placeholder.com/400x200/04a2fa/ffffff?text=Projeto+Imobiliário',
    rentabilidadeAlvo: '12,5% a.a.',
    investimentoMinimo: 'R$ 1.000',
    prazo: '24 meses',
    modalidade: 'Equity Crowdfunding',
    statusProgress: 75, // Porcentagem alcançada
    metaTotal: 500000,
    valorCaptado: 375000,
    
    // Seções de conteúdo
    sobreOperacao: 'Este projeto consiste na aquisição e desenvolvimento de um edifício comercial localizado na região central de São Paulo. O imóvel será reformado e modernizado para atender às demandas do mercado corporativo atual.',
    
    remuneracao: 'A remuneração será baseada na valorização do imóvel e nos rendimentos de aluguel. Projeção de retorno de 12,5% ao ano, com distribuição de dividendos semestrais.',
    
    sobreEmpresa: 'Fundada em 2015, a InvestCorp é uma empresa especializada em desenvolvimento imobiliário com foco em projetos comerciais de alto padrão. Já desenvolveu mais de 50 projetos bem-sucedidos.',
    
    empreendedores: [
      { nome: 'João Silva', cargo: 'CEO', experiencia: '15 anos no mercado imobiliário' },
      { nome: 'Maria Santos', cargo: 'Diretora Financeira', experiencia: '12 anos em finanças corporativas' }
    ],
    
    documentosJuridicos: [
      'Contrato de Investimento',
      'Estatuto Social da Empresa',
      'Certidões Negativas',
      'Laudo de Avaliação do Imóvel'
    ],
    
    informacoesEssenciais: {
      tipoInvestimento: 'Real Estate',
      setorEconomico: 'Imobiliário',
      localizacao: 'São Paulo - SP',
      dataInicio: '15/01/2024',
      dataVencimento: '15/01/2026',
      risco: 'Médio'
    },
    
    investidores: {
      total: 127,
      ticketMedio: 'R$ 2.950',
      maiorInvestimento: 'R$ 25.000'
    }
  };

  const formatBRL = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const ProgressChart = ({ percentage }) => (
    <View style={styles.progressChartContainer}>
      <View style={styles.progressCircle}>
        <View style={[styles.progressFillCircle, { 
          transform: [{ rotate: `${(percentage / 100) * 360}deg` }] 
        }]} />
        <View style={styles.progressInnerCircle}>
          <Text style={styles.progressPercentage}>{percentage}%</Text>
          <Text style={styles.progressLabel}>Captado</Text>
        </View>
      </View>
    </View>
  );

  const InfoCard = ({ title, children }) => (
    <View style={[styles.card, styles.infoCard]}>
      <Text style={styles.infoCardTitle}>{title}</Text>
      {children}
    </View>
  );

  // Tab Visão Geral
  const OverviewTab = () => (
    <ScrollView style={styles.scrollViewWithNavbar} showsVerticalScrollIndicator={false}>
      {/* Capa */}
      <View style={styles.coverContainer}>
        <View style={styles.coverPlaceholder}>
          <Ionicons name="image-outline" size={48} color={colors.sub} />
          <Text style={styles.coverText}>Capa do Projeto</Text>
        </View>
      </View>

      {/* Informações Principais */}
      <View style={[styles.card, styles.mainInfoCard]}>
        <Text style={styles.opportunityTitle}>{opportunityDetails.nome}</Text>
        <Text style={styles.opportunityType}>{opportunityDetails.tipo}</Text>
        
        <View style={styles.mainInfoGrid}>
          <View style={styles.mainInfoItem}>
            <Text style={styles.mainInfoLabel}>Rentabilidade Alvo</Text>
            <Text style={styles.mainInfoValue}>{opportunityDetails.rentabilidadeAlvo}</Text>
          </View>
          <View style={styles.mainInfoItem}>
            <Text style={styles.mainInfoLabel}>Investimento Mínimo</Text>
            <Text style={styles.mainInfoValue}>{opportunityDetails.investimentoMinimo}</Text>
          </View>
          <View style={styles.mainInfoItem}>
            <Text style={styles.mainInfoLabel}>Prazo</Text>
            <Text style={styles.mainInfoValue}>{opportunityDetails.prazo}</Text>
          </View>
          <View style={styles.mainInfoItem}>
            <Text style={styles.mainInfoLabel}>Modalidade</Text>
            <Text style={styles.mainInfoValue}>{opportunityDetails.modalidade}</Text>
          </View>
        </View>
      </View>

      {/* Status com Gráfico */}
      <InfoCard title="Status do Investimento">
        <ProgressChart percentage={opportunityDetails.statusProgress} />
        <View style={styles.statusInfo}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Meta Total</Text>
            <Text style={styles.statusValue}>{formatBRL(opportunityDetails.metaTotal)}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Valor Captado</Text>
            <Text style={styles.statusValueHighlight}>{formatBRL(opportunityDetails.valorCaptado)}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Restante</Text>
            <Text style={styles.statusValue}>{formatBRL(opportunityDetails.metaTotal - opportunityDetails.valorCaptado)}</Text>
          </View>
        </View>
      </InfoCard>

      {/* Investidores */}
      <InfoCard title="Investidores">
        <View style={styles.investorsList}>
          <View style={styles.investorListItem}>
            <Text style={styles.investorListLabel}>Total de Investidores</Text>
            <Text style={styles.investorListValue}>{opportunityDetails.investidores.total}</Text>
          </View>
          <View style={styles.investorListItem}>
            <Text style={styles.investorListLabel}>Ticket Médio</Text>
            <Text style={styles.investorListValue}>{opportunityDetails.investidores.ticketMedio}</Text>
          </View>
          <View style={styles.investorListItem}>
            <Text style={styles.investorListLabel}>Maior Investimento</Text>
            <Text style={styles.investorListValue}>{opportunityDetails.investidores.maiorInvestimento}</Text>
          </View>
        </View>
      </InfoCard>

      <View style={{ height: 32 }} />
    </ScrollView>
  );

  // Tab Detalhes
  const DetailsTab = () => (
    <ScrollView style={styles.scrollViewWithNavbar} showsVerticalScrollIndicator={false}>
      {/* Sobre a Operação */}
      <InfoCard title="Sobre a Operação">
        <Text style={styles.contentText}>{opportunityDetails.sobreOperacao}</Text>
      </InfoCard>

      {/* Remuneração */}
      <InfoCard title="Remuneração">
        <Text style={styles.contentText}>{opportunityDetails.remuneracao}</Text>
      </InfoCard>

      {/* Sobre a Empresa */}
      <InfoCard title="Sobre a Empresa">
        <Text style={styles.contentText}>{opportunityDetails.sobreEmpresa}</Text>
      </InfoCard>

      {/* Empreendedores */}
      <InfoCard title="Empreendedores">
        {opportunityDetails.empreendedores.map((emp, index) => (
          <View key={index} style={styles.entrepreneurCard}>
            <View style={styles.entrepreneurAvatar}>
              <Ionicons name="person" size={24} color={colors.accent} />
            </View>
            <View style={styles.entrepreneurInfo}>
              <Text style={styles.entrepreneurName}>{emp.nome}</Text>
              <Text style={styles.entrepreneurRole}>{emp.cargo}</Text>
              <Text style={styles.entrepreneurExperience}>{emp.experiencia}</Text>
            </View>
          </View>
        ))}
      </InfoCard>

      <View style={{ height: 32 }} />
    </ScrollView>
  );

  // Tab Documentos
  const DocumentsTab = () => (
    <ScrollView style={styles.scrollViewWithNavbar} showsVerticalScrollIndicator={false}>
      {/* Documentos Jurídicos */}
      <InfoCard title="Documentos Jurídicos">
        {opportunityDetails.documentosJuridicos.map((doc, index) => (
          <TouchableOpacity key={index} style={styles.documentItem}>
            <Ionicons name="document-text-outline" size={20} color={colors.accent} />
            <Text style={styles.documentName}>{doc}</Text>
            <Ionicons name="download-outline" size={16} color={colors.sub} />
          </TouchableOpacity>
        ))}
      </InfoCard>

      {/* Informações Essenciais */}
      <InfoCard title="Informações Essenciais do Projeto">
        <View style={styles.essentialInfoGrid}>
          {Object.entries(opportunityDetails.informacoesEssenciais).map(([key, value]) => (
            <View key={key} style={styles.essentialInfoItem}>
              <Text style={styles.essentialInfoLabel}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Text>
              <Text style={styles.essentialInfoValue}>{value}</Text>
            </View>
          ))}
        </View>
      </InfoCard>

      <View style={{ height: 32 }} />
    </ScrollView>
  );

  const TopTab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.detailsHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.detailsHeaderTitle}>Detalhes da Oportunidade</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Botão de Investir no Topo */}
      <View style={styles.topInvestButtonContainer}>
        <TouchableOpacity 
          style={styles.topInvestButton}
          onPress={() => navigation.navigate('InvestmentAmount')}
        >
          <Text style={styles.topInvestButtonText}>Investir Agora</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs Navigator */}
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.sub,
          tabBarIndicatorStyle: {
            backgroundColor: colors.accent,
            height: 3,
            borderRadius: 2,
          },
          tabBarStyle: {
            backgroundColor: colors.card,
            borderBottomWidth: 1,
            borderBottomColor: colors.cardBorder,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarPressColor: colors.accentLight,
        }}
      >
        <TopTab.Screen 
          name="Visão Geral" 
          component={OverviewTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="analytics-outline" size={20} color={color} />
            ),
          }}
        />
        <TopTab.Screen 
          name="Detalhes" 
          component={DetailsTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle-outline" size={20} color={color} />
            ),
          }}
        />
        <TopTab.Screen 
          name="Documentos" 
          component={DocumentsTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="document-text-outline" size={20} color={color} />
            ),
          }}
        />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}

function InvestmentDetailsScreen({ route, navigation }) {
  const params = route.params || {};
  const { investment } = params;
  
  // Dados mock padrão caso investment não seja fornecido
  const defaultInvestment = {
    nome: 'Investimento Exemplo',
    tipo: 'Renda Fixa',
    categoria: 'CDB',
    risco: 'Baixo',
    retornoEsperado: '12% a.a.',
    descricao: 'Investimento seguro com boa rentabilidade.',
    gerente: 'João Silva',
    patrimonio: 'R$ 50.000.000',
    dividendo: '8% a.a.',
    preco: 'R$ 100,00',
    variacao: '+2,5%',
    liquidez: 'D+1',
    composicao: [
      { nome: 'Títulos Públicos', percentual: 60, cor: '#3B82F6' },
      { nome: 'CDBs', percentual: 30, cor: '#10B981' },
      { nome: 'Debêntures', percentual: 10, cor: '#F59E0B' }
    ]
  };
  
  const currentInvestment = investment || defaultInvestment;

  // Dados mock expandidos para o investimento
  const investmentDetails = {
    ...currentInvestment,
    capa: 'https://via.placeholder.com/400x200/04a2fa/ffffff?text=Meu+Investimento',
    rentabilidadeAtual: '8,2% a.a.',
    valorInvestido: 'R$ 5.000',
    valorAtual: 'R$ 5.410',
    rendimento: 'R$ 410',
    percentualGanho: '+8,2%',
    prazoRestante: '18 meses',
    modalidade: 'Equity Crowdfunding',
    statusProgress: 65, // Porcentagem do prazo decorrido
    
    // Seções de conteúdo
    sobreInvestimento: 'Seu investimento está sendo aplicado no desenvolvimento de um edifício comercial localizado na região central de São Paulo. O projeto está progredindo conforme o cronograma estabelecido.',
    
    remuneracao: 'A remuneração está sendo calculada com base na valorização do imóvel e nos rendimentos de aluguel. Atualmente apresentando retorno de 8,2% ao ano, com distribuição de dividendos semestrais.',
    
    sobreEmpresa: 'Fundada em 2015, a InvestCorp é uma empresa especializada em desenvolvimento imobiliário com foco em projetos comerciais de alto padrão. Já desenvolveu mais de 50 projetos bem-sucedidos.',
    
    empreendedores: [
      { nome: 'João Silva', cargo: 'CEO', experiencia: '15 anos no mercado imobiliário' },
      { nome: 'Maria Santos', cargo: 'Diretora Financeira', experiencia: '12 anos em finanças corporativas' }
    ],
    
    documentosJuridicos: [
      'Contrato de Investimento',
      'Comprovante de Investimento',
      'Relatório de Performance',
      'Extrato de Rendimentos'
    ],
    
    informacoesEssenciais: {
      tipoInvestimento: 'Real Estate',
      setorEconomico: 'Imobiliário',
      localizacao: 'São Paulo - SP',
      dataInvestimento: '15/01/2024',
      dataVencimento: '15/07/2025',
      risco: 'Médio'
    },
    
    performance: {
      rendimentoMensal: 'R$ 68,33',
      ultimoDividendo: 'R$ 205',
      proximoDividendo: '15/07/2024',
      totalRecebido: 'R$ 410'
    }
  };

  const formatBRL = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const ProgressChart = ({ percentage }) => (
    <View style={styles.progressChartContainer}>
      <View style={styles.progressCircle}>
        <View style={[styles.progressFillCircle, { 
          transform: [{ rotate: `${(percentage / 100) * 360}deg` }] 
        }]} />
        <View style={styles.progressInnerCircle}>
          <Text style={styles.progressPercentage}>{percentage}%</Text>
          <Text style={styles.progressLabel}>Decorrido</Text>
        </View>
      </View>
    </View>
  );

  const InfoCard = ({ title, children }) => (
    <View style={[styles.card, styles.infoCard]}>
      <Text style={styles.infoCardTitle}>{title}</Text>
      {children}
    </View>
  );

  // Tab Visão Geral
  const OverviewTab = () => (
    <ScrollView style={styles.scrollViewWithNavbar} showsVerticalScrollIndicator={false}>
      {/* Capa */}
      <View style={styles.coverContainer}>
        <View style={styles.coverPlaceholder}>
          <Ionicons name="trending-up" size={48} color={colors.sub} />
          <Text style={styles.coverText}>Meu Investimento</Text>
        </View>
      </View>

      {/* Informações Principais */}
      <View style={[styles.card, styles.mainInfoCard]}>
        <Text style={styles.opportunityTitle}>{investmentDetails.nome}</Text>
        <Text style={styles.opportunityType}>{investmentDetails.tipo}</Text>
        
        <View style={styles.mainInfoGrid}>
          <View style={styles.mainInfoItem}>
            <Text style={styles.mainInfoLabel}>Rentabilidade Atual</Text>
            <Text style={styles.mainInfoValue}>{investmentDetails.rentabilidadeAtual}</Text>
          </View>
          <View style={styles.mainInfoItem}>
            <Text style={styles.mainInfoLabel}>Valor Investido</Text>
            <Text style={styles.mainInfoValue}>{investmentDetails.valorInvestido}</Text>
          </View>
          <View style={styles.mainInfoItem}>
            <Text style={styles.mainInfoLabel}>Valor Atual</Text>
            <Text style={styles.mainInfoValue}>{investmentDetails.valorAtual}</Text>
          </View>
          <View style={styles.mainInfoItem}>
            <Text style={styles.mainInfoLabel}>Rendimento</Text>
            <Text style={[styles.mainInfoValue, { color: colors.legend2 }]}>{investmentDetails.rendimento}</Text>
          </View>
        </View>
      </View>

      {/* Status com Gráfico */}
      <InfoCard title="Progresso do Investimento">
        <ProgressChart percentage={investmentDetails.statusProgress} />
        <View style={styles.statusInfo}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Prazo Restante</Text>
            <Text style={styles.statusValue}>{investmentDetails.prazoRestante}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Ganho Percentual</Text>
            <Text style={[styles.statusValueHighlight, { color: colors.legend2 }]}>{investmentDetails.percentualGanho}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Modalidade</Text>
            <Text style={styles.statusValue}>{investmentDetails.modalidade}</Text>
          </View>
        </View>
      </InfoCard>

      {/* Performance */}
      <InfoCard title="Performance">
        <View style={styles.investorsList}>
          <View style={styles.investorListItem}>
            <Text style={styles.investorListLabel}>Rendimento Mensal</Text>
            <Text style={styles.investorListValue}>{investmentDetails.performance.rendimentoMensal}</Text>
          </View>
          <View style={styles.investorListItem}>
            <Text style={styles.investorListLabel}>Último Dividendo</Text>
            <Text style={styles.investorListValue}>{investmentDetails.performance.ultimoDividendo}</Text>
          </View>
          <View style={styles.investorListItem}>
            <Text style={styles.investorListLabel}>Próximo Dividendo</Text>
            <Text style={styles.investorListValue}>{investmentDetails.performance.proximoDividendo}</Text>
          </View>
          <View style={styles.investorListItem}>
            <Text style={styles.investorListLabel}>Total Recebido</Text>
            <Text style={[styles.investorListValue, { color: colors.legend2 }]}>{investmentDetails.performance.totalRecebido}</Text>
          </View>
        </View>
      </InfoCard>

      <View style={{ height: 32 }} />
    </ScrollView>
  );

  // Tab Detalhes
  const DetailsTab = () => (
    <ScrollView style={styles.scrollViewWithNavbar} showsVerticalScrollIndicator={false}>
      {/* Sobre o Investimento */}
      <InfoCard title="Sobre o Investimento">
        <Text style={styles.contentText}>{investmentDetails.sobreInvestimento}</Text>
      </InfoCard>

      {/* Remuneração */}
      <InfoCard title="Remuneração">
        <Text style={styles.contentText}>{investmentDetails.remuneracao}</Text>
      </InfoCard>

      {/* Sobre a Empresa */}
      <InfoCard title="Sobre a Empresa">
        <Text style={styles.contentText}>{investmentDetails.sobreEmpresa}</Text>
      </InfoCard>

      {/* Empreendedores */}
      <InfoCard title="Empreendedores">
        {investmentDetails.empreendedores.map((emp, index) => (
          <View key={index} style={styles.entrepreneurCard}>
            <View style={styles.entrepreneurAvatar}>
              <Ionicons name="person" size={24} color={colors.accent} />
            </View>
            <View style={styles.entrepreneurInfo}>
              <Text style={styles.entrepreneurName}>{emp.nome}</Text>
              <Text style={styles.entrepreneurRole}>{emp.cargo}</Text>
              <Text style={styles.entrepreneurExperience}>{emp.experiencia}</Text>
            </View>
          </View>
        ))}
      </InfoCard>

      <View style={{ height: 32 }} />
    </ScrollView>
  );

  // Tab Documentos
  const DocumentsTab = () => (
    <ScrollView style={styles.scrollViewWithNavbar} showsVerticalScrollIndicator={false}>
      {/* Documentos do Investimento */}
      <InfoCard title="Documentos do Investimento">
        {investmentDetails.documentosJuridicos.map((doc, index) => (
          <TouchableOpacity key={index} style={styles.documentItem}>
            <Ionicons name="document-text-outline" size={20} color={colors.accent} />
            <Text style={styles.documentName}>{doc}</Text>
            <Ionicons name="download-outline" size={16} color={colors.sub} />
          </TouchableOpacity>
        ))}
      </InfoCard>

      {/* Informações Essenciais */}
      <InfoCard title="Informações Essenciais do Investimento">
        <View style={styles.essentialInfoGrid}>
          {Object.entries(investmentDetails.informacoesEssenciais).map(([key, value]) => (
            <View key={key} style={styles.essentialInfoItem}>
              <Text style={styles.essentialInfoLabel}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Text>
              <Text style={styles.essentialInfoValue}>{value}</Text>
            </View>
          ))}
        </View>
      </InfoCard>

      <View style={{ height: 32 }} />
    </ScrollView>
  );

  const TopTab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.detailsHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.detailsHeaderTitle}>Detalhes do Investimento</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs Navigator */}
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.sub,
          tabBarIndicatorStyle: {
            backgroundColor: colors.accent,
            height: 3,
            borderRadius: 2,
          },
          tabBarStyle: {
            backgroundColor: colors.card,
            borderBottomWidth: 1,
            borderBottomColor: colors.cardBorder,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarPressColor: colors.accentLight,
        }}
      >
        <TopTab.Screen 
          name="Visão Geral" 
          component={OverviewTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="analytics-outline" size={20} color={color} />
            ),
          }}
        />
        <TopTab.Screen 
          name="Detalhes" 
          component={DetailsTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle-outline" size={20} color={color} />
            ),
          }}
        />
        <TopTab.Screen 
          name="Documentos" 
          component={DocumentsTab}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="document-text-outline" size={20} color={color} />
            ),
          }}
        />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}

function InvestScreen({ navigation }) {
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

  const getInvestmentCoverImage = (categoria) => {
    const coverStyle = {
      width: '100%',
      height: 120,
      borderRadius: 12,
      marginBottom: 16,
      justifyContent: 'center',
      alignItems: 'center',
    };

    switch (categoria?.toLowerCase()) {
      case 'cri':
        return (
          <LinearGradient
            colors={['#3B82F6', '#1E40AF']}
            style={coverStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="business-outline" size={32} color="#FFFFFF" />
            <Text style={styles.coverText}>CRI</Text>
          </LinearGradient>
        );
      case 'agronegócio':
      case 'agronegocio':
        return (
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={coverStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="leaf-outline" size={32} color="#FFFFFF" />
            <Text style={styles.coverText}>Agronegócio</Text>
          </LinearGradient>
        );
      case 'energia':
        return (
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            style={coverStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="flash-outline" size={32} color="#FFFFFF" />
            <Text style={styles.coverText}>Energia</Text>
          </LinearGradient>
        );
      default:
        return (
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={coverStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="trending-up-outline" size={32} color="#FFFFFF" />
            <Text style={styles.coverText}>Investimento</Text>
          </LinearGradient>
        );
    }
  };

  const renderOportunidadeCard = (item) => (
    <View key={item.id} style={[styles.card, styles.investmentCard]}>
      {getInvestmentCoverImage(item.categoria)}
      <Text style={styles.investmentName}>{item.nome}</Text>
      <View style={styles.investmentTypeContainer}>
        <Text style={styles.investmentType}>{item.categoria}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getRiscoColor(item.risco) + '20' }]}>
          <Text style={[styles.statusText, { color: getRiscoColor(item.risco) }]}>
            {item.risco}
          </Text>
        </View>
        <View style={[styles.statusBadge, styles.statusActive]}>
          <Text style={[styles.statusText, styles.statusActiveText]}>
            {item.status}
          </Text>
        </View>
      </View>

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

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${item.captado}%` }]} />
        </View>
        <Text style={styles.progressText}>{item.captado}% captado</Text>
      </View>

      <View style={styles.investmentFooter}>
        <Text style={styles.investmentDescription}>{item.descricao}</Text>
        <TouchableOpacity 
                  style={styles.investButton}
                  onPress={() => navigation.navigate('OpportunityDetails', { opportunity: item })}
                >
          <Text style={styles.investButtonText}>Investir</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );



  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollViewWithNavbar}>
        {/* Header */}
        <View style={styles.topbar}>
          <Image source={require('./assets/logo.png')} style={styles.headerLogo} />
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
      <ScrollView contentContainerStyle={styles.scrollViewWithNavbar}>
        {/* Header superior elegante */}
        <View style={styles.topbar}>
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

        {/* Card Ações Rápidas */}
        <View style={[styles.card, styles.quickActionsCard]}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionIcon, { backgroundColor: colors.accentLight }]}>
                <Ionicons name="add-outline" size={24} color={colors.accent} />
              </View>
              <Text style={styles.quickActionText}>Investir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#E8F5E8' }]}>
                <Ionicons name="arrow-down-outline" size={24} color="#10B981" />
              </View>
              <Text style={styles.quickActionText}>Depositar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="arrow-up-outline" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.quickActionText}>Sacar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#EDE9FE' }]}>
                <Ionicons name="document-text-outline" size={24} color="#8B5CF6" />
              </View>
              <Text style={styles.quickActionText}>Extrato</Text>
            </TouchableOpacity>
          </View>
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
function PortfolioScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('todos');

  // Dados mock para todos os investimentos (ativos, pendentes e finalizados)
  const allInvestments = [
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
    },
    {
      id: 6,
      nome: 'CRI Residencial Norte',
      tipo: 'CRI',
      valor: 40000,
      rentabilidade: 11.5,
      prazo: '18 meses',
      status: 'pendente',
      dataInvestimento: '01/12/2024',
      proximoRendimento: 'Aguardando aprovação'
    },
    {
      id: 7,
      nome: 'Debênture Infraestrutura',
      tipo: 'Debênture',
      valor: 35000,
      rentabilidade: 13.2,
      prazo: '24 meses',
      status: 'pendente',
      dataInvestimento: '05/12/2024',
      proximoRendimento: 'Em análise'
    },
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

  // Filtrar investimentos baseado no filtro ativo
  const filteredInvestments = useMemo(() => {
    if (activeFilter === 'todos') {
      return allInvestments;
    }
    return allInvestments.filter(investment => investment.status === activeFilter);
  }, [allInvestments, activeFilter]);

  const formatBRL = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getInvestmentCoverImage = (tipo) => {
    const coverStyle = {
      width: '100%',
      height: 120,
      borderRadius: 12,
      marginBottom: 16,
      justifyContent: 'center',
      alignItems: 'center',
    };

    switch (tipo?.toLowerCase()) {
      case 'cri':
        return (
          <LinearGradient
            colors={['#3B82F6', '#1E40AF']}
            style={coverStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="business-outline" size={32} color="#FFFFFF" />
            <Text style={styles.coverText}>CRI</Text>
          </LinearGradient>
        );
      case 'agronegócio':
      case 'agronegocio':
        return (
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={coverStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="leaf-outline" size={32} color="#FFFFFF" />
            <Text style={styles.coverText}>Agronegócio</Text>
          </LinearGradient>
        );
      case 'energia':
        return (
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            style={coverStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="flash-outline" size={32} color="#FFFFFF" />
            <Text style={styles.coverText}>Energia</Text>
          </LinearGradient>
        );
      default:
        return (
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={coverStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="trending-up-outline" size={32} color="#FFFFFF" />
            <Text style={styles.coverText}>Investimento</Text>
          </LinearGradient>
        );
    }
  };

  const InvestmentCard = ({ investment }) => {
    const getStatusStyle = (status) => {
      switch (status) {
        case 'ativo':
          return { badge: styles.statusActive, text: styles.statusActiveText, label: 'Ativo' };
        case 'pendente':
          return { badge: styles.statusPending, text: styles.statusPendingText, label: 'Pendente' };
        case 'finalizado':
          return { badge: styles.statusFinalized, text: styles.statusFinalizedText, label: 'Finalizado' };
        default:
          return { badge: styles.statusActive, text: styles.statusActiveText, label: 'Ativo' };
      }
    };

    const statusStyle = getStatusStyle(investment.status);
    const isActive = investment.status === 'ativo';
    const isPending = investment.status === 'pendente';

    return (
      <View style={[styles.card, styles.investmentCard]}>
        {getInvestmentCoverImage(investment.tipo)}
        <Text style={styles.investmentName}>{investment.nome}</Text>
        <View style={styles.investmentTypeContainer}>
          <Text style={styles.investmentType}>{investment.tipo}</Text>
          <View style={[styles.statusBadge, statusStyle.badge]}>
            <Text style={[styles.statusText, statusStyle.text]}>
              {statusStyle.label}
            </Text>
          </View>
        </View>

        <View style={styles.investmentDetails}>
          <View style={styles.investmentRow}>
            <Text style={styles.investmentLabel}>
              {isActive || isPending ? 'Valor investido' : 'Valor inicial'}
            </Text>
            <Text style={styles.investmentValue}>
              {formatBRL(isActive || isPending ? investment.valor : investment.valorInicial)}
            </Text>
          </View>

          {!isActive && !isPending && (
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

          {!isActive && !isPending && (
            <View style={[styles.investmentRow, styles.profitRow]}>
              <Text style={styles.investmentLabel}>Lucro obtido</Text>
              <Text style={styles.investmentProfit}>+ {formatBRL(investment.lucro)}</Text>
            </View>
          )}
        </View>

        <View style={styles.investmentFooter}>
          <Text style={styles.investmentDate}>
            {isActive || isPending ? `Investido em ${investment.dataInvestimento}` : `Finalizado em ${investment.dataFinalizacao}`}
          </Text>
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigation.navigate('InvestmentDetails', { investment })}
          >
            <Text style={styles.detailsButtonText}>Ver detalhes</Text>
            <Ionicons name="chevron-forward" size={12} color={colors.accent} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
          <Image source={require('./assets/logo.png')} style={styles.headerLogo} />
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
              <Text style={styles.summaryLabel}>Total de investimentos</Text>
              <Text style={styles.summaryCount}>{filteredInvestments.length}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>
                {activeFilter === 'todos' ? 'Ativos' : 
                 activeFilter === 'ativo' ? 'Ativos' :
                 activeFilter === 'pendente' ? 'Pendentes' : 'Finalizados'}
              </Text>
              <Text style={styles.summaryCount}>
                {activeFilter === 'todos' 
                  ? allInvestments.filter(inv => inv.status === 'ativo').length
                  : filteredInvestments.length}
              </Text>
            </View>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {['todos', 'ativo', 'pendente', 'finalizado'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.filterButtonActive
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive
                ]}>
                  {filter === 'todos' ? 'Todos' : 
                   filter === 'ativo' ? 'Ativos' :
                   filter === 'pendente' ? 'Pendentes' : 'Finalizados'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Lista de investimentos filtrados */}
        {filteredInvestments.map(investment => (
          <InvestmentCard key={investment.id} investment={investment} isActive={investment.status === 'ativo'} />
        ))}

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------- Extract Screen ----------------
function ExtractScreen() {
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Mock data for transactions
  const transactions = [
    {
      id: '1',
      type: 'investment',
      title: 'Investimento - Edifício Comercial SP',
      amount: -25000,
      date: '2024-01-15',
      status: 'completed',
      category: 'Real Estate'
    },
    {
      id: '2',
      type: 'return',
      title: 'Rendimento - Apartamento Vila Madalena',
      amount: 1250,
      date: '2024-01-10',
      status: 'completed',
      category: 'Real Estate'
    },
    {
      id: '3',
      type: 'investment',
      title: 'Investimento - Loja Comercial RJ',
      amount: -15000,
      date: '2024-01-08',
      status: 'completed',
      category: 'Real Estate'
    },
    {
      id: '4',
      type: 'return',
      title: 'Rendimento - Casa Residencial',
      amount: 850,
      date: '2024-01-05',
      status: 'completed',
      category: 'Real Estate'
    },
    {
      id: '5',
      type: 'fee',
      title: 'Taxa de Administração',
      amount: -120,
      date: '2024-01-03',
      status: 'completed',
      category: 'Fee'
    },
    {
      id: '6',
      type: 'return',
      title: 'Rendimento - Edifício Comercial SP',
      amount: 2100,
      date: '2024-01-01',
      status: 'completed',
      category: 'Real Estate'
    }
  ];

  const filters = [
    { key: 'todos', label: 'Todos' },
    { key: 'investment', label: 'Investimentos' },
    { key: 'return', label: 'Rendimentos' },
    { key: 'fee', label: 'Taxas' }
  ];

  const periods = [
    { key: '7d', label: '7 dias' },
    { key: '30d', label: '30 dias' },
    { key: '90d', label: '3 meses' },
    { key: '1y', label: '1 ano' }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'todos') return true;
    return transaction.type === selectedFilter;
  });

  const formatCurrency = (value) => {
    const formatted = Math.abs(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return value >= 0 ? `+ ${formatted}` : `- ${formatted}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'investment':
        return 'arrow-up-outline';
      case 'return':
        return 'arrow-down-outline';
      case 'fee':
        return 'card-outline';
      default:
        return 'swap-horizontal-outline';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'investment':
        return '#EF4444';
      case 'return':
        return '#10B981';
      case 'fee':
        return '#F59E0B';
      default:
        return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollViewWithNavbar}>
        {/* Header */}
        <View style={styles.topbar}>
          <Text style={styles.topbarTitle}>Extrato</Text>
          <View style={styles.topbarIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="filter-outline" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Card */}
        <View style={[styles.card, styles.extractSummaryCard]}>
          <Text style={styles.extractSummaryTitle}>Resumo do Período</Text>
          <View style={styles.extractSummaryGrid}>
            <View style={styles.extractSummaryItem}>
              <Text style={styles.extractSummaryLabel}>Total Investido</Text>
              <Text style={[styles.extractSummaryValue, { color: '#EF4444' }]}>
                R$ 40.000,00
              </Text>
            </View>
            <View style={styles.extractSummaryItem}>
              <Text style={styles.extractSummaryLabel}>Total Recebido</Text>
              <Text style={[styles.extractSummaryValue, { color: '#10B981' }]}>
                R$ 4.200,00
              </Text>
            </View>
          </View>
          <View style={styles.extractSummaryDivider} />
          <View style={styles.extractSummaryTotal}>
            <Text style={styles.extractSummaryTotalLabel}>Saldo Líquido</Text>
            <Text style={[styles.extractSummaryTotalValue, { color: '#10B981' }]}>
              R$ 4.080,00
            </Text>
          </View>
        </View>

        {/* Period Filter */}
        <View style={styles.periodControl}>
          <View style={styles.segmentContainer}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.segmentButton,
                  selectedPeriod === period.key && styles.segmentButtonActive
                ]}
                onPress={() => setSelectedPeriod(period.key)}
              >
                <Text style={[
                  styles.segmentText,
                  selectedPeriod === period.key ? styles.segmentTextActive : null
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Transaction Type Filter */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.key && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.filterTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Transactions List */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Transações</Text>
          {filteredTransactions.map((transaction, index) => (
            <View key={transaction.id}>
              <View style={styles.extractTransactionItem}>
                <View style={[
                  styles.extractTransactionIcon,
                  { backgroundColor: `${getTransactionColor(transaction.type)}20` }
                ]}>
                  <Ionicons 
                    name={getTransactionIcon(transaction.type)} 
                    size={20} 
                    color={getTransactionColor(transaction.type)} 
                  />
                </View>
                <View style={styles.extractTransactionInfo}>
                  <Text style={styles.extractTransactionTitle}>
                    {transaction.title}
                  </Text>
                  <Text style={styles.extractTransactionDate}>
                    {formatDate(transaction.date)}
                  </Text>
                </View>
                <View style={styles.extractTransactionAmount}>
                  <Text style={[
                    styles.extractTransactionValue,
                    { color: getTransactionColor(transaction.type) }
                  ]}>
                    {formatCurrency(transaction.amount)}
                  </Text>
                </View>
              </View>
              {index < filteredTransactions.length - 1 && (
                <View style={styles.extractTransactionDivider} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------- Placeholders for other tabs ----------------
function ProfileScreen({ navigation }) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollViewWithNavbar}>
        {/* Header */}
        <View style={styles.topbar}>
          <Text style={styles.topbarTitle}>Perfil</Text>
          <View style={styles.topbarIcons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name="settings-outline" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Card */}
        <View style={[styles.card, styles.profileCard]}>
          <View style={styles.profileHeader}>
            <LinearGradient
              colors={[colors.accent, colors.accent2]}
              style={styles.profileAvatarRing}
            >
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>JL</Text>
              </View>
            </LinearGradient>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>João Leismann</Text>
              <Text style={styles.profileEmail}>joao@example.com</Text>
              <View style={styles.profileBadge}>
                <Text style={styles.profileBadgeText}>Investidor Premium</Text>
              </View>
            </View>
          </View>
        </View>



        {/* Account Info */}
        <View style={[styles.card, styles.accountCard]}>
          <Text style={styles.sectionTitle}>Informações da Conta</Text>
          <View style={styles.accountInfo}>
            <View style={styles.accountItem}>
              <Text style={styles.accountLabel}>CPF</Text>
              <Text style={styles.accountValue}>123.456.789-00</Text>
            </View>
            <View style={styles.accountItem}>
              <Text style={styles.accountLabel}>Telefone</Text>
              <Text style={styles.accountValue}>(11) 99999-9999</Text>
            </View>
            <View style={styles.accountItem}>
              <Text style={styles.accountLabel}>Data de Nascimento</Text>
              <Text style={styles.accountValue}>15/03/1990</Text>
            </View>
            <View style={styles.accountItem}>
              <Text style={styles.accountLabel}>Membro desde</Text>
              <Text style={styles.accountValue}>Janeiro 2023</Text>
            </View>
          </View>
        </View>

        {/* Support */}
        <View style={[styles.card, styles.supportCard]}>
          <Text style={styles.sectionTitle}>Suporte</Text>
          <TouchableOpacity style={styles.supportItem}>
            <Ionicons name="help-circle-outline" size={24} color={colors.accent} />
            <Text style={styles.supportText}>Central de Ajuda</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportItem}>
            <Ionicons name="chatbubble-outline" size={24} color={colors.accent} />
            <Text style={styles.supportText}>Falar com Suporte</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportItem}>
            <Ionicons name="star-outline" size={24} color={colors.accent} />
            <Text style={styles.supportText}>Avaliar App</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
        </View>

        {/* Menu Links */}
        <View style={[styles.card, styles.menuCard]}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color={colors.accent} />
            <Text style={styles.menuText}>Perfil</Text>
            <Text style={styles.menuSubText}>(para edição)</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('BankData')}
          >
            <Ionicons name="card-outline" size={24} color={colors.accent} />
            <Text style={styles.menuText}>Dados Bancários</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Withdraw')}
          >
            <Ionicons name="arrow-up-circle-outline" size={24} color={colors.accent} />
            <Text style={styles.menuText}>Resgate</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Tax')}
          >
            <Ionicons name="document-text-outline" size={24} color={colors.accent} />
            <Text style={styles.menuText}>Imposto de Renda</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={24} color={colors.accent} />
            <Text style={styles.menuText}>Configurações</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color={colors.accent} />
            <Text style={styles.menuText}>Dúvidas Frequentes</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="people-outline" size={24} color={colors.accent} />
            <Text style={styles.menuText}>Indique um amigo</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="shield-checkmark-outline" size={24} color={colors.accent} />
            <Text style={styles.menuText}>Legal</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text style={[styles.menuText, { color: '#EF4444' }]}>Sair da conta</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.sub} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Dados Bancários Screen
function BankDataScreen({ navigation }) {
  const [bankData, setBankData] = useState({
    bank: '',
    agency: '',
    account: '',
    accountType: 'corrente',
    cpf: '123.456.789-00',
    name: 'João Leismann'
  });

  const banks = [
    'Banco do Brasil',
    'Bradesco',
    'Caixa Econômica Federal',
    'Itaú',
    'Santander',
    'Nubank',
    'Inter',
    'C6 Bank',
    'Outros'
  ];

  const handleSave = () => {
    Alert.alert(
      'Dados Salvos',
      'Suas informações bancárias foram atualizadas com sucesso!',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollViewWithNavbar}>
        {/* Header */}
        <View style={styles.topbar}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-outline" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.topbarTitle}>Dados Bancários</Text>
          <View style={styles.topbarIcons} />
        </View>

        {/* Info Card */}
        <View style={[styles.card, styles.infoCard]}>
          <View style={styles.infoHeader}>
            <Ionicons name="shield-checkmark" size={24} color={colors.accent} />
            <Text style={styles.infoTitle}>Segurança dos seus dados</Text>
          </View>
          <Text style={styles.infoText}>
            Suas informações bancárias são criptografadas e protegidas. Utilizamos os mais altos padrões de segurança para garantir a proteção dos seus dados.
          </Text>
        </View>

        {/* Form Card */}
        <View style={[styles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Informações Bancárias</Text>
          
          {/* Bank Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Banco</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={bankData.bank}
                onValueChange={(value) => setBankData({...bankData, bank: value})}
                style={styles.picker}
              >
                <Picker.Item label="Selecione seu banco" value="" />
                {banks.map((bank, index) => (
                  <Picker.Item key={index} label={bank} value={bank} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Agency */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Agência</Text>
            <TextInput
              style={styles.textInput}
              value={bankData.agency}
              onChangeText={(text) => setBankData({...bankData, agency: text})}
              placeholder="Ex: 1234"
              keyboardType="numeric"
            />
          </View>

          {/* Account */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Conta</Text>
            <TextInput
              style={styles.textInput}
              value={bankData.account}
              onChangeText={(text) => setBankData({...bankData, account: text})}
              placeholder="Ex: 12345-6"
            />
          </View>

          {/* Account Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tipo de Conta</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setBankData({...bankData, accountType: 'corrente'})}
              >
                <View style={[styles.radioCircle, bankData.accountType === 'corrente' && styles.radioCircleSelected]}>
                  {bankData.accountType === 'corrente' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>Conta Corrente</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setBankData({...bankData, accountType: 'poupanca'})}
              >
                <View style={[styles.radioCircle, bankData.accountType === 'poupanca' && styles.radioCircleSelected]}>
                  {bankData.accountType === 'poupanca' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>Conta Poupança</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* CPF (readonly) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CPF</Text>
            <TextInput
              style={[styles.textInput, styles.textInputDisabled]}
              value={bankData.cpf}
              editable={false}
            />
          </View>

          {/* Name (readonly) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome do Titular</Text>
            <TextInput
              style={[styles.textInput, styles.textInputDisabled]}
              value={bankData.name}
              editable={false}
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.continueButton, (!bankData.bank || !bankData.agency || !bankData.account) && styles.continueButtonDisabled]}
          onPress={handleSave}
          disabled={!bankData.bank || !bankData.agency || !bankData.account}
        >
          <Text style={[styles.continueButtonText, (!bankData.bank || !bankData.agency || !bankData.account) && styles.continueButtonTextDisabled]}>
            Salvar Dados Bancários
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Resgate Screen
function WithdrawScreen({ navigation }) {
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawType, setWithdrawType] = useState('partial');

  const investments = [
    {
      id: 1,
      name: 'EcoTech Solutions',
      amount: 5000,
      available: 4800,
      type: 'Startup',
      profitability: '+12%'
    },
    {
      id: 2,
      name: 'GreenEnergy Corp',
      amount: 3000,
      available: 3200,
      type: 'Energia',
      profitability: '+8%'
    },
    {
      id: 3,
      name: 'HealthTech Innovation',
      amount: 2500,
      available: 2650,
      type: 'Saúde',
      profitability: '+6%'
    }
  ];

  const handleWithdraw = () => {
    if (!selectedInvestment) {
      Alert.alert('Erro', 'Selecione um investimento para resgatar.');
      return;
    }

    if (withdrawType === 'partial' && (!withdrawAmount || parseFloat(withdrawAmount) <= 0)) {
      Alert.alert('Erro', 'Informe um valor válido para resgate.');
      return;
    }

    const amount = withdrawType === 'total' ? selectedInvestment.available : parseFloat(withdrawAmount);
    
    Alert.alert(
      'Confirmar Resgate',
      `Deseja resgatar R$ ${amount.toFixed(2)} do investimento ${selectedInvestment.name}?\n\nO valor será creditado em sua conta em até 2 dias úteis.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            Alert.alert('Resgate Solicitado', 'Sua solicitação de resgate foi processada com sucesso!');
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollViewWithNavbar}>
        {/* Header */}
        <View style={styles.topbar}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-outline" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.topbarTitle}>Resgate</Text>
          <View style={styles.topbarIcons} />
        </View>

        {/* Info Card */}
        <View style={[styles.card, styles.infoCard]}>
          <View style={styles.infoHeader}>
            <Ionicons name="time-outline" size={24} color={colors.accent} />
            <Text style={styles.infoTitle}>Prazo para resgate</Text>
          </View>
          <Text style={styles.infoText}>
            O valor será creditado em sua conta bancária cadastrada em até 2 dias úteis após a confirmação.
          </Text>
        </View>

        {/* Investments List */}
        <View style={[styles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Selecione o investimento</Text>
          
          {investments.map((investment) => (
            <TouchableOpacity
              key={investment.id}
              style={[
                styles.investmentOption,
                selectedInvestment?.id === investment.id && styles.investmentOptionSelected
              ]}
              onPress={() => setSelectedInvestment(investment)}
            >
              <View style={styles.investmentInfo}>
                <Text style={styles.investmentName}>{investment.name}</Text>
                <Text style={styles.investmentType}>{investment.type}</Text>
                <View style={styles.investmentAmounts}>
                  <Text style={styles.investmentAmount}>
                    Investido: R$ {investment.amount.toLocaleString('pt-BR')}
                  </Text>
                  <Text style={[styles.investmentAmount, styles.availableAmount]}>
                    Disponível: R$ {investment.available.toLocaleString('pt-BR')}
                  </Text>
                  <Text style={[styles.investmentAmount, styles.profitability]}>
                    {investment.profitability}
                  </Text>
                </View>
              </View>
              <View style={[styles.radioCircle, selectedInvestment?.id === investment.id && styles.radioCircleSelected]}>
                {selectedInvestment?.id === investment.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Withdraw Type */}
        {selectedInvestment && (
          <View style={[styles.card, styles.formCard]}>
            <Text style={styles.sectionTitle}>Tipo de resgate</Text>
            
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setWithdrawType('partial')}
              >
                <View style={[styles.radioCircle, withdrawType === 'partial' && styles.radioCircleSelected]}>
                  {withdrawType === 'partial' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>Resgate Parcial</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setWithdrawType('total')}
              >
                <View style={[styles.radioCircle, withdrawType === 'total' && styles.radioCircleSelected]}>
                  {withdrawType === 'total' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>Resgate Total</Text>
              </TouchableOpacity>
            </View>

            {withdrawType === 'partial' && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Valor do resgate</Text>
                <TextInput
                  style={styles.textInput}
                  value={withdrawAmount}
                  onChangeText={setWithdrawAmount}
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                />
                <Text style={styles.inputHelper}>
                  Máximo disponível: R$ {selectedInvestment.available.toLocaleString('pt-BR')}
                </Text>
              </View>
            )}

            {withdrawType === 'total' && (
              <View style={styles.totalWithdrawInfo}>
                <Text style={styles.totalWithdrawLabel}>Valor total do resgate:</Text>
                <Text style={styles.totalWithdrawAmount}>
                  R$ {selectedInvestment.available.toLocaleString('pt-BR')}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Withdraw Button */}
        {selectedInvestment && (
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleWithdraw}
          >
            <Text style={styles.continueButtonText}>
              Solicitar Resgate
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Imposto de Renda Screen
function TaxScreen({ navigation }) {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [documents, setDocuments] = useState([]);

  const years = ['2024', '2023', '2022', '2021'];
  
  const taxData = {
    '2024': {
      totalInvested: 15000,
      totalProfit: 1800,
      totalTax: 270,
      investments: [
        { name: 'EcoTech Solutions', invested: 5000, profit: 600, tax: 90 },
        { name: 'GreenEnergy Corp', invested: 3000, profit: 240, tax: 36 },
        { name: 'HealthTech Innovation', invested: 2500, profit: 150, tax: 22.5 },
        { name: 'AgriTech Startup', invested: 4500, profit: 810, tax: 121.5 }
      ]
    },
    '2023': {
      totalInvested: 12000,
      totalProfit: 1440,
      totalTax: 216,
      investments: [
        { name: 'EcoTech Solutions', invested: 4000, profit: 480, tax: 72 },
        { name: 'GreenEnergy Corp', invested: 3000, profit: 360, tax: 54 },
        { name: 'HealthTech Innovation', invested: 5000, profit: 600, tax: 90 }
      ]
    }
  };

  const currentYearData = taxData[selectedYear] || { totalInvested: 0, totalProfit: 0, totalTax: 0, investments: [] };

  const generateDocument = (type) => {
    Alert.alert(
      'Documento Gerado',
      `O documento ${type} para o ano de ${selectedYear} foi gerado com sucesso!`,
      [
        { text: 'OK' },
        { 
          text: 'Baixar', 
          onPress: () => {
            Alert.alert('Download', 'Documento baixado com sucesso!');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollViewWithNavbar}>
        {/* Header */}
        <View style={styles.topbar}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-outline" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.topbarTitle}>Imposto de Renda</Text>
          <View style={styles.topbarIcons} />
        </View>

        {/* Info Card */}
        <View style={[styles.card, styles.infoCard]}>
          <View style={styles.infoHeader}>
            <Ionicons name="document-text-outline" size={24} color={colors.accent} />
            <Text style={styles.infoTitle}>Declaração de IR</Text>
          </View>
          <Text style={styles.infoText}>
            Aqui você encontra todos os documentos necessários para declarar seus investimentos no Imposto de Renda.
          </Text>
        </View>

        {/* Year Selection */}
        <View style={[styles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Selecione o ano</Text>
          <View style={styles.yearSelector}>
            {years.map((year) => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.yearButton,
                  selectedYear === year && styles.yearButtonSelected
                ]}
                onPress={() => setSelectedYear(year)}
              >
                <Text style={[
                  styles.yearButtonText,
                  selectedYear === year && styles.yearButtonTextSelected
                ]}>
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tax Summary */}
        <View style={[styles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Resumo {selectedYear}</Text>
          
          <View style={styles.taxSummary}>
            <View style={styles.taxSummaryItem}>
              <Text style={styles.taxSummaryLabel}>Total Investido</Text>
              <Text style={styles.taxSummaryValue}>
                R$ {currentYearData.totalInvested.toLocaleString('pt-BR')}
              </Text>
            </View>
            
            <View style={styles.taxSummaryItem}>
              <Text style={styles.taxSummaryLabel}>Lucro Total</Text>
              <Text style={[styles.taxSummaryValue, styles.profitValue]}>
                R$ {currentYearData.totalProfit.toLocaleString('pt-BR')}
              </Text>
            </View>
            
            <View style={styles.taxSummaryItem}>
              <Text style={styles.taxSummaryLabel}>Imposto Devido (15%)</Text>
              <Text style={[styles.taxSummaryValue, styles.taxValue]}>
                R$ {currentYearData.totalTax.toLocaleString('pt-BR')}
              </Text>
            </View>
          </View>
        </View>

        {/* Investment Details */}
        {currentYearData.investments.length > 0 && (
          <View style={[styles.card, styles.formCard]}>
            <Text style={styles.sectionTitle}>Detalhamento por Investimento</Text>
            
            {currentYearData.investments.map((investment, index) => (
              <View key={index} style={styles.investmentTaxItem}>
                <Text style={styles.investmentTaxName}>{investment.name}</Text>
                <View style={styles.investmentTaxDetails}>
                  <Text style={styles.investmentTaxDetail}>
                    Investido: R$ {investment.invested.toLocaleString('pt-BR')}
                  </Text>
                  <Text style={[styles.investmentTaxDetail, styles.profitDetail]}>
                    Lucro: R$ {investment.profit.toLocaleString('pt-BR')}
                  </Text>
                  <Text style={[styles.investmentTaxDetail, styles.taxDetail]}>
                    Imposto: R$ {investment.tax.toLocaleString('pt-BR')}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Documents */}
        <View style={[styles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Documentos Disponíveis</Text>
          
          <TouchableOpacity 
            style={styles.documentButton}
            onPress={() => generateDocument('Informe de Rendimentos')}
          >
            <Ionicons name="document-outline" size={24} color={colors.accent} />
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>Informe de Rendimentos</Text>
              <Text style={styles.documentDescription}>
                Documento oficial com todos os rendimentos do ano
              </Text>
            </View>
            <Ionicons name="download-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.documentButton}
            onPress={() => generateDocument('Demonstrativo de Ganhos de Capital')}
          >
            <Ionicons name="bar-chart-outline" size={24} color={colors.accent} />
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>Demonstrativo de Ganhos de Capital</Text>
              <Text style={styles.documentDescription}>
                Relatório detalhado de ganhos e perdas de capital
              </Text>
            </View>
            <Ionicons name="download-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.documentButton}
            onPress={() => generateDocument('Extrato Anual')}
          >
            <Ionicons name="receipt-outline" size={24} color={colors.accent} />
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>Extrato Anual</Text>
              <Text style={styles.documentDescription}>
                Extrato completo de todas as movimentações
              </Text>
            </View>
            <Ionicons name="download-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={[styles.card, styles.infoCard]}>
          <View style={styles.infoHeader}>
            <Ionicons name="help-circle-outline" size={24} color={colors.accent} />
            <Text style={styles.infoTitle}>Precisa de ajuda?</Text>
          </View>
          <Text style={styles.infoText}>
            Entre em contato com nosso suporte especializado em questões tributárias para esclarecer suas dúvidas sobre a declaração do IR.
          </Text>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpButtonText}>Falar com Especialista</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Configurações Screen
function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    investment: true,
    news: false
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'pt-BR',
    currency: 'BRL'
  });

  const handleNotificationChange = (type, value) => {
    setNotifications(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handlePreferenceChange = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSaveSettings = () => {
    Alert.alert(
      'Configurações Salvas',
      'Suas preferências foram atualizadas com sucesso!',
      [{ text: 'OK' }]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e todos os seus dados serão perdidos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Conta Excluída', 'Sua conta foi excluída com sucesso.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollViewWithNavbar}>
        {/* Header */}
        <View style={styles.topbar}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-outline" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.topbarTitle}>Configurações</Text>
          <View style={styles.topbarIcons} />
        </View>

        {/* Notifications Section */}
        <View style={[styles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Notificações Push</Text>
              <Text style={styles.settingDescription}>Receba alertas no seu dispositivo</Text>
            </View>
            <Switch
              value={notifications.push}
              onValueChange={(value) => handleNotificationChange('push', value)}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={notifications.push ? colors.background : colors.textSecondary}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Notificações por Email</Text>
              <Text style={styles.settingDescription}>Receba atualizações por email</Text>
            </View>
            <Switch
              value={notifications.email}
              onValueChange={(value) => handleNotificationChange('email', value)}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={notifications.email ? colors.background : colors.textSecondary}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>SMS</Text>
              <Text style={styles.settingDescription}>Receba alertas por SMS</Text>
            </View>
            <Switch
              value={notifications.sms}
              onValueChange={(value) => handleNotificationChange('sms', value)}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={notifications.sms ? colors.background : colors.textSecondary}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Atualizações de Investimentos</Text>
              <Text style={styles.settingDescription}>Notificações sobre seus investimentos</Text>
            </View>
            <Switch
              value={notifications.investment}
              onValueChange={(value) => handleNotificationChange('investment', value)}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={notifications.investment ? colors.background : colors.textSecondary}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Notícias e Novidades</Text>
              <Text style={styles.settingDescription}>Receba novidades sobre o mercado</Text>
            </View>
            <Switch
              value={notifications.news}
              onValueChange={(value) => handleNotificationChange('news', value)}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={notifications.news ? colors.background : colors.textSecondary}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={[styles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Tema</Text>
              <Text style={styles.settingDescription}>Escolha o tema do aplicativo</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={preferences.theme}
                onValueChange={(value) => handlePreferenceChange('theme', value)}
                style={styles.settingPicker}
              >
                <Picker.Item label="Claro" value="light" />
                <Picker.Item label="Escuro" value="dark" />
                <Picker.Item label="Automático" value="auto" />
              </Picker>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Idioma</Text>
              <Text style={styles.settingDescription}>Idioma do aplicativo</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={preferences.language}
                onValueChange={(value) => handlePreferenceChange('language', value)}
                style={styles.settingPicker}
              >
                <Picker.Item label="Português (BR)" value="pt-BR" />
                <Picker.Item label="English (US)" value="en-US" />
                <Picker.Item label="Español" value="es" />
              </Picker>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Moeda</Text>
              <Text style={styles.settingDescription}>Moeda padrão para exibição</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={preferences.currency}
                onValueChange={(value) => handlePreferenceChange('currency', value)}
                style={styles.settingPicker}
              >
                <Picker.Item label="Real (BRL)" value="BRL" />
                <Picker.Item label="Dólar (USD)" value="USD" />
                <Picker.Item label="Euro (EUR)" value="EUR" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Security Section */}
        <View style={[styles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Segurança</Text>
          
          <TouchableOpacity style={styles.settingButton}>
            <Ionicons name="key-outline" size={24} color={colors.accent} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Alterar Senha</Text>
              <Text style={styles.settingDescription}>Atualize sua senha de acesso</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton}>
            <Ionicons name="finger-print-outline" size={24} color={colors.accent} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Biometria</Text>
              <Text style={styles.settingDescription}>Configure acesso por biometria</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton}>
            <Ionicons name="shield-checkmark-outline" size={24} color={colors.accent} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Autenticação em Duas Etapas</Text>
              <Text style={styles.settingDescription}>Adicione uma camada extra de segurança</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={[styles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          
          <TouchableOpacity style={styles.settingButton}>
            <Ionicons name="information-circle-outline" size={24} color={colors.accent} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Versão do App</Text>
              <Text style={styles.settingDescription}>v1.0.0 (Build 100)</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton}>
            <Ionicons name="document-text-outline" size={24} color={colors.accent} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Termos de Uso</Text>
              <Text style={styles.settingDescription}>Leia nossos termos e condições</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton}>
            <Ionicons name="shield-outline" size={24} color={colors.accent} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Política de Privacidade</Text>
              <Text style={styles.settingDescription}>Como protegemos seus dados</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleSaveSettings}
        >
          <Text style={styles.continueButtonText}>
            Salvar Configurações
          </Text>
        </TouchableOpacity>

        {/* Danger Zone */}
        <View style={[styles.card, styles.dangerCard]}>
          <Text style={[styles.sectionTitle, styles.dangerTitle]}>Zona de Perigo</Text>
          
          <TouchableOpacity 
            style={styles.dangerButton}
            onPress={handleDeleteAccount}
          >
            <Ionicons name="trash-outline" size={24} color={colors.danger} />
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, styles.dangerText]}>Excluir Conta</Text>
              <Text style={styles.settingDescription}>Esta ação não pode ser desfeita</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function InvestStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InvestMain" component={InvestScreen} />
      <Stack.Screen name="OpportunityDetails" component={OpportunityDetailsScreen} />
      <Stack.Screen name="InvestmentAmount" component={InvestmentAmountScreen} />
      <Stack.Screen name="InvestorProfile" component={InvestorProfileScreen} />
      <Stack.Screen name="InvestmentConfirmation" component={InvestmentConfirmationScreen} />
    </Stack.Navigator>
  );
}

function PortfolioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PortfolioMain" component={PortfolioScreen} />
      <Stack.Screen name="InvestmentDetails" component={InvestmentDetailsScreen} />
      <Stack.Screen name="BankData" component={BankDataScreen} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} />
      <Stack.Screen name="Tax" component={TaxScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Carteira"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.sub,
          tabBarStyle: {
            height: 80,
            paddingBottom: 20,
            paddingTop: 16,
            paddingHorizontal: 20,
            borderTopWidth: 0,
            backgroundColor: 'rgba(248, 250, 252, 0.98)',
            backdropFilter: 'blur(40px)',
            shadowColor: colors.shadow,
            shadowOpacity: 0.08,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: -4 },
            elevation: 12,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            position: 'absolute',
            overflow: 'visible',
            borderWidth: 1,
            borderColor: 'rgba(226, 232, 240, 0.6)',
          },
        }}
      >
        <Tab.Screen
          name="Carteira"
          component={WalletScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.modernTabContainer}>
                <View style={[styles.modernIconWrapper, focused && styles.modernIconWrapperActive]}>
                  <Ionicons 
                    name={focused ? "wallet" : "wallet-outline"} 
                    color={focused ? '#FFFFFF' : color} 
                    size={22} 
                  />
                </View>
                {focused && <View style={styles.modernActiveIndicator} />}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={PortfolioStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.modernTabContainer}>
                <View style={[styles.modernIconWrapper, focused && styles.modernIconWrapperActive]}>
                  <Ionicons 
                    name={focused ? "grid" : "grid-outline"} 
                    color={focused ? '#FFFFFF' : color} 
                    size={22} 
                  />
                </View>
                {focused && <View style={styles.modernActiveIndicator} />}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Investir"
          component={InvestStack}
          options={{
            tabBarLabel: 'Investir',
            tabBarIcon: ({ focused }) => (
              <View style={styles.modernFabWrapper}>
                <LinearGradient 
                  colors={focused ? ['#0EA5E9', '#0284C7', '#0369A1'] : ['#3B82F6', '#2563EB']} 
                  start={{ x: 0, y: 0 }} 
                  end={{ x: 1, y: 1 }} 
                  style={[
                    styles.modernFabButton, 
                    { 
                      transform: [
                        { translateY: focused ? -14 : -10 },
                        { scale: focused ? 1.2 : 1.0 }
                      ] 
                    }
                  ]}
                >
                  <Ionicons 
                    name="add" 
                    size={focused ? 30 : 26} 
                    color="#FFFFFF" 
                  />
                  {focused && (
                    <>
                      <View style={styles.modernFabGlow} />
                      <View style={styles.modernFabPulse} />
                    </>
                  )}
                </LinearGradient>
              </View>
            ),
            tabBarItemStyle: { paddingTop: 0 },
          }}
        />
        <Tab.Screen
          name="Extrato"
          component={ExtractScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.modernTabContainer}>
                <View style={[styles.modernIconWrapper, focused && styles.modernIconWrapperActive]}>
                  <Ionicons 
                    name={focused ? "receipt" : "receipt-outline"} 
                    color={focused ? '#FFFFFF' : color} 
                    size={22} 
                  />
                </View>
                {focused && <View style={styles.modernActiveIndicator} />}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.modernTabContainer}>
                <View style={[styles.modernIconWrapper, focused && styles.modernIconWrapperActive]}>
                  <Ionicons 
                    name={focused ? "person-circle" : "person-circle-outline"} 
                    color={focused ? '#FFFFFF' : color} 
                    size={22} 
                  />
                </View>
                {focused && <View style={styles.modernActiveIndicator} />}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // NAVBAR SPACING PATTERN - Use these styles for consistent navbar spacing
  // For ScrollViews: use scrollViewWithNavbar or scrollContent
  // For containers: use containerWithNavbar
  // All styles include 15px extra space for bottom navbar
  
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS === 'android' ? 8 : 0,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 47, // 32 + 15px extra space for navbar
    gap: 16,
  },
  // Estilos padrão para ScrollViews com espaçamento do navbar
  scrollViewWithNavbar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 115, // 100 + 15px extra space for navbar
    gap: 16,
  },
  containerWithNavbar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 47, // 32 + 15px extra space for navbar
    gap: 16,
  },
  scrollContent: {
    paddingBottom: 115, // 100 + 15px extra space for navbar
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

  // Header Logo
  headerLogo: {
    width: 32,
    height: 32,
    marginRight: 12,
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
    position: 'relative',
  },
  // Modern Tab Navigation Styles
  modernTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  modernIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease',
  },
  modernIconWrapperActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    transform: [{ scale: 1.1 }],
    shadowColor: '#3B82F6',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  modernActiveIndicator: {
    position: 'absolute',
    bottom: -12,
    width: 24,
    height: 3,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  modernFabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  modernFabButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    position: 'relative',
  },
  modernFabGlow: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#3B82F6',
    opacity: 0.15,
    zIndex: -1,
  },
  modernFabPulse: {
    position: 'absolute',
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#3B82F6',
    opacity: 0.08,
    zIndex: -2,
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
    gap: 12,
  },
  investmentType: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    backgroundColor: colors.card2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusActive: {
    backgroundColor: '#E8F5E8',
  },
  statusPending: {
    backgroundColor: '#FFF3CD',
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
  statusPendingText: {
    color: '#856404',
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
    backgroundColor: colors.accentLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent + '20',
    shadowColor: colors.accent,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  detailsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accent,
    marginRight: 4,
    letterSpacing: -0.1,
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
  },

  // Filter Styles
  filterContainer: {
    marginBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 4,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  filterButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Estilos da página de detalhes da oportunidade
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card2,
  },
  detailsHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  shareButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card2,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  coverContainer: {
    margin: 20,
    marginBottom: 16,
  },
  coverPlaceholder: {
    height: 200,
    backgroundColor: colors.card2,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  coverText: {
    fontSize: 16,
    color: colors.sub,
    marginTop: 8,
    fontWeight: '500',
  },
  mainInfoCard: {
    marginTop: 0,
    marginBottom: 16,
  },
  opportunityTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  opportunityType: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    fontWeight: '500',
  },
  mainInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  mainInfoItem: {
    flex: 1,
    minWidth: '45%',
  },
  mainInfoLabel: {
    fontSize: 12,
    color: colors.sub,
    marginBottom: 4,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mainInfoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  progressChartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 8,
    borderColor: colors.cardBorder,
  },
  progressFillCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: colors.accent,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  progressInnerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.sub,
    marginTop: 2,
    fontWeight: '500',
  },
  infoCard: {
    marginTop: 0,
    marginBottom: 16,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  statusInfo: {
    marginTop: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  statusValueHighlight: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
  },
  contentText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  // Tab styles
  tabContainer: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  tabBar: {
    backgroundColor: colors.card,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  tabIndicator: {
    backgroundColor: colors.accent,
    height: 3,
    borderRadius: 2,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'none',
    letterSpacing: -0.2,
  },
  tabLabelActive: {
    color: colors.accent,
  },
  tabLabelInactive: {
    color: colors.textSecondary,
  },
  tabContent: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 115, // 100 + 15px extra space for navbar
  },
  tabScrollView: {
    flex: 1,
    paddingBottom: 115, // 100 + 15px extra space for navbar
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 4,
  },
  investButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 4,
  },
  investNowButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  investNowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  topInvestButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  topInvestButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  topInvestButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.card2,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  documentIcon: {
    marginRight: 12,
  },
  documentText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  documentDownloadIcon: {
    padding: 4,
  },

  // Extract Screen Styles
  extractSummaryCard: {
    marginBottom: 16,
  },
  extractSummaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  extractSummaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  extractSummaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  extractSummaryLabel: {
    fontSize: 12,
    color: colors.sub,
    marginBottom: 4,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  extractSummaryValue: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  extractSummaryDivider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginBottom: 16,
  },
  extractSummaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extractSummaryTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  extractSummaryTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  extractTransactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  extractTransactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  extractTransactionInfo: {
    flex: 1,
  },
  extractTransactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  extractTransactionDate: {
    fontSize: 12,
    color: colors.sub,
    fontWeight: '500',
  },
  extractTransactionAmount: {
    alignItems: 'flex-end',
  },
  extractTransactionValue: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  extractTransactionDivider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginLeft: 52,
  },
  
  // Profile Screen Styles
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatarRing: {
    padding: 4,
    borderRadius: 36,
    marginRight: 16,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: -0.5,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  profileBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  profileBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent,
  },
  
  balanceCard: {
    marginBottom: 16,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.8,
  },
  balanceSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  balanceProfit: {
    color: '#10B981',
    fontWeight: '600',
  },
  
  actionsCard: {
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  // Estilos para o card de Ações Rápidas
  quickActionsCard: {
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  accountCard: {
    marginBottom: 16,
  },
  accountInfo: {
    marginTop: 16,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  accountLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  accountValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  
  supportCard: {
    marginBottom: 32,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  supportText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
    marginLeft: 12,
  },

  // Menu Card Styles
  menuCard: {
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
    marginLeft: 12,
  },
  menuSubText: {
    fontSize: 14,
    color: colors.sub,
    fontWeight: '400',
    marginLeft: 4,
  },

  // Estilos dos Cards de Investidores
  investorsList: {
    marginTop: 20,
  },
  investorListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.card2,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  investorListLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
    flex: 1,
  },
  investorListValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.4,
    textAlign: 'right',
  },

  // Estilos dos Cards de Empreendedores
  entrepreneurCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  entrepreneurAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: colors.accent,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  entrepreneurAvatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.4,
  },
  entrepreneurInfo: {
    flex: 1,
  },
  entrepreneurName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  entrepreneurRole: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
    marginBottom: 6,
  },
  entrepreneurExperience: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    lineHeight: 18,
  },

  // Estilos das Informações Essenciais
  essentialInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 20,
  },
  essentialInfoItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  essentialInfoLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  essentialInfoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  
  // Investment Process Styles
  investmentContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  investmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  investmentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
  investmentBackButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card2,
  },
  investmentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
    flex: 1,
  },
  investmentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  investmentIcon: {
    marginRight: 12,
  },
  investmentContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  investmentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  investmentLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
    letterSpacing: -0.1,
  },
  investmentInput: {
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    minHeight: 50,
  },
  investmentInputFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.card,
  },
  investmentAmountInput: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
    letterSpacing: -0.5,
  },
  investmentRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 4,
  },
  investmentHalfInput: {
    flex: 1,
  },
  investmentPickerContainer: {
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    minHeight: 50,
  },
  investmentPicker: {
    height: 50,
    color: colors.text,
    backgroundColor: 'transparent',
  },
  investmentCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 12,
  },
  investmentCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  investmentCheckboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  investmentCheckboxText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  investmentTermsText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 20,
  },
  investmentButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  investmentButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  investmentButtonDisabled: {
    backgroundColor: colors.cardBorder,
    shadowOpacity: 0,
  },
  investmentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  investmentButtonTextDisabled: {
    color: colors.sub,
  },
  investmentSummaryCard: {
    backgroundColor: colors.accentLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.accent + '20',
  },
  investmentSummaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  investmentSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  investmentSummaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  investmentSummaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  investmentSummaryTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.accent + '30',
    paddingTop: 12,
    marginTop: 8,
  },
  investmentSummaryTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: -0.4,
  },
  investmentPaymentLink: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  investmentPaymentLinkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  investmentSuccessIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#10B981',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  investmentSuccessTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  investmentSuccessSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },

  // Form Styles
  formRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  formField: {
    flex: 1,
  },
  formFieldFull: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
    letterSpacing: -0.1,
  },
  formInput: {
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.text,
    minHeight: 50,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 50,
  },
  picker: {
    height: 50,
    color: colors.text,
    backgroundColor: 'transparent',
  },

  // Investment Amount Screen Styles
  investmentHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  investmentSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  amountInputContainer: {
    backgroundColor: colors.card2,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  amountInputContainerFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.card,
    shadowColor: colors.accent,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  amountInputContainerError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textSecondary,
    marginRight: 8,
  },
  amountInput: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'left',
    letterSpacing: -0.8,
    minWidth: 120,
    flex: 1,
  },
  validationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  validationText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
    flex: 1,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
    flex: 1,
    lineHeight: 20,
  },
  suggestedAmounts: {
    marginBottom: 24,
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  suggestedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  suggestedButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  suggestedButtonSelected: {
    backgroundColor: colors.accentLight,
    borderColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  suggestedButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.2,
  },
  suggestedButtonTextSelected: {
    color: colors.accent,
    fontWeight: '700',
  },
  // Investment Screen Sections
  investmentHeaderSection: {
    marginBottom: 32,
  },

  investmentHeaderSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  
  investmentAmountSection: {
    marginBottom: 32,
  },
  
  investmentSuggestedSection: {
    marginBottom: 32,
  },
  
  investmentInfoSection: {
    marginBottom: 24,
  },
  
  // Enhanced Amount Input Styles
  investmentAmountCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    alignItems: 'center',
  },
  
  investmentAmountCardFocused: {
    borderColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  
  investmentAmountCardError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  
  // Enhanced Suggested Values
  suggestedValuesCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  
  suggestedValuesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  
  suggestedValuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  
  suggestedValueButton: {
    backgroundColor: colors.card2,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  
  suggestedValueButtonSelected: {
    backgroundColor: colors.accentLight,
    borderColor: colors.accent,
    borderWidth: 2,
    shadowColor: colors.accent,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
    transform: [{ scale: 1.02 }],
  },
  
  suggestedValueText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  
  suggestedValueTextSelected: {
    color: colors.accent,
    fontSize: 16,
  },
  
  // Enhanced Investment Info
  investmentInfoCard: {
    backgroundColor: colors.accentLight,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.accent + '30',
    shadowColor: colors.accent,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  
  investmentInfoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  
  // Novos estilos para as seções reorganizadas
  investmentHeaderSection: {
    marginBottom: 32,
    paddingHorizontal: 4,
  },

  investmentHeaderSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  investmentAmountSection: {
    marginBottom: 32,
  },
  investmentSuggestedSection: {
    marginBottom: 32,
  },
  investmentInfoSection: {
    marginBottom: 20,
  },
  
  // Estilos aprimorados para o cartão de entrada de valor
  investmentAmountCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 16,
  },
  investmentAmountCardFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
    shadowColor: colors.accent,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  investmentAmountCardError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.accent,
    marginRight: 12,
    letterSpacing: -0.5,
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.8,
    textAlign: 'left',
  },
  
  // Estilos para valores sugeridos
  suggestedValuesCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  suggestedValuesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  suggestedValuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  suggestedValueButton: {
    backgroundColor: colors.card2,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flex: 1,
    minWidth: '22%',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  suggestedValueButtonSelected: {
    backgroundColor: colors.accentLight,
    borderColor: colors.accent,
    borderWidth: 2,
    shadowColor: colors.accent,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
    transform: [{ scale: 1.02 }],
  },
  suggestedValueText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  suggestedValueTextSelected: {
    color: colors.accent,
    fontSize: 16,
  },
  
  // Estilos aprimorados para informações de investimento
  investmentInfoCard: {
    backgroundColor: colors.accentLight,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.accent + '30',
    shadowColor: colors.accent,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  investmentInfoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  investmentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  investmentInfoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  investmentInfoTextContainer: {
    flex: 1,
  },
  investmentInfoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  investmentInfoValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  investmentInfoDivider: {
    height: 1,
    backgroundColor: colors.accent + '20',
    marginVertical: 12,
  },
  
  // Estilos para validação e avisos
  validationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 16,
  },
  validationText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '500',
    flex: 1,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginBottom: 16,
  },
  warningText: {
    fontSize: 14,
    color: '#D97706',
    fontWeight: '500',
    flex: 1,
    lineHeight: 20,
  },
  continueButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Increased padding to accommodate navbar
  },
  confirmationButtonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  continueButton: {
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.accent,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
  },
  continueButtonDisabled: {
    backgroundColor: colors.cardBorder,
    shadowOpacity: 0,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  secondaryButtonText: {
    color: colors.accent,
  },
  continueButtonTextDisabled: {
    color: colors.sub,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card2,
  },
  coverText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: -0.2,
  },
  
  // Estilos para a tela de perfil do investidor
  formContainer: {
    marginTop: 8,
  },
  formSubLabel: {
    fontSize: 13,
    color: colors.sub,
    marginBottom: 16,
    fontWeight: '500',
  },
  radioGroup: {
    gap: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  radioCircleSelected: {
    borderColor: colors.accent,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  radioText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  termsContainer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    paddingTop: 24,
  },
  termsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  termsButton: {
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  termsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
    letterSpacing: -0.1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  
  // Estilos para o modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    maxHeight: '80%',
    width: '100%',
    shadowColor: colors.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card2,
  },
  modalScroll: {
    maxHeight: 400,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  modalHighlight: {
    fontWeight: '600',
    color: colors.text,
  },

  // Investment Confirmation Screen Styles
  successIcon: {
    alignSelf: 'center',
    marginBottom: 24,
    shadowColor: '#10B981',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  successSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  paymentLinkContainer: {
    backgroundColor: colors.card2,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  paymentLinkLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
    letterSpacing: -0.1,
  },
  paymentLinkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 12,
  },
  paymentLinkText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  launchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  launchButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  instructionsContainer: {
    marginBottom: 32,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 16,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  instructionNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  // Settings Screen Styles
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  pickerContainer: {
    backgroundColor: colors.card2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 120,
  },
  settingPicker: {
    height: 40,
    color: colors.text,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 16,
  },
  dangerCard: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FFFBFB',
  },
  dangerTitle: {
    color: '#DC2626',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  dangerText: {
    color: '#DC2626',
  },
});
