"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, Download, LogOut } from "lucide-react"

export function AbsenceManagementDemo({
  user,
  absences,
  onStatusChange,
  onBack,
  onLogout,
}: {
  user: any
  absences: any[]
  onStatusChange: (id: number, status: string) => void
  onBack: () => void
  onLogout: () => void
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-600 border-amber-600">
            Pendiente
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Aprobado
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Rechazado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const handleDownloadCSV = () => {
    const data =
      "Empleado,Legajo,Fecha Inicio,Fecha Fin,Motivo,Estado\n" +
      absences.map((a) => `${a.employee},${a.legajo},${a.startDate},${a.endDate},"${a.reason}",${a.status}`).join("\n")

    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ausencias_${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
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
            <h1 className="text-xl font-bold text-sky-700">Gestión de Ausencias</h1>
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
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-sky-700">Solicitudes de Ausencias</h2>
            <Button onClick={handleDownloadCSV} className="bg-sky-600 hover:bg-sky-700">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>

          <div className="grid gap-4">
            {absences.map((absence) => (
              <Card key={absence.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{absence.employee}</CardTitle>
                      <CardDescription>Legajo: {absence.legajo}</CardDescription>
                    </div>
                    {getStatusBadge(absence.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Período</p>
                      <p>
                        {absence.startDate} - {absence.endDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Documento</p>
                      <p>{absence.document ? "✅ Adjuntado" : "❌ Sin documento"}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Motivo</p>
                    <p className="text-sm bg-gray-50 p-2 rounded">{absence.reason}</p>
                  </div>
                  {absence.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => onStatusChange(absence.id, "approved")}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                        onClick={() => onStatusChange(absence.id, "rejected")}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
