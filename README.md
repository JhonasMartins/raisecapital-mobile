# 📱 Raise Capital - Versão Mobile

<div align="center">
  <img src="./assets/icon.png" alt="Raise Capital Logo" width="120" height="120">
  
  <p><strong>Plataforma mobile para investimentos inteligentes</strong></p>
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-51.0-black.svg)](https://expo.dev/)
  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](./LICENSE)
  [![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey.svg)](https://expo.dev/)
</div>

## 🚀 Sobre o Projeto

O **Raise Capital** é uma aplicação mobile moderna e intuitiva para gestão de investimentos, desenvolvida com React Native e Expo. A plataforma oferece uma experiência premium para acompanhar seu portfólio de investimentos com interface elegante e funcionalidades avançadas.

### ✨ Principais Funcionalidades

- 📊 **Dashboard Interativo** - Visualização completa do patrimônio com gráficos dinâmicos
- 💼 **Gestão de Portfólio** - Acompanhe seus investimentos em tempo real
- 📈 **Análise de Performance** - Métricas detalhadas por categoria de investimento
- 🎯 **Oportunidades** - Descubra novos investimentos disponíveis
- 📱 **Design Responsivo** - Interface otimizada para mobile, tablet e web
- 🌙 **Tema Claro** - Design moderno com paleta de cores profissional

## 🎨 Design System

### Paleta de Cores
- **Primary**: `#04a2fa` - Azul vibrante para elementos principais
- **Secondary**: `#0284c7` - Azul escuro para gradientes
- **Background**: `#FAFBFC` - Fundo claro e limpo
- **Cards**: `#FFFFFF` - Branco puro para cards
- **Text**: `#1E293B` - Texto principal escuro
- **Accent Light**: `#dbeafe` - Azul claro para destaques

### Componentes
- Cards com bordas arredondadas (20px)
- Sombras suaves para profundidade
- Gradientes elegantes em elementos interativos
- Tipografia hierárquica com pesos otimizados
- Ícones da biblioteca Ionicons

## 🛠️ Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)** - Framework para desenvolvimento mobile
- **[Expo](https://expo.dev/)** - Plataforma para desenvolvimento e deploy
- **[React Navigation](https://reactnavigation.org/)** - Navegação entre telas
- **[React Native Gifted Charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts)** - Gráficos interativos
- **[Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)** - Gradientes nativos
- **[Ionicons](https://ionic.io/ionicons)** - Biblioteca de ícones

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Git

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone git@github.com:JhonasMartins/raisecapital-mobile.git
   cd raisecapital-mobile
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npx expo start
   ```

4. **Execute em diferentes plataformas**
   ```bash
   # Web
   npx expo start --web
   
   # iOS (requer Xcode)
   npx expo start --ios
   
   # Android (requer Android Studio)
   npx expo start --android
   ```

## 📱 Plataformas Suportadas

- **📱 iOS** - iPhone e iPad
- **🤖 Android** - Smartphones e tablets
- **🌐 Web** - Navegadores modernos
- **💻 Desktop** - Via Electron (futuro)

## 🏗️ Estrutura do Projeto

```
raisecapital-mobile/
├── App.js                 # Componente principal da aplicação
├── index.js              # Ponto de entrada
├── app.json              # Configurações do Expo
├── package.json          # Dependências e scripts
├── assets/               # Recursos estáticos
│   ├── icon.png         # Ícone da aplicação
│   ├── splash-icon.png  # Ícone da splash screen
│   └── ...
└── README.md            # Documentação do projeto
```

## 🎯 Roadmap

### Versão Atual (v1.0)
- ✅ Interface de carteira com gráficos
- ✅ Navegação por abas
- ✅ Design system completo
- ✅ Suporte multiplataforma

### Próximas Versões
- 🔄 **v1.1** - Autenticação e perfil de usuário
- 🔄 **v1.2** - Integração com APIs de investimentos
- 🔄 **v1.3** - Notificações push
- 🔄 **v1.4** - Modo escuro
- 🔄 **v2.0** - Funcionalidades de trading

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use commits semânticos (feat, fix, docs, etc.)

## 📄 Licença

Este projeto está licenciado sob a **Apache License 2.0** - veja o arquivo [LICENSE](./LICENSE) para detalhes.

### Resumo da Licença Apache 2.0

- ✅ **Uso comercial** - Pode ser usado comercialmente
- ✅ **Modificação** - Pode ser modificado
- ✅ **Distribuição** - Pode ser distribuído
- ✅ **Uso privado** - Pode ser usado privativamente
- ⚠️ **Responsabilidade** - Inclui limitação de responsabilidade
- ⚠️ **Garantia** - Não inclui garantia

**Regras Rígidas:**
- Deve incluir o aviso de copyright
- Deve incluir o texto da licença
- Mudanças devem ser documentadas
- Deve preservar avisos de patente

## 👨‍💻 Autor

**Jhonas Martins**
- GitHub: [@JhonasMartins](https://github.com/JhonasMartins)
- LinkedIn: [Jhonas Martins](https://linkedin.com/in/jhonasmartins)

## 🙏 Agradecimentos

- [Expo Team](https://expo.dev/) pela excelente plataforma
- [React Native Community](https://reactnative.dev/) pelo framework
- [Ionicons](https://ionic.io/ionicons) pelos ícones
- Comunidade open source por todas as bibliotecas utilizadas

---

<div align="center">
  <p>Feito com ❤️ por <a href="https://github.com/JhonasMartins">Jhonas Martins</a></p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>