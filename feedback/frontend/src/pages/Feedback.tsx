import { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Upload, Star } from "lucide-react";
import { FeedbackApi } from "@/lib/api";
import { auth } from "@/lib/auth";

const serviceData = {
  health: {
    name: "Health Services",
    institutions: [
      "Ministry of Health",
      "Public Hospitals",
      "Health Centers",
      "Medical Clinics",
    ],
  },
  education: {
    name: "Education",
    institutions: [
      "Ministry of Education",
      "Public Schools",
      "Universities",
      "Technical Colleges",
    ],
  },
  transportation: {
    name: "Transportation",
    institutions: [
      "Transport Authority",
      "Traffic Police",
      "Public Transit",
      "Road Maintenance",
    ],
  },
  "public-safety": {
    name: "Public Safety",
    institutions: [
      "Police Department",
      "Fire Department",
      "Emergency Services",
      "Security Forces",
    ],
  },
  employment: {
    name: "Employment Services",
    institutions: [
      "Labor Department",
      "Employment Centers",
      "Skills Development",
      "Job Placement",
    ],
  },
  housing: {
    name: "Housing & Urban Planning",
    institutions: [
      "Housing Authority",
      "Urban Planning",
      "Building Permits",
      "City Council",
    ],
  },
  "social-services": {
    name: "Social Services",
    institutions: [
      "Social Welfare",
      "Community Centers",
      "Support Programs",
      "Family Services",
    ],
  },
  utilities: {
    name: "Public Utilities",
    institutions: [
      "Water Authority",
      "Electric Company",
      "Waste Management",
      "Gas Services",
    ],
  },
  environment: {
    name: "Environment",
    institutions: [
      "Environmental Agency",
      "Parks Department",
      "Conservation",
      "Wildlife Protection",
    ],
  },
  legal: {
    name: "Legal & Justice",
    institutions: [
      "Court System",
      "Legal Aid",
      "Justice Department",
      "Public Prosecutor",
    ],
  },
  municipal: {
    name: "Municipal Services",
    institutions: [
      "City Hall",
      "Municipal Offices",
      "Local Government",
      "Public Works",
    ],
  },
};

