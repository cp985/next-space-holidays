export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
      {/* Rettangolo per il Titolo di saluto */}
      <div className="h-18 w-3/4 bg-gray-700/50 rounded-md animate-pulse" />

      {/* Rettangolo per il Sottotitolo o descrizione breve */}
      <div className="h-10 w-1/2 bg-gray-700/40 rounded-md animate-pulse" />

      {/* Blocco grande (es. per simulare la card del biglietto o dettagli viaggio) */}
      <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/20 space-y-4">
        <div className="h-12 w-1/3 bg-gray-700/50 rounded-md animate-pulse" />
        <div className="h-8 w-full bg-gray-700/30 rounded-md animate-pulse" />
        <div className="h-8 w-5/6 bg-gray-700/30 rounded-md animate-pulse" />
      </div>

      {/* Un secondo blocco per riempire la pagina */}
      <div className="h-48 w-full bg-gray-700/20 rounded-lg animate-pulse" />
    </div>
  );
}