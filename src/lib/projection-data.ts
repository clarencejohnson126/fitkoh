// FitKoh & Lionheart Samui — 3-Year AI Impact Projection Data
// All amounts in THB (Thai Baht)
// NOTE: No setup/implementation costs shown — those are separate negotiations

export interface ServiceProjection {
  name: string;
  category: string;
  monthlyImpact: { year1: number; year2: number; year3: number };
  annualImpact: { year1: number; year2: number; year3: number };
  description: string;
  kpiName: string;
  kpiUnit: string;
}

export interface YearSummary {
  year: number;
  grossImpact: number;
  monthlyAverage: number;
}

export interface MonthlyBreakdown {
  service: string;
  months: number[]; // 36 months
}

export interface ProjectionData {
  services: ServiceProjection[];
  yearSummaries: YearSummary[];
  monthlyBreakdowns: MonthlyBreakdown[];
  cumulative: {
    grossImpact: number;
    monthlyAvgY3: number;
  };
  currency: string;
}

const SERVICES_RAW = [
  {
    name: 'AI Booking Chatbot',
    category: 'Revenue Recovery',
    monthlyImpactY1: 180_000,
    description: '24/7 multilingual guest assistant recovering lost bookings from delayed responses',
    kpiName: 'Recovered bookings',
    kpiUnit: 'bookings/month',
  },
  {
    name: 'Automated Booking & Payments',
    category: 'Operational Efficiency',
    monthlyImpactY1: 85_000,
    description: 'Frictionless online booking reducing no-shows and freeing staff time',
    kpiName: 'Staff hours saved',
    kpiUnit: 'hours/month',
  },
  {
    name: 'AI Video Content Factory',
    category: 'Content & Marketing',
    monthlyImpactY1: 130_000,
    description: 'Automated social content from training footage — clips, captions, multi-language',
    kpiName: 'Content pieces produced',
    kpiUnit: 'posts/month',
  },
  {
    name: 'Multilingual Content & Avatars',
    category: 'Market Expansion',
    monthlyImpactY1: 200_000,
    description: 'AI-translated content and HeyGen avatars opening German, Russian, French markets',
    kpiName: 'New market bookings',
    kpiUnit: 'bookings/month',
  },
  {
    name: 'Ads Automation',
    category: 'Marketing Optimization',
    monthlyImpactY1: 95_000,
    description: 'AI-written multi-language ads with automated targeting and spend optimization',
    kpiName: 'Ad spend efficiency gain',
    kpiUnit: '%',
  },
  {
    name: 'AEO / GEO Optimization',
    category: 'Search Visibility',
    monthlyImpactY1: 75_000,
    description: 'Content optimized for AI search (ChatGPT, Perplexity, Google AI Overviews)',
    kpiName: 'AI search referral bookings',
    kpiUnit: 'bookings/month',
  },
  {
    name: 'Staff & Ops Dashboard',
    category: 'Operational Efficiency',
    monthlyImpactY1: 60_000,
    description: 'Automated scheduling, task management, and meal planning from booking data',
    kpiName: 'Management hours saved',
    kpiUnit: 'hours/month',
  },
  {
    name: 'Construction Project Tracker',
    category: 'Cost Avoidance',
    monthlyImpactY1: 150_000,
    description: 'AI project management preventing costly delays during accommodation expansion',
    kpiName: 'Delay cost prevented',
    kpiUnit: 'THB/month',
  },
];

// Growth: ramp-up in Y1 (starts at 50%, reaches 100% by month 6),
// Y2 = 1.3x steady state, Y3 = 1.2x of Y2
const Y2_MULTIPLIER = 1.3;
const Y3_MULTIPLIER = 1.2;

// Ramp-up curve for Year 1: month 1=40%, 2=55%, 3=70%, 4=80%, 5=90%, 6+=100%
const RAMP_UP = [0.4, 0.55, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

export function getProjectionData(): ProjectionData {
  const services: ServiceProjection[] = SERVICES_RAW.map((s) => {
    const monthlyY1 = s.monthlyImpactY1;
    const monthlyY2 = Math.round(monthlyY1 * Y2_MULTIPLIER);
    const monthlyY3 = Math.round(monthlyY2 * Y3_MULTIPLIER);

    // Y1 annual accounts for ramp-up
    const annualY1 = RAMP_UP.reduce((sum, factor) => sum + Math.round(monthlyY1 * factor), 0);
    const annualY2 = monthlyY2 * 12;
    const annualY3 = monthlyY3 * 12;

    return {
      name: s.name,
      category: s.category,
      monthlyImpact: { year1: monthlyY1, year2: monthlyY2, year3: monthlyY3 },
      annualImpact: { year1: annualY1, year2: annualY2, year3: annualY3 },
      description: s.description,
      kpiName: s.kpiName,
      kpiUnit: s.kpiUnit,
    };
  });

  // Generate 36-month breakdown for each service
  const monthlyBreakdowns: MonthlyBreakdown[] = SERVICES_RAW.map((s) => {
    const months: number[] = [];
    // Year 1: ramp-up
    for (let m = 0; m < 12; m++) {
      months.push(Math.round(s.monthlyImpactY1 * RAMP_UP[m]));
    }
    // Year 2: steady at 1.3x
    const y2Monthly = Math.round(s.monthlyImpactY1 * Y2_MULTIPLIER);
    for (let m = 0; m < 12; m++) {
      months.push(y2Monthly);
    }
    // Year 3: steady at 1.3x * 1.2x
    const y3Monthly = Math.round(y2Monthly * Y3_MULTIPLIER);
    for (let m = 0; m < 12; m++) {
      months.push(y3Monthly);
    }
    return { service: s.name, months };
  });

  const yearSummaries: YearSummary[] = [1, 2, 3].map((year) => {
    const key = `year${year}` as 'year1' | 'year2' | 'year3';
    const grossImpact = services.reduce((sum, s) => sum + s.annualImpact[key], 0);
    const monthlyAverage = Math.round(grossImpact / 12);
    return { year, grossImpact, monthlyAverage };
  });

  const cumulativeGross = yearSummaries.reduce((sum, y) => sum + y.grossImpact, 0);

  return {
    services,
    yearSummaries,
    monthlyBreakdowns,
    cumulative: {
      grossImpact: cumulativeGross,
      monthlyAvgY3: yearSummaries[2].monthlyAverage,
    },
    currency: 'THB',
  };
}
