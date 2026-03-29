import { AskConsole } from "@/components/AskConsole";

export const metadata = {
  title: "ASK",
  description: "Ask questions about Korean cultural context using only this site's articles."
};

export default async function SearchPage(props) {
  const resolvedSearchParams = await props.searchParams;
  const query = typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q : "";

  return (
    <div className="container section">
      <AskConsole
        initialQuestion={query}
        autoRun={Boolean(query.trim())}
        eyebrow="ASK"
        title={query.trim() ? "Answer for your search" : "ASK, not keywords."}
        description={
          query.trim()
            ? "Your search is treated as a question, and the answer is generated only from this site's articles."
            : "Type a question in English or Korean. The answer will be generated from this site's articles only."
        }
      />
    </div>
  );
}
