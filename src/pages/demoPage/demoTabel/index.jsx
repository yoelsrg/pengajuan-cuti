import { Card, PanelContent, React } from "components";
import DataTabel from "./tabel";
const DemoTabel = () => {
  return (
    <PanelContent
      title="Master DemoTabel"
      headerContent
    >  
    <Card>
      <DataTabel />
    </Card>     
    </PanelContent>
  );
};

export default DemoTabel;
