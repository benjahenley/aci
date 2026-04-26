import logo2 from "/worded-logo.png";
export default function Logo() {
  return (
    <a
      href="#top"
      aria-label="ACI Facility Management — inicio"
      className="group flex items-center gap-3">
      {/* <img src={logo} className="max-w-20"></img> */}
      <img src={logo2} className="max-h-8"></img>
      {/* <span className="leading-[1.05]">
        <span
          className="block font-sans text-[12px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: fg }}>
          ACI
        </span>
        <span
          className="block font-sans text-[9.5px] font-medium uppercase tracking-[0.28em]"
          style={{ color: tone === "light" ? "#F7F4EE99" : "#7A7A7A" }}>
          Facility Management
        </span>
      </span> */}
    </a>
  );
}
