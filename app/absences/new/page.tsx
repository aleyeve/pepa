import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { AbsenceForm } from "@/components/absence-form"

export default async function NewAbsencePage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Check if user is an employee
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, employee_id, full_name")
    .eq("id", session.user.id)
    .single()

  if (profile?.role === "admin") {
    redirect("/admin/dashboard")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-sky-700 mb-6">Registrar Nueva Ausencia</h1>
      <AbsenceForm employeeId={profile?.employee_id} employeeName={profile?.full_name} />
    </div>
  )
}
