import "./Header.css";

type Props = {
  children?: JSX.Element;
};

export function Header({ children }: Props) {
  return (
    <div className="Header">
      <span className="Title">Guestbook at Taiko A1</span>
      <span className="ContractAddress">
        Contract address:{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://l2explorer.a1.taiko.xyz/address/0x77bC263cc14168924960d16b9A94094fca62EC7e"
        >
          0x77bC263cc14168924960d16b9A94094fca62EC7e
        </a>
      </span>
      {children}
    </div>
  );
}
