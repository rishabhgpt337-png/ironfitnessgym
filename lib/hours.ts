import { hours, type DayHours, type Weekday } from "@/data/gym";

export const WEEKDAYS: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const WEEKDAY_SHORT: Record<Weekday, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

export type GymStatus = {
  isOpen: boolean;
  weekday: Weekday;
  todayLabel: string;
  message: string;
  today: DayHours;
};

export function timeToMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime12(value: string): string {
  const [rawHour, rawMinute] = value.split(":").map(Number);
  const hour = rawHour % 12 || 12;
  const suffix = rawHour >= 12 ? "PM" : "AM";
  return `${hour}:${String(rawMinute).padStart(2, "0")} ${suffix}`;
}

export function formatRange(day: DayHours): string {
  if (day.closed) return "Closed";
  return `${formatTime12(day.open)} – ${formatTime12(day.close)}`;
}

/** Current wall-clock time in Asia/Kolkata (IST), independent of the visitor's timezone. */
export function getKolkataNow(date = new Date()): { weekday: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekdayRaw = get("weekday").toLowerCase();
  const weekday = (WEEKDAYS.find((day) => day === weekdayRaw) ?? "monday") as Weekday;
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));

  return { weekday, minutes };
}

export function getOpenStatus(date = new Date()): GymStatus {
  const { weekday, minutes } = getKolkataNow(date);
  const today = hours[weekday];
  const open = timeToMinutes(today.open);
  const close = timeToMinutes(today.close);

  if (!today.closed && minutes >= open && minutes < close) {
    return {
      isOpen: true,
      weekday,
      todayLabel: WEEKDAY_LABELS[weekday],
      message: `Closes at ${formatTime12(today.close)}`,
      today,
    };
  }

  for (let offset = 0; offset < 8; offset += 1) {
    const day = WEEKDAYS[(WEEKDAYS.indexOf(weekday) + offset) % 7];
    const candidate = hours[day];
    if (candidate.closed) continue;

    const candidateOpen = timeToMinutes(candidate.open);
    if (offset === 0 && candidateOpen <= minutes) continue;

    const dayLabel =
      offset === 0 ? "today" : offset === 1 ? "tomorrow" : WEEKDAY_LABELS[day];

    return {
      isOpen: false,
      weekday,
      todayLabel: WEEKDAY_LABELS[weekday],
      message: `Opens ${dayLabel} at ${formatTime12(candidate.open)}`,
      today,
    };
  }

  return {
    isOpen: false,
    weekday,
    todayLabel: WEEKDAY_LABELS[weekday],
    message: "Check back soon",
    today,
  };
}

export function getGroupedHours(): { label: string; value: string }[] {
  const groups: { days: Weekday[]; range: string }[] = [];

  for (const day of WEEKDAYS) {
    const range = formatRange(hours[day]);
    const last = groups[groups.length - 1];
    if (last && last.range === range) {
      last.days.push(day);
    } else {
      groups.push({ days: [day], range });
    }
  }

  return groups.map((group) => {
    const first = group.days[0];
    const last = group.days[group.days.length - 1];
    const label =
      group.days.length === 1
        ? WEEKDAY_LABELS[first]
        : `${WEEKDAY_LABELS[first]} – ${WEEKDAY_LABELS[last]}`;
    return { label, value: group.range };
  });
}
