import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { ReportsContent } from "@/components/reports-content"

export default async function ReportsPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Get employee data
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, employee_id")
    .eq("id", session.user.id)
    .single()

  if (profile?.role === "admin") {
    redirect("/admin/reports")
  }

  // Get absences and vacations for the employee
  const { data: absences } = await supabase
    .from("absences")
    .select("*")
    .eq("employee_id", profile?.employee_id)
    .order("start_date", { ascending: false })

  const { data: vacations } = await supabase
    .from("vacations")
    .select("*")
    .eq("employee_id", profile?.employee_id)
    .order("start_date", { ascending: false })

  return <ReportsContent absences={absences || []} vacations={vacations || []} employeeId={profile?.employee_id} />
}
