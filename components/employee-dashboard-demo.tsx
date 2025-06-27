"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, FileText, Clock, CheckCircle, LogOut } from "lucide-react"

export function EmployeeDashboardDemo({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-sky-700">Panel del Empleado</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Bienvenido, {user.name}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-sky-700">Panel de Control</h2>
            <p className="text-gray-600">Legajo: {user.legajo}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="bg-sky-600 hover:bg-sky-700">Registrar Ausencia</Button>
            <Button className="bg-sky-600 hover:bg-sky-700">Solicitar Vacaciones</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Ausencias Pendientes</CardTitle>
              <CardDescription>En espera de aprobación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span className="text-2xl font-bold">1</span>
                </div>
                <Button variant="ghost" size="sm">
                  Ver todas
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Vacaciones Pendientes</CardTitle>
              <CardDescription>En espera de aprobación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span className="text-2xl font-bold">1</span>
                </div>
                <Button variant="ghost" size="sm">
                  Ver todas
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Mis Reportes</CardTitle>
              <CardDescription>Historial personal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-sky-500" />
                  <span className="text-sm">Disponible</span>
                </div>
                <Button variant="ghost" size="sm">
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Vacaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">1 de Febrero - 7 de Febrero 2024</p>
                    <p className="text-sm text-gray-500">7 días</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span className="text-sm text-amber-600">Pendiente de aprobación</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas Solicitudes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2 pb-2 border-b">
                  <Clock className="h-5 w-5 text-amber-500 mt-1" />
                  <div>
                    <p className="font-medium">Ausencia: 15 de Enero 2024</p>
                    <p className="text-sm text-gray-500">Consulta médica</p>
                    <p className="text-xs text-amber-600">Pendiente</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 pb-2 border-b">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Vacaciones: 1-7 Feb 2024</p>
                    <p className="text-sm text-gray-500">7 días</p>
                    <p className="text-xs text-amber-600">Pendiente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
