"use client"

import { useState } from "react"
import { LoginDemo } from "@/components/login-demo"
import { AdminDashboardDemo } from "@/components/admin-dashboard-demo"
import { EmployeeDashboardDemo } from "@/components/employee-dashboard-demo"
import { AbsenceFormDemo } from "@/components/absence-form-demo"
import { VacationFormDemo } from "@/components/vacation-form-demo"
import { AbsenceManagementDemo } from "@/components/absence-management-demo"
import { VacationManagementDemo } from "@/components/vacation-management-demo"
import { EmployeeManagementDemo } from "@/components/employee-management-demo"
import { ReportsDemo } from "@/components/reports-demo"

export default function DemoApp() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [currentView, setCurrentView] = useState<string>("dashboard")
  const [absences, setAbsences] = useState([
    {
      id: 1,
      employee: "Juan Pérez",
      legajo: "EMP001",
      startDate: "15/01/2024",
      endDate: "15/01/2024",
      reason: "Consulta médica con especialista",
      status: "pending",
      document: true,
    },
    {
      id: 2,
      employee: "María González",
      legajo: "EMP002",
      startDate: "10/01/2024",
      endDate: "12/01/2024",
      reason: "Enfermedad - Gripe",
      status: "approved",
      document: false,
    },
  ])

  const [vacations, setVacations] = useState([
    {
      id: 1,
      employee: "Juan Pérez",
      legajo: "EMP001",
      startDate: "01/02/2024",
      endDate: "07/02/2024",
      days: 7,
      status: "pending",
    },
    {
      id: 2,
      employee: "María González",
      legajo: "EMP002",
      startDate: "15/03/2024",
      endDate: "22/03/2024",
      days: 8,
      status: "approved",
    },
  ])

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView("dashboard")
  }

  const handleViewChange = (view: string) => {
    setCurrentView(view)
  }

  const handleAbsenceSubmit = (newAbsence: any) => {
    const absence = {
      id: absences.length + 1,
      employee: currentUser.name,
      legajo: currentUser.legajo,
      ...newAbsence,
      status: "pending",
    }
    setAbsences([...absences, absence])
    setCurrentView("dashboard")
  }

  const handleVacationSubmit = (newVacation: any) => {
    const vacation = {
      id: vacations.length + 1,
      employee: currentUser.name,
      legajo: currentUser.legajo,
      ...newVacation,
      status: "pending",
    }
    setVacations([...vacations, vacation])
    setCurrentView("dashboard")
  }

  const handleStatusChange = (type: "absence" | "vacation", id: number, newStatus: string) => {
    if (type === "absence") {
      setAbsences((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
    } else {
      setVacations((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
    }
  }

  if (!currentUser) {
    return <LoginDemo onLogin={handleLogin} />
  }

  // Employee views
  if (currentUser.role === "employee") {
    switch (currentView) {
      case "new-absence":
        return (
          <AbsenceFormDemo
            user={currentUser}
            onSubmit={handleAbsenceSubmit}
            onBack={() => setCurrentView("dashboard")}
            onLogout={handleLogout}
          />
        )
      case "new-vacation":
        return (
          <VacationFormDemo
            user={currentUser}
            onSubmit={handleVacationSubmit}
            onBack={() => setCurrentView("dashboard")}
            onLogout={handleLogout}
          />
        )
      case "reports":
        return (
          <ReportsDemo
            user={currentUser}
            absences={absences.filter((a) => a.legajo === currentUser.legajo)}
            vacations={vacations.filter((v) => v.legajo === currentUser.legajo)}
            onBack={() => setCurrentView("dashboard")}
            onLogout={handleLogout}
          />
        )
      default:
        return (
          <EmployeeDashboardDemo
            user={currentUser}
            absences={absences.filter((a) => a.legajo === currentUser.legajo)}
            vacations={vacations.filter((v) => v.legajo === currentUser.legajo)}
            onLogout={handleLogout}
            onViewChange={handleViewChange}
          />
        )
    }
  }

  // Admin views
  switch (currentView) {
    case "absences":
      return (
        <AbsenceManagementDemo
          user={currentUser}
          absences={absences}
          onStatusChange={(id, status) => handleStatusChange("absence", id, status)}
          onBack={() => setCurrentView("dashboard")}
          onLogout={handleLogout}
        />
      )
    case "vacations":
      return (
        <VacationManagementDemo
          user={currentUser}
          vacations={vacations}
          onStatusChange={(id, status) => handleStatusChange("vacation", id, status)}
          onBack={() => setCurrentView("dashboard")}
          onLogout={handleLogout}
        />
      )
    case "employees":
      return (
        <EmployeeManagementDemo user={currentUser} onBack={() => setCurrentView("dashboard")} onLogout={handleLogout} />
      )
    case "reports":
      return (
        <ReportsDemo
          user={currentUser}
          absences={absences}
          vacations={vacations}
          onBack={() => setCurrentView("dashboard")}
          onLogout={handleLogout}
        />
      )
    default:
      return (
        <AdminDashboardDemo
          user={currentUser}
          absences={absences}
          vacations={vacations}
          onLogout={handleLogout}
          onViewChange={handleViewChange}
        />
      )
  }
}
