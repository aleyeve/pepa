"use client"

import { useState } from "react"
import { LoginDemo } from "@/components/login-demo"
import { AdminDashboardDemo } from "@/components/admin-dashboard-demo"
import { EmployeeDashboardDemo } from "@/components/employee-dashboard-demo"

export default function DemoApp() {
  const [currentUser, setCurrentUser] = useState<any>(null)

  if (!currentUser) {
    return <LoginDemo onLogin={setCurrentUser} />
  }

  if (currentUser.role === "admin") {
    return <AdminDashboardDemo user={currentUser} onLogout={() => setCurrentUser(null)} />
  }

  return <EmployeeDashboardDemo user={currentUser} onLogout={() => setCurrentUser(null)} />
}
