export type Language = 'en' | 'hi' | 'te';

export const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు' },
];

export const NFC_PACK_OPTIONS = [
  '1 NFC + QR Card — Classic Blue',
  '1 NFC + QR Card — Matte Black',
  '2 NFC + QR Cards — Blue + Black Combo',
  '5 NFC + QR Cards — Multi-Counter Pack',
  'Custom Branded / Bulk Shop Order',
] as const;

export type NfcPackOption = (typeof NFC_PACK_OPTIONS)[number];

export interface TranslationBundle {
  nav: {
    howItWorks: string;
    quality: string;
    reviews: string;
    faq: string;
    cta: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadlineLead: string;
    subheadlineHighlight: string;
    subheadlineTail: string;
    trust: {
      ratingTitle: string;
      ratingSub: string;
      clientsTitle: string;
      clientsSub: string;
      consultTitle: string;
      consultSub: string;
    };
    hoverToZoom: string;
    quickTags: {
      review: string;
      whatsapp: string;
      instagram: string;
    };
    prevImageAria: string;
    nextImageAria: string;
  };
  gallery: {
    id: 'blue-front' | 'black-front' | 'side-thickness' | 'self-adhesive-back';
    label: string;
    badge: string;
    title: string;
    caption: string;
    image: string;
    alt: string;
  }[];
  form: {
    title: string;
    subtitle: string;
    autoFilled: string;
    nameLabel: string;
    namePlaceholder: string;
    nameError: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneError: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailError: string;
    addressLabel: string;
    optionalTag: string;
    addressPlaceholder: string;
    packLabel: string;
    packPlaceholder: string;
    packError: string;
    colorBlueTitle: string;
    colorBlueSub: string;
    colorBlackTitle: string;
    colorBlackSub: string;
    packLabels: Record<NfcPackOption, string>;
    submitIdle: string;
    submitLoading: string;
    privacyNote: string;
    thankYouHeadline: (name: string) => string;
    thankYouBody: string;
    sheetFallbackNote: string;
    chatOnWhatsApp: string;
    submitAnother: string;
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    nfcChip: string;
    qrChip: string;
    ctaLink: string;
    items: {
      id: string;
      title: string;
      subtitle: string;
      detail: string;
      iconType: 'google' | 'whatsapp' | 'instagram';
    }[];
  };
  qualitySection: {
    eyebrow: string;
    heading: string;
    ctaLink: string;
    cardCta: string;
  };
  whyUs: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: string;
    points: {
      number: string;
      title: string;
      description: string;
      metric: string;
    }[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    items: {
      quote: string;
      name: string;
      context: string;
      outcome: string;
    }[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    body: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  footer: {
    tagline: string;
    whatsappSupport: string;
  };
  mobileSticky: {
    title: string;
    subtitle: string;
    cta: string;
  };
  floatingWhatsappLabel: string;
  directWhatsappPrefill: string;
}

export const TRANSLATIONS: Record<Language, TranslationBundle> = {
  en: {
    nav: {
      howItWorks: 'How It Works',
      quality: 'Quality',
      reviews: 'Reviews',
      faq: 'FAQ',
      cta: 'Pre-Order Now',
    },
    hero: {
      kicker: 'For Shop Owners · 3-in-1 Smart NFC + QR Card Pre-Order',
      headline: 'Get price & Pre-Order Your Smart NFC Card',
      subheadlineLead:
        'Fill the form below, our team will call you within 30 minutes. With a single phone tap or QR scan, customers open your',
      subheadlineHighlight: 'Google Review, WhatsApp & Instagram',
      subheadlineTail: 'together on one page.',
      trust: {
        ratingTitle: '5-star rating',
        ratingSub: 'Get more Google reviews fast',
        clientsTitle: '500+ Happy Clients',
        clientsSub: 'Shops, cafes & salons active',
        consultTitle: 'Free Consultation',
        consultSub: '30-min callback & full setup',
      },
      hoverToZoom: 'Hover to zoom',
      quickTags: {
        review: 'Review',
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
      },
      prevImageAria: 'Previous product image',
      nextImageAria: 'Next product image',
    },
    gallery: [
      {
        id: 'blue-front',
        label: 'Classic Blue',
        badge: 'Front Design',
        title: 'Classic Blue & White Edition',
        caption:
          'High-visibility counter finish with Google Review, WhatsApp, Instagram, Tap NFC zone & backup QR code.',
        image: '/assets/aistudio/nfc_card_ae3b1c4a.jpeg',
        alt: 'Classic Blue and White digitaldotads Smart NFC and QR Card showing Google Review, WhatsApp, Instagram, Tap Your Phone Here NFC zone, and QR code',
      },
      {
        id: 'black-front',
        label: 'Matte Black',
        badge: 'Premium Edition',
        title: 'Matte Black & Gold Edition',
        caption:
          'Sleek luxury matte black finish with gold NFC tap icon — ideal for salons, cafes, boutiques, and studios.',
        image: '/assets/aistudio/nfc_black_9aade8af.jpeg',
        alt: 'Matte Black and Gold digitaldotads Smart NFC and QR Card featuring Google Review, WhatsApp, Instagram, and gold Tap Your Phone Here NFC icon',
      },
      {
        id: 'side-thickness',
        label: 'Thickness',
        badge: 'Side Profile',
        title: 'Solid Thick Rigid Build',
        caption:
          'Heavy-duty rigid acrylic/PVC core that stands straight and never bends, creases, or wears out like paper stickers.',
        image: '/assets/aistudio/side_post_be49cc5e.jpeg',
        alt: 'Side angle photo of digitaldotads NFC card demonstrating solid rigid card thickness and crisp beveled edge quality',
      },
      {
        id: 'self-adhesive-back',
        label: 'Adhesive Back',
        badge: 'Back Side',
        title: 'Strong Self-Adhesive Backing',
        caption:
          'Peel-and-stick high-grip adhesive back lets you mount the card firmly on billing counters, glass doors, or walls in seconds.',
        image: '/assets/aistudio/nfc_back_2f1b7015.jpeg',
        alt: 'Back side of digitaldotads NFC card showing protective peel-off grid liner for self-adhesive mounting',
      },
    ],
    form: {
      title: 'Pre-Order Your NFC Card',
      subtitle: 'Get price & callback within 30 minutes',
      autoFilled: 'Auto-filled',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your name or shop name',
      nameError: 'Please enter your name or shop name',
      phoneLabel: 'Mobile Number',
      phonePlaceholder: '10 Digit Mobile Number',
      phoneError: 'Please enter a valid 10-digit mobile number',
      emailLabel: 'Email ID',
      emailPlaceholder: 'Email ID',
      emailError: 'Please enter a valid Email ID',
      addressLabel: 'Shop Address / City',
      optionalTag: '(Optional)',
      addressPlaceholder: 'Enter your shop address or city',
      packLabel: 'Select NFC Card Pack',
      packPlaceholder: 'Select NFC Card Pack (Blue / Black)',
      packError: 'Please select an NFC card pack',
      colorBlueTitle: 'Classic Blue',
      colorBlueSub: 'Blue & White',
      colorBlackTitle: 'Matte Black',
      colorBlackSub: 'Black & Gold',
      packLabels: {
        '1 NFC + QR Card — Classic Blue': '1 NFC + QR Card — Classic Blue',
        '1 NFC + QR Card — Matte Black': '1 NFC + QR Card — Matte Black',
        '2 NFC + QR Cards — Blue + Black Combo':
          '2 NFC + QR Cards — Blue + Black Combo',
        '5 NFC + QR Cards — Multi-Counter Pack':
          '5 NFC + QR Cards — Multi-Counter Pack',
        'Custom Branded / Bulk Shop Order': 'Custom Branded / Bulk Shop Order',
      },
      submitIdle: 'Pre-Order & Get Price',
      submitLoading: 'Sending...',
      privacyNote:
        'Saved securely to our order sheet with instant WhatsApp support.',
      thankYouHeadline: (name: string) =>
        `Thank you ${name}! Our team will call you within 30 minutes.`,
      thankYouBody:
        'Your NFC Card pre-order request has been received. Message us on WhatsApp now to share your shop logo or business links.',
      sheetFallbackNote: 'Please WhatsApp us',
      chatOnWhatsApp: 'Chat on WhatsApp',
      submitAnother: 'Submit another pre-order',
    },
    howItWorks: {
      eyebrow: 'How This NFC Card Works',
      heading: 'One tap or scan opens all 3 actions on your customer’s phone',
      nfcChip: 'NFC Phone Tap',
      qrChip: 'QR Code Scan',
      ctaLink: 'Pre-order for your shop',
      items: [
        {
          id: 'google-review',
          title: 'Google Review',
          subtitle: 'Share your experience',
          detail:
            'Opens your Google Business Profile review prompt directly on tap. Customers can leave a 5-star review in 10 seconds without searching.',
          iconType: 'google',
        },
        {
          id: 'whatsapp-connect',
          title: 'WhatsApp',
          subtitle: 'Chat with us instantly',
          detail:
            'Customers can message your shop directly on WhatsApp without saving your number — ideal for repeat orders, price queries, and updates.',
          iconType: 'whatsapp',
        },
        {
          id: 'instagram-follow',
          title: 'Instagram',
          subtitle: 'Follow for updates & offers',
          detail:
            'Launches your Instagram business profile in one tap so walk-in shoppers can follow you immediately for new arrivals and offers.',
          iconType: 'instagram',
        },
      ],
    },
    qualitySection: {
      eyebrow: 'Product Quality & Thickness',
      heading: 'Solid thick build, self-adhesive back & 2 premium finishes',
      ctaLink: 'Pre-order your edition',
      cardCta: 'Pre-Order This Card',
    },
    whyUs: {
      eyebrow: 'Why Shop Owners Love It',
      heading: 'Turn every walk-in customer into a Google Review & repeat buyer',
      body: 'Paper visiting cards get thrown away. A smart NFC + QR counter card lets every customer review your shop, message on WhatsApp, and follow your Instagram in seconds.',
      cta: 'Book Your Pre-Order',
      points: [
        {
          number: '01.',
          title: 'Tap (NFC) or Scan (QR) — Works on Every Smartphone',
          description:
            'Whether your customer uses an NFC-enabled iPhone/Android or a standard camera phone, tapping or scanning opens your business page immediately with zero app downloads.',
          metric: '100% Android & iOS compatible',
        },
        {
          number: '02.',
          title: 'Pre-Programmed With Your Exact Shop Links',
          description:
            'Once your pre-order is confirmed, our team configures your Google Review link, WhatsApp number, and Instagram handle before shipping — ready to use right out of the box.',
          metric: 'Ready-to-use delivery',
        },
        {
          number: '03.',
          title: 'Durable Counter-Ready Build for Busy Shops',
          description:
            'Built for salons, cafes, clinics, showrooms, gyms, and retail billing desks with a thick rigid body, glossy scratch-resistant print, and peel-and-stick backing.',
          metric: 'Lifetime link update support',
        },
      ],
    },
    testimonials: {
      eyebrow: 'Shop Owner Reviews',
      heading: 'Trusted by 500+ local businesses across India',
      items: [
        {
          quote:
            'Earlier customers promised to review us on Google after reaching home and forgot. After placing the digitaldotads NFC card on our reception desk, we got 90+ genuine 5-star reviews in 6 weeks and doubled our Instagram followers.',
          name: 'Vikram Sharma',
          context: 'Owner, Royal Salon & Studio, Pune',
          outcome: '90+ Google Reviews in 6 weeks',
        },
        {
          quote:
            'Customers now tap their phone right after billing and connect with us on WhatsApp and Instagram in seconds. Their team called within 20 minutes of our pre-order and set up all three links the same day.',
          name: 'Anjali Patel',
          context: 'Founder, BakeHouse Cafe, Surat',
          outcome: '2x Repeat WhatsApp Inquiries',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      heading: 'Common questions before you pre-order',
      body: 'Have another question? Submit the pre-order form or message us directly on WhatsApp.',
      items: [
        {
          question:
            'What opens on a customer’s phone when they tap or scan the NFC card?',
          answer:
            'When a customer taps their phone or scans the QR code, your custom mobile business page opens instantly with 3 direct buttons: Google Review (to rate your shop), WhatsApp (to chat with you immediately), and Instagram (to follow your page).',
        },
        {
          question: 'Do customers need to install any mobile app?',
          answer:
            'No app is required. Both NFC tap and QR scan open directly in the customer’s built-in mobile browser. If an older phone does not have NFC, the high-contrast QR code on the card works with any phone camera.',
        },
        {
          question: 'How do pricing and link setup work after I submit the form?',
          answer:
            'Within 30 minutes of submitting the form, our team calls and messages you on WhatsApp with exact pack pricing, delivery timeline, and completes your Google Review, WhatsApp, and Instagram setup.',
        },
      ],
    },
    footer: {
      tagline: 'Smart NFC + QR Business Cards for Shop Owners',
      whatsappSupport: 'WhatsApp: +91 75075 93944',
    },
    mobileSticky: {
      title: 'Pre-Order NFC Card',
      subtitle: 'Callback in 30 mins',
      cta: 'Get Price',
    },
    floatingWhatsappLabel: 'WhatsApp Us',
    directWhatsappPrefill:
      'Hi digitaldotads team, I would like to know the price for Smart NFC + QR Card pre-order.',
  },

  hi: {
    nav: {
      howItWorks: 'कैसे काम करता है',
      quality: 'क्वालिटी',
      reviews: 'रिव्यूज़',
      faq: 'सवाल-जवाब',
      cta: 'प्री-ऑर्डर करें',
    },
    hero: {
      kicker: 'शॉप ओनर्स के लिए · 3-in-1 स्मार्ट NFC + QR कार्ड प्री-ऑर्डर',
      headline: 'कीमत जानें और अपना स्मार्ट NFC कार्ड प्री-ऑर्डर करें',
      subheadlineLead:
        'नीचे दिया फॉर्म भरें, हमारी टीम आपको 30 मिनट के अंदर कॉल करेगी। एक टैप या स्कैन पर कस्टमर के मोबाइल में आपका',
      subheadlineHighlight: 'Google Review, WhatsApp और Instagram',
      subheadlineTail: 'तीनों एक साथ खुलेंगे।',
      trust: {
        ratingTitle: '5-स्टार रेटिंग',
        ratingSub: 'तेज़ी से Google रिव्यू बढ़ाएं',
        clientsTitle: '500+ खुश ग्राहक',
        clientsSub: 'दुकानें, कैफे और सैलून जुड़े हैं',
        consultTitle: 'फ्री कंसल्टेशन',
        consultSub: '30 मिनट में कॉल और पूरा सेटअप',
      },
      hoverToZoom: 'ज़ूम करने के लिए होवर करें',
      quickTags: {
        review: 'रिव्यू',
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
      },
      prevImageAria: 'पिछली प्रोडक्ट फोटो',
      nextImageAria: 'अगली प्रोडक्ट फोटो',
    },
    gallery: [
      {
        id: 'blue-front',
        label: 'क्लासिक ब्लू',
        badge: 'फ्रंट डिज़ाइन',
        title: 'क्लासिक ब्लू और व्हाइट एडिशन',
        caption:
          'हाई-विज़िबिलिटी काउंटर डिज़ाइन जिसमें Google Review, WhatsApp, Instagram, NFC टैप ज़ोन और बैकअप QR कोड शामिल है।',
        image: '/assets/aistudio/nfc_card_ae3b1c4a.jpeg',
        alt: 'क्लासिक ब्लू और व्हाइट digitaldotads स्मार्ट NFC और QR कार्ड',
      },
      {
        id: 'black-front',
        label: 'मैट ब्लैक',
        badge: 'प्रीमियम एडिशन',
        title: 'मैट ब्लैक और गोल्ड एडिशन',
        caption:
          'गोल्ड NFC टैप आइकन के साथ प्रीमियम मैट ब्लैक फिनिश — सैलून, कैफे, बुटीक और स्टूडियो के लिए बेहतरीन।',
        image: '/assets/aistudio/nfc_black_9aade8af.jpeg',
        alt: 'मैट ब्लैक और गोल्ड digitaldotads स्मार्ट NFC और QR कार्ड',
      },
      {
        id: 'side-thickness',
        label: 'थिकनेस',
        badge: 'साइड प्रोफ़ाइल',
        title: 'मज़बूत मोटा रिजिड बिल्ड',
        caption:
          'हेवी-ड्यूटी एक्रिलिक/PVC बॉडी जो बिल्कुल सीधी रहती है और पेपर स्टिकर की तरह मुड़ती या फटती नहीं है।',
        image: '/assets/aistudio/side_post_be49cc5e.jpeg',
        alt: 'कार्ड की मोटाई और मज़बूत किनारे दिखाती साइड प्रोफ़ाइल फोटो',
      },
      {
        id: 'self-adhesive-back',
        label: 'एडहेसिव बैक',
        badge: 'बैक साइड',
        title: 'मज़बूत सेल्फ-एडहेसिव बैकिंग',
        caption:
          'पील-एंड-स्टिक एडहेसिव बैक जिससे आप इसे बिलिंग काउंटर, ग्लास डोर या दीवार पर सेकंडों में चिपका सकते हैं।',
        image: '/assets/aistudio/nfc_back_2f1b7015.jpeg',
        alt: 'सेल्फ-एडहेसिव माउंटिंग ग्रिड लाइनर दिखाती कार्ड की बैक साइड फोटो',
      },
    ],
    form: {
      title: 'अपना NFC कार्ड प्री-ऑर्डर करें',
      subtitle: '30 मिनट में कीमत और कॉल प्राप्त करें',
      autoFilled: 'ऑटो-फिल्ड',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'अपना नाम या दुकान का नाम लिखें',
      nameError: 'कृपया अपना नाम या दुकान का नाम लिखें',
      phoneLabel: 'मोबाइल नंबर',
      phonePlaceholder: '10 अंकों का मोबाइल नंबर',
      phoneError: 'सही 10 अंकों का मोबाइल नंबर डालें',
      emailLabel: 'ईमेल आईडी',
      emailPlaceholder: 'Email ID',
      emailError: 'कृपया सही ईमेल आईडी डालें',
      addressLabel: 'दुकान का पता / शहर',
      optionalTag: '(वैकल्पिक)',
      addressPlaceholder: 'अपनी दुकान का पता / शहर लिखें',
      packLabel: 'NFC कार्ड पैक चुनें',
      packPlaceholder: 'NFC कार्ड पैक चुनें (ब्लू / ब्लैक)',
      packError: 'कृपया NFC कार्ड पैक चुनें',
      colorBlueTitle: 'क्लासिक ब्लू',
      colorBlueSub: 'ब्लू और व्हाइट',
      colorBlackTitle: 'मैट ब्लैक',
      colorBlackSub: 'ब्लैक और गोल्ड',
      packLabels: {
        '1 NFC + QR Card — Classic Blue': '1 NFC + QR कार्ड — क्लासिक ब्लू',
        '1 NFC + QR Card — Matte Black': '1 NFC + QR कार्ड — मैट ब्लैक',
        '2 NFC + QR Cards — Blue + Black Combo':
          '2 NFC + QR कार्ड — ब्लू + ब्लैक कॉम्बो',
        '5 NFC + QR Cards — Multi-Counter Pack':
          '5 NFC + QR कार्ड — मल्टी-काउंटर पैक',
        'Custom Branded / Bulk Shop Order': 'कस्टम ब्रांडेड / बल्क शॉप ऑर्डर',
      },
      submitIdle: 'प्री-ऑर्डर करें और कीमत जानें',
      submitLoading: 'भेजा जा रहा है...',
      privacyNote:
        'आपका डेटा Google Sheet पर सुरक्षित सेव होगा और तुरंत WhatsApp सपोर्ट मिलेगा।',
      thankYouHeadline: (name: string) =>
        `धन्यवाद ${name}! हमारी टीम आपको 30 मिनट में कॉल करेगी।`,
      thankYouBody:
        'आपका NFC कार्ड प्री-ऑर्डर अनुरोध मिल गया है। अपनी दुकान का लोगो या लिंक भेजने के लिए अभी WhatsApp पर मैसेज करें।',
      sheetFallbackNote: 'कृपया हमें WhatsApp करें',
      chatOnWhatsApp: 'WhatsApp पर चैट करें',
      submitAnother: 'नया प्री-ऑर्डर सबमिट करें',
    },
    howItWorks: {
      eyebrow: 'यह NFC कार्ड कैसे काम करता है',
      heading: 'टैप या स्कैन करते ही कस्टमर के मोबाइल पर तीनों विकल्प खुल जाएंगे',
      nfcChip: 'NFC फोन टैप',
      qrChip: 'QR कोड स्कैन',
      ctaLink: 'अपनी दुकान के लिए प्री-ऑर्डर करें',
      items: [
        {
          id: 'google-review',
          title: 'Google Review',
          subtitle: 'अपना अनुभव साझा करें',
          detail:
            'कस्टमर के टैप करते ही आपका Google Business Profile रिव्यू पेज सीधा खुल जाता है। बिना खोजे 10 सेकंड में 5-स्टार रिव्यू मिलता है।',
          iconType: 'google',
        },
        {
          id: 'whatsapp-connect',
          title: 'WhatsApp',
          subtitle: 'तुरंत हमसे चैट करें',
          detail:
            'कस्टमर बिना नंबर सेव किए सीधे आपकी दुकान के WhatsApp पर मैसेज कर सकता है — दोबारा ऑर्डर, रेट और ऑफर्स के लिए।',
          iconType: 'whatsapp',
        },
        {
          id: 'instagram-follow',
          title: 'Instagram',
          subtitle: 'अपडेट्स और ऑफर्स के लिए फॉलो करें',
          detail:
            'आपका Instagram बिज़नेस पेज एक टैप में खुलता है जहाँ कस्टमर तुरंत आपको फॉलो कर सकते हैं और नए ऑफर्स देख सकते हैं।',
          iconType: 'instagram',
        },
      ],
    },
    qualitySection: {
      eyebrow: 'प्रोडक्ट क्वालिटी और थिकनेस',
      heading: 'मज़बूत मोटा बिल्ड, सेल्फ-एडहेसिव बैक और 2 प्रीमियम फिनिश',
      ctaLink: 'अपना एडिशन प्री-ऑर्डर करें',
      cardCta: 'यह कार्ड प्री-ऑर्डर करें',
    },
    whyUs: {
      eyebrow: 'शॉप ओनर्स इसे क्यों पसंद करते हैं',
      heading: 'हर वॉक-इन कस्टमर को Google रिव्यू और रिपीट ग्राहक बनाएं',
      body: 'कागज के विज़िटिंग कार्ड लोग फेंक देते हैं। स्मार्ट NFC + QR काउंटर कार्ड से ग्राहक तुरंत आपकी दुकान को रिव्यू देता है, WhatsApp पर जुड़ता है और Instagram फॉलो करता है।',
      cta: 'अपना प्री-ऑर्डर बुक करें',
      points: [
        {
          number: '01.',
          title: 'टैप (NFC) या स्कैन (QR) — हर स्मार्टफोन में चलता है',
          description:
            'चाहे ग्राहक के पास NFC वाला iPhone/Android हो या सामान्य कैमरा फोन, टैप या स्कैन करते ही बिज़नेस पेज खुल जाता है। कोई अलग ऐप नहीं चाहिए।',
          metric: '100% Android और iOS सपोर्ट',
        },
        {
          number: '02.',
          title: 'आपके सटीक शॉप लिंक्स के साथ प्री-प्रोग्राम्ड',
          description:
            'प्री-ऑर्डर कन्फर्म होते ही हमारी टीम आपका Google Review लिंक, WhatsApp नंबर और Instagram प्रोफाइल सेट करके कार्ड भेजती है।',
          metric: 'रेडी-टू-यूज़ डिलीवरी',
        },
        {
          number: '03.',
          title: 'बिज़ी दुकानों के लिए टिकाऊ काउंटर-रेडी बिल्ड',
          description:
            'सैलून, कैफे, क्लिनिक, शोरूम, जिम और रिटेल काउंटर के लिए वॉटर-रेसिस्टेंट, स्क्रैच-रेसिस्टेंट ग्लॉसी और मज़बूत बॉडी।',
          metric: 'लाइफटाइम लिंक अपडेट सपोर्ट',
        },
      ],
    },
    testimonials: {
      eyebrow: 'शॉप ओनर रिव्यूज़',
      heading: 'भारत भर के 500+ स्थानीय बिज़नेस का भरोसा',
      items: [
        {
          quote:
            'पहले ग्राहक घर जाकर Google रिव्यू देने का वादा करके भूल जाते थे। रिसेप्शन डेस्क पर digitaldotads NFC कार्ड रखने के 6 हफ्तों में हमें 90+ असली 5-स्टार रिव्यू मिले और Instagram फॉलोअर्स भी दोगुने हो गए।',
          name: 'विक्रम शर्मा',
          context: 'ओनर, रॉयल सैलून एंड स्टूडियो, पुणे',
          outcome: '6 हफ्तों में 90+ Google रिव्यूज़',
        },
        {
          quote:
            'अब ग्राहक बिलिंग के तुरंत बाद फोन टैप करके WhatsApp और Instagram पर जुड़ जाते हैं। प्री-ऑर्डर के 20 मिनट में ही टीम ने कॉल करके तीनों लिंक्स सेटअप कर दिए।',
          name: 'अंजलि पटेल',
          context: 'फाउंडर, बेकहाउस कैफे, सूरत',
          outcome: '2x रिपीट WhatsApp पूछताछ',
        },
      ],
    },
    faq: {
      eyebrow: 'सवाल-जवाब',
      heading: 'प्री-ऑर्डर से पहले ज़रूरी सवाल',
      body: 'कोई और सवाल हो तो प्री-ऑर्डर फॉर्म भरें या सीधे WhatsApp पर पूछें।',
      items: [
        {
          question:
            'NFC कार्ड टैप या स्कैन करने पर ग्राहक के फोन में क्या खुलेगा?',
          answer:
            'फोन टैप या QR कोड स्कैन करते ही ग्राहक के मोबाइल ब्राउज़र में आपका स्मार्ट बिज़नेस पेज खुलेगा, जहाँ 3 बटन होंगे: Google Review, WhatsApp और Instagram।',
        },
        {
          question: 'क्या इसके लिए ग्राहक को कोई ऐप डाउनलोड करनी होगी?',
          answer:
            'बिल्कुल नहीं। NFC टैप और QR स्कैन दोनों बिना किसी ऐप के सीधे मोबाइल ब्राउज़र में खुलते हैं। पुराने फोन के लिए कार्ड पर हाई-क्वालिटी QR कोड भी है।',
        },
        {
          question: 'फॉर्म भरने के बाद कीमत और सेटअप कैसे होगा?',
          answer:
            'फॉर्म सबमिट करने के 30 मिनट के भीतर हमारी टीम आपको कॉल और WhatsApp करेगी, पैक की कीमत बताएगी और आपके सभी लिंक्स सेट कर देगी।',
        },
      ],
    },
    footer: {
      tagline: 'शॉप ओनर्स के लिए स्मार्ट NFC + QR बिज़नेस कार्ड्स',
      whatsappSupport: 'WhatsApp: +91 75075 93944',
    },
    mobileSticky: {
      title: 'NFC कार्ड प्री-ऑर्डर करें',
      subtitle: '30 मिनट में कॉलबैक',
      cta: 'कीमत जानें',
    },
    floatingWhatsappLabel: 'WhatsApp करें',
    directWhatsappPrefill:
      'नमस्ते digitaldotads टीम, मुझे स्मार्ट NFC + QR कार्ड प्री-ऑर्डर की कीमत जाननी है।',
  },

  te: {
    nav: {
      howItWorks: 'ఎలా పనిచేస్తుంది',
      quality: 'నాణ్యత',
      reviews: 'రివ్యూలు',
      faq: 'ప్రశ్నలు',
      cta: 'ప్రీ-ఆర్డర్ చేయండి',
    },
    hero: {
      kicker: 'షాప్ యజమానుల కోసం · 3-in-1 స్మార్ట్ NFC + QR కార్డ్ ప్రీ-ఆర్డర్',
      headline: 'ధర తెలుసుకోండి & మీ స్మార్ట్ NFC కార్డ్‌ను ప్రీ-ఆర్డర్ చేయండి',
      subheadlineLead:
        'కింది ఫారమ్‌ను పూరించండి, మా బృందం 30 నిమిషాల్లో మీకు కాల్ చేస్తుంది. ఒక్క ఫోన్ ట్యాప్ లేదా QR స్కాన్‌తో కస్టమర్ మొబైల్‌లో మీ',
      subheadlineHighlight: 'Google Review, WhatsApp & Instagram',
      subheadlineTail: 'మూడూ ఒకే పేజీలో ఓపెన్ అవుతాయి.',
      trust: {
        ratingTitle: '5-స్టార్ రేటింగ్',
        ratingSub: 'త్వరగా Google రివ్యూలు పొందండి',
        clientsTitle: '500+ సంతోషకరమైన క్లయింట్లు',
        clientsSub: 'షాపులు, కేఫ్‌లు & సెలూన్లు వాడుతున్నాయి',
        consultTitle: 'ఉచిత కన్సల్టేషన్',
        consultSub: '30 నిమిషాల్లో కాల్ & పూర్తి సెటప్',
      },
      hoverToZoom: 'జూమ్ చేయడానికి హోవర్ చేయండి',
      quickTags: {
        review: 'రివ్యూ',
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
      },
      prevImageAria: 'మునుపటి ఉత్పత్తి చిత్రం',
      nextImageAria: 'తదుపరి ఉత్పత్తి చిత్రం',
    },
    gallery: [
      {
        id: 'blue-front',
        label: 'క్లాసిక్ బ్లూ',
        badge: 'ఫ్రంట్ డిజైన్',
        title: 'క్లాసిక్ బ్లూ & వైట్ ఎడిషన్',
        caption:
          'Google Review, WhatsApp, Instagram, NFC ట్యాప్ జోన్ మరియు బ్యాకప్ QR కోడ్‌తో స్పష్టమైన కౌంటర్ ఫినిష్.',
        image: '/assets/aistudio/nfc_card_ae3b1c4a.jpeg',
        alt: 'క్లాసిక్ బ్లూ మరియు వైట్ digitaldotads స్మార్ట్ NFC మరియు QR కార్డ్',
      },
      {
        id: 'black-front',
        label: 'మ్యాట్ బ్లాక్',
        badge: 'ప్రీమియం ఎడిషన్',
        title: 'మ్యాట్ బ్లాక్ & గోల్డ్ ఎడిషన్',
        caption:
          'గోల్డ్ NFC ట్యాప్ ఐకాన్‌తో లగ్జరీ మ్యాట్ బ్లాక్ ఫినిష్ — సెలూన్లు, కేఫ్‌లు, బొటిక్‌లు మరియు స్టూడియోలకు ప్రత్యేకం.',
        image: '/assets/aistudio/nfc_black_9aade8af.jpeg',
        alt: 'మ్యాట్ బ్లాక్ మరియు గోల్డ్ digitaldotads స్మార్ట్ NFC మరియు QR కార్డ్',
      },
      {
        id: 'side-thickness',
        label: 'మందం (Thickness)',
        badge: 'సైడ్ ప్రొఫైల్',
        title: 'దృఢమైన మందపాటి బిల్డ్',
        caption:
          'పేపర్ స్టిక్కర్లలా వంగిపోకుండా, చిరిగిపోకుండా నిటారుగా ఉండే హెవీ-డ్యూటీ రిజిడ్ యాక్రిలిక్/PVC కార్డ్.',
        image: '/assets/aistudio/side_post_be49cc5e.jpeg',
        alt: 'కార్డ్ మందం మరియు అంచు నాణ్యతను చూపే సైడ్ ప్రొఫైల్ ఫోటో',
      },
      {
        id: 'self-adhesive-back',
        label: 'అడ్హెసివ్ బ్యాక్',
        badge: 'బ్యాక్ సైడ్',
        title: 'బలమైన సెల్ఫ్-అడ్హెసివ్ బ్యాకింగ్',
        caption:
          'పీల్-అండ్-స్టిక్ గ్రిప్‌తో బిల్లింగ్ కౌంటర్, గ్లాస్ డోర్ లేదా గోడపై క్షణాల్లో సులభంగా అతికించవచ్చు.',
        image: '/assets/aistudio/nfc_back_2f1b7015.jpeg',
        alt: 'సెల్ఫ్-అడ్హెసివ్ మౌంటింగ్ లైనర్ చూపే కార్డ్ వెనుక భాగం ఫోటో',
      },
    ],
    form: {
      title: 'మీ NFC కార్డ్‌ను ప్రీ-ఆర్డర్ చేయండి',
      subtitle: '30 నిమిషాల్లో ధర & కాల్ పొందండి',
      autoFilled: 'ఆటో-ఫిల్డ్',
      nameLabel: 'పూర్తి పేరు',
      namePlaceholder: 'మీ పేరు లేదా షాప్ పేరు నమోదు చేయండి',
      nameError: 'దయచేసి మీ పేరు లేదా షాప్ పేరు నమోదు చేయండి',
      phoneLabel: 'మొబైల్ నంబర్',
      phonePlaceholder: '10 అంకెల మొబైల్ నంబర్',
      phoneError: 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి',
      emailLabel: 'ఇమెయిల్ ఐడి',
      emailPlaceholder: 'Email ID',
      emailError: 'దయచేసి సరైన ఇమెయిల్ ఐడి నమోదు చేయండి',
      addressLabel: 'షాప్ చిరునామా / నగరం',
      optionalTag: '(ఐచ్ఛికం)',
      addressPlaceholder: 'మీ షాప్ చిరునామా లేదా నగరం నమోదు చేయండి',
      packLabel: 'NFC కార్డ్ ప్యాక్ ఎంచుకోండి',
      packPlaceholder: 'NFC కార్డ్ ప్యాక్ ఎంచుకోండి (బ్లూ / బ్లాక్)',
      packError: 'దయచేసి ఒక NFC కార్డ్ ప్యాక్ ఎంచుకోండి',
      colorBlueTitle: 'క్లాసిక్ బ్లూ',
      colorBlueSub: 'బ్లూ & వైట్',
      colorBlackTitle: 'మ్యాట్ బ్లాక్',
      colorBlackSub: 'బ్లాక్ & గోల్డ్',
      packLabels: {
        '1 NFC + QR Card — Classic Blue': '1 NFC + QR కార్డ్ — క్లాసిక్ బ్లూ',
        '1 NFC + QR Card — Matte Black': '1 NFC + QR కార్డ్ — మ్యాట్ బ్లాక్',
        '2 NFC + QR Cards — Blue + Black Combo':
          '2 NFC + QR కార్డులు — బ్లూ + బ్లాక్ కాంబో',
        '5 NFC + QR Cards — Multi-Counter Pack':
          '5 NFC + QR కార్డులు — మల్టీ-కౌంటర్ ప్యాక్',
        'Custom Branded / Bulk Shop Order': 'కస్టమ్ బ్రాండెడ్ / బల్క్ షాప్ ఆర్డర్',
      },
      submitIdle: 'ప్రీ-ఆర్డర్ & ధర పొందండి',
      submitLoading: 'పంపబడుతోంది...',
      privacyNote:
        'మీ వివరాలు Google Sheet లో సురక్షితంగా సేవ్ చేయబడతాయి & తక్షణ WhatsApp సపోర్ట్ లభిస్తుంది.',
      thankYouHeadline: (name: string) =>
        `ధన్యవాదాలు ${name}! మా బృందం 30 నిమిషాల్లో మీకు కాల్ చేస్తుంది.`,
      thankYouBody:
        'మీ NFC కార్డ్ ప్రీ-ఆర్డర్ అభ్యర్థన అందింది. మీ షాప్ లోగో లేదా లింక్‌లను పంపడానికి ఇప్పుడే WhatsApp లో మెసేజ్ చేయండి.',
      sheetFallbackNote: 'దయచేసి మాకు WhatsApp చేయండి',
      chatOnWhatsApp: 'WhatsApp లో చాట్ చేయండి',
      submitAnother: 'మరొక ప్రీ-ఆర్డర్ పంపండి',
    },
    howItWorks: {
      eyebrow: 'ఈ NFC కార్డ్ ఎలా పనిచేస్తుంది',
      heading:
        'ట్యాప్ లేదా స్కాన్ చేసిన వెంటనే కస్టమర్ ఫోన్‌లో 3 ఆప్షన్లు ఓపెన్ అవుతాయి',
      nfcChip: 'NFC ఫోన్ ట్యాప్',
      qrChip: 'QR కోడ్ స్కాన్',
      ctaLink: 'మీ షాప్ కోసం ప్రీ-ఆర్డర్ చేయండి',
      items: [
        {
          id: 'google-review',
          title: 'Google Review',
          subtitle: 'మీ అనుభవాన్ని పంచుకోండి',
          detail:
            'ట్యాప్ చేసిన వెంటనే మీ Google Business Profile రివ్యూ పేజీ నేరుగా ఓపెన్ అవుతుంది. కస్టమర్లు 10 సెకన్లలో 5-స్టార్ రివ్యూ ఇవ్వగలరు.',
          iconType: 'google',
        },
        {
          id: 'whatsapp-connect',
          title: 'WhatsApp',
          subtitle: 'తక్షణమే మాతో చాట్ చేయండి',
          detail:
            'కస్టమర్లు నంబర్ సేవ్ చేయకుండానే నేరుగా మీ షాప్ WhatsApp కు మెసేజ్ చేయవచ్చు — రిపీట్ ఆర్డర్లు మరియు ధర వివరాల కోసం.',
          iconType: 'whatsapp',
        },
        {
          id: 'instagram-follow',
          title: 'Instagram',
          subtitle: 'అప్‌డేట్లు & ఆఫర్ల కోసం ఫాలో అవ్వండి',
          detail:
            'ఒక్క ట్యాప్‌తో మీ Instagram బిజినెస్ పేజీ ఓపెన్ అవుతుంది, తద్వారా కస్టమర్లు మిమ్మల్ని వెంటనే ఫాలో అవ్వగలరు.',
          iconType: 'instagram',
        },
      ],
    },
    qualitySection: {
      eyebrow: 'ఉత్పత్తి నాణ్యత & మందం',
      heading:
        'దృఢమైన మందపాటి బిల్డ్, సెల్ఫ్-అడ్హెసివ్ బ్యాక్ & 2 ప్రీమియం ఫినిష్‌లు',
      ctaLink: 'మీ ఎడిషన్ ప్రీ-ఆర్డర్ చేయండి',
      cardCta: 'ఈ కార్డ్‌ను ప్రీ-ఆర్డర్ చేయండి',
    },
    whyUs: {
      eyebrow: 'షాప్ యజమానులు దీన్ని ఎందుకు ఇష్టపడతారు',
      heading: 'ప్రతి వాక్-ఇన్ కస్టమర్‌ను Google రివ్యూ & రిపీట్ కస్టమర్‌గా మార్చండి',
      body: 'పేపర్ విజిటింగ్ కార్డులను ప్రజలు పడేస్తారు. స్మార్ట్ NFC + QR కౌంటర్ కార్డ్ ద్వారా కస్టమర్ క్షణాల్లో రివ్యూ ఇస్తారు, WhatsApp లో కనెక్ట్ అవుతారు మరియు Instagram లో ఫాలో అవుతారు.',
      cta: 'మీ ప్రీ-ఆర్డర్ బుక్ చేయండి',
      points: [
        {
          number: '01.',
          title: 'ట్యాప్ (NFC) లేదా స్కాన్ (QR) — ప్రతి స్మార్ట్‌ఫోన్‌లో పనిచేస్తుంది',
          description:
            'కస్టమర్ వద్ద NFC ఉన్న iPhone/Android ఉన్నా లేదా సాధారణ కెమెరా ఫోన్ ఉన్నా, ఏ యాప్ డౌన్‌లోడ్ చేయకుండానే మీ బిజినెస్ పేజీ వెంటనే ఓపెన్ అవుతుంది.',
          metric: '100% Android & iOS అనుకూలం',
        },
        {
          number: '02.',
          title: 'మీ షాప్ లింక్‌లతో ముందే ప్రోగ్రామ్ చేయబడుతుంది',
          description:
            'ప్రీ-ఆర్డర్ కన్ఫర్మ్ అయిన వెంటనే మా బృందం మీ Google Review లింక్, WhatsApp నంబర్ మరియు Instagram ప్రొఫైల్‌ను సెటప్ చేసి పంపుతుంది.',
          metric: 'రెడీ-టు-యూజ్ డెలివరీ',
        },
        {
          number: '03.',
          title: 'బిజీ షాపుల కోసం మన్నికైన కౌంటర్-రెడీ బిల్డ్',
          description:
            'సెలూన్లు, కేఫ్‌లు, క్లినిక్‌లు, షోరూమ్‌లు మరియు రిటైల్ కౌంటర్ల కోసం వాటర్-రెసిస్టెంట్, స్క్రాచ్-రెసిస్టెంట్ గ్లాసీ ఫినిష్‌తో తయారు చేయబడింది.',
          metric: 'లైఫ్‌టైమ్ లింక్ అప్‌డేట్ సపోర్ట్',
        },
      ],
    },
    testimonials: {
      eyebrow: 'షాప్ యజమానుల రివ్యూలు',
      heading: 'భారతదేశం అంతటా 500+ స్థానిక వ్యాపారాల నమ్మకం',
      items: [
        {
          quote:
            'గతంలో కస్టమర్లు ఇంటికి వెళ్లి Google రివ్యూ ఇస్తామని చెప్పి మర్చిపోయేవారు. మా రిసెప్షన్ డెస్క్‌పై digitaldotads NFC కార్డ్ పెట్టిన 6 వారాల్లోనే 90+ నిజమైన 5-స్టార్ రివ్యూలు వచ్చాయి మరియు Instagram ఫాలోవర్లు రెట్టింపు అయ్యారు.',
          name: 'విక్రమ్ శర్మ',
          context: 'యజమాని, రాయల్ సెలూన్ & స్టూడియో, పూణే',
          outcome: '6 వారాల్లో 90+ Google రివ్యూలు',
        },
        {
          quote:
            'ఇప్పుడు కస్టమర్లు బిల్లింగ్ తర్వాత ఫోన్ ట్యాప్ చేసి క్షణాల్లో WhatsApp మరియు Instagram లో కనెక్ట్ అవుతున్నారు. ప్రీ-ఆర్డర్ చేసిన 20 నిమిషాల్లోనే బృందం కాల్ చేసి మూడు లింక్‌లను సెటప్ చేసింది.',
          name: 'అంజలి పటేల్',
          context: 'వ్యవస్థాపకురాలు, బేక్‌హౌస్ కేఫ్, సూరత్',
          outcome: '2x రిపీట్ WhatsApp ఎంక్వైరీలు',
        },
      ],
    },
    faq: {
      eyebrow: 'తరచుగా అడిగే ప్రశ్నలు',
      heading: 'ప్రీ-ఆర్డర్ ముందు సాధారణ ప్రశ్నలు',
      body: 'ఇంకా ఏమైనా సందేహాలు ఉంటే ప్రీ-ఆర్డర్ ఫారమ్ పంపండి లేదా WhatsApp లో నేరుగా అడగండి.',
      items: [
        {
          question:
            'కస్టమర్ NFC కార్డ్‌ను ట్యాప్ లేదా స్కాన్ చేసినప్పుడు ఫోన్‌లో ఏమి ఓపెన్ అవుతుంది?',
          answer:
            'కస్టమర్ ఫోన్ ట్యాప్ చేసినా లేదా QR కోడ్ స్కాన్ చేసినా మీ బిజినెస్ పేజీ ఓపెన్ అవుతుంది, అందులో 3 బటన్లు ఉంటాయి: Google Review, WhatsApp మరియు Instagram.',
        },
        {
          question: 'దీని కోసం కస్టమర్లు ఏదైనా యాప్ ఇన్‌స్టాల్ చేయాలా?',
          answer:
            'ఏ యాప్ అవసరం లేదు. NFC ట్యాప్ మరియు QR స్కాన్ రెండూ నేరుగా ఫోన్ బ్రౌజర్‌లో ఓపెన్ అవుతాయి. పాత ఫోన్ల కోసం కార్డ్‌పై QR కోడ్ కూడా ఉంది.',
        },
        {
          question: 'ఫారమ్ పంపిన తర్వాత ధర మరియు సెటప్ ఎలా జరుగుతుంది?',
          answer:
            'ఫారమ్ సబ్మిట్ చేసిన 30 నిమిషాల్లో మా బృందం మీకు కాల్ మరియు WhatsApp చేసి ధర వివరాలు తెలియజేసి, మీ మూడు లింక్‌లను సెటప్ చేస్తుంది.',
        },
      ],
    },
    footer: {
      tagline: 'షాప్ యజమానుల కోసం స్మార్ట్ NFC + QR బిజినెస్ కార్డులు',
      whatsappSupport: 'WhatsApp: +91 75075 93944',
    },
    mobileSticky: {
      title: 'NFC కార్డ్ ప్రీ-ఆర్డర్',
      subtitle: '30 నిమిషాల్లో కాల్‌బ్యాక్',
      cta: 'ధర పొందండి',
    },
    floatingWhatsappLabel: 'WhatsApp చేయండి',
    directWhatsappPrefill:
      'నమస్తే digitaldotads టీమ్, నాకు స్మార్ట్ NFC + QR కార్డ్ ప్రీ-ఆర్డర్ ధర వివరాలు కావాలి.',
  },
};
