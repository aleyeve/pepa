"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Clock, CalendarDays, LogOut, Download } from "lucide-react"

export function AdminDashboardDemo({ user, onLogout }: { user: any; onLogout: () => void }) {
  const handleDownloadCSV = (type: string) => {
    const data =
      type === "ausencias"
        ? "Empleado,Fecha Inicio,Fecha Fin,Motivo,Estado\nJuan Pérez,15/01/2024,15/01/2024,Consulta médica,Pendiente\nMaría González,10/01/2024,12/01/2024,Enfermedad,Aprobado"
        : "Empleado,Fecha Inicio,Fecha Fin,Días,Estado\nJuan Pérez,01/02/2024,07/02/2024,7,Pendiente\nMaría González,15/03/2024,22/03/2024,8,Aprobado"

    const blob = new Blob([data], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${type}_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
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
                  <span className="text-2xl font-bold">2</span>
                </div>
                <Button variant="ghost" size="sm">
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
                  <span className="text-2xl font-bold">1</span>
                </div>
                <Button variant="ghost" size="sm">
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
                <Button variant="ghost" size="sm">
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
                <div className="flex items-start gap-2 pb-3 border-b">
                  <Clock className="h-5 w-5 text-amber-500 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium">Juan Pérez (EMP001)</p>
                    <p className="text-sm">15 de Enero de 2024</p>
                    <p className="text-sm text-gray-500">Consulta médica</p>
                  </div>
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                    Revisar
                  </Button>
                </div>
                <div className="flex items-start gap-2 pb-3 border-b">
                  <Clock className="h-5 w-5 text-green-500 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium">María González (EMP002)</p>
                    <p className="text-sm">10-12 de Enero de 2024</p>
                    <p className="text-sm text-gray-500">Enfermedad</p>
                  </div>
                  <span className="text-sm text-green-600">Aprobado</span>
                </div>
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
                  Descargar Reporte de Ausencias
                </Button>
                <Button onClick={() => handleDownloadCSV("vacaciones")} className="w-full bg-sky-600 hover:bg-sky-700">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Reporte de Vacaciones
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
