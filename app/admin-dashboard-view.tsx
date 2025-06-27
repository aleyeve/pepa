import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Clock, CalendarDays } from "lucide-react"

export function AdminDashboardView() {
  return (
    <div className="p-6 bg-slate-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">Panel de Administración</h1>
          <p className="text-gray-600">Gestión de empleados, ausencias y vacaciones</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-sky-600 hover:bg-sky-700">Registrar Empleado</Button>
          <Button variant="outline">Generar Reportes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Ausencias Pendientes</CardTitle>
            <CardDescription>Solicitudes por aprobar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold">8</span>
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
                <span className="text-2xl font-bold">5</span>
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
            <CardDescription>Total de empleados registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-sky-500" />
                <span className="text-2xl font-bold">24</span>
              </div>
              <Button variant="ghost" size="sm">
                Ver todos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Ausencias Pendientes</CardTitle>
            <CardDescription>Solicitudes recientes por aprobar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2 pb-3 border-b">
                  <Clock className="h-5 w-5 text-amber-500 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium">{`María González (Legajo: EMP00${i + 3})`}</p>
                    <p className="text-sm">{`${10 + i} de Junio de 2023 - ${11 + i} de Junio de 2023`}</p>
                    <p className="text-sm text-gray-500 truncate">Consulta médica especialista</p>
                  </div>
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                    Revisar
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                Ver todas (8)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vacaciones Pendientes</CardTitle>
            <CardDescription>Solicitudes recientes por aprobar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-start gap-2 pb-3 border-b">
                  <CalendarDays className="h-5 w-5 text-amber-500 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium">{`Carlos Rodríguez (Legajo: EMP00${i})`}</p>
                    <p className="text-sm">{`1 de Julio de 2023 - ${15 + i} de Julio de 2023`}</p>
                    <p className="text-sm text-gray-500">{`${14 + i} días`}</p>
                  </div>
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                    Revisar
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                Ver todas (5)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reportes y Exportación</CardTitle>
          <CardDescription>Genera reportes personalizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
              <Clock className="h-8 w-8 mb-2 text-sky-600" />
              <span className="font-medium">Reporte de Ausencias</span>
              <span className="text-xs text-gray-500 mt-1">Exportar listado de ausencias</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
              <CalendarDays className="h-8 w-8 mb-2 text-sky-600" />
              <span className="font-medium">Reporte de Vacaciones</span>
              <span className="text-xs text-gray-500 mt-1">Exportar listado de vacaciones</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
              <Users className="h-8 w-8 mb-2 text-sky-600" />
              <span className="font-medium">Reporte de Empleados</span>
              <span className="text-xs text-gray-500 mt-1">Exportar listado de empleados</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
