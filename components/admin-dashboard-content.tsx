"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Clock, CalendarDays } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

type Absence = {
  id: string
  employee_id: string
  start_date: string
  end_date: string
  reason: string
  status: "pending" | "approved" | "rejected"
  document_url?: string
  profiles?: {
    full_name: string
    employee_id: string
  }
}

type Vacation = {
  id: string
  employee_id: string
  start_date: string
  end_date: string
  days: number
  status: "pending" | "approved" | "rejected"
  comments?: string
  profiles?: {
    full_name: string
    employee_id: string
  }
}

type AdminDashboardContentProps = {
  pendingAbsencesCount: number
  pendingVacationsCount: number
  employeesCount: number
  pendingAbsences: Absence[]
  pendingVacations: Vacation[]
}

export function AdminDashboardContent({
  pendingAbsencesCount,
  pendingVacationsCount,
  employeesCount,
  pendingAbsences,
  pendingVacations,
}: AdminDashboardContentProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: es })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">Panel de Administración</h1>
          <p className="text-gray-600">Gestión de empleados, ausencias y vacaciones</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="bg-sky-600 hover:bg-sky-700">
            <Link href="/admin/employees/new">Registrar Empleado</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/reports">Generar Reportes</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Ausencias Pendientes</CardTitle>
            <CardDescription>Solicitudes por aprobar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold">{pendingAbsencesCount}</span>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/absences">Gestionar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Vacaciones Pendientes</CardTitle>
            <CardDescription>Solicitudes por aprobar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold">{pendingVacationsCount}</span>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/vacations">Gestionar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Empleados</CardTitle>
            <CardDescription>Total de empleados registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-sky-500" />
                <span className="text-2xl font-bold">{employeesCount}</span>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/employees">Ver todos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ausencias Pendientes</CardTitle>
            <CardDescription>Solicitudes recientes por aprobar</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingAbsences.length > 0 ? (
              <div className="space-y-4">
                {pendingAbsences.slice(0, 5).map((absence) => (
                  <div key={absence.id} className="flex items-start gap-2 pb-3 border-b">
                    <Clock className="h-5 w-5 text-amber-500 mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">
                        {absence.profiles?.full_name || "Empleado"} (Legajo: {absence.profiles?.employee_id || "N/A"})
                      </p>
                      <p className="text-sm">
                        {formatDate(absence.start_date)} - {formatDate(absence.end_date)}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {absence.reason.substring(0, 50)}
                        {absence.reason.length > 50 ? "..." : ""}
                      </p>
                    </div>
                    <Button asChild size="sm" className="bg-sky-600 hover:bg-sky-700">
                      <Link href={`/admin/absences/${absence.id}`}>Revisar</Link>
                    </Button>
                  </div>
                ))}
                {pendingAbsences.length > 5 && (
                  <Button asChild variant="outline" className="w-full mt-2">
                    <Link href="/admin/absences">Ver todas ({pendingAbsencesCount})</Link>
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No hay ausencias pendientes</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vacaciones Pendientes</CardTitle>
            <CardDescription>Solicitudes recientes por aprobar</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingVacations.length > 0 ? (
              <div className="space-y-4">
                {pendingVacations.slice(0, 5).map((vacation) => (
                  <div key={vacation.id} className="flex items-start gap-2 pb-3 border-b">
                    <CalendarDays className="h-5 w-5 text-amber-500 mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">
                        {vacation.profiles?.full_name || "Empleado"} (Legajo: {vacation.profiles?.employee_id || "N/A"})
                      </p>
                      <p className="text-sm">
                        {formatDate(vacation.start_date)} - {formatDate(vacation.end_date)}
                      </p>
                      <p className="text-sm text-gray-500">{vacation.days} días</p>
                    </div>
                    <Button asChild size="sm" className="bg-sky-600 hover:bg-sky-700">
                      <Link href={`/admin/vacations/${vacation.id}`}>Revisar</Link>
                    </Button>
                  </div>
                ))}
                {pendingVacations.length > 5 && (
                  <Button asChild variant="outline" className="w-full mt-2">
                    <Link href="/admin/vacations">Ver todas ({pendingVacationsCount})</Link>
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No hay solicitudes de vacaciones pendientes</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
