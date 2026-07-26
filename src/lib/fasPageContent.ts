import { supabase } from "@/integrations/supabase/client";

export interface OfferingItem {
  title: string;
  desc: string;
}
export interface TimelineItem {
  time: string;
  body: string;
}
export interface PracticalityItem {
  label: string;
  value: string;
}
export interface WhyItem {
  title: string;
  body: string;
}
export interface FaqItem {
  q: string;
  a: string;
}

export interface FasPageContent {
  hero: {
    eyebrow: string;
    headline_lead: string;
    headline_italic: string;
    headline_tail: string;
    intro: string;
    primary_cta_label: string;
    secondary_cta_label: string;
    image_path: string | null; // path in fas-page-images bucket; null = use default illustration
  };
  offer: {
    eyebrow: string;
    heading_lead: string;
    heading_italic: string;
    heading_tail: string;
    intro: string;
    items: OfferingItem[];
  };
  timeline: {
    eyebrow: string;
    heading_lead: string;
    heading_italic: string;
    intro: string;
    items: TimelineItem[];
  };
  why: {
    eyebrow: string;
    heading_lead: string;
    heading_italic: string;
    heading_tail: string;
    items: WhyItem[];
  };
  practicalities: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: PracticalityItem[];
  };
  faqs: {
    eyebrow: string;
    heading_lead: string;
    heading_italic: string;
    intro: string;
    items: FaqItem[];
  };
  closing: {
    eyebrow: string;
    heading_lead: string;
    heading_italic: string;
    intro: string;
    cta_label: string;
  };
  gallery: {
    eyebrow: string;
    heading_lead: string;
    heading_italic: string;
    intro: string;
  };
}

