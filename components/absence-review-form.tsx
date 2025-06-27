"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle, XCircle, Download, Loader2, FileText } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

type AbsenceWithProfile = {
  id: string
  employee_id: string
  start_date: string
  end_date: string
  reason: string
  status: "pending" | "approved" | "rejected"
  document_url?: string
  profiles: {
    full_name: string
    employee_id: string
  }
}

export function AbsenceReviewForm({ absence }: { absence: AbsenceWithProfile }) {
  const [status, setStatus] = useState<"approved" | "rejected" | null>(null)
  const [comments, setComments] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: es })
  }

  const handleDownloadDocument = async () => {
    if (!absence.document_url) return

    try {
      const { data, error } = await supabase.storage.from("documents").download(absence.document_url)

      if (error) throw error

      // Create a download link
      const url = URL.createObjectURL(data)
      const link = document.createElement("a")
      link.href = url
      link.download = absence.document_url.split("/").pop() || "documento.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error: any) {
      toast({
        title: "Error al descargar el documento",
        description: error.message || "No se pudo descargar el documento",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async () => {
    if (!status) {
      toast({
        title: "Acción requerida",
        description: "Debes aprobar o rechazar la solicitud",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      const { error } = await supabase
        .from("absences")
        .update({
          status,
          admin_comments: comments,
        })
        .eq("id", absence.id)

      if (error) throw error

      toast({
        title: status === "approved" ? "Solicitud aprobada" : "Solicitud rechazada",
        description: "La solicitud ha sido procesada correctamente",
      })

      router.push("/admin/absences")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error al procesar la solicitud",
        description: error.message || "Ha ocurrido un error, intenta nuevamente",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Empleado</h3>
            <p className="text-lg">{absence.profiles.full_name}</p>
            <p className="text-sm text-gray-500">Legajo: {absence.profiles.employee_id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Período</h3>
            <p className="text-lg">{formatDate(absence.start_date)}</p>
            <p className="text-sm text-gray-500">hasta {formatDate(absence.end_date)}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Motivo de la ausencia</h3>
          <div className="p-3 bg-gray-50 rounded-md">
            <p>{absence.reason}</p>
          </div>
        </div>

        {absence.document_url && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Documento justificativo</h3>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadDocument}>
              <FileText className="h-4 w-4" />
              Descargar documento
              <Download className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Comentarios (opcional)</h3>
          <Textarea
            placeholder="Agregar comentarios sobre esta solicitud..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Volver
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
            onClick={() => setStatus("rejected")}
            disabled={submitting}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Rechazar
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setStatus("approved")}
            disabled={submitting}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Aprobar
          </Button>
          {status && (
            <Button className="bg-sky-600 hover:bg-sky-700" onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Confirmar"
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
