
-- Storage bucket for generated stickers
INSERT INTO storage.buckets (id, name, public) VALUES ('stickers', 'stickers', true);

-- Allow public read access
CREATE POLICY "Stickers are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'stickers');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload stickers"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'stickers');

-- Allow anyone to upload (for anonymous users too)
CREATE POLICY "Anyone can upload stickers"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'stickers' AND auth.role() = 'anon');
