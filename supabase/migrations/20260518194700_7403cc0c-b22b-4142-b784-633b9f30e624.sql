
-- Page content (single row)
CREATE TABLE public.fas_page_content (
  id integer PRIMARY KEY DEFAULT 1,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fas_page_content_singleton CHECK (id = 1)
);

ALTER TABLE public.fas_page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads fas_page_content"
  ON public.fas_page_content FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "fas_owner inserts fas_page_content"
  ON public.fas_page_content FOR INSERT
  TO authenticated
  WITH CHECK (public.is_fas_owner(auth.uid()));

CREATE POLICY "fas_owner updates fas_page_content"
  ON public.fas_page_content FOR UPDATE
  TO authenticated
  USING (public.is_fas_owner(auth.uid()))
  WITH CHECK (public.is_fas_owner(auth.uid()));

CREATE TRIGGER trg_fas_page_content_touch
  BEFORE UPDATE ON public.fas_page_content
  FOR EACH ROW EXECUTE FUNCTION public.fas_touch_updated_at();

INSERT INTO public.fas_page_content (id, content) VALUES (1, '{}'::jsonb)
  ON CONFLICT (id) DO NOTHING;

-- Gallery
CREATE TABLE public.fas_gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.fas_gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads fas_gallery_images"
  ON public.fas_gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "fas_owner inserts fas_gallery_images"
  ON public.fas_gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (public.is_fas_owner(auth.uid()));

CREATE POLICY "fas_owner updates fas_gallery_images"
  ON public.fas_gallery_images FOR UPDATE
  TO authenticated
  USING (public.is_fas_owner(auth.uid()))
  WITH CHECK (public.is_fas_owner(auth.uid()));

CREATE POLICY "fas_owner deletes fas_gallery_images"
  ON public.fas_gallery_images FOR DELETE
  TO authenticated
  USING (public.is_fas_owner(auth.uid()));

-- Public storage bucket for hero + gallery
INSERT INTO storage.buckets (id, name, public)
VALUES ('fas-page-images', 'fas-page-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "anyone reads fas-page-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'fas-page-images');

CREATE POLICY "fas_owner uploads fas-page-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'fas-page-images' AND public.is_fas_owner(auth.uid()));

CREATE POLICY "fas_owner updates fas-page-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'fas-page-images' AND public.is_fas_owner(auth.uid()));

CREATE POLICY "fas_owner deletes fas-page-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'fas-page-images' AND public.is_fas_owner(auth.uid()));
