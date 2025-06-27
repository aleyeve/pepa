"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, Download } from "lucide-react"
import { useState } from "react"

const mockAbsences = [
  {
    id: 1,
    employee: "Juan Pérez",
    legajo: "EMP001",
    startDate: "15/01/2024",
    endDate: "15/01/2024",
    reason: "Consulta médica con especialista",
    status: "pending",
    document: true,
  },
  {
    id: 2,
    employee: "María González",
    legajo: "EMP002",
    startDate: "10/01/2024",
    endDate: "12/01/2024",
    reason: "Enfermedad - Gripe",
    status: "approved",
    document: false,
  },
  {
    id: 3,
    employee: "Carlos Rodríguez",
    legajo: "EMP003",
    startDate: "08/01/2024",
    endDate: "08/01/2024",
    reason: "Trámites personales",
    status: "rejected",
    document: false,
  },
]

export function AbsenceManagement({ user, onBack, onLogout }: { user: any; onBack: () => void; onLogout: () => void }) {
  const [absences, setAbsences] = useState(mockAbsences)

  const handleStatusChange = (id: number, newStatus: string) => {
    setAbsences((prev) => prev.map((absence) => (absence.id === id ? { ...absence, status: newStatus } : absence)))
  }

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
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-sky-700">Solicitudes de Ausencias</h2>
            <Button className="bg-sky-600 hover:bg-sky-700">
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
                        onClick={() => handleStatusChange(absence.id, "approved")}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                        onClick={() => handleStatusChange(absence.id, "rejected")}
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
