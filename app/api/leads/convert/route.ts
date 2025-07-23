import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lead_id } = body

    // Get lead data
    const { data: lead, error: leadError } = await supabase.from("leads").select("*").eq("id", lead_id).single()

    if (leadError || !lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    // Create customer from lead
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .insert({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        address: lead.address,
        created_from_lead: lead_id,
      })
      .select()
      .single()

    if (customerError) {
      return NextResponse.json({ error: customerError.message }, { status: 400 })
    }

    // Update lead status to converted
    const { error: updateError } = await supabase
      .from("leads")
      .update({
        status: "converted",
        updated_at: new Date().toISOString(),
      })
      .eq("id", lead_id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    return NextResponse.json({
      message: "Lead converted successfully",
      customer,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
