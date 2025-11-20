import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from '../contexts/LanguageContext'
import SEOHead from '../components/SEOHead'
import { Input } from "@/components/ui/input"
import { useState } from 'react'

export default function FAQ() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is CivicVoice Et?",
          answer: "CivicVoice Et is a comprehensive government analytics platform that transforms complex civic data into actionable insights. It empowers Ethiopian citizens with real-time government transparency, policy tracking, and citizen engagement tools designed for modern democracy."
        },
        {
          question: "How do I create an account?",
          answer: "Creating an account is simple and free. Click on 'Citizen Signup' from the homepage, fill in your basic information including name, email, and create a secure password. You'll receive a verification email to activate your account."
        },
        {
          question: "Is CivicVoice Et free to use?",
          answer: "Yes, CivicVoice Et is completely free for all Ethiopian citizens. Our mission is to democratize access to government information and ensure every citizen can participate in civic engagement regardless of their economic status."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          question: "How is my personal data protected?",
          answer: "We use bank-level security with end-to-end encryption to protect your data. Your personal information is never shared with third parties without your explicit consent. We follow international data protection standards and maintain complete transparency about data usage."
        },
        {
          question: "Can I submit feedback anonymously?",
          answer: "Yes, you can choose to submit feedback anonymously. We provide options for both identified and anonymous feedback submission, ensuring you can participate in civic engagement in the way that feels most comfortable to you."
        },
        {
          question: "How do you ensure data accuracy?",
          answer: "We source our government data directly from official channels and cross-verify information through multiple sources. Our team regularly audits data quality and provides transparent sourcing information for all datasets."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "What government services can I provide feedback on?",
          answer: "You can provide feedback on a wide range of services including health services, education, transportation, public safety, employment services, housing, social services, utilities, environment, legal & justice, and municipal services."
        },
        {
          question: "How does real-time analytics work?",
          answer: "Our platform continuously monitors government data sources and updates analytics in real-time. You can track policy changes, budget allocations, and public initiatives as they happen, with instant notifications for relevant updates."
        },
        {
          question: "Can I track the impact of my feedback?",
          answer: "Yes! Our community impact tracking feature allows you to see how your feedback contributes to community improvements. You'll receive updates when your feedback leads to policy changes or service improvements."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What browsers are supported?",
          answer: "CivicVoice Et works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience."
        },
        {
          question: "Is there a mobile app?",
          answer: "Currently, CivicVoice Et is optimized as a progressive web app (PWA) that works seamlessly on mobile devices. You can install it on your phone's home screen for app-like functionality. Native mobile apps are in development."
        },
        {
          question: "How do I report a technical issue?",
          answer: "If you encounter any technical issues, please contact our support team through the Contact page or email support@civicvoice.et. Include details about your browser, device, and the specific issue you're experiencing."
        }
      ]
    }
  ]

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <>
      <SEOHead 
        title="Frequently Asked Questions - CivicVoice Et"
        description="Find answers to common questions about CivicVoice Et, including getting started, privacy, security, and platform features."
        keywords={["FAQ", "help", "support", "questions", "civicvoice", "government transparency"]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
            {/* Hero */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <HelpCircle className="w-8 h-8 text-primary" />
                <span className="text-primary font-semibold text-lg tracking-wide uppercase">{t('faq.help_center')}</span>
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('faq.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {t('faq.subtitle')}
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('faq.search_placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-8">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground border-b border-border pb-2">
                      {category.category}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.questions.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`${categoryIndex}-${index}`}
                          className="border border-border rounded-lg px-6"
                        >
                          <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t('faq.no_results')}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t('faq.no_results_desc')}
                  </p>
                  <Button onClick={() => setSearchTerm('')} variant="outline">
                    {t('faq.clear_search')}
                  </Button>
                </div>
              )}
            </div>

            {/* Still need help */}
            <div className="mt-16 text-center bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('faq.still_need_help')}</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t('faq.still_need_help_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="px-8 py-3 text-lg font-semibold">
                    {t('faq.contact_support')}
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="px-8 py-3 text-lg font-semibold"
                  onClick={() => {
                    // Open live chat or chat widget
                    window.open('https://tawk.to/chat', '_blank')
                  }}
                >
                  {t('faq.live_chat')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}