import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function AbsenceFormView() {
  return (
    <div className="p-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-sky-700 mb-6">Registrar Nueva Ausencia</h1>

        <Card>
          <CardContent className="pt-6">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label>Empleado</Label>
                <Input value="Juan Pérez" disabled />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Fecha de inicio</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        15 de Junio de 2023
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={new Date()} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">Fecha de fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        16 de Junio de 2023
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={new Date()} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo de la ausencia</Label>
                <Textarea
                  id="reason"
                  placeholder="Describe el motivo de tu ausencia"
                  rows={4}
                  defaultValue="Tengo una cita médica programada para un chequeo anual."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="document">Documento justificativo (opcional)</Label>
                <div className="flex items-center gap-2">
                  <Input id="document" type="file" className="flex-1" />
                </div>
                <p className="text-xs text-gray-500">Formatos aceptados: PDF, JPG, PNG (máx. 5MB)</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-sky-600 hover:bg-sky-700">
                  <Upload className="mr-2 h-4 w-4" />
                  Registrar Ausencia
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
