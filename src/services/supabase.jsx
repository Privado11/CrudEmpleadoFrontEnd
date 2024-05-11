import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jxwsqltyzzuzwpgsfclw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4d3NxbHR5enp1endwZ3NmY2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2ODQ4MDksImV4cCI6MjAzMDI2MDgwOX0.n7hjF6mk8KTCb7mXHpAzIkoe2fWhbd2Ut5SiRXe3bzA";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
