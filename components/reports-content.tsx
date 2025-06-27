"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Download } from "lucide-react"
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

type ReportsContentProps = {
  absences: Absence[]
  vacations: Vacation[]
  employeeId?: string
}

export function ReportsContent({ absences, vacations, employeeId }: ReportsContentProps) {
  const [absenceStatus, setAbsenceStatus] = useState<string>("all")
  const [vacationStatus, setVacationStatus] = useState<string>("all")
  const [absenceYear, setAbsenceYear] = useState<string>("all")
  const [vacationYear, setVacationYear] = useState<string>("all")

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: es })
  }

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

  // Filter absences based on selected filters
  const filteredAbsences = absences.filter((absence) => {
    const absenceDate = new Date(absence.start_date)
    const absenceYearMatch = absenceYear === "all" || absenceDate.getFullYear().toString() === absenceYear
    const absenceStatusMatch = absenceStatus === "all" || absence.status === absenceStatus
    return absenceYearMatch && absenceStatusMatch
  })

  // Filter vacations based on selected filters
  const filteredVacations = vacations.filter((vacation) => {
    const vacationDate = new Date(vacation.start_date)
    const vacationYearMatch = vacationYear === "all" || vacationDate.getFullYear().toString() === vacationYear
    const vacationStatusMatch = vacationStatus === "all" || vacation.status === vacationStatus
    return vacationYearMatch && vacationStatusMatch
  })

  // Get unique years from absences and vacations
  const absenceYears = [...new Set(absences.map((a) => new Date(a.start_date).getFullYear()))].sort((a, b) => b - a)
  const vacationYears = [...new Set(vacations.map((v) => new Date(v.start_date).getFullYear()))].sort((a, b) => b - a)

  // Generate CSV data for absences
  const generateAbsencesCSV = () => {
    const headers = ["Fecha Inicio", "Fecha Fin", "Motivo", "Estado"]
    const rows = filteredAbsences.map((absence) => [
      formatDate(absence.start_date),
      formatDate(absence.end_date),
      absence.reason,
      getStatusText(absence.status),
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `ausencias_${employeeId || "empleado"}_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Generate CSV data for vacations
  const generateVacationsCSV = () => {
    const headers = ["Fecha Inicio", "Fecha Fin", "Días", "Estado", "Comentarios"]
    const rows = filteredVacations.map((vacation) => [
      formatDate(vacation.start_date),
      formatDate(vacation.end_date),
      vacation.days.toString(),
      getStatusText(vacation.status),
      vacation.comments || "",
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `vacaciones_${employeeId || "empleado"}_${new Date().toISOString().split("T")[0]}.csv`,
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sky-700">Mis Reportes</h1>
        <p className="text-gray-600">Visualiza y descarga tu historial de ausencias y vacaciones</p>
      </div>

      <Tabs defaultValue="absences" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="absences">Ausencias</TabsTrigger>
          <TabsTrigger value="vacations">Vacaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="absences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Ausencias</CardTitle>
              <CardDescription>Registro de todas tus ausencias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="absence-status">Estado</Label>
                    <Select value={absenceStatus} onValueChange={setAbsenceStatus}>
                      <SelectTrigger id="absence-status" className="w-[180px]">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="approved">Aprobado</SelectItem>
                        <SelectItem value="rejected">Rechazado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="absence-year">Año</Label>
                    <Select value={absenceYear} onValueChange={setAbsenceYear}>
                      <SelectTrigger id="absence-year" className="w-[180px]">
                        <SelectValue placeholder="Seleccionar año" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {absenceYears.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={generateAbsencesCSV} className="bg-sky-600 hover:bg-sky-700">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar CSV
                </Button>
              </div>

              {filteredAbsences.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha Inicio</TableHead>
                        <TableHead>Fecha Fin</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAbsences.map((absence) => (
                        <TableRow key={absence.id}>
                          <TableCell>{formatDate(absence.start_date)}</TableCell>
                          <TableCell>{formatDate(absence.end_date)}</TableCell>
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
                <div className="text-center py-8 text-gray-500">
                  No se encontraron ausencias con los filtros seleccionados
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vacations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Vacaciones</CardTitle>
              <CardDescription>Registro de todas tus solicitudes de vacaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vacation-status">Estado</Label>
                    <Select value={vacationStatus} onValueChange={setVacationStatus}>
                      <SelectTrigger id="vacation-status" className="w-[180px]">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="approved">Aprobado</SelectItem>
                        <SelectItem value="rejected">Rechazado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vacation-year">Año</Label>
                    <Select value={vacationYear} onValueChange={setVacationYear}>
                      <SelectTrigger id="vacation-year" className="w-[180px]">
                        <SelectValue placeholder="Seleccionar año" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {vacationYears.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={generateVacationsCSV} className="bg-sky-600 hover:bg-sky-700">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar CSV
                </Button>
              </div>

              {filteredVacations.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha Inicio</TableHead>
                        <TableHead>Fecha Fin</TableHead>
                        <TableHead>Días</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Comentarios</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVacations.map((vacation) => (
                        <TableRow key={vacation.id}>
                          <TableCell>{formatDate(vacation.start_date)}</TableCell>
                          <TableCell>{formatDate(vacation.end_date)}</TableCell>
                          <TableCell>{vacation.days}</TableCell>
                          <TableCell className={getStatusClass(vacation.status)}>
                            {getStatusText(vacation.status)}
                          </TableCell>
                          <TableCell className="max-w-[300px] truncate">{vacation.comments || "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron vacaciones con los filtros seleccionados
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