export const DEFAULT_PAGE_CONTENT: FasPageContent = {
  hero: {
    eyebrow: "At Holy Cross N.S., Firoda",
    headline_lead: "",
    headline_italic: "Firoda After School",
    headline_tail: " — a warm welcome that lasts past 2.30.",
    intro:
      "On-site at Holy Cross National School, our after-school programme gives children a calm, fun and well-supervised place to be while parents finish the working day.",
    primary_cta_label: "Enquire about a place",
    secondary_cta_label: "What we offer",
    image_path: null,
  },
  offer: {
    eyebrow: "What we offer",
    heading_lead: "A ",
    heading_italic: "gentle",
    heading_tail: " end to the school day.",
    intro:
      "The afternoon is a balance of supervision, play, food and a little quiet — shaped around what the children actually need after a full day of school.",
    items: [
      { title: "Supervised care from 2.30", desc: "Children come straight to us when the school bell rings — no gap, no rush." },
      { title: "Homework help", desc: "A quiet, focused space, with a hand to help when it's needed." },
      { title: "A healthy snack", desc: "A simple, wholesome snack provided each afternoon." },
      { title: "Outdoor play", desc: "Time in the school yard to run around and burn off the day." },
      { title: "Wet-day activities", desc: "Indoor games, group play and quiet corners for the soggy days." },
      { title: "Arts, crafts & reading", desc: "Drawing, painting, building and the simple pleasure of a good book." },
    ],
  },
  timeline: {
    eyebrow: "A typical afternoon",
    heading_lead: "What an afternoon ",
    heading_italic: "looks like",
    intro: "Things shift gently from day to day — but here's the rhythm most afternoons follow.",
    items: [
      { time: "2.30", body: "School ends. Children come straight to After School." },
      { time: "2.45", body: "Settle in, snack, a bit of catch-up time." },
      { time: "3.15", body: "Homework support, for those who want it." },
      { time: "4.00", body: "Outdoor play in the yard, or indoor activities on wet days." },
      { time: "5.00", body: "Quiet time — reading, drawing, free play." },
      { time: "6.00", body: "Last collection." },
    ],
  },
  why: {
    eyebrow: "Why families choose us",
    heading_lead: "",
    heading_italic: "Familiar",
    heading_tail: " faces, familiar place.",
    items: [
      { title: "Right here at the school", body: "No second pickup, no rush across town. Children walk straight in to the same building they spent their day in." },
      { title: "A small, settled group", body: "We keep numbers manageable so every child is known by name — not just supervised in a crowd." },
      { title: "Calm and unhurried", body: "After a full school day, children need space to decompress — not another structured timetable. We keep it gentle." },
    ],
  },
  practicalities: {
    eyebrow: "Practical details",
    heading: "The practical stuff.",
    intro: "The bits parents tend to want up-front. Anything missing? Drop us a line.",
    items: [
      { label: "Hours", value: "2.30pm – 6.00pm, term time only" },
      { label: "Days", value: "Monday to Friday — full or selected days" },
      { label: "Pricing", value: "From €[X] per day · €[X] per week · selected days from €[X]." },
      { label: "Booking", value: "In advance, via the form below" },
      { label: "Payment", value: "[weekly/monthly in advance, bank transfer or card]" },
      { label: "National Childcare Scheme (NCS)", value: "We're NCS-registered — eligible families can reduce fees through the government subsidy. Ask us how." },
      { label: "First day", value: "A short orientation visit beforehand is welcome" },
    ],
  },
  faqs: {
    eyebrow: "After School FAQ",
    heading_lead: "The questions ",
    heading_italic: "parents ask",
    intro: "Still have a question? Drop us a line below.",
    items: [
      { q: "How do children get from school to After School?", a: "They walk straight in. We're in the same building — children come from their classroom to the After School room with our staff at 2.30 (or 1.50 for Junior and Senior Infants). No transfer, no second drop-off." },
      { q: "What if my child has homework — will it get done?", a: "Yes. We set aside a quiet, focused window every afternoon for homework, with a member of staff on hand to help. Some parents prefer to do homework themselves at home, which is also fine — just let us know." },
      { q: "Is a snack provided?", a: "Yes — a simple, healthy snack every afternoon. If your child has allergies or particular dietary needs, please flag them on the booking form and we'll work around them." },
      { q: "Can I book just two or three days a week?", a: "Yes, absolutely. Many of our families book selected days only. Choose the days that suit you on the enquiry form." },
      { q: "What happens during school holidays?", a: "Firoda After School operates during term time only. We do not run during the school holidays." },
      { q: "What's the latest I can collect my child?", a: "Last collection is 6.00pm sharp. If you're running late, please give us a quick ring so we know." },
      { q: "Is there a waiting list?", a: "Numbers are kept manageable so every child is known. If we're full when you enquire, we'll add you to a short waiting list and contact you the moment a place opens." },
      { q: "How do I cancel or change days?", a: "Just give us as much notice as you can — by phone, text or email. We'll do our best to accommodate changes mid-term." },
    ],
  },
  closing: {
    eyebrow: "Have a look around",
    heading_lead: "Questions? ",
    heading_italic: "Come and have a look.",
    intro: "We're happy to show you around — get in touch and we'll arrange a visit.",
    cta_label: "Enquire now",
  },
  gallery: {
    eyebrow: "A peek inside",
    heading_lead: "Moments from ",
    heading_italic: "our afternoons",
    intro: "A few snapshots from a typical week at Firoda After School.",
  },
};

// Deep merge so newly added defaults appear even when stored content is older/partial
function mergeContent(stored: any): FasPageContent {
  const out: any = JSON.parse(JSON.stringify(DEFAULT_PAGE_CONTENT));
  if (!stored || typeof stored !== "object") return out;
  for (const key of Object.keys(out)) {
    const s = stored[key];
    if (s && typeof s === "object") {
      out[key] = { ...out[key], ...s };
    }
  }
  return out;
}

export async function fetchPageContent(): Promise<FasPageContent> {
  const { data, error } = await supabase
    .from("fas_page_content" as never)
    .select("content")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return mergeContent((data as any)?.content);
}

export async function savePageContent(content: FasPageContent) {
  const { error } = await supabase
    .from("fas_page_content" as never)
    .upsert({ id: 1, content: content as any } as never);
  if (error) throw error;
}

export interface FasGalleryImage {
  id: string;
  file_path: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export async function fetchGalleryImages(): Promise<FasGalleryImage[]> {
  const { data, error } = await supabase
    .from("fas_gallery_images" as never)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as FasGalleryImage[];
}

export const FAS_PAGE_BUCKET = "fas-page-images";

export function getPagePublicUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from(FAS_PAGE_BUCKET).getPublicUrl(path);
  return data?.publicUrl ?? null;
}
