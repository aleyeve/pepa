"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Clock, CalendarDays, LogOut, Download } from "lucide-react"

export function AdminDashboardDemo({
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

  const handleDownloadCSV = (type: string) => {
    let data = ""
    let filename = ""

    if (type === "ausencias") {
      data =
        "Empleado,Legajo,Fecha Inicio,Fecha Fin,Motivo,Estado\n" +
        absences
          .map((a) => `${a.employee},${a.legajo},${a.startDate},${a.endDate},"${a.reason}",${a.status}`)
          .join("\n")
      filename = `ausencias_${new Date().toISOString().split("T")[0]}.csv`
    } else {
      data =
        "Empleado,Legajo,Fecha Inicio,Fecha Fin,Días,Estado\n" +
        vacations.map((v) => `${v.employee},${v.legajo},${v.startDate},${v.endDate},${v.days},${v.status}`).join("\n")
      filename = `vacaciones_${new Date().toISOString().split("T")[0]}.csv`
    }

    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-sky-700">Panel de Administración</h1>
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
                  <span className="text-2xl font-bold">{pendingAbsences.length}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onViewChange("absences")}>
                  Gestionar
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
                  <span className="text-2xl font-bold">{pendingVacations.length}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onViewChange("vacations")}>
                  Gestionar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Empleados</CardTitle>
              <CardDescription>Total registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-sky-500" />
                  <span className="text-2xl font-bold">2</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onViewChange("employees")}>
                  Ver todos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ausencias Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {absences.slice(0, 3).map((absence) => (
                  <div key={absence.id} className="flex items-start gap-2 pb-3 border-b">
                    <Clock
                      className={`h-5 w-5 mt-1 ${
                        absence.status === "pending"
                          ? "text-amber-500"
                          : absence.status === "approved"
                            ? "text-green-500"
                            : "text-red-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium">
                        {absence.employee} ({absence.legajo})
                      </p>
                      <p className="text-sm">
                        {absence.startDate} - {absence.endDate}
                      </p>
                      <p className="text-sm text-gray-500">{absence.reason.substring(0, 30)}...</p>
                    </div>
                    {absence.status === "pending" ? (
                      <Button
                        size="sm"
                        className="bg-sky-600 hover:bg-sky-700"
                        onClick={() => onViewChange("absences")}
                      >
                        Revisar
                      </Button>
                    ) : (
                      <span className={`text-sm ${absence.status === "approved" ? "text-green-600" : "text-red-600"}`}>
                        {absence.status === "approved" ? "Aprobado" : "Rechazado"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exportar Datos</CardTitle>
              <CardDescription>Descargar reportes en formato CSV</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={() => handleDownloadCSV("ausencias")} className="w-full bg-sky-600 hover:bg-sky-700">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Reporte de Ausencias ({absences.length})
                </Button>
                <Button onClick={() => handleDownloadCSV("vacaciones")} className="w-full bg-sky-600 hover:bg-sky-700">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Reporte de Vacaciones ({vacations.length})
                </Button>
                <Button onClick={() => onViewChange("reports")} variant="outline" className="w-full">
                  Ver Reportes Detallados
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