export default function FeedbackPage() {
  const [searchParams] = useSearchParams();
  const { service: serviceParam } = useParams();
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isGeneralFeedback, setIsGeneralFeedback] = useState(false);

  useEffect(() => {
    let service = serviceParam;
    if (!service) service = searchParams.get("service");

    if (!service) {
      setIsGeneralFeedback(true);
      return;
    }

    const serviceMapping: Record<string, string> = {
      "police-abuse": "public-safety",
      "health-services": "health",
      "education-services": "education",
      "transport-issues": "transportation",
      "employment-services": "employment",
      "housing-issues": "housing",
      "social-services": "social-services",
      "utility-issues": "utilities",
      "environmental-issues": "environment",
      "legal-issues": "legal",
      "municipal-services": "municipal",
    };

    const mappedService = serviceMapping[service] || service;

    if (serviceData[mappedService as keyof typeof serviceData]) {
      setTimeout(() => {
        setSelectedSector(mappedService);
        setIsGeneralFeedback(false);
      }, 0);
    }
  }, [searchParams, serviceParam]);

  const availableInstitutions = selectedSector
    ? serviceData[selectedSector as keyof typeof serviceData]?.institutions
    : [];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const token = auth.getToken();

    if (!token) {
      setError("You need to be logged in to submit feedback.");
      return;
    }

    if (isGeneralFeedback) {
      if (rating === 0 || !comment.trim()) {
        setError("Please provide a rating and comment for general feedback.");
        return;
      }
    } else if (
      !selectedSector ||
      !selectedInstitution ||
      rating === 0 ||
      !comment.trim()
    ) {
      setError("Please fill all required fields and provide a rating.");
      return;
    }

    setSubmitting(true);
    try {
      const form = new FormData();
      form.append("comment", comment);
      form.append("rating", String(rating));
      form.append("sector", selectedSector);
      form.append("institution", selectedInstitution);
      if (files) {
        Array.from(files).forEach((f) => form.append("feedbackFiles", f));
      }

      await FeedbackApi.submit(form, token);
      setSuccess("Feedback submitted successfully!");
      setComment("");
      setFiles(null);
      setRating(0);
    } catch (err) {
      console.log("API failed, saving locally...");
      const feedbackEntry = {
        id: Date.now().toString(),
        sector: selectedSector,
        institution: selectedInstitution,
        comment,
        rating,
        timestamp: new Date().toISOString(),
        userId:
          JSON.parse(atob(token.split(".")[1] || "{}")).userId || "unknown",
      };

      const existing = JSON.parse(
        localStorage.getItem("mock_feedback") || "[]"
      );
      existing.push(feedbackEntry);
      localStorage.setItem("mock_feedback", JSON.stringify(existing));

      setSuccess("Feedback submitted locally.");
      setComment("");
      setFiles(null);
      setRating(0);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                CivicVoice
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Et
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isGeneralFeedback
                ? "Submit General Feedback"
                : "Submit Feedback"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {isGeneralFeedback
                ? "Share your general feedback about government services"
                : "Share your conversation with gov't institution"}
            </p>
          </div>

          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Sector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose Sector{" "}
                {!isGeneralFeedback && <span className="text-red-500">*</span>}
                {isGeneralFeedback && (
                  <span className="text-gray-500 text-xs dark:text-gray-400">
                    (Optional)
                  </span>
                )}
              </label>

              {selectedSector && (
                <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Selected: {serviceData[selectedSector].name}
                    </span>
                  </div>
                </div>
              )}

              <Select
                key={selectedSector}
                value={selectedSector}
                onValueChange={(value) => {
                  setSelectedSector(value);
                  setSelectedInstitution("");
                }}
              >
                <SelectTrigger className="w-full h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg">
                  <SelectValue
                    placeholder="Select a sector"
                    className="text-gray-900 dark:text-gray-100"
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(serviceData).map(([key, service]) => (
                    <SelectItem key={key} value={key}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose Institution{" "}
                {!isGeneralFeedback && <span className="text-red-500">*</span>}
                {isGeneralFeedback && (
                  <span className="text-gray-500 text-xs dark:text-gray-400">
                    (Optional)
                  </span>
                )}
              </label>

              <Select
                value={selectedInstitution}
                onValueChange={setSelectedInstitution}
                disabled={!selectedSector}
              >
                <SelectTrigger className="w-full h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg">
                  <SelectValue
                    placeholder={
                      selectedSector
                        ? "Select an institution"
                        : "Select a sector first"
                    }
                    className="text-gray-900 dark:text-gray-100"
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableInstitutions.map((inst) => (
                    <SelectItem key={inst} value={inst}>
                      {inst}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe the issue in detail{" "}
                <span className="text-red-500">*</span>
              </label>
              <Textarea
                className="w-full h-32 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg resize-none"
                placeholder="Describe the issue..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Files */}
            <div>
              <label
                className="flex items-center gap-2 h-12 px-6 
                border border-gray-300 dark:border-gray-600 
                rounded-lg bg-transparent dark:bg-gray-700 
                text-gray-700 dark:text-gray-200 cursor-pointer w-fit"
              >
                <Upload className="h-4 w-4" />
                <span>Select files</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </label>

              {files && files.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {files.length} file(s) selected
                </div>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Rate your experience <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 hover:scale-110 transition-transform"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                  >
                    <Star
                      className={`h-6 w-6 transition-colors ${
                        star <= (hoveredStar || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm text-green-600 dark:text-green-400">
                {success}
              </div>
            )}

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-12 
                  bg-blue-600 hover:bg-blue-700 
                  dark:bg-blue-700 dark:hover:bg-blue-800 
                  text-white font-medium rounded-lg"
              >
                {submitting ? "Submitting..." : "Submit feedback"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
