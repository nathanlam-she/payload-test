export const dictionary = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      contact: 'Contact',
      admin: 'Client Login',
    },
    home: {
      aboutTitle: 'About Us',
      featuredProjects: 'Featured Projects',
      viewAll: 'View All Projects',
      contactUs: 'Contact Us',
      getInTouch: 'Get in Touch',
      interested: 'Interested in our services? Reach out to our team directly.',
      sendMessage: 'Send Message',
      email: 'Email:',
      phone: 'Phone:',
      address: 'Address:',
    },
    project: {
      completed: 'Completed:',
      ongoing: 'Ongoing',
      ourProjects: 'Our Projects',
      noProjects: 'No projects found.',
    }
  },
  zh: {
    nav: {
      home: '首頁',
      projects: '專案',
      contact: '聯絡我們',
      admin: '客戶登入',
    },
    home: {
      aboutTitle: '關於我們',
      featuredProjects: '精選專案',
      viewAll: '查看所有專案',
      contactUs: '聯絡我們',
      getInTouch: '取得聯絡',
      interested: '對我們的服務感興趣？請直接聯絡我們的團隊。',
      sendMessage: '發送訊息',
      email: '信箱:',
      phone: '電話:',
      address: '地址:',
    },
    project: {
      completed: '完成時間:',
      ongoing: '進行中',
      ourProjects: '我們的專案',
      noProjects: '暫無專案。',
    }
  }
}

export type Locale = 'en' | 'zh'
export const getDictionary = (locale: string) => dictionary[locale as Locale] || dictionary.en

// Helper to fetch Settings from DB and merge with defaults
export const getSettings = async (payload: any, locale: string) => {
  const staticDict = getDictionary(locale)
  
  try {
    const settings = await payload.findGlobal({
      slug: 'settings',
      locale: locale as Locale,
    })

    if (!settings) return staticDict

    return {
      nav: {
        home: settings.navHome || staticDict.nav.home,
        projects: settings.navProjects || staticDict.nav.projects,
        contact: settings.navContact || staticDict.nav.contact,
        admin: settings.navAdmin || staticDict.nav.admin,
      },
      home: {
        aboutTitle: settings.homeAboutTitle || staticDict.home.aboutTitle,
        featuredProjects: settings.homeFeaturedProjects || staticDict.home.featuredProjects,
        viewAll: settings.homeViewAll || staticDict.home.viewAll,
        contactUs: settings.homeContactUs || staticDict.home.contactUs,
        getInTouch: settings.homeGetInTouch || staticDict.home.getInTouch,
        interested: settings.homeInterested || staticDict.home.interested,
        sendMessage: settings.homeSendMessage || staticDict.home.sendMessage,
        email: settings.homeEmailLabel || staticDict.home.email,
        phone: settings.homePhoneLabel || staticDict.home.phone,
        address: settings.homeAddressLabel || staticDict.home.address,
      },
      project: {
        completed: settings.projCompleted || staticDict.project.completed,
        ongoing: settings.projOngoing || staticDict.project.ongoing,
        ourProjects: settings.projOurProjects || staticDict.project.ourProjects,
        noProjects: settings.projNoProjects || staticDict.project.noProjects,
      }
    }
  } catch (e) {
    console.error('Failed to fetch settings', e)
    return staticDict
  }
}
