import { useEffect, useState } from 'react';
import ActivityCalendar from 'react-activity-calendar';
import { Tooltip } from '@mantine/core';
import { useUser } from '../stores/userStore';
import rawData from './rawData'
import styles from './Dashboard.module.css';


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
