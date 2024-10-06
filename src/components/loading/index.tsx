import Sidebar from "../sidebar";
import SecondHeader from "../secondHeader";

export default function Loading() {
  return (
    <>
      <SecondHeader />
      <Sidebar>
        <div className="flex items-center justify-center mx-auto p-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-blue-500 mx-auto text-center">
            Carregando...
          </p>
        </div>
      </Sidebar>
    </>
  );
}
