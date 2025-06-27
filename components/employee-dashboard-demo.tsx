"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, FileText, Clock, CheckCircle, LogOut, XCircle } from "lucide-react"

export function EmployeeDashboardDemo({
  user,
  absences,
  vacations,
  onLogout,
  onViewChange,
}: {
  user: any
  absences: any[]
  vacations: any[]
  onLogout: () => void
  onViewChange: (view: string) => void
}) {
  const pendingAbsences = absences.filter((a) => a.status === "pending")
  const pendingVacations = vacations.filter((v) => v.status === "pending")
  const upcomingVacations = vacations.filter((v) => v.status === "approved")

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
            <Button className="bg-sky-600 hover:bg-sky-700" onClick={() => onViewChange("new-absence")}>
              Registrar Ausencia
            </Button>
            <Button className="bg-sky-600 hover:bg-sky-700" onClick={() => onViewChange("new-vacation")}>
              Solicitar Vacaciones
            </Button>
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
                  <span className="text-2xl font-bold">{pendingAbsences.length}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onViewChange("reports")}>
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
                  <span className="text-2xl font-bold">{pendingVacations.length}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onViewChange("reports")}>
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
                <Button variant="ghost" size="sm" onClick={() => onViewChange("reports")}>
                  Ver reportes
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
              {upcomingVacations.length > 0 ? (
                <div className="space-y-4">
                  {upcomingVacations.slice(0, 2).map((vacation) => (
                    <div key={vacation.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">
                            {vacation.startDate} - {vacation.endDate}
                          </p>
                          <p className="text-sm text-gray-500">{vacation.days} días</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-green-600">Aprobado</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No tienes vacaciones programadas</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas Solicitudes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...absences, ...vacations].slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-start gap-2 pb-2 border-b">
                    {item.status === "approved" ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    ) : item.status === "rejected" ? (
                      <XCircle className="h-5 w-5 text-red-500 mt-1" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-500 mt-1" />
                    )}
                    <div>
                      <p className="font-medium">
                        {"reason" in item ? "Ausencia" : "Vacaciones"}: {item.startDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        {"reason" in item ? item.reason.substring(0, 30) + "..." : `${item.days} días`}
                      </p>
                      <p
                        className={`text-xs ${
                          item.status === "approved"
                            ? "text-green-600"
                            : item.status === "rejected"
                              ? "text-red-600"
                              : "text-amber-600"
                        }`}
                      >
                        {item.status === "approved"
                          ? "Aprobado"
                          : item.status === "rejected"
                            ? "Rechazado"
                            : "Pendiente"}
                      </p>
                    </div>
                  </div>
                ))}
                {absences.length === 0 && vacations.length === 0 && (
                  <p className="text-gray-500">No tienes solicitudes recientes</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
