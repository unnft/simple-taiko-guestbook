import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { MessageData } from "../../../domain/ethereum/contracts/GuestBook.sol";
import "./Message.css";

export const Message = ({
  message,
  index
}: {
  message: MessageData;
  index: number;
}) => {
  const dateNow = new Date();

  const messageBlockDate = message.timestamp
    ? new Date(parseInt(message.timestamp.toString()) * 1000)
    : false;

  const dateString = !messageBlockDate
    ? "pending"
    : messageBlockDate.getDay() !== dateNow.getDay()
    ? `${messageBlockDate.toLocaleDateString()}@${messageBlockDate.toLocaleTimeString()}`
    : messageBlockDate.getHours() === dateNow.getHours()
    ? `${dateNow.getMinutes() - messageBlockDate.getMinutes()}min ago`
    : `${
        dateNow.getHours() - messageBlockDate.getHours()
      }h${messageBlockDate.getMinutes()}min ago`;

  return (
    <div key={`msg${index}`} className={`Message ${message.timestamp ? "" : "Message-Pending"}`}>
      <span>
        <Jazzicon diameter={45} seed={jsNumberForAddress(message.sender)} />
      </span>
      <div>
        <span className="sender">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://l2explorer.a1.taiko.xyz/address/${message.sender}`}
          >
            {message.sender}
          </a>{" "}
          <em>{dateString}</em>
        </span>
        <span className="message">{message.msg}</span>
      </div>
    </div>
  );
};
