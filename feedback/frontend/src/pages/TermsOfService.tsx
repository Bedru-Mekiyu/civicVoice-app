import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Calendar, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";

export default function TermsOfService() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last updated: March 15, 2024</span>
          </div>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                  Important Notice
                </h3>
                <p className="text-amber-800 dark:text-amber-300 text-sm">
                  By using CivicVoice Et, you agree to these terms. Please read
                  them carefully as they contain important information about
                  your rights and obligations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                By accessing and using CivicVoice Et ("the Platform"), you
                accept and agree to be bound by these Terms of Service. If you
                do not agree to these terms, you should not use our platform.
              </p>
              <p className="text-muted-foreground">
                These terms apply to all users of the platform, including
                citizens, government officials, and administrators.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Platform Purpose
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                CivicVoice Et is designed to facilitate communication between
                citizens and government institutions. The platform enables:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Submission of feedback on government services</li>
                <li>• Tracking of feedback status and responses</li>
                <li>• Access to public information and reports</li>
                <li>• Participation in civic engagement activities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. User Responsibilities
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">Users agree to:</p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Provide accurate and truthful information</li>
                <li>
                  • Use the platform in a respectful and constructive manner
                </li>
                <li>• Not submit false, misleading, or defamatory content</li>
                <li>• Respect the privacy and rights of other users</li>
                <li>• Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Content Guidelines
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                All content submitted must be appropriate for a government
                platform. Prohibited content includes:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Hate speech or discriminatory language</li>
                <li>• Threats or harassment</li>
                <li>• Spam or commercial solicitation</li>
                <li>• Copyrighted material without permission</li>
                <li>• Personal information of others</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Privacy and Data Protection
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us. Our data practices are governed
                by our Privacy Policy, which is incorporated into these terms by
                reference.
              </p>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your
                personal information and comply with applicable data protection
                laws.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Limitation of Liability
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                CivicVoice Et is provided "as is" without warranties. We are not
                liable for any damages arising from your use of the platform,
                except as required by law.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Changes to Terms
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Users
                will be notified of significant changes, and continued use
                constitutes acceptance of the updated terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Contact Information
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                For questions about these terms, please contact us:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-6">
                <li>• Email: legal@civicvoiceet.com</li>
                <li>• Phone: +251-11-XXX-XXXX</li>
                <li>• Address: Addis Ababa, Ethiopia</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground mb-6">
            By using CivicVoice Et, you acknowledge that you have read,
            understood, and agree to these Terms of Service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/privacy-policy">
              <Button variant="outline">View Privacy Policy</Button>
            </Link>
            <Link to="/contact">
              <Button>Contact Legal Team</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
