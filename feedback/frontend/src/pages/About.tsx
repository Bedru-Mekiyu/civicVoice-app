import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Users, Target, Globe, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";
import Breadcrumb from "../components/Breadcrumb";
import SEOHead from "../components/SEOHead";

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title="About CivicVoice Et - Our Mission & Vision"
        description="Learn about CivicVoice Et's mission to transform government transparency and citizen engagement in Ethiopia through innovative technology."
        keywords={[
          "about civicvoice",
          "mission",
          "vision",
          "government transparency",
          "citizen engagement",
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <span className="text-primary font-semibold text-lg tracking-wide uppercase">
                  Our Mission
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Empowering Ethiopian Citizens
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                CivicVoice Et is dedicated to bridging the gap between citizens
                and government through innovative technology, transparency, and
                meaningful engagement that transforms how democracy works in
                Ethiopia.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    To democratize access to government information and create
                    meaningful channels for citizen participation in Ethiopian
                    governance. We believe every citizen deserves transparency,
                    accountability, and the tools to make their voice heard in
                    shaping their community's future.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="w-8 h-8 text-secondary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    A transparent, responsive Ethiopian government where every
                    citizen is empowered with the information and tools they
                    need to participate actively in democracy, leading to better
                    policies and stronger communities nationwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide everything we do at CivicVoice Et
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Citizen-Centric",
                  description:
                    "Every feature is designed with citizens' needs and experiences at the center.",
                },
                {
                  icon: Globe,
                  title: "Transparency",
                  description:
                    "We believe in open, accessible government data and clear communication.",
                },
                {
                  icon: Target,
                  title: "Impact-Driven",
                  description:
                    "Measuring success by the positive changes we create in communities.",
                },
                {
                  icon: Award,
                  title: "Excellence",
                  description:
                    "Committed to delivering world-class technology and user experiences.",
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6 text-center">
                    <value.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of Ethiopian citizens who are already using
              CivicVoice Et to stay informed and engaged.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="px-8 py-3 text-lg font-semibold">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="px-8 py-3 text-lg font-semibold"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
