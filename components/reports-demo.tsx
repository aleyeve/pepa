"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, LogOut } from "lucide-react"

export function ReportsDemo({
  user,
  absences,
  vacations,
  onBack,
  onLogout,
}: {
  user: any
  absences: any[]
  vacations: any[]
  onBack: () => void
  onLogout: () => void
}) {
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "approved":
        return "Aprobado"
      case "rejected":
        return "Rechazado"
      default:
        return status
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "text-amber-600"
      case "approved":
        return "text-green-600"
      case "rejected":
        return "text-red-600"
      default:
        return ""
    }
  }

  const generateAbsencesCSV = () => {
    const headers = ["Fecha Inicio", "Fecha Fin", "Motivo", "Estado"]
    const rows = absences.map((absence) => [
      absence.startDate,
      absence.endDate,
      absence.reason,
      getStatusText(absence.status),
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `ausencias_${user.legajo}_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const generateVacationsCSV = () => {
    const headers = ["Fecha Inicio", "Fecha Fin", "Días", "Estado"]
    const rows = vacations.map((vacation) => [
      vacation.startDate,
      vacation.endDate,
      vacation.days.toString(),
      getStatusText(vacation.status),
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `vacaciones_${user.legajo}_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-xl font-bold text-sky-700">
              {user.role === "admin" ? "Reportes del Sistema" : "Mis Reportes"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Bienvenido, {user.name}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-sky-700">
              {user.role === "admin" ? "Reportes del Sistema" : "Mi Historial"}
            </h2>
            <p className="text-gray-600">
              {user.role === "admin"
                ? "Visualiza y descarga reportes de todos los empleados"
                : "Visualiza y descarga tu historial de ausencias y vacaciones"}
            </p>
          </div>

          <Tabs defaultValue="absences" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="absences">Ausencias</TabsTrigger>
              <TabsTrigger value="vacations">Vacaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="absences" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Historial de Ausencias</CardTitle>
                      <CardDescription>
                        {user.role === "admin"
                          ? "Registro de todas las ausencias del sistema"
                          : "Registro de todas tus ausencias"}
                      </CardDescription>
                    </div>
                    <Button onClick={generateAbsencesCSV} className="bg-sky-600 hover:bg-sky-700">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {absences.length > 0 ? (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {user.role === "admin" && <TableHead>Empleado</TableHead>}
                            <TableHead>Fecha Inicio</TableHead>
                            <TableHead>Fecha Fin</TableHead>
                            <TableHead>Motivo</TableHead>
                            <TableHead>Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {absences.map((absence) => (
                            <TableRow key={absence.id}>
                              {user.role === "admin" && (
                                <TableCell>
                                  {absence.employee} ({absence.legajo})
                                </TableCell>
                              )}
                              <TableCell>{absence.startDate}</TableCell>
                              <TableCell>{absence.endDate}</TableCell>
                              <TableCell className="max-w-[300px] truncate">{absence.reason}</TableCell>
                              <TableCell className={getStatusClass(absence.status)}>
                                {getStatusText(absence.status)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No se encontraron ausencias</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vacations" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Historial de Vacaciones</CardTitle>
                      <CardDescription>
                        {user.role === "admin"
                          ? "Registro de todas las vacaciones del sistema"
                          : "Registro de todas tus solicitudes de vacaciones"}
                      </CardDescription>
                    </div>
                    <Button onClick={generateVacationsCSV} className="bg-sky-600 hover:bg-sky-700">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {vacations.length > 0 ? (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {user.role === "admin" && <TableHead>Empleado</TableHead>}
                            <TableHead>Fecha Inicio</TableHead>
                            <TableHead>Fecha Fin</TableHead>
                            <TableHead>Días</TableHead>
                            <TableHead>Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vacations.map((vacation) => (
                            <TableRow key={vacation.id}>
                              {user.role === "admin" && (
                                <TableCell>
                                  {vacation.employee} ({vacation.legajo})
                                </TableCell>
                              )}
                              <TableCell>{vacation.startDate}</TableCell>
                              <TableCell>{vacation.endDate}</TableCell>
                              <TableCell>{vacation.days}</TableCell>
                              <TableCell className={getStatusClass(vacation.status)}>
                                {getStatusText(vacation.status)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No se encontraron vacaciones</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
