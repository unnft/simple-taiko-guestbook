import "./NewMessageFab.css";

type Props = {
  onClick?: () => void;
};

export const NewMessageFab = ({ onClick }: Props) => (
  <a onClick={onClick} title="New message">
    <div className="NewMessageFab">+</div>
  </a>
);
