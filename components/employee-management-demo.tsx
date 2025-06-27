"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Mail, Calendar, LogOut } from "lucide-react"

const mockEmployees = [
  {
    id: 1,
    name: "Juan Pérez",
    legajo: "EMP001",
    email: "juan.perez@empresa.com",
    role: "employee",
    joinDate: "15/03/2023",
    absences: 3,
    vacations: 2,
  },
  {
    id: 2,
    name: "María González",
    legajo: "EMP002",
    email: "maria.gonzalez@empresa.com",
    role: "employee",
    joinDate: "22/05/2023",
    absences: 1,
    vacations: 1,
  },
]

export function EmployeeManagementDemo({
  user,
  onBack,
  onLogout,
}: {
  user: any
  onBack: () => void
  onLogout: () => void
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-xl font-bold text-sky-700">Gestión de Empleados</h1>
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
            <h2 className="text-2xl font-bold text-sky-700">Lista de Empleados</h2>
            <Button className="bg-sky-600 hover:bg-sky-700">
              <Users className="h-4 w-4 mr-2" />
              Agregar Empleado
            </Button>
          </div>

          <div className="grid gap-4">
            {mockEmployees.map((employee) => (
              <Card key={employee.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{employee.name}</CardTitle>
                      <CardDescription>Legajo: {employee.legajo}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {employee.role === "employee" ? "Empleado" : "Admin"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email
                      </p>
                      <p className="text-sm">{employee.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Fecha de ingreso
                      </p>
                      <p className="text-sm">{employee.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Estadísticas</p>
                      <p className="text-sm">
                        {employee.absences} ausencias, {employee.vacations} vacaciones
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Ver Historial
                    </Button>
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
