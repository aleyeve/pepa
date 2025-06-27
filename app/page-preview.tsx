"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginView } from "./login-view"
import { EmployeeDashboardView } from "./employee-dashboard-view"
import { AbsenceFormView } from "./absence-form-view"
import { AdminDashboardView } from "./admin-dashboard-view"
import { AbsenceReviewView } from "./absence-review-view"

export default function AppPreview() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">Vista Previa de la Aplicación</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
          <TabsTrigger value="login">Inicio de Sesión</TabsTrigger>
          <TabsTrigger value="employee">Dashboard Empleado</TabsTrigger>
          <TabsTrigger value="absence">Registro Ausencia</TabsTrigger>
          <TabsTrigger value="admin">Dashboard Admin</TabsTrigger>
          <TabsTrigger value="review">Revisión Solicitud</TabsTrigger>
        </TabsList>

        <div className="border rounded-lg overflow-hidden shadow-lg">
          <div className="bg-sky-700 text-white p-2 text-xs">
            Vista previa - Sistema de Gestión de Ausencias y Vacaciones
          </div>

          <TabsContent value="login" className="m-0">
            <LoginView />
          </TabsContent>

          <TabsContent value="employee" className="m-0">
            <EmployeeDashboardView />
          </TabsContent>

          <TabsContent value="absence" className="m-0">
            <AbsenceFormView />
          </TabsContent>

          <TabsContent value="admin" className="m-0">
            <AdminDashboardView />
          </TabsContent>

          <TabsContent value="review" className="m-0">
            <AbsenceReviewView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
