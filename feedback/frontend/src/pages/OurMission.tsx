import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Target,
  Users,
  Shield,
  Globe,
  Heart,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";

export default function OurMission() {
  const { t } = useLanguage();

  const values = [
    {
      title: "Transparency",
      description:
        "We believe in complete openness in government operations and decision-making processes.",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "Accessibility",
      description:
        "Government services should be accessible to all citizens, regardless of their background or abilities.",
      icon: <Users className="w-8 h-8" />,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    },
    {
      title: "Innovation",
      description:
        "We leverage cutting-edge technology to improve the citizen-government relationship.",
      icon: <Lightbulb className="w-8 h-8" />,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    },
    {
      title: "Community",
      description:
        "Strong communities are built through active citizen participation and collaboration.",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
    },
  ];

  const goals = [
    {
      title: "100% Digital Government Services",
      description:
        "Digitize all government services to make them accessible 24/7 from anywhere",
      progress: 78,
      target: "2025",
    },
    {
      title: "Citizen Satisfaction Above 90%",
      description:
        "Achieve and maintain high citizen satisfaction across all government interactions",
      progress: 85,
      target: "2024",
    },
    {
      title: "Response Time Under 48 Hours",
      description:
        "Ensure all citizen inquiries receive a response within 48 hours",
      progress: 92,
      target: "Achieved",
    },
    {
      title: "99.9% Platform Uptime",
      description:
        "Maintain platform reliability and availability for continuous citizen access",
      progress: 99,
      target: "Ongoing",
    },
  ];

  const team = [
    {
      name: "Dr. Abebe Tadesse",
      role: "Chief Executive Officer",
      description:
        "Former Minister of Digital Transformation with 15+ years in public service innovation",
      image: "/placeholder-avatar-1.jpg",
    },
    {
      name: "Hanna Mekonnen",
      role: "Chief Technology Officer",
      description:
        "Tech leader with expertise in large-scale government systems and citizen engagement platforms",
      image: "/placeholder-avatar-2.jpg",
    },
    {
      name: "Dawit Alemayehu",
      role: "Head of Citizen Experience",
      description:
        "Specializes in user experience design and accessibility for government digital services",
      image: "/placeholder-avatar-3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
            <Target className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Our Mission
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To bridge the gap between citizens and government through innovative
            technology, creating transparent, accessible, and responsive public
            services for all Ethiopians.
          </p>
        </div>

        {/* Vision Statement */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-semibold text-foreground mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A future where every Ethiopian citizen has seamless access to
              government services, where their voice is heard and valued, and
              where technology serves as a bridge to build stronger, more
              connected communities across our nation.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-16">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 text-center"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Goals & Progress */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-16">
            Our Goals & Progress
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                      {goal.title}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {goal.progress}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {goal.target}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {goal.description}
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-16">
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact Stats */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-16">
            Our Impact So Far
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Citizens Served</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">15K+</div>
                <div className="text-muted-foreground">Feedback Processed</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Response Rate</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">
                  Platform Availability
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-semibold text-foreground mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Be part of the transformation. Help us build a more connected,
            transparent, and responsive government that truly serves the people
            of Ethiopia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="px-8">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
