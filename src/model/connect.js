// script de connexion à la base de données
const supabaseUrl = 'https://ggaotsudljxsthdmqksc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnYW90c3VkbGp4c3RoZG1xa3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4MTgzNTUsImV4cCI6MjAxMTM5NDM1NX0.p81Ufv8cNctvwfOyFXtpYlyDZPfT9phv0JhqHD-Ng0M'

const supabaseAuth = supabase.createClient(supabaseUrl, supabaseKey)