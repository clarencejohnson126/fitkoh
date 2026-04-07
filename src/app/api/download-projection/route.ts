import { NextRequest, NextResponse } from 'next/server';
import { getProjectionData } from '@/lib/projection-data';

function fmt(amount: number): string {
  return amount.toLocaleString('en-US');
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function generateXlsx(): Uint8Array {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const XLSX = require('xlsx');
  const data = getProjectionData();
  const wb = XLSX.utils.book_new();

  // ═══════════════════════════════════════════════
  // TAB 1: Executive Summary
  // ═══════════════════════════════════════════════
  const summary: (string | number | null)[][] = [
    ['FITKOH & LIONHEART SAMUI'],
    ['3-Year AI Impact Projection'],
    ['Prepared by Rebelz AI Agency — April 2026'],
    ['All amounts in Thai Baht (THB)'],
    [],
    ['EXECUTIVE SUMMARY', null, null, null, null],
    [],
    ['', 'Year 1', 'Year 2', 'Year 3', '3-Year Total'],
    [
      'Total Estimated Impact',
      data.yearSummaries[0].grossImpact,
      data.yearSummaries[1].grossImpact,
      data.yearSummaries[2].grossImpact,
      data.cumulative.grossImpact,
    ],
    [
      'Monthly Average',
      data.yearSummaries[0].monthlyAverage,
      data.yearSummaries[1].monthlyAverage,
      data.yearSummaries[2].monthlyAverage,
      Math.round(data.cumulative.grossImpact / 36),
    ],
    [],
    ['IMPACT BY SERVICE', null, null, null, null],
    [],
    ['Service', 'Category', 'Year 1', 'Year 2', 'Year 3', '3-Year Total'],
  ];

  for (const s of data.services) {
    const total3yr = s.annualImpact.year1 + s.annualImpact.year2 + s.annualImpact.year3;
    summary.push([s.name, s.category, s.annualImpact.year1, s.annualImpact.year2, s.annualImpact.year3, total3yr]);
  }

  summary.push([]);
  summary.push([
    'TOTAL',
    '',
    data.yearSummaries[0].grossImpact,
    data.yearSummaries[1].grossImpact,
    data.yearSummaries[2].grossImpact,
    data.cumulative.grossImpact,
  ]);

  summary.push([]);
  summary.push([]);
  summary.push(['GROWTH ASSUMPTIONS']);
  summary.push(['Year 1: Ramp-up period (40% month 1 → 100% by month 6)']);
  summary.push(['Year 2: 30% growth over Year 1 steady state (established systems, more data)']);
  summary.push(['Year 3: 20% growth over Year 2 (compound improvements, market position)']);
  summary.push([]);
  summary.push(['Note: These are conservative estimates based on industry benchmarks for fitness camps.']);
  summary.push(['Actual results depend on implementation quality and market conditions.']);

  const wsSummary = XLSX.utils.aoa_to_sheet(summary);
  wsSummary['!cols'] = [
    { wch: 36 }, { wch: 24 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 20 },
  ];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Executive Summary');

  // ═══════════════════════════════════════════════
  // TAB 2: Monthly Breakdown — Year 1
  // ═══════════════════════════════════════════════
  const y1Monthly: (string | number | null)[][] = [
    ['YEAR 1 — MONTHLY IMPACT BREAKDOWN'],
    ['Includes ramp-up: 40% Month 1 → 100% by Month 6'],
    [],
    ['Service', ...MONTHS.map(m => `${m} 2026`), 'Year 1 Total'],
  ];

  const y1Totals = new Array(12).fill(0);
  for (const mb of data.monthlyBreakdowns) {
    const y1Months = mb.months.slice(0, 12);
    const y1Total = y1Months.reduce((a, b) => a + b, 0);
    y1Monthly.push([mb.service, ...y1Months, y1Total]);
    y1Months.forEach((v, i) => { y1Totals[i] += v; });
  }

  y1Monthly.push([]);
  y1Monthly.push(['MONTHLY TOTAL', ...y1Totals, y1Totals.reduce((a, b) => a + b, 0)]);
  y1Monthly.push([]);
  y1Monthly.push(['CUMULATIVE TOTAL', ...y1Totals.reduce<number[]>((acc, val) => {
    acc.push((acc.length > 0 ? acc[acc.length - 1] : 0) + val);
    return acc;
  }, []), y1Totals.reduce((a, b) => a + b, 0)]);

  const wsY1 = XLSX.utils.aoa_to_sheet(y1Monthly);
  wsY1['!cols'] = [{ wch: 36 }, ...new Array(13).fill({ wch: 14 })];
  XLSX.utils.book_append_sheet(wb, wsY1, 'Year 1 Monthly');

  // ═══════════════════════════════════════════════
  // TAB 3: Monthly Breakdown — Year 2
  // ═══════════════════════════════════════════════
  const y2Monthly: (string | number | null)[][] = [
    ['YEAR 2 — MONTHLY IMPACT BREAKDOWN'],
    ['Steady state at 1.3x Year 1 rate'],
    [],
    ['Service', ...MONTHS.map(m => `${m} 2027`), 'Year 2 Total'],
  ];

  const y2Totals = new Array(12).fill(0);
  for (const mb of data.monthlyBreakdowns) {
    const y2Months = mb.months.slice(12, 24);
    const y2Total = y2Months.reduce((a, b) => a + b, 0);
    y2Monthly.push([mb.service, ...y2Months, y2Total]);
    y2Months.forEach((v, i) => { y2Totals[i] += v; });
  }

  y2Monthly.push([]);
  y2Monthly.push(['MONTHLY TOTAL', ...y2Totals, y2Totals.reduce((a, b) => a + b, 0)]);
  y2Monthly.push([]);

  // Cumulative from Y1 + Y2
  const y1AnnualTotal = y1Totals.reduce((a, b) => a + b, 0);
  y2Monthly.push(['CUMULATIVE TOTAL (incl. Y1)', ...y2Totals.reduce<number[]>((acc, val) => {
    acc.push((acc.length > 0 ? acc[acc.length - 1] : y1AnnualTotal) + val);
    return acc;
  }, []), y1AnnualTotal + y2Totals.reduce((a, b) => a + b, 0)]);

  const wsY2 = XLSX.utils.aoa_to_sheet(y2Monthly);
  wsY2['!cols'] = [{ wch: 36 }, ...new Array(13).fill({ wch: 14 })];
  XLSX.utils.book_append_sheet(wb, wsY2, 'Year 2 Monthly');

  // ═══════════════════════════════════════════════
  // TAB 4: Monthly Breakdown — Year 3
  // ═══════════════════════════════════════════════
  const y3Monthly: (string | number | null)[][] = [
    ['YEAR 3 — MONTHLY IMPACT BREAKDOWN'],
    ['Steady state at 1.2x Year 2 rate'],
    [],
    ['Service', ...MONTHS.map(m => `${m} 2028`), 'Year 3 Total'],
  ];

  const y3Totals = new Array(12).fill(0);
  for (const mb of data.monthlyBreakdowns) {
    const y3Months = mb.months.slice(24, 36);
    const y3Total = y3Months.reduce((a, b) => a + b, 0);
    y3Monthly.push([mb.service, ...y3Months, y3Total]);
    y3Months.forEach((v, i) => { y3Totals[i] += v; });
  }

  y3Monthly.push([]);
  y3Monthly.push(['MONTHLY TOTAL', ...y3Totals, y3Totals.reduce((a, b) => a + b, 0)]);
  y3Monthly.push([]);

  const y2AnnualTotal = y2Totals.reduce((a, b) => a + b, 0);
  y3Monthly.push(['CUMULATIVE TOTAL (incl. Y1-Y2)', ...y3Totals.reduce<number[]>((acc, val) => {
    acc.push((acc.length > 0 ? acc[acc.length - 1] : y1AnnualTotal + y2AnnualTotal) + val);
    return acc;
  }, []), y1AnnualTotal + y2AnnualTotal + y3Totals.reduce((a, b) => a + b, 0)]);

  const wsY3 = XLSX.utils.aoa_to_sheet(y3Monthly);
  wsY3['!cols'] = [{ wch: 36 }, ...new Array(13).fill({ wch: 14 })];
  XLSX.utils.book_append_sheet(wb, wsY3, 'Year 3 Monthly');

  // ═══════════════════════════════════════════════
  // TAB 5: Service Detail Cards
  // ═══════════════════════════════════════════════
  const serviceDetail: (string | number | null)[][] = [
    ['SERVICE DETAIL — HOW EACH NUMBER IS CALCULATED'],
    [],
  ];

  for (const s of data.services) {
    const total3yr = s.annualImpact.year1 + s.annualImpact.year2 + s.annualImpact.year3;
    serviceDetail.push([s.name]);
    serviceDetail.push(['Category', s.category]);
    serviceDetail.push(['Description', s.description]);
    serviceDetail.push(['Key Metric', s.kpiName]);
    serviceDetail.push([]);
    serviceDetail.push(['', 'Monthly (steady)', 'Annual', '3-Year']);
    serviceDetail.push(['Year 1', s.monthlyImpact.year1, s.annualImpact.year1, null]);
    serviceDetail.push(['Year 2', s.monthlyImpact.year2, s.annualImpact.year2, null]);
    serviceDetail.push(['Year 3', s.monthlyImpact.year3, s.annualImpact.year3, total3yr]);
    serviceDetail.push([]);
    serviceDetail.push([]);
  }

  const wsDetail = XLSX.utils.aoa_to_sheet(serviceDetail);
  wsDetail['!cols'] = [{ wch: 36 }, { wch: 20 }, { wch: 18 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsDetail, 'Service Details');

  // ═══════════════════════════════════════════════
  // TAB 6: Full 36-Month Timeline
  // ═══════════════════════════════════════════════
  const timeline: (string | number | null)[][] = [
    ['FULL 36-MONTH IMPACT TIMELINE'],
    ['All services combined — month by month'],
    [],
  ];

  // Header row: Month 1-36
  const headerRow: (string | number)[] = ['Month'];
  for (let y = 0; y < 3; y++) {
    for (let m = 0; m < 12; m++) {
      headerRow.push(`${MONTHS[m]} ${2026 + y}`);
    }
  }
  timeline.push(headerRow);

  // Each service row
  const allMonthTotals = new Array(36).fill(0);
  for (const mb of data.monthlyBreakdowns) {
    timeline.push([mb.service, ...mb.months]);
    mb.months.forEach((v, i) => { allMonthTotals[i] += v; });
  }

  timeline.push([]);
  timeline.push(['MONTHLY TOTAL', ...allMonthTotals]);

  // Cumulative row
  const cumulativeRow: (string | number)[] = ['CUMULATIVE TOTAL'];
  let running = 0;
  for (const val of allMonthTotals) {
    running += val;
    cumulativeRow.push(running);
  }
  timeline.push(cumulativeRow);

  // Quarterly summaries
  timeline.push([]);
  timeline.push(['QUARTERLY SUMMARY']);
  const quarterRow: (string | number)[] = ['Quarter'];
  const quarterVals: (string | number)[] = ['Total'];
  for (let q = 0; q < 12; q++) {
    const start = q * 3;
    const qTotal = allMonthTotals[start] + allMonthTotals[start + 1] + allMonthTotals[start + 2];
    quarterRow.push(`Q${(q % 4) + 1} ${2026 + Math.floor(q / 4)}`);
    quarterVals.push(qTotal);
  }
  timeline.push(quarterRow);
  timeline.push(quarterVals);

  const wsTimeline = XLSX.utils.aoa_to_sheet(timeline);
  wsTimeline['!cols'] = [{ wch: 36 }, ...new Array(36).fill({ wch: 13 })];
  XLSX.utils.book_append_sheet(wb, wsTimeline, '36-Month Timeline');

  // ═══════════════════════════════════════════════
  // TAB 7: Assumptions & Methodology
  // ═══════════════════════════════════════════════
  const assumptions: (string | number | null)[][] = [
    ['ASSUMPTIONS & METHODOLOGY'],
    [],
    ['Growth Model'],
    ['Year 1', 'Ramp-up period: 40% capacity in Month 1, scaling to 100% by Month 6'],
    ['Year 2', '30% improvement over Year 1 steady-state (more data, established processes, compound effects)'],
    ['Year 3', '20% improvement over Year 2 (market position, brand recognition, operational maturity)'],
    [],
    ['Revenue Recovery Assumptions'],
    ['Monthly inquiries', '60 (based on typical fitness camp in Koh Samui)'],
    ['Lost to slow response', '30% (industry benchmark for manual-response businesses)'],
    ['Average booking value', '25,000 THB (weighted average across program tiers)'],
    ['Recovery rate with AI', '40% of previously lost leads'],
    [],
    ['Operational Efficiency Assumptions'],
    ['Staff time value', '625 THB/hour (based on Thai hospitality management wages)'],
    ['Admin hours saved (booking)', '40 hours/month'],
    ['Management hours saved (ops)', '15 hours/month for owner, 25 hours total for team'],
    [],
    ['Market Expansion Assumptions'],
    ['Non-English market potential', 'German, Russian, French, Japanese audiences'],
    ['Incremental bookings from new markets', '8/month (conservative for global fitness tourism)'],
    [],
    ['Content & Ads Assumptions'],
    ['Current content production cost', '50,000+ THB/month (videographer + editor)'],
    ['Monthly ad spend', '250,000 THB across Google + Meta'],
    ['ROAS improvement from AI optimization', '20%'],
    [],
    ['Construction Assumptions'],
    ['Average monthly delay cost', '300,000 THB (based on Thai construction benchmarks)'],
    ['Preventable delays with AI tracking', '50%'],
    [],
    [],
    ['DISCLAIMER'],
    ['All figures are conservative estimates based on industry benchmarks and publicly available data.'],
    ['Actual results will vary based on implementation quality, market conditions, and team adoption.'],
    ['This projection does not constitute a guarantee of financial outcomes.'],
    [],
    ['Prepared by Rebelz AI Agency — April 2026'],
  ];

  const wsAssumptions = XLSX.utils.aoa_to_sheet(assumptions);
  wsAssumptions['!cols'] = [{ wch: 40 }, { wch: 70 }];
  XLSX.utils.book_append_sheet(wb, wsAssumptions, 'Assumptions');

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
  return new Uint8Array(buf);
}

function generatePdf(): Uint8Array {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { jsPDF } = require('jspdf');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const autoTable = require('jspdf-autotable').default || require('jspdf-autotable');

  const data = getProjectionData();
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('FitKoh & Lionheart Samui', 148, 18, { align: 'center' });
  doc.setFontSize(14);
  doc.text('3-Year AI Impact Projection', 148, 26, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Prepared by Rebelz AI Agency — April 2026  |  All amounts in THB', 148, 33, { align: 'center' });

  // Summary Table
  const summaryHead = [['', 'Year 1', 'Year 2', 'Year 3', '3-Year Total']];
  const summaryBody = [
    [
      'Total Impact',
      fmt(data.yearSummaries[0].grossImpact),
      fmt(data.yearSummaries[1].grossImpact),
      fmt(data.yearSummaries[2].grossImpact),
      fmt(data.cumulative.grossImpact),
    ],
    [
      'Monthly Average',
      fmt(data.yearSummaries[0].monthlyAverage),
      fmt(data.yearSummaries[1].monthlyAverage),
      fmt(data.yearSummaries[2].monthlyAverage),
      fmt(Math.round(data.cumulative.grossImpact / 36)),
    ],
  ];

  autoTable(doc, {
    startY: 40,
    head: summaryHead,
    body: summaryBody,
    theme: 'grid',
    headStyles: { fillColor: [0, 153, 102], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 40 },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right', fontStyle: 'bold' },
    },
    margin: { left: 14, right: 14 },
  });

  // Service Breakdown Table
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastY = ((doc as any).lastAutoTable?.finalY as number) ?? 65;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Impact by Service', 14, lastY + 10);

  const serviceHead = [['Service', 'Category', 'Monthly (Y1)', 'Annual Y1', 'Annual Y2', 'Annual Y3', '3-Year Total']];
  const serviceBody = data.services.map((s) => {
    const total = s.annualImpact.year1 + s.annualImpact.year2 + s.annualImpact.year3;
    return [
      s.name,
      s.category,
      fmt(s.monthlyImpact.year1),
      fmt(s.annualImpact.year1),
      fmt(s.annualImpact.year2),
      fmt(s.annualImpact.year3),
      fmt(total),
    ];
  });

  // Add total row
  serviceBody.push([
    'TOTAL', '',
    fmt(data.services.reduce((s, sv) => s + sv.monthlyImpact.year1, 0)),
    fmt(data.yearSummaries[0].grossImpact),
    fmt(data.yearSummaries[1].grossImpact),
    fmt(data.yearSummaries[2].grossImpact),
    fmt(data.cumulative.grossImpact),
  ]);

  autoTable(doc, {
    startY: lastY + 14,
    head: serviceHead,
    body: serviceBody,
    theme: 'grid',
    headStyles: { fillColor: [0, 153, 102], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 42 },
      1: { cellWidth: 30 },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right' },
      5: { halign: 'right' },
      6: { halign: 'right', fontStyle: 'bold' },
    },
    margin: { left: 14, right: 14 },
  });

  // Page 2: Year 1 Monthly Breakdown
  doc.addPage();
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Year 1 — Monthly Impact Breakdown (THB)', 14, 16);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Includes ramp-up period: 40% in Month 1 → 100% by Month 6', 14, 22);

  const y1Head = [['Service', ...MONTHS, 'Total']];
  const y1Body = data.monthlyBreakdowns.map((mb) => {
    const y1 = mb.months.slice(0, 12);
    return [mb.service, ...y1.map(fmt), fmt(y1.reduce((a, b) => a + b, 0))];
  });

  // Total row
  const y1ColTotals = new Array(12).fill(0);
  data.monthlyBreakdowns.forEach(mb => {
    mb.months.slice(0, 12).forEach((v, i) => { y1ColTotals[i] += v; });
  });
  y1Body.push(['TOTAL', ...y1ColTotals.map(fmt), fmt(y1ColTotals.reduce((a, b) => a + b, 0))]);

  autoTable(doc, {
    startY: 26,
    head: y1Head,
    body: y1Body,
    theme: 'grid',
    headStyles: { fillColor: [0, 153, 102], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 6 },
    bodyStyles: { fontSize: 6 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 36 } },
    margin: { left: 8, right: 8 },
  });

  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.text(
      'Conservative estimates. Actual results depend on implementation and market conditions. | Rebelz AI Agency — April 2026',
      148, pageHeight - 6, { align: 'center' }
    );
    doc.text(`Page ${i} of ${pageCount}`, 280, pageHeight - 6, { align: 'right' });
  }

  const arrayBuf = doc.output('arraybuffer') as ArrayBuffer;
  return new Uint8Array(arrayBuf);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format')?.toLowerCase();

  if (format === 'xlsx') {
    try {
      const buf = generateXlsx();
      return new NextResponse(buf as unknown as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename="FitKoh-AI-Impact-Projection-3Year.xlsx"',
        },
      });
    } catch (err) {
      console.error('XLSX generation error:', err);
      return NextResponse.json({ error: 'Failed to generate XLSX' }, { status: 500 });
    }
  }

  if (format === 'pdf') {
    try {
      const buf = generatePdf();
      return new NextResponse(buf as unknown as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="FitKoh-AI-Impact-Projection-3Year.pdf"',
        },
      });
    } catch (err) {
      console.error('PDF generation error:', err);
      return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
    }
  }

  return NextResponse.json(
    { error: 'Invalid format. Use ?format=pdf or ?format=xlsx' },
    { status: 400 }
  );
}
