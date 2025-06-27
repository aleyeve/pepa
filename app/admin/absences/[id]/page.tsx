import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { AbsenceReviewForm } from "@/components/absence-review-form"

export default async function AbsenceReviewPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Check if user is an admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (profile?.role !== "admin") {
    redirect("/dashboard")
  }

  // Get absence data with employee info
  const { data: absence } = await supabase
    .from("absences")
    .select(`
      *,
      profiles:employee_id (
        full_name,
        employee_id
      )
    `)
    .eq("id", params.id)
    .single()

  if (!absence) {
    redirect("/admin/absences")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-sky-700 mb-6">Revisar Solicitud de Ausencia</h1>
      <AbsenceReviewForm absence={absence} />
    </div>
  )
}
