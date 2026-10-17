import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/brand";
import whatsapp from "@/assets/whatsapp-official.png.asset.json";

export function WhatsAppCorner() {
  return (
    <Button
      asChild
      size="icon"
      className="whatsapp-corner fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-transparent p-0 hover:bg-transparent"
      aria-label="Chat with Altitude Climber on WhatsApp"
      title="Chat on WhatsApp"
    >
      <a
        href={whatsappLink("Hi Altitude Climber, I'd like to plan a trip.")}
        target="_blank"
        rel="noreferrer"
      >
        <img src={whatsapp.url} alt="" className="h-full w-full object-contain" />
      </a>
    </Button>
  );
}
