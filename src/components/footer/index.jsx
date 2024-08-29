import { Link, openTab } from "components";
import Logo from "assets/img/adam_malik.png";

const Footer = () => {
  return (
    <footer className="main-footer" style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <strong>
        RSUP H. Adam Malik,{" "}
        <Link to="#" onClick={() => openTab('https://rsham.co.id/')}>
          rsham.co.id
        </Link>.
      </strong>
      <div style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)" }}>
        <img src={Logo} alt="Logo" style={{ height: "40px" }} />
      </div>
    </footer>
  );
};

export default Footer;
