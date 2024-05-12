
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vdppoczcraaevxqasskp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcHBvY3pjcmFhZXZ4cWFzc2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxODgxOTEsImV4cCI6MjAzMDc2NDE5MX0.RcIVjfpHBbZJ9JTnlg5NkC1eWOVztr7xxaZmDlLIQsY'
 export const supabase = createClient(supabaseUrl, supabaseKey)


