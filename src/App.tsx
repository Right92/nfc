import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Instagram,
  Languages,
  PhoneCall,
  QrCode,
  ShieldCheck,
  Smartphone,
  Star,
  Store,
  ZoomIn,
} from 'lucide-react';
import {
  LANGUAGE_OPTIONS,
  NFC_PACK_OPTIONS,
  TRANSLATIONS,
  type Language,
  type NfcPackOption,
} from './translations';

// =============================================================================
// CONFIGURATION
// =============================================================================
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwCReNj_-vlf05p5MQ3tClLKtqu7n78ammFeUZAYlMhueNqHkcmVRkSz13lEv3bY_c9/exec';
const WHATSAPP_NUMBER = '917507593944';

const LOCAL_STORAGE_PROFILE_KEY = 'digitaldotads_nfc_profile_v1';
const LOCAL_STORAGE_LEADS_KEY = 'digitaldotads_nfc_leads_backup_v1';
const LOCAL_STORAGE_LANG_KEY = 'digitaldotads_lang_v1';

type FieldKey = 'name' | 'phone' | 'email' | 'address' | 'service';

interface LeadFormState {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
}

interface LeadPayload {
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  source: 'Landing Page';
}

function sanitizeIndianMobile(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.length > 10 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  if (digits.length > 10 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

function isValidIndianMobile(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function normalizePackParam(raw: string | null): string {
  if (!raw) return '';
  const cleaned = raw.trim().toLowerCase();
  const match = NFC_PACK_OPTIONS.find((opt) => opt.toLowerCase() === cleaned);
  return match || '';
}

function normalizeLangParam(raw: string | null): Language | null {
  if (!raw) return null;
  const cleaned = raw.trim().toLowerCase();
  if (cleaned === 'en' || cleaned === 'hi' || cleaned === 'te') {
    return cleaned;
  }
  return null;
}

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.938-.125-.453-.141-1.031-.344-1.766-.656-3.094-1.344-5.109-4.469-5.266-4.672-.156-.203-1.266-1.688-1.266-3.219s.797-2.281 1.078-2.594c.281-.313.609-.391.813-.391.203 0 .406.016.578.016.188 0 .438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.016.547-.109.203-.156.344-.313.531-.156.188-.328.406-.469.547-.156.156-.313.328-.141.641.172.313.781 1.297 1.672 2.094 1.156 1.031 2.125 1.344 2.438 1.5.313.156.484.125.672-.078.188-.203.781-.906.984-1.219.203-.313.406-.266.688-.156.281.109 1.797.844 2.109 1 .313.156.516.234.594.359.078.125.078.734-.172 1.438z" />
    </svg>
  );
}

function GoogleGIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

function AutoFilledBadge({
  visible,
  label,
}: {
  visible: boolean;
  label: string;
}) {
  if (!visible) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 whitespace-nowrap shrink-0">
      <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

export default function App() {
  // Primary language defaults to English ('en')
  const [language, setLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[language];

  const [formData, setFormData] = useState<LeadFormState>({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: '',
  });

  const [autoFilledFields, setAutoFilledFields] = useState<
    Record<FieldKey, boolean>
  >({
    name: false,
    phone: false,
    email: false,
    address: false,
    service: false,
  });

  const [errorFields, setErrorFields] = useState<
    Partial<Record<FieldKey, boolean>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedState, setSubmittedState] = useState<{
    name: string;
    waUrl: string;
    sheetFailed: boolean;
  } | null>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const [showMobileStickyBar, setShowMobileStickyBar] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });

  const formContainerRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Sync <html lang="..."> when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Language preference + URLSearchParams + localStorage pre-fill on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const urlLang = normalizeLangParam(params.get('lang'));
    if (urlLang) {
      setLanguage(urlLang);
    } else {
      try {
        const savedLang = normalizeLangParam(
          localStorage.getItem(LOCAL_STORAGE_LANG_KEY)
        );
        if (savedLang) {
          setLanguage(savedLang);
        }
      } catch {
        // Default remains 'en'
      }
    }

    const urlName = params.get('name')?.trim() || '';
    const urlPhoneRaw =
      params.get('phone')?.trim() || params.get('mobile')?.trim() || '';
    const urlPhone = urlPhoneRaw ? sanitizeIndianMobile(urlPhoneRaw) : '';
    const urlEmail = params.get('email')?.trim() || '';
    const urlAddress =
      params.get('address')?.trim() || params.get('city')?.trim() || '';
    const urlService = normalizePackParam(
      params.get('service') || params.get('pack')
    );

    let storedProfile: Partial<LeadFormState> = {};
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
      if (raw) {
        storedProfile = JSON.parse(raw) as Partial<LeadFormState>;
      }
    } catch {
      // Ignore storage access errors
    }

    const nextName = urlName || (storedProfile.name ?? '');
    const nextPhone =
      urlPhone ||
      (storedProfile.phone ? sanitizeIndianMobile(storedProfile.phone) : '');
    const nextEmail = urlEmail || (storedProfile.email ?? '');
    const nextAddress = urlAddress || (storedProfile.address ?? '');
    const nextService =
      urlService || normalizePackParam(storedProfile.service ?? null);

    setFormData({
      name: nextName,
      phone: nextPhone,
      email: nextEmail,
      address: nextAddress,
      service: nextService,
    });

    setAutoFilledFields({
      name: Boolean(nextName),
      phone: Boolean(nextPhone),
      email: Boolean(nextEmail),
      address: Boolean(nextAddress),
      service: Boolean(nextService),
    });
  }, []);

  const handleLanguageChange = (nextLang: Language) => {
    setLanguage(nextLang);
    try {
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, nextLang);
    } catch {
      // Ignore storage failures
    }
  };

  // Show compact sticky bar on mobile only when the lead form scrolls out of view
  useEffect(() => {
    const target = formContainerRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleFieldChange = (field: FieldKey, rawValue: string) => {
    const value =
      field === 'phone' ? sanitizeIndianMobile(rawValue) : rawValue;

    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errorFields[field]) {
      setErrorFields((prev) => ({ ...prev, [field]: false }));
    }

    setAutoFilledFields((prev) => {
      if (!value.trim()) {
        return { ...prev, [field]: false };
      }
      const prevLen = formData[field].length;
      if (value.length - prevLen >= 3) {
        return { ...prev, [field]: true };
      }
      return prev;
    });
  };

  const handleBrowserAutofill = (
    field: FieldKey,
    e: React.AnimationEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.animationName === 'onAutoFillStart') {
      const targetValue = e.currentTarget.value;
      const sanitized =
        field === 'phone' ? sanitizeIndianMobile(targetValue) : targetValue;
      setFormData((prev) => ({ ...prev, [field]: sanitized }));
      if (sanitized.trim()) {
        setAutoFilledFields((prev) => ({ ...prev, [field]: true }));
      }
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone && !isValidIndianMobile(formData.phone)) {
      setErrorFields((prev) => ({ ...prev, phone: true }));
    }
  };

  const scrollToForm = (preselectPack?: NfcPackOption) => {
    if (preselectPack) {
      setFormData((prev) => ({ ...prev, service: preselectPack }));
      setSubmittedState(null);
      setErrorFields((prev) => ({ ...prev, service: false }));
    }

    formContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    window.setTimeout(() => {
      if (!formData.name) {
        nameInputRef.current?.focus({ preventScroll: true });
      }
    }, 350);
  };

  const validateForm = (): boolean => {
    const nextErrors: Partial<Record<FieldKey, boolean>> = {};

    if (!formData.name.trim()) {
      nextErrors.name = true;
    }

    if (!isValidIndianMobile(formData.phone)) {
      nextErrors.phone = true;
    }

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      nextErrors.email = true;
    }

    if (!formData.service.trim()) {
      nextErrors.service = true;
    }

    setErrorFields(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload: LeadPayload = {
      timestamp: new Date().toISOString(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      service: formData.service.trim(),
      source: 'Landing Page',
    };

    // Backup lead & user profile in localStorage immediately
    try {
      localStorage.setItem(
        LOCAL_STORAGE_PROFILE_KEY,
        JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          address: payload.address,
          service: payload.service,
        })
      );

      const existingRaw = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
      const existing: LeadPayload[] = existingRaw
        ? (JSON.parse(existingRaw) as LeadPayload[])
        : [];
      localStorage.setItem(
        LOCAL_STORAGE_LEADS_KEY,
        JSON.stringify([payload, ...existing].slice(0, 20))
      );
    } catch {
      // Ignore storage failures
    }

    const waMessage = `New NFC Card Pre-Order! Name: ${payload.name}, Phone: ${payload.phone}, Email: ${payload.email}, Address: ${payload.address || 'Not provided'}, Pack: ${payload.service}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      waMessage
    )}`;

    let sheetFailed = false;

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        sheetFailed = true;
      }
    } catch {
      sheetFailed = true;
    }

    setIsSubmitting(false);
    setSubmittedState({
      name: payload.name,
      waUrl,
      sheetFailed,
    });

    // Open WhatsApp to 917507593944 in new tab after Google Sheet attempt
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback button is rendered on the Thank You screen
    }
  };

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t.directWhatsappPrefill
  )}`;

  const activeGalleryItem = t.gallery[activeGalleryIndex];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col">
      {/* Top Bar Contract: 3 zones (Brand wordmark | 4 nav links | 1 primary CTA) */}
      <header className="md:sticky md:top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#"
            className="font-display text-xl font-bold tracking-tight text-[#0A0A0A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA6]"
          >
            digitaldotads
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600"
          >
            <a
              href="#how-it-works"
              className="hover:text-[#0A0A0A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#product-quality"
              className="hover:text-[#0A0A0A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.quality}
            </a>
            <a
              href="#testimonials"
              className="hover:text-[#0A0A0A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.reviews}
            </a>
            <a
              href="#faq"
              className="hover:text-[#0A0A0A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.faq}
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToForm()}
              className="px-4 py-2 min-h-[40px] text-sm font-semibold rounded-lg bg-[#00BFA6] text-[#052924] hover:bg-[#00a892] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-6 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 border-b border-neutral-200">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Language Switcher Bar (English primary + Hindi & Telugu) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-neutral-200">
              <p className="text-sm font-medium text-[#008F7A]">
                {t.hero.kicker}
              </p>

              <div
                role="group"
                aria-label="Language Selector"
                className="inline-flex items-center gap-1 p-1 rounded-lg bg-neutral-100 border border-neutral-200 shrink-0"
              >
                <span className="px-2 text-neutral-500 flex items-center">
                  <Languages className="w-4 h-4" aria-hidden="true" />
                </span>
                {LANGUAGE_OPTIONS.map((option) => {
                  const isActive = language === option.code;
                  return (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => handleLanguageChange(option.code)}
                      aria-pressed={isActive}
                      className={`px-3 py-1.5 min-h-[34px] text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA6] ${
                        isActive
                          ? 'bg-white text-[#0A0A0A] shadow-sm'
                          : 'text-neutral-600 hover:text-[#0A0A0A]'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Offer, Trust Proof & Amazon-Style Gallery */}
              <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6">
                <div className="space-y-4">
                  <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight leading-[1.08] text-[#0A0A0A] text-balance">
                    {t.hero.headline}
                  </h1>
                  <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-[56ch]">
                    {t.hero.subheadlineLead}{' '}
                    <strong className="font-semibold text-[#0A0A0A]">
                      {t.hero.subheadlineHighlight}
                    </strong>{' '}
                    {t.hero.subheadlineTail}
                  </p>
                </div>

                {/* Unboxed Trust Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-5 border-y border-neutral-200">
                  <div className="flex items-start gap-3">
                    <Star
                      className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-display text-base font-bold text-[#0A0A0A] tabular-nums">
                        {t.hero.trust.ratingTitle}
                      </p>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        {t.hero.trust.ratingSub}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Store
                      className="w-5 h-5 text-[#008F7A] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-display text-base font-bold text-[#0A0A0A] tabular-nums">
                        {t.hero.trust.clientsTitle}
                      </p>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        {t.hero.trust.clientsSub}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock
                      className="w-5 h-5 text-[#0A0A0A] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-display text-base font-bold text-[#0A0A0A]">
                        {t.hero.trust.consultTitle}
                      </p>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        {t.hero.trust.consultSub}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amazon-Style Large Product Gallery with Hover Zoom, Prev/Next & Small Thumbnails Below */}
                <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
                  <div
                    onMouseEnter={() => {
                      if (!failedImages[activeGalleryItem.id]) {
                        setIsZooming(true);
                      }
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = Math.max(
                        0,
                        Math.min(
                          100,
                          ((e.clientX - rect.left) / rect.width) * 100
                        )
                      );
                      const y = Math.max(
                        0,
                        Math.min(
                          100,
                          ((e.clientY - rect.top) / rect.height) * 100
                        )
                      );
                      setZoomOrigin({ x, y });
                    }}
                    onMouseLeave={() => setIsZooming(false)}
                    className="relative bg-[#F5F5F5] flex items-center justify-center h-[330px] sm:h-[460px] lg:h-[500px] w-full overflow-hidden cursor-zoom-in"
                  >
                    {failedImages[activeGalleryItem.id] ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-default">
                        <QrCode className="w-12 h-12 text-[#008F7A] mb-2" />
                        <p className="font-display text-base font-bold text-[#0A0A0A]">
                          {activeGalleryItem.title}
                        </p>
                        <p className="text-xs text-neutral-600 mt-1">
                          Google Review · WhatsApp · Instagram
                        </p>
                      </div>
                    ) : (
                      <img
                        src={activeGalleryItem.image}
                        alt={activeGalleryItem.alt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [activeGalleryItem.id]: true,
                          }))
                        }
                        style={{
                          transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                          transform: isZooming ? 'scale(2.15)' : 'scale(1)',
                        }}
                        className="w-full h-full object-contain p-2 sm:p-4 select-none transition-transform duration-150 ease-out will-change-transform"
                      />
                    )}

                    {/* Prev Button */}
                    <button
                      type="button"
                      aria-label={t.hero.prevImageAria}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setIsZooming(false);
                      }}
                      onMouseMove={(e) => e.stopPropagation()}
                      onClick={() =>
                        setActiveGalleryIndex((prev) =>
                          prev === 0 ? t.gallery.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 hover:bg-white border border-neutral-300 hover:border-[#00BFA6] shadow-sm flex items-center justify-center text-[#0A0A0A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA6]"
                    >
                      <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    </button>

                    {/* Next Button */}
                    <button
                      type="button"
                      aria-label={t.hero.nextImageAria}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setIsZooming(false);
                      }}
                      onMouseMove={(e) => e.stopPropagation()}
                      onClick={() =>
                        setActiveGalleryIndex((prev) =>
                          prev === t.gallery.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 hover:bg-white border border-neutral-300 hover:border-[#00BFA6] shadow-sm flex items-center justify-center text-[#0A0A0A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA6]"
                    >
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Small Amazon-Style Thumbnail Strip Below Main Image */}
                  <div className="px-4 py-3.5 bg-white border-t border-neutral-200 flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                      {t.gallery.map((view, idx) => {
                        const isActive = activeGalleryIndex === idx;
                        return (
                          <button
                            key={view.id}
                            type="button"
                            onClick={() => setActiveGalleryIndex(idx)}
                            aria-label={view.title}
                            aria-pressed={isActive}
                            className="group flex flex-col items-center gap-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA6]"
                          >
                            <div
                              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-[#F5F5F5] border-2 transition-colors ${
                                isActive
                                  ? 'border-[#00BFA6]'
                                  : 'border-neutral-200 group-hover:border-neutral-400'
                              }`}
                            >
                              <img
                                src={view.image}
                                alt={view.label}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain p-0.5"
                              />
                            </div>
                            <span
                              className={`text-[11px] font-medium whitespace-nowrap ${
                                isActive
                                  ? 'text-[#052924] font-semibold'
                                  : 'text-neutral-500'
                              }`}
                            >
                              {view.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Image Title, Counter & Quick Links */}
                    <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-display text-sm font-bold text-[#0A0A0A]">
                          {activeGalleryItem.title}{' '}
                          <span className="text-xs font-medium text-neutral-500 tabular-nums ml-1.5">
                            ({activeGalleryIndex + 1}/{t.gallery.length})
                          </span>
                        </p>
                        <p className="text-xs text-neutral-600 mt-0.5">
                          {activeGalleryItem.caption}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-medium text-neutral-700 shrink-0 pt-1 sm:pt-0">
                        <span className="hidden lg:inline-flex items-center gap-1 text-neutral-500">
                          <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.hero.hoverToZoom}</span>
                        </span>
                        <span className="hidden lg:inline" aria-hidden="true">
                          ·
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GoogleGIcon className="w-3.5 h-3.5" />
                          <span>{t.hero.quickTags.review}</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <WhatsAppIcon className="w-3.5 h-3.5 text-[#128C7E]" />
                          <span>{t.hero.quickTags.whatsapp}</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Instagram
                            className="w-3.5 h-3.5 text-[#E1306C]"
                            aria-hidden="true"
                          />
                          <span>{t.hero.quickTags.instagram}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: NFC Card Pre-Order Form (Sticky on Desktop) */}
              <div
                id="lead-form"
                ref={formContainerRef}
                className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-24"
              >
                <div className="rounded-xl border border-neutral-200 bg-white shadow-[0_8px_30px_rgba(10,10,10,0.06)] p-5 sm:p-7">
                  {submittedState ? (
                    /* THANK YOU SCREEN */
                    <div className="py-4 text-center space-y-5">
                      <div className="w-14 h-14 mx-auto rounded-full bg-[#00BFA6]/15 flex items-center justify-center">
                        <CheckCircle2
                          className="w-8 h-8 text-[#008F7A]"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="space-y-2">
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0A0A] text-balance">
                          {t.form.thankYouHeadline(submittedState.name)}
                        </h2>
                        <p className="text-sm text-neutral-600">
                          {t.form.thankYouBody}
                        </p>
                        {submittedState.sheetFailed && (
                          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-2">
                            <span>{t.form.sheetFallbackNote}</span>
                          </p>
                        )}
                      </div>

                      <div className="pt-2 space-y-3">
                        <a
                          href={submittedState.waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full min-h-[52px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#00BFA6] hover:bg-[#00a892] text-[#052924] font-display font-bold text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
                        >
                          <WhatsAppIcon className="w-5 h-5" />
                          <span>{t.form.chatOnWhatsApp}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setSubmittedState(null)}
                          className="text-xs font-medium text-neutral-500 hover:text-[#0A0A0A] underline underline-offset-4 cursor-pointer py-1"
                        >
                          {t.form.submitAnother}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* PRE-ORDER FORM */
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-4"
                      aria-label={t.form.title}
                    >
                      <div className="pb-3 border-b border-neutral-200 flex items-center justify-between gap-4">
                        <div>
                          <h2 className="font-display text-lg sm:text-xl font-bold text-[#0A0A0A]">
                            {t.form.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                            {t.form.subtitle}
                          </p>
                        </div>
                        <PhoneCall
                          className="w-5 h-5 text-[#008F7A] shrink-0"
                          aria-hidden="true"
                        />
                      </div>

                      {/* 1. Full Name */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <label
                            htmlFor="lead-name"
                            className="text-sm font-medium text-[#0A0A0A]"
                          >
                            {t.form.nameLabel}{' '}
                            <span className="text-red-600">*</span>
                          </label>
                          <AutoFilledBadge
                            visible={autoFilledFields.name}
                            label={t.form.autoFilled}
                          />
                        </div>
                        <input
                          ref={nameInputRef}
                          id="lead-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder={t.form.namePlaceholder}
                          value={formData.name}
                          onChange={(e) =>
                            handleFieldChange('name', e.target.value)
                          }
                          onAnimationStart={(e) =>
                            handleBrowserAutofill('name', e)
                          }
                          aria-invalid={Boolean(errorFields.name)}
                          className={`w-full min-h-[46px] px-3.5 py-2.5 text-base bg-white text-[#0A0A0A] placeholder:text-neutral-400 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                            errorFields.name
                              ? 'border-red-500 focus:ring-red-200'
                              : 'border-neutral-300 focus:border-[#00BFA6] focus:ring-[#00BFA6]/25'
                          }`}
                        />
                        {errorFields.name && (
                          <p
                            role="alert"
                            className="text-xs font-medium text-red-600 mt-1"
                          >
                            {t.form.nameError}
                          </p>
                        )}
                      </div>

                      {/* 2. Mobile Number */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <label
                            htmlFor="lead-phone"
                            className="text-sm font-medium text-[#0A0A0A]"
                          >
                            {t.form.phoneLabel}{' '}
                            <span className="text-red-600">*</span>
                          </label>
                          <AutoFilledBadge
                            visible={autoFilledFields.phone}
                            label={t.form.autoFilled}
                          />
                        </div>
                        <div className="relative">
                          <span
                            aria-hidden="true"
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-500 select-none tabular-nums"
                          >
                            +91
                          </span>
                          <input
                            id="lead-phone"
                            name="tel"
                            type="tel"
                            inputMode="numeric"
                            required
                            autoComplete="tel"
                            maxLength={14}
                            placeholder={t.form.phonePlaceholder}
                            value={formData.phone}
                            onChange={(e) =>
                              handleFieldChange('phone', e.target.value)
                            }
                            onBlur={handlePhoneBlur}
                            onAnimationStart={(e) =>
                              handleBrowserAutofill('phone', e)
                            }
                            aria-invalid={Boolean(errorFields.phone)}
                            className={`w-full min-h-[46px] pl-12 pr-3.5 py-2.5 text-base tabular-nums bg-white text-[#0A0A0A] placeholder:text-neutral-400 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                              errorFields.phone
                                ? 'border-red-500 focus:ring-red-200'
                                : 'border-neutral-300 focus:border-[#00BFA6] focus:ring-[#00BFA6]/25'
                            }`}
                          />
                        </div>
                        {errorFields.phone && (
                          <p
                            role="alert"
                            className="text-xs font-medium text-red-600 mt-1"
                          >
                            {t.form.phoneError}
                          </p>
                        )}
                      </div>

                      {/* 3. Email ID */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <label
                            htmlFor="lead-email"
                            className="text-sm font-medium text-[#0A0A0A]"
                          >
                            {t.form.emailLabel}{' '}
                            <span className="text-red-600">*</span>
                          </label>
                          <AutoFilledBadge
                            visible={autoFilledFields.email}
                            label={t.form.autoFilled}
                          />
                        </div>
                        <input
                          id="lead-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder={t.form.emailPlaceholder}
                          value={formData.email}
                          onChange={(e) =>
                            handleFieldChange('email', e.target.value)
                          }
                          onAnimationStart={(e) =>
                            handleBrowserAutofill('email', e)
                          }
                          aria-invalid={Boolean(errorFields.email)}
                          className={`w-full min-h-[46px] px-3.5 py-2.5 text-base bg-white text-[#0A0A0A] placeholder:text-neutral-400 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                            errorFields.email
                              ? 'border-red-500 focus:ring-red-200'
                              : 'border-neutral-300 focus:border-[#00BFA6] focus:ring-[#00BFA6]/25'
                          }`}
                        />
                        {errorFields.email && (
                          <p
                            role="alert"
                            className="text-xs font-medium text-red-600 mt-1"
                          >
                            {t.form.emailError}
                          </p>
                        )}
                      </div>

                      {/* 4. Address / City (Optional) */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <label
                            htmlFor="lead-address"
                            className="text-sm font-medium text-[#0A0A0A]"
                          >
                            {t.form.addressLabel}{' '}
                            <span className="text-xs font-normal text-neutral-500">
                              {t.form.optionalTag}
                            </span>
                          </label>
                          <AutoFilledBadge
                            visible={autoFilledFields.address}
                            label={t.form.autoFilled}
                          />
                        </div>
                        <textarea
                          id="lead-address"
                          name="street-address"
                          rows={2}
                          autoComplete="street-address"
                          placeholder={t.form.addressPlaceholder}
                          value={formData.address}
                          onChange={(e) =>
                            handleFieldChange('address', e.target.value)
                          }
                          onAnimationStart={(e) =>
                            handleBrowserAutofill('address', e)
                          }
                          className="w-full px-3.5 py-2.5 text-base bg-white text-[#0A0A0A] placeholder:text-neutral-400 rounded-lg border border-neutral-300 transition-colors focus:outline-none focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA6]/25 resize-y"
                        />
                      </div>

                      {/* 5. Select NFC Card Pack (with Black & Blue Product Picker) */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <label
                            htmlFor="lead-service"
                            className="text-sm font-medium text-[#0A0A0A]"
                          >
                            {t.form.packLabel}{' '}
                            <span className="text-red-600">*</span>
                          </label>
                          <AutoFilledBadge
                            visible={autoFilledFields.service}
                            label={t.form.autoFilled}
                          />
                        </div>

                        {/* Two Product Color Quick-Select (Blue & Black) */}
                        <div
                          className="grid grid-cols-2 gap-2.5 mb-2.5"
                          role="group"
                          aria-label={t.form.packLabel}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              handleFieldChange(
                                'service',
                                '1 NFC + QR Card — Classic Blue'
                              );
                              setActiveGalleryIndex(0);
                            }}
                            aria-pressed={
                              formData.service ===
                              '1 NFC + QR Card — Classic Blue'
                            }
                            className={`flex items-center gap-2.5 p-2 rounded-lg border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA6] ${
                              formData.service ===
                              '1 NFC + QR Card — Classic Blue'
                                ? 'border-[#00BFA6] bg-[#00BFA6]/10'
                                : 'border-neutral-300 bg-white hover:border-neutral-400'
                            }`}
                          >
                            <img
                              src="/assets/aistudio/nfc_card_ae3b1c4a.jpeg"
                              alt={t.form.colorBlueTitle}
                              referrerPolicy="no-referrer"
                              className="w-9 h-9 rounded object-contain bg-[#F5F5F5] border border-neutral-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="block text-xs font-bold text-[#0A0A0A] truncate">
                                {t.form.colorBlueTitle}
                              </span>
                              <span className="block text-[11px] text-neutral-500 truncate">
                                {t.form.colorBlueSub}
                              </span>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              handleFieldChange(
                                'service',
                                '1 NFC + QR Card — Matte Black'
                              );
                              setActiveGalleryIndex(1);
                            }}
                            aria-pressed={
                              formData.service ===
                              '1 NFC + QR Card — Matte Black'
                            }
                            className={`flex items-center gap-2.5 p-2 rounded-lg border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA6] ${
                              formData.service ===
                              '1 NFC + QR Card — Matte Black'
                                ? 'border-[#00BFA6] bg-[#00BFA6]/10'
                                : 'border-neutral-300 bg-white hover:border-neutral-400'
                            }`}
                          >
                            <img
                              src="/assets/aistudio/nfc_black_9aade8af.jpeg"
                              alt={t.form.colorBlackTitle}
                              referrerPolicy="no-referrer"
                              className="w-9 h-9 rounded object-contain bg-[#F5F5F5] border border-neutral-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="block text-xs font-bold text-[#0A0A0A] truncate">
                                {t.form.colorBlackTitle}
                              </span>
                              <span className="block text-[11px] text-neutral-500 truncate">
                                {t.form.colorBlackSub}
                              </span>
                            </div>
                          </button>
                        </div>

                        <div className="relative">
                          <select
                            id="lead-service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={(e) => {
                              const nextVal = e.target.value;
                              handleFieldChange('service', nextVal);
                              if (nextVal.includes('Classic Blue')) {
                                setActiveGalleryIndex(0);
                              } else if (nextVal.includes('Matte Black')) {
                                setActiveGalleryIndex(1);
                              }
                            }}
                            aria-invalid={Boolean(errorFields.service)}
                            className={`w-full min-h-[46px] px-3.5 pr-10 py-2.5 text-base bg-white rounded-lg border appearance-none transition-colors focus:outline-none focus:ring-2 ${
                              formData.service
                                ? 'text-[#0A0A0A]'
                                : 'text-neutral-500'
                            } ${
                              errorFields.service
                                ? 'border-red-500 focus:ring-red-200'
                                : 'border-neutral-300 focus:border-[#00BFA6] focus:ring-[#00BFA6]/25'
                            }`}
                          >
                            <option value="" disabled>
                              {t.form.packPlaceholder}
                            </option>
                            {NFC_PACK_OPTIONS.map((pack) => (
                              <option key={pack} value={pack}>
                                {t.form.packLabels[pack]}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            className="w-4 h-4 text-neutral-500 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                            aria-hidden="true"
                          />
                        </div>
                        {errorFields.service && (
                          <p
                            role="alert"
                            className="text-xs font-medium text-red-600 mt-1"
                          >
                            {t.form.packError}
                          </p>
                        )}
                      </div>

                      {/* 6. Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full min-h-[54px] px-6 py-3.5 rounded-lg bg-[#00BFA6] hover:bg-[#00a892] disabled:opacity-75 disabled:cursor-not-allowed text-[#052924] font-display font-bold text-base sm:text-lg transition-colors cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
                      >
                        <span>
                          {isSubmitting
                            ? t.form.submitLoading
                            : t.form.submitIdle}
                        </span>
                        {!isSubmitting && (
                          <ArrowRight className="w-5 h-5" aria-hidden="true" />
                        )}
                      </button>

                      <p className="text-xs text-neutral-500 text-center flex items-center justify-center gap-1.5 pt-1">
                        <ShieldCheck
                          className="w-4 h-4 text-[#008F7A] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{t.form.privacyNote}</span>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: HOW IT WORKS — TAP OR SCAN TO OPEN ALL 3 BUSINESS LINKS */}
        <section
          id="how-it-works"
          className="py-14 sm:py-20 border-b border-neutral-200 bg-neutral-50"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div className="max-w-2xl space-y-2">
                <p className="text-sm font-medium text-[#008F7A]">
                  {t.howItWorks.eyebrow}
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A] text-balance">
                  {t.howItWorks.heading}
                </h2>
              </div>
              <div className="flex items-center gap-4 text-xs sm:text-sm font-medium text-neutral-700 shrink-0">
                <span className="inline-flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#008F7A]" />
                  <span>{t.howItWorks.nfcChip}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#008F7A]" />
                  <span>{t.howItWorks.qrChip}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.howItWorks.items.map((feature) => (
                <div
                  key={feature.id}
                  className="rounded-xl border border-neutral-200 bg-white p-6 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-11 h-11 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                        {feature.iconType === 'google' && (
                          <GoogleGIcon className="w-6 h-6" />
                        )}
                        {feature.iconType === 'whatsapp' && (
                          <WhatsAppIcon className="w-6 h-6 text-[#128C7E]" />
                        )}
                        {feature.iconType === 'instagram' && (
                          <Instagram
                            className="w-6 h-6 text-[#E1306C]"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <span className="text-xs font-medium text-neutral-500">
                        {feature.subtitle}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#0A0A0A]">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      {feature.detail}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollToForm('1 NFC + QR Card — Classic Blue')}
                    className="self-start text-sm font-semibold text-[#008F7A] hover:text-[#052924] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{t.howItWorks.ctaLink}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2B: BUILD QUALITY, THICKNESS & COLOR EDITIONS */}
        <section
          id="product-quality"
          className="py-14 sm:py-20 border-b border-neutral-200 bg-white"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div className="max-w-2xl space-y-2">
                <p className="text-sm font-medium text-[#008F7A]">
                  {t.qualitySection.eyebrow}
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A] text-balance">
                  {t.qualitySection.heading}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => scrollToForm()}
                className="self-start md:self-auto text-sm font-semibold text-[#0A0A0A] hover:text-[#008F7A] inline-flex items-center gap-1.5 underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{t.qualitySection.ctaLink}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.gallery.map((item, idx) => (
                <article
                  key={item.id}
                  className="rounded-xl overflow-hidden border border-neutral-200 bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square w-full overflow-hidden bg-[#F5F5F5] border-b border-neutral-200">
                      {failedImages[item.id] ? (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                          <QrCode className="w-8 h-8 text-[#008F7A] mb-2" />
                          <span className="font-display text-sm font-semibold text-[#0A0A0A]">
                            {item.title}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.alt}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={() =>
                            setFailedImages((prev) => ({
                              ...prev,
                              [item.id]: true,
                            }))
                          }
                          className="w-full h-full object-contain p-2"
                        />
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      <p className="text-xs font-medium text-[#008F7A]">
                        {item.badge}
                      </p>
                      <h3 className="font-display text-lg font-bold text-[#0A0A0A]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveGalleryIndex(idx);
                        if (item.id === 'blue-front') {
                          scrollToForm('1 NFC + QR Card — Classic Blue');
                        } else if (item.id === 'black-front') {
                          scrollToForm('1 NFC + QR Card — Matte Black');
                        } else {
                          scrollToForm();
                        }
                      }}
                      className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-neutral-300 hover:border-[#00BFA6] hover:bg-[#00BFA6]/10 text-xs font-semibold text-[#0A0A0A] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {t.qualitySection.cardCta}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: WHY SHOP OWNERS CHOOSE US */}
        <section
          id="why-us"
          className="py-14 sm:py-20 border-b border-neutral-200 bg-white"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 space-y-4">
                <p className="text-sm font-medium text-[#008F7A]">
                  {t.whyUs.eyebrow}
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A] text-balance">
                  {t.whyUs.heading}
                </h2>
                <p className="text-base text-neutral-600 leading-relaxed">
                  {t.whyUs.body}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToForm()}
                    className="px-5 py-3 min-h-[46px] rounded-lg bg-[#00BFA6] hover:bg-[#00a892] text-[#052924] font-display font-bold text-sm inline-flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>{t.whyUs.cta}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 divide-y divide-neutral-200 border-y border-neutral-200">
                {t.whyUs.points.map((point) => (
                  <div
                    key={point.number}
                    className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6"
                  >
                    <span className="font-display text-lg font-bold text-[#008F7A] tabular-nums shrink-0">
                      {point.number}
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#0A0A0A]">
                          {point.title}
                        </h3>
                        <span className="text-xs font-medium text-neutral-500 tabular-nums">
                          {point.metric}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: TESTIMONIALS */}
        <section
          id="testimonials"
          className="py-14 sm:py-20 border-b border-neutral-200 bg-neutral-50"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-2 mb-10">
              <p className="text-sm font-medium text-[#008F7A]">
                {t.testimonials.eyebrow}
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A] text-balance">
                {t.testimonials.heading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.testimonials.items.map((review) => (
                <blockquote
                  key={review.name}
                  className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div
                      className="flex items-center gap-1"
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 text-amber-500 fill-amber-500"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="text-base text-neutral-800 leading-relaxed">
                      "{review.quote}"
                    </p>
                  </div>

                  <footer className="pt-4 border-t border-neutral-200 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="font-display text-base font-bold text-[#0A0A0A]">
                        {review.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {review.context}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[#008F7A] tabular-nums">
                      {review.outcome}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: FAQ */}
        <section id="faq" className="py-14 sm:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 space-y-3">
                <p className="text-sm font-medium text-[#008F7A]">
                  {t.faq.eyebrow}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A] text-balance">
                  {t.faq.heading}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600">
                  {t.faq.body}
                </p>
              </div>

              <div className="lg:col-span-8 divide-y divide-neutral-200 border-y border-neutral-200">
                {t.faq.items.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={faq.question} className="py-5">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                        className="w-full flex items-center justify-between gap-4 text-left py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFA6]"
                      >
                        <span className="font-display text-base sm:text-lg font-semibold text-[#0A0A0A]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-3 pr-8">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="border-t border-neutral-200 bg-neutral-50 py-8 pb-24 sm:pb-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-neutral-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-display font-bold text-[#0A0A0A]">
              digitaldotads
            </span>
            <span aria-hidden="true">·</span>
            <span>{t.footer.tagline}</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm">
            <a href="#how-it-works" className="hover:text-[#0A0A0A]">
              {t.nav.howItWorks}
            </a>
            <a href="#product-quality" className="hover:text-[#0A0A0A]">
              {t.nav.quality}
            </a>
            <a href="#faq" className="hover:text-[#0A0A0A]">
              {t.nav.faq}
            </a>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#008F7A] hover:underline"
            >
              {t.footer.whatsappSupport}
            </a>
          </div>
        </div>
      </footer>

      {/* MOBILE COMPACT STICKY CTA BAR */}
      {showMobileStickyBar && !submittedState && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-sm border-t border-neutral-200 px-4 py-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-sm font-bold text-[#0A0A0A] truncate">
              {t.mobileSticky.title}
            </p>
            <p className="text-xs text-neutral-500 truncate">
              {t.mobileSticky.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToForm()}
            className="px-4 py-2 min-h-[40px] rounded-lg bg-[#00BFA6] hover:bg-[#00a892] text-[#052924] font-display font-bold text-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.mobileSticky.cta}
          </button>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON AT BOTTOM RIGHT */}
      <a
        href={submittedState ? submittedState.waUrl : directWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.floatingWhatsappLabel}
        className={`fixed right-4 sm:right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3 min-h-[48px] rounded-full bg-[#128C7E] hover:bg-[#0F766A] text-white font-display font-semibold text-sm shadow-[0_6px_20px_rgba(18,140,126,0.35)] transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A] ${
          showMobileStickyBar && !submittedState
            ? 'bottom-16 lg:bottom-6'
            : 'bottom-5 sm:bottom-6'
        }`}
      >
        <WhatsAppIcon className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">
          {t.floatingWhatsappLabel}
        </span>
      </a>
    </div>
  );
}
