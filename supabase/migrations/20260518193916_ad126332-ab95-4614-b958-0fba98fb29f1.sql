CREATE OR REPLACE FUNCTION public.fas_delete_child(_child_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_fas_owner(auth.uid()) THEN
    RAISE EXCEPTION 'Only the FAS owner can delete child records';
  END IF;

  DELETE FROM public.fas_incidents WHERE child_id = _child_id;
  DELETE FROM public.fas_billing_arrangements WHERE child_id = _child_id;
  DELETE FROM public.fas_collectors WHERE child_id = _child_id;
  DELETE FROM public.fas_guardians WHERE child_id = _child_id;
  DELETE FROM public.fas_attendance_days WHERE child_id = _child_id;
  DELETE FROM public.fas_invoices WHERE child_id = _child_id;
  DELETE FROM public.fas_children WHERE id = _child_id;
END;
$$;