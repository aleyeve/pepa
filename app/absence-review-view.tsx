import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle, XCircle, Download, FileText } from "lucide-react"

export function AbsenceReviewView() {
  return (
    <div className="p-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-sky-700 mb-6">Revisar Solicitud de Ausencia</h1>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Empleado</h3>
                <p className="text-lg">María González</p>
                <p className="text-sm text-gray-500">Legajo: EMP004</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Período</h3>
                <p className="text-lg">12 de Junio de 2023</p>
                <p className="text-sm text-gray-500">hasta 13 de Junio de 2023</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Motivo de la ausencia</h3>
              <div className="p-3 bg-gray-50 rounded-md">
                <p>
                  Consulta médica con especialista para evaluación anual. Adjunto certificado médico que confirma la
                  cita programada.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Documento justificativo</h3>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Descargar documento
                <Download className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Comentarios (opcional)</h3>
              <Textarea placeholder="Agregar comentarios sobre esta solicitud..." rows={4} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Volver</Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Rechazar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Aprobar
              </Button>
              <Button className="bg-sky-600 hover:bg-sky-700">Confirmar</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
