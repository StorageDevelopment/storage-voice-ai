import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { DatastoreFactory } from "../models/datastoreFactory";
import { StorageLocation } from "../models/storage-location";
import { HttpError } from "../http-error";
import { CleaningReport } from "../models/cleaning-report";
import { TimeclockEntry } from "../models/timeclock-entry";
import { Stack, toUtcDate } from "../utils";
import { TimeclockEntriesInfo } from "../models/timeclock-entries-info";
import { TimeclockEventPair } from "../models/timeclock-event-pair";
import { TimeclockSequenceEntry } from "../models/timeclock-sequence-entry";
import { TimeclockUserSummary } from "../models/timeclock-user-summary";

export const getTimeclockEntries = asyncHandler(async (req: Request, res: Response) => {
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;
  const userId = parseInt(req.params.userId);
  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const users = locationObj.getUsers();
  const user = users.find(user => user.getId() === userId);

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  res.send(user.getTimeclockEntries());
});

export const getDailyTimeclockEntries = asyncHandler(async (req: Request, res: Response) => {
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;
  const userId = parseInt(req.params.userId);
  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  //get the the page
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const timezone = locationObj.getTimezone();
  const users = locationObj.getUsers();

  const user = users.find(user => user.getId() === userId);

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  const groupedEntries = user.getGroupedTimeclockEntries(locationObj.getTimezone());

  //sort the entries by date
  const sortedEntries = Object.entries(groupedEntries).sort((a, b) => {
    return new Date(b[0]).getTime() - new Date(a[0]).getTime(); // Sort by date descending
  });

  const paginatedEntries = sortedEntries.slice(startIndex, endIndex);

  const output = paginatedEntries.map(([date, entries]) => {

    return {
      date,
      info: getTimeclockEntriesInfo(entries, timezone)
    }

  });

  res.send(output);

});

function getTimeclockEntriesInfo(entries: TimeclockEntry[], timezone: string): TimeclockEntriesInfo {
  const pairedEntries: TimeclockEventPair[] = [];
  const unpairedEntries: TimeclockEntry[] = [];
  const entrySequence: TimeclockSequenceEntry[] = [];
  let totalWorkedTime = 0;
  let totalBreakTime = 0;

  //first sort in ascending order by timestamp
  entries.sort((a, b) => new Date(a.getTimestamp()).getTime() - new Date(b.getTimestamp()).getTime());

  //now iterate through the entries and pair them
  let eventStack = new Stack();
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const entryType = entry.getType();
    const timestamp = new Date(entry.getTimestamp());

    if (entryType === 'clockIn') {
      //check if we are already clocked in
      if (!eventStack.isEmpty()) {
        unpairedEntries.push(entry);
        continue;
      };

      //if we are not clocked in, push the entry onto the stack
      eventStack.push(entry);
      entrySequence.push({
        timestamp: entry.getTimestamp(),
        type: entryType,
        hours: 0 // Placeholder, will be calculated later
      });

    } else if (entryType === 'clockOut') {
      //check if we have a clock in entry to pair with
      if (eventStack.isEmpty() || eventStack.peek().getType() !== 'clockIn') {
        unpairedEntries.push(entry);
        continue;
      }

      //if we have a clock in entry, pop it from the stack and create a paired entry
      const clockInEntry = eventStack.pop();
      const clockOutEntry = entry;
      const workedTime = new Date(clockOutEntry.getTimestamp()).getTime() - new Date(clockInEntry.getTimestamp()).getTime();
      const workedTimeInHours = (workedTime / (1000 * 60 * 60)); // Convert to hours
      const roundedWorkedTime = Math.floor(workedTimeInHours * 100) / 100; // Round to 2 decimal places
      totalWorkedTime += roundedWorkedTime;

      pairedEntries.push({
        inEvent: clockInEntry,
        outEvent: clockOutEntry,
        duration: roundedWorkedTime
      });

      entrySequence.push({
        timestamp: entry.getTimestamp(),
        type: entryType,
        hours: roundedWorkedTime
      });

    } else if (entryType === 'breakIn') {
      //check if we are already on a break
      if (!eventStack.isEmpty() && eventStack.peek().getType() === 'breakIn') {
        unpairedEntries.push(entry);
        continue;
      }

      //if we are not on a break, push the entry onto the stack
      eventStack.push(entry);

      entrySequence.push({
        timestamp: entry.getTimestamp(),
        type: entryType,
        hours: 0
      });


    } else if (entryType === 'breakOut') {
      //check if we have a break in entry to pair with
      if (eventStack.peek().getType() !== 'breakIn') {
        unpairedEntries.push(entry);
        continue;
      }

      //if we have a clock in entry, pop it from the stack and create a paired entry
      const breakInEntry = eventStack.pop();
      const breakOutEntry = entry;
      const breakTime = new Date(breakOutEntry.getTimestamp()).getTime() - new Date(breakInEntry.getTimestamp()).getTime();
      const breakTimeInHours = (breakTime / (1000 * 60 * 60)); // Convert to hours
      const roundedBreakTime = Math.floor(breakTimeInHours * 100) / 100; // Round to 2 decimal places

      totalBreakTime += roundedBreakTime;

      pairedEntries.push({
        inEvent: breakInEntry,
        outEvent: breakOutEntry,
        duration: roundedBreakTime
      });

      entrySequence.push({
        timestamp: entry.getTimestamp(),
        type: entryType,
        hours: roundedBreakTime
      });

    }
  }

  return {
    pairedEntries,
    unpairedEntries,
    sequenceEntries: entrySequence,
    totalWorkedTime,
    totalBreakTime,
    netWorkedTime: totalWorkedTime - totalBreakTime
  };
}

