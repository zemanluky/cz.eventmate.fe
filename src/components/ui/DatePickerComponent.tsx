import { DatePicker } from "@ParkComponents/date-picker";
import { IconButton } from "@ParkComponents/icon-button";
import { Input } from "@ParkComponents/input";
import { Button } from "@ParkComponents/button";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { formatISO } from "date-fns";

interface DatePickerProps {
  onChange: (dates: { startDate: string; endDate: string }) => void;
  defaultDates: {
    startDate: string;
    endDate: string;
  };
}

interface DateRange {
  startDate: string;
  endDate: string;
}

export const DatePickerComponent: React.FC<DatePickerProps> = ({
  onChange,
  defaultDates,
}) => {
  const handleDateChange = (details: any) => {
    const datepickerOutput = details.value;
    if (datepickerOutput.length > 0) {
      const dates: DateRange = {
        startDate: formatISO(new Date(datepickerOutput[0])),
        endDate: formatISO(new Date(datepickerOutput[1])),
      };
      console.log(dates);
      onChange(dates);
    }
  };

  return (
    <div>
      <DatePicker.Root
        closeOnSelect={false}
        positioning={{ sameWidth: true }}
        startOfWeek={1}
        selectionMode="range"
        onValueChange={handleDateChange}
        defaultValue={[
          new Date(defaultDates.startDate), //nevim co uz tam zadat aby to fungovalo
          new Date(defaultDates.endDate),
        ]}
      >
        <DatePicker.Label>Date Picker</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input index={0} asChild>
            <Input />
          </DatePicker.Input>
          <DatePicker.Input index={1} asChild>
            <Input />
          </DatePicker.Input>
          <DatePicker.Trigger asChild>
            <IconButton variant="outline" aria-label="Open date picker">
              <CalendarIcon />
            </IconButton>
          </DatePicker.Trigger>
        </DatePicker.Control>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Context>
                {(api) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger asChild>
                        <IconButton variant="ghost" size="sm">
                          <ChevronLeftIcon />
                        </IconButton>
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <DatePicker.RangeText />
                        </Button>
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger asChild>
                        <IconButton variant="ghost" size="sm">
                          <ChevronRightIcon />
                        </IconButton>
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table>
                      <DatePicker.TableHead>
                        <DatePicker.TableRow>
                          {api.weekDays.map((weekDay, id) => (
                            <DatePicker.TableHeader key={id}>
                              {weekDay.narrow}
                            </DatePicker.TableHeader>
                          ))}
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody>
                        {api.weeks.map((week, id) => (
                          <DatePicker.TableRow key={id}>
                            {week.map((day, id) => (
                              <DatePicker.TableCell key={id} value={day}>
                                <DatePicker.TableCellTrigger asChild>
                                  <IconButton variant="ghost" type="button">
                                    {day.day}
                                  </IconButton>
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Context>
                {(api) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger asChild>
                        <IconButton variant="ghost" size="sm">
                          <ChevronLeftIcon />
                        </IconButton>
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <DatePicker.RangeText />
                        </Button>
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger asChild>
                        <IconButton variant="ghost" size="sm">
                          <ChevronRightIcon />
                        </IconButton>
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table>
                      <DatePicker.TableBody>
                        {api
                          .getMonthsGrid({ columns: 4, format: "short" })
                          .map((months, id) => (
                            <DatePicker.TableRow key={id}>
                              {months.map((month, id) => (
                                <DatePicker.TableCell
                                  key={id}
                                  value={month.value}
                                >
                                  <DatePicker.TableCellTrigger asChild>
                                    <Button variant="ghost">
                                      {month.label}
                                    </Button>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Context>
                {(api) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger asChild>
                        <IconButton variant="ghost" size="sm">
                          <ChevronLeftIcon />
                        </IconButton>
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <DatePicker.RangeText />
                        </Button>
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger asChild>
                        <IconButton variant="ghost" size="sm">
                          <ChevronRightIcon />
                        </IconButton>
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table>
                      <DatePicker.TableBody>
                        {api.getYearsGrid({ columns: 4 }).map((years, id) => (
                          <DatePicker.TableRow key={id}>
                            {years.map((year, id) => (
                              <DatePicker.TableCell key={id} value={year.value}>
                                <DatePicker.TableCellTrigger asChild>
                                  <Button variant="ghost">{year.label}</Button>
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </DatePicker.Root>
    </div>
  );
};
