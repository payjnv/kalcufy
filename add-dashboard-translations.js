// Run this script in your Kalcufy project root:
// node add-dashboard-translations.js

const fs = require('fs');

// Dashboard translations
const dashboardTranslations = {
  en: {
    dashboard: {
      welcome: "Welcome back, {name}!",
      subtitle: "Here's what's happening with your calculations",
      upgradeToPro: "Upgrade to PRO",
      nav: {
        dashboard: "Dashboard",
        overview: "Overview",
        history: "History",
        favorites: "Favorites",
        calculators: "Calculators",
        finance: "Finance",
        health: "Health",
        account: "Account",
        profile: "Profile",
        settings: "Settings",
        billing: "Billing",
        signOut: "Sign Out"
      },
      stats: {
        totalCalculations: "Total Calculations",
        favorites: "Saved Favorites",
        thisMonth: "This Month",
        freePlan: "FREE PLAN",
        upgradeToPro: "Upgrade to PRO",
        unlockFeatures: "Unlock all features",
        viewPlans: "View Plans"
      },
      recentCalculations: {
        title: "Recent Calculations",
        viewAll: "View All"
      },
      favorites: {
        title: "Favorites",
        limitReached: "Favorites limit reached",
        upgradeMessage: "Upgrade to PRO for unlimited favorites"
      },
      quickActions: {
        title: "Quick Actions",
        newCalculation: "New Calculation",
        exportHistory: "Export History",
        shareResults: "Share Results"
      },
      proBanner: {
        badge: "UPGRADE TO PRO",
        title: "Unlock Your Full Potential",
        description: "Get unlimited favorites, export to PDF & Excel, ad-free experience, priority support and more.",
        viewPlans: "View Plans",
        learnMore: "Learn More"
      }
    }
  },
  es: {
    dashboard: {
      welcome: "Bienvenido, {name}!",
      subtitle: "Esto es lo que está pasando con tus cálculos",
      upgradeToPro: "Mejorar a PRO",
      nav: {
        dashboard: "Panel",
        overview: "Resumen",
        history: "Historial",
        favorites: "Favoritos",
        calculators: "Calculadoras",
        finance: "Finanzas",
        health: "Salud",
        account: "Cuenta",
        profile: "Perfil",
        settings: "Configuración",
        billing: "Facturación",
        signOut: "Cerrar Sesión"
      },
      stats: {
        totalCalculations: "Total de Cálculos",
        favorites: "Favoritos Guardados",
        thisMonth: "Este Mes",
        freePlan: "PLAN GRATIS",
        upgradeToPro: "Mejorar a PRO",
        unlockFeatures: "Desbloquea todas las funciones",
        viewPlans: "Ver Planes"
      },
      recentCalculations: {
        title: "Cálculos Recientes",
        viewAll: "Ver Todos"
      },
      favorites: {
        title: "Favoritos",
        limitReached: "Límite de favoritos alcanzado",
        upgradeMessage: "Mejora a PRO para favoritos ilimitados"
      },
      quickActions: {
        title: "Acciones Rápidas",
        newCalculation: "Nuevo Cálculo",
        exportHistory: "Exportar Historial",
        shareResults: "Compartir Resultados"
      },
      proBanner: {
        badge: "MEJORAR A PRO",
        title: "Desbloquea Todo Tu Potencial",
        description: "Obtén favoritos ilimitados, exportación a PDF y Excel, sin anuncios, soporte prioritario y más.",
        viewPlans: "Ver Planes",
        learnMore: "Más Información"
      }
    }
  },
  pt: {
    dashboard: {
      welcome: "Bem-vindo, {name}!",
      subtitle: "Veja o que está acontecendo com seus cálculos",
      upgradeToPro: "Atualizar para PRO",
      nav: {
        dashboard: "Painel",
        overview: "Visão Geral",
        history: "Histórico",
        favorites: "Favoritos",
        calculators: "Calculadoras",
        finance: "Finanças",
        health: "Saúde",
        account: "Conta",
        profile: "Perfil",
        settings: "Configurações",
        billing: "Faturamento",
        signOut: "Sair"
      },
      stats: {
        totalCalculations: "Total de Cálculos",
        favorites: "Favoritos Salvos",
        thisMonth: "Este Mês",
        freePlan: "PLANO GRÁTIS",
        upgradeToPro: "Atualizar para PRO",
        unlockFeatures: "Desbloqueie todas as funcionalidades",
        viewPlans: "Ver Planos"
      },
      recentCalculations: {
        title: "Cálculos Recentes",
        viewAll: "Ver Todos"
      },
      favorites: {
        title: "Favoritos",
        limitReached: "Limite de favoritos atingido",
        upgradeMessage: "Atualize para PRO para favoritos ilimitados"
      },
      quickActions: {
        title: "Ações Rápidas",
        newCalculation: "Novo Cálculo",
        exportHistory: "Exportar Histórico",
        shareResults: "Compartilhar Resultados"
      },
      proBanner: {
        badge: "ATUALIZAR PARA PRO",
        title: "Desbloqueie Todo Seu Potencial",
        description: "Tenha favoritos ilimitados, exportação para PDF e Excel, sem anúncios, suporte prioritário e mais.",
        viewPlans: "Ver Planos",
        learnMore: "Saiba Mais"
      }
    }
  }
};

