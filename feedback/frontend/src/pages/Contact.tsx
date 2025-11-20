import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";
import Breadcrumb from "../components/Breadcrumb";
import SEOHead from "../components/SEOHead";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <SEOHead
        title="Contact CivicVoice Et - Get in Touch"
        description="Contact CivicVoice Et for support, partnerships, or inquiries. We're here to help improve government transparency in Ethiopia."
        keywords={[
          "contact civicvoice",
          "support",
          "help",
          "government transparency",
          "ethiopia",
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("contact.title")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("contact.subtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {t("contact.email_us")}
                          </h3>
                          <p className="text-muted-foreground">
                            support@civicvoice.et
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("contact.email_desc")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <Phone className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {t("contact.call_us")}
                          </h3>
                          <p className="text-muted-foreground">
                            +251-11-xxx-xxxx
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("contact.call_hours")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {t("contact.visit_us")}
                          </h3>
                          <p className="text-muted-foreground">
                            Addis Ababa, Ethiopia
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("contact.location")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {t("contact.business_hours")}
                          </h3>
                          <p className="text-muted-foreground">
                            {t("contact.hours")}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("contact.emergency_support")}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {t("contact.send_message")}
                      </h2>
                      <p className="text-muted-foreground">
                        {t("contact.form_description")}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            {t("contact.full_name")} *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t("contact.full_name_placeholder")}
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            {t("contact.email_address")} *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t("contact.email_placeholder")}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("contact.subject")} *
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={t("contact.subject_placeholder")}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("contact.message")} *
                        </label>
                        <Textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t("contact.message_placeholder")}
                          rows={6}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 text-lg font-semibold"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                            {t("contact.sending")}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            {t("contact.send_button")}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
