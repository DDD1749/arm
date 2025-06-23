import { Language } from '../context/LanguageContext';

export const translations = {
  en: {
    // Navigation
    nav: {
      makeOniMask: 'Make Oni Mask',
      makeRing: 'Make Ring',
      aboutUs: 'About Us',
      delivery: 'Delivery',
      account: 'Account',
      cart: 'Cart'
    },
    // Authentication
    auth: {
      signIn: {
        title: 'Sign In',
        email: 'Email',
        password: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        submit: 'Sign In',
        loading: 'Signing in...',
        noAccount: "Don't have an account? Sign up"
      },
      signUp: {
        title: 'Create Account',
        email: 'Email',
        password: 'Password',
        passwordRequirement: 'Password must be at least 6 characters long',
        submit: 'Create Account',
        loading: 'Creating account...',
        hasAccount: 'Already have an account? Sign in'
      },
      forgotPassword: {
        title: 'Reset Password',
        email: 'Email',
        submit: 'Send Reset Instructions',
        loading: 'Sending...',
        backToSignIn: 'Back to Sign In'
      }
    },
    // Ring Creation
    createRing: {
      title: 'Custom Dragon Ring',
      price: 'Price',
      customization: {
        ringName: 'Ring',
        firstPart: {
          title: 'Choose first part of the ring',
          options: {
            first: 'First type',
            second: 'Second type',
            third: 'Third type'
          }
        },
        secondPart: {
          title: 'Choose second part of the ring',
          options: {
            first: 'First type',
            second: 'Second type',
            third: 'Third type'
          }
        },
        thirdPart: {
          title: 'Choose third part of the ring',
          options: {
            first: 'First type',
            second: 'Second type',
            third: 'Third type'
          }
        },
        stone: {
          title: 'Choose stone',
          options: {
            onyx: 'Onyx',
            tarverin: 'Tarverin',
            terazzo: 'Terazzo'
          }
        },
        size: {
          title: 'Select Size',
          short: 'Size'
        }
      },
      addToCart: 'Add to Cart'
    },
    // Mask Creation
    createMask: {
      title: 'Custom Oni Mask',
      customization: {
        maskName: 'Oni Mask',
        rightHorn: {
          title: 'Choose Right Horn',
          whole: 'Whole',
          broken: 'Broken'
        },
        leftHorn: {
          title: 'Choose Left Horn',
          whole: 'Whole',
          broken: 'Broken'
        },
        color: {
          title: 'Choose Color',
          red: 'Red',
          purple: 'Purple',
          yellow: 'Yellow'
        }
      },
      addToCart: 'Add to Cart'
    },
    // Cart Page
    cart: {
      title: 'Shopping Cart',
      emptyCart: {
        title: 'Your cart is empty',
        description: "Looks like you haven't added any items to your cart yet.",
        startShopping: 'Start Shopping'
      },
      product: 'Product',
      quantity: 'Quantity',
      price: 'Price',
      action: 'Action',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      tax: 'Tax',
      total: 'Total',
      orderSummary: 'Order Summary',
      shippingInfo: {
        title: 'Shipping Information',
        fullName: 'Full Name',
        address: 'Shipping Address',
        phone: 'Phone Number'
      },
      placeOrder: 'Place Order',
      processing: 'Processing...',
      continueShopping: 'Continue Shopping'
    },
    // Account Page
    account: {
      title: 'My Account',
      sections: {
        profile: 'Profile',
        orders: 'Orders',
        wishlist: 'Wishlist',
        settings: 'Settings'
      },
      profile: {
        title: 'Profile Information',
        email: 'Email',
        fullName: 'Full Name',
        phoneNumber: 'Phone Number',
        address: 'Address',
        saveChanges: 'Save Changes',
        saving: 'Saving...'
      },
      orders: {
        title: 'Your Orders',
        empty: "You haven't placed any orders yet.",
        orderId: 'Order ID',
        placedOn: 'Placed on',
        deliveryAddress: 'Delivery Address',
        status: {
          pending: 'Pending',
          delivering: 'Delivering',
          delivered: 'Delivered'
        }
      },
      wishlist: {
        title: 'Wishlist',
        empty: 'Your wishlist is empty'
      },
      settings: {
        title: 'Change Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm New Password',
        update: 'Update Password',
        updating: 'Updating...'
      },
      signOut: 'Sign Out'
    },
    // Home Page
    home: {
      hero: {
        title: 'Exquisite Masks & Rings for the Discerning Customer',
        subtitle: 'Handcrafted with premium materials and exceptional attention to detail',
        exploreCollection: 'Explore Collection'
      },
      products: {
        title: 'Our Products',
        masks: {
          title: 'Elegant Masks',
          description: 'Unique designs for any occasion',
          button: 'Create Mask'
        },
        rings: {
          title: 'Luxury Rings',
          description: 'Timeless elegance for your hands',
          button: 'Create Ring'
        }
      },
      features: {
        title: 'Why Choose Armornasvap',
        quality: {
          title: 'Premium Quality',
          description: 'Each piece is crafted with the finest materials and exceptional attention to detail.'
        },
        delivery: {
          title: 'Fast Delivery',
          description: 'Quick shipping and careful packaging ensure your items arrive promptly and safely.'
        },
        satisfaction: {
          title: 'Satisfaction Guaranteed',
          description: 'We stand behind our products with a satisfaction guarantee and excellent customer service.'
        }
      }
    },
    // About Page
    about: {
      hero: {
        title: 'About Us',
        subtitle: 'Crafting exceptional masks and rings since 2025'
      },
      story: {
        title: 'Our Story',
        content1: 'Armornasvap began with a simple vision: to create extraordinary masks and rings that blend artistry with functionality. Founded in 2025, our journey started with a small workshop and a passionate team of artisans dedicated to their craft.',
        content2: 'Today, we continue to uphold our commitment to quality and innovation. Each piece we create is a testament to our dedication to excellence and our respect for the materials we work with.',
        content3: 'While we\'ve grown over the years, our core values remain unchanged: exceptional craftsmanship, attention to detail, and a deep appreciation for the art of creating beautiful objects that inspire and delight.'
      },
      values: {
        title: 'Our Values',
        quality: {
          title: 'Quality',
          description: 'We never compromise on quality. From the materials we select to the final finishing touches, excellence is our standard at every step of the creation process.'
        },
        craftsmanship: {
          title: 'Craftsmanship',
          description: 'Our artisans combine traditional techniques with modern innovation to create pieces that are not just products, but works of art designed to last for generations.'
        },
        sustainability: {
          title: 'Sustainability',
          description: 'We are committed to responsible practices that minimize our environmental impact. We carefully source our materials and continually seek ways to make our processes more sustainable.'
        }
      }
    },
    // Delivery Page
    delivery: {
      hero: {
        title: 'Free Worldwide Delivery',
        subtitle: 'We deliver to all countries around the world at no additional cost'
      },
      shipping: {
        title: 'Free Worldwide Shipping',
        points: [
          'Delivery within 5-7 business days',
          'Tracking number provided via email',
          'Free shipping on all orders worldwide'
        ]
      },
      security: {
        title: 'Secure Shipping',
        points: [
          'Fully insured against loss or damage',
          'Packaged in discreet, secure containers',
          'Handled with care by trusted delivery partners',
          'Tracked from our facility to your door'
        ]
      },
      faq: {
        title: 'Frequently Asked Questions',
        questions: [
          {
            q: 'How long will it take to receive my order?',
            a: 'Standard delivery takes 5-7 business days worldwide. Delivery times may vary slightly depending on your location and local customs processing.'
          },
          {
            q: 'Can I track my order?',
            a: 'Yes, you\'ll receive a tracking number via email once your order ships. You can use this to follow your package\'s journey to you.'
          },
          {
            q: 'What if my item arrives damaged?',
            a: 'All shipments are fully insured. If your item arrives damaged, please contact our customer service team within 48 hours with photos of the damage, and we\'ll arrange a replacement or refund.'
          }
        ]
      },
      contact: {
        title: 'Need help with your delivery?',
        email: 'Contact us at: info@armornasvap.com'
      }
    },
    // Footer
    footer: {
      description: 'Premium quality masks and rings crafted with exceptional attention to detail.',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      rights: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service'
    },
    // Products
    products: {
      title: 'Our Products',
      customize: 'Open',
      loading: 'Loading products...'
    },
    // Privacy Policy
    privacyPolicy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated',
      sections: {
        informationCollect: {
          title: 'Information We Collect',
          description: 'We collect information that you provide directly to us, including:',
          items: [
            'Name and contact information',
            'Billing and shipping addresses',
            'Payment information',
            'Order history',
            'Communication preferences'
          ]
        },
        informationUse: {
          title: 'How We Use Your Information',
          description: 'We use the information we collect to:',
          items: [
            'Process your orders and payments',
            'Communicate with you about your orders',
            'Send you marketing communications (with your consent)',
            'Improve our products and services',
            'Comply with legal obligations'
          ]
        },
        informationSharing: {
          title: 'Information Sharing',
          description: 'We do not sell your personal information. We may share your information with:',
          items: [
            'Service providers who assist in our operations',
            'Payment processors',
            'Shipping partners',
            'Law enforcement when required by law'
          ]
        },
        rights: {
          title: 'Your Rights',
          description: 'You have the right to:',
          items: [
            'Access your personal information',
            'Correct inaccurate information',
            'Request deletion of your information',
            'Opt-out of marketing communications',
            'Lodge a complaint with supervisory authorities'
          ]
        },
        contact: {
          title: 'Contact Us',
          description: 'If you have any questions about this Privacy Policy, please contact us at:',
          email: 'Email: info@armornasvap.com'
        }
      }
    },
    // Terms of Service
    termsOfService: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated',
      sections: {
        agreement: {
          title: 'Agreement to Terms',
          content: 'By accessing and using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'
        },
        license: {
          title: 'Use License',
          content: 'Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.'
        },
        productInfo: {
          title: 'Product Information',
          content: 'We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or prices are accurate, complete, reliable, current, or error-free.'
        },
        shipping: {
          title: 'Shipping and Delivery',
          content: 'We offer worldwide shipping on all orders. Delivery times may vary depending on your location. We are not responsible for delays caused by customs or other factors outside our control.'
        },
        returns: {
          title: 'Returns and Refunds',
          content: 'We accept returns within 30 days of delivery. Items must be unused and in their original packaging. Custom-made items cannot be returned unless defective.'
        },
        disclaimer: {
          title: 'Disclaimer',
          content: 'The materials on our website are provided on an \'as is\' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
        },
        contact: {
          title: 'Contact Information',
          description: 'If you have any questions about these Terms of Service, please contact us at:',
          email: 'Email: info@armornasvap.com'
        }
      }
    },
    // Admin Panel
    admin: {
      title: 'Admin Dashboard',
      login: {
        title: 'Admin Login',
        password: 'Password',
        submit: 'Sign In',
        loading: 'Signing in...',
        error: 'Invalid password'
      },
      navigation: {
        orders: 'Orders',
        products: 'Products',
        logout: 'Logout'
      },
      orders: {
        title: 'All Orders',
        empty: 'No orders found',
        columns: {
          details: 'Order Details',
          customer: 'Customer Info',
          items: 'Items',
          total: 'Total',
          status: 'Status'
        },
        status: {
          pending: 'Pending',
          delivering: 'Delivering',
          delivered: 'Delivered'
        }
      },
      products: {
        title: 'Manage Products',
        form: {
          name: 'Name',
          price: 'Price',
          category: 'Category',
          image: {
            label: 'Product Image',
            uploading: 'Uploading...'
          },
          model: {
            label: '3D Model',
            uploading: 'Uploading...'
          },
          config: 'Customization Config (JSON)',
          submit: {
            create: 'Create Product',
            creating: 'Creating...'
          }
        },
        deleteConfirm: 'Are you sure you want to delete this product?'
      }
    }
  },
  ru: {
    // Navigation
    nav: {
      makeOniMask: 'Создать Маску Они',
      makeRing: 'Создать Кольцо',
      aboutUs: 'О Нас',
      delivery: 'Доставка',
      account: 'Аккаунт',
      cart: 'Корзина'
    },
    // Authentication
    auth: {
      signIn: {
        title: 'Вход',
        email: 'Email',
        password: 'Пароль',
        rememberMe: 'Запомнить меня',
        forgotPassword: 'Забыли пароль?',
        submit: 'Войти',
        loading: 'Вход...',
        noAccount: 'Нет аккаунта? Зарегистрироваться'
      },
      signUp: {
        title: 'Создать аккаунт',
        email: 'Email',
        password: 'Пароль',
        passwordRequirement: 'Пароль должен содержать минимум 6 символов',
        submit: 'Создать аккаунт',
        loading: 'Создание аккаунта...',
        hasAccount: 'Уже есть аккаунт? Войти'
      },
      forgotPassword: {
        title: 'Сброс пароля',
        email: 'Email',
        submit: 'Отправить инструкции',
        loading: 'Отправка...',
        backToSignIn: 'Вернуться к входу'
      }
    },
    // Ring Creation
    createRing: {
      title: 'Кастомное кольцо с драконом',
      price: 'Цена',
      customization: {
        ringName: 'Кольцо',
        firstPart: {
          title: 'Выберите первую часть кольца',
          options: {
            first: 'Первый тип',
            second: 'Второй тип',
            third: 'Третий тип'
          }
        },
        secondPart: {
          title: 'Выберите вторую часть кольца',
          options: {
            first: 'Первый тип',
            second: 'Второй тип',
            third: 'Третий тип'
          }
        },
        thirdPart: {
          title: 'Выберите третью часть кольца',
          options: {
            first: 'Первый тип',
            second: 'Второй тип',
            third: 'Третий тип'
          }
        },
        stone: {
          title: 'Выберите камень',
          options: {
            onyx: 'Оникс',
            tarverin: 'Тарверин',
            terazzo: 'Терраццо'
          }
        },
        size: {
          title: 'Выберите размер',
          short: 'Размер'
        }
      },
      addToCart: 'Добавить в корзину'
    },
    // Mask Creation
    createMask: {
      title: 'Кастомная Маска Они',
      customization: {
        maskName: 'Маска Они',
        rightHorn: {
          title: 'Выберите правый рог',
          whole: 'Целый',
          broken: 'Обломанный'
        },
        leftHorn: {
          title: 'Выберите левый рог',
          whole: 'Целый',
          broken: 'Обломанный'
        },
        color: {
          title: 'Выберите цвет',
          red: 'Красный',
          purple: 'Фиолетовый',
          yellow: 'Желтый'
        }
      },
      addToCart: 'Добавить в корзину'
    },
    // Cart Page
    cart: {
      title: 'Корзина',
      emptyCart: {
        title: 'Ваша корзина пуста',
        description: 'Похоже, вы еще не добавили товары в корзину.',
        startShopping: 'Начать покупки'
      },
      product: 'Товар',
      quantity: 'Количество',
      price: 'Цена',
      action: 'Действие',
      subtotal: 'Подытог',
      shipping: 'Доставка',
      tax: 'Налог',
      total: 'Итого',
      orderSummary: 'Сводка заказа',
      shippingInfo: {
        title: 'Информация о доставке',
        fullName: 'Полное имя',
        address: 'Адрес доставки',
        phone: 'Номер телефона'
      },
      placeOrder: 'Оформить заказ',
      processing: 'Обработка...',
      continueShopping: 'Продолжить покупки'
    },
    // Account Page
    account: {
      title: 'Мой аккаунт',
      sections: {
        profile: 'Профиль',
        orders: 'Заказы',
        wishlist: 'Избранное',
        settings: 'Настройки'
      },
      profile: {
        title: 'Информация профиля',
        email: 'Email',
        fullName: 'Полное имя',
        phoneNumber: 'Номер телефона',
        address: 'Адрес',
        saveChanges: 'Сохранить изменения',
        saving: 'Сохранение...'
      },
      orders: {
        title: 'Ваши заказы',
        empty: 'У вас пока нет заказов.',
        orderId: 'Номер заказа',
        placedOn: 'Дата заказа',
        deliveryAddress: 'Адрес доставки',
        status: {
          pending: 'В обработке',
          delivering: 'Доставляется',
          delivered: 'Доставлен'
        }
      },
      wishlist: {
        title: 'Избранное',
        empty: 'Ваш список избранного пуст'
      },
      settings: {
        title: 'Изменить пароль',
        newPassword: 'Новый пароль',
        confirmPassword: 'Подтвердите пароль',
        update: 'Обновить пароль',
        updating: 'Обновление...'
      },
      signOut: 'Выйти'
    },
    // Home Page
    home: {
      hero: {
        title: 'Изысканные Маски и Кольца для Требовательных Клиентов',
        subtitle: 'Изготовлено вручную из премиальных материалов с исключительным вниманием к деталям',
        exploreCollection: 'Исследовать Коллекцию'
      },
      products: {
        title: 'Наши Продукты',
        masks: {
          title: 'Элегантные Маски',
          description: 'Уникальные дизайны для любого случая',
          button: 'Создать Маску'
        },
        rings: {
          title: 'Роскошные Кольца',
          description: 'Вневременная элегантность для ваших рук',
          button: 'Создать Кольцо'
        }
      },
      features: {
        title: 'Почему Выбирают Armornasvap',
        quality: {
          title: 'Премиальное Качество',
          description: 'Каждое изделие создается из лучших материалов с исключительным вниманием к деталям.'
        },
        delivery: {
          title: 'Быстрая Доставка',
          description: 'Быстрая доставка и надежная упаковка гарантируют своевременное и безопасное получение ваших заказов.'
        },
        satisfaction: {
          title: 'Гарантия Удовлетворения',
          description: 'Мы гарантируем качество наших продуктов и обеспечиваем превосходное обслуживание клиентов.'
        }
      }
    },
    // About Page
    about: {
      hero: {
        title: 'О Нас',
        subtitle: 'Создаем исключительные маски и кольца с 2025 года'
      },
      story: {
        title: 'Наша История',
        content1: 'Armornasvap начался с простого видения: создавать необычные маски и кольца, сочетающие в себе художественность и функциональность. Основанная в 2025 году, наша история началась с небольшой мастерской и увлеченной команды мастеров, преданных своему делу.',
        content2: 'Сегодня мы продолжаем поддерживать наше стремление к качеству и инновациям. Каждое изделие, которое мы создаем, является свидетельством нашей преданности совершенству и уважения к материалам, с которыми мы работаем.',
        content3: 'Хотя за эти годы мы выросли, наши основные ценности остались неизменными: исключительное мастерство, внимание к деталям и глубокое понимание искусства создания красивых предметов, которые вдохновляют и восхищают.'
      },
      values: {
        title: 'Наши Ценности',
        quality: {
          title: 'Качество',
          description: 'Мы никогда не идем на компромисс в вопросах качества. От выбора материалов до финальных штрихов, совершенство является нашим стандартом на каждом этапе создания.'
        },
        craftsmanship: {
          title: 'Мастерство',
          description: 'Наши мастера сочетают традиционные техники с современными инновациями, создавая изделия, которые являются не просто продуктами, а произведениями искусства, созданными на поколения.'
        },
        sustainability: {
          title: 'Устойчивость',
          description: 'Мы привержены ответственным практикам, минимизирующим воздействие на окружающую среду. Мы тщательно подбираем материалы и постоянно ищем способы сделать наши процессы более экологичными.'
        }
      }
    },
    // Delivery Page
    delivery: {
      hero: {
        title: 'Бесплатная Доставка по Всему Миру',
        subtitle: 'Мы доставляем во все страны мира без дополнительной платы'
      },
      shipping: {
        title: 'Бесплатная Мировая Доставка',
        points: [
          'Доставка в течение 5-7 рабочих дней',
          'Номер для отслеживания предоставляется по электронной почте',
          'Бесплатная доставка для всех заказов по всему миру'
        ]
      },
      security: {
        title: 'Безопасная Доставка',
        points: [
          'Полная страховка от потери или повреждения',
          'Упаковка в надежные, защищенные контейнеры',
          'Бережная обработка надежными партнерами по доставке',
          'Отслеживание от нашего склада до вашей двери'
        ]
      },
      faq: {
        title: 'Часто Задаваемые Вопросы',
        questions: [
          {
            q: 'Сколько времени займет получение заказа?',
            a: 'Стандартная доставка занимает 5-7 рабочих дней по всему миру. Время доставки может немного варьироваться в зависимости от вашего местоположения и обработки на таможне.'
          },
          {
            q: 'Могу ли я отследить мой заказ?',
            a: 'Да, вы получите номер для отслеживания по электронной почте после отправки заказа. Вы можете использовать его для отслеживания пути вашей посылки.'
          },
          {
            q: 'Что делать, если товар прибыл поврежденным?',
            a: 'Все отправления полностью застрахованы. Если ваш товар прибыл поврежденным, пожалуйста, свяжитесь с нашей службой поддержки в течение 48 часов с фотографиями повреждений, и мы организуем замену или возврат средств.'
          }
        ]
      },
      contact: {
        title: 'Нужна помощь с доставкой?',
        email: 'Свяжитесь с нами: info@armornasvap.com'
      }
    },
    // Footer
    footer: {
      description: 'Маски и кольца премиального качества, созданные с исключительным вниманием к деталям.',
      quickLinks: 'Быстрые ссылки',
      contactUs: 'Связаться с нами',
      rights: 'Все права защищены.',
      privacyPolicy: 'Политика конфиденциальности',
      termsOfService: 'Условия использования'
    },
    // Products
    products: {
      title: 'Наши Товары',
      customize: 'Открыть',
      loading: 'Загрузка товаров...'
    },
    // Privacy Policy
    privacyPolicy: {
      title: 'Политика Конфиденциальности',
      lastUpdated: 'Последнее обновление',
      sections: {
        informationCollect: {
          title: 'Информация, которую мы собираем',
          description: 'Мы собираем информацию, которую вы предоставляете нам напрямую, включая:',
          items: [
            'Имя и контактную информацию',
            'Адреса для выставления счетов и доставки',
            'Платежную информацию',
            'Историю заказов',
            'Предпочтения по коммуникации'
          ]
        },
        informationUse: {
          title: 'Как мы используем вашу информацию',
          description: 'Мы используем собранную информацию для:',
          items: [
            'Обработки ваших заказов и платежей',
            
            'Общения с вами о ваших заказах',
            'Отправки маркетинговых сообщений (с вашего согласия)',
            'Улучшения наших продуктов и услуг',
            'Соблюдения юридических обязательств'
          ]
        },
        informationSharing: {
          title: 'Передача информации',
          description: 'Мы не продаем вашу личную информацию. Мы можем делиться вашей информацией с:',
          items: [
            'Поставщиками услуг, помогающими в наших операциях',
            'Платежными системами',
            'Партнерами по доставке',
            'Правоохранительными органами, когда это требуется по закону'
          ]
        },
        rights: {
          title: 'Ваши права',
          description: 'Вы имеете право:',
          items: [
            'Получать доступ к вашей личной информации',
            'Исправлять неточную информацию',
            'Запрашивать удаление вашей информации',
            'Отказываться от маркетинговых сообщений',
            'Подавать жалобы в надзорные органы'
          ]
        },
        contact: {
          title: 'Свяжитесь с нами',
          description: 'Если у вас есть вопросы о нашей Политике конфиденциальности, пожалуйста, свяжитесь с нами:',
          email: 'Email: info@armornasvap.com'
        }
      }
    },
    // Terms of Service
    termsOfService: {
      title: 'Условия Использования',
      lastUpdated: 'Последнее обновление',
      sections: {
        agreement: {
          title: 'Согласие с условиями',
          content: 'Получая доступ к нашему веб-сайту и используя его, вы соглашаетесь соблюдать настоящие Условия использования и все применимые законы и правила. Если вы не согласны с какими-либо из этих условий, вам запрещено использовать или получать доступ к этому сайту.'
        },
        license: {
          title: 'Лицензия на использование',
          content: 'Разрешается временно загружать одну копию материалов на нашем веб-сайте только для личного, некоммерческого просмотра. Это предоставление лицензии, а не передача права собственности.'
        },
        productInfo: {
          title: 'Информация о продукте',
          content: 'Мы стремимся предоставлять точные описания продуктов и цены. Однако мы не гарантируем, что описания продуктов или цены являются точными, полными, надежными, актуальными или безошибочными.'
        },
        shipping: {
          title: 'Доставка',
          content: 'Мы осуществляем доставку по всему миру. Сроки доставки могут варьироваться в зависимости от вашего местоположения. Мы не несем ответственности за задержки, вызванные таможней или другими факторами вне нашего контроля.'
        },
        returns: {
          title: 'Возврат и возмещение',
          content: 'Мы принимаем возврат в течение 30 дней после доставки. Товары должны быть неиспользованными и в оригинальной упаковке. Изготовленные на заказ товары не подлежат возврату, если они не имеют дефектов.'
        },
        disclaimer: {
          title: 'Отказ от ответственности',
          content: 'Материалы на нашем веб-сайте предоставляются "как есть". Мы не даем никаких гарантий, явных или подразумеваемых, и настоящим отказываемся от всех других гарантий, включая, помимо прочего, подразумеваемые гарантии или условия товарной пригодности, пригодности для определенной цели или ненарушения прав интеллектуальной собственности или других нарушений прав.'
        },
        contact: {
          title: 'Контактная информация',
          description: 'Если у вас есть вопросы об этих Условиях использования, пожалуйста, свяжитесь с нами:',
          email: 'Email: info@armornasvap.com'
        }
      }
    },
    // Admin Panel
    admin: {
      title: 'Панель Администратора',
      login: {
        title: 'Вход для администратора',
        password: 'Пароль',
        submit: 'Войти',
        loading: 'Вход...',
        error: 'Неверный пароль'
      },
      navigation: {
        orders: 'Заказы',
        products: 'Товары',
        logout: 'Выйти'
      },
      orders: {
        title: 'Все Заказы',
        empty: 'Заказы не найдены',
        columns: {
          details: 'Детали заказа',
          customer: 'Информация о клиенте',
          items: 'Товары',
          total: 'Итого',
          status: 'Статус'
        },
        status: {
          pending: 'В обработке',
          delivering: 'Доставляется',
          delivered: 'Доставлен'
        }
      },
      products: {
        title: 'Управление товарами',
        form: {
          name: 'Название',
          price: 'Цена',
          category: 'Категория',
          image: {
            label: 'Изображение товара',
            uploading: 'Загрузка...'
          },
          model: {
            label: '3D Модель',
            uploading: 'Загрузка...'
          },
          config: 'Конфигурация кастомизации (JSON)',
          submit: {
            create: 'Создать товар',
            creating: 'Создание...'
          }
        },
        deleteConfirm: 'Вы уверены, что хотите удалить этот товар?'
      }
    }
  }
} as const;

export const useTranslation = (language: Language) => {
  return translations[language];
};