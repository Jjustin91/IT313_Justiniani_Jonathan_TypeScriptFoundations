export enum EnrollmentStatus {
    Passing = "PASSING",
    Probation = "PROBATION",
}

export function computeAverage(
    prelim: number,
    midterm: number,
    final: number
): number {
    const avg = (prelim + midterm + final) / 3;
    return Number(avg.toFixed(2));
}

export default function getStatus(average: number): EnrollmentStatus {
    return average >= 75 ? EnrollmentStatus.Passing : EnrollmentStatus.Probation;
}