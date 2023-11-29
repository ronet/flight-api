import moment from "moment-timezone";
import { DateRange } from "../model";

export function splitPeriod({
  fromDate,
  toDate,
  periodDays,
}: {
  fromDate: string;
  toDate: string;
  periodDays: number;
}): DateRange[] {
  const startDate = moment(fromDate);
  const endDate = moment(toDate);

  if (startDate.isSame(endDate)) {
    return [
      {
        fromDate: startDate.format("YYYY-MM-DD"),
        toDate: endDate.format("YYYY-MM-DD"),
      },
    ];
  }

  const totalDays = endDate.diff(startDate, "days");
  const periodsCount = Math.ceil(totalDays / periodDays);

  return Array(periodsCount)
    .fill(null)
    .reduce((preData: DateRange[], _, index) => {
      const startClone = startDate.clone().add(index * periodDays, "days");
      const endClone = startClone
        .clone()
        .add(periodDays, "days")
        .isAfter(endDate)
        ? endDate
        : startClone.clone().add(periodDays, "days");

      return [
        ...preData,
        {
          fromDate: startClone.format("YYYY-MM-DD"),
          toDate: endClone.format("YYYY-MM-DD"),
        },
      ];
    }, [] as DateRange[]);
}
