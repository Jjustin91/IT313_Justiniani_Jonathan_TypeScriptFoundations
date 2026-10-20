import getStatus, { computeAverage, EnrollmentStatus } from "./gradeUtils.js";

export interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

export interface EligibilityReport {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
}

const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

function getEnrollees(): Promise<Enrollee[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(enrollees);
    }, 300);
  });
}

function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

function processBatchMetadata(batchId: string | number): void {
  if (typeof batchId === "number") {
    console.log(`Processing Batch ID: #${batchId.toFixed(0)}`);
  } else {
    console.log(`Processing Batch ID: ${batchId.trim().toUpperCase()}`);
  }
}

async function generateEnrollmentReport(): Promise<void> {
  try {
    const currentBatchId: string | number = "batch-2026-q1";
    processBatchMetadata(currentBatchId);

    const students = await getEnrollees();

    const reports: EligibilityReport[] = students.map((student) => {
      const average = computeAverage(student.prelim, student.midterm, student.final);
      const status = getStatus(average);

      const entry: EligibilityReport = {
        name: student.name,
        average,
        status,
      };

      if (status === EnrollmentStatus.Probation) {
        entry.remarks = "Needs consultation";
      }

      return entry;
    });

    const grouped = groupBy(reports, (r) => r.status);
    const passingCount = grouped[EnrollmentStatus.Passing]?.length ?? 0;

    const totalAverage = reports.reduce((acc, curr) => acc + curr.average, 0);
    const classAverage = (totalAverage / reports.length).toFixed(2);

    console.log("=== IT313 Enrollment Eligibility Report (TypeScript) ===");
    for (const report of reports) {
      const paddedName = report.name.padEnd(14, " ");
      const formattedAvg = report.average.toFixed(2);
      const remarksText = report.remarks ? `  ${report.remarks}` : "";
      console.log(`${paddedName} Average: ${formattedAvg}  ${report.status}${remarksText}`);
    }

    console.log();
    console.log(`Class Average: ${classAverage}`);
    console.log(`Passing: ${passingCount}/${reports.length}`);
  } catch (error) {
    console.error("Failed to generate report:", error);
  }
}

generateEnrollmentReport();