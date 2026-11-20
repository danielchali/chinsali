CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, ward text NOT NULL, category text NOT NULL,
  status text NOT NULL DEFAULT 'ongoing', progress int NOT NULL DEFAULT 0,
  budget_kwacha bigint, summary text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('report','suggestion','feedback')),
  ward text NOT NULL, category text NOT NULL DEFAULT 'other',
  details text NOT NULL CHECK (char_length(details) BETWEEN 5 AND 2000),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 20),
  channel text NOT NULL DEFAULT 'web',
  created_at timestamptz NOT NULL DEFAULT now());
GRANT INSERT ON public.submissions TO anon, authenticated;
GRANT ALL ON public.submissions TO service_role;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit" ON public.submissions FOR INSERT TO anon, authenticated WITH CHECK (channel = 'web');

CREATE TABLE public.polls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL, active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.poll_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id uuid NOT NULL REFERENCES public.polls(id) ON DELETE CASCADE,
  label text NOT NULL, votes int NOT NULL DEFAULT 0);
GRANT SELECT ON public.polls, public.poll_options TO anon, authenticated;
GRANT ALL ON public.polls, public.poll_options TO service_role;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read polls" ON public.polls FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read options" ON public.poll_options FOR SELECT TO anon, authenticated USING (true);

CREATE FUNCTION public.cast_vote(_option uuid) RETURNS void
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.poll_options o SET votes = votes + 1
  WHERE o.id = _option AND EXISTS (SELECT 1 FROM public.polls p WHERE p.id = o.poll_id AND p.active);
$$;
GRANT EXECUTE ON FUNCTION public.cast_vote(uuid) TO anon, authenticated;

INSERT INTO public.projects (title, ward, category, status, progress, budget_kwacha, summary) VALUES
('Mwika borehole drilling','Mwika','Water','ongoing',60,180000,'Two solar-powered boreholes serving 1,200 residents.'),
('Chinsali–Mulilansolo road grading','Mulilansolo','Roads','ongoing',35,950000,'Grading and culvert works on 14 km of feeder road.'),
('Central market ablution block','Chinsali Central','Sanitation','completed',100,240000,'New toilets and handwashing stations at the main market.'),
('Lubwa clinic maternity wing','Lubwa','Health','ongoing',80,1200000,'Six-bed maternity wing with staff house.'),
('Kabanda school desks','Kabanda','Education','completed',100,85000,'400 desks delivered to three primary schools.'),
('Street lighting – Boma area','Chinsali Central','Roads','planned',0,310000,'Solar street lights along the Boma road.');

WITH p AS (INSERT INTO public.polls (question) VALUES ('Which project should the council prioritise next year?') RETURNING id)
INSERT INTO public.poll_options (poll_id, label, votes)
SELECT p.id, v.label, v.votes FROM p, (VALUES ('More boreholes in rural wards',214),('Feeder road repairs',187),('Market sanitation',96),('Youth skills centre',143)) AS v(label, votes);