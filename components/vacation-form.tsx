"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Loader2, Send } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, differenceInCalendarDays, addDays } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function VacationForm({
  employeeId,
  employeeName,
}: {
  employeeId?: string
  employeeName?: string
}) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    addDays(new Date(), 7), // Default to 1 week from now
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    addDays(new Date(), 14), // Default to 2 weeks from now
  )
  const [days, setDays] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  // Calculate days when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const daysDiff = differenceInCalendarDays(endDate, startDate) + 1
      setDays(daysDiff > 0 ? daysDiff : 0)
    } else {
      setDays(0)
    }
  }, [startDate, endDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate) {
      toast({
        title: "Error en el formulario",
        description: "Por favor selecciona las fechas de inicio y fin",
        variant: "destructive",
      })
      return
    }

    if (days <= 0) {
      toast({
        title: "Error en las fechas",
        description: "La fecha de fin debe ser posterior a la fecha de inicio",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      // Create vacation request
      const { error } = await supabase.from("vacations").insert({
        employee_id: employeeId,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        days,
        status: "pending",
      })

      if (error) {
        throw error
      }

      toast({
        title: "Solicitud enviada",
        description: "Tu solicitud de vacaciones ha sido enviada correctamente",
      })

      router.push("/vacations")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error al enviar la solicitud",
        description: error.message || "Ha ocurrido un error, intenta nuevamente",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
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
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date)
                      // If end date is before new start date, update it
                      if (endDate && date && endDate < date) {
                        setEndDate(date)
                      }
                    }}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
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
                    disabled={(date) => (startDate ? date < startDate : date < new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Días solicitados</Label>
            <Input value={days} disabled />
            <p className="text-xs text-gray-500">Total de días incluyendo la fecha de inicio y fin</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-sky-600 hover:bg-sky-700" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Solicitar Vacaciones
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
