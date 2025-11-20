/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock Dashboard Data Service
// Provides realistic mock data for admin dashboard when API is unavailable

export interface DashboardData {
  metrics: {
    totalFeedback: number
    activeCitizens: number
    avgResponseTime: string
    satisfactionRate: string
  }
  citizens: Array<{
    id: string
    name: string
    email: string
    status: string
    rating: number
    submissions: number
    progress: number
    isVerified: boolean
  }>
  feedback: Array<{
    id: string
    citizen: string
    sector: string
    rating: number
    ticket: string
    comment: string
    date: string
  }>
  weeklyOrderData: Array<{ day: string; orders: number }>
  monthlyOrderData: Array<{ day: string; orders: number }>
  yearlyOrderData: Array<{ month: string; orders: number }>
  pieData: Array<{ name: string; value: number; color: string }>
  revenueData: Array<{ month: string; '2023': number; '2024': number }>
}

const generateWeeklyData = () => [
  { day: 'Mon', orders: Math.floor(Math.random() * 30) + 40 },
  { day: 'Tue', orders: Math.floor(Math.random() * 30) + 45 },
  { day: 'Wed', orders: Math.floor(Math.random() * 25) + 35 },
  { day: 'Thu', orders: Math.floor(Math.random() * 35) + 50 },
  { day: 'Fri', orders: Math.floor(Math.random() * 30) + 48 },
  { day: 'Sat', orders: Math.floor(Math.random() * 20) + 25 },
  { day: 'Sun', orders: Math.floor(Math.random() * 20) + 28 },
]

const generateMonthlyData = () => [
  { day: 'Week 1', orders: Math.floor(Math.random() * 100) + 180 },
  { day: 'Week 2', orders: Math.floor(Math.random() * 100) + 200 },
  { day: 'Week 3', orders: Math.floor(Math.random() * 80) + 190 },
  { day: 'Week 4', orders: Math.floor(Math.random() * 90) + 210 },
]

const generateYearlyData = () => [
  { month: 'Jan', orders: Math.floor(Math.random() * 200) + 600 },
  { month: 'Feb', orders: Math.floor(Math.random() * 200) + 550 },
  { month: 'Mar', orders: Math.floor(Math.random() * 200) + 700 },
  { month: 'Apr', orders: Math.floor(Math.random() * 200) + 650 },
  { month: 'May', orders: Math.floor(Math.random() * 200) + 750 },
  { month: 'Jun', orders: Math.floor(Math.random() * 200) + 680 },
  { month: 'Jul', orders: Math.floor(Math.random() * 200) + 720 },
  { month: 'Aug', orders: Math.floor(Math.random() * 200) + 690 },
  { month: 'Sep', orders: Math.floor(Math.random() * 200) + 710 },
  { month: 'Oct', orders: Math.floor(Math.random() * 200) + 730 },
  { month: 'Nov', orders: Math.floor(Math.random() * 200) + 680 },
  { month: 'Dec', orders: Math.floor(Math.random() * 200) + 750 },
]

export const mockDashboard: DashboardData = {
  metrics: {
    totalFeedback: 1247,
    activeCitizens: 856,
    avgResponseTime: '2.4h',
    satisfactionRate: '94.2%',
  },
  citizens: [
    {
      id: '1',
      name: 'Abebe Kebede',
      email: 'abebe.k@example.com',
      status: 'Verified',
      rating: 4.5,
      submissions: 12,
      progress: 85,
      isVerified: true,
    },
    {
      id: '2',
      name: 'Tigist Haile',
      email: 'tigist.h@example.com',
      status: 'Verified',
      rating: 4.8,
      submissions: 8,
      progress: 70,
      isVerified: true,
    },
    {
      id: '3',
      name: 'Dawit Tekle',
      email: 'dawit.t@example.com',
      status: 'Pending',
      rating: 4.2,
      submissions: 5,
      progress: 45,
      isVerified: false,
    },
    {
      id: '4',
      name: 'Meron Tadesse',
      email: 'meron.t@example.com',
      status: 'Verified',
      rating: 4.7,
      submissions: 15,
      progress: 95,
      isVerified: true,
    },
    {
      id: '5',
      name: 'Yonas Girma',
      email: 'yonas.g@example.com',
      status: 'Unverified',
      rating: 3.9,
      submissions: 3,
      progress: 25,
      isVerified: false,
    },
    {
      id: '6',
      name: 'Sara Bekele',
      email: 'sara.b@example.com',
      status: 'Verified',
      rating: 4.6,
      submissions: 10,
      progress: 75,
      isVerified: true,
    },
  ],
  feedback: [
    {
      id: 'fb1',
      citizen: 'Abebe Kebede',
      sector: 'Healthcare',
      rating: 4,
      ticket: 'HLT001',
      comment: 'Excellent service at the health center. Staff were professional and caring.',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fb2',
      citizen: 'Tigist Haile',
      sector: 'Education',
      rating: 5,
      ticket: 'EDU002',
      comment: 'Great improvement in school facilities. Children are learning in better conditions.',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fb3',
      citizen: 'Dawit Tekle',
      sector: 'Transport',
      rating: 3,
      ticket: 'TRP003',
      comment: 'Bus service needs improvement. Long waiting times and overcrowding.',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fb4',
      citizen: 'Meron Tadesse',
      sector: 'Healthcare',
      rating: 5,
      ticket: 'HLT004',
      comment: 'Quick response to emergency services. Very satisfied with the care.',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fb5',
      citizen: 'Yonas Girma',
      sector: 'Municipal',
      rating: 4,
      ticket: 'MUN005',
      comment: 'Efficient waste collection service. Streets are cleaner now.',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'fb6',
      citizen: 'Sara Bekele',
      sector: 'Education',
      rating: 4,
      ticket: 'EDU006',
      comment: 'New library resources are excellent. Students have access to more books.',
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  weeklyOrderData: generateWeeklyData(),
  monthlyOrderData: generateMonthlyData(),
  yearlyOrderData: generateYearlyData(),
  pieData: [
    { name: 'Healthcare', value: 35, color: '#ef4444' },
    { name: 'Education', value: 28, color: '#3b82f6' },
    { name: 'Transport', value: 22, color: '#10b981' },
    { name: 'Municipal', value: 15, color: '#f59e0b' },
  ],
  revenueData: [
    { month: 'Jan', '2023': 245, '2024': 280 },
    { month: 'Feb', '2023': 220, '2024': 265 },
    { month: 'Mar', '2023': 280, '2024': 310 },
    { month: 'Apr', '2023': 195, '2024': 240 },
    { month: 'May', '2023': 310, '2024': 340 },
    { month: 'Jun', '2023': 285, '2024': 315 },
  ],
}

export function getMockDashboard(): DashboardData {
  // Regenerate dynamic data each time for variety
  return {
    ...mockDashboard,
    weeklyOrderData: generateWeeklyData(),
    monthlyOrderData: generateMonthlyData(),
    yearlyOrderData: generateYearlyData(),
  }
}
