"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Loader2, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function AbsenceForm({
  employeeId,
  employeeName,
}: {
  employeeId?: string
  employeeName?: string
}) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [reason, setReason] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate || !reason) {
      toast({
        title: "Error en el formulario",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      let documentUrl = null

      // Upload file if provided
      if (file) {
        const fileExt = file.name.split(".").pop()
        const fileName = `${employeeId}-${Date.now()}.${fileExt}`
        const filePath = `absences/${fileName}`

        const { error: uploadError, data } = await supabase.storage.from("documents").upload(filePath, file)

        if (uploadError) {
          throw uploadError
        }

        documentUrl = filePath
      }

      // Create absence record
      const { error } = await supabase.from("absences").insert({
        employee_id: employeeId,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        reason,
        document_url: documentUrl,
        status: "pending",
      })

      if (error) {
        throw error
      }

      toast({
        title: "Ausencia registrada",
        description: "Tu solicitud ha sido enviada correctamente",
      })

      router.push("/absences")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error al registrar la ausencia",
        description: error.message || "Ha ocurrido un error, intenta nuevamente",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Empleado</Label>
            <Input value={employeeName || ""} disabled />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Fecha de inicio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">Fecha de fin</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => (startDate ? date < startDate : false)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo de la ausencia</Label>
            <Textarea
              id="reason"
              placeholder="Describe el motivo de tu ausencia"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document">Documento justificativo (opcional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="document"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.jpg,.jpeg,.png"
                className="flex-1"
              />
              {file && <p className="text-sm text-gray-500 truncate max-w-[200px]">{file.name}</p>}
            </div>
            <p className="text-xs text-gray-500">Formatos aceptados: PDF, JPG, PNG (máx. 5MB)</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-sky-600 hover:bg-sky-700" disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Registrar Ausencia
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
