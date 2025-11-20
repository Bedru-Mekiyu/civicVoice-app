import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import {
  Home,
  HelpCircle,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  Settings,
  HelpCircleIcon,
  Shield,
  Camera,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthApi } from "@/lib/api";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Navigation() {
  const { t, translate } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate(); // ← Now correctly imported
  const isLoggedIn = !!auth.getToken();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const currentUser = useMemo(() => {
    const token = auth.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")?.[1] || ""));
      return payload || null;
    } catch {
      return null;
    }
  }, []);

  const avatarUrl = currentUser?.avatar
    ? `${API_BASE_URL}${currentUser.avatar}`
    : null;

  const getUserInitials = (name?: string, email?: string) => {
    if (name) {
      const parts = name.split(" ");
      if (parts.length >= 2)
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return name.substring(0, 2).toUpperCase();
    }
    return email?.substring(0, 2).toUpperCase() || "U";
  };

  const isAdmin = currentUser?.isAdmin;

  const handleLogout = () => {
    auth.clear();
    navigate("/login");
  };

  const uploadAvatar = async (file: File) => {
    if (!file.type.startsWith("image/")) return alert("Please select an image");
    if (file.size > 10 * 1024 * 1024) return alert("Max 10MB");

    const token = auth.getToken();
    if (!token) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      const result = await AuthApi.uploadAvatar(formData, token);
      if (result?.token) {
        auth.setToken(result.token);
        window.location.reload();
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: t("nav.home"), icon: Home },
    { path: "/listings", label: t("nav.services"), icon: FileText },
    { path: "/faq", label: t("nav.faq"), icon: HelpCircle },
    ...(isLoggedIn
      ? [
          {
            path: isAdmin ? "/dashboard" : "/citizen-dashboard",
            label: t("nav.dashboard"),
            icon: LayoutDashboard,
          },
        ]
      : []),
  ];

  // Clickable Avatar Only (no name anywhere on navbar)
  const AvatarOnly = () => (
    <div className="relative group">
      <Avatar className="h-9 w-9 border-2 border-primary/20 transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:scale-110">
        <AvatarImage src={avatarUrl || undefined} alt="Profile" />
        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold text-sm">
          {getUserInitials(currentUser?.name, currentUser?.email)}
        </AvatarFallback>
      </Avatar>

      <label className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
        {uploading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
        ) : (
          <Camera className="h-5 w-5 text-white" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && uploadAvatar(e.target.files[0])
          }
          disabled={uploading}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );

  return (
    <header className="bg-gradient-to-r from-card via-card to-card/95 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center group">
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                {t("landing.title")} {t("landing.subtitle")}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className="gap-2 transition-all duration-200 hover:scale-105"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector variant="compact" />

            {isLoggedIn ? (
              <>
                {/* Desktop: Only Avatar (no name) */}
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="focus:outline-none">
                        <AvatarOnly />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">
                            {currentUser?.name ||
                              translate("nav.user_placeholder", "User")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {currentUser?.email}
                          </p>
                          {isAdmin && (
                            <div className="flex items-center gap-1 mt-1">
                              <Shield className="w-3 h-3 text-primary" />
                              <span className="text-xs text-primary font-semibold">
                                {t("settings.admin")}
                              </span>
                            </div>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        {translate("nav.profile", "View Profile")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(
                            isAdmin ? "/dashboard" : "/citizen-dashboard"
                          )
                        }
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        {t("nav.dashboard")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/settings")}>
                        <Settings className="mr-2 h-4 w-4" />
                        {translate("nav.settings", "Settings")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/help-center")}
                      >
                        <HelpCircleIcon className="mr-2 h-4 w-4" />
                        {translate("nav.help", "Help & Support")}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        {t("nav.logout")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Mobile: Only Avatar */}
                <div className="md:hidden">
                  <AvatarOnly />
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button
                  size="sm"
                  className="transition-all duration-200 hover:scale-105"
                >
                  {t("nav.citizen_signin")}
                </Button>
              </Link>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {t("landing.title")} {t("landing.subtitle")}
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant={isActive(item.path) ? "default" : "ghost"}
                        className="w-full justify-start gap-3 h-12"
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}

                  {isLoggedIn && (
                    <>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center gap-3 px-3 py-2 mb-4">
                          <AvatarOnly />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {currentUser?.name || "User"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {currentUser?.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-12"
                        >
                          <User className="w-5 h-5" />
                          Profile
                        </Button>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-12"
                        >
                          <Settings className="w-5 h-5" />
                          Settings
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full justify-start gap-3 h-12 text-destructive"
                      >
                        <LogOut className="w-5 h-5" />
                        {t("nav.logout")}
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
