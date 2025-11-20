import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'am' | 'om' | 'ti' | 'so' | 'aa' | 'gur'
const FALLBACK_LANGUAGE: Language = 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translate: (key: string, fallback: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Translation keys and their values
const translations = {
  en: {
    // Navigation & Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.feedback': 'Feedback',
    'nav.dashboard': 'Dashboard',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    'nav.citizen_signin': 'Sign In',
    'nav.government_signin': 'Sign In',
    'nav.back_to_home': 'Back',
    'nav.faq': 'FAQ',
    'nav.logout': 'Sign out',
    'nav.profile': 'View Profile',
    'nav.settings': 'Settings',
    'nav.help': 'Help & Support',
    'nav.user_placeholder': 'User',
    'nav.open_menu': 'Open menu',
    
    // Landing Page
    'landing.title': ' CivicVoice',
    'landing.subtitle': 'Et',
    'landing.hero.title': 'CivicVoice Et',
    'landing.hero.description': 'Your comprehensive government analytics platform that transforms complex civic data into actionable insights. Empower yourself with real-time government transparency, policy tracking, and citizen engagement tools designed for the modern democracy.',
    'landing.hero.cta': 'Explore Platform',
    'landing.hero.watch_demo': 'Watch Demo',
    'landing.hero.badge': 'Civic Innovation',
    'landing.hero.image_alt': 'Person using CivicVoice Et on mobile',
    'landing.stats.citizens': '10K+ Citizens',
    'landing.stats.satisfaction': '98% Satisfaction',
    'landing.features.title': 'CivicVoice  MAIN FEATURES',
    'landing.features.subtitle': 'Why Choose CivicVoice Et?',
    'landing.features.secure.title': 'Secure & Anonymous',
    'landing.features.secure.description': 'Bank-level security with complete transparency in government data access and usage tracking.',
    'landing.features.analytics.title': 'Real-time Analytics',
    'landing.features.analytics.description': 'Live government data visualization with instant updates on policies, budgets, and public initiatives.',
    'landing.features.community.title': 'Community Impact',
    'landing.features.community.description': 'Track how your feedback contributes to community improvements',
    'landing.features.coverage.title': 'Multi Sector Coverage',
    'landing.features.coverage.description': 'Submit feedback across education health, infrastructure and more',
    'landing.features.monitoring.title': '24/7 Monitoring',
    'landing.features.monitoring.description': 'Use Jambo for analyzing user feedback & valuable insights',
    'landing.features.interface.title': 'User-Friendly Interface',
    'landing.features.interface.description': 'Use Jambo for analyze and engage with user feedback & valuable insights.',
    'landing.cta.subtitle': 'Free to join • No credit card required • Instant access',
    'landing.cta.title': 'Ready to Get Started?',
    'landing.cta.description': 'Join thousands of citizens who are already using CivicVoice Et to stay informed and engaged with their government. Create your free account today and start exploring government data like never before.',
    'landing.cta.button': ' Signup',
    'landing.cta.learn_more': 'Learn More',
    
    // Footer
    'footer.services': 'Services',
    'footer.government_services': 'Government Services',
    'footer.submit_feedback': 'Submit Feedback',
    'footer.public_reports': 'Public Reports',
    'footer.issue_tracking': 'Issue Tracking',
    'footer.platform': 'Platform',
    'footer.citizen_dashboard': 'Dashboard',
    'footer.data_analytics': 'Data Analytics',
    'footer.reporting_tools': 'Reporting Tools',
    'footer.government_portal': 'Portal',
    'footer.resources': 'Resources',
    'footer.how_it_works': 'How It Works',
    'footer.documentation': 'Documentation',
    'footer.faqs': 'FAQs',
    'footer.help_center': 'Help Center',
    'footer.about': 'About',
    'footer.our_mission': 'Our Mission',
    'footer.contact_us': 'Contact Us',
    'footer.community': 'Community',
    'footer.government_login': 'Login',
    'footer.stay_informed': 'Stay Informed',
    'footer.email_address': 'Email address',
    'footer.email_placeholder': 'citizen@example.com',
    'footer.newsletter_agreement': 'I agree to receive updates about government initiatives and',
    'footer.terms_of_service': 'Terms of Service',
    'footer.subscribe': 'Subscribe',
    'footer.civic_movement': 'Join the civic engagement movement',
    'footer.help_shape': 'Help shape better government services for everyone',
    'footer.empowering_citizens': 'Empowering Citizens • Improving Government',
    'footer.terms_conditions': 'Terms & Conditions',
    'footer.privacy_policy': 'Privacy Policy',
    'footer.data_usage_policy': 'Data Usage Policy',
    'footer.copyright': 'CivicVoice Et. All Rights Reserved',
    
    // Login Page
    'login.welcome_back': 'Welcome Back',
    'login.email': 'Email',
    'login.email_placeholder': 'you@example.com',
    'login.password': 'Password',
    'login.password_placeholder': '••••••••',
    'login.forgot_password': 'Forgot Password?',
    'login.sign_in': 'Sign In',
    'login.signing_in': 'Signing in...',
    'login.no_account': "Don't have an account?",
    'login.register': 'Register.',
    'login.remember_me': 'Remember me',
    'login.validation_error_title': 'Validation Error',
    'login.validation_error_desc': 'Please check your input and try again.',
    'login.login_failed_title': 'Login Failed',
    'login.login_failed_desc': 'Please verify your email and password.',
    'login.success_title': 'Welcome back!',
    'login.success_desc': 'Logged in as {email}',
    'login.enter_credentials': 'Enter your credentials to access your account',
    'login.demo_credentials_title': 'Demo Credentials:',
    'login.demo_admin': 'Admin: admin@civicvoice.et / admin123',
    'login.demo_user': 'User: demo@civicvoice.et / demo123',
    
    // Signup Page
    'signup.hero.title': 'Create Account',
    'signup.hero.subtitle': 'Join thousands of engaged citizens',
    'signup.full_name': 'Full Name',
    'signup.full_name_placeholder': 'Your name',
    'signup.confirm_password': 'Confirm Password',
    'signup.terms_prefix': 'I accept the ',
    'signup.terms_and': ' and ',
    'signup.terms_conditions': 'terms and conditions',
    'signup.privacy_policy': 'privacy policy',
    'signup.create_account': 'Create Account',
    'signup.creating_account': 'Creating account...',
    'signup.verification_title': 'Check your email!',
    'signup.verification_desc': "We've sent a 6-digit verification code to {email}",
    'signup.enter_code': 'Enter Verification Code',
    'signup.resend_prefix': "Didn't receive the code? Check your spam folder or",
    'signup.resend_action': 'resend code',
    'signup.verify_button': 'Verify & Continue',
    'signup.verifying': 'Verifying...',
    'signup.error.required_fields': 'Please fill all required fields.',
    'signup.error.password_mismatch': 'Passwords do not match.',
    'signup.error.accept_terms': 'Please accept the terms and conditions.',
    'signup.error.enter_otp': 'Enter the 6-digit OTP sent to your email.',
    'signup.validation_error_title': 'Validation Error',
    'signup.validation_error_desc': 'Please check your input and try again.',
    'signup.success_title': 'Check your email!',
    'signup.success_desc': 'We have sent a verification code to your inbox.',
    'signup.registration_failed_title': 'Registration Failed',
    'signup.registration_failed_desc': 'An error occurred during registration.',
    'signup.verification_failed_title': 'Verification Failed',
    'signup.verification_failed_desc': 'An error occurred during verification.',
    'signup.invalid_otp_title': 'Invalid OTP',
    'signup.invalid_otp_desc': 'Please enter a valid 6-digit code.',
    
    // Admin Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome to CivicVoice Et Admin Dashboard',
    'dashboard.loading': 'Loading dashboard...',
    'dashboard.export_data': 'Export Data',
    'dashboard.settings': 'Settings',
    'dashboard.search_feedback': 'Search Feedback',
    'dashboard.citizens': 'Citizens',
    'dashboard.feedback_management': 'Feedback Management',
    'dashboard.analytics': 'Analytics',
    'dashboard.total_feedback': 'Total Feedback',
    'dashboard.pending_review': 'Pending Review',
    'dashboard.avg_response_time': 'Avg Response Time',
    'dashboard.average_rating': 'Average Rating',
    'dashboard.active_citizens': 'Active Citizens',
    'dashboard.manage_citizens': 'Manage and view profiles',
    'dashboard.search_citizens': 'Search Citizens',
    'dashboard.citizen_profiles': 'PROFILES',
    'dashboard.citizen': 'Citizen',
    'dashboard.status': 'Status',
    'dashboard.ratings': 'Ratings',
    'dashboard.feedback_submissions': 'Feedback submissions',
    'dashboard.no_citizens': 'No citizens found.',
    'dashboard.verified': 'Verified',
    'dashboard.pending': 'Pending',
    'dashboard.unverified': 'Unverified',
    'dashboard.citizen_map': 'Citizen Map',
    'dashboard.weekly': 'Weekly',
    'dashboard.monthly': 'Monthly',
    'dashboard.yearly': 'Yearly',
    'dashboard.feedback_details': 'Feedback Details',
    'dashboard.close': 'Close',
    'dashboard.date': 'Date',
    'dashboard.comment': 'Comment',
    'dashboard.files': 'Files',
    'dashboard.feedback_submissions_title': 'Feedback Submissions',
    'dashboard.review_feedback': 'Review and manage citizen feedback',
    'dashboard.search_comment_user': 'Search by comment or user',
    'dashboard.sector': 'Sector',
    'dashboard.all_sectors': 'All Sectors',
    'dashboard.transport': 'Transport',
    'dashboard.healthcare': 'Healthcare',
    'dashboard.education': 'Education',
    'dashboard.ticket': 'Ticket',
    'dashboard.view_details': 'View Details',
    'dashboard.no_feedback': 'No feedback found.',
    'dashboard.showing_page': 'Showing page',
    'dashboard.of': 'of',
    'dashboard.total': 'Total',
    'dashboard.prev': 'Prev',
    'dashboard.next': 'Next',
    'dashboard.top_performing_services': 'Top Performing Services',
    'dashboard.top_feedback': 'Top Feedback\'s',
    'dashboard.no_data': 'No data available.',
    'dashboard.pie_chart': 'Pie Chart',
    'dashboard.chart': 'Chart',
    'dashboard.show_value': 'Show Value',
    'dashboard.chart_order': 'Chart Order',
    'dashboard.save_report': 'Save Report',
    'dashboard.total_revenue': 'Total Revenue',
    'dashboard.anonymous': 'Anonymous',
    'dashboard.general': 'General',
    
    // Settings Modal
    'settings.title': 'Account & Settings',
    'settings.close': 'Close',
    'settings.name': 'Name',
    'settings.email': 'Email',
    'settings.role': 'Role',
    'settings.admin': 'Admin',
    'settings.user': 'User',
    'settings.session_expires': 'Session Expires',
    'settings.sign_out': 'Sign out',
    'settings.signing_out': 'Signing out…',
    
    // Common
    'common.language': 'Language',
    'common.english': 'English',
    'common.amharic': 'አማርኛ',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.or': 'or',
    'common.show_password': 'Show password',
    'common.hide_password': 'Hide password',
    
    // Services Page
    'services.title': 'Select a Service',
    'services.description': 'Choose the government service or sector you\'d like to provide feedback on. Your input helps improve public services for everyone.',
    'services.back_to_home': ' home',
    'services.health_title': 'Health Services',
    'services.health_description': 'Hospitals, clinics, public health programs, and medical facilities',
    'services.education_title': 'Education',
    'services.education_description': 'Schools, universities, educational programs, and learning resources',
    'services.transportation_title': 'Transportation',
    'services.transportation_description': 'Public transit, roads, traffic management, and infrastructure',
    'services.public_safety_title': 'Public Safety',
    'services.public_safety_description': 'Police services, emergency response, and community safety',
    'services.employment_title': 'Employment Services',
    'services.employment_description': 'Job placement, unemployment benefits, and workforce development',
    'services.housing_title': 'Housing & Urban Planning',
    'services.housing_description': 'Public housing, urban development, and city planning services',
    'services.social_services_title': 'Social Services',
    'services.social_services_description': 'Welfare programs, social assistance, and community support',
    'services.utilities_title': 'Public Utilities',
    'services.utilities_description': 'Water, electricity, waste management, and utility services',
    'services.environment_title': 'Environment',
    'services.environment_description': 'Environmental protection, parks, and conservation programs',
    'services.legal_title': 'Legal & Justice',
    'services.legal_description': 'Courts, legal aid, and justice system services',
    'services.municipal_title': 'Municipal Services',
    'services.municipal_description': 'Local government services, permits, and administrative functions',
    'services.related_institutions': 'Related Institutions:',
    'services.more': 'more',
    'services.cant_find_title': 'Can\'t find what you\'re looking for?',
    'services.cant_find_description': 'If your concern doesn\'t fit into any of the categories above, you can still submit general feedback.',
    'services.submit_general_feedback': 'Submit General Feedback',
    
    // FAQ Page
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Find quick answers to the most common questions about CivicVoice Et',
    'faq.help_center': 'Help Center',
    'faq.search_placeholder': 'Search for help articles, guides, or common issues...',
    'faq.no_results': 'No FAQs found',
    'faq.no_results_desc': 'Try adjusting your search terms or browse all categories above.',
    'faq.clear_search': 'Clear Search',
    'faq.still_need_help': 'Still need help?',
    'faq.still_need_help_desc': 'Can\'t find the answer you\'re looking for? Our support team is here to help you with any questions or issues.',
    'faq.contact_support': 'Contact Support',
    'faq.live_chat': 'Live Chat',
    
    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have questions, suggestions, or need support? We\'d love to hear from you. Our team is here to help you make the most of CivicVoice Et.',
    'contact.email_us': 'Email Us',
    'contact.email_desc': 'We typically respond within 24 hours',
    'contact.call_us': 'Call Us',
    'contact.call_hours': 'Monday to Friday, 9AM - 6PM EAT',
    'contact.visit_us': 'Visit Us',
    'contact.location': 'Bole Sub-city, Addis Ababa',
    'contact.business_hours': 'Business Hours',
    'contact.hours': 'Mon - Fri: 9AM - 6PM',
    'contact.emergency_support': 'Emergency support available 24/7',
    'contact.send_message': 'Send us a Message',
    'contact.form_description': 'Fill out the form below and we\'ll get back to you as soon as possible.',
    'contact.full_name': 'Full Name',
    'contact.full_name_placeholder': 'Enter your full name',
    'contact.email_address': 'Email Address',
    'contact.email_placeholder': 'Enter your email',
    'contact.subject': 'Subject',
    'contact.subject_placeholder': 'What is this regarding?',
    'contact.message': 'Message',
    'contact.message_placeholder': 'Tell us how we can help you...',
    'contact.send_button': 'Send Message',
    'contact.sending': 'Sending...',
    
    // Help Center Page
    'help.title': 'How can we help you?',
    'help.subtitle': 'Find answers to common questions, browse help articles, or get in touch with our support team.',
    'help.search_placeholder': 'Search for help articles, guides, or common issues...',
    'help.search_button': 'Search',
    'help.common_issues': 'Common Issues',
    'help.browse_category': 'Browse by Category',
    'help.popular_articles': 'Popular Articles',
    'help.search_results': 'Search Results',
    'help.clear_search': 'Clear Search',
    'help.views': 'views',
    'help.found_helpful': 'found helpful',
    'help.articles': 'articles',
    'help.contact_support_title': 'Still Need Help? Contact Support',
    'help.live_chat': 'Live Chat',
    'help.live_chat_desc': 'Chat with our support team in real-time',
    'help.availability': 'Availability',
    'help.response_time': 'Response time',
    'help.start_chat': 'Start Chat',
    'help.email_support': 'Email Support',
    'help.email_support_desc': 'Send us a detailed message about your issue',
    'help.send_email': 'Send Email',
    'help.phone_support': 'Phone Support',
    'help.phone_support_desc': 'Speak directly with a support representative',
    'help.call_now': 'Call Now',
    'help.recommended': 'Recommended',
    'help.system_status': 'System Status',
    'help.system_status_desc': 'Current status of CivicVoice Et services',
    'help.all_systems': 'All Systems Operational',
    'help.uptime': 'Uptime',
    'help.response_time_stat': 'Response Time',
    'help.active_issues': 'Active Issues',
  },
  am: {
    // Navigation & Header
    'nav.home': 'ቤት',
    'nav.services': 'አገልግሎቶች',
    'nav.feedback': 'አስተያየት',
    'nav.dashboard': 'ዳሽቦርድ',
    'nav.signin': 'ግባ',
    'nav.signup': 'ተመዝገብ',
    'nav.citizen_signin': 'ግባ',
    'nav.government_signin': 'ግባ',
    'nav.back_to_home': 'ወደ ቤት ተመለስ',
    'nav.faq': 'ተደጋጋሚ ጥያቄዎች',
    'nav.logout': 'ውጣ',
    'nav.profile': 'መገለጫ እይ',
    'nav.settings': 'ቅንብሮች',
    'nav.help': 'እገዛ እና ድጋፍ',
    'nav.user_placeholder': 'ተጠቃሚ',
    'nav.open_menu': 'ማውጫን ክፈት',
    
    // Landing Page
    'landing.title': 'CivicVoice',
    'landing.subtitle': 'Et',
    'landing.hero.title': 'CivicVoice Et',
    'landing.hero.description': 'ውስብስብ የዜጎች መረጃዎችን ወደ ተግባራዊ ግንዛቤዎች የሚቀይር ሁሉንም ያካተተ የመንግስት ትንታኔ መድረክዎ። በእውነተኛ ጊዜ የመንግስት ግልጽነት፣ የፖሊሲ ክትትል እና ለዘመናዊ ዲሞክራሲ የተነደፉ የዜጎች ተሳትፎ መሳሪያዎች ራስዎን ያብቃሉ።',
    'landing.hero.cta': 'መድረኩን ያስሱ',
    'landing.hero.watch_demo': 'የተሞክሮ ቪዲዮ ይመልከቱ',
    'landing.hero.badge': 'የዜጎች ፈጠራ',
    'landing.hero.image_alt': 'CivicVoice Etን በሞባይል የሚጠቀም ሰው',
    'landing.stats.citizens': '10,000+ ዜጎች',
    'landing.stats.satisfaction': '98% ማረክ',
    'landing.features.title': 'የCivicVoice Et ዋና ባህሪያት',
    'landing.features.subtitle': 'ለምን CivicVoice Etን መምረጥ?',
    'landing.features.secure.title': 'ደህንነቱ የተጠበቀ እና ማንነት የማይታወቅ',
    'landing.features.secure.description': 'በመንግስት መረጃ መዳረሻ እና አጠቃቀም ክትትል ውስጥ ሙሉ ግልጽነት ያለው የባንክ ደረጃ ደህንነት።',
    'landing.features.analytics.title': 'የእውነተኛ ጊዜ ትንታኔ',
    'landing.features.analytics.description': 'በፖሊሲዎች፣ በበጀቶች እና በህዝብ ተነሳሽነቶች ላይ ፈጣን ዝማኔዎች ያሉት የቀጥታ መንግስት መረጃ ምስላዊነት።',
    'landing.features.community.title': 'የማህበረሰብ ተፅእኖ',
    'landing.features.community.description': 'አስተያየትዎ ለማህበረሰብ መሻሻል እንዴት እንደሚያበረክት ይከታተሉ',
    'landing.features.coverage.title': 'ባለብዙ ዘርፍ ሽፋን',
    'landing.features.coverage.description': 'በትምህርት፣ በጤና፣ በመሠረተ ልማት እና ሌሎችም ላይ አስተያየት ያስገቡ',
    'landing.features.monitoring.title': '24/7 ክትትል',
    'landing.features.monitoring.description': 'የተጠቃሚዎች አስተያየት እና ጠቃሚ ግንዛቤዎችን ለመተንተን ጃምቦን ይጠቀሙ',
    'landing.features.interface.title': 'ለተጠቃሚ ምቹ በይነገጽ',
    'landing.features.interface.description': 'ከተጠቃሚዎች አስተያየት እና ጠቃሚ ግንዛቤዎች ጋር ለመተንተን እና ለመሳተፍ ጃምቦን ይጠቀሙ።',
    'landing.cta.subtitle': 'ነፃ ለመቀላቀል • የክሬዲት ካርድ አያስፈልግም • ፈጣን መዳረሻ',
    'landing.cta.title': 'ለመጀመር ዝግጁ ነዎት?',
    'landing.cta.description': 'ከመንግስታቸው ጋር በመረጃ እና በተሳትፎ ለመቆየት CivicVoice Etን እየተጠቀሙ ካሉ በሺዎች የሚቆጠሩ ዜጎች ጋር ይቀላቀሉ። ዛሬ ነፃ መለያዎን ይፍጠሩ እና የመንግስት መረጃን ከመቼውም ጊዜ በተለየ መልኩ ማሰስ ይጀምሩ።',
    'landing.cta.button': 'የዜጋ ምዝገባ',
    'landing.cta.learn_more': 'ተጨማሪ ይማሩ',
    
    // Footer
    'footer.services': 'አገልግሎቶች',
    'footer.government_services': 'የመንግስት አገልግሎቶች',
    'footer.submit_feedback': 'አስተያየት ያስገቡ',
    'footer.public_reports': 'የህዝብ ሪፖርቶች',
    'footer.issue_tracking': 'ጉዳይ ክትትል',
    'footer.platform': 'መድረክ',
    'footer.citizen_dashboard': 'የዜጋ ዳሽቦርድ',
    'footer.data_analytics': 'የመረጃ ትንታኔ',
    'footer.reporting_tools': 'የሪፖርት መሳሪያዎች',
    'footer.government_portal': 'የመንግስት መግቢያ',
    'footer.resources': 'ግብዓቶች',
    'footer.how_it_works': 'እንዴት እንደሚሰራ',
    'footer.documentation': 'ሰነዶች',
    'footer.faqs': 'ተደጋጋሚ ጥያቄዎች',
    'footer.help_center': 'የእገዛ ማዕከል',
    'footer.about': 'ስለ እኛ',
    'footer.our_mission': 'የእኛ ተልእኮ',
    'footer.contact_us': 'ያግኙን',
    'footer.community': 'ማህበረሰብ',
    'footer.government_login': 'የመንግስት መግቢያ',
    'footer.stay_informed': 'መረጃ ይቀበሉ',
    'footer.email_address': 'ኢሜል አድራሻ',
    'footer.email_placeholder': 'citizen@example.com',
    'footer.newsletter_agreement': 'ስለ መንግስት ተነሳሽነቶች ዝማኔዎችን ለመቀበል ተስማምቻለሁ እና',
    'footer.terms_of_service': 'የአገልግሎት ውል',
    'footer.subscribe': 'ይመዝገቡ',
    'footer.civic_movement': 'የዜጎች ተሳትፎ እንቅስቃሴን ይቀላቀሉ',
    'footer.help_shape': 'ለሁሉም የተሻሉ የመንግስት አገልግሎቶችን ለመቅረጽ ያግዙ',
    'footer.empowering_citizens': 'ዜጎችን ማብቃት • መንግስትን ማሻሻል',
    'footer.terms_conditions': 'ውሎች እና ሁኔታዎች',
    'footer.privacy_policy': 'የግላዊነት ፖሊሲ',
    'footer.data_usage_policy': 'የመረጃ አጠቃቀም ፖሊሲ',
    'footer.copyright': 'CivicVoice Et። ሁሉም መብቶች የተጠበቁ ናቸው',
    
    // Login Page
    'login.welcome_back': 'እንኳን ደህና መጡ',
    'login.email': 'ኢሜል',
    'login.email_placeholder': 'you@example.com',
    'login.password': 'የይለፍ ቃል',
    'login.password_placeholder': '••••••••',
    'login.forgot_password': 'የይለፍ ቃል ረሳኸው?',
    'login.sign_in': 'ግባ',
    'login.signing_in': 'በመግባት ላይ...',
    'login.no_account': 'መለያ የለዎትም?',
    'login.register': 'ይመዝገቡ።',
    'login.remember_me': 'አስታውሰኝ',
    'login.validation_error_title': 'የማረጋገጫ ስህተት',
    'login.validation_error_desc': 'መረጃዎን ይመርምሩ እና እንደገና ይሞክሩ።',
    'login.login_failed_title': 'መግባት አልተሳካም',
    'login.login_failed_desc': 'ኢሜልን እና የይለፍ ቃልዎን እባክዎን ያረጋግጡ።',
    'login.success_title': 'እንኳን ደህና መጡ!',
    'login.success_desc': '{email} እንደ ተጠቃሚ ገብተዋል',
    'login.enter_credentials': 'መለያዎን ለመድረስ መረጃዎን ያስገቡ',
    'login.demo_credentials_title': 'የሙከራ መረጃ:',
    'login.demo_admin': 'አስተዳዳሪ፦ admin@civicvoice.et / admin123',
    'login.demo_user': 'ተጠቃሚ፦ demo@civicvoice.et / demo123',
    'common.or': 'ወይም',
    
    // Signup Page
    'signup.hero.title': 'መለያ ይፍጠሩ',
    'signup.hero.subtitle': 'ተነሳሽ ዜጎች ጋር ይቀላቀሉ',
    'signup.full_name': 'ሙሉ ስም',
    'signup.full_name_placeholder': 'ስምዎ',
    'signup.confirm_password': 'የይለፍ ቃል ያረጋግጡ',
    'signup.terms_prefix': 'እቀበላለሁ ',
    'signup.terms_and': ' እና ',
    'signup.terms_conditions': 'የአገልግሎት ውል',
    'signup.privacy_policy': 'የግላዊነት ፖሊሲ',
    'signup.create_account': 'መለያ ይፍጠሩ',
    'signup.creating_account': 'መለያ በመፍጠር ላይ...',
    'signup.verification_title': 'ኢሜልዎን ያረጋግጡ!',
    'signup.verification_desc': 'ወደ {email} 6 አሀዝ የማረጋገጫ ኮድ ላክነዋል',
    'signup.enter_code': 'የማረጋገጫ ኮድ ያስገቡ',
    'signup.resend_prefix': 'ኮዱን አልተቀበሉም? የመልዕክት መልእክትዎን ይመልከቱ ወይም',
    'signup.resend_action': 'ኮዱን እንደገና ይላኩ',
    'signup.verify_button': 'ያረጋግጡ እና ይቀጥሉ',
    'signup.verifying': 'በማረጋገጥ ላይ...',
    'signup.error.required_fields': 'እባክዎን ሁሉንም አስፈላጊ መረጃዎች ይሙሉ።',
    'signup.error.password_mismatch': 'የይለፍ ቃሎቹ አይመሳሰሉም።',
    'signup.error.accept_terms': 'እባክዎን ውሉን ተቀበሉ።',
    'signup.error.enter_otp': 'ወደ ኢሜልዎ የተላከውን 6 አሀዝ ኮድ ያስገቡ።',
    'signup.validation_error_title': 'የማረጋገጫ ስህተት',
    'signup.validation_error_desc': 'መረጃዎን ይመርምሩ እና እንደገና ይሞክሩ።',
    'signup.success_title': 'ኢሜልዎን ያረጋግጡ!',
    'signup.success_desc': 'የማረጋገጫ ኮድ ወደ መልዕክት ሳጥንዎ ተልኳል።',
    'signup.registration_failed_title': 'መመዝገብ አልተሳካም',
    'signup.registration_failed_desc': 'በመመዝገብ ሂደት ላይ ስህተት ተከስቷል።',
    'signup.verification_failed_title': 'ማረጋገጥ አልተሳካም',
    'signup.verification_failed_desc': 'በማረጋገጥ ሂደት ላይ ስህተት ተከስቷል።',
    'signup.invalid_otp_title': 'ልክ ያልሆነ ኮድ',
    'signup.invalid_otp_desc': 'እባክዎን ትክክለኛ 6 አሀዝ ኮድ ያስገቡ።',
    
    // Services Page
    'services.title': 'አገልግሎት ይምረጡ',
    'services.description': 'የመንግስት አገልግሎት ወይም ዘርፍ ይምረጡ በእሱ ላይ አስተያየት ለመስጠት። የእርስዎ አስተያየት የህዝብ አገልግሎቶችን ለሁሉም ሰው ለማሻሻል ይረዳል።',
    'services.back_to_home': 'ወደ ቤት ተመለስ',
    'services.health_title': 'የጤና አገልግሎቶች',
    'services.health_description': 'ሆስፒታሎች፣ ክሊኒኮች፣ የህዝብ ጤና ፕሮግራሞች እና የህክምና ተቋማት',
    'services.education_title': 'ትምህርት',
    'services.education_description': 'ትምህርት ቤቶች፣ ዩኒቨርስቲዎች፣ የትምህርት ፕሮግራሞች እና የመማሪያ ግብዓቶች',
    'services.transportation_title': 'ትራንስፖርት',
    'services.transportation_description': 'የህዝብ ትራንስፖርት፣ መንገዶች፣ የትራፊክ አስተዳደር እና መሠረተ ልማት',
    'services.public_safety_title': 'የህዝብ ደህንነት',
    'services.public_safety_description': 'የፖሊስ አገልግሎቶች፣ የአደጋ ጊዜ ምላሽ እና የማህበረሰብ ደህንነት',
    'services.employment_title': 'የቅጥር አገልግሎቶች',
    'services.employment_description': 'የስራ ማስተዋወቂያ፣ የስራ አጥነት ጥቅማጥቅሞች እና የስራ ኃይል ልማት',
    'services.housing_title': 'መኖሪያ ቤት እና የከተማ እቅድ',
    'services.housing_description': 'የህዝብ መኖሪያ ቤት፣ የከተማ ልማት እና የከተማ እቅድ አገልግሎቶች',
    'services.social_services_title': 'ማህበራዊ አገልግሎቶች',
    'services.social_services_description': 'የበጎ አድራጎት ፕሮግራሞች፣ ማህበራዊ እርዳታ እና የማህበረሰብ ድጋፍ',
    'services.utilities_title': 'የህዝብ መገልገያዎች',
    'services.utilities_description': 'ውሃ፣ ኤሌክትሪክ፣ የቆሻሻ አስተዳደር እና የመገልገያ አገልግሎቶች',
    'services.environment_title': 'አካባቢ',
    'services.environment_description': 'የአካባቢ ጥበቃ፣ ፓርኮች እና የጥበቃ ፕሮግራሞች',
    'services.legal_title': 'ህጋዊ እና ፍትህ',
    'services.legal_description': 'ፍርድ ቤቶች፣ የህግ እርዳታ እና የፍትህ ስርዓት አገልግሎቶች',
    'services.municipal_title': 'የማዘጋጃ ቤት አገልግሎቶች',
    'services.municipal_description': 'የከተማ አዳራሽ፣ የማዘጋጃ ቤት ቢሮዎች እና አስተዳደራዊ ተግባራት',
    'services.related_institutions': 'ተዛማጅ ተቋማት:',
    'services.more': 'ተጨማሪ',
    'services.cant_find_title': 'የምትፈልገውን አላገኘህም?',
    'services.cant_find_description': 'ስጋትዎ ከላይ ባሉት ምድቦች ውስጥ የማይገኝ ከሆነ፣ አሁንም አጠቃላይ አስተያየት ማስገባት ይችላሉ።',
    'services.submit_general_feedback': 'አጠቃላይ አስተያየት ያስገቡ',
    
    // FAQ Page
    'faq.title': 'ተደጋጋሚ ጥያቄዎች',
    'faq.subtitle': 'ስለ CivicVoice Et በጣም የተለመዱ ጥያቄዎች ፈጣን መልሶችን ያግኙ',
    'faq.help_center': 'የእገዛ ማዕከል',
    'faq.search_placeholder': 'የእገዛ ጽሑፎችን፣ መመሪያዎችን፣ ወይም የተለመዱ ጉዳዮችን ይፈልጉ...',
    'faq.no_results': 'ምንም ተደጋጋሚ ጥያቄዎች አልተገኙም',
    'faq.no_results_desc': 'የፍለጋ ቃላትዎን ማስተካከል ይሞክሩ ወይም ከላይ ያሉትን ሁሉንም ምድቦች ያስሱ።',
    'faq.clear_search': 'ፍለጋን አጽዳ',
    'faq.still_need_help': 'አሁንም እገዛ ይፈልጋሉ?',
    'faq.still_need_help_desc': 'የሚፈልጉትን መልስ ማግኘት አልቻሉም? የድጋፍ ቡድናችን ማንኛቸውንም ጥያቄዎችን ወይም ጉዳዮችን ለመርዳት እዚህ አለ።',
    'faq.contact_support': 'ድጋፍን ያግኙ',
    'faq.live_chat': 'የቀጥታ ውይይት',
    
    // Contact Page  
    'contact.title': 'ያግኙን',
    'contact.subtitle': 'ጥያቄዎች፣ አስተያየቶች፣ ወይም ድጋፍ ይፈልጋሉ? ከእርስዎ መስማት እንፈልጋለን። ቡድናችን CivicVoice Etን በተሻለ መንገድ ለመጠቀም እንዲያግዝዎ እዚህ አለ።',
    'contact.email_us': 'በኢሜል ያግኙን',
    'contact.email_desc': 'በተለምዶ በ24 ሰዓታት ውስጥ መልስ እንሰጣለን',
    'contact.call_us': 'ይደውሉልን',
    'contact.call_hours': 'ሰኞ እስከ አርብ፣ ከ9 ጠዋት እስከ 6 ከሰዓት EAT',
    'contact.visit_us': 'ይጎብኙን',
    'contact.location': 'ቦሌ ክፍለ ከተማ፣ አዲስ አበባ',
    'contact.business_hours': 'የሥራ ሰዓቶች',
    'contact.hours': 'ሰኞ - አርብ: ከ9 ጠዋት እስከ 6 ከሰዓት',
    'contact.emergency_support': 'የድንገተኛ ጊዜ ድጋፍ 24/7 ይገኛል',
    'contact.send_message': 'መልእክት ይላኩልን',
    'contact.form_description': 'የሚከተለውን ቅጽ ይሙሉ እና በተቻለ ፍጥነት መልስ እንሰጥዎታለን።',
    'contact.full_name': 'ሙሉ ስም',
    'contact.full_name_placeholder': 'ሙሉ ስምዎን ያስገቡ',
    'contact.email_address': 'ኢሜል አድራሻ',
    'contact.email_placeholder': 'ኢሜልዎን ያስገቡ',
    'contact.subject': 'ርዕስ',
    'contact.subject_placeholder': 'ይህ ስለምንድን ነው?',
    'contact.message': 'መልእክት',
    'contact.message_placeholder': 'እንዴት እንደምንረዳዎ ይንገሩን...',
    'contact.send_button': 'መልእክት ላክ',
    'contact.sending': 'በመላክ ላይ...',
    
    // Common
    'common.loading': 'በመጫን ላይ...',
    'common.error': 'ስህተት',
    'common.success': 'ተሳክቷል',
    'common.cancel': 'አቋርጥ',
    'common.save': 'አስቀምጥ',
    'common.delete': 'ሰርዝ',
    'common.edit': 'አስተካክል',
    'common.view': 'እይ',
    'common.search': 'ፈልግ',
    'common.filter': 'ማጣሪያ',
    'common.next': 'ቀጣይ',
    'common.previous': 'ያለፈው',
    'common.submit': 'አስገባ',
    'common.or': 'ወይም',
    'common.show_password': 'የይለፍ ቃል አሳይ',
    'common.hide_password': 'የይለፍ ቃል ደብቅ',
  },
  om: {
    // Navigation & Header
    'nav.home': 'Mana',
    'nav.services': 'Tajaajilaalee',
    'nav.feedback': 'Yaada',
    'nav.dashboard': 'Dashboard',
    'nav.signin': 'Seeni',
    'nav.signup': 'Galmaa\'i',
    'nav.citizen_signin': 'Seeni',
    'nav.government_signin': 'Seeni',
    'nav.back_to_home': 'Gara Manaatti Deebi\'i',
    
    // Landing Page
    'landing.title': 'CivicVoice',
    'landing.subtitle': 'Et',
    'landing.hero.title': 'CivicVoice Et',
    'landing.hero.description': 'Waltajjii xiinxala mootummaa guutuu kan odeeffannoo lammummaa walxaxaa gara hubannoo hojii ta\'uutti jijjiiru. Iftoominaa mootummaa yeroo qabatamaa, hordoffii imaammataa, fi meeshaalee hirmaannaa lammiiwwan dimookiraasii ammayyaatiif qophaa\'aniin of-danda\'eessaa.',
    'landing.hero.cta': 'Waltajjii Qorati',
    'landing.features.title': 'AMALOOTA GURGUDDOO CivicVoice Et',
    'landing.features.subtitle': 'Maaliif CivicVoice Et Filachuu?',
    'landing.features.secure.title': 'Nageenya & Dhokataa',
    'landing.features.secure.description': 'Nageenya sadarkaa baankii waliin iftoominaa guutuu daangaa fi itti fayyadama odeeffannoo mootummaa keessatti.',
    'landing.features.analytics.title': 'Xiinxala Yeroo Qabatamaa',
    'landing.features.analytics.description': 'Mul\'ata odeeffannoo mootummaa kallattiin yeroo qabatamaa haaromfamuu immaammataa, baajata, fi karoora uummataa irratti.',
    'landing.features.community.title': 'Dhiibbaa Hawaasaa',
    'landing.features.community.description': 'Yaadni keessan fooyya\'ina hawaasaaf akkamitti akka gumaatu hordofaa',
    'landing.features.coverage.title': 'Haguuga Damee Hedduu',
    'landing.features.coverage.description': 'Barnoota, fayyaa, bu\'uura misooma fi kkf irratti yaada galchaa',
    'landing.features.monitoring.title': '24/7 Hordoffii',
    'landing.features.monitoring.description': 'Yaada fayyadamtootaa fi hubannoo gatii qabeessa xiinxaluuf Jambo fayyadamaa',
    'landing.features.interface.title': 'Wal-qunnamtii Fayyadamaa-Michuu',
    'landing.features.interface.description': 'Yaada fayyadamtootaa fi hubannoo gatii qabeessa waliin xiinxaluu fi hirmaachuuf Jambo fayyadamaa.',
    'landing.cta.subtitle': 'Bilisa ta\'e makamuu • Kaardii liqii hin barbaachisu • Daangaa battalumaa',
    'landing.cta.title': 'Jalqabuuf Qophii Jirtuu?',
    'landing.cta.description': 'Lammiiwwan kumaatamaan CivicVoice Et fayyadamaa jiran waliin makamaa mootummaa isaanii waliin odeeffannoo argachuu fi hirmaachuuf. Har\'a akkaawuntii keessan bilisa uumaa odeeffannoo mootummaa akka kanaan dura hin taane qorachuu jalqabaa.',
    'landing.cta.button': 'Galmaa\'ina Lammii',
    
    // Common translations
    'login.welcome_back': 'Baga Nagaan Deebitan',
    'login.email': 'Email',
    'login.password': 'Jecha Icciitii',
    'login.sign_in': 'Akka Lammiitti Seeni',
    'services.title': 'Tajaajila Filachuu',
    'services.health_title': 'Tajaajila Fayyaa',
    'services.education_title': 'Barnoota',
    'common.loading': 'Fe\'aa jira...',
    'common.error': 'Dogoggora',
    'common.success': 'Milkaa\'ina',
  },
  ti: {
    // Tigrinya translations
    'nav.home': 'ገጽ ቀዳማይ',
    'nav.services': 'አገልግሎታት',
    'nav.feedback': 'ርእይቶ',
    'nav.dashboard': 'ዳሽቦርድ',
    'nav.signin': 'ኣትው',
    'nav.signup': 'ምዝገባ',
    'landing.title': 'CivicVoice',
    'landing.hero.title': 'CivicVoice Et',
    'landing.hero.description': 'ናይ መንግስቲ ትንተና መድረኽ እቲ ዝተሓላለኸ ናይ ዜጋታት ዳታ ናብ ተግባራዊ ርድኢት እንመይር። ብሓቂ ግዜ ግልጽነት መንግስቲ፡ ምክትታል ፖሊሲታት፡ ከምኡ ድማ ናይ ዜጋታት ተሳትፎ መሳርሕታት።',
    'login.welcome_back': 'እንቋዕ ብድሕር መጻእኩም',
    'login.email': 'ኢመይል',
    'login.password': 'ቃል ምስጢር',
    'services.title': 'አገልግሎት ምረጽ',
    'common.loading': 'ኣብ ምጽዓን...',
    'footer.services': 'አገልግሎታት',
    'footer.platform': 'መድረኽ',
    'footer.resources': 'ምንጭታት',
    'footer.about': 'ብዛዕባና',
    'footer.feedback': 'ርእይቶ',
  },
  so: {
    // Somali translations
    'nav.home': 'Hoyga',
    'nav.services': 'Adeegyada',
    'nav.feedback': 'Ra\'yi',
    'nav.dashboard': 'Dashboard',
    'nav.signin': 'Gal',
    'nav.signup': 'Isdiiwaangeli',
    'landing.title': 'CivicVoice',
    'landing.hero.title': 'CivicVoice Et',
    'landing.hero.description': 'Barnamijka faahfaahinta dowladda oo guud kaas oo u beddelaya xogta muwaadinka ee kakan inay noqdaan aragtiyo wax ku ool ah. Ku xoogeyso waxtarka waqtiga dhabta ah ee waxa ee dowladda, la socodka siyaasadaha, iyo qalabka ka qeybgalka muwaadinka.',
    'login.welcome_back': 'Ku soo dhawoow mar labaad',
    'login.email': 'Email',
    'login.password': 'Erayga Sirta',
    'services.title': 'Dooro Adeeg',
    'common.loading': 'Waa la rarayo...',
    'footer.services': 'Adeegyada',
    'footer.platform': 'Platform',
    'footer.resources': 'Ilaha',
    'footer.about': 'Wax ku saabsan',
    'footer.feedback': 'Ra\'yi',
  },
  aa: {
    // Afar translations
    'nav.home': 'Giddo',
    'nav.services': 'Maddat',
    'nav.feedback': 'Raaha',
    'nav.dashboard': 'Dashboard',
    'nav.signin': 'Gal',
    'nav.signup': 'Duubale',
    'landing.title': 'CivicVoice',
    'landing.hero.title': 'CivicVoice Et',
    'landing.hero.description': 'Dowlak tahlil wette kee yaanu tumakke ummatu data ab  caydal fahhme geddum. Hagge waqtek dowlak yaalok, siyaasak tahdam, kee ummatu dahlisuk alat.',
    'login.welcome_back': 'Kee giddotu daga yaam',
    'login.email': 'Email',
    'login.password': 'Kal Siri',
    'services.title': 'Madda Xige',
    'common.loading': 'Gedum...',
    'footer.services': 'Maddat',
    'footer.platform': 'Medrek',
    'footer.resources': 'Galte',
    'footer.about': 'Yaanu',
    'footer.feedback': 'Raaha',
  },
  gur: {
    // Gurage translations
    'nav.home': 'ቤት',
    'nav.services': 'አገልግሎት',
    'nav.feedback': 'አስተያየት',
    'nav.dashboard': 'ዳሽቦርድ',
    'nav.signin': 'ገባ',
    'nav.signup': 'ተመዝገብ',
    'landing.title': 'CivicVoice',
    'landing.hero.title': 'CivicVoice Et',
    'landing.hero.description': 'የመንግስት ትንታኔ መድረክ ውስብስብ የዜጎች መረጃዎችን ወደ ተግባራዊ ግንዛቤዎች የሚቀይር። በእውነተኛ ጊዜ የመንግስት ግልጽነት፣ የፖሊሲ ክትትል እና የዜጎች ተሳትፎ መሳሪያዎች።',
    'login.welcome_back': 'እንደገና እንኳን ደህና መጡ',
    'login.email': 'ኢሜል',
    'login.password': 'የይለፍ ቃል',
    'services.title': 'አገልግሎት ምረጥ',
    'common.loading': 'በመጫን ላይ...',
    'footer.services': 'አገልግሎት',
    'footer.platform': 'መድረክ',
    'footer.resources': 'ምንጮች',
    'footer.about': 'ስለ',
    'footer.feedback': 'አስተያየት',
  }
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first, then default to English
    const savedLanguage = localStorage.getItem('language') as Language
    return savedLanguage || 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const translateKey = (lang: Language, translationKey: string): string | undefined => {
    const langPack = translations[lang]
    if (!langPack) return undefined
    return langPack[translationKey as keyof typeof langPack] as string | undefined
  }

  const t = (key: string): string => {
    return translateKey(language, key) ?? translateKey(FALLBACK_LANGUAGE, key) ?? key
  }

  const isRTL = false // Keep all languages LTR to maintain consistent layout

  useEffect(() => {
    // Set document direction and language
    document.documentElement.lang = language
    document.documentElement.dir = 'ltr' // Always use LTR to maintain layout consistency
    
    // Add specific CSS for Amharic text rendering
    const existingStyle = document.getElementById('amharic-text-fix')
    if (existingStyle) {
      existingStyle.remove()
    }
    
    if (language === 'am') {
      const style = document.createElement('style')
      style.id = 'amharic-text-fix'
      style.textContent = `
        /* Only target text elements, not layout containers */
        p, span, h1, h2, h3, h4, h5, h6, a, button, input, textarea, label, li, td, th {
          font-feature-settings: normal !important;
          text-rendering: optimizeLegibility !important;
          -webkit-font-feature-settings: normal !important;
          -moz-font-feature-settings: normal !important;
          unicode-bidi: normal !important;
          direction: ltr !important;
          writing-mode: horizontal-tb !important;
        }
        
        body, html {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans Ethiopic', 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;
          direction: ltr !important;
        }
        
        /* Ensure flex and grid layouts are not affected */
        .flex, .grid, [class*="flex"], [class*="grid"],
        [class*="justify-"], [class*="items-"], [class*="content-"],
        [class*="self-"], [class*="place-"], [class*="gap-"],
        [class*="space-"], [class*="divide-"], .container,
        .max-w-7xl, .mx-auto, [class*="max-w-"], [class*="min-h-"],
        [class*="h-"], [class*="w-"], div, section, header, main, footer {
          direction: ltr !important;
        }
      `
      document.head.appendChild(style)
    }
  }, [language, isRTL])

  const translate = (key: string, fallback: string): string => {
    const value = t(key)
    if (!value || value === key) return fallback
    return value
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translate, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}