// Profile translations
const profileTranslations = {
  en: {
    profile: {
      title: "Profile Settings",
      subtitle: "Manage your account information and preferences",
      saveChanges: "Save Changes",
      saving: "Saving...",
      nav: {
        dashboard: "Dashboard",
        overview: "Overview",
        history: "History",
        favorites: "Favorites",
        account: "Account",
        profile: "Profile",
        settings: "Settings",
        billing: "Billing",
        signOut: "Sign Out"
      },
      tabs: {
        profile: "Profile",
        security: "Security",
        notifications: "Notifications",
        preferences: "Preferences"
      },
      profilePicture: {
        title: "Profile Picture",
        description: "Upload a new avatar. Recommended size 256x256px.",
        upload: "Upload New",
        remove: "Remove"
      },
      personalInfo: {
        title: "Personal Information",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Phone Number (Optional)"
      },
      password: {
        title: "Password",
        lastChanged: "Last changed",
        current: "Current Password",
        new: "New Password",
        confirm: "Confirm Password"
      },
      preferences: {
        title: "Preferences",
        language: "Language",
        currency: "Currency"
      },
      currentPlan: {
        title: "Current Plan",
        active: "Active",
        description: "Basic features with ads",
        upgrade: "Upgrade to PRO - $9/mo",
        features: {
          allCalculators: "All calculators",
          saveLimit: "Save up to 10 calculations",
          favoritesLimit: "5 favorites max",
          export: "Export to PDF/Excel",
          adFree: "Ad-free experience"
        }
      },
      notifications: {
        title: "Notifications",
        emailUpdates: "Email Updates",
        emailUpdatesDesc: "Get tips and news",
        productUpdates: "Product Updates",
        productUpdatesDesc: "New features",
        marketing: "Marketing",
        marketingDesc: "Special offers"
      },
      connectedAccounts: {
        title: "Connected Accounts",
        connected: "Connected",
        notConnected: "Not connected",
        connect: "Connect",
        disconnect: "Disconnect"
      },
      dangerZone: {
        title: "Danger Zone",
        description: "Once you delete your account, there is no going back. Please be certain.",
        deleteAccount: "Delete Account"
      }
    }
  },
  es: {
    profile: {
      title: "Configuración de Perfil",
      subtitle: "Administra tu información de cuenta y preferencias",
      saveChanges: "Guardar Cambios",
      saving: "Guardando...",
      nav: {
        dashboard: "Panel",
        overview: "Resumen",
        history: "Historial",
        favorites: "Favoritos",
        account: "Cuenta",
        profile: "Perfil",
        settings: "Configuración",
        billing: "Facturación",
        signOut: "Cerrar Sesión"
      },
      tabs: {
        profile: "Perfil",
        security: "Seguridad",
        notifications: "Notificaciones",
        preferences: "Preferencias"
      },
      profilePicture: {
        title: "Foto de Perfil",
        description: "Sube un nuevo avatar. Tamaño recomendado 256x256px.",
        upload: "Subir Nueva",
        remove: "Eliminar"
      },
      personalInfo: {
        title: "Información Personal",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo Electrónico",
        phone: "Teléfono (Opcional)"
      },
      password: {
        title: "Contraseña",
        lastChanged: "Último cambio",
        current: "Contraseña Actual",
        new: "Nueva Contraseña",
        confirm: "Confirmar Contraseña"
      },
      preferences: {
        title: "Preferencias",
        language: "Idioma",
        currency: "Moneda"
      },
      currentPlan: {
        title: "Plan Actual",
        active: "Activo",
        description: "Funciones básicas con anuncios",
        upgrade: "Mejorar a PRO - $9/mes",
        features: {
          allCalculators: "Todas las calculadoras",
          saveLimit: "Guardar hasta 10 cálculos",
          favoritesLimit: "5 favoritos máximo",
          export: "Exportar a PDF/Excel",
          adFree: "Sin anuncios"
        }
      },
      notifications: {
        title: "Notificaciones",
        emailUpdates: "Actualizaciones por Email",
        emailUpdatesDesc: "Recibe tips y noticias",
        productUpdates: "Actualizaciones del Producto",
        productUpdatesDesc: "Nuevas funciones",
        marketing: "Marketing",
        marketingDesc: "Ofertas especiales"
      },
      connectedAccounts: {
        title: "Cuentas Conectadas",
        connected: "Conectada",
        notConnected: "No conectada",
        connect: "Conectar",
        disconnect: "Desconectar"
      },
      dangerZone: {
        title: "Zona de Peligro",
        description: "Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate.",
        deleteAccount: "Eliminar Cuenta"
      }
    }
  },
  pt: {
    profile: {
      title: "Configurações de Perfil",
      subtitle: "Gerencie suas informações de conta e preferências",
      saveChanges: "Salvar Alterações",
      saving: "Salvando...",
      nav: {
        dashboard: "Painel",
        overview: "Visão Geral",
        history: "Histórico",
        favorites: "Favoritos",
        account: "Conta",
        profile: "Perfil",
        settings: "Configurações",
        billing: "Faturamento",
        signOut: "Sair"
      },
      tabs: {
        profile: "Perfil",
        security: "Segurança",
        notifications: "Notificações",
        preferences: "Preferências"
      },
      profilePicture: {
        title: "Foto de Perfil",
        description: "Envie um novo avatar. Tamanho recomendado 256x256px.",
        upload: "Enviar Nova",
        remove: "Remover"
      },
      personalInfo: {
        title: "Informações Pessoais",
        firstName: "Nome",
        lastName: "Sobrenome",
        email: "Endereço de Email",
        phone: "Telefone (Opcional)"
      },
      password: {
        title: "Senha",
        lastChanged: "Última alteração",
        current: "Senha Atual",
        new: "Nova Senha",
        confirm: "Confirmar Senha"
      },
      preferences: {
        title: "Preferências",
        language: "Idioma",
        currency: "Moeda"
      },
      currentPlan: {
        title: "Plano Atual",
        active: "Ativo",
        description: "Recursos básicos com anúncios",
        upgrade: "Atualizar para PRO - $9/mês",
        features: {
          allCalculators: "Todas as calculadoras",
          saveLimit: "Salvar até 10 cálculos",
          favoritesLimit: "5 favoritos máximo",
          export: "Exportar para PDF/Excel",
          adFree: "Sem anúncios"
        }
      },
      notifications: {
        title: "Notificações",
        emailUpdates: "Atualizações por Email",
        emailUpdatesDesc: "Receba dicas e novidades",
        productUpdates: "Atualizações do Produto",
        productUpdatesDesc: "Novas funcionalidades",
        marketing: "Marketing",
        marketingDesc: "Ofertas especiais"
      },
      connectedAccounts: {
        title: "Contas Conectadas",
        connected: "Conectada",
        notConnected: "Não conectada",
        connect: "Conectar",
        disconnect: "Desconectar"
      },
      dangerZone: {
        title: "Zona de Perigo",
        description: "Uma vez que você excluir sua conta, não há como voltar atrás. Por favor, tenha certeza.",
        deleteAccount: "Excluir Conta"
      }
    }
  }
};

// Function to merge translations
function mergeTranslations(existing, newTranslations) {
  return { ...existing, ...newTranslations };
}

// Process each language
const languages = ['en', 'es', 'pt'];

languages.forEach(lang => {
  const filePath = `messages/${lang}.json`;
  
  try {
    // Read existing file
    let existing = {};
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    
    // Merge translations
    const merged = mergeTranslations(existing, dashboardTranslations[lang]);
    const final = mergeTranslations(merged, profileTranslations[lang]);
    
    // Write back
    fs.writeFileSync(filePath, JSON.stringify(final, null, 2));
    console.log(`✅ Updated ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
});

console.log('\n🎉 Dashboard and Profile translations added successfully!');
console.log('\nNow copy the page files to your project:');
console.log('  - src/app/[locale]/dashboard/page.tsx');
console.log('  - src/app/[locale]/profile/page.tsx');