export const addTimeclockEntry = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const timeclockEntry = req.body;
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;
  const userId = parseInt(req.params.userId);
  const newTimeclockEntry = new TimeclockEntry(timeclockEntry);

  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const users = locationObj.getUsers();
  const user = users.find(user => user.getId() === userId);

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  const timeclockEntries = user.getTimeclockEntries();

  //create a new id
  let maxId = 0;
  timeclockEntries.forEach(timeclockEntry => { maxId = Math.max(maxId, parseInt(timeclockEntry.getId() ?? '0')); });
  const nextId = (maxId + 1).toString();

  newTimeclockEntry.setId(nextId);
  timeclockEntries.push(newTimeclockEntry);

  //resave the object
  await datastore.setJson(key, locationObj);

  res.send(timeclockEntries);

});

export const clearTimeclockEntry = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;
  const userId = parseInt(req.params.userId);
  const timeclockEntryId = req.params.timeclockEntryId;

  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const users = locationObj.getUsers();
  const user = users.find(user => user.getId() === userId);

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  let timeclockEntries = user.getTimeclockEntries();

  if (timeclockEntryId === "*") {

    timeclockEntries = [];

  } else {

    const index = timeclockEntries.findIndex(timeclockEntry => timeclockEntry.getId() === timeclockEntryId);

    if (index !== -1) {
      timeclockEntries.splice(index, 1);
    }

  }

  user.setTimeclockEntries(timeclockEntries);

  //resave the object
  await datastore.setJson(key, locationObj);

  res.send(timeclockEntries);

});

export const getUserWorkSummaries = asyncHandler(async (req: Request, res: Response) => {
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;
  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const users = locationObj.getUsers();
  const timezone = locationObj.getTimezone();

  // Get date range from query parameters
  const startDateStr = req.query.startDate as string;
  const endDateStr = req.query.endDate as string;

  let startDate: Date | null = new Date();
  let endDate: Date | null = new Date();

  //convert to utc date
  if (startDateStr) startDate = toUtcDate(startDateStr, timezone);
  if (endDateStr) endDate = toUtcDate(endDateStr, timezone);
  
  const summaries = users.map(user => {
    // Filter entries by date range if provided
    let entries = user.getTimeclockEntries();
    if (startDate || endDate) {
      entries = entries.filter(entry => {
        const entryDate = new Date(entry.getTimestamp());
        if (startDate && entryDate < startDate) return false;
        if (endDate && entryDate > endDate) return false;
        return true;
      });
    }

    const info = getTimeclockEntriesInfo(entries, timezone);

    return {
      id: user.getId(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      username: user.getUsername(),
      role: user.getRole(),
      totalWorkedTime: info.totalWorkedTime,
      totalBreakTime: info.totalBreakTime,
      netWorkedTime: info.netWorkedTime
    };
  });

  res.send(summaries);
});

export const getWorkSummary = asyncHandler(async (req: Request, res: Response) => {
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;
  const userId = parseInt(req.params.userId);
  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const timezone = locationObj.getTimezone();
  const users = locationObj.getUsers();

  // Get date range from query parameters
  const startDateStr = req.query.startDate as string;
  const endDateStr = req.query.endDate as string;

  let startDate: Date | null = new Date();
  let endDate: Date | null = new Date();

  //convert to utc date
  if (startDateStr) startDate = toUtcDate(startDateStr, timezone);
  if (endDateStr) endDate = toUtcDate(endDateStr, timezone);

  const summaries = users.map(user => {

    const userSummary = new TimeclockUserSummary({
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      id: user.getId(),
      summaries: []
    });

    return userSummary;
  });

  

  // const groupedEntries = user.getGroupedTimeclockEntries(locationObj.getTimezone());

  // //sort the entries by date
  // const sortedEntries = Object.entries(groupedEntries).sort((a, b) => {
  //   return new Date(b[0]).getTime() - new Date(a[0]).getTime(); // Sort by date descending
  // });

  // const paginatedEntries = sortedEntries.slice(startIndex, endIndex);

  // const output = paginatedEntries.map(([date, entries]) => {

  //   return {
  //     date,
  //     info: getTimeclockEntriesInfo(entries, timezone)
  //   }

  // });

  res.send(summaries);

});