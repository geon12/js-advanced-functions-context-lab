/* Your Code Here */

function createEmployeeRecord(employee){
    const employeeRecord = {};
    employeeRecord.firstName = employee[0];
    employeeRecord.familyName = employee[1];
    employeeRecord.title = employee[2];
    employeeRecord.payPerHour = employee[3];

    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];

    return employeeRecord;
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    const dateAndHour = dateStamp.split(" ");
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(dateAndHour[1],10),
        date: dateAndHour[0]
    };
    this.timeInEvents.push(timeIn);
    return this;
}

function createTimeOutEvent(dateStamp) {
    const dateAndHour = dateStamp.split(" ");
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(dateAndHour[1],10),
        date: dateAndHour[0]
    };
    this.timeOutEvents.push(timeOut);
    return this;
}


function hoursWorkedOnDate(date) {
    const matchedTimeIn = this.timeInEvents.find((timeIn) => timeIn.date === date);
    const matchedTimeOut = this.timeOutEvents.find((timeOut) => timeOut.date === date);
    return (matchedTimeOut.hour - matchedTimeIn.hour)/100;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this,date);
    return hoursWorked * this.payPerHour;
}

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find((record) => record.firstName === firstName);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total,record) => total + allWagesFor.call(record), 0)
}