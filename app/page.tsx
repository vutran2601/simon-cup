import SearchSection from "@/components/SearchSection";
import TeamRankingTable from "@/components/TeamRankingTable";
import TopStudentsTable from "@/components/TopStudentsTable";
import "./globals.css";

export default function Home() {
  return (
    <>
      <header>
        <h1 className="header-title">SIMON CUP IV - Tham dự Thánh Lễ</h1>
      </header>

      <div className="container">
        <div className="grid-container">
          <SearchSection />
          <TeamRankingTable />
          <TopStudentsTable />
        </div>
      </div>
    </>
  );
}
