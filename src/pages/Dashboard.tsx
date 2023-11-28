import { useEffect, useState } from 'react';
import ActivityCalendar from 'react-activity-calendar';
import { Tooltip } from '@mantine/core';
import { useUser } from '../stores/userStore';

import styles from './Dashboard.module.css';

const rawData = [
  { id: 1, distance: 2.75, date: '2023-11-21T09:15:00Z', location: 'Lima' },
  { id: 2, distance: 1.23, date: '2023-11-21T14:30:00Z', location: 'Lima' },
  { id: 3, distance: 3.17, date: '2023-11-21T11:45:00Z', location: 'Lima' },
  { id: 4, distance: 0.98, date: '2023-11-22T08:00:00Z', location: 'Lima' },
  { id: 5, distance: 2.01, date: '2023-11-22T17:20:00Z', location: 'Lima' },
  { id: 6, distance: 3.55, date: '2023-11-22T12:10:00Z', location: 'Lima' },
  { id: 7, distance: 0.76, date: '2023-11-23T10:30:00Z', location: 'Lima' },
  { id: 8, distance: 2.84, date: '2023-11-23T15:45:00Z', location: 'Lima' },
  { id: 9, distance: 1.62, date: '2023-11-23T13:05:00Z', location: 'Lima' },
  { id: 10, distance: 3.28, date: '2023-11-24T09:00:00Z', location: 'Lima' },
  { id: 11, distance: 0.65, date: '2023-11-24T18:30:00Z', location: 'Lima' },
  { id: 12, distance: 2.19, date: '2023-11-24T11:55:00Z', location: 'Lima' },
  { id: 13, distance: 3.73, date: '2023-11-25T07:40:00Z', location: 'Lima' },
  { id: 14, distance: 0.83, date: '2023-11-25T16:15:00Z', location: 'Lima' },
  { id: 15, distance: 2.97, date: '2023-11-25T13:20:00Z', location: 'Lima' },
  { id: 16, distance: 1.39, date: '2023-11-26T08:45:00Z', location: 'Lima' },
  { id: 17, distance: 3.11, date: '2023-11-26T17:10:00Z', location: 'Lima' },
  { id: 18, distance: 0.71, date: '2023-11-26T11:25:00Z', location: 'Lima' },
  { id: 19, distance: 2.42, date: '2023-11-27T10:00:00Z', location: 'Lima' },
  { id: 20, distance: 3.85, date: '2023-11-27T15:55:00Z', location: 'Lima' },
  { id: 21, distance: 0.57, date: '2023-11-27T12:35:00Z', location: 'Lima' },
  { id: 22, distance: 2.66, date: '2023-11-28T09:20:00Z', location: 'Lima' },
  { id: 23, distance: 1.10, date: '2023-11-28T18:45:00Z', location: 'Lima' },
  { id: 24, distance: 3.46, date: '2023-11-28T13:50:00Z', location: 'Lima' },
  { id: 25, distance: 0.92, date: '2023-11-28T07:15:00Z', location: 'Lima' },
  { id: 26, distance: 2.23, date: '2023-11-29T16:40:00Z', location: 'Lima' },
  { id: 27, distance: 3.64, date: '2023-11-29T12:05:00Z', location: 'Lima' },
  { id: 28, distance: 0.80, date: '2023-11-29T09:30:00Z', location: 'Lima' },
  { id: 29, distance: 2.90, date: '2023-11-30T18:00:00Z', location: 'Lima' },
  { id: 30, distance: 1.45, date: '2023-11-30T14:25:00Z', location: 'Lima' },
];

const groupedData = rawData.reduce((acc, item) => {
  const date = item.date.split('T')[0]; // get the date part
  if (!acc[date]) {
    acc[date] = [];
  }
  acc[date].push(item);
  return acc;
}, {});

const max = Object.values(groupedData).reduce((acc, item) => {
  if (item.length > acc) {
    return item.length;
  }
  return acc;
}, 0);

const data = Object.keys(groupedData).map((key) => ({
    date: key,
    count: groupedData[key].length,
    level: groupedData[key].length,
}));

const startDate = new Date('2023-05-05');

const endDate = new Date('2023-11-20');

const dates = [];

for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
  dates.push({
    date: new Date(date).toISOString().split('T')[0],
    count: 0,
    level: 0,
  });
}

console.log(dates.concat(data));

export default function Dashboard() {
  return (
    <main>
      <ActivityCalendar
        theme={{
        dark: ['rgb(171, 210, 255)', 'rgb(14, 117, 235)'],
      }}
        data={dates.concat(data)}
        maxLevel={max}
      />
    </main>
  );
}
