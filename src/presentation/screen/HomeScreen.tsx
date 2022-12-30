import "react-activity/dist/library.css";

import type { WalletState } from "@web3-onboard/core/dist/types";
import { useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import {
  getContract as getGuestbookContract,
  MessageData
} from "../../domain/ethereum/contracts/GuestBook.sol";
import { Header, Message } from "../component";
import { NewMessageFab } from "../component/message/NewMessageFab";
import "./HomeScreen.css";
import "./Dialog.css";

type Props = {
  wallet: WalletState;
};

const getMessageComponent = (
  message: MessageData,
  index: number
): JSX.Element => <Message message={message} index={index} />;

const POLL_INTERVAL_MS = 15000;

export function HomeScreen({ wallet }: Props) {
  const ethersProvider = new ethers.providers.Web3Provider(
    wallet.provider,
    "any"
  );
  const [messages, setMessages] = useState<MessageData[]>();
  const [isComposingMessage, setComposingMessage] = useState(false);
  const [sentMessage, setSentMessage] = useState<{
    message: string;
    expectedMatchCounter: number;
  }>();
  const [isSending, setSending] = useState(false);
  const [
    {
      connectedChain // the current chain the user's wallet is connected to
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();

  const addSentMessage = useCallback(
    (newMessage: string) =>
      setSentMessage({
        message: newMessage,
        expectedMatchCounter:
          (messages || []).filter(
            (message) =>
              message.msg === newMessage &&
              message.sender.toLowerCase() ===
                wallet.accounts[0].address.toLowerCase()
          ).length + 1
      }),
    [sentMessage, messages]
  );

  const pollMessages = useCallback(() => {
    const guestbookContract = getGuestbookContract(ethersProvider.getSigner());
    guestbookContract.readAllMessages().then(setMessages);
  }, [ethersProvider]);

  const sendMessage = useCallback(
    async (message: string) => {
      setSending(true);
      const onSent = () => setSending(false);

      try {
        const guestbook = getGuestbookContract(ethersProvider.getSigner());
        await guestbook.sendMessage(message);
        addSentMessage(message);
      } catch (e) {
        console.warn("Error while sending message:", e);
        onSent();
      }
    },
    [ethersProvider]
  );

  useEffect(() => {
    if (connectedChain?.id !== "0x28c5b") {
      if (wallet.chains.findIndex((chain) => chain.id === "0x28c5b")) {
        setChain({ chainId: "0x28c5b" });
      } else {
        alert(
          "You need to add Taiko-A1 Layer2 network RPC to your Metamask\n\nMore info: https://taiko.xyz/docs/alpha-1-testnet/configure-wallet"
        );
      }
    } else {
      pollMessages();
      const pollInterval = setInterval(pollMessages, POLL_INTERVAL_MS);

      return () => clearInterval(pollInterval);
    }
  }, [connectedChain]);

  useEffect(() => {
    if (
      sentMessage &&
      messages?.filter(
        (message) =>
          message.sender.toLowerCase() ===
            wallet.accounts[0].address.toLowerCase() &&
          message.msg === sentMessage.message
      ).length === sentMessage.expectedMatchCounter
    ) {
      setSentMessage(undefined);
    }
  }, [messages]);

  return (
    <div className="Screen HomeScreen">
      <Header />
      {!messages ? (
        <span>Loading...</span>
      ) : (
        <div className="Messages">
          {(!sentMessage
            ? messages
            : [
                ...messages,
                {
                  msg: sentMessage.message,
                  sender: wallet.accounts[0].address,
                  sending: true
                }
              ]
          )
            .map(getMessageComponent)
            .reverse()}
        </div>
      )}
      {isSending || sentMessage || isComposingMessage ? null : (
        <NewMessageFab onClick={() => setComposingMessage(true)} />
      )}
      {isComposingMessage ? (
        <Dialog
          title="Enter your message"
          text="Please, enter your message for the guestbook"
          onConfirm={(message) =>
            sendMessage(message)
              .then(() => {
                console.log("Message sent");
                setComposingMessage(false);
              })
              .catch(() => setComposingMessage(false))
          }
          onCancel={() => setComposingMessage(false)}
        />
      ) : null}
    </div>
  );
}

export const Dialog = ({
  title,
  text,
  onConfirm,
  onCancel
}: {
  title: string;
  text: string;
  onConfirm: (text: string) => void;
  onCancel: () => void;
}) => {
  const [textValue, setTextValue] = useState("");

  return (
    <div className="Dialog">
      <h4>{title}</h4>
      <p>{text}</p>
      <textarea onChange={({ target }) => setTextValue(target.value)} />
      <div>
        <div
          className="Dialog-Button Dialog-Button-Reject"
          onClick={() => onCancel()}
        >
          <span>Cancel</span>
        </div>
        <div
          className="Dialog-Button Dialog-Button-Confirm"
          onClick={() => onConfirm(textValue)}
        >
          <span>Confirm</span>
        </div>
      </div>
    </div>
  );
};
