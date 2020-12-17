# Interview Scheduler Project

## Main features
Interview Scheduler is an application that helps to plan appointments. Depending on the day there are several interviewers who can speak to a student during an available time. The application allows to book appointment at one of five 1-hour timeslots each workday. Every existing appointment can be edited or cancelled.


## Final Product

- ### General view

!["General view"](https://github.com/pavel-piatetskii/scheduler/blob/master/docs/general-view.png)

- ### Appointment with 'Edit' and 'Delete' buttons
!["Appointment"](https://github.com/pavel-piatetskii/scheduler/blob/master/docs/appointment.png)

- ### Add new / edit existing appointment
!["Add new / edit existing"](https://github.com/pavel-piatetskii/scheduler/blob/master/docs/add-or-edit.png)

- ### Delete an appointment confirmation
!["Delete an appointment"](https://github.com/pavel-piatetskii/scheduler/blob/master/docs/confirm.png)

- ### Saving / Deleting placeholder
!["Saving"](https://github.com/pavel-piatetskii/scheduler/blob/master/docs/saving.png)
!["Deleting"](https://github.com/pavel-piatetskii/scheduler/blob/master/docs/deleting.png)

- ### Error message on save / delete attempt
!["Error message on save"](https://github.com/pavel-piatetskii/scheduler/blob/master/docs/error-save.png)
!["Error message on delete"](https://github.com/pavel-piatetskii/scheduler/blob/master/docs/error-delete.png)

## Dependencies

- Axios": "^0.18.1",
- Classnames": "^2.2.6",
- Normalize.css": "^8.0.1",
- React": "^16.9.0",
- React-dom": "^16.9.0",
- React-scripts": "3.0.0"


## Getting Started
1. Fork and clone https://github.com/pavel-piatetskii/scheduler-api in addition to this project
2. Install dependencies in both projects: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Reset database in the scheduler-api folder: `npm run db:reset`
5. Run the server in the scheduler folder: `npm start`
5. Run the server in the scheduler-api folder: `npm start`
6. Visit `http://localhost:8080/`
