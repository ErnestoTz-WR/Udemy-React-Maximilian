import InitialPage from "./components/InitialPage";
import Sidebar from "./components/Sidebar";


function App() {
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar/>
      <InitialPage/>
    </main>
  );
}

export default App;
