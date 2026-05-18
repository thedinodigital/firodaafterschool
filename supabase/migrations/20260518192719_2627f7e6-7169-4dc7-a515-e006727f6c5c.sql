
-- Garda vetting records
CREATE TABLE public.fas_garda_vetting_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id uuid NOT NULL,
  document_type text NOT NULL DEFAULT 'Garda vetting disclosure',
  issue_date date,
  expiry_date date,
  file_path text,
  file_name text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.fas_garda_vetting_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fas_owner select fas_garda_vetting" ON public.fas_garda_vetting_records FOR SELECT TO authenticated USING (public.is_fas_owner(auth.uid()));
CREATE POLICY "fas_owner insert fas_garda_vetting" ON public.fas_garda_vetting_records FOR INSERT TO authenticated WITH CHECK (public.is_fas_owner(auth.uid()));
CREATE POLICY "fas_owner update fas_garda_vetting" ON public.fas_garda_vetting_records FOR UPDATE TO authenticated USING (public.is_fas_owner(auth.uid())) WITH CHECK (public.is_fas_owner(auth.uid()));
CREATE POLICY "fas_owner delete fas_garda_vetting" ON public.fas_garda_vetting_records FOR DELETE TO authenticated USING (public.is_fas_owner(auth.uid()));

-- Incidents
CREATE TABLE public.fas_incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  category text NOT NULL DEFAULT 'minor',
  summary text NOT NULL,
  action_taken text,
  reported_by text,
  parent_notified boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.fas_incidents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fas_owner select fas_incidents" ON public.fas_incidents FOR SELECT TO authenticated USING (public.is_fas_owner(auth.uid()));
CREATE POLICY "fas_owner insert fas_incidents" ON public.fas_incidents FOR INSERT TO authenticated WITH CHECK (public.is_fas_owner(auth.uid()));
CREATE POLICY "fas_owner update fas_incidents" ON public.fas_incidents FOR UPDATE TO authenticated USING (public.is_fas_owner(auth.uid())) WITH CHECK (public.is_fas_owner(auth.uid()));
CREATE POLICY "fas_owner delete fas_incidents" ON public.fas_incidents FOR DELETE TO authenticated USING (public.is_fas_owner(auth.uid()));

CREATE TRIGGER fas_incidents_touch BEFORE UPDATE ON public.fas_incidents
FOR EACH ROW EXECUTE FUNCTION public.fas_touch_updated_at();

-- Storage bucket (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('fas-vetting', 'fas-vetting', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "fas_owner read vetting files" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'fas-vetting' AND public.is_fas_owner(auth.uid()));
CREATE POLICY "fas_owner upload vetting files" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'fas-vetting' AND public.is_fas_owner(auth.uid()));
CREATE POLICY "fas_owner update vetting files" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'fas-vetting' AND public.is_fas_owner(auth.uid()));
CREATE POLICY "fas_owner delete vetting files" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'fas-vetting' AND public.is_fas_owner(auth.uid()));
