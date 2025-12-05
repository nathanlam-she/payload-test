import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings (UI Labels)',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          fields: [
            { 
              name: 'navHome', 
              type: 'text', 
              localized: true, 
              label: 'Home Link', 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '首頁' : 'Home' 
            },
            { 
              name: 'navProjects', 
              type: 'text', 
              localized: true, 
              label: 'Projects Link', 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '專案' : 'Projects' 
            },
            { 
              name: 'navContact', 
              type: 'text', 
              localized: true, 
              label: 'Contact Link', 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '聯絡我們' : 'Contact' 
            },
            { 
              name: 'navAdmin', 
              type: 'text', 
              localized: true, 
              label: 'Admin Link', 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '客戶登入' : 'Client Login' 
            },
          ]
        },
        {
          label: 'Homepage Labels',
          fields: [
            { 
              name: 'homeAboutTitle', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '關於我們' : 'About Us' 
            },
            { 
              name: 'homeFeaturedProjects', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '精選專案' : 'Featured Projects' 
            },
            { 
              name: 'homeViewAll', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '查看所有專案' : 'View All Projects' 
            },
            { 
              name: 'homeContactUs', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '聯絡我們' : 'Contact Us' 
            },
            { 
              name: 'homeGetInTouch', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '取得聯絡' : 'Get in Touch' 
            },
            { 
              name: 'homeInterested', 
              type: 'textarea', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '對我們的服務感興趣？請直接聯絡我們的團隊。' : 'Interested in our services? Reach out to our team directly.' 
            },
            { 
              name: 'homeSendMessage', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '發送訊息' : 'Send Message' 
            },
            { 
              name: 'homeEmailLabel', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '信箱:' : 'Email:' 
            },
            { 
              name: 'homePhoneLabel', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '電話:' : 'Phone:' 
            },
            { 
              name: 'homeAddressLabel', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '地址:' : 'Address:' 
            },
          ]
        },
        {
          label: 'Project Labels',
          fields: [
            { 
              name: 'projCompleted', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '完成時間:' : 'Completed:' 
            },
            { 
              name: 'projOngoing', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '進行中' : 'Ongoing' 
            },
            { 
              name: 'projOurProjects', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '我們的專案' : 'Our Projects' 
            },
            { 
              name: 'projNoProjects', 
              type: 'text', 
              localized: true, 
              defaultValue: ({ locale }: { locale: string }) => locale === 'zh' ? '暫無專案。' : 'No projects found.' 
            },
          ]
        }
      ]
    }
  ]
}
