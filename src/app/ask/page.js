import { AskConsole } from "@/components/AskConsole";

export const metadata = {
  title: "Ask AI",
  description: "Ask questions about Korean cultural context using only the articles published on this site."
};

export default function AskPage() {
  return (
    <div className="container section">
      <AskConsole />
    </div>
  );
}
