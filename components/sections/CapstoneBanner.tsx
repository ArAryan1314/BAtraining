import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export function CapstoneBanner() {
  return <section id="projects" className="capstone-banner">
    <div className="capstone-content">
      <div>
        <div className="capstone-eyebrow">Capstone delivery</div>
        <h3 className="capstone-title">Your progress should become evidence of capability.</h3>
        <p className="capstone-description">Connect lessons, artefacts, mentor feedback and outcomes into one project record that the trainer can review end to end.</p>
      </div>
      <Button variant="primary">Open capstone <ArrowRight size={16} /></Button>
    </div>
  </section>;
}
