import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEventModalComponent, } from '@app/component/modal/add-event-modal/add-event-modal.component';

import { SaveCurrentTimesheetService } from '@app/services/save-current-timesheet.service';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { GenericResponse } from '@app/models/genericresponse';
import { Subject } from 'rxjs';
// colors definition for event



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

export class MyCalendarEvent implements CalendarEvent {
  title: string;
  start: Date;
  nOre: number;
}


@Component({
  selector: 'app-timesheet-component',
  templateUrl: './timesheet-component.component.html',
  styleUrls: ['./timesheet-component.component.css']
})
export class TimesheetComponentComponent implements OnInit {

  constructor(
    private saveCurrentTimesheetInstance: SaveCurrentTimesheetService,
    private modalService: NgbModal,
    // private confirmationDialogService: ConfirmationDialogService
  ) { }

  newEvent: MyCalendarEvent  = new MyCalendarEvent();

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  activeDayIsOpen = false;

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
   /* {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'lavoro',
      color: colors.red,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'ferie',
      color: colors.yellow,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'permesso',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },*/
  ];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  public ciccio: GenericResponse;

  ngOnInit() {
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    }
  setView(view: CalendarView) {
    this.view = view;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    console.log(JSON.stringify(events));
  }

  createEvent(datenn: any , event: any): void {
      console.log(datenn);
      this.events.forEach(element => {
        // console.log(JSON.stringify(element));
      });
      console.log(JSON.stringify(event));


  }

  saveCurrentTimesheet() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.saveCurrentTimesheetInstance.save(this.events, month, year)
    .subscribe( data => {
      console.log('Data umpa :', data);
      console.log('status :', data);
    });

  }

  freezeCurrentTimesheet() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.saveCurrentTimesheetInstance.freeze( month, year , 1)
    .subscribe( data => {
      console.log('Data umpa :', data);

      console.log('status :', data);
    });
  }

  openModal() {
    const modalRef = this.modalService.open(AddEventModalComponent).result.then(
      (result) => {
        console.log('result');
        const newEvent: MyCalendarEvent = new MyCalendarEvent();
        newEvent.title = result.contractCode;
        newEvent.start = new Date(result.eventDate);
        newEvent.nOre = result.numeroOre;
        console.log(newEvent);
        this.events = [...this.events, newEvent];
      },
      (reason) => {
        console.log(reason);
      });


  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  myPreviousClick() {
    console.log('se e\' vero so forte');
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.saveCurrentTimesheetInstance.loadCurrentViewedEvent(month, year, 1)
      .subscribe((data: GenericResponse ) => {
          console.log(data);
      });

  }

  myNextClick() {
    const month = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    this.events = [];
    this.saveCurrentTimesheetInstance.loadCurrentViewedEvent(month, year, 1).subscribe(
      (res) => {
        /*
        const myparse = JSON.parse(res);

        myparse.forEach((element) => {
          const newEvent: MyCalendarEvent = new MyCalendarEvent();
          console.log(element);
          newEvent.title = element.title;
          newEvent.start = new Date(element.start);
          newEvent.nOre = element.nOre;
          this.events = [...this.events, newEvent];
        });
        this.refresh.next();
*/
      }

    );


  }
  anzia() {
    console.log(this.events);
  }
}
