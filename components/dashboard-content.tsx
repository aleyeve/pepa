"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarDays, FileText, Clock, CheckCircle, XCircle } from "lucide-react"

type Absence = {
  id: string
  employee_id: string
  start_date: string
  end_date: string
  reason: string
  status: "pending" | "approved" | "rejected"
  document_url?: string
}

type Vacation = {
  id: string
  employee_id: string
  start_date: string
  end_date: string
  days: number
  status: "pending" | "approved" | "rejected"
  comments?: string
}

type Employee = {
  id: string
  full_name: string
  employee_id: string
  absences: Absence[]
  vacations: Vacation[]
}

export function DashboardContent({ employee }: { employee: Employee }) {
  const pendingAbsences = employee.absences.filter((a) => a.status === "pending").length
  const pendingVacations = employee.vacations.filter((v) => v.status === "pending").length

  const upcomingVacations = employee.vacations
    .filter((v) => v.status === "approved" && new Date(v.start_date) > new Date())
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())[0]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">Panel de Control</h1>
          <p className="text-gray-600">Bienvenido, {employee.full_name}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="bg-sky-600 hover:bg-sky-700">
            <Link href="/absences/new">Registrar Ausencia</Link>
          </Button>
          <Button asChild className="bg-sky-600 hover:bg-sky-700">
            <Link href="/vacations/new">Solicitar Vacaciones</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Ausencias Pendientes</CardTitle>
            <CardDescription>Solicitudes en espera de aprobación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold">{pendingAbsences}</span>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/absences">Ver todas</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Vacaciones Pendientes</CardTitle>
            <CardDescription>Solicitudes en espera de aprobación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold">{pendingVacations}</span>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/vacations">Ver todas</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Reportes</CardTitle>
            <CardDescription>Descarga tus reportes personales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-sky-500" />
                <span className="text-sm">Historial completo</span>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/reports">Ver reportes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Vacaciones</CardTitle>
            <CardDescription>Vacaciones aprobadas</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingVacations ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">
                      {formatDate(upcomingVacations.start_date)} - {formatDate(upcomingVacations.end_date)}
                    </p>
                    <p className="text-sm text-gray-500">{upcomingVacations.days} días</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-green-600">Aprobado</span>
                </div>
                {upcomingVacations.comments && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                    <p className="font-medium">Comentarios:</p>
                    <p>{upcomingVacations.comments}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No tienes vacaciones programadas</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas Solicitudes</CardTitle>
            <CardDescription>Estado de tus solicitudes recientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...employee.absences, ...employee.vacations]
                .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
                .slice(0, 3)
                .map((item) => {
                  const isVacation = "days" in item
                  return (
                    <div key={item.id} className="flex items-start gap-2 pb-2 border-b">
                      {item.status === "approved" ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      ) : item.status === "rejected" ? (
                        <XCircle className="h-5 w-5 text-red-500 mt-1" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500 mt-1" />
                      )}
                      <div>
                        <p className="font-medium">
                          {isVacation ? "Vacaciones" : "Ausencia"}: {formatDate(item.start_date)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isVacation
                            ? `${(item as Vacation).days} días`
                            : `Motivo: ${(item as Absence).reason.substring(0, 30)}${
                                (item as Absence).reason.length > 30 ? "..." : ""
                              }`}
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
                  )
                })}
              {[...employee.absences, ...employee.vacations].length === 0 && (
                <p className="text-gray-500">No tienes solicitudes recientes</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
