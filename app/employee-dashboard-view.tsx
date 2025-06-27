import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, FileText, Clock, CheckCircle, XCircle } from "lucide-react"

export function EmployeeDashboardView() {
  return (
    <div className="p-6 bg-slate-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">Panel de Control</h1>
          <p className="text-gray-600">Bienvenido, Juan Pérez</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-sky-600 hover:bg-sky-700">Registrar Ausencia</Button>
          <Button className="bg-sky-600 hover:bg-sky-700">Solicitar Vacaciones</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Ausencias Pendientes</CardTitle>
            <CardDescription>Solicitudes en espera de aprobación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold">2</span>
              </div>
              <Button variant="ghost" size="sm">
                Ver todas
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
                <span className="text-2xl font-bold">1</span>
              </div>
              <Button variant="ghost" size="sm">
                Ver todas
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
              <Button variant="ghost" size="sm">
                Ver reportes
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
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">15 de Julio de 2023 - 30 de Julio de 2023</p>
                  <p className="text-sm text-gray-500">15 días</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-600">Aprobado</span>
              </div>
              <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                <p className="font-medium">Comentarios:</p>
                <p>Vacaciones aprobadas según lo solicitado. Recuerda completar los pendientes antes de irte.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas Solicitudes</CardTitle>
            <CardDescription>Estado de tus solicitudes recientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2 pb-2 border-b">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <p className="font-medium">Ausencia: 5 de Mayo de 2023</p>
                  <p className="text-sm text-gray-500">Motivo: Consulta médica</p>
                  <p className="text-xs text-green-600">Aprobado</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pb-2 border-b">
                <Clock className="h-5 w-5 text-amber-500 mt-1" />
                <div>
                  <p className="font-medium">Ausencia: 12 de Junio de 2023</p>
                  <p className="text-sm text-gray-500">Motivo: Trámites personales</p>
                  <p className="text-xs text-amber-600">Pendiente</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pb-2 border-b">
                <XCircle className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <p className="font-medium">Vacaciones: 1 de Junio de 2023</p>
                  <p className="text-sm text-gray-500">5 días</p>
                  <p className="text-xs text-red-600">Rechazado</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
