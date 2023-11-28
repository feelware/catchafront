import { useUser } from "../../stores/userStore"
import { useEffect, useState } from "react"
import ActivityCalendar from 'react-activity-calendar'
import { ToolTip } from "@mantine/core"

import styles from "./Dashboard.module.css"

export default function Dashboard() {
  const { user } = useUser()

  return (
    <main>      
<ActivityCalendar
  data={data}
  renderBlock={(block, activity) => (
    <Tooltip
      title={`${activity.count} activities on ${activity.date}`}
    >
      {block}
    </Tooltip>
  )}
/>    
</main>
  )
}