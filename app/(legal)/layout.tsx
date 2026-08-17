// A jogi oldalak mindegyike a saját teljes Rail-szerkezetét építi fel
// (LegalDoc.tsx) — a layout itt már nem ad hozzá közös díszítést,
// csak route-csoportot képez a canonical /adatkezeles stb. útvonalakhoz.
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